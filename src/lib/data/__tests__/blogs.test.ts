import { blogPosts, getAllBlogPosts, getBlogPostBySlug } from '@/lib/data/blogs';

/**
 * Data-integrity guards for the blog corpus.
 *
 * These exist because of a real regression: `blogs-longtail-batch1.ts` and the
 * later stand-alone files `blogs-chongqing-vs-chengdu.ts` /
 * `blogs-how-many-days-in-chongqing.ts` both defined the slugs
 * `chongqing-vs-chengdu` and `how-many-days-in-chongqing`. Nothing crashed —
 * which is exactly why it survived for two months.
 *
 * The blog corpus is assembled by concatenating ~15 separate data files into
 * one array (`blogPosts`), so nothing structurally prevents two authors from
 * claiming the same slug or the same hero image. The invariants below are the
 * only thing standing between that and a silently broken page.
 */
describe('blog corpus data integrity', () => {
  /**
   * WHY: `/blog/[slug]` resolves posts with `getBlogPostBySlug`, which is
   * `blogPosts.find(...)` — first match wins. A duplicate slug therefore makes
   * the later post permanently unreachable: it still renders in the `/blog`
   * index (that list comes from `getAllBlogPosts()`, which returns every entry),
   * but clicking it serves the *other* post's body. It also emits duplicate
   * entries from `generateStaticParams`, and puts two pages in competition for
   * the same query in search.
   */
  it('has no duplicate slugs across the merged data files', () => {
    const seen = new Map<string, string[]>();
    for (const post of blogPosts) {
      seen.set(post.slug, [...(seen.get(post.slug) ?? []), post.id]);
    }

    const duplicates = Array.from(seen.entries())
      .filter(([, ids]) => ids.length > 1)
      .map(([slug, ids]) => `${slug} (ids: ${ids.join(', ')})`);

    expect(duplicates).toEqual([]);
  });

  /**
   * WHY: the consequence the slug guard above is really protecting against.
   * Stated as an outcome rather than a property, so it keeps failing even if
   * someone "fixes" a duplicate by making `getBlogPostBySlug` cleverer: every
   * post listed on /blog must serve its own content when opened.
   */
  it('serves every listed post at its own URL', () => {
    const unreachable = getAllBlogPosts()
      .filter((post) => getBlogPostBySlug(post.slug)?.id !== post.id)
      .map((post) => `${post.slug} (id: ${post.id}) — "${post.title}"`);

    expect(unreachable).toEqual([]);
  });

  /**
   * WHY: every post carries a distinct hero image (established by PR #122).
   * Reusing one image across posts makes the /blog index look like a rendering
   * bug and weakens each post's og:image, so a repeat is a defect, not a taste
   * call. Guarding it here means the next bulk image edit cannot silently
   * collapse two posts onto the same photo.
   */
  it('gives every post a distinct hero image', () => {
    const seen = new Map<string, string[]>();
    for (const post of blogPosts) {
      seen.set(post.heroImage, [...(seen.get(post.heroImage) ?? []), post.slug]);
    }

    const shared = Array.from(seen.entries())
      .filter(([, slugs]) => slugs.length > 1)
      .map(([image, slugs]) => `${image} → ${slugs.join(', ')}`);

    expect(shared).toEqual([]);
  });

  /**
   * WHY: `post.id` is the React key for the related-posts grid on
   * `/blog/[slug]`. Duplicate ids give React duplicate sibling keys, which it
   * resolves by dropping a node — a card silently disappears from the grid.
   */
  it('has no duplicate post ids', () => {
    const ids = blogPosts.map((post) => post.id);
    const duplicates = Array.from(new Set(ids.filter((id, i) => ids.indexOf(id) !== i)));

    expect(duplicates).toEqual([]);
  });
});
