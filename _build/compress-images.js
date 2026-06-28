const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const rawDir = path.join(__dirname, '../images/raw');
const outDir = path.join(__dirname, '../images');

const tasks = [
  // Nén ảnh background project sang WebP (giảm 70-80%)
  { input: 'projects/autoclaw.png', output: 'projects/autoclaw.webp', width: 800 },
  { input: 'projects/tetris.png', output: 'projects/tetris.webp', width: 800 },
  { input: 'projects/meo.png', output: 'projects/meo.webp', width: 800 },
  // Avatar giữ JPG nhưng resize
  { input: 'avatar.jpg', output: 'avatar.webp', width: 400 },
  // Favicon resize xuống 64x64 (chuẩn favicon)
  { input: 'favicon.png', output: 'favicon.png', width: 64 },
];

async function compressImages() {
  for (const task of tasks) {
    const inputPath = path.join(rawDir, task.input);
    const outputPath = path.join(outDir, task.output);

    if (!fs.existsSync(inputPath)) {
      console.log(`SKIP: ${task.input} not found`);
      continue;
    }

    const inputSize = fs.statSync(inputPath).size;

    try {
      let pipeline = sharp(inputPath).resize(task.width);

      if (task.output.endsWith('.webp')) {
        pipeline = pipeline.webp({ quality: 80 });
      } else if (task.output.endsWith('.png')) {
        pipeline = pipeline.png({ quality: 80, compressionLevel: 9 });
      }

      await pipeline.toFile(outputPath);

      const outputSize = fs.statSync(outputPath).size;
      const saved = ((1 - outputSize / inputSize) * 100).toFixed(1);
      console.log(`OK: ${task.input} (${(inputSize/1024).toFixed(0)}KB) -> ${task.output} (${(outputSize/1024).toFixed(0)}KB) | Saved ${saved}%`);
    } catch (err) {
      console.log(`ERROR: ${task.input}: ${err.message}`);
    }
  }
}

compressImages();
