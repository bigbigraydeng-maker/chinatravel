import { notFound } from 'next/navigation';
import { getTourBySlug } from '@/lib/data/tours';
import PrintPageActions from '@/components/tours/PrintPageActions';

interface PrintPageProps {
  params: {
    destination: string;
    tier: string;
    tour: string;
  };
}

export default function TourPrintPage({ params }: PrintPageProps) {
  const tour = getTourBySlug(params.destination, params.tier, params.tour);

  if (!tour) {
    notFound();
  }

  return (
    <>
      <style>{`
        @media print {
          .no-print { display: none !important; }
          body { font-size: 11pt; color: #000; }
          h1, h2, h3 { page-break-after: avoid; }
          .day-row { page-break-inside: avoid; }
        }
        @media screen {
          body { background: #f3f4f6; }
          .print-page { max-width: 800px; margin: 2rem auto; background: white; padding: 2.5rem; box-shadow: 0 4px 24px rgba(0,0,0,0.1); border-radius: 8px; }
        }
      `}</style>

      <div className="print-page">
        {/* Header */}
        <div className="flex justify-between items-start border-b-2 border-gray-800 pb-6 mb-8">
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.png" alt="CTS Tours" style={{ height: '48px' }} />
            <p style={{ fontSize: '11px', color: '#6b7280', marginTop: '4px' }}>
              China Travel Specialists — Since 1928
            </p>
          </div>
          <div style={{ textAlign: 'right', fontSize: '12px', color: '#374151' }}>
            <p>0800 CTS 888 (0800 287 888)</p>
            <p>info@ctstours.co.nz</p>
            <p>2F CTS House, 175 Queen Street, Auckland</p>
          </div>
        </div>

        {/* Tour Title */}
        <div className="mb-8">
          <div style={{ display: 'inline-block', background: '#c0392b', color: 'white', fontSize: '11px', fontWeight: 700, padding: '2px 12px', borderRadius: '20px', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>
            China {tour.tier}
          </div>
          <h1 style={{ fontSize: '26px', fontWeight: 700, color: '#111827', margin: '4px 0 8px' }}>
            {tour.title}
          </h1>
          <p style={{ fontSize: '14px', color: '#4b5563', lineHeight: 1.6 }}>
            {tour.shortDescription}
          </p>
        </div>

        {/* Quick Facts */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '32px' }}>
          {[
            { label: 'Duration', value: tour.duration },
            { label: 'Price from', value: tour.price },
            { label: 'Collection', value: tour.tier.charAt(0).toUpperCase() + tour.tier.slice(1) },
          ].map(({ label, value }) => (
            <div key={label} style={{ background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '6px', padding: '12px 16px' }}>
              <p style={{ fontSize: '11px', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '2px' }}>{label}</p>
              <p style={{ fontSize: '15px', fontWeight: 600, color: '#111827' }}>{value}</p>
            </div>
          ))}
        </div>

        {/* Highlights */}
        {tour.highlights.length > 0 && (
          <div style={{ marginBottom: '32px' }}>
            <h2 style={{ fontSize: '16px', fontWeight: 700, color: '#111827', borderBottom: '1px solid #e5e7eb', paddingBottom: '6px', marginBottom: '12px' }}>
              Tour Highlights
            </h2>
            <ul style={{ columns: 2, gap: '16px', listStyle: 'none', padding: 0, margin: 0 }}>
              {tour.highlights.map((h, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '6px', marginBottom: '6px', fontSize: '13px', color: '#374151', breakInside: 'avoid' }}>
                  <span style={{ color: '#c0392b', fontWeight: 700, flexShrink: 0 }}>✓</span>
                  {h}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Itinerary */}
        <div style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '16px', fontWeight: 700, color: '#111827', borderBottom: '1px solid #e5e7eb', paddingBottom: '6px', marginBottom: '12px' }}>
            Day-by-Day Itinerary
          </h2>
          <div>
            {tour.itinerary.map((day) => (
              <div key={day.day} className="day-row" style={{ display: 'flex', gap: '16px', marginBottom: '16px', paddingBottom: '16px', borderBottom: '1px solid #f3f4f6' }}>
                <div style={{ flexShrink: 0, width: '40px', height: '40px', background: '#c0392b', color: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '13px' }}>
                  {day.day}
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontWeight: 700, fontSize: '14px', color: '#111827', marginBottom: '4px' }}>{day.title}</p>
                  <p style={{ fontSize: '12px', color: '#4b5563', lineHeight: 1.6, marginBottom: '6px' }}>{day.description}</p>
                  <div style={{ display: 'flex', gap: '16px', fontSize: '11px', color: '#6b7280' }}>
                    {day.meals && day.meals.length > 0 && (
                      <span>Meals: {day.meals.join(', ')}</span>
                    )}
                    {day.accommodation && (
                      <span>Accommodation: {day.accommodation}</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Inclusions / Exclusions */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '32px' }}>
          <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '6px', padding: '16px' }}>
            <h3 style={{ fontSize: '13px', fontWeight: 700, color: '#166534', marginBottom: '8px' }}>Included</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {tour.inclusions.map((item, i) => (
                <li key={i} style={{ display: 'flex', gap: '6px', marginBottom: '4px', fontSize: '12px', color: '#374151' }}>
                  <span style={{ color: '#16a34a', flexShrink: 0 }}>✓</span>{item}
                </li>
              ))}
            </ul>
          </div>
          <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '6px', padding: '16px' }}>
            <h3 style={{ fontSize: '13px', fontWeight: 700, color: '#991b1b', marginBottom: '8px' }}>Not Included</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {tour.exclusions.map((item, i) => (
                <li key={i} style={{ display: 'flex', gap: '6px', marginBottom: '4px', fontSize: '12px', color: '#374151' }}>
                  <span style={{ color: '#ef4444', flexShrink: 0 }}>✗</span>{item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer CTA */}
        <div style={{ background: '#1f2937', color: 'white', borderRadius: '6px', padding: '16px 20px', textAlign: 'center' }}>
          <p style={{ fontSize: '13px', marginBottom: '4px' }}>
            Ready to book? Contact our China specialists today.
          </p>
          <p style={{ fontSize: '14px', fontWeight: 700 }}>
            0800 CTS 888 &nbsp;·&nbsp; info@ctstours.co.nz
          </p>
        </div>

        <PrintPageActions />
      </div>
    </>
  );
}
