import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const ROOT = process.cwd();

async function makePng(outPath, width, height, bgHex, label) {
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
    <defs>
      <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="${bgHex}" />
        <stop offset="100%" stop-color="#3A3834" />
      </linearGradient>
    </defs>
    <rect width="100%" height="100%" fill="url(#bg)" />
    <rect x="48" y="48" width="${width - 96}" height="${height - 96}" fill="none" stroke="#8C8982" stroke-width="2" />
    <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-weight="700" font-size="42" fill="#F2F1EE">${label}</text>
  </svg>`;
  await sharp(Buffer.from(svg)).png().toFile(outPath);
}

async function makeHeroPoster() {
  const out = path.join(ROOT, "public", "images", "hero-poster.webp");
  fs.mkdirSync(path.dirname(out), { recursive: true });
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="900">
    <defs>
      <radialGradient id="g" cx="72%" cy="42%" r="65%">
        <stop offset="0%" stop-color="#3B2E26" />
        <stop offset="55%" stop-color="#1E1B18" />
        <stop offset="100%" stop-color="#101010" />
      </radialGradient>
    </defs>
    <rect width="100%" height="100%" fill="url(#g)" />
  </svg>`;
  await sharp(Buffer.from(svg)).webp({ quality: 80 }).toFile(out);
}

async function makeOgImage() {
  const out = path.join(ROOT, "public", "og", "default.jpg");
  fs.mkdirSync(path.dirname(out), { recursive: true });
  if (fs.existsSync(out)) return;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
    <rect width="100%" height="100%" fill="#F2F1EE" />
    <text x="80" y="280" font-family="sans-serif" font-weight="900" font-size="112" fill="#111111">ANDRE PASCAL</text>
    <text x="80" y="360" font-family="sans-serif" font-weight="500" font-size="36" fill="#5A5A57">Brand &amp; Visual Designer. Web &amp; Product Designer.</text>
    <rect x="80" y="420" width="240" height="40" fill="#111111" />
    <text x="100" y="447" font-family="sans-serif" font-weight="600" font-size="20" fill="#FFFFFF">andrescreation.vercel.app</text>
  </svg>`;
  await sharp(Buffer.from(svg)).jpeg({ quality: 85 }).toFile(out);
}

function makePlaceholderPdf(outPath, title) {
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  if (fs.existsSync(outPath)) return;
  const pdf = `%PDF-1.4
1 0 obj << /Type /Catalog /Pages 2 0 R >> endobj
2 0 obj << /Type /Pages /Kids [3 0 R] /Count 1 >> endobj
3 0 obj << /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >> endobj
4 0 obj << /Length 62 >> stream
BT /F1 18 Tf 72 700 Td (${title} - Placeholder CV) Tj ET
endstream endobj
5 0 obj << /Type /Font /Subtype /Type1 /BaseFont /Helvetica >> endobj
xref
0 6
0000000000 65535 f 
0000000009 00000 n 
0000000058 00000 n 
0000000115 00000 n 
0000000241 00000 n 
0000000353 00000 n 
trailer << /Size 6 /Root 1 0 R >>
startxref
423
%%EOF
`;
  fs.writeFileSync(outPath, pdf, "utf8");
}

async function run() {
  const aboutCards = [
    ["01-portrait", "#2B2926", "01 Portrait"],
    ["02-brand", "#222426", "02 Brand"],
    ["03-system", "#1F2623", "03 System"],
    ["04-build", "#1E1F26", "04 Build"],
    ["05-live", "#26211F", "05 Live"],
    ["06-shipping", "#20252B", "06 Shipping"],
  ];
  for (const [name, bg, label] of aboutCards) {
    await makePng(path.join(ROOT, "images-raw", "about", `${name}.png`), 1200, 1500, bg, label);
  }

  await makePng(
    path.join(ROOT, "images-raw", "skills", "workspace.png"),
    1200,
    1500,
    "#232220",
    "Workspace",
  );

  const projectImages = {
    pepsa: ["cover", "dashboard"],
    "mysounds-global": ["cover", "storefront"],
    supashop: ["cover", "catalogue"],
    supadex: ["cover", "detail"],
    "andre-creations-portfolio": ["cover", "detail"],
    supadao: ["cover", "detail"],
    "supacore-design-system": ["cover", "components"],
    "apus-industries": ["cover", "packaging"],
    amyola: ["cover", "detail"],
    trenztech: ["cover", "detail"],
  };

  for (const [slug, imgs] of Object.entries(projectImages)) {
    for (const img of imgs) {
      await makePng(
        path.join(ROOT, "images-raw", "projects", slug, `${img}.png`),
        1600,
        1200,
        "#1E1D1B",
        `${slug} / ${img}`,
      );
    }
  }

  await makeHeroPoster();
  await makeOgImage();

  makePlaceholderPdf(
    path.join(ROOT, "public", "cv", "andre-pascal-web-product-designer-cv.pdf"),
    "Andre Pascal - Web and Product Designer CV",
  );
  makePlaceholderPdf(
    path.join(ROOT, "public", "cv", "andre-pascal-brand-visual-designer-cv.pdf"),
    "Andre Pascal - Brand and Visual Designer CV",
  );

  process.stdout.write("Placeholders generated.\n");
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
