const fs = require('fs');
const path = require('path');
const { renderBrochure, creditLine } = require('../template');

const REPO_ROOT = path.resolve(__dirname, '..', '..', '..');
const DATA_DIR = path.resolve(__dirname, '..', 'data');
const ASSET_PREFIX = 'scripts/brochure/assets/';

const dataFiles = fs.readdirSync(DATA_DIR).filter((file) => file.endsWith('.json'));

/** Every image key the template will ask the resolver for, in page order. */
function referencedKeys(data) {
  const keys = [data.cover.image];
  for (const city of data.cities) {
    keys.push(city.hero.image);
    for (const page of city.pages) {
      for (const card of page) if (card.image) keys.push(card.image);
    }
  }
  return keys;
}

describe.each(dataFiles)('brochure data: %s', (file) => {
  const data = JSON.parse(fs.readFileSync(path.join(DATA_DIR, file), 'utf8'));

  // A missing file renders as a blank box in a PDF that goes straight to a
  // paying client, and nothing else in the pipeline would notice.
  it('points every image at a file that exists in the repo', () => {
    for (const [key, image] of Object.entries(data.images)) {
      expect(typeof image.src).toBe('string');
      expect({ key, exists: fs.existsSync(path.resolve(REPO_ROOT, image.src)) }).toEqual({ key, exists: true });
    }
  });

  it('declares every image the pages reference', () => {
    for (const key of referencedKeys(data)) {
      expect(Object.keys(data.images)).toContain(key);
    }
  });

  // Images under assets/ were sourced from Wikimedia Commons under CC licences
  // that require attribution. Shipping one without a credit is a licence breach
  // on a document we hand to customers, so it must fail the build, not review.
  it('credits every Wikimedia-sourced image', () => {
    for (const [key, image] of Object.entries(data.images)) {
      if (!image.src.startsWith(ASSET_PREFIX)) continue;
      expect({ key, author: Boolean(image.credit && image.credit.author) }).toEqual({ key, author: true });
      expect({ key, license: Boolean(image.credit && image.credit.license) }).toEqual({ key, license: true });
    }
  });

  it('names every credited photographer in the printed credit line', () => {
    const line = creditLine(data.images);
    for (const image of Object.values(data.images)) {
      if (image.credit) expect(line).toContain(image.credit.author);
    }
  });
});

describe('renderBrochure', () => {
  const data = JSON.parse(fs.readFileSync(path.join(DATA_DIR, 'china-icons-collection.json'), 'utf8'));
  const resolve = { logo: 'file://logo.png', image: (key) => `file://${key}.jpg` };

  it('lays out cover, overview, every city page and closing', () => {
    const html = renderBrochure(data, resolve);
    const pages = html.match(/class="page"/g) || [];
    const expected = 2 + data.cities.reduce((n, city) => n + 1 + city.pages.length, 0) + 1;
    expect(pages).toHaveLength(expected);
    // The footer numbering is written independently of the page loop; if the two
    // ever disagree the client gets "Page 12 of 11".
    expect(html).toContain(`Page ${expected} of ${expected}`);
  });

  it('escapes copy so an apostrophe in a place name cannot break the markup', () => {
    const withAngle = JSON.parse(JSON.stringify(data));
    withAngle.cover.title = 'Four <Cities> & Fifteen Days';
    const html = renderBrochure(withAngle, resolve);
    expect(html).toContain('Four &lt;Cities&gt; &amp; Fifteen Days');
  });
});
