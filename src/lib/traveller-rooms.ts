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

export function validateRooms(rooms: Room[], travellerCount: number): string[] {
  const errors: string[] = [];
  const active = rooms.filter((r) => r.travellerIndexes.length > 0);

  const counts = new Array<number>(travellerCount).fill(0);
  let hasUnknown = false;

  active.forEach((room, roomIndex) => {
    const size = room.travellerIndexes.length;
    if (room.bedType === 'single' && size !== 1) {
      errors.push(`Room ${roomIndex + 1} is a single room but has ${size} people`);
    }
    if ((room.bedType === 'double' || room.bedType === 'twin') && (size < 2 || size > 3)) {
      errors.push(
        `Room ${roomIndex + 1} is a ${room.bedType} room but has ${size} ${size === 1 ? 'person' : 'people'} — choose Single, or add the person they share with`
      );
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
      errors.push(`Traveller ${i + 1} is not in any room`);
    } else if (counts[i] > 1) {
      errors.push(`Traveller ${i + 1} is in more than one room`);
    }
  }

  return errors;
}

export function roomLabel(bedType: BedType): string {
  if (bedType === 'double') return 'Double (one bed)';
  if (bedType === 'twin') return 'Twin (two separate beds)';
  return 'Single (one person)';
}
