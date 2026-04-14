import {
  isTailorMadeDurationValue,
  monthToTravelDateInput,
  paxToTravellersLabel,
  prefillFromSearchParams,
} from '@/lib/tailor-made-enquiry-params';

describe('tailor-made-enquiry-params', () => {
  it('parses month, duration, pax, dest from search params', () => {
    const sp = new URLSearchParams();
    sp.set('month', '2026-10');
    sp.set('duration', '10-14 days');
    sp.set('pax', '4');
    sp.set('dest', 'China,Japan');
    const p = prefillFromSearchParams(sp);
    expect(p.travelDate).toBe('2026-10-01');
    expect(p.duration).toBe('10-14 days');
    expect(p.travellers).toBe('4 travellers');
    expect(p.destinations).toEqual(['China', 'Japan']);
  });

  it('rejects invalid duration', () => {
    const sp = new URLSearchParams();
    sp.set('duration', 'not-a-real-option');
    const p = prefillFromSearchParams(sp);
    expect(p.duration).toBeUndefined();
  });

  it('monthToTravelDateInput validates', () => {
    expect(monthToTravelDateInput('2026-04')).toBe('2026-04-01');
    expect(monthToTravelDateInput('bad')).toBeNull();
    expect(monthToTravelDateInput('2026-13')).toBeNull();
  });

  it('paxToTravellersLabel', () => {
    expect(paxToTravellersLabel(1)).toBe('1 traveller');
    expect(paxToTravellersLabel(3)).toBe('3 travellers');
  });

  it('isTailorMadeDurationValue', () => {
    expect(isTailorMadeDurationValue('1 week')).toBe(true);
    expect(isTailorMadeDurationValue('invalid')).toBe(false);
  });
});
