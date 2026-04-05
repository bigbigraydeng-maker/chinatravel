'use client';

import { useEffect, useState } from 'react';

interface AvailabilityBadgeProps {
  departureDate?: string;
  seatsLeft?: number;
  showCountdown?: boolean;
}

export default function AvailabilityBadge({
  departureDate,
  seatsLeft = 5,
  showCountdown = true,
}: AvailabilityBadgeProps) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0 });

  useEffect(() => {
    if (!showCountdown || !departureDate) return;

    const calculateTimeLeft = () => {
      const targetDate = departureDate ? new Date(departureDate) : new Date();
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 60000);

    return () => clearInterval(timer);
  }, [departureDate, showCountdown]);

  const isLowAvailability = seatsLeft <= 5;

  return (
    <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-4 mb-6">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
          <span className="text-sm font-bold text-amber-800">
            Limited Availability
          </span>
        </div>
        {isLowAvailability && (
          <span className="text-xs font-semibold bg-red-100 text-red-700 px-2 py-1 rounded-full">
            Only {seatsLeft} seats left
          </span>
        )}
      </div>

      {departureDate && (
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <p className="text-xs text-amber-700 mb-1">Next Departure</p>
            <p className="font-bold text-amber-900">
              {new Date(departureDate).toLocaleDateString('en-NZ', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
            </p>
          </div>

          {showCountdown && (
            <div className="flex gap-2">
              {[
                { value: timeLeft.days, label: 'Days' },
                { value: timeLeft.hours, label: 'Hrs' },
                { value: timeLeft.minutes, label: 'Mins' },
              ].map((item, idx) => (
                <div key={idx} className="text-center">
                  <div className="w-12 h-10 bg-white rounded-lg flex items-center justify-center border border-amber-200">
                    <span className="font-bold text-amber-900 text-sm">
                      {item.value}
                    </span>
                  </div>
                  <span className="text-xs text-amber-700 mt-1 block">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {!departureDate && (
        <p className="text-sm text-amber-700">
          Contact us for upcoming departure dates
        </p>
      )}
    </div>
  );
}
