import sharp from "sharp";
import { readFileSync, writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");

// Read the OG SVG
const svg = readFileSync(resolve(root, "public/og-image.svg"));

// Convert to PNG (1200x630)
await sharp(svg)
  .resize(1200, 630)
  .png()
  .toFile(resolve(root, "public/og-image.png"));

console.log("Created public/og-image.png (1200x630)");

// Also create a 180x180 apple-touch-icon from the favicon
const faviconSvg = readFileSync(resolve(root, "public/favicon.svg"));

await sharp(faviconSvg)
  .resize(180, 180)
  .png()
  .toFile(resolve(root, "public/apple-touch-icon.png"));

console.log("Created public/apple-touch-icon.png (180x180)");

// Create a 32x32 favicon.png fallback
await sharp(faviconSvg)
  .resize(32, 32)
  .png()
  .toFile(resolve(root, "public/favicon-32x32.png"));

console.log("Created public/favicon-32x32.png (32x32)");
