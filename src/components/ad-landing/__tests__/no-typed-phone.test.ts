/**
 * Why this test exists: the CTS phone number lives in one place, src/lib/site.ts. A number typed into an ad landing
 * component would be left behind on the day the number changes, and paid visitors would keep ringing the old one.
 */
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const DIRECTORY = join(process.cwd(), 'src/components/ad-landing');

describe('ad landing components', () => {
  it('never type a tel: link; the number comes from src/lib/site.ts', () => {
    const offenders = readdirSync(DIRECTORY)
      .filter((name) => name.endsWith('.tsx'))
      .filter((name) => readFileSync(join(DIRECTORY, name), 'utf8').includes('tel:'));

    expect(offenders).toEqual([]);
  });
});
