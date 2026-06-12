import type { ReactNode, SVGProps } from 'react';

/**
 * Lightweight inline-SVG icon set.
 *
 * Zero runtime dependency — replaces decorative emoji across the site with
 * clean, monochrome line icons that inherit the surrounding text colour
 * (e.g. `text-primary`). Matches the project's existing inline-SVG convention
 * (Testimonials, ItineraryRouteSchematic) rather than pulling in an icon
 * package. Sizing is controlled by the caller via `className` (defaults to
 * `w-5 h-5`).
 *
 * Decorative by default (`aria-hidden`). Pass `title` to expose an accessible
 * label (renders <title> + role="img").
 */

export type IconName =
  // travel & transport
  | 'plane' | 'bus' | 'car' | 'train' | 'ship' | 'bike' | 'footprints'
  | 'luggage' | 'compass' | 'globe' | 'map' | 'map-pin' | 'ticket' | 'passport'
  // places
  | 'landmark' | 'building' | 'mountain' | 'home' | 'bridge' | 'lantern' | 'shield'
  // nature & season
  | 'sun' | 'cloud' | 'snowflake' | 'leaf' | 'flower' | 'sparkles' | 'sunrise'
  | 'sprout' | 'flame' | 'paw'
  // info & ui
  | 'coins' | 'calendar' | 'clock' | 'file-text' | 'phone' | 'mail'
  | 'credit-card' | 'message' | 'users' | 'graduation-cap' | 'briefcase'
  | 'camera' | 'utensils' | 'coffee' | 'check' | 'check-circle'
  | 'alert-triangle' | 'search' | 'star' | 'chevron-down' | 'arrow-down'
  | 'target' | 'heart' | 'smile' | 'pencil';

const PATHS: Record<IconName, ReactNode> = {
  // ── travel & transport ────────────────────────────────────────────────
  plane: <><path d="M21 4 L3 11 l7 3 3 7 z" /><path d="M21 4 L10 14" /></>,
  bus: (
    <>
      <rect x="3" y="5" width="15" height="11" rx="2" />
      <line x1="3" y1="11" x2="18" y2="11" />
      <circle cx="7" cy="18.5" r="1.5" />
      <circle cx="14" cy="18.5" r="1.5" />
    </>
  ),
  car: (
    <>
      <path d="M5 16 v-5 l2-4 h8 l2 4 v5" />
      <line x1="3" y1="16" x2="21" y2="16" />
      <circle cx="7.5" cy="18.5" r="1.5" />
      <circle cx="16.5" cy="18.5" r="1.5" />
    </>
  ),
  train: (
    <>
      <rect x="6" y="3" width="12" height="14" rx="2" />
      <line x1="6" y1="11" x2="18" y2="11" />
      <line x1="8" y1="20" x2="6" y2="22" />
      <line x1="16" y1="20" x2="18" y2="22" />
    </>
  ),
  ship: (
    <>
      <path d="M3 17 l2 4 h14 l2-4 z" />
      <line x1="12" y1="3" x2="12" y2="17" />
      <path d="M12 5 l6 4 -6 2 z" />
    </>
  ),
  bike: (
    <>
      <circle cx="6" cy="17" r="3" />
      <circle cx="18" cy="17" r="3" />
      <path d="M6 17 l4-7 h5" />
      <line x1="9" y1="7" x2="12" y2="7" />
    </>
  ),
  footprints: (
    <>
      <ellipse cx="8" cy="9" rx="2" ry="3" />
      <ellipse cx="15" cy="14" rx="2" ry="3" />
    </>
  ),
  luggage: (
    <>
      <rect x="5" y="8" width="14" height="12" rx="2" />
      <path d="M9 8 V5 h6 v3" />
      <line x1="10" y1="11" x2="10" y2="17" />
    </>
  ),
  compass: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M16 8 l-2 6 -6 2 2-6 z" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <ellipse cx="12" cy="12" rx="4" ry="9" />
    </>
  ),
  map: (
    <>
      <path d="M9 4 L3 6 v14 l6-2 6 2 6-2 V4 l-6 2 z" />
      <line x1="9" y1="4" x2="9" y2="18" />
      <line x1="15" y1="6" x2="15" y2="20" />
    </>
  ),
  'map-pin': (
    <>
      <path d="M12 21 s7-7 7-12 a7 7 0 0 0-14 0 c0 5 7 12 7 12 z" />
      <circle cx="12" cy="9" r="2.5" />
    </>
  ),
  ticket: (
    <>
      <rect x="3" y="7" width="18" height="10" rx="2" />
      <line x1="9" y1="7" x2="9" y2="17" strokeDasharray="2 2" />
    </>
  ),
  passport: (
    <>
      <rect x="5" y="3" width="14" height="18" rx="2" />
      <circle cx="12" cy="10" r="3" />
      <line x1="9" y1="16" x2="15" y2="16" />
    </>
  ),

  // ── places ────────────────────────────────────────────────────────────
  landmark: (
    <>
      <path d="M3 9 L12 4 L21 9" />
      <line x1="5" y1="9" x2="5" y2="18" />
      <line x1="9.5" y1="9" x2="9.5" y2="18" />
      <line x1="14.5" y1="9" x2="14.5" y2="18" />
      <line x1="19" y1="9" x2="19" y2="18" />
      <line x1="3" y1="20" x2="21" y2="20" />
    </>
  ),
  building: (
    <>
      <rect x="4" y="3" width="7" height="18" />
      <rect x="13" y="8" width="7" height="13" />
      <line x1="6.5" y1="7" x2="8.5" y2="7" />
      <line x1="6.5" y1="11" x2="8.5" y2="11" />
      <line x1="15.5" y1="12" x2="17.5" y2="12" />
    </>
  ),
  mountain: <path d="M3 20 L9.5 7 L14 15 L16.5 10 L21 20 Z" />,
  home: (
    <>
      <path d="M4 11 L12 4 L20 11 V21 H4 Z" />
      <line x1="10" y1="21" x2="10" y2="15" />
      <line x1="14" y1="21" x2="14" y2="15" />
    </>
  ),
  bridge: (
    <>
      <line x1="3" y1="8" x2="3" y2="16" />
      <line x1="21" y1="8" x2="21" y2="16" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <path d="M3 16 c4-5 14-5 18 0" />
    </>
  ),
  lantern: (
    <>
      <ellipse cx="12" cy="12" rx="5" ry="6" />
      <line x1="12" y1="3" x2="12" y2="6" />
      <line x1="9" y1="6.5" x2="15" y2="6.5" />
      <line x1="9" y1="17.5" x2="15" y2="17.5" />
      <line x1="12" y1="18" x2="12" y2="21" />
    </>
  ),
  shield: <path d="M12 3 l8 3 v6 c0 5-4 8-8 9 c-4-1-8-4-8-9 V6 z" />,

  // ── nature & season ───────────────────────────────────────────────────
  sun: (
    <>
      <circle cx="12" cy="12" r="4" />
      <line x1="12" y1="2" x2="12" y2="5" />
      <line x1="12" y1="19" x2="12" y2="22" />
      <line x1="2" y1="12" x2="5" y2="12" />
      <line x1="19" y1="12" x2="22" y2="12" />
      <line x1="5" y1="5" x2="7" y2="7" />
      <line x1="17" y1="17" x2="19" y2="19" />
      <line x1="19" y1="5" x2="17" y2="7" />
      <line x1="7" y1="17" x2="5" y2="19" />
    </>
  ),
  cloud: <path d="M6 19 h11 a3.5 3.5 0 0 0 0-7 a5 5 0 0 0-9.5-1 A3.5 3.5 0 0 0 6 19 z" />,
  snowflake: (
    <>
      <line x1="12" y1="2" x2="12" y2="22" />
      <line x1="3" y1="7" x2="21" y2="17" />
      <line x1="21" y1="7" x2="3" y2="17" />
      <path d="M12 2 l-2 2 M12 2 l2 2 M12 22 l-2-2 M12 22 l2-2" />
    </>
  ),
  leaf: (
    <>
      <path d="M4 20 C4 10 12 4 20 4 C20 14 12 20 4 20 Z" />
      <line x1="4" y1="20" x2="14" y2="10" />
    </>
  ),
  flower: (
    <>
      <circle cx="12" cy="12" r="2.5" />
      <circle cx="12" cy="6" r="2.5" />
      <circle cx="18" cy="12" r="2.5" />
      <circle cx="12" cy="18" r="2.5" />
      <circle cx="6" cy="12" r="2.5" />
    </>
  ),
  sparkles: <path d="M12 3 L13.5 10.5 L21 12 L13.5 13.5 L12 21 L10.5 13.5 L3 12 L10.5 10.5 Z" />,
  sunrise: (
    <>
      <line x1="3" y1="20" x2="21" y2="20" />
      <path d="M5 16 a7 7 0 0 1 14 0" />
      <line x1="12" y1="3" x2="12" y2="7" />
      <line x1="5" y1="9" x2="7" y2="11" />
      <line x1="19" y1="9" x2="17" y2="11" />
    </>
  ),
  sprout: (
    <>
      <path d="M12 20 V10" />
      <path d="M12 12 C8 12 5 9 5 5 c4 0 7 3 7 7 z" />
      <path d="M12 11 c0-3 3-6 7-6 c0 4-3 6-7 6 z" />
    </>
  ),
  flame: <path d="M12 22 c3.3 0 6-2.5 6-6 c0-4-4-5-3-10 c-3 2-5 4-5 7 c-1-0.5-1.5-2-1.5-3 c-2 1.5-2.5 4-2.5 6 c0 3.5 2.7 6 6 6 z" />,
  paw: (
    <>
      <circle cx="7" cy="9" r="1.8" />
      <circle cx="12" cy="7" r="1.8" />
      <circle cx="17" cy="9" r="1.8" />
      <path d="M8.5 15 a3.5 3.5 0 0 1 7 0 a2.8 2.8 0 0 1-7 0 z" />
    </>
  ),

  // ── info & ui ─────────────────────────────────────────────────────────
  coins: (
    <>
      <ellipse cx="12" cy="7" rx="7" ry="3" />
      <path d="M5 7 v5 c0 1.7 3 3 7 3 s7-1.3 7-3 V7" />
      <path d="M5 12 v5 c0 1.7 3 3 7 3 s7-1.3 7-3 v-5" />
    </>
  ),
  calendar: (
    <>
      <rect x="4" y="5" width="16" height="16" rx="2" />
      <line x1="4" y1="9" x2="20" y2="9" />
      <line x1="9" y1="3" x2="9" y2="6" />
      <line x1="15" y1="3" x2="15" y2="6" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7 v5 l3 2" />
    </>
  ),
  'file-text': (
    <>
      <path d="M14 3 H7 a2 2 0 0 0-2 2 v14 a2 2 0 0 0 2 2 h10 a2 2 0 0 0 2-2 V8 z" />
      <path d="M14 3 v5 h5" />
      <line x1="9" y1="13" x2="15" y2="13" />
      <line x1="9" y1="17" x2="15" y2="17" />
    </>
  ),
  phone: <path d="M5 4 h4 l2 5 -2.5 1.5 a11 11 0 0 0 5 5 L16 13 l5 2 v4 a2 2 0 0 1-2 2 A16 16 0 0 1 3 6 a2 2 0 0 1 2-2 z" />,
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7 l9 6 9-6" />
    </>
  ),
  'credit-card': (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </>
  ),
  message: <path d="M4 5 h13 a2 2 0 0 1 2 2 v6 a2 2 0 0 1-2 2 H9 l-4 4 v-4 H4 a2 2 0 0 1-2-2 V7 a2 2 0 0 1 2-2 z" />,
  users: (
    <>
      <circle cx="9" cy="7" r="3" />
      <path d="M3 20 c0-4 3-6 6-6 s6 2 6 6" />
      <circle cx="17.5" cy="8" r="2" />
      <path d="M21 20 c0-3-1.5-5-4-5" />
    </>
  ),
  'graduation-cap': (
    <>
      <path d="M2 9 L12 5 L22 9 L12 13 Z" />
      <path d="M6 11 v4 c0 1 3 2 6 2 s6-1 6-2 v-4" />
    </>
  ),
  briefcase: (
    <>
      <rect x="3" y="8" width="18" height="12" rx="2" />
      <path d="M9 8 V6 a2 2 0 0 1 2-2 h2 a2 2 0 0 1 2 2 v2" />
    </>
  ),
  camera: (
    <>
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <circle cx="12" cy="13.5" r="3.5" />
      <path d="M8 7 l2-3 h4 l2 3" />
    </>
  ),
  utensils: (
    <>
      <path d="M5 3 v5 a2 2 0 0 0 4 0 V3" />
      <line x1="7" y1="8" x2="7" y2="21" />
      <path d="M16 3 c-1.5 1.5-1.5 5-0.5 7 H17 v11" />
    </>
  ),
  coffee: (
    <>
      <path d="M4 8 h13 v4 a5 5 0 0 1-5 5 H9 a5 5 0 0 1-5-5 z" />
      <path d="M17 9 h2 a2 2 0 0 1 0 4 h-2" />
      <line x1="7" y1="3" x2="7" y2="5" />
      <line x1="11" y1="3" x2="11" y2="5" />
    </>
  ),
  check: <polyline points="4 12 9 17 20 6" />,
  'check-circle': (
    <>
      <circle cx="12" cy="12" r="9" />
      <polyline points="8 12 11 15 16 9" />
    </>
  ),
  'alert-triangle': (
    <>
      <path d="M12 3 L22 20 H2 Z" />
      <line x1="12" y1="9" x2="12" y2="14" />
      <line x1="12" y1="17" x2="12" y2="17.5" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <line x1="16" y1="16" x2="21" y2="21" />
    </>
  ),
  star: <path d="M12 3 l2.7 5.5 6 .9 -4.35 4.25 1.05 6 -5.4-2.85 -5.4 2.85 1.05-6 L3.3 9.4 l6-.9 z" />,
  'chevron-down': <polyline points="6 9 12 15 18 9" />,
  'arrow-down': (
    <>
      <line x1="12" y1="4" x2="12" y2="20" />
      <polyline points="6 14 12 20 18 14" />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1.5" />
    </>
  ),
  heart: <path d="M12 21 C5 15 3 11 3 8 a4.5 4.5 0 0 1 9-1 a4.5 4.5 0 0 1 9 1 c0 3-2 7-9 13 z" />,
  smile: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M8 14 a4 4 0 0 0 8 0" />
      <line x1="9" y1="10" x2="9" y2="10.5" />
      <line x1="15" y1="10" x2="15" y2="10.5" />
    </>
  ),
  pencil: (
    <>
      <path d="M4 20 h4 L19 9 l-4-4 L4 16 z" />
      <line x1="13.5" y1="6.5" x2="17.5" y2="10.5" />
    </>
  ),
};

export interface IconProps extends Omit<SVGProps<SVGSVGElement>, 'name'> {
  name: IconName;
  /** Render the glyph filled (currentColor) instead of stroked — used for star ratings. */
  filled?: boolean;
  /** Accessible label. When set, the icon is exposed to assistive tech; otherwise it is decorative. */
  title?: string;
}

export function Icon({ name, filled = false, title, className = 'w-5 h-5', ...rest }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill={filled ? 'currentColor' : 'none'}
      stroke={filled ? 'none' : 'currentColor'}
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      {...rest}
    >
      {title ? <title>{title}</title> : null}
      {PATHS[name]}
    </svg>
  );
}

export default Icon;
