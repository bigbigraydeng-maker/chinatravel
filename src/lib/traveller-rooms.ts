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
