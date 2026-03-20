const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const framesDir = path.join(__dirname, 'public', 'Frames');

async function run() {
  const jpgs = fs.readdirSync(framesDir)
    .filter(f => f.endsWith('.jpg'))
    .sort();

  if (jpgs.length === 0) {
    console.error('ERROR: No JPG files found in public/Frames/');
    process.exit(1);
  }

  console.log(`Found ${jpgs.length} JPG frames. Converting to WebP...\n`);

  for (let i = 0; i < jpgs.length; i++) {
    const inputPath = path.join(framesDir, jpgs[i]);
    const num = String(i + 1).padStart(4, '0');
    const outputPath = path.join(framesDir, `frame_${num}.webp`);

    await sharp(inputPath)
      .webp({ quality: 78 })
      .toFile(outputPath);

    if ((i + 1) % 50 === 0) console.log(`  ${i + 1} / ${jpgs.length} converted`);
  }
  console.log(`  ${jpgs.length} / ${jpgs.length} converted\n`);

  // Delete all JPGs
  for (const f of jpgs) {
    fs.unlinkSync(path.join(framesDir, f));
  }
  console.log(`Deleted ${jpgs.length} JPG files.`);

  // Print stats
  const webps = fs.readdirSync(framesDir).filter(f => f.endsWith('.webp'));
  let total = 0;
  for (const f of webps) total += fs.statSync(path.join(framesDir, f)).size;

  console.log(`\n========================================`);
  console.log(`  FRAMES:    ${webps.length}`);
  console.log(`  TOTAL:     ${(total / 1024 / 1024).toFixed(1)} MB`);
  console.log(`  PER FRAME: ${Math.round(total / webps.length / 1024)} KB`);
  console.log(`========================================`);
  console.log(`\nSet FRAME_COUNT = ${webps.length} in HeroScrollSequence.tsx`);
}

run().catch(err => { console.error(err); process.exit(1); });
