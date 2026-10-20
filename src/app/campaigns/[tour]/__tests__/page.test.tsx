import * as route from '@/app/campaigns/[tour]/page';
import AdLandingPage from '@/components/ad-landing/AdLandingPage';
import { AD_LANDING_CONFIGS } from '@/lib/ad-landing/configs';
import { getTourBySlug } from '@/lib/data/tours';

jest.mock('@/lib/data/tours', () => {
  const actual = jest.requireActual<typeof import('@/lib/data/tours')>('@/lib/data/tours');
  return { ...actual, getTourBySlug: jest.fn(actual.getTourBySlug) };
});

const actualGetTourBySlug = jest.requireActual<typeof import('@/lib/data/tours')>('@/lib/data/tours').getTourBySlug;
const mockedGetTourBySlug = getTourBySlug as jest.MockedFunction<typeof getTourBySlug>;

afterEach(() => {
  mockedGetTourBySlug.mockImplementation(actualGetTourBySlug);
});

const CONFIG = AD_LANDING_CONFIGS[0];
const KEY = CONFIG.pathKey;

/** Next's notFound() throws an error whose digest is 'NEXT_NOT_FOUND'. */
function notFoundError(call: () => unknown): { digest?: string } | null {
  try {
    call();
  } catch (error) {
    return error as { digest?: string };
  }
  return null;
}

describe('ad landing route', () => {
  it('only serves the path keys of the configs', () => {
    expect(route.generateStaticParams()).toEqual(
      AD_LANDING_CONFIGS.map((config) => ({ tour: config.pathKey })),
    );
    expect(route.dynamicParams).toBe(false);
  });

  it('refreshes on a timer, so a departure that has left drops off by itself', () => {
    expect(typeof route.revalidate).toBe('number');
    expect(route.revalidate).toBeGreaterThan(0);
    expect(route.revalidate).toBeLessThanOrEqual(86400);
  });

  it('tells search engines not to list or follow the page', () => {
    const metadata = route.generateMetadata({ params: { tour: KEY } });
    expect(metadata.robots).toEqual({ index: false, follow: false });
  });

  it('does not point a canonical link at another page', () => {
    const metadata = route.generateMetadata({ params: { tour: KEY } });
    expect(metadata.alternates).toBeUndefined();
  });

  it('uses the tour name as the title', () => {
    const tour = actualGetTourBySlug('china', CONFIG.tour.tier, CONFIG.tour.slug);
    expect(tour).toBeDefined();
    const metadata = route.generateMetadata({ params: { tour: KEY } });
    expect(typeof metadata.title).toBe('string');
    expect(metadata.title).toContain(tour?.name);
  });

  it('is not listed even for an unknown path', () => {
    const metadata = route.generateMetadata({ params: { tour: 'no-such-path' } });
    expect(metadata.robots).toEqual({ index: false, follow: false });
    expect(metadata.title).toBe('Not found');
  });

  it('renders the page for a known path', () => {
    const element = route.default({ params: { tour: KEY } });
    expect(element.type).toBe(AdLandingPage);
    expect(element.props.config.pathKey).toBe(KEY);
    expect(element.props.tour.slug).toBe(CONFIG.tour.slug);
  });

  it('is a 404 for an unknown path', () => {
    const error = notFoundError(() => route.default({ params: { tour: 'no-such-path' } }));
    expect(error?.digest).toContain('NEXT_NOT_FOUND');
  });

  it('is a 404 when the tour is sold out, inactive or missing', () => {
    const real = actualGetTourBySlug('china', CONFIG.tour.tier, CONFIG.tour.slug);
    expect(real).toBeDefined();
    if (!real) return;

    const cases: Array<() => ReturnType<typeof actualGetTourBySlug>> = [
      () => ({ ...real, soldOut: true }),
      () => ({ ...real, isActive: false }),
      () => undefined,
    ];

    for (const makeTour of cases) {
      mockedGetTourBySlug.mockImplementation(makeTour);

      const error = notFoundError(() => route.default({ params: { tour: KEY } }));
      expect(error?.digest).toContain('NEXT_NOT_FOUND');

      const metadata = route.generateMetadata({ params: { tour: KEY } });
      expect(metadata.robots).toEqual({ index: false, follow: false });
    }
  });
});
