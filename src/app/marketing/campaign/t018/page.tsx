import Link from 'next/link';
import { readFile } from 'node:fs/promises';
import path from 'node:path';

async function readDoc(relativePath: string): Promise<string> {
  const abs = path.join(process.cwd(), relativePath);
  return readFile(abs, 'utf8');
}

export default async function T018WorkbenchPage() {
  const [v2, csv] = await Promise.all([
    readDoc('docs/t018-keyword-structure-v2.md'),
    readDoc('docs/t018-keyword-import-v2.csv'),
  ]);

  return (
    <main className="min-h-screen bg-warm-50 py-10 text-accent">
      <div className="mx-auto max-w-6xl space-y-6 px-4">
        <section className="rounded-2xl border border-warm-200 bg-white p-6 shadow-soft">
          <p className="text-xs font-medium uppercase tracking-wide text-primary">Marketing Campaign Workspace</p>
          <h1 className="mt-1 font-serif text-2xl font-semibold">T018 关键词执行台</h1>
          <p className="mt-2 text-sm text-gray-700">这里集中展示 T018 的执行版本：V2 可投放版 + CSV 导入模板。</p>
          <div className="mt-3 flex flex-wrap gap-3 text-sm">
            <Link href="/marketing/campaign" className="rounded-full border border-warm-200 px-3 py-1 hover:bg-warm-50">
              返回战役看板
            </Link>
            <a href="#v2" className="rounded-full border border-warm-200 px-3 py-1 hover:bg-warm-50">
              看 V2
            </a>
            <a href="#csv" className="rounded-full border border-warm-200 px-3 py-1 hover:bg-warm-50">
              看 CSV
            </a>
          </div>
        </section>

        <section id="v2" className="rounded-2xl border border-warm-200 bg-white p-6 shadow-soft">
          <h2 className="font-serif text-xl font-semibold">V2 可投放版</h2>
          <p className="mt-1 text-xs text-gray-500">source: `docs/t018-keyword-structure-v2.md`</p>
          <pre className="mt-3 max-h-[460px] overflow-auto rounded-xl bg-warm-50 p-4 text-xs leading-relaxed text-gray-800">
            {v2}
          </pre>
        </section>

        <section id="csv" className="rounded-2xl border border-warm-200 bg-white p-6 shadow-soft">
          <h2 className="font-serif text-xl font-semibold">CSV 导入模板</h2>
          <p className="mt-1 text-xs text-gray-500">source: `docs/t018-keyword-import-v2.csv`</p>
          <pre className="mt-3 max-h-[460px] overflow-auto rounded-xl bg-warm-50 p-4 text-xs leading-relaxed text-gray-800">
            {csv}
          </pre>
        </section>
      </div>
    </main>
  );
}

