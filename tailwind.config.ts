/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  // CTS is a light-only site. Without this, Tailwind 3 defaults to `media`,
  // which would activate `dark:` styling from any OS-level dark preference.
  // That is latent today (the codebase has zero `dark:` classes) but becomes
  // live the moment a Ceepii-derived component lands — those files carry
  // `dark:` variants throughout, and Ceepii's dark palette is not CTS's.
  //
  // `class` rather than `selector`: `selector` would mirror Ceepii's Tailwind 4
  // `@custom-variant` exactly, but it needs tailwindcss >= 3.4.1 and this repo
  // is on 3.4.0. The two differ only in whether `dark:` also matches an element
  // carrying `.dark` itself, versus only its descendants — and since no `.dark`
  // class is ever applied here, both leave every `dark:` variant equally inert.
  // Not worth a dependency bump during a shell-only week.
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#B61E2E',
        secondary: '#D6A756',
        accent: '#1F2937',
        light: '#F8F6F2',
        dark: '#1F2937',
        white: '#FFFFFF',
        warm: {
          50: '#FFF9F5',
          100: '#FFF3EB',
          200: '#FFE8D6',
          300: '#FFD4B0',
          400: '#E8C9A0',
          500: '#D6A756',
        },
        // Editorial redesign palette (Stitch-derived; used by /preview-home)
        ink: {
          DEFAULT: '#23201C',
          muted: '#5A554F',
        },
        surface: {
          DEFAULT: '#FBF7F0',
          card: '#FFFFFF',
          dark: '#1A1815',
        },

        // --- Ceepii-derived neutrals (Phase A W1) ---------------------------
        // Ported from the Ceepii template's oklch tokens, converted to hex.
        // Purely ADDITIVE: every CTS brand token above is untouched, and no
        // existing class resolves to a key added here.
        //
        // Three Ceepii tokens are deliberately renamed because Ceepii uses the
        // same word for a different job than CTS does. Adopting them verbatim
        // would silently repaint the site:
        //   Ceepii `primary`   = near-black #171717  -> CTS primary is brand red;  NOT adopted
        //   Ceepii `secondary` = pale grey  #F5F5F5  -> CTS secondary is gold;     adopted as `subtle`
        //   Ceepii `accent`    = hover wash #F5F5F5  -> CTS accent is dark navy;   adopted as `wash`
        // Ceepii components that use bg-accent/bg-secondary get rewritten to
        // bg-wash/bg-subtle on the way in.
        //
        // Skipped entirely: `destructive` (only ΔE≈10 from brand red — an error
        // colour that reads as branding is worse than none), `chart-1..5` (blue
        // ramp, off-brand, zero consumers), `sidebar-*` (8 tokens reachable only
        // from the shadcn sidebar block, which is not on the lift list), and the
        // whole `.dark` block (no theme provider; see darkMode note above).
        background: '#FFFFFF',
        foreground: '#23201C', // remapped from Ceepii #0A0A0A to CTS ink so lifted text inherits brand ink
        card: '#FFFFFF',
        'card-foreground': '#23201C',
        popover: '#FFFFFF',
        'popover-foreground': '#23201C',
        'primary-foreground': '#FAFAFA', // on-red text; ~6.5:1 against #B61E2E
        subtle: '#F5F5F5',
        'subtle-foreground': '#171717',
        muted: '#F5F5F5',
        'muted-foreground': '#6A7282',
        'muted-foreground-lighter': '#D1D5DC',
        wash: '#F5F5F5',
        'wash-foreground': '#171717',
        border: '#E5E7EB', // identical to Tailwind's default border colour, so bare `border` is unchanged
        input: '#E5E5E5',
        ring: '#A1A1A1',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'sans-serif'],
        serif: ['var(--font-playfair)', 'Playfair Display', 'serif'],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      boxShadow: {
        'warm': '0 4px 20px rgba(214, 167, 86, 0.15)',
        'warm-lg': '0 8px 40px rgba(214, 167, 86, 0.2)',
        'soft': '0 2px 15px rgba(0, 0, 0, 0.06)',
        'soft-lg': '0 4px 25px rgba(0, 0, 0, 0.08)',
        'editorial': '20px 20px 60px rgba(0, 0, 0, 0.05)',
      },
    },
  },
  plugins: [],
};
