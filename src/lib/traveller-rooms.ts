export type BedType = 'double' | 'twin' | 'single';

export interface Room {
  bedType: BedType;
  travellerIndexes: number[];
}

export function defaultRooms(travellerCount: number): Room[] {
  const rooms: Room[] = [];
  for (let i = 0; i < travellerCount; i += 2) {
    if (i + 1 < travellerCount) {
      rooms.push({ bedType: 'double', travellerIndexes: [i, i + 1] });
    } else {
      rooms.push({ bedType: 'single', travellerIndexes: [i] });
    }
  }
  return rooms;
}

/**
 * Give a newly added traveller a room without disturbing what the customer already chose.
 *
 * Pair people up in the order they are added, like the default:
 * 1. If the room holding the previously added traveller has exactly one person,
 *    join it (upgrading a single room to a double; twin/double are kept as is).
 * 2. Otherwise join the first room that has exactly one person and is not a single.
 * 3. Otherwise append a new single room.
 */
export function placeNewTraveller(rooms: Room[], travellerIndex: number): Room[] {
  const previousIndex = travellerIndex - 1;
  const previousRoomIndex = rooms.findIndex((room) =>
    room.travellerIndexes.includes(previousIndex),
  );
  if (previousRoomIndex !== -1 && rooms[previousRoomIndex].travellerIndexes.length === 1) {
    return rooms.map((room, i) =>
      i === previousRoomIndex
        ? {
            bedType: room.bedType === 'single' ? 'double' : room.bedType,
            travellerIndexes: [...room.travellerIndexes, travellerIndex],
          }
        : { ...room, travellerIndexes: [...room.travellerIndexes] },
    );
  }

  const waitingIndex = rooms.findIndex(
    (room) => room.travellerIndexes.length === 1 && room.bedType !== 'single',
  );
  if (waitingIndex !== -1) {
    return rooms.map((room, i) =>
      i === waitingIndex
        ? { ...room, travellerIndexes: [...room.travellerIndexes, travellerIndex] }
        : { ...room, travellerIndexes: [...room.travellerIndexes] },
    );
  }
  return [
    ...rooms.map((room) => ({ ...room, travellerIndexes: [...room.travellerIndexes] })),
    { bedType: 'single', travellerIndexes: [travellerIndex] },
  ];
}

/** Drop empty rooms and keep bed type consistent with how many people are in the room. */
export function tidyRooms(rooms: Room[]): Room[] {
  return rooms
    .filter((room) => room.travellerIndexes.length > 0)
    .map((room) => {
      const size = room.travellerIndexes.length;
      let bedType = room.bedType;
      if (size === 1 && (bedType === 'double' || bedType === 'twin')) {
        bedType = 'single';
      } else if (size >= 2 && bedType === 'single') {
        bedType = 'double';
      }
      return { bedType, travellerIndexes: [...room.travellerIndexes].sort((a, b) => a - b) };
    })
    .sort((a, b) => a.travellerIndexes[0] - b.travellerIndexes[0]);
}

function travellerLabel(index: number, names?: string[]): string {
  const name = names?.[index]?.trim();
  return name ? name : `Traveller ${index + 1}`;
}

function roomMembersLabel(room: Room, names?: string[]): string {
  const members = room.travellerIndexes
    .slice()
    .sort((a, b) => a - b)
    .map((idx) => travellerLabel(idx, names));
  return members.join(', ');
}

export interface ValidateRoomsOptions {
  /** A third person may share a double/twin room only when children are travelling. */
  allowThird?: boolean;
}

export function validateRooms(
  rooms: Room[],
  travellerCount: number,
  names?: string[],
  options: ValidateRoomsOptions = {},
): string[] {
  const errors: string[] = [];
  const active = rooms.filter((r) => r.travellerIndexes.length > 0);

  const counts = new Array<number>(travellerCount).fill(0);
  let hasUnknown = false;

  active.forEach((room, roomIndex) => {
    const size = room.travellerIndexes.length;
    const members = roomMembersLabel(room, names);
    // Names are only shown when the caller passed them (the website); the API keeps the plain wording.
    const roomLabelText = names && members ? `Room ${roomIndex + 1} (${members})` : `Room ${roomIndex + 1}`;
    if (room.bedType === 'single' && size !== 1) {
      errors.push(`${roomLabelText} is a single room but has ${size} people`);
    }
    if (room.bedType === 'double' || room.bedType === 'twin') {
      const maxSize = options.allowThird ? 3 : 2;
      if (size < 2) {
        errors.push(
          `${roomLabelText} is a ${room.bedType} room but has ${size} person — choose Single, or add the person they share with`
        );
      } else if (size > maxSize) {
        errors.push(
          size === 3
            ? `${roomLabelText} is a ${room.bedType} room with 3 people — a third person can share only when children are travelling (tick the box below)`
            : `${roomLabelText} is a ${room.bedType} room but has ${size} people — a room takes at most 3`
        );
      }
    }
    room.travellerIndexes.forEach((idx) => {
      if (idx < 0 || idx >= travellerCount) {
        hasUnknown = true;
      } else {
        counts[idx] += 1;
      }
    });
  });

  if (hasUnknown) {
    errors.push('Room has an unknown traveller');
  }

  for (let i = 0; i < travellerCount; i += 1) {
    if (counts[i] === 0) {
      errors.push(`${travellerLabel(i, names)} is not in any room`);
    } else if (counts[i] > 1) {
      errors.push(`${travellerLabel(i, names)} is in more than one room`);
    }
  }

  return errors;
}

export function roomSummary(room: Room, names: string[]): string {
  return room.travellerIndexes
    .slice()
    .sort((a, b) => a - b)
    .map((idx) => names[idx]?.trim() || `Traveller ${idx + 1}`)
    .join(', ');
}

export function roomLabel(bedType: BedType): string {
  if (bedType === 'double') return 'Double (one bed)';
  if (bedType === 'twin') return 'Twin (two separate beds)';
  return 'Single (one person)';
}
