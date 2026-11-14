/**
 * Other departments act on this list: anything expired or under 6 months at
 * departure must appear, and passports fine for the trip must not add noise.
 */
import { buildExpiryReport } from '../expiry';
import { parseFields } from '../parse-fields';

const TODAY = new Date(Date.UTC(2026, 10, 15));
const base = { id: 't', surname: 'SMITH', givenNames: 'JANE', maskedNumber: '•••••4567', contactEmail: null, tourName: 'China Discovery' };

describe('buildExpiryReport', () => {
  it('lists passports under 6 months at departure, worst first', () => {
    const rows = buildExpiryReport(
      [
        { ...base, id: 'a', expiryDate: '2027-07-01', departureDate: '2027-05-13' },
        { ...base, id: 'b', expiryDate: '2027-05-01', departureDate: '2027-05-13' },
        { ...base, id: 'c', expiryDate: '2030-01-01', departureDate: '2027-05-13' },
      ],
      TODAY
    );
    expect(rows.map((r) => [r.id, r.status])).toEqual([
      ['b', 'expired'],
      ['a', 'short'],
    ]);
  });

  it('flags passports ending within 12 months for travellers not yet booked', () => {
    const rows = buildExpiryReport([{ ...base, expiryDate: '2027-09-01', departureDate: null, tourName: null }], TODAY);
    expect(rows[0].status).toBe('within_12_months');
  });
});

describe('parseFields', () => {
  it('rejects wrong types and unknown sex values', () => {
    expect(parseFields({ surname: 1 })).toBeNull();
    expect(parseFields({ sex: 'Q' })).toBeNull();
    expect(parseFields({ surname: ' SMITH ' })?.surname).toBe('SMITH');
  });
});
