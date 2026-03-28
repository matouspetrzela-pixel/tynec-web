'use client';

/**
 * Kořenová chyba – pouze inline styly, bez importu CSS (stabilní pro dev overlay).
 */
export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="cs">
      <body style={{ margin: 0, fontFamily: 'system-ui, sans-serif' }}>
        <div style={{ padding: '2rem', textAlign: 'center' }}>
          <h1 style={{ fontSize: '1.25rem', color: '#1a1a1a' }}>Kritická chyba</h1>
          <button
            type="button"
            onClick={() => reset()}
            style={{
              marginTop: '1rem',
              padding: '0.5rem 1.25rem',
              background: '#D71920',
              color: '#fff',
              border: 'none',
              borderRadius: '0.5rem',
              cursor: 'pointer',
              fontWeight: 600,
            }}
          >
            Zkusit znovu
          </button>
        </div>
      </body>
    </html>
  );
}
