import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const SOURCE_DIR = 'public/images';
const OUTPUT_DIR = 'optimized';

interface ImageStats {
  filename: string;
  category: string;
  originalSize: number;
  webpSize: number;
  jpegSize: number;
  compressed: number;
}

interface OptimizationConfig {
  type: 'hero' | 'gallery' | 'thumbnail' | 'portrait';
  webpQuality: number;
  jpegQuality: number;
  sizes: number[];
}

const configs: Record<string, OptimizationConfig> = {
  hero: {
    type: 'hero',
    webpQuality: 85,
    jpegQuality: 80,
    sizes: [640, 1024, 1920]
  },
  gallery: {
    type: 'gallery',
    webpQuality: 80,
    jpegQuality: 75,
    sizes: [400, 600, 1000]
  },
  credentials: {
    type: 'thumbnail',
    webpQuality: 85,
    jpegQuality: 80,
    sizes: [300, 500]
  },
  portrait: {
    type: 'portrait',
    webpQuality: 85,
    jpegQuality: 80,
    sizes: [300, 500]
  }
};

async function ensureOutputDir() {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }
}

function getConfigForPath(filePath: string): OptimizationConfig {
  if (filePath.includes('credentials')) return configs.credentials;
  if (filePath.includes('tours') || filePath.includes('guides')) return configs.gallery;
  if (filePath.includes('portrait') || filePath.includes('baker-gu')) return configs.portrait;
  return configs.hero;
}

async function optimizeImage(
  inputPath: string,
  outputSubdir: string,
  filename: string,
  stats: ImageStats[]
): Promise<void> {
  try {
    const config = getConfigForPath(inputPath);
    const image = sharp(inputPath);
    const metadata = await image.metadata();

    if (!metadata.width || !metadata.height) {
      console.error(`⚠️  Skipping ${filename}: unable to read dimensions`);
      return;
    }

    // Create output directory
    const outputPath = path.join(OUTPUT_DIR, outputSubdir);
    if (!fs.existsSync(outputPath)) {
      fs.mkdirSync(outputPath, { recursive: true });
    }

    const originalSize = fs.statSync(inputPath).size;
    let totalSize = 0;

    // Generate responsive variants
    for (const width of config.sizes) {
      // Skip if original is smaller than target
      if (metadata.width < width) continue;

      const baseName = filename.replace(/\.[^.]+$/, '');

      // WebP variant
      const webpPath = path.join(outputPath, `${baseName}-${width}w.webp`);
      const webpBuffer = await sharp(inputPath)
        .resize(width, undefined, { withoutEnlargement: true })
        .webp({ quality: config.webpQuality })
        .toBuffer();

      fs.writeFileSync(webpPath, webpBuffer);
      totalSize += webpBuffer.length;

      // JPEG fallback
      const jpegPath = path.join(outputPath, `${baseName}-${width}w.jpg`);
      const jpegBuffer = await sharp(inputPath)
        .resize(width, undefined, { withoutEnlargement: true })
        .jpeg({ quality: config.jpegQuality })
        .toBuffer();

      fs.writeFileSync(jpegPath, jpegBuffer);
      totalSize += jpegBuffer.length;
    }

    // Also save original filename versions (for backward compatibility)
    const baseName = filename.replace(/\.[^.]+$/, '');
    const defaultWebp = path.join(outputPath, `${baseName}.webp`);
    const defaultJpeg = path.join(outputPath, `${baseName}.jpg`);

    const defaultWebpBuffer = await sharp(inputPath)
      .webp({ quality: config.webpQuality })
      .toBuffer();
    fs.writeFileSync(defaultWebp, defaultWebpBuffer);

    const defaultJpegBuffer = await sharp(inputPath)
      .jpeg({ quality: config.jpegQuality })
      .toBuffer();
    fs.writeFileSync(defaultJpeg, defaultJpegBuffer);

    totalSize += defaultWebpBuffer.length + defaultJpegBuffer.length;

    const compressed = ((1 - totalSize / originalSize) * 100).toFixed(1);
    stats.push({
      filename,
      category: outputSubdir,
      originalSize,
      webpSize: defaultWebpBuffer.length,
      jpegSize: defaultJpegBuffer.length,
      compressed: parseFloat(compressed)
    });

    console.log(
      `✓ ${filename.padEnd(40)} | ${(originalSize / 1024 / 1024).toFixed(2)}MB → ${(totalSize / 1024 / 1024).toFixed(2)}MB (${compressed}% compressed)`
    );
  } catch (error) {
    console.error(`✗ Error optimizing ${filename}:`, error);
  }
}

async function processDirectory(dir: string, relDir: string = '', stats: ImageStats[] = []): Promise<ImageStats[]> {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    const relPath = relDir ? path.join(relDir, entry.name) : entry.name;

    if (entry.isDirectory()) {
      await processDirectory(fullPath, relPath, stats);
    } else if (/\.(jpg|png|jpeg)$/i.test(entry.name)) {
      await optimizeImage(fullPath, relPath.replace(/\\/g, '/').replace(/\.[^.]+$/, ''), entry.name, stats);
    }
  }

  return stats;
}

async function main() {
  console.log('🚀 Starting image optimization...\n');
  await ensureOutputDir();

  const stats: ImageStats[] = [];
  await processDirectory(SOURCE_DIR, '', stats);

  // Generate migration manifest
  const manifest = {
    timestamp: new Date().toISOString(),
    totalImages: stats.length,
    totalOriginalSize: stats.reduce((sum, s) => sum + s.originalSize, 0),
    totalOptimizedSize: stats.reduce((sum, s) => sum + s.webpSize + s.jpegSize, 0),
    images: stats.sort((a, b) => b.originalSize - a.originalSize)
  };

  fs.writeFileSync(
    path.join(OUTPUT_DIR, 'migration-manifest.json'),
    JSON.stringify(manifest, null, 2)
  );

  // Summary
  const totalOriginal = manifest.totalOriginalSize / 1024 / 1024;
  const totalOptimized = manifest.totalOptimizedSize / 1024 / 1024;
  const avgCompression = (
    (1 - manifest.totalOptimizedSize / manifest.totalOriginalSize) *
    100
  ).toFixed(1);

  console.log('\n📊 Optimization Summary:');
  console.log('═══════════════════════════════════════════════════');
  console.log(`Total images processed:  ${manifest.totalImages}`);
  console.log(`Original total size:     ${totalOriginal.toFixed(2)}MB`);
  console.log(`Optimized total size:    ${totalOptimized.toFixed(2)}MB`);
  console.log(`Total saved:             ${(totalOriginal - totalOptimized).toFixed(2)}MB`);
  console.log(`Average compression:     ${avgCompression}%`);
  console.log('═══════════════════════════════════════════════════');

  // Top 10 largest files
  console.log('\n🔝 Top 10 Largest Original Files:');
  stats.slice(0, 10).forEach((s, i) => {
    console.log(
      `${i + 1}. ${s.filename.padEnd(45)} ${(s.originalSize / 1024 / 1024).toFixed(2)}MB`
    );
  });

  console.log(`\n✅ Manifest saved to: ${path.join(OUTPUT_DIR, 'migration-manifest.json')}`);
  console.log(`📁 Optimized images in: ${OUTPUT_DIR}`);
}

main().catch(console.error);
