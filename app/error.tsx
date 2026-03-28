'use client';

/**
 * Minimální error boundary – žádné Tailwind / globální CSS, aby dev overlay
 * neměl problém s načtením (hláška „missing required error components“).
 */
export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <p style={{ marginBottom: '1rem', color: '#1a1a1a' }}>Něco se pokazilo.</p>
      <button
        type="button"
        onClick={() => reset()}
        style={{
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
  );
}
