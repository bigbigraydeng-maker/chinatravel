#!/usr/bin/env node
/**
 * verify-react-peers — Phase 0 v3.1 §4.8
 *
 * CTS is pinned to React 18 (see package.json). The Ceepii redesign lifts
 * components from packages that may or may not still support React 18.
 * Ceepii's own build runs on React 19, so the Ceepii audit that reported
 * "zero React-19-only hooks" only checked source — it did not check peer
 * declarations for each dependency. This script closes that gap.
 *
 * How it works
 *   For each target package that is actually installed, read
 *   package.json.peerDependencies.react. If the range does not include "18"
 *   somewhere (^18, >=18, 17 || 18 || 19, etc.), flag it. Missing packages
 *   are reported as "skipped" — they simply haven't been added yet, which
 *   is normal at Phase 0.
 *
 * When to run
 *   - After any `npm install` / `npm ci` (a package.json postinstall hook
 *     is a good fit; wire it up when the Ceepii deps land in Phase A W1).
 *   - In CI, as a required check before build.
 *   - Also available as `npm run verify:peers`.
 *
 * Exit codes
 *   0 — all installed target packages either lack a react peer or declare 18
 *   1 — at least one installed target package declares a React-19-only peer
 */

import { readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const REPO_ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

// Ceepii-lifted deps to check. Additions here should be matched by an update
// to docs/redesign/ceepii-assessment.md §3.4 (dependency matrix).
const TARGETS = [
  '@headlessui/react',
  'motion',
  'framer-motion',
  'radix-ui',
  'next-themes',
  'react-datepicker',
  'embla-carousel-react',
  'embla-carousel-autoplay',
  'embla-carousel-fade',
  'embla-carousel-wheel-gestures',
  '@hugeicons/react',
  '@hugeicons/core-free-icons',
  'class-variance-authority',
  'rc-slider',
  '@radix-ui/react-navigation-menu',
  '@radix-ui/react-dialog',
];

async function readPkg(name) {
  const pkgPath = join(REPO_ROOT, 'node_modules', ...name.split('/'), 'package.json');
  if (!existsSync(pkgPath)) return null;
  return JSON.parse(await readFile(pkgPath, 'utf8'));
}

const problems = [];
const skipped = [];
const passed = [];

for (const name of TARGETS) {
  const pkg = await readPkg(name);
  if (!pkg) {
    skipped.push(name);
    continue;
  }
  const peer = pkg.peerDependencies?.react;
  if (!peer) {
    passed.push({ name, version: pkg.version, peer: '(none)' });
    continue;
  }
  // Accept if the peer range mentions "18" anywhere — covers ^18, >=18,
  // 17 || 18 || 19, ~18, 18.x, etc. This is a heuristic — semver range
  // arithmetic would be more precise but is heavy for this tripwire.
  if (/18/.test(peer)) {
    passed.push({ name, version: pkg.version, peer });
  } else {
    problems.push({ name, version: pkg.version, peer });
  }
}

for (const p of passed) {
  console.log(`  ok  ${p.name}@${p.version} — react peer: ${p.peer}`);
}

if (skipped.length) {
  console.log(`\n  skipped (not installed): ${skipped.join(', ')}`);
}

if (problems.length) {
  console.error('\n❌ verify-react-peers: React-19-only peers detected');
  for (const p of problems) {
    console.error(`     ${p.name}@${p.version} — peerDependencies.react = ${p.peer}`);
  }
  console.error('\nCTS is pinned to React 18 (see package.json). Options:');
  console.error('  1. Pin an earlier version of the offending package that still supports 18');
  console.error('  2. Replace with a React-18-compatible alternative');
  console.error('  3. Drop the dep and inline the needed behaviour');
  process.exit(1);
}

console.log('\n✅ verify-react-peers: all installed Ceepii-target deps declare React 18 compatibility');
