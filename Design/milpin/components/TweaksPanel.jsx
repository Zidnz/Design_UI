// ─────────────────────────────────────────────
// components/TweaksPanel.jsx
// In-design tweak controls (accent, actor, zoom).
// Communicates with host via postMessage.
// Props: visible, themeKey, setThemeKey,
//        actor, setActor, mapZoom, setMapZoom
// ─────────────────────────────────────────────

const SWATCH_OPTIONS = [
  { key: 'default', color: '#7BB395', label: 'Campo'  },
  { key: 'slate',   color: '#5B8FA8', label: 'Azul'   },
  { key: 'terra',   color: '#B37B5B', label: 'Tierra' },
];

function TweaksPanel({ visible, themeKey, setThemeKey, actor, setActor, mapZoom, setMapZoom }) {
  if (!visible) return null;

  function handleTheme(key) {
    setThemeKey(key);
    window.parent.postMessage({ type: '__edit_mode_set_keys', edits: { themeKey: key } }, '*');
  }
  function handleActor(v) {
    setActor(parseInt(v));
    window.parent.postMessage({ type: '__edit_mode_set_keys', edits: { actor: parseInt(v) } }, '*');
  }
  function handleZoom(v) {
    setMapZoom(parseInt(v));
    window.parent.postMessage({ type: '__edit_mode_set_keys', edits: { mapZoom: parseInt(v) } }, '*');
  }

  const panelStyle = {
    position: 'fixed', bottom: 20, right: 20,
    background: 'rgba(255,255,255,0.97)',
    backdropFilter: 'blur(12px)',
    borderRadius: RADIUS.lg,
    padding: '18px',
    boxShadow: '0 8px 32px rgba(0,0,0,0.14)',
    border: '1px solid rgba(74,59,40,0.08)',
    zIndex: 9999,
    width: 220,
    fontFamily: "'Segoe UI', sans-serif",
    fontSize: 13,
  };

  const labelStyle = {
    ...TYPE.label,
    color: '#8C7F6E',
    display: 'block',
    marginBottom: 6,
  };

  const rowStyle = { marginBottom: 14 };

  return (
    <div style={panelStyle}>
      <div style={{ ...TYPE.label, color: '#4A3B28', marginBottom: 14 }}>⚙ Tweaks</div>

      {/* Theme swatches */}
      <div style={rowStyle}>
        <label style={labelStyle}>Tema de color</label>
        <div style={{ display: 'flex', gap: 8 }}>
          {SWATCH_OPTIONS.map(s => (
            <div
              key={s.key}
              title={s.label}
              onClick={() => handleTheme(s.key)}
              style={{
                width: 30, height: 30,
                borderRadius: RADIUS.sm,
                background: s.color,
                cursor: 'pointer',
                border: themeKey === s.key
                  ? '2.5px solid #333'
                  : '2px solid transparent',
                transform: themeKey === s.key ? 'scale(1.12)' : 'scale(1)',
                transition: 'transform 0.15s, border-color 0.15s',
              }}
            />
          ))}
        </div>
      </div>

      {/* Actor select */}
      <div style={rowStyle}>
        <label style={labelStyle}>Actor activo</label>
        <select
          value={actor}
          onChange={e => handleActor(e.target.value)}
          style={{
            width: '100%', padding: '7px 10px',
            borderRadius: RADIUS.sm,
            border: '1px solid rgba(74,59,40,0.12)',
            fontSize: 12, background: '#FBF9F6',
            color: '#4A3B28', fontFamily: 'inherit',
          }}
        >
          {ACTOR_LABELS.map((l, i) => (
            <option key={i} value={i}>{l}</option>
          ))}
        </select>
      </div>

      {/* Map zoom slider */}
      <div style={rowStyle}>
        <label style={labelStyle}>Zoom mapa (z{mapZoom})</label>
        <input
          type="range" min={9} max={14} step={1} value={mapZoom}
          onChange={e => handleZoom(e.target.value)}
          style={{ width: '100%', accentColor: '#7BB395' }}
        />
      </div>
    </div>
  );
}

window.TweaksPanel = TweaksPanel;
