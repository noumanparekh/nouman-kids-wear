// One-off: turn the logo's baked-in white background transparent WITHOUT
// punching holes through white areas inside the artwork.
//
// Technique: border-connected flood fill. We only clear "white" pixels that are
// reachable from the image edges, so interior whites (eyes, highlights, text
// counters) are preserved. Edge pixels get partial alpha for a soft, un-jagged
// cutout. Output is trimmed to the artwork's bounding box and re-padded a touch.
//
// Usage: node scripts/logo-transparent.mjs <in.png> <out.png>
import sharp from "sharp";

const [, , inPath, outPath] = process.argv;
if (!inPath || !outPath) {
  console.error("usage: node logo-transparent.mjs <in.png> <out.png>");
  process.exit(1);
}

const src = sharp(inPath).ensureAlpha();
const { data, info } = await src
  .raw()
  .toBuffer({ resolveWithObject: true });
const { width: w, height: h } = info;
const c = info.channels; // 4 after ensureAlpha

// "Whiteness": how close a pixel is to pure white. >= NEAR is treated as
// fully background; a feather band below it gets partial alpha.
const NEAR = 238; // min channel value to count as solid background
const FEATHER = 30; // soft ramp width below NEAR

const isBg = new Uint8Array(w * h); // 1 = background (to clear), 0 = keep
const visited = new Uint8Array(w * h);

function whiteness(idx) {
  const p = idx * c;
  return Math.min(data[p], data[p + 1], data[p + 2]);
}

// BFS flood fill from every border pixel through near-white regions.
const queue = [];
function seed(x, y) {
  const idx = y * w + x;
  if (!visited[idx] && whiteness(idx) >= NEAR - FEATHER) {
    visited[idx] = 1;
    queue.push(idx);
  }
}
for (let x = 0; x < w; x++) {
  seed(x, 0);
  seed(x, h - 1);
}
for (let y = 0; y < h; y++) {
  seed(0, y);
  seed(w - 1, y);
}

let head = 0;
while (head < queue.length) {
  const idx = queue[head++];
  isBg[idx] = 1;
  const x = idx % w;
  const y = (idx / w) | 0;
  const neigh = [
    x > 0 ? idx - 1 : -1,
    x < w - 1 ? idx + 1 : -1,
    y > 0 ? idx - w : -1,
    y < h - 1 ? idx + w : -1,
  ];
  for (const n of neigh) {
    if (n < 0 || visited[n]) continue;
    if (whiteness(n) >= NEAR - FEATHER) {
      visited[n] = 1;
      queue.push(n);
    }
  }
}

// Apply alpha. Background-connected pixels: ramp alpha by how white they are,
// so soft anti-aliased edges of the logo fade out smoothly.
let minX = w,
  minY = h,
  maxX = 0,
  maxY = 0,
  kept = 0;
for (let i = 0; i < w * h; i++) {
  const p = i * c;
  if (isBg[i]) {
    const wn = whiteness(i);
    if (wn >= NEAR) {
      data[p + 3] = 0; // fully transparent
    } else {
      // Feather: NEAR-FEATHER .. NEAR maps to alpha 255..0
      const t = (NEAR - wn) / FEATHER; // 0..1
      data[p + 3] = Math.max(0, Math.min(255, Math.round(t * 255)));
    }
  }
  if (data[p + 3] > 8) {
    kept++;
    const x = i % w;
    const y = (i / w) | 0;
    if (x < minX) minX = x;
    if (y < minY) minY = y;
    if (x > maxX) maxX = x;
    if (y > maxY) maxY = y;
  }
}

if (kept === 0) {
  console.error("refusing to write: everything became transparent");
  process.exit(1);
}

// Trim to bounding box with a small transparent margin.
const pad = Math.round(Math.max(w, h) * 0.03);
const left = Math.max(0, minX - pad);
const top = Math.max(0, minY - pad);
const right = Math.min(w - 1, maxX + pad);
const bottom = Math.min(h - 1, maxY + pad);
const cropW = right - left + 1;
const cropH = bottom - top + 1;

await sharp(data, { raw: { width: w, height: h, channels: c } })
  .extract({ left, top, width: cropW, height: cropH })
  .png()
  .toFile(outPath);

console.log(
  `wrote ${outPath}: ${cropW}x${cropH} (trimmed from ${w}x${h}), kept ${kept} px`,
);
