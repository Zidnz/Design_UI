// ─────────────────────────────────────────────
// components/Toggle.jsx
// iOS-style toggle switch.
// Props: value {bool}, onChange {fn}, theme
// ─────────────────────────────────────────────

function Toggle({ value, onChange, theme }) {
  return (
    <div
      role="switch"
      aria-checked={value}
      tabIndex={0}
      onClick={() => onChange(!value)}
      onKeyDown={e => e.key === ' ' && onChange(!value)}
      style={{
        width: 48,
        height: 28,
        borderRadius: RADIUS.pill,
        background: value ? theme.green : '#C8C4BE',
        position: 'relative',
        cursor: 'pointer',
        transition: 'background 0.2s ease',
        flexShrink: 0,
      }}
    >
      <div style={{
        position: 'absolute',
        top: 3,
        left: value ? 22 : 3,
        width: 22,
        height: 22,
        borderRadius: '50%',
        background: '#fff',
        boxShadow: '0 1px 4px rgba(0,0,0,0.22)',
        transition: 'left 0.2s ease',
      }}/>
    </div>
  );
}

window.Toggle = Toggle;
