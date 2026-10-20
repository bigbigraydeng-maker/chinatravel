import Image from 'next/image';
import Link from 'next/link';

/**
 * The only header an ad landing page has: the logo, as a link home the way visitors expect, and nothing else. The logo is a
 * 480 px copy of /logo.png (the original is 3543 px wide and 193 KB, for a logo shown 157 px wide), so it does not hold up the
 * first picture of the page on a slow phone connection.
 */
export default function AdHeader() {
  return (
    <header className="border-b border-warm-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center px-4 py-3">
        <Link href="/" aria-label="CTS Tours home">
          <Image src="/logo-header-480.webp" alt="CTS Tours" width={480} height={122} priority className="h-10 w-auto" />
        </Link>
      </div>
    </header>
  );
}
