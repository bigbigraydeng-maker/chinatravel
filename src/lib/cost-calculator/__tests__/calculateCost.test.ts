import {
  calculateCost,
  parseTourPrice,
  getSeasonForMonth,
  getFlightCostPerPerson,
  getTierBaseCost,
  type CostInput,
} from '../calculateCost';

describe('parseTourPrice', () => {
  it('parses "From NZD $4,990" → 4990', () => {
    expect(parseTourPrice('From NZD $4,990')).toBe(4990);
  });
  it('parses "NZD $7,299" → 7299', () => {
    expect(parseTourPrice('NZD $7,299')).toBe(7299);
  });
  it('parses "From NZD $1,450" → 1450', () => {
    expect(parseTourPrice('From NZD $1,450')).toBe(1450);
  });
  it('returns 0 when no number found', () => {
    expect(parseTourPrice('Price on request')).toBe(0);
  });
  it('parses price without comma', () => {
    expect(parseTourPrice('NZD $5000')).toBe(5000);
  });
});

describe('getSeasonForMonth', () => {
  it('Jan → winter', () => expect(getSeasonForMonth(1)).toBe('winter'));
  it('Feb → winter', () => expect(getSeasonForMonth(2)).toBe('winter'));
  it('Mar → spring', () => expect(getSeasonForMonth(3)).toBe('spring'));
  it('Jun → summer', () => expect(getSeasonForMonth(6)).toBe('summer'));
  it('Jul → summer', () => expect(getSeasonForMonth(7)).toBe('summer'));
  it('Aug → summer', () => expect(getSeasonForMonth(8)).toBe('summer'));
  it('Sep → autumn', () => expect(getSeasonForMonth(9)).toBe('autumn'));
  it('Oct → autumn', () => expect(getSeasonForMonth(10)).toBe('autumn'));
  it('Dec → winter', () => expect(getSeasonForMonth(12)).toBe('winter'));
});

describe('getFlightCostPerPerson', () => {
  it('returns base NZD 1400 in spring', () => {
    expect(getFlightCostPerPerson('spring')).toBe(1400);
  });
  it('adds 15% premium in summer', () => {
    expect(getFlightCostPerPerson('summer')).toBe(Math.round(1400 * 1.15));
  });
  it('adds 10% premium in autumn', () => {
    expect(getFlightCostPerPerson('autumn')).toBe(Math.round(1400 * 1.1));
  });
  it('gives 8% discount in winter', () => {
    expect(getFlightCostPerPerson('winter')).toBe(Math.round(1400 * 0.92));
  });
});

describe('getTierBaseCost', () => {
  it('signature tier → 7500', () => {
    expect(getTierBaseCost('signature')).toBe(7500);
  });
  it('discovery tier → 4500', () => {
    expect(getTierBaseCost('discovery')).toBe(4500);
  });
  it('stopover tier → 1800', () => {
    expect(getTierBaseCost('stopover')).toBe(1800);
  });
});

describe('calculateCost', () => {
  const baseInput: CostInput = {
    groupSize: 2,
    tier: 'discovery',
    travelMonth: 4, // spring
    addOns: { insurance: false, singleUpgrade: false, privateTransfer: false },
    tourPrice: '',
  };

  it('场景1: 2人 discovery spring，无增项', () => {
    const result = calculateCost(baseInput);
    const expectedFlight = getFlightCostPerPerson('spring'); // 1400
    const expectedTour = getTierBaseCost('discovery'); // 4500
    expect(result.flightCostPerPerson).toBe(expectedFlight);
    expect(result.tourCostPerPerson).toBe(expectedTour);
    expect(result.addOnCostPerPerson).toBe(0);
    expect(result.totalPerPerson).toBe(expectedFlight + expectedTour);
    expect(result.totalGroupCost).toBe((expectedFlight + expectedTour) * 2);
  });

  it('场景2: 4人 signature summer，加保险 + 单房差', () => {
    const input: CostInput = {
      groupSize: 4,
      tier: 'signature',
      travelMonth: 7, // summer
      addOns: { insurance: true, singleUpgrade: true, privateTransfer: false },
      tourPrice: '',
    };
    const result = calculateCost(input);
    const expectedFlight = getFlightCostPerPerson('summer'); // 1610
    const expectedTour = getTierBaseCost('signature'); // 7500
    const expectedAddOn = 80 + 400; // insurance + singleUpgrade
    expect(result.flightCostPerPerson).toBe(expectedFlight);
    expect(result.tourCostPerPerson).toBe(expectedTour);
    expect(result.addOnCostPerPerson).toBe(expectedAddOn);
    expect(result.totalPerPerson).toBe(expectedFlight + expectedTour + expectedAddOn);
    expect(result.totalGroupCost).toBe((expectedFlight + expectedTour + expectedAddOn) * 4);
  });

  it('场景3: 1人 stopover winter，全增项', () => {
    const input: CostInput = {
      groupSize: 1,
      tier: 'stopover',
      travelMonth: 1, // winter
      addOns: { insurance: true, singleUpgrade: true, privateTransfer: true },
      tourPrice: '',
    };
    const result = calculateCost(input);
    const expectedFlight = getFlightCostPerPerson('winter'); // 1288
    const expectedTour = getTierBaseCost('stopover'); // 1800
    const expectedAddOn = 80 + 400 + 200; // all add-ons
    expect(result.totalPerPerson).toBe(expectedFlight + expectedTour + expectedAddOn);
    expect(result.totalGroupCost).toBe(expectedFlight + expectedTour + expectedAddOn);
    expect(result.season).toBe('winter');
  });

  it('当提供 tourPrice 字符串时优先使用解析值', () => {
    const input: CostInput = {
      ...baseInput,
      tourPrice: 'From NZD $6,199',
    };
    const result = calculateCost(input);
    expect(result.tourCostPerPerson).toBe(6199);
  });

  it('返回完整 breakdown 结构', () => {
    const result = calculateCost(baseInput);
    expect(result).toHaveProperty('flightCostPerPerson');
    expect(result).toHaveProperty('tourCostPerPerson');
    expect(result).toHaveProperty('addOnCostPerPerson');
    expect(result).toHaveProperty('totalPerPerson');
    expect(result).toHaveProperty('totalGroupCost');
    expect(result).toHaveProperty('flightTotal');
    expect(result).toHaveProperty('tourTotal');
    expect(result).toHaveProperty('addOnTotal');
    expect(result).toHaveProperty('season');
    expect(result).toHaveProperty('seasonMultiplier');
  });

  it('flightTotal = flightCostPerPerson × groupSize', () => {
    const result = calculateCost({ ...baseInput, groupSize: 3 });
    expect(result.flightTotal).toBe(result.flightCostPerPerson * 3);
  });

  it('groupSize 1 时 totalGroupCost = totalPerPerson', () => {
    const result = calculateCost({ ...baseInput, groupSize: 1 });
    expect(result.totalGroupCost).toBe(result.totalPerPerson);
  });
});
