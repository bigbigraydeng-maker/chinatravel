import { existsSync, readFileSync } from 'fs';
import { join } from 'path';

/**
 * A server component that imports a plain value (a constant or helper) from a 'use client' file
 * gets a client reference object instead of the value. Jest does not enforce that boundary, so
 * the live tour page once rendered every default route as hidden. Only components (capitalised
 * names) and types may cross from a 'use client' module into the server page.
 */
const SERVER_FILES = [
  'src/app/tours/[destination]/[tier]/[tour]/page.tsx',
  'src/app/tours/[destination]/[tier]/[tour]/print/page.tsx',
];

/** PascalCase like RouteVariantView; ALL_CAPS constants such as BASE_ROUTE_ID are values, not components. */
const IS_COMPONENT = /^[A-Z][A-Za-z0-9]*[a-z][A-Za-z0-9]*$/;

function resolve(spec: string): string | null {
  if (!spec.startsWith('@/')) return null;
  const base = join(process.cwd(), 'src', spec.slice(2));
  for (const ext of ['.tsx', '.ts']) if (existsSync(base + ext)) return base + ext;
  return null;
}

describe.each(SERVER_FILES)('%s', (file) => {
  const source = readFileSync(join(process.cwd(), file), 'utf8');
  const imports = [...source.matchAll(/import\s+(?!type\b)([^;]*?)\s+from\s+'([^']+)'/g)];

  it('only takes components from client modules', () => {
    for (const [, clause, spec] of imports) {
      const target = resolve(spec);
      if (!target || !/^\s*['"]use client['"]/.test(readFileSync(target, 'utf8'))) continue;
      const named = [...clause.matchAll(/(?:^|[{,])\s*(?:type\s+)?([A-Za-z_$][\w$]*)(?:\s+as\s+[\w$]+)?\s*(?=[,}]|$)/g)]
        .map((m) => m[1])
        .filter((name) => !/^type$/.test(name));
      const defaults = clause.startsWith('{') ? [] : [clause.split(',')[0].trim()];
      for (const name of [...named.filter(() => clause.includes('{')), ...defaults]) {
        if (name.startsWith('type ')) continue;
        expect({ spec, name, isComponent: IS_COMPONENT.test(name) }).toEqual({ spec, name, isComponent: true });
      }
    }
  });
});
