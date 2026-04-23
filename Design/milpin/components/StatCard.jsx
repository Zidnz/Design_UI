// ─────────────────────────────────────────────
// components/StatCard.jsx
// Generic metric card used across tabs.
// Props: label, value, unit, color, theme
// ─────────────────────────────────────────────

function StatCard({ label, value, unit = '', color, theme }) {
  const bg = color || theme.cream;
  return (
    <div style={{
      background: bg,
      borderRadius: RADIUS.md,
      padding: '14px 16px',
      flex: 1,
      transition: 'transform 0.15s',
    }}>
      <div style={{
        ...TYPE.value,
        fontSize: 24,
        color: theme.brown,
      }}>
        {value}
        {unit && (
          <span style={{ fontSize: 12, fontWeight: 500, marginLeft: 3, opacity: 0.6 }}>
            {unit}
          </span>
        )}
      </div>
      <div style={{
        ...TYPE.label,
        color: theme.brown2,
        marginTop: 4,
      }}>
        {label}
      </div>
    </div>
  );
}

window.StatCard = StatCard;
