import { execFileSync } from 'child_process';
import path from 'path';

/**
 * Three AI composites of Baker Gu's face — generated into the Li River,
 * Zhangjiajie and the Great Wall — were removed from public/images on
 * 2026-08-30 at the owner's instruction. They depicted a real, named person
 * doing things he was not photographed doing.
 *
 * Deleting the files is not sufficient on its own. Copies remain in the
 * Supabase `tour-images` bucket and are still publicly reachable, so the way
 * this comes back is not by restoring a file — it is by someone pasting a
 * Supabase URL into tours.ts or a component, exactly as every other image on
 * the site is wired up.
 *
 * It will come back, too. They are 1792x2400 and better framed than the one
 * real portrait (768x1376), so any tool or person choosing an asset on
 * dimensions alone will pick them. That already happened once during the
 * homepage rebuild: a component plan recommended baker-gu-guilin for the
 * specialist block on the strength of its aspect ratio, having never looked at
 * the image.
 *
 * Hence a name check rather than a file check. Nothing in src/ may name these
 * three, by any path or URL.
 */

const BANNED = ['baker-gu-guilin', 'baker-gu-zhangjiajie', 'baker-gu-great-wall'];

describe('AI composite portraits stay out of the site', () => {
  it.each(BANNED)('no source file references %s', (name) => {
    const srcDir = path.join(process.cwd(), 'src');

    // grep exits 1 with no output when there are no matches, which is the
    // passing case — hence the try/catch rather than letting it throw.
    let matches = '';
    try {
      matches = execFileSync(
        'grep',
        ['-rn', '--exclude-dir=__tests__', name, srcDir],
        { encoding: 'utf8' }
      );
    } catch {
      matches = '';
    }

    expect(matches.trim()).toBe('');
  });

  it('the real portrait is still the one being used', () => {
    // The counterpart assertion: this test would also pass if someone removed
    // Baker from the homepage altogether, which is not the outcome intended.
    const srcDir = path.join(process.cwd(), 'src');
    const matches = execFileSync(
      'grep',
      ['-rln', '--exclude-dir=__tests__', 'baker-gu-portrait', srcDir],
      { encoding: 'utf8' }
    );
    expect(matches.trim().length).toBeGreaterThan(0);
  });
});
