// ─────────────────────────────────────────────
// components/TabMapas.jsx
// GIS map tab — simulated satellite view with
// NDVI parcels and K-Means clustering.
// Props: theme, mapZoom
// ─────────────────────────────────────────────

// Returns a color from red → yellow → green based on NDVI value
function ndviColor(v) {
  if (v > 75) return '#22c55e';
  if (v > 60) return '#84cc16';
  if (v > 45) return '#eab308';
  if (v > 30) return '#f97316';
  return '#ef4444';
}

function TabMapas({ theme, mapZoom }) {
  const [selected,   setSelected]   = React.useState(null);
  const [clustering, setClustering] = React.useState(false);
  const [clustered,  setClustered]  = React.useState(false);

  const scale = 0.78 + (mapZoom - 9) * 0.04;

  function runClustering() {
    setClustering(true);
    setTimeout(() => {
      setClustering(false);
      setClustered(true);
    }, 1800);
  }

  function handleParcelClick(p) {
    setSelected(prev => prev?.id === p.id ? null : p);
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>

      {/* ── Map canvas ── */}
      <div style={{ flex: 1, position: 'relative', overflow: 'hidden', background: '#1a2e1a', minHeight: 340 }}>

        {/* Satellite texture via radial gradients */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: `
            radial-gradient(ellipse 60% 40% at 30% 60%, rgba(34,80,34,0.5) 0%, transparent 70%),
            radial-gradient(ellipse 40% 60% at 70% 40%, rgba(45,90,30,0.4) 0%, transparent 60%),
            radial-gradient(ellipse 80% 80% at 50% 50%, rgba(20,50,20,0.6) 0%, transparent 100%)
          `,
        }}/>

        {/* Canal and boundary SVG overlay */}
        <svg
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
          preserveAspectRatio="none"
        >
          <line x1="20%" y1="0%" x2="25%" y2="100%" stroke="rgba(0,229,255,0.25)" strokeWidth="1.5"/>
          <line x1="60%" y1="0%" x2="65%" y2="100%" stroke="rgba(0,229,255,0.25)" strokeWidth="1.5"/>
          <line x1="0" y1="45%" x2="100%" y2="48%" stroke="rgba(41,128,185,0.5)" strokeWidth="3"/>
          <line x1="0" y1="70%" x2="100%" y2="65%" stroke="rgba(93,173,226,0.35)" strokeWidth="2" strokeDasharray="6,4"/>
          <polygon
            points="12,20 85,15 92,80 75,90 15,88 8,50"
            fill="rgba(62,231,234,0.04)"
            stroke="rgba(62,231,234,0.45)"
            strokeWidth="2"
            strokeDasharray="8,6"
          />
        </svg>

        {/* Parcela markers */}
        {PARCELAS.map(p => (
          <div
            key={p.id}
            onClick={() => handleParcelClick(p)}
            title={`${p.nombre} — NDVI ${p.ndvi}%`}
            style={{
              position: 'absolute',
              left: `${p.x}%`, top: `${p.y}%`,
              transform: `translate(-50%,-50%) scale(${scale})`,
              cursor: 'pointer',
              zIndex: selected?.id === p.id ? 10 : 5,
              transition: 'transform 0.2s',
            }}
          >
            <div style={{
              width: 28, height: 28, borderRadius: 6,
              background: ndviColor(p.ndvi),
              opacity: 0.78,
              border: selected?.id === p.id
                ? '2.5px solid #fff'
                : '1.5px solid rgba(255,255,255,0.3)',
              boxShadow: selected?.id === p.id ? '0 0 0 3px rgba(255,255,255,0.3)' : 'none',
              transition: 'border 0.15s, box-shadow 0.15s',
            }}/>
          </div>
        ))}

        {/* Cluster warehouse markers (post-analysis) */}
        {clustered && ALMACENES_SUGERIDOS.map((a, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: `${a.x}%`, top: `${a.y}%`,
              transform: 'translate(-50%,-50%)',
              zIndex: 15,
              animation: 'milpinFadeIn 0.4s ease',
            }}
          >
            <div style={{
              width: 38, height: 38, borderRadius: '50%',
              background: 'rgba(39,174,96,0.22)',
              border: '2px solid #27AE60',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 18,
            }}>🏭</div>
          </div>
        ))}

        {/* Selected parcel popup */}
        {selected && (
          <div style={{
            position: 'absolute',
            left: `${Math.min(selected.x, 68)}%`,
            top:  `${Math.max(selected.y - 22, 4)}%`,
            background: 'rgba(0,0,0,0.88)',
            backdropFilter: 'blur(8px)',
            borderRadius: 12, padding: '10px 14px',
            color: '#fff', zIndex: 20, minWidth: 138,
            border: '1px solid rgba(255,255,255,0.15)',
            pointerEvents: 'none',
          }}>
            <div style={{ fontSize: 12, fontWeight: 700 }}>{selected.nombre}</div>
            <div style={{ fontSize: 10, color: '#aaa', marginTop: 2 }}>{selected.estado}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 7 }}>
              <div style={{ width: 10, height: 10, borderRadius: 3, background: ndviColor(selected.ndvi) }}/>
              <span style={{ fontSize: 11, fontWeight: 700 }}>NDVI {selected.ndvi}%</span>
            </div>
          </div>
        )}

        {/* NDVI legend */}
        <div style={{
          position: 'absolute', bottom: 12, left: 12,
          background: 'rgba(0,0,0,0.72)',
          borderRadius: 10, padding: '8px 12px',
          backdropFilter: 'blur(4px)',
        }}>
          <div style={{ ...TYPE.label, color: 'rgba(255,255,255,0.7)', fontSize: 9, marginBottom: 5 }}>NDVI</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <span style={{ fontSize: 8, color: 'rgba(255,255,255,0.6)' }}>Crítico</span>
            <div style={{ width: 60, height: 6, borderRadius: 3, background: 'linear-gradient(90deg,#ef4444,#eab308,#22c55e)' }}/>
            <span style={{ fontSize: 8, color: 'rgba(255,255,255,0.6)' }}>Óptimo</span>
          </div>
        </div>

        {/* Zoom badge */}
        <div style={{
          position: 'absolute', top: 10, right: 10,
          background: 'rgba(0,0,0,0.55)', color: '#fff',
          borderRadius: 8, padding: '4px 9px',
          fontSize: 10, fontWeight: 700,
        }}>
          z{mapZoom} · Cajeme
        </div>
      </div>

      {/* ── Bottom panel ── */}
      <div style={{ padding: '12px 16px', background: theme.bg, display: 'flex', flexDirection: 'column', gap: 10 }}>

        <button
          onClick={runClustering}
          disabled={clustering}
          style={{
            width: '100%', padding: '14px',
            borderRadius: RADIUS.md, border: 'none',
            background: clustering ? '#aaa' : theme.brown,
            color: '#fff', fontWeight: 700, fontSize: 13,
            cursor: clustering ? 'default' : 'pointer',
            transition: 'background 0.2s',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          }}
        >
          {clustering ? '⌛ Ejecutando K-Means…' : '🗺 Ejecutar Clustering Logístico'}
        </button>

        {clustered && (
          <div style={{
            background: theme.card,
            borderRadius: RADIUS.md, padding: '12px 16px',
            border: `1.5px solid ${theme.green}`,
            fontSize: 12,
          }}>
            <div style={{ fontWeight: 700, color: theme.brown, marginBottom: 4 }}>✅ Clustering completado</div>
            <div style={{ color: theme.brown2 }}>3 almacenes sugeridos · 8 lotes analizados</div>
          </div>
        )}

        {/* NDVI monitor strip */}
        <div style={{ background: theme.card, borderRadius: RADIUS.md, padding: '12px 16px' }}>
          <div style={{ ...TYPE.label, color: theme.brown, marginBottom: 6 }}>
            MONITOR SATELITAL NDVI · VALLE DEL YAQUI
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 10, color: theme.brown2 }}>
            <span>Crítico</span>
            <div style={{ flex: 1, height: 8, borderRadius: 4, background: 'linear-gradient(90deg,#8B0000,#FFD700,#006400)' }}/>
            <span>Óptimo</span>
          </div>
        </div>

      </div>
    </div>
  );
}

window.TabMapas = TabMapas;
