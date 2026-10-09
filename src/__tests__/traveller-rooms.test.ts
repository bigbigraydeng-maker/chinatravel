import { defaultRooms, roomLabel, validateRooms } from '@/lib/traveller-rooms';

describe('defaultRooms', () => {
  it('pairs four travellers into two double rooms', () => {
    expect(defaultRooms(4)).toEqual([
      { bedType: 'double', travellerIndexes: [0, 1] },
      { bedType: 'double', travellerIndexes: [2, 3] },
    ]);
  });

  it('gives an odd last traveller a single room', () => {
    expect(defaultRooms(3)).toEqual([
      { bedType: 'double', travellerIndexes: [0, 1] },
      { bedType: 'single', travellerIndexes: [2] },
    ]);
  });

  it('gives a lone traveller a single room', () => {
    expect(defaultRooms(1)).toEqual([{ bedType: 'single', travellerIndexes: [0] }]);
  });

  it('returns no rooms for zero travellers', () => {
    expect(defaultRooms(0)).toEqual([]);
  });
});

describe('validateRooms', () => {
  it('accepts two couples sharing twin and double rooms', () => {
    const rooms = [
      { bedType: 'twin' as const, travellerIndexes: [0, 1] },
      { bedType: 'double' as const, travellerIndexes: [2, 3] },
    ];
    expect(validateRooms(rooms, 4)).toEqual([]);
  });

  it('flags a traveller who is not in any room', () => {
    const rooms = [{ bedType: 'double' as const, travellerIndexes: [0, 1] }];
    expect(validateRooms(rooms, 3)).toContain('Traveller 3 is not in any room');
  });

  it('flags a traveller who is in more than one room', () => {
    const rooms = [
      { bedType: 'double' as const, travellerIndexes: [0, 1] },
      { bedType: 'double' as const, travellerIndexes: [1, 2] },
    ];
    expect(validateRooms(rooms, 3)).toContain('Traveller 2 is in more than one room');
  });

  it('flags a single room with two people', () => {
    const rooms = [{ bedType: 'single' as const, travellerIndexes: [0, 1] }];
    expect(validateRooms(rooms, 2)).toContain('Room 1 is a single room but has 2 people');
  });

  it('flags a double room with one person', () => {
    const rooms = [{ bedType: 'double' as const, travellerIndexes: [0] }];
    expect(validateRooms(rooms, 1)).toContain(
      'Room 1 is a double room but has 1 person — choose Single, or add the person they share with'
    );
  });

  it('allows a double room with three people (child sharing with parents)', () => {
    const rooms = [{ bedType: 'double' as const, travellerIndexes: [0, 1, 2] }];
    expect(validateRooms(rooms, 3)).toEqual([]);
  });

  it('ignores empty rooms', () => {
    const rooms = [
      { bedType: 'double' as const, travellerIndexes: [0, 1] },
      { bedType: 'double' as const, travellerIndexes: [] },
    ];
    expect(validateRooms(rooms, 2)).toEqual([]);
  });

  it('flags an unknown traveller index', () => {
    const rooms = [{ bedType: 'double' as const, travellerIndexes: [0, 5] }];
    expect(validateRooms(rooms, 2)).toContain('Room has an unknown traveller');
  });
});

describe('roomLabel', () => {
  it('describes each bed type', () => {
    expect(roomLabel('double')).toBe('Double (one bed)');
    expect(roomLabel('twin')).toBe('Twin (two separate beds)');
    expect(roomLabel('single')).toBe('Single (one person)');
  });
});
