import { defaultRooms, roomLabel, roomSummary, validateRooms } from '@/lib/traveller-rooms';

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

  it('allows a third person in a double room only when children are travelling', () => {
    const rooms = [{ bedType: 'double' as const, travellerIndexes: [0, 1, 2] }];
    expect(validateRooms(rooms, 3)).toContain(
      'Room 1 is a double room with 3 people — a third person can share only when children are travelling (tick the box below)',
    );
    expect(validateRooms(rooms, 3, undefined, { allowThird: true })).toEqual([]);
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

  it('uses names when provided', () => {
    const rooms = [{ bedType: 'double' as const, travellerIndexes: [0, 1] }];
    expect(validateRooms(rooms, 3, ['Alice', 'Bob', 'Carol'])).toContain('Carol is not in any room');
  });

  it('lists room members by name in room errors', () => {
    const rooms = [{ bedType: 'double' as const, travellerIndexes: [0] }];
    expect(validateRooms(rooms, 1, ['Alice'])).toContain(
      'Room 1 (Alice) is a double room but has 1 person — choose Single, or add the person they share with'
    );
  });

  it('falls back to Traveller N when a name is blank', () => {
    const rooms = [{ bedType: 'double' as const, travellerIndexes: [0, 1] }];
    expect(validateRooms(rooms, 3, ['Alice', '', 'Carol'])).toContain('Carol is not in any room');
    expect(validateRooms([{ bedType: 'double' as const, travellerIndexes: [0, 2] }], 3, ['Alice', '', 'Carol'])).toContain('Traveller 2 is not in any room');
  });
});

describe('roomSummary', () => {
  it('joins member names in traveller order', () => {
    const room = { bedType: 'twin' as const, travellerIndexes: [1, 0] };
    expect(roomSummary(room, ['Alice', 'Bob'])).toBe('Alice, Bob');
  });

  it('falls back to Traveller N for blank names', () => {
    const room = { bedType: 'double' as const, travellerIndexes: [0, 1] };
    expect(roomSummary(room, ['Alice', ''])).toBe('Alice, Traveller 2');
  });
});

describe('roomLabel', () => {
  it('describes each bed type', () => {
    expect(roomLabel('double')).toBe('Double (one bed)');
    expect(roomLabel('twin')).toBe('Twin (two separate beds)');
    expect(roomLabel('single')).toBe('Single (one person)');
  });
});
