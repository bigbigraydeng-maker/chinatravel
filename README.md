# CTS Tours - China Travel Specialists

A premium travel website for China travel specialists targeting New Zealanders.

## Features

- **Next.js (App Router, TypeScript, Tailwind CSS)**
- **Supabase** for database and backend
- **Responsive design** with premium visual style
- **SEO optimized** with metadata for all pages
- **Contact form** with Supabase integration

## Pages

1. **Home** - Hero, Why CTS, Baker Gu, Explore China, Premium/Value tours, Travel Guide, Heritage proof, CTA
2. **Explore China** - Destination listings
3. **Tours** - Premium and Value tour collections
4. **Travel Guide** - Travel tips and articles
5. **Baker Gu** - Expert profile
6. **Agent Resources** - Resources for travel agents
7. **Contact** - Contact form with Supabase integration

## Supabase Setup

1. Create a Supabase project
2. Run the SQL script in `supabase-init.sql` to create tables and insert demo data
3. Set up environment variables in `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Run development server:

```bash
npm run dev
```

3. Build for production:

```bash
npm run build
```

## Deployment

### Render

1. Connect your GitHub repository to Render
2. Create a new Web Service
3. Set the build command to `npm run build`
4. Set the start command to `npm start`
5. Add environment variables for Supabase

## Project Structure

```
/src
  /app
    /explore
    /tours
    /guide
    /experts
      /baker-gu
    /agents
    /contact
  /components
    Header.tsx
    Footer.tsx
  /lib
    supabase.ts
  /styles
    globals.css
```

## SEO

All pages have been optimized with:
- Custom page titles
- Meta descriptions
- Keywords
- Open Graph tags
- Twitter cards

## Visual Style

- **Premium travel brand** aesthetic
- **Specialist authority** with expert content
- **Clean modern editorial** design
- Focus on authentic China experiences
- No price-focused language (avoiding discount, cheap, budget)