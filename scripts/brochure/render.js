#!/usr/bin/env node
/**
 * Client brochure generator — turns a brochure data file into a print-ready
 * A4 PDF, using headless Chrome for layout (no PDF library, same reason the
 * itinerary print route uses window.print(): the browser is already the most
 * reliable renderer we have, and the HTML stays editable).
 *
 * Usage:
 *   node scripts/brochure/render.js <data.json> [--out <file.pdf>] [--width <px>] [--html-only]
 *   npm run brochure -- scripts/brochure/data/china-icons-collection.json
 *
 * Image paths in the data file are repo-relative, so they can point either at
 * scripts/brochure/assets/ (photos sourced for brochures) or at public/
 * (photos the website already ships). Nothing is copied or duplicated.
 *
 * Every photo is downscaled through sharp before it reaches Chrome. Without it
 * the originals go in at full resolution and the PDF lands around 20 MB, which
 * is past what most client inboxes accept — 1400px is still more than A4 needs
 * at print resolution.
 *
 * Requires Google Chrome on the machine. Override the binary with CHROME_PATH.
 */

const fs = require('fs');
const os = require('os');
const path = require('path');
const { execFileSync } = require('child_process');
const sharp = require('sharp');
const { renderBrochure } = require('./template');

const REPO_ROOT = path.resolve(__dirname, '..', '..');
const DEFAULT_WIDTH = 1400;
const JPEG_QUALITY = 72;

const CHROME_CANDIDATES = [
  process.env.CHROME_PATH,
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/Applications/Chromium.app/Contents/MacOS/Chromium',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
  '/usr/bin/chromium-browser',
].filter(Boolean);

function findChrome() {
  const found = CHROME_CANDIDATES.find((candidate) => fs.existsSync(candidate));
  if (!found) {
    throw new Error(
      'Google Chrome not found. Install Chrome, or set CHROME_PATH to the binary:\n' +
        '  CHROME_PATH="/path/to/chrome" npm run brochure -- <data.json>'
    );
  }
  return found;
}

function parseArgs(argv) {
  const args = { dataFile: null, out: null, htmlOnly: false, width: DEFAULT_WIDTH };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === '--out') {
      args.out = argv[++i];
    } else if (arg === '--width') {
      args.width = Number(argv[++i]);
      if (!Number.isFinite(args.width) || args.width < 400) {
        throw new Error('--width must be a number of at least 400');
      }
    } else if (arg === '--html-only') {
      args.htmlOnly = true;
    } else if (!args.dataFile) {
      args.dataFile = arg;
    }
  }
  if (!args.dataFile) {
    throw new Error(
      'Usage: node scripts/brochure/render.js <data.json> [--out <file.pdf>] [--width <px>] [--html-only]'
    );
  }
  return args;
}

/**
 * Resolve every image key up front rather than lazily inside the template, so
 * a typo or a moved file fails here with the key name instead of rendering a
 * silently blank box into the client's PDF.
 */
async function buildResolver(data, workDir, width) {
  const resolved = new Map();
  for (const [key, image] of Object.entries(data.images)) {
    const absolute = path.resolve(REPO_ROOT, image.src);
    if (!fs.existsSync(absolute)) {
      throw new Error(`Image "${key}" points at a file that does not exist: ${image.src}`);
    }
    const scaled = path.join(workDir, `${key}.jpg`);
    await sharp(absolute)
      .resize({ width, withoutEnlargement: true })
      .jpeg({ quality: JPEG_QUALITY })
      .toFile(scaled);
    resolved.set(key, `file://${scaled}`);
  }
  const logo = path.resolve(REPO_ROOT, data.logo);
  if (!fs.existsSync(logo)) throw new Error(`Logo not found: ${data.logo}`);

  return {
    logo: `file://${logo}`,
    image(key) {
      if (!resolved.has(key)) throw new Error(`Unknown image key "${key}" — add it to "images" in the data file.`);
      return resolved.get(key);
    },
  };
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const data = JSON.parse(fs.readFileSync(path.resolve(args.dataFile), 'utf8'));

  // Chrome resolves relative URLs against the HTML file, and file:// images are
  // absolute, so the scratch location does not matter — but keep it out of the
  // repo so a half-finished run never gets committed.
  const workDir = fs.mkdtempSync(path.join(os.tmpdir(), 'cts-brochure-'));
  const html = renderBrochure(data, await buildResolver(data, workDir, args.width));

  const outPdf = path.resolve(args.out || `${data.slug}.pdf`);
  const htmlPath = path.join(workDir, `${data.slug}.html`);
  fs.writeFileSync(htmlPath, html);

  if (args.htmlOnly) {
    process.stdout.write(`HTML written to ${htmlPath}\n`);
    return;
  }

  execFileSync(
    findChrome(),
    [
      '--headless',
      '--disable-gpu',
      '--no-pdf-header-footer',
      `--print-to-pdf=${outPdf}`,
      '--virtual-time-budget=25000',
      `file://${htmlPath}`,
    ],
    { stdio: 'ignore' }
  );

  const sizeMb = (fs.statSync(outPdf).size / (1024 * 1024)).toFixed(1);
  process.stdout.write(`${outPdf}  (${sizeMb} MB)\n`);
}

main().catch((error) => {
  process.stderr.write(`${error.message}\n`);
  process.exit(1);
});
