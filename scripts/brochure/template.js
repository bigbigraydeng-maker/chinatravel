/**
 * Brochure template — turns a brochure data object into a single print-ready
 * HTML string. Pure function, no filesystem or network access, so it can be
 * unit-tested directly (see __tests__/brochure.test.js).
 *
 * Page order is derived from the data, not hard-coded:
 *   cover · overview · [ city opener + N card pages ] × cities · closing
 *
 * Colours are the CTS brand tokens from tailwind.config.js (primary #B61E2E,
 * secondary #D6A756, ink #23201C, surface #FBF7F0). Kept as literals here on
 * purpose: this file is rendered by headless Chrome outside the Next build, so
 * it never sees Tailwind.
 */

const BRAND = {
  red: '#B61E2E',
  gold: '#D6A756',
  ink: '#23201C',
  body: '#44403A',
  muted: '#5A554F',
  faint: '#8A857E',
  rule: '#DCD6CC',
  surface: '#FBF7F0',
};

function esc(value) {
  return String(value == null ? '' : value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

const css = () => `
@page { size:A4; margin:0; }
* { box-sizing:border-box; -webkit-print-color-adjust:exact; print-color-adjust:exact; }
html,body { margin:0; padding:0; }
body { font-family:"Helvetica Neue",Helvetica,Arial,sans-serif; color:${BRAND.ink}; }
.page { position:relative; width:210mm; height:297mm; overflow:hidden; page-break-after:always; background:#fff; }
.page:last-child { page-break-after:auto; }
.strip { position:absolute; top:0; left:0; right:0; height:3.2mm; display:flex; z-index:6; }
.strip i { height:100%; display:block; }
.strip .a { background:${BRAND.red}; flex:1 1 auto; }
.strip .b { background:${BRAND.gold}; width:62mm; }
.hd { position:absolute; top:11mm; left:16mm; right:16mm; display:flex; justify-content:space-between;
      align-items:flex-start; z-index:6; }
.hd img { height:10.5mm; }
.hd .r { text-align:right; }
.hd .r b { display:block; font-size:6.2pt; letter-spacing:.10em; color:${BRAND.red}; }
.hd .r span { display:block; font-size:6.2pt; color:${BRAND.faint}; margin-top:.9mm; }
.ft { position:absolute; left:16mm; right:16mm; bottom:9mm; border-top:.3pt solid ${BRAND.rule}; padding-top:2.5mm;
      display:flex; justify-content:space-between; font-size:6.4pt; color:${BRAND.faint}; z-index:6; }
h1 { font-family:Georgia,serif; font-weight:700; font-size:30pt; line-height:1.05; margin:0; }
h2 { font-family:Georgia,serif; font-weight:700; font-size:19pt; line-height:1.14; margin:0 0 5mm; }
p  { font-size:9pt; line-height:1.66; color:${BRAND.body}; margin:0; }
.eyebrow { font-size:6.6pt; letter-spacing:.20em; font-weight:700; color:${BRAND.red}; text-transform:uppercase; margin-bottom:3mm; }

/* cover */
.cover-img { position:absolute; top:0; left:0; width:210mm; height:172mm; object-fit:cover; }
.cover-shade { position:absolute; top:0; left:0; width:210mm; height:172mm;
  background:linear-gradient(180deg,rgba(20,16,12,.45) 0%,rgba(20,16,12,0) 40%); }
.cover-eyebrow { position:absolute; top:16mm; left:18mm; color:#fff; font-size:7pt; letter-spacing:.34em; font-weight:600; z-index:3; }
.cover-body { position:absolute; top:187mm; left:18mm; right:18mm; }
.cover-body img.logo { height:13mm; display:block; margin-bottom:9mm; }
.cities { font-size:8.4pt; letter-spacing:.16em; font-weight:700; color:${BRAND.red}; margin-top:5mm; }
.cover-meta { display:flex; gap:16mm; margin-top:11mm; padding-top:6mm; border-top:.4pt solid ${BRAND.rule}; }
.cover-meta b { display:block; font-size:6.2pt; letter-spacing:.16em; color:${BRAND.red}; margin-bottom:2mm; }
.cover-meta span { font-size:9pt; }
.cover-foot { position:absolute; left:18mm; right:18mm; bottom:14mm; display:flex; justify-content:space-between;
  font-size:6.6pt; color:${BRAND.faint}; letter-spacing:.06em; }

/* city opener */
.hero { position:absolute; top:26mm; left:0; width:210mm; height:158mm; object-fit:cover; }
.hero-shade { position:absolute; top:26mm; left:0; width:210mm; height:158mm;
  background:linear-gradient(180deg,rgba(20,16,12,.06) 0%,rgba(20,16,12,.06) 45%,rgba(20,16,12,.68) 100%); }
.hero-title { position:absolute; left:18mm; top:140mm; color:#fff; z-index:3; }
.hero-title .d { font-size:6.6pt; letter-spacing:.28em; font-weight:700; margin-bottom:3.5mm; opacity:.94; }
.hero-title h2 { font-size:34pt; margin:0; color:#fff; letter-spacing:-.01em; }
.hero-cap { position:absolute; right:18mm; top:176mm; color:rgba(255,255,255,.9); font-size:6.4pt; letter-spacing:.10em; z-index:3; }
.ob { position:absolute; top:196mm; left:18mm; right:18mm; }
.ob h3 { font-family:Georgia,serif; font-size:15pt; margin:0 0 4mm; }
.glance { display:flex; gap:10mm; margin-top:11mm; padding-top:6mm; border-top:.4pt solid ${BRAND.rule}; }
.glance div { flex:1; }
.glance b { display:block; font-size:6.2pt; letter-spacing:.16em; color:${BRAND.red}; margin-bottom:2mm; }
.glance span { font-size:8pt; line-height:1.5; color:${BRAND.body}; }

/* card grid */
.body { position:absolute; top:30mm; left:18mm; right:18mm; bottom:20mm; }
.grid { display:flex; flex-wrap:wrap; gap:12mm 8mm; margin-top:9mm; }
.card { width:82mm; }
.card img { width:82mm; height:62mm; object-fit:cover; display:block; }
.card .d { font-size:5.9pt; letter-spacing:.18em; font-weight:700; color:${BRAND.red}; margin:3.5mm 0 1.5mm; }
.card h4 { font-family:Georgia,serif; font-size:11pt; margin:0 0 2.5mm; line-height:1.2; }
.card p { font-size:7.6pt; line-height:1.56; color:${BRAND.muted}; }
.notecard { background:${BRAND.surface}; padding:7mm 7mm; }
.notecard .d { margin-top:0; }
.sec { display:flex; justify-content:space-between; align-items:baseline; border-bottom:.4pt solid ${BRAND.rule}; padding-bottom:3mm; }
.sec h3 { font-family:Georgia,serif; font-size:15pt; margin:0; }
.sec span { font-size:6.4pt; letter-spacing:.20em; color:${BRAND.red}; font-weight:700; }

/* text pages */
.tbody { position:absolute; top:32mm; left:18mm; right:18mm; bottom:20mm; display:flex; flex-direction:column; justify-content:center; }
.route { display:flex; margin-top:9mm; }
.route div { flex:1; padding-right:6mm; }
.route b { display:block; font-family:Georgia,serif; font-size:13pt; margin-bottom:2.5mm; }
.route span { font-size:7pt; letter-spacing:.16em; color:${BRAND.red}; font-weight:700; display:block; margin-bottom:2mm; }
.route p { font-size:8pt; line-height:1.55; color:${BRAND.muted}; }
.rule { height:.4pt; background:${BRAND.rule}; margin:9mm 0; }
.note { background:${BRAND.surface}; padding:7mm 8mm; margin-top:10mm; }
.note b { display:block; font-size:6.6pt; letter-spacing:.18em; color:${BRAND.red}; margin-bottom:3mm; }
.note p { font-size:8.6pt; }
.sign { position:absolute; left:0; right:0; bottom:22mm; text-align:center; font-size:7.4pt; letter-spacing:.28em; color:${BRAND.red}; font-weight:700; }
.cred { font-size:6.6pt; line-height:1.6; color:${BRAND.faint}; margin-top:8mm; }
`;

/**
 * Assemble the photography credit sentence from whichever images in this
 * brochure carry a `credit` block. Images without one are CTS's own library.
 */
function creditLine(images) {
  const names = [];
  for (const image of Object.values(images)) {
    const author = image.credit && image.credit.author ? image.credit.author.trim() : '';
    if (author && !names.includes(author)) names.push(author);
  }
  if (names.length === 0) return 'Photography: CTS Tours library.';
  const list = names.length === 1 ? names[0] : `${names.slice(0, -1).join(', ')} and ${names[names.length - 1]}`;
  return (
    `Photography: CTS Tours library, with images by ${list}, used under Creative Commons licences ` +
    'via Wikimedia Commons. Full licence details available on request.'
  );
}

/**
 * @param {object} data     brochure content (see data/*.json)
 * @param {object} resolve  { image(key) -> src for <img>, logo -> src }
 */
function renderBrochure(data, resolve) {
  const img = (key) => resolve.image(key);
  const pages = [];
  const total =
    2 + data.cities.reduce((n, city) => n + 1 + city.pages.length, 0) + 1;

  const strip = '<div class="strip"><i class="a"></i><i class="b"></i></div>';
  const head = () =>
    `<div class="hd"><img src="${resolve.logo}" alt="CTS Tours">` +
    `<div class="r"><b>${esc(data.docTitle)}</b><span>REF ${esc(data.ref)}</span></div></div>`;
  const foot = (n) =>
    `<div class="ft"><span>${esc(data.contactLine)}</span><span>Page ${n} of ${total}</span></div>`;

  // 1 · cover
  const cover = data.cover;
  pages.push(
    '<div class="page">' +
      `<img class="cover-img" src="${img(cover.image)}" alt="${esc(cover.title)}">` +
      '<div class="cover-shade"></div>' +
      `<div class="cover-eyebrow">${esc(cover.eyebrow)}</div>` +
      `<div class="cover-body"><img class="logo" src="${resolve.logo}" alt="CTS Tours">` +
      `<h1>${esc(cover.title)}</h1>` +
      `<div class="cities">${cover.cities.map(esc).join(' &nbsp;·&nbsp; ')}</div>` +
      '<div class="cover-meta">' +
      cover.meta.map((m) => `<div><b>${esc(m.label)}</b><span>${esc(m.value)}</span></div>`).join('') +
      '</div></div>' +
      `<div class="cover-foot"><span>PREPARED FOR ${esc(data.preparedFor)}</span>` +
      `<span>Ref ${esc(data.ref)} · ${esc(cover.footNote)}</span></div>` +
      '</div>'
  );

  // 2 · overview
  const overview = data.overview;
  const route = data.cities
    .map(
      (city) =>
        `<div><span>${esc(city.days)}</span><b>${esc(city.name)}</b><p>${esc(city.hero.title)}</p></div>`
    )
    .join('');
  pages.push(
    '<div class="page">' + strip + head() +
      `<div class="tbody"><div class="eyebrow">${esc(overview.eyebrow)}</div>` +
      `<h2>${esc(overview.title)}</h2><p>${esc(overview.intro)}</p>` +
      `<div class="rule"></div><div class="route">${route}</div><div class="rule"></div>` +
      `<div class="note"><b>${esc(overview.note.title)}</b><p>${esc(overview.note.body)}</p></div>` +
      '</div>' + foot(2) + '</div>'
  );

  // 3..n-1 · one opener + N card pages per city
  let pageNo = 3;
  for (const city of data.cities) {
    const glance = city.glance
      .map((g) => `<div><b>${esc(g.label)}</b><span>${esc(g.value)}</span></div>`)
      .join('');
    pages.push(
      '<div class="page">' + strip +
        `<img class="hero" src="${img(city.hero.image)}" alt="${esc(city.hero.caption)}">` +
        '<div class="hero-shade"></div>' + head() +
        `<div class="hero-title"><div class="d">${esc(city.days)}</div><h2>${esc(city.name)}</h2></div>` +
        `<div class="hero-cap">${esc(city.hero.caption)}</div>` +
        `<div class="ob"><h3>${esc(city.hero.title)}</h3><p>${esc(city.hero.body)}</p>` +
        `<div class="glance">${glance}</div></div>` +
        foot(pageNo) + '</div>'
    );
    pageNo += 1;

    city.pages.forEach((cards, index) => {
      const rendered = cards
        .map((card) =>
          card.image
            ? `<div class="card"><img src="${img(card.image)}" alt="${esc(card.title)}">` +
              `<div class="d">${esc(card.day).toUpperCase()}</div><h4>${esc(card.title)}</h4>` +
              `<p>${esc(card.body)}</p></div>`
            : `<div class="card notecard"><div class="d">${esc(card.eyebrow).toUpperCase()}</div>` +
              `<h4>${esc(card.title)}</h4><p>${esc(card.body)}</p></div>`
        )
        .join('');
      const label = index === 0 ? `ALSO IN ${city.name.toUpperCase()}` : `${city.name.toUpperCase()} CONTINUED`;
      pages.push(
        '<div class="page">' + strip + head() +
          `<div class="body"><div class="sec"><h3>${esc(city.name)}</h3><span>${esc(label)}</span></div>` +
          `<div class="grid">${rendered}</div></div>` + foot(pageNo) + '</div>'
      );
      pageNo += 1;
    });
  }

  // n · closing
  const closing = data.closing;
  pages.push(
    '<div class="page">' + strip + head() +
      `<div class="tbody"><div class="eyebrow">${esc(closing.eyebrow)}</div>` +
      `<h2>${esc(closing.title)}</h2><p>${esc(closing.body)}</p>` +
      `<div class="note" style="margin-top:12mm"><b>${esc(closing.contact.title)}</b>` +
      `<p>${closing.contact.lines.map(esc).join('<br>')}</p></div>` +
      `<div class="cred">${esc(creditLine(data.images))}</div>` +
      `</div><div class="sign">${esc(closing.signOff)}</div>` + foot(total) + '</div>'
  );

  return (
    `<!doctype html><meta charset="utf-8"><title>${esc(data.docTitle)}</title>` +
    `<style>${css()}</style>${pages.join('')}`
  );
}

module.exports = { renderBrochure, creditLine, BRAND };
