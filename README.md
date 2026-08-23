# CTS Tours — China Travel Specialists

A luxury China tour operator website for New Zealand travellers. Built with Next.js 14 (App Router), TypeScript, Tailwind CSS, and Supabase. Deployed on Render.

- **Live site:** https://www.ctstours.co.nz/
- **Contributor guide:** see [`CLAUDE.md`](./CLAUDE.md) for the full project context, conventions, git workflow, and current status — start there before making changes.

## Stack

Next.js 14 (App Router) + TypeScript + Tailwind CSS + Supabase (data/storage) + Resend (transactional email) + Mailchimp (newsletter)

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in the values below
npm run dev                  # starts on :3010 (binds 0.0.0.0 — use http://127.0.0.1:3010 if localhost fails)
```

Other scripts:

```bash
npm run dev:alt         # alternate dev port :3055, if 3010 is taken
npm run build            # production build
npm start                # start the production build
npm test                 # run the Jest suite
npm run test:watch       # Jest in watch mode
npm run lint             # next lint
```

### Environment variables

See [`.env.example`](./.env.example) for the full list with descriptions. At minimum for local dev you'll need Supabase credentials; features that need their own keys (email sends, GA4/GTM, Google Ads conversions, the `/marketing/campaign` password gate, Mailchimp, the admin tour parser) degrade gracefully or are simply inactive without them.

## Structure

```
src/
  app/
    tours/[destination]/[tier]/[tour]/   # tour detail pages (dynamic route)
    campaigns/october-2026/[slug]/       # October 2026 ad landing pages
    marketing/campaign/                  # password-gated campaign ops board
    [various]/                           # SEO hub pages, destination guides, blog posts, tools
  components/                            # Hero, tour components, SEO components, etc.
  lib/
    data/tours.ts                        # canonical tour data (destinations × tiers)
    data/guides.ts                       # destination/guide content
    data/blogs-*.ts                      # blog post content
```

Destinations: beijing, xian, shanghai, chengdu, guilin, zhangjiajie, yunnan. Tiers: signature, discovery, stopover.

## Deployment

Render watches the `main` branch — only merged PRs trigger a deploy. Build command `npm run build`, start command `npm start`. See `render.yaml` for the full config and [`CLAUDE.md`](./CLAUDE.md) for the branch/PR workflow this repo follows.
