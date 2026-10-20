import Image from 'next/image';
import Link from 'next/link';

/** The only header an ad landing page has: the logo, as a link home the way visitors expect, and nothing else. */
export default function AdHeader() {
  return (
    <header className="border-b border-warm-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center px-4 py-3">
        <Link href="/" aria-label="CTS Tours home">
          <Image src="/logo.png" alt="CTS Tours" width={180} height={48} priority className="h-10 w-auto" />
        </Link>
      </div>
    </header>
  );
}
