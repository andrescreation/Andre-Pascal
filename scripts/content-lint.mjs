import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();

const BANNED_WORDS = [
  "passionate",
  "leverage",
  "delve",
  "seamless",
  "seamlessly",
  "cutting-edge",
  "cutting edge",
  "state-of-the-art",
  "elevate",
  "unlock",
  "unleash",
  "empower",
  "harness",
  "supercharge",
  "revolutionize",
  "revolutionise",
  "game-changer",
  "game changing",
  "next-level",
  "world-class",
  "synergy",
  "robust",
  "holistic",
  "innovative solutions",
  "tapestry",
  "testament",
  "realm",
  "in today's fast-paced world",
  "in the ever-evolving",
  "look no further",
  "i'm thrilled",
  "dive in",
  "deep dive",
  "crafted with love",
  "pixel-perfect experiences",
  "bespoke solutions",
  "ai-powered",
  "magic",
  "magical",
  "landscape",
  "journey",
  "navigate",
];

const BANNED_ICONS = [
  "Sparkle",
  "Sparkles",
  "Stars",
  "Star",
  "Wand",
  "WandSparkles",
  "Magic",
  "Bot",
  "Robot",
  "Brain",
  "BrainCircuit",
  "Cpu",
  "Zap",
  "Atom",
  "Orbit",
];

const EMOJI_REGEX = /[\u{1F300}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/u;

function walk(dir, exts) {
  if (!fs.existsSync(dir)) return [];
  const results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...walk(full, exts));
    } else if (exts.has(path.extname(entry.name).toLowerCase())) {
      results.push(full);
    }
  }
  return results;
}

const srcFiles = walk(path.join(ROOT, "src"), new Set([".ts", ".tsx", ".md", ".mdx", ".json"]));
const svgFiles = walk(path.join(ROOT, "public"), new Set([".svg"]));

const failures = [];

function addFailure(file, line, text, rule) {
  failures.push({
    file: path.relative(ROOT, file),
    line,
    text: text.trim().slice(0, 140),
    rule,
  });
}

for (const file of srcFiles) {
  const rel = path.relative(ROOT, file);
  const content = fs.readFileSync(file, "utf8");
  const lines = content.split(/\r?\n/);
  const isSchemaOrBlur = rel.endsWith("blur.json") || rel.endsWith("schema.ts");

  lines.forEach((line, idx) => {
    const lineNum = idx + 1;
    const trimmed = line.trim();
    const isComment =
      trimmed.startsWith("//") || trimmed.startsWith("*") || trimmed.startsWith("/*");

    if (!isSchemaOrBlur && !isComment) {
      if (line.includes("\u2014")) {
        addFailure(file, lineNum, line, "Banned punctuation: em dash (U+2014)");
      }
      if (line.includes("\u2013")) {
        addFailure(file, lineNum, line, "Banned punctuation: en dash (U+2013)");
      }
      if (line.includes(" -- ")) {
        addFailure(file, lineNum, line, "Banned punctuation: double hyphen ( -- )");
      }
      if (EMOJI_REGEX.test(line)) {
        addFailure(file, lineNum, line, "Banned emoji character in UI copy");
      }
    }

    // Check banned icon imports or usages in ts/tsx
    if (file.endsWith(".ts") || file.endsWith(".tsx")) {
      for (const icon of BANNED_ICONS) {
        const iconRegex = new RegExp(`\\b${icon}\\b`);
        if (iconRegex.test(line) && !isComment) {
          addFailure(file, lineNum, line, `Banned icon reference: ${icon}`);
        }
      }
    }

    // Check placeholders across all non-comment src lines (excluding schema/blur)
    if (!isSchemaOrBlur && !isComment) {
      const lower = line.toLowerCase();
      if (lower.includes("[andre:") || /\blorem\b/i.test(lower)) {
        addFailure(file, lineNum, line, "Placeholder text leaking into source");
      }

      // Check banned words in content modules or JSX string literals
      const isContent = rel.startsWith("src/content/");
      const isCodeLiteral =
        !trimmed.startsWith("import ") &&
        (trimmed.includes('"') ||
          trimmed.includes("'") ||
          trimmed.includes("`") ||
          (trimmed.startsWith("<") && trimmed.includes(">")));
      if (isContent || isCodeLiteral) {
        const target = isContent
          ? lower
          : line.replace(/className=(["'`])[\s\S]*?\1/g, "").toLowerCase();
        for (const word of BANNED_WORDS) {
          const wordRegex = new RegExp(`\\b${word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "i");
          if (wordRegex.test(target)) {
            addFailure(file, lineNum, line, `Banned word/phrase: "${word}"`);
          }
        }
      }
    }
  });
}

for (const file of svgFiles) {
  const base = path.basename(file, ".svg");
  for (const icon of BANNED_ICONS) {
    if (base.toLowerCase().includes(icon.toLowerCase())) {
      addFailure(file, 1, base, `Banned SVG filename: ${icon}`);
    }
  }
}

if (failures.length > 0) {
  console.error(`Content lint failed with ${failures.length} issue(s):\n`);
  for (const f of failures) {
    console.error(`${f.file}:${f.line} [${f.rule}]\n  ${f.text}\n`);
  }
  process.exit(1);
}

process.stdout.write("Content lint passed.\n");
