import scan from '@/lib/data/delisted-scan.cjs';

const registry = [
  {
    slug: 'sample-tour',
    nameKeywords: ['Christmas & New Year in China'],
    extraPaths: ['/sample-landing-page'],
    patterns: [
      '\\bxmas\\b',
      'christmas[\\s_/-]+new[\\s_/-]+year',
      '\\b7,?188\\b',
      '\\b22 dec(?:ember)?\\.? 2026\\b',
    ],
  },
];

const scanner = scan.buildScanner(registry);

describe('normalizeForScan', () => {
  it('decodes ampersand spellings', () => {
    const inputs = [
      'Christmas &amp; New Year',
      'Christmas &#38; New Year',
      'Christmas &#x26; New Year',
      'Christmas \\u0026 New Year',
      'Christmas &amp;amp; New Year',
    ];
    for (const input of inputs) {
      expect(scan.normalizeForScan(input)).toBe('christmas & new year');
    }
  });

  it('handles spaces and non-breaking spaces', () => {
    expect(scan.normalizeForScan('Christmas&nbsp;&amp;&nbsp;New  Year')).toBe(
      'christmas & new year'
    );
  });

  it('removes React text-node comments and escaped tags', () => {
    expect(scan.normalizeForScan('Christmas<!-- --> &amp; New Year')).toBe(
      'christmas & new year'
    );
    expect(
      scan.normalizeForScan('&lt;em&gt;Christmas&lt;/em&gt; &amp; New Year')
    ).toBe('christmas & new year');
  });

  it('normalises apostrophes', () => {
    const inputs = [
      'New Year&#x27;s Eve',
      'New Year&#39;s Eve',
      'New Year\u2019s Eve',
      "New Year\\'s Eve",
      'New Year&apos;s Eve',
    ];
    for (const input of inputs) {
      expect(scan.normalizeForScan(input)).toBe("new year's eve");
    }
  });

  it('normalises dashes', () => {
    const inputs = [
      'Christmas\u2013New Year',
      'Christmas\u2014New Year',
      'Christmas&#8211;New Year',
      'Christmas&ndash;New Year',
    ];
    for (const input of inputs) {
      expect(scan.normalizeForScan(input)).toBe('christmas-new year');
    }
  });

  it('leaves unknown entities and handles invalid code points', () => {
    expect(scan.normalizeForScan('&foo; x')).toBe('&foo; x');
    expect(scan.normalizeForScan('&#99999999999; x')).toBe('x');
  });
});

describe('slugifyForPath', () => {
  it('slugifies text for file names', () => {
    expect(scan.slugifyForPath('Christmas & New Year in China')).toBe(
      'christmas-new-year-in-china'
    );
  });
});

describe('buildScanner', () => {
  it('builds needles', () => {
    expect(scanner.needles).toContain('sample-tour');
    expect(scanner.needles).toContain('christmas & new year in china');
    expect(scanner.needles).toContain('/sample-landing-page');
  });

  it('finds the product name in every spelling', () => {
    const inputs = [
      'Christmas &amp; New Year in China',
      'Christmas &#38; New Year in China',
      'Christmas &#x26; New Year in China',
      'Christmas \\u0026 New Year in China',
      'Christmas&nbsp;&amp;&nbsp;New Year in China',
      '&lt;em&gt;Christmas&lt;/em&gt; &amp; New Year in China',
      'Christmas<!-- --> & New Year in China',
    ];
    for (const input of inputs) {
      expect(scanner.findInText(input)).toContain(
        'christmas & new year in china'
      );
    }
  });

  it('reports patterns', () => {
    expect(scanner.findInText('Xmas tour')).toContain('/\\bxmas\\b/');

    const christmasNewYear = [
      'Christmas\u2013New Year tours',
      'Christmas-New Year',
      'christmas/new year',
    ];
    for (const input of christmasNewYear) {
      expect(scanner.findInText(input)).toContain(
        '/christmas[\\s_/-]+new[\\s_/-]+year/'
      );
    }

    expect(scanner.findInText('NZ$7,188')).toContain('/\\b7,?188\\b/');
    expect(scanner.findInText('from 7188')).toContain('/\\b7,?188\\b/');

    expect(scanner.findInText('22 Dec 2026')).toContain(
      '/\\b22 dec(?:ember)?\\.? 2026\\b/'
    );
    expect(scanner.findInText('22 December 2026')).toContain(
      '/\\b22 dec(?:ember)?\\.? 2026\\b/'
    );
  });

  it('has no false positives', () => {
    const inputs = [
      'Chinese New Year festivals',
      'Christmas and New Year prep',
      'Best of China from NZD $4,080',
      'valid through 31 December 2026',
      'Golden China departs 16 November 2026',
    ];
    for (const input of inputs) {
      expect(scanner.findInText(input)).toEqual([]);
    }
  });

  it('finds matches in paths', () => {
    expect(scanner.findInPath('public/tour-maps/sample-tour.svg')).toContain(
      'sample-tour'
    );
    expect(
      scanner.findInPath('public/images/campaigns/christmas-new-year/a.webp')
    ).toContain('/christmas[\\s_/-]+new[\\s_/-]+year/');
    expect(scanner.findInPath('public/images/other/photo.webp')).toEqual([]);
  });

  it('throws on an invalid pattern', () => {
    expect(() => scan.buildScanner([{ slug: 'x', patterns: ['('] }])).toThrow();
  });
});
