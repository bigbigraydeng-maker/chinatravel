// Why this test exists: "domestic flights" was read by NZ customers as flights
// within New Zealand. Tour inclusions must say where the flights are.
import { tours } from '../tours';

describe('flight wording in tour inclusions', () => {
  it('never uses the ambiguous word "domestic" in inclusions', () => {
    for (const tour of tours) {
      for (const item of tour.inclusions) {
        expect({ slug: tour.slug, item }).toEqual({
          slug: tour.slug,
          item: expect.not.stringMatching(/domestic/i),
        });
      }
    }
  });

  it('tells China tour customers that NZ connecting flights are not included', () => {
    const chinaWithFlights = tours.filter(
      (t) => t.destination === 'china' && t.inclusions.some((i) => /within China/i.test(i)),
    );
    expect(chinaWithFlights.length).toBeGreaterThan(0);
    for (const tour of chinaWithFlights) {
      expect({
        slug: tour.slug,
        ok: tour.exclusions.some((e) => /Flights within New Zealand to Auckland/.test(e)),
      }).toEqual({ slug: tour.slug, ok: true });
    }
  });
});
