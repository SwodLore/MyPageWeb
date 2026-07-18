/* Genera todos los rasters de marca desde public/favicon.svg.
   Uso: node scripts/generate-favicons.mjs
   Fuente única de verdad: el SVG. Si el logo cambia, se re-ejecuta. */
import { readFile, writeFile } from "node:fs/promises";
import sharp from "sharp";
import pngToIco from "png-to-ico";

const SVG = new URL("../public/favicon.svg", import.meta.url);
const OUT = (name) => new URL(`../public/${name}`, import.meta.url);

const svg = await readFile(SVG);

const png = (size) =>
  sharp(svg, { density: 300 }).resize(size, size).png().toBuffer();

const targets = [
  [16, "favicon-16x16.png"],
  [32, "favicon-32x32.png"],
  [48, "favicon-48x48.png"],
  [180, "apple-touch-icon.png"],
  [192, "icon-192x192.png"],
  [512, "icon-512x512.png"],
];

for (const [size, name] of targets) {
  await writeFile(OUT(name), await png(size));
  console.log(`✓ ${name}`);
}

const ico = await pngToIco([await png(16), await png(32), await png(48)]);
await writeFile(OUT("favicon.ico"), ico);
console.log("✓ favicon.ico");
