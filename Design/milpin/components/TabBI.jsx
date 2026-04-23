// ─────────────────────────────────────────────
// components/TabBI.jsx
// BI / Recommendations tab.
// Uses useBI hook for cosine similarity logic.
// Props: actor, setActor, theme
// ─────────────────────────────────────────────

function TabBI({ actor, setActor, theme }) {
  const bi = useBI(actor);
  const [shown, setShown] = React.useState(false);

  // Re-trigger entrance animation whenever actor changes
  React.useEffect(() => {
    setShown(false);
    const t = setTimeout(() => setShown(true), 80);
    return () => clearTimeout(t);
  }, [actor]);

  if (!bi) return null;

  const chartData = bi.recs.map(r => ({
    label:     r.producto.slice(0, 3),
    value:     r.cantidad,
    highlight: r.nuevo,
  }));

  return (
    <div style={{ padding: '16px 16px 0', display: 'flex', flexDirection: 'column', gap: 16 }}>

      {/* Hero card */}
      <div style={{
        background: theme.green,
        borderRadius: RADIUS.lg,
        padding: '20px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Decorative circle */}
        <div style={{
          position: 'absolute', right: -20, top: -20,
          width: 100, height: 100, borderRadius: '50%',
          background: 'rgba(255,255,255,0.12)',
          pointerEvents: 'none',
        }}/>

        <div style={{ ...TYPE.label, color: 'rgba(255,255,255,0.75)', marginBottom: 6 }}>
          INTELIGENCIA DE MERCADO
        </div>
        <div style={{ fontSize: 22, fontWeight: 800, color: '#fff', marginBottom: 4 }}>
          Análisis Colaborativo
        </div>
        <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.8)' }}>
          Similitud coseno · Filtrado colaborativo
        </div>

        {/* Actor selector pills */}
        <div style={{ marginTop: 14, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {ACTOR_LABELS.map((label, i) => (
            <button
              key={i}
              onClick={() => setActor(i)}
              style={{
                padding: '6px 14px',
                borderRadius: RADIUS.pill,
                border: 'none',
                background: actor === i ? '#fff' : 'rgba(255,255,255,0.2)',
                color: actor === i ? theme.green : '#fff',
                fontWeight: 700,
                fontSize: 12,
                cursor: 'pointer',
                transition: 'background 0.2s, color 0.2s',
              }}
            >
              A{i + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Similarity stats */}
      <div style={{ display: 'flex', gap: 10 }}>
        <StatCard label="Perfil similar" value={`A${bi.simIdx + 1}`}    theme={theme}/>
        <StatCard label="Similitud"      value={`${(bi.similarity * 100).toFixed(0)}%`} theme={theme}/>
      </div>

      {/* Mini bar chart */}
      <div style={{ background: theme.card, borderRadius: RADIUS.lg, padding: '16px 20px' }}>
        <div style={{ ...TYPE.label, color: theme.brown, marginBottom: 10 }}>
          PRODUCCIÓN RECOMENDADA (KG)
        </div>
        <MiniBarChart data={chartData} theme={theme}/>
      </div>

      {/* Product detail list */}
      <div style={{
        background: theme.card,
        borderRadius: RADIUS.lg,
        padding: '16px 20px',
        display: 'flex', flexDirection: 'column', gap: 14,
      }}>
        <div style={{ ...TYPE.label, color: theme.brown }}>DETALLE POR PRODUCTO</div>

        {bi.recs.map((r, i) => (
          <div
            key={i}
            style={{
              display: 'flex', alignItems: 'center', gap: 12,
              opacity:   shown ? 1 : 0,
              transform: shown ? 'none' : 'translateY(8px)',
              transition: `opacity 0.3s ${i * 0.08}s, transform 0.3s ${i * 0.08}s`,
            }}
          >
            {/* Emoji icon */}
            <div style={{
              width: 40, height: 40, borderRadius: RADIUS.md,
              background: r.nuevo ? theme.green : theme.cream,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 20, flexShrink: 0,
            }}>
              {PRODUCT_EMOJIS[r.producto]}
            </div>

            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: theme.brown }}>{r.producto}</div>
              <div style={{ fontSize: 11, color: theme.brown2, marginTop: 1 }}>
                {r.nuevo ? '✨ Sugerencia IA · ' : 'Histórico · '}
                {r.historico[0]}–{r.historico[2]} kg
              </div>
            </div>

            <div style={{ fontSize: 16, fontWeight: 800, color: r.nuevo ? theme.green : theme.brown, flexShrink: 0 }}>
              {r.cantidad} <span style={{ fontSize: 11, fontWeight: 500 }}>kg</span>
            </div>
          </div>
        ))}
      </div>

      <div style={{ height: 16 }}/>
    </div>
  );
}

window.TabBI = TabBI;
