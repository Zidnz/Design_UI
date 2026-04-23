// ─────────────────────────────────────────────
// components/MiniBarChart.jsx
// Horizontal mini bar chart for BI tab.
// Props: data [{ label, value, highlight }], theme
// ─────────────────────────────────────────────

function MiniBarChart({ data, theme }) {
  const max = Math.max(...data.map(d => d.value), 1);

  return (
    <div style={{
      display: 'flex',
      alignItems: 'flex-end',
      gap: SPACE.sm,
      height: 72,
      padding: '4px 0',
    }}>
      {data.map((d, i) => (
        <div
          key={i}
          title={`${d.label}: ${d.value} kg`}
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 4,
          }}
        >
          <div style={{
            width: '100%',
            borderRadius: 6,
            height: Math.max(4, (d.value / max) * 58),
            background: d.highlight ? theme.green : theme.cream,
            border: d.highlight ? 'none' : `1.5px solid ${theme.cream}`,
            transition: 'height 0.45s cubic-bezier(.16,1,.3,1)',
          }}/>
          <span style={{
            fontSize: 10,
            color: theme.brown2,
            fontWeight: 600,
          }}>
            {d.label}
          </span>
        </div>
      ))}
    </div>
  );
}

window.MiniBarChart = MiniBarChart;
