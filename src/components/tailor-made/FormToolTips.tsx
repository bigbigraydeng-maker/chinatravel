'use client';

type FieldName = 'travel-date' | 'budget' | 'visa';

interface TipConfig {
  tool: string;
  toolName: string;
  text: string;
}

const FIELD_TIPS: Record<FieldName, TipConfig> = {
  'travel-date': {
    tool: '/best-time-to-visit-china',
    toolName: 'best-time-to-visit',
    text: "Not sure when to go? Check our Best Time to Visit guide",
  },
  budget: {
    tool: '/travel-tools',
    toolName: 'cost-calculator',
    text: "Need a budget estimate? Try our Cost Calculator",
  },
  visa: {
    tool: '/china-visa-guide-for-new-zealanders',
    toolName: 'visa-checker',
    text: "Check our China Visa Guide for NZ & Australian travellers",
  },
};

interface FieldToolTipProps {
  fieldName: FieldName;
  onToolClick?: (toolName: string) => void;
}

export function FieldToolTip({ fieldName, onToolClick }: FieldToolTipProps) {
  const tip = FIELD_TIPS[fieldName];
  if (!tip) return null;

  return (
    <div className="mt-1.5">
      <a
        href={tip.tool}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => onToolClick?.(tip.toolName)}
        aria-label={`${tip.text} — opens in a new tab`}
        className="inline-flex items-center gap-1 text-xs text-gray-400 hover:text-primary transition-colors"
      >
        <svg
          className="w-3 h-3 flex-shrink-0"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        {tip.text} →
      </a>
    </div>
  );
}
