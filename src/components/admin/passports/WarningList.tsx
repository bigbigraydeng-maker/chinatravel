import type { Warning } from '@/lib/passport/record';

export default function WarningList({ warnings }: { warnings: Warning[] }) {
  if (warnings.length === 0) {
    return <p className="rounded border border-green-300 bg-green-50 px-3 py-2 text-sm text-green-800">机器码校验通过，没有发现问题。确认前仍请对照照片看一眼。</p>;
  }
  return (
    <ul className="space-y-2">
      {warnings.map((w) => (
        <li
          key={w.code}
          className={`rounded border px-3 py-2 text-sm ${w.level === 'red' ? 'border-red-300 bg-red-50 text-red-800' : 'border-amber-300 bg-amber-50 text-amber-900'}`}
        >
          {w.level === 'red' ? '🔴 ' : '🟡 '}
          {w.message}
        </li>
      ))}
    </ul>
  );
}
