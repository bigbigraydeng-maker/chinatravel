'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { triggerGtmEvent } from '@/components/GoogleTagManager';
import {
  parseDepartureDate,
  passportStatus,
  type PassportStatus,
  type TourOption,
} from '@/lib/traveller-form';
import {
  defaultRooms,
  roomLabel,
  roomSummary,
  validateRooms,
  type BedType,
  type Room,
} from '@/lib/traveller-rooms';

interface Traveller {
  fullName: string;
  dob: string;
  dietary: string;
  medical: string;
  passportExpiry: string;
}

const emptyTraveller = (): Traveller => ({ fullName: '', dob: '', dietary: '', medical: '', passportExpiry: '' });

const inputClass =
  'w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary';
const labelClass = 'block text-gray-700 mb-2 text-sm font-medium';
const stepClass = 'block text-xs uppercase tracking-wide text-gray-400 mb-1';

const OTHER_TOUR = '__other__';
const NEW_ROOM = '__new__';

const BED_OPTIONS: { value: BedType; title: string; hint: string }[] = [
  { value: 'double', title: 'Double', hint: 'one bed' },
  { value: 'twin', title: 'Twin', hint: 'two separate beds' },
  { value: 'single', title: 'Single', hint: 'one person' },
];

const PASSPORT_MESSAGES: Record<Exclude<PassportStatus, 'unknown'>, { text: string; className: string }> = {
  ok: { text: 'Great — this passport meets the 6-month recommendation.', className: 'text-green-700' },
  short: {
    text: 'This passport is valid on your travel date but has under 6 months left. We recommend renewing it before you travel.',
    className: 'text-amber-700',
  },
  expired: {
    text: 'This passport expires before your travel date. Please renew it and send us your new passport details.',
    className: 'text-red-700',
  },
};

function scrollIntoViewSafe(el: HTMLElement | null) {
  if (!el) return;
  el.scrollIntoView?.({ block: 'start', behavior: 'smooth' });
}

function travellerHasContent(t: Traveller): boolean {
  return Boolean(
    t.fullName.trim() || t.dob.trim() || t.dietary.trim() || t.medical.trim() || t.passportExpiry.trim()
  );
}

function travellerIsComplete(t: Traveller): boolean {
  return Boolean(t.fullName.trim() && t.dob.trim());
}

interface TravellerCardProps {
  index: number;
  traveller: Traveller;
  expanded: boolean;
  roomIndex: number | null;
  rooms: Room[];
  canRemove: boolean;
  nameInputRef: (el: HTMLInputElement | null) => void;
  onToggleExpand: () => void;
  onChange: (field: keyof Traveller, value: string) => void;
  onRemove: () => void;
  onRoomChange: (value: string) => void;
  /** Names of the people sharing this traveller's room, for an at-a-glance hint. */
  roomMates: string[];
  departure: Date | null;
}

function TravellerCard({
  index,
  traveller,
  expanded,
  roomIndex,
  rooms,
  canRemove,
  nameInputRef,
  onToggleExpand,
  onChange,
  onRemove,
  onRoomChange,
  roomMates,
  departure,
}: TravellerCardProps) {
  const name = traveller.fullName.trim();
  const complete = travellerIsComplete(traveller);
  const header = `Traveller ${index + 1}${name ? ` · ${name}` : ''}${
    roomIndex !== null ? ` · Room ${roomIndex + 1}` : ''
  }`;

  const status = passportStatus(traveller.passportExpiry, departure, new Date());

  return (
    <div className="rounded-xl border border-gray-200 bg-gray-50/60 p-5 space-y-4">
      <div className="flex items-center justify-between gap-3">
        <h3 className="font-semibold text-dark flex items-center gap-2">
          <span>{header}</span>
          {complete && (
            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-green-100 text-green-700 text-xs" aria-label="Complete">
              ✓
            </span>
          )}
        </h3>
        <div className="flex items-center gap-3">
          {canRemove && (
            <button type="button" onClick={onRemove} className="min-h-[44px] px-2 text-sm text-red-600 hover:text-red-700">
              Remove
            </button>
          )}
          <button type="button" onClick={onToggleExpand} className="min-h-[44px] px-2 text-sm text-primary font-medium hover:underline">
            {expanded ? 'Done' : 'Edit'}
          </button>
        </div>
      </div>

      {expanded && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor={`fullName-${index}`} className={labelClass}>
                Full legal name (as per passport) <span className="text-red-500">*</span>
              </label>
              <input
                id={`fullName-${index}`}
                ref={nameInputRef}
                type="text"
                required
                value={traveller.fullName}
                onChange={(e) => onChange('fullName', e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor={`dob-${index}`} className={labelClass}>
                Date of birth <span className="text-red-500">*</span>
              </label>
              <input
                id={`dob-${index}`}
                type="date"
                required
                value={traveller.dob}
                onChange={(e) => onChange('dob', e.target.value)}
                className={inputClass}
              />
            </div>
          </div>

          <div>
            <label htmlFor={`room-${index}`} className={labelClass}>Room</label>
            <select
              id={`room-${index}`}
              value={roomIndex === null ? '' : String(roomIndex)}
              onChange={(e) => onRoomChange(e.target.value)}
              className={inputClass}
            >
              <option value="">Not assigned</option>
              {rooms.map((_, i) => (
                <option key={i} value={String(i)}>{`Room ${i + 1}`}</option>
              ))}
              <option value={NEW_ROOM}>New room</option>
            </select>
            {roomMates.length > 0 && (
              <p className="mt-1 text-sm text-gray-600">Sharing with {roomMates.join(', ')}</p>
            )}
            {roomIndex !== null && roomMates.length === 0 && (
              <p className="mt-1 text-sm text-gray-500">Own room for now — pick the same room on another traveller to share.</p>
            )}
          </div>

          <div>
            <label htmlFor={`passportExpiry-${index}`} className={labelClass}>
              Passport expiry date <span className="text-gray-400">(optional — we never ask for your passport number here)</span>
            </label>
            <input
              id={`passportExpiry-${index}`}
              type="date"
              value={traveller.passportExpiry}
              onChange={(e) => onChange('passportExpiry', e.target.value)}
              className={inputClass}
            />
            {status !== 'unknown' && (
              <p role="status" className={`mt-2 text-sm ${PASSPORT_MESSAGES[status].className}`}>
                {PASSPORT_MESSAGES[status].text}
              </p>
            )}
          </div>

          <div>
            <label htmlFor={`dietary-${index}`} className={labelClass}>
              Dietary requirements <span className="text-gray-400">(optional)</span>
            </label>
            <input
              id={`dietary-${index}`}
              type="text"
              value={traveller.dietary}
              onChange={(e) => onChange('dietary', e.target.value)}
              placeholder="e.g. vegetarian, no seafood, gluten-free"
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor={`medical-${index}`} className={labelClass}>
              Medical or mobility notes <span className="text-gray-400">(optional)</span>
            </label>
            <textarea
              id={`medical-${index}`}
              rows={2}
              value={traveller.medical}
              onChange={(e) => onChange('medical', e.target.value)}
              placeholder="Anything our guides should know — medication, allergies, walking limits, wheelchair, etc."
              className={inputClass}
            />
          </div>
        </div>
      )}
    </div>
  );
}

interface RoomSummaryRowProps {
  room: Room;
  roomIndex: number;
  names: string[];
  invalid: boolean;
  onBedTypeChange: (roomIndex: number, bedType: BedType) => void;
}

function RoomSummaryRow({ room, roomIndex, names, invalid, onBedTypeChange }: RoomSummaryRowProps) {
  const members = roomSummary(room, names);
  const frame = invalid ? 'border-red-300 bg-red-50/40' : 'border-gray-200 bg-gray-50/60';
  return (
    <div className={`rounded-xl border p-5 space-y-3 ${frame}`}>
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-dark">Room {roomIndex + 1}</h3>
        <span className="text-sm text-gray-600">{members || '—'}</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {BED_OPTIONS.map((option) => (
          <label
            key={option.value}
            className="flex items-start gap-3 rounded-lg border border-gray-300 p-4 cursor-pointer"
          >
            <input
              type="radio"
              name={`bedType-${roomIndex}`}
              value={option.value}
              checked={room.bedType === option.value}
              onChange={() => onBedTypeChange(roomIndex, option.value)}
              className="mt-1 h-5 w-5 border-gray-300 text-primary focus:ring-primary"
            />
            <span className="text-sm text-gray-700">
              <strong>{option.title}</strong> — {option.hint}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}

export default function TravellerDetailsForm({ tourOptions }: { tourOptions: TourOption[] }) {
  const params = useSearchParams();

  const [bookingRef, setBookingRef] = useState(params.get('booking') ?? '');
  const tourParam = params.get('tour') ?? '';
  const matchedTour = tourOptions.find((t) => t.name.toLowerCase() === tourParam.trim().toLowerCase());
  const [tourGroup, setTourGroup] = useState(matchedTour?.group ?? (tourParam ? OTHER_TOUR : ''));
  const [tourSlug, setTourSlug] = useState(matchedTour?.key ?? '');
  const [otherTourName, setOtherTourName] = useState(matchedTour ? '' : tourParam);
  const [departureDate, setDepartureDate] = useState('');
  const [leadName, setLeadName] = useState(params.get('name') ?? '');
  const [leadEmail, setLeadEmail] = useState(params.get('email') ?? '');
  const [leadPhone, setLeadPhone] = useState('');

  const [travellers, setTravellers] = useState<Traveller[]>([emptyTraveller()]);
  const [rooms, setRooms] = useState<Room[]>(() => defaultRooms(1));
  const [roomsTouched, setRoomsTouched] = useState(false);
  const [expanded, setExpanded] = useState<number[]>([0]);
  const [hasChildren, setHasChildren] = useState(false);
  const [childrenNotes, setChildrenNotes] = useState('');

  const selectedTour = tourOptions.find((t) => t.key === tourSlug);
  const tourName = tourGroup === OTHER_TOUR ? otherTourName : selectedTour?.name ?? '';
  const groups = Array.from(new Set(tourOptions.map((t) => t.group)));
  const toursInGroup = tourOptions.filter((t) => t.group === tourGroup);
  const departure = departureDate ? parseDepartureDate(departureDate) : null;

  const [emergencyName, setEmergencyName] = useState('');
  const [emergencyRelationship, setEmergencyRelationship] = useState('');
  const [emergencyPhone, setEmergencyPhone] = useState('');
  const [specialOccasion, setSpecialOccasion] = useState('');

  const [agreeAccurate, setAgreeAccurate] = useState(false);
  const [agreePassport, setAgreePassport] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const nameRefs = useRef<(HTMLInputElement | null)[]>([]);
  const roomingRef = useRef<HTMLFieldSetElement | null>(null);

  const updateTraveller = (index: number, field: keyof Traveller, value: string) => {
    setTravellers((prev) => prev.map((t, i) => (i === index ? { ...t, [field]: value } : t)));
  };

  const addTraveller = () => {
    setTravellers((prev) => {
      const next = [...prev, emptyTraveller()];
      if (!roomsTouched) setRooms(defaultRooms(next.length));
      const newIndex = next.length - 1;
      setExpanded((current) => {
        const previous = current.filter((i) => i !== newIndex);
        // Finished cards fold away; a half-filled one stays open so nothing gets lost.
        const keep = previous.filter((i) => !travellerIsComplete(prev[i]));
        return [...keep, newIndex];
      });
      requestAnimationFrame(() => {
        const el = nameRefs.current[newIndex];
        scrollIntoViewSafe(el);
        el?.focus();
      });
      return next;
    });
  };

  const removeTraveller = (index: number) => {
    const target = travellers[index];
    if (target && travellerHasContent(target)) {
      const ok = typeof window !== 'undefined' && window.confirm('Remove this traveller? Anything typed for them will be cleared.');
      if (!ok) return;
    }
    setTravellers((prev) => {
      if (prev.length <= 1) return prev;
      const next = prev.filter((_, i) => i !== index);
      if (!roomsTouched) {
        setRooms(defaultRooms(next.length));
      } else {
        setRooms((current) =>
          current
            .map((room) => ({
              ...room,
              travellerIndexes: room.travellerIndexes
                .filter((idx) => idx !== index)
                .map((idx) => (idx > index ? idx - 1 : idx)),
            }))
            .filter((room) => room.travellerIndexes.length > 0)
        );
      }
      setExpanded((current) =>
        current.filter((i) => i !== index).map((i) => (i > index ? i - 1 : i))
      );
      return next;
    });
  };

  const setRoomBedType = (roomIndex: number, bedType: BedType) => {
    setRoomsTouched(true);
    setRooms((prev) => prev.map((r, i) => (i === roomIndex ? { ...r, bedType } : r)));
  };

  const assignTravellerToRoom = (travellerIndex: number, value: string) => {
    setRoomsTouched(true);
    setRooms((prev) => {
      const cleared = prev.map((room) => ({
        ...room,
        travellerIndexes: room.travellerIndexes.filter((idx) => idx !== travellerIndex),
      }));
      // Rooms that end up empty are dropped, so "Room N" means the same thing on every card and in the summary.
      const prune = (list: Room[]) => list.filter((room) => room.travellerIndexes.length > 0);
      if (value === '') return prune(cleared);
      if (value === NEW_ROOM) {
        return [...prune(cleared), { bedType: 'double' as BedType, travellerIndexes: [travellerIndex] }];
      }
      const target = Number(value);
      if (!Number.isInteger(target) || target < 0 || target >= cleared.length) return prune(cleared);
      return prune(
        cleared.map((room, i) =>
          i === target ? { ...room, travellerIndexes: [...room.travellerIndexes, travellerIndex] } : room
        ),
      );
    });
  };

  const toggleExpanded = (index: number) => {
    setExpanded((current) =>
      current.includes(index) ? current.filter((i) => i !== index) : [...current, index]
    );
  };

  const roomIndexForTraveller = (travellerIndex: number): number | null => {
    const idx = rooms.findIndex((r) => r.travellerIndexes.includes(travellerIndex));
    return idx === -1 ? null : idx;
  };

  const names = travellers.map((t) => t.fullName.trim());
  const roomMatesOf = (travellerIndex: number): string[] => {
    const room = rooms.find((r) => r.travellerIndexes.includes(travellerIndex));
    if (!room) return [];
    return room.travellerIndexes
      .filter((idx) => idx !== travellerIndex)
      .sort((a, b) => a - b)
      .map((idx) => names[idx] || `Traveller ${idx + 1}`);
  };
  const roomHasProblem = (room: Room): boolean => {
    const size = room.travellerIndexes.length;
    if (room.bedType === 'single') return size !== 1;
    return size < 2 || size > (hasChildren ? 3 : 2);
  };
  const roomErrors = validateRooms(rooms, travellers.length, names, { allowThird: hasChildren });
  const activeRooms = rooms
    .map((room, index) => ({ room, index }))
    .filter(({ room }) => room.travellerIndexes.length > 0);

  const focusTravellerField = (index: number, field: 'fullName' | 'dob') => {
    setExpanded((current) => (current.includes(index) ? current : [...current, index]));
    requestAnimationFrame(() => {
      const el = document.getElementById(`${field}-${index}`) as HTMLInputElement | null;
      scrollIntoViewSafe(el);
      el?.focus();
    });
  };

  const findFirstMissing = (): { message: string; focus: () => void } | null => {
    if (!leadName.trim()) {
      return {
        message: 'Please fill in your name.',
        focus: () => {
          const el = document.getElementById('leadName') as HTMLInputElement | null;
          scrollIntoViewSafe(el);
          el?.focus();
        },
      };
    }
    if (!leadEmail.trim()) {
      return {
        message: 'Please fill in your email.',
        focus: () => {
          const el = document.getElementById('leadEmail') as HTMLInputElement | null;
          scrollIntoViewSafe(el);
          el?.focus();
        },
      };
    }
    for (let i = 0; i < travellers.length; i += 1) {
      const t = travellers[i];
      const label = t.fullName.trim() || `Traveller ${i + 1}`;
      if (!t.fullName.trim()) {
        return {
          message: `Please fill in full legal name for Traveller ${i + 1} (${label}).`,
          focus: () => focusTravellerField(i, 'fullName'),
        };
      }
      if (!t.dob.trim()) {
        return {
          message: `Please fill in date of birth for Traveller ${i + 1} (${label}).`,
          focus: () => focusTravellerField(i, 'dob'),
        };
      }
    }
    if (!emergencyName.trim()) {
      return {
        message: 'Please fill in the emergency contact name.',
        focus: () => {
          const el = document.getElementById('emergencyName') as HTMLInputElement | null;
          scrollIntoViewSafe(el);
          el?.focus();
        },
      };
    }
    if (!emergencyPhone.trim()) {
      return {
        message: 'Please fill in the emergency contact phone.',
        focus: () => {
          const el = document.getElementById('emergencyPhone') as HTMLInputElement | null;
          scrollIntoViewSafe(el);
          el?.focus();
        },
      };
    }
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    if (!agreeAccurate || !agreeTerms || !agreePassport) {
      setSubmitError('Please tick all three confirmation boxes before submitting.');
      return;
    }

    const missing = findFirstMissing();
    if (missing) {
      setSubmitError(missing.message);
      missing.focus();
      return;
    }

    const errors = validateRooms(rooms, travellers.length, names, { allowThird: hasChildren });
    if (errors.length > 0) {
      setSubmitError(errors[0]);
      scrollIntoViewSafe(roomingRef.current);
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch('/api/traveller-details', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bookingRef: bookingRef.trim(),
          leadName: leadName.trim(),
          leadEmail: leadEmail.trim(),
          leadPhone: leadPhone.trim(),
          tourName: tourName.trim(),
          departureDate,
          rooms: rooms
            .filter((r) => r.travellerIndexes.length > 0)
            .map((r) => ({ bedType: r.bedType, travellerIndexes: [...r.travellerIndexes].sort() })),
          hasChildren,
          childrenNotes: hasChildren ? childrenNotes.trim() : '',
          travellers: travellers.map((t) => ({
            fullName: t.fullName.trim(),
            dob: t.dob.trim(),
            dietary: t.dietary.trim(),
            medical: t.medical.trim(),
            passportExpiry: t.passportExpiry,
          })),
          emergencyName: emergencyName.trim(),
          emergencyRelationship: emergencyRelationship.trim(),
          emergencyPhone: emergencyPhone.trim(),
          specialOccasion: specialOccasion.trim(),
          agreeAccurate,
          agreePassport,
          agreeTerms,
        }),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(typeof data.error === 'string' ? data.error : 'Submission failed. Please try again.');
      }

      triggerGtmEvent({
        event: 'traveller_details_submit',
        form_type: 'traveller_details',
        pagePath: typeof window !== 'undefined' ? window.location.pathname : '/traveller-details',
      });

      setSuccess(true);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Something went wrong.');
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <section className="section bg-white">
        <div className="container max-w-2xl">
          <div className="bg-green-50 border border-green-300 text-green-800 px-6 py-10 rounded-2xl text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-serif font-semibold mb-3">Thank you — details received</h2>
            <p className="text-gray-700 mb-2">
              We&apos;ve received your traveller details{bookingRef ? ` for booking ${bookingRef}` : ''}.
            </p>
            <p className="text-gray-600 text-sm">
              Our team will be in touch about your deposit and next steps. Questions? Call{' '}
              <a href="tel:0800287888" className="text-primary font-medium">0800 CTS 888</a>.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section bg-white">
      <div className="container max-w-3xl">
        <p className="text-gray-600 mb-8 leading-relaxed">
          Please complete this form so we can finalise your booking. Enter each traveller&apos;s full legal
          name exactly as it appears on their passport — this is what we use for flights, visas and hotels.
          All information is kept confidential and used only to arrange your trip.
        </p>

        <div className="mb-8 flex items-start gap-3 rounded-xl border border-amber-300 bg-amber-50 px-5 py-4">
          <svg className="mt-0.5 h-5 w-5 flex-shrink-0 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
          </svg>
          <div className="text-sm text-amber-800">
            <p className="font-semibold">Please check your passport before you travel</p>
            <p className="mt-1 leading-relaxed">
              New Zealand passport holders can currently enter China <strong>visa-free</strong> for up to 30 days
              (until 31 December 2026), so no visa is needed — but keeping your passport in order is your own
              responsibility. We recommend at least <strong>6 months&apos;</strong> validity from your travel date,
              plus a couple of blank pages. If it expires sooner, please renew it before your trip and send us
              your new passport details. See our{' '}
              <Link href="/china-visa-guide-for-new-zealanders" className="font-semibold underline hover:text-amber-900">
                China visa &amp; passport guide
              </Link>{' '}
              for the full rules.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-10">
          {/* Booking / lead contact */}
          <fieldset className="space-y-5">
            <legend className="text-xl font-serif font-semibold text-dark mb-2">
              <span className={stepClass}>Step 1 of 4</span>
              Your booking
            </legend>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="tourGroup" className={labelClass}>Which tour did you book?</label>
                <select id="tourGroup" value={tourGroup} className={inputClass}
                  onChange={(e) => { setTourGroup(e.target.value); setTourSlug(''); setDepartureDate(''); }}>
                  <option value="">Select tour type</option>
                  {groups.map((g) => (
                    <option key={g} value={g}>{g}</option>
                  ))}
                  <option value={OTHER_TOUR}>My tour isn&apos;t listed</option>
                </select>
              </div>
              {tourGroup && tourGroup !== OTHER_TOUR && (
                <div>
                  <label htmlFor="tourSlug" className={labelClass}>Tour</label>
                  <select id="tourSlug" value={tourSlug} className={inputClass}
                    onChange={(e) => { setTourSlug(e.target.value); setDepartureDate(''); }}>
                    <option value="">Select your tour</option>
                    {toursInGroup.map((t) => (
                      <option key={t.key} value={t.key}>{t.shortName}</option>
                    ))}
                  </select>
                </div>
              )}
              {tourGroup === OTHER_TOUR && (
                <div>
                  <label htmlFor="otherTourName" className={labelClass}>Tour name</label>
                  <input id="otherTourName" type="text" value={otherTourName}
                    onChange={(e) => setOtherTourName(e.target.value)} className={inputClass} />
                </div>
              )}
              {selectedTour && selectedTour.dates.length > 0 && (
                <div>
                  <label htmlFor="departureDate" className={labelClass}>Departure date</label>
                  <select id="departureDate" value={departureDate} className={inputClass}
                    onChange={(e) => setDepartureDate(e.target.value)}>
                    <option value="">Select your departure date</option>
                    {selectedTour.dates.map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>
              )}
              <div>
                <label htmlFor="bookingRef" className={labelClass}>Booking reference (if you have one)</label>
                <input id="bookingRef" type="text" value={bookingRef} onChange={(e) => setBookingRef(e.target.value)}
                  className={inputClass} />
              </div>
              <div>
                <label htmlFor="leadName" className={labelClass}>
                  Your name <span className="text-red-500">*</span>
                </label>
                <input id="leadName" type="text" required value={leadName} onChange={(e) => setLeadName(e.target.value)}
                  className={inputClass} />
              </div>
              <div>
                <label htmlFor="leadEmail" className={labelClass}>
                  Email <span className="text-red-500">*</span>
                </label>
                <input id="leadEmail" type="email" required value={leadEmail} onChange={(e) => setLeadEmail(e.target.value)}
                  className={inputClass} />
              </div>
              <div>
                <label htmlFor="leadPhone" className={labelClass}>Phone</label>
                <input id="leadPhone" type="tel" value={leadPhone} onChange={(e) => setLeadPhone(e.target.value)}
                  className={inputClass} />
              </div>
            </div>
          </fieldset>

          {/* Travellers */}
          <fieldset className="space-y-5">
            <legend className="text-xl font-serif font-semibold text-dark mb-2">
              <span className={stepClass}>Step 2 of 4</span>
              Travellers
            </legend>
            {travellers.map((t, i) => (
              <TravellerCard
                key={i}
                index={i}
                traveller={t}
                expanded={expanded.includes(i)}
                roomIndex={roomIndexForTraveller(i)}
                rooms={rooms}
                canRemove={travellers.length > 1}
                nameInputRef={(el) => { nameRefs.current[i] = el; }}
                onToggleExpand={() => toggleExpanded(i)}
                onChange={(field, value) => updateTraveller(i, field, value)}
                onRemove={() => removeTraveller(i)}
                onRoomChange={(value) => assignTravellerToRoom(i, value)}
                roomMates={roomMatesOf(i)}
                departure={departure}
              />
            ))}
            <button type="button" onClick={addTraveller}
              className="min-h-[44px] inline-flex items-center gap-2 text-primary font-medium hover:underline">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add another traveller
            </button>
          </fieldset>

          {/* Rooming */}
          <fieldset ref={roomingRef} className="space-y-4">
            <legend className="text-xl font-serif font-semibold text-dark mb-2">
              <span className={stepClass}>Step 3 of 4</span>
              Rooming
            </legend>
            <p className="text-sm text-gray-500 -mt-2">
              Change who is in a room from the Room field on each traveller.
            </p>
            {activeRooms.map(({ room, index }) => (
              <RoomSummaryRow
                key={index}
                room={room}
                roomIndex={index}
                names={names}
                invalid={roomHasProblem(room)}
                onBedTypeChange={setRoomBedType}
              />
            ))}
            {roomErrors.length > 0 ? (
              <div className="space-y-1">
                {roomErrors.map((err) => (
                  <p key={err} className="text-sm text-red-700">{err}</p>
                ))}
              </div>
            ) : (
              <p className="text-sm text-green-700">Everyone has a room</p>
            )}
            <label className="flex items-start gap-3 cursor-pointer">
              <input type="checkbox" checked={hasChildren} onChange={(e) => setHasChildren(e.target.checked)}
                className="mt-1 h-5 w-5 rounded border-gray-300 text-primary focus:ring-primary" />
              <span className="text-sm text-gray-700">Children are travelling with us</span>
            </label>
            {hasChildren && (
              <div>
                <label htmlFor="childrenNotes" className={labelClass}>
                  Children&apos;s ages and room needs <span className="text-gray-400">(optional)</span>
                </label>
                <input id="childrenNotes" type="text" value={childrenNotes}
                  onChange={(e) => setChildrenNotes(e.target.value)}
                  placeholder="e.g. one child aged 8, sharing with parents" className={inputClass} />
              </div>
            )}
          </fieldset>

          {/* Emergency contact */}
          <fieldset className="space-y-5">
            <legend className="text-xl font-serif font-semibold text-dark mb-2">
              <span className={stepClass}>Step 4 of 4</span>
              Emergency contact &amp; confirmation
            </legend>
            <p className="text-sm text-gray-500 -mt-2">Someone not travelling with you whom we can contact if needed.</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label htmlFor="emergencyName" className={labelClass}>
                  Name <span className="text-red-500">*</span>
                </label>
                <input id="emergencyName" type="text" required value={emergencyName}
                  onChange={(e) => setEmergencyName(e.target.value)} className={inputClass} />
              </div>
              <div>
                <label htmlFor="emergencyRelationship" className={labelClass}>Relationship</label>
                <input id="emergencyRelationship" type="text" value={emergencyRelationship}
                  onChange={(e) => setEmergencyRelationship(e.target.value)}
                  placeholder="e.g. spouse, son" className={inputClass} />
              </div>
              <div>
                <label htmlFor="emergencyPhone" className={labelClass}>
                  Phone <span className="text-red-500">*</span>
                </label>
                <input id="emergencyPhone" type="tel" required value={emergencyPhone}
                  onChange={(e) => setEmergencyPhone(e.target.value)} className={inputClass} />
              </div>
            </div>
          </fieldset>

          {/* Special occasion */}
          <fieldset className="space-y-3">
            <legend className="text-xl font-serif font-semibold text-dark mb-2">Special occasion</legend>
            <label htmlFor="specialOccasion" className={labelClass}>
              Celebrating something during your trip? <span className="text-gray-400">(optional)</span>
            </label>
            <input id="specialOccasion" type="text" value={specialOccasion}
              onChange={(e) => setSpecialOccasion(e.target.value)}
              placeholder="e.g. 40th wedding anniversary on 12 Oct, birthday during the tour"
              className={inputClass} />
          </fieldset>

          {/* Consent */}
          <fieldset className="space-y-4 rounded-xl border border-gray-200 bg-gray-50/60 p-5">
            <legend className="text-xl font-serif font-semibold text-dark mb-2 px-2">Confirmation</legend>
            <label className="flex items-start gap-3 cursor-pointer">
              <input type="checkbox" checked={agreePassport} onChange={(e) => setAgreePassport(e.target.checked)}
                className="mt-1 h-5 w-5 rounded border-gray-300 text-primary focus:ring-primary" />
              <span className="text-sm text-gray-700">
                I have checked that every traveller&apos;s passport is valid for at least 6 months from the travel date,
                with a couple of blank pages.
              </span>
            </label>
            <label className="flex items-start gap-3 cursor-pointer">
              <input type="checkbox" checked={agreeAccurate} onChange={(e) => setAgreeAccurate(e.target.checked)}
                className="mt-1 h-5 w-5 rounded border-gray-300 text-primary focus:ring-primary" />
              <span className="text-sm text-gray-700">
                I confirm the details above are correct and match each traveller&apos;s passport.
              </span>
            </label>
            <label className="flex items-start gap-3 cursor-pointer">
              <input type="checkbox" checked={agreeTerms} onChange={(e) => setAgreeTerms(e.target.checked)}
                className="mt-1 h-5 w-5 rounded border-gray-300 text-primary focus:ring-primary" />
              <span className="text-sm text-gray-700">
                I have read and agree to the{' '}
                <Link href="/terms-and-conditions" target="_blank" className="text-primary font-medium underline">
                  Terms &amp; Conditions
                </Link>
                , and I understand the booking deposit is non-refundable.
              </span>
            </label>
          </fieldset>

          {submitError && (
            <p className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
              {submitError}
            </p>
          )}

          <div>
            <button type="submit" disabled={isLoading} className="btn-primary w-full py-3">
              {isLoading ? 'Submitting...' : 'Submit details'}
            </button>
            <p className="text-xs text-gray-400 text-center mt-3">
              Your information is handled in line with our{' '}
              <Link href="/privacy-policy" target="_blank" className="underline">Privacy Policy</Link>.
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}
