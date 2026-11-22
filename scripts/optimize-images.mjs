import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const ROOT = process.cwd();
const RAW_DIR = path.join(ROOT, "images-raw");
const OUT_DIR = path.join(ROOT, "public", "images");
const BLUR_PATH = path.join(ROOT, "src", "content", "blur.json");
const STRICT = process.argv.includes("--strict");

const SUPPORTED_EXT = new Set([".png", ".jpg", ".jpeg", ".webp", ".avif", ".tiff", ".heic"]);

function walk(dir) {
  if (!fs.existsSync(dir)) return [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...walk(full));
    } else if (SUPPORTED_EXT.has(path.extname(entry.name).toLowerCase())) {
      files.push(full);
    }
  }
  return files;
}

async function run() {
  let blurMap = {};
  if (fs.existsSync(BLUR_PATH)) {
    try {
      blurMap = JSON.parse(fs.readFileSync(BLUR_PATH, "utf8"));
    } catch {
      blurMap = {};
    }
  }

  const files = walk(RAW_DIR);
  if (files.length === 0) {
    process.stdout.write("No raw images found in images-raw/.\n");
    if (!fs.existsSync(BLUR_PATH)) {
      fs.mkdirSync(path.dirname(BLUR_PATH), { recursive: true });
      fs.writeFileSync(BLUR_PATH, JSON.stringify(blurMap, null, 2) + "\n");
    }
    return;
  }

  let hasSizeError = false;

  for (const srcPath of files) {
    const rel = path.relative(RAW_DIR, srcPath);
    const parsed = path.parse(rel);
    const outSubDir = path.join(OUT_DIR, parsed.dir);
    fs.mkdirSync(outSubDir, { recursive: true });

    const baseName = parsed.name;
    const cardPath = path.join(outSubDir, `${baseName}-card.webp`);
    const fullPath = path.join(outSubDir, `${baseName}-full.webp`);
    const publicBase = `/images/${parsed.dir ? parsed.dir.split(path.sep).join("/") + "/" : ""}${baseName}`;

    const srcStat = fs.statSync(srcPath);
    const cardExists = fs.existsSync(cardPath);
    const fullExists = fs.existsSync(fullPath);

    if (
      cardExists &&
      fullExists &&
      blurMap[publicBase] &&
      fs.statSync(cardPath).mtimeMs > srcStat.mtimeMs &&
      fs.statSync(fullPath).mtimeMs > srcStat.mtimeMs
    ) {
      continue;
    }

    const baseSharp = sharp(srcPath).rotate();

    await baseSharp
      .clone()
      .resize({ width: 800, withoutEnlargement: true })
      .webp({ quality: 72, effort: 6, smartSubsample: true })
      .toFile(cardPath);

    await baseSharp
      .clone()
      .resize({ width: 1600, withoutEnlargement: true })
      .webp({ quality: 75, effort: 6, smartSubsample: true })
      .toFile(fullPath);

    if (!parsed.dir && baseName === "hero-poster") {
      const heroPosterPath = path.join(OUT_DIR, "hero-poster.webp");
      await baseSharp
        .clone()
        .resize({ width: 1200, withoutEnlargement: true })
        .webp({ quality: 60, effort: 6, smartSubsample: true })
        .toFile(heroPosterPath);
    }

    const blurBuf = await baseSharp
      .clone()
      .resize({ width: 16, withoutEnlargement: true })
      .webp({ quality: 40 })
      .toBuffer();

    blurMap[publicBase] = `data:image/webp;base64,${blurBuf.toString("base64")}`;

    const cardKb = fs.statSync(cardPath).size / 1024;
    const fullKb = fs.statSync(fullPath).size / 1024;
    process.stdout.write(
      `${publicBase}: card=${cardKb.toFixed(1)}KB, full=${fullKb.toFixed(1)}KB\n`,
    );

    if (cardKb > 120) {
      console.warn(`WARN: ${cardPath} is ${cardKb.toFixed(1)}KB (over 120KB)`);
      if (STRICT) hasSizeError = true;
    }
    if (fullKb > 300) {
      console.warn(`WARN: ${fullPath} is ${fullKb.toFixed(1)}KB (over 300KB)`);
      if (STRICT) hasSizeError = true;
    }
  }

  fs.mkdirSync(path.dirname(BLUR_PATH), { recursive: true });
  fs.writeFileSync(BLUR_PATH, JSON.stringify(blurMap, null, 2) + "\n");

  if (hasSizeError) {
    process.exit(1);
  }
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
