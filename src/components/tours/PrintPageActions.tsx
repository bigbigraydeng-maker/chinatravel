'use client';

/** Client-only actions for /tours/.../print (Server Components cannot use onClick). */
export default function PrintPageActions() {
  return (
    <div className="no-print" style={{ textAlign: 'center', marginTop: '32px' }}>
      <button
        type="button"
        onClick={() => window.print()}
        style={{
          background: '#c0392b',
          color: 'white',
          border: 'none',
          padding: '12px 32px',
          borderRadius: '24px',
          fontSize: '14px',
          fontWeight: 600,
          cursor: 'pointer',
        }}
      >
        Print / Save as PDF
      </button>
      <button
        type="button"
        onClick={() => window.history.back()}
        style={{
          marginLeft: '12px',
          background: 'transparent',
          color: '#374151',
          border: '1px solid #d1d5db',
          padding: '12px 24px',
          borderRadius: '24px',
          fontSize: '14px',
          cursor: 'pointer',
        }}
      >
        ← Back to Tour
      </button>
    </div>
  );
}
