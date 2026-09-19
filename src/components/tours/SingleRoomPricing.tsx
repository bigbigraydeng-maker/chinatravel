import { getSoloTourPrice } from '@/lib/tour-price';

interface SingleRoomPricingProps {
  basePrice: string;
  singleSupplement: string;
  compact?: boolean;
}

export default function SingleRoomPricing({
  basePrice,
  singleSupplement,
  compact = false,
}: SingleRoomPricingProps) {
  const soloTotal = getSoloTourPrice(basePrice, singleSupplement);

  return (
    <aside
      aria-label="Solo traveller room pricing"
      className={`rounded-xl border border-amber-300 bg-amber-50 ${compact ? 'p-4' : 'p-5'}`}
    >
      <p className="text-xs font-bold uppercase tracking-[.14em] text-amber-900">
        Travelling solo?
      </p>
      <div className="mt-2 flex items-start justify-between gap-4">
        <div>
          <p className="font-semibold text-ink">Your own room for the full tour</p>
          <p className="mt-0.5 text-xs leading-relaxed text-ink-muted">
            Added once per solo traveller
          </p>
        </div>
        <p className="shrink-0 text-lg font-bold text-primary">+ {singleSupplement}</p>
      </div>
      {soloTotal && (
        <div className="mt-3 border-t border-amber-200 pt-3 text-sm text-ink">
          Solo tour price: <strong>{soloTotal} per person</strong>
        </div>
      )}
      {!compact && (
        <p className="mt-3 text-sm leading-relaxed text-ink-muted">
          The advertised price assumes two people share a room. CTS does not arrange room matching, so a traveller booking alone receives a private room unless stated otherwise.
        </p>
      )}
    </aside>
  );
}

