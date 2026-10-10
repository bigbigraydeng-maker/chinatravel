import { roomSummary, type BedType, type Room } from '@/lib/traveller-rooms';

/** Initials for the little name badge, e.g. "Ray Deng" → "RD"; falls back to the traveller number. */
export function initialsOf(name: string, index: number): string {
  const words = name.trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) return String(index + 1);
  const first = words[0].charAt(0);
  const last = words.length > 1 ? words[words.length - 1].charAt(0) : '';
  return `${first}${last}`.toUpperCase();
}

export function Avatar({ name, index }: { name: string; index: number }) {
  return (
    <span
      aria-hidden="true"
      className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-warm-100 text-xs font-semibold text-primary"
    >
      {initialsOf(name, index)}
    </span>
  );
}

function BedIcon({ type }: { type: BedType }) {
  const common = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  return (
    <svg className="h-5 w-5 flex-shrink-0" viewBox="0 0 24 24" aria-hidden="true" {...common}>
      {type === 'twin' ? (
        <>
          <rect x="2.5" y="10" width="8" height="8" rx="1.5" />
          <rect x="13.5" y="10" width="8" height="8" rx="1.5" />
          <path d="M4.5 10V8.5a1 1 0 011-1h2a1 1 0 011 1V10M15.5 10V8.5a1 1 0 011-1h2a1 1 0 011 1V10" />
        </>
      ) : type === 'double' ? (
        <>
          <rect x="3" y="10" width="18" height="8" rx="1.5" />
          <path d="M6 10V8.5a1 1 0 011-1h3a1 1 0 011 1V10M13 10V8.5a1 1 0 011-1h3a1 1 0 011 1V10" />
        </>
      ) : (
        <>
          <rect x="7" y="10" width="10" height="8" rx="1.5" />
          <path d="M9.5 10V8.5a1 1 0 011-1h3a1 1 0 011 1V10" />
        </>
      )}
    </svg>
  );
}

interface RoomLineProps {
  room: Room;
  roomIndex: number;
  names: string[];
  invalid: boolean;
  onBedTypeChange: (roomIndex: number, bedType: BedType) => void;
  singleSupplement?: string;
  singleSupplementNote?: string;
  onShareInstead: () => void;
}

export function RoomLine({
  room,
  roomIndex,
  names,
  invalid,
  onBedTypeChange,
  singleSupplement,
  singleSupplementNote,
  onShareInstead,
}: RoomLineProps) {
  // "Alice & Bob" / "Alice, Bob & Carol" reads better than a comma list on a room line.
  const memberNames = roomSummary(room, names).split(', ').filter(Boolean);
  const members =
    memberNames.length <= 1
      ? memberNames.join('')
      : `${memberNames.slice(0, -1).join(', ')} & ${memberNames[memberNames.length - 1]}`;
  const size = room.travellerIndexes.length;
  const frame = invalid ? 'border-red-300 bg-red-50/50' : 'border-gray-200 bg-white';
  const options: { value: BedType; label: string }[] =
    size === 1
      ? [{ value: 'single', label: 'Single' }]
      : [
          { value: 'double', label: 'Double bed' },
          { value: 'twin', label: 'Twin beds' },
        ];

  return (
    <div className={`flex flex-wrap items-center justify-between gap-x-4 gap-y-3 rounded-xl border p-4 ${frame}`}>
      <p className="min-w-[10rem] flex-1 font-semibold text-dark">{`Room ${roomIndex + 1} — ${members || '—'}`}</p>
      <span role="group" aria-label={`Bed type for room ${roomIndex + 1}`} className="inline-flex rounded-full bg-gray-100 p-1">
        {options.map((option) => {
          const selected = room.bedType === option.value;
          return (
            <button
              key={option.value}
              type="button"
              aria-pressed={selected}
              onClick={() => onBedTypeChange(roomIndex, option.value)}
              className={`inline-flex min-h-[44px] items-center gap-2 whitespace-nowrap rounded-full px-4 text-sm font-medium transition-colors ${
                selected ? 'bg-primary text-white shadow-sm' : 'text-gray-600 hover:text-dark'
              }`}
            >
              <BedIcon type={option.value} />
              {option.label}
            </button>
          );
        })}
      </span>
      {size === 1 && (
        <span className="flex basis-full flex-wrap items-center justify-between gap-x-4 gap-y-1 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2">
          <span className="text-sm text-amber-900">
            {singleSupplement
              ? `Single supplement applies: ${singleSupplement} (added to the tour price).`
              : 'A single supplement applies for a room to yourself — we will confirm the amount with you.'}
            {singleSupplementNote ? ` ${singleSupplementNote}` : ''}
          </span>
          <button
            type="button"
            onClick={onShareInstead}
            className="min-h-[44px] text-sm font-medium text-primary underline-offset-2 hover:underline"
          >
            Share a room instead
          </button>
        </span>
      )}
    </div>
  );
}

interface RoomAssignListProps {
  travellers: { fullName: string }[];
  rooms: Room[];
  onAssign: (travellerIndex: number, value: string) => void;
}

export function RoomAssignList({ travellers, rooms, onAssign }: RoomAssignListProps) {
  return (
    <div className="divide-y divide-gray-100 rounded-xl border border-gray-200 bg-white">
      {travellers.map((t, i) => {
        const roomIndex = rooms.findIndex((r) => r.travellerIndexes.includes(i));
        const label = t.fullName.trim() || `Traveller ${i + 1}`;
        const alone = roomIndex === -1 || rooms[roomIndex].travellerIndexes.length === 1;
        return (
          <div key={i} className="flex flex-col gap-2 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
            <span className="flex items-center gap-3 text-sm font-medium text-dark">
              <Avatar name={t.fullName} index={i} />
              {label}
            </span>
            <select
              aria-label={`Room for ${label}`}
              value={alone ? '' : String(roomIndex)}
              onChange={(e) => onAssign(i, e.target.value)}
              className="min-h-[44px] w-full rounded-lg border border-gray-300 bg-white px-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 sm:w-64"
            >
              <option value="">Own room</option>
              {rooms.map((room, ri) => {
                const others = room.travellerIndexes.filter((idx) => idx !== i);
                if (others.length === 0) return null;
                const othersLabel = others
                  .map((idx) => travellers[idx]?.fullName.trim() || `Traveller ${idx + 1}`)
                  .join(' & ');
                return (
                  <option key={ri} value={String(ri)}>{`Share with ${othersLabel}`}</option>
                );
              })}
            </select>
          </div>
        );
      })}
    </div>
  );
}
