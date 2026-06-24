#!/bin/bash
# render-quiz-collage.sh <quiz-slug>
#
# Renders /dev/quiz-collage/<slug> via headless Chrome and writes the result
# to public/images/play/<slug>/collage.png — the static asset used by the
# /play/<slug> hero, OG card and Meta Reel ad creative.
#
# Workflow for a new "spot-the-lie" quiz:
#   1. Drop the 6 panel images into public/images/play/<slug>/panel-{A,B,C,D,E,F}.png
#   2. Add the quiz entry to src/lib/data/play-quizzes.ts (format: 'spot-the-lie')
#   3. Start the dev server:  npm run dev   (port 3010 — adjust DEV_URL below if you change it)
#      OR: PORT=6001 npx next dev -p 6001 -H 127.0.0.1
#   4. Run this script:   ./scripts/render-quiz-collage.sh <slug>
#
# The renderer (src/app/dev/quiz-collage/[slug]/page.tsx) reads the quiz spec
# directly from play-quizzes.ts — no template editing needed for new quizzes
# that share the spot-the-lie format.

set -euo pipefail

SLUG="${1:?Usage: $0 <quiz-slug> [DEV_URL]}"
DEV_URL="${2:-http://127.0.0.1:3010}"

REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
OUT="${REPO_ROOT}/public/images/play/${SLUG}/collage.png"
URL="${DEV_URL}/dev/quiz-collage/${SLUG}"
CHROME="${CHROME:-/Applications/Google Chrome.app/Contents/MacOS/Google Chrome}"

if [ ! -d "$(dirname "$OUT")" ]; then
  echo "✗ No quiz folder at $(dirname "$OUT") — create it and drop your 6 panel-{A..F}.png images first." >&2
  exit 1
fi

if [ ! -x "$CHROME" ]; then
  echo "✗ Chrome not found at: $CHROME" >&2
  echo "  Set CHROME=/path/to/chromium to override." >&2
  exit 1
fi

if ! curl -s --max-time 2 "$DEV_URL" >/dev/null 2>&1; then
  echo "✗ Dev server not responding at $DEV_URL" >&2
  echo "  Start it with:  npm run dev   (default :3010)" >&2
  echo "  Or pass a custom URL:  $0 ${SLUG} http://127.0.0.1:6001" >&2
  exit 1
fi

echo "→ Rendering ${URL}"
echo "→ Output:    ${OUT}"

rm -f "$OUT"

"$CHROME" \
  --headless=new \
  --hide-scrollbars \
  --force-device-scale-factor=1 \
  --virtual-time-budget=15000 \
  --window-size=1080,1920 \
  --user-data-dir=/tmp/chrome-collage-profile \
  --screenshot="$OUT" \
  "$URL"

if [ ! -f "$OUT" ]; then
  echo "✗ Chrome did not produce a screenshot — check the dev server logs." >&2
  exit 1
fi

DIMS=$(file "$OUT" | grep -oE '[0-9]+ x [0-9]+' || true)
SIZE=$(ls -la "$OUT" | awk '{print $5}')
echo "✓ Saved ${OUT}"
echo "  ${DIMS}, ${SIZE} bytes"
