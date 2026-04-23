// ─────────────────────────────────────────────
// components/TabCostos.jsx
// Fertilization prescription form.
// Accepts aiOverride to auto-fill from voice.
// Props: theme, aiOverride
// ─────────────────────────────────────────────

function TabCostos({ theme, aiOverride }) {
  const [cultivo,  setCultivo]  = React.useState('uva');
  const [variedad, setVariedad] = React.useState('');
  const [insumo,   setInsumo]   = React.useState('Carbamide');
  const [tasa,     setTasa]     = React.useState(250);
  const [zonas,    setZonas]    = React.useState(3);
  const [saving,   setSaving]   = React.useState(false);
  const [saved,    setSaved]    = React.useState(false);
  const [highlight,setHighlight]= React.useState(false);

  // Apply AI voice override when received
  React.useEffect(() => {
    if (!aiOverride) return;
    if (aiOverride.cultivo)  setCultivo(aiOverride.cultivo);
    if (aiOverride.variedad) setVariedad(aiOverride.variedad);
    if (aiOverride.insumo)   setInsumo(aiOverride.insumo);
    if (aiOverride.tasa)     setTasa(aiOverride.tasa);
    if (aiOverride.zona)     setZonas(aiOverride.zona);
    setHighlight(true);
    const t = setTimeout(() => setHighlight(false), 1500);
    return () => clearTimeout(t);
  }, [aiOverride]);

  function save() {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    }, 1400);
  }

  const currentCultivo = CULTIVOS.find(c => c.value === cultivo) || CULTIVOS[0];

  // ── Shared input style ──
  const inputStyle = {
    width: '100%', padding: '12px 14px',
    border: `1.5px solid ${highlight ? theme.green : theme.cream}`,
    borderRadius: RADIUS.md,
    background: theme.bg, fontSize: 13,
    color: theme.brown, fontFamily: 'inherit',
    transition: 'border-color 0.3s',
    outline: 'none',
  };

  return (
    <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: 14 }}>

      {/* Hero banner */}
      <div style={{
        background: theme.green, borderRadius: RADIUS.lg,
        padding: '18px 20px', position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', right: -15, top: -15,
          width: 80, height: 80, borderRadius: '50%',
          background: 'rgba(255,255,255,0.12)', pointerEvents: 'none',
        }}/>
        <div style={{ ...TYPE.label, color: 'rgba(255,255,255,0.75)' }}>PRESCRIPCIÓN</div>
        <div style={{ fontSize: 20, fontWeight: 800, color: '#fff', marginTop: 4 }}>
          Fertilización Inteligente
        </div>
        <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.8)', marginTop: 2 }}>
          Optimización por zonas de productividad
        </div>
      </div>

      {/* Form card */}
      <div style={{
        background: theme.card, borderRadius: RADIUS.lg, padding: '20px',
        outline: highlight ? `3px solid ${theme.green}` : 'none',
        transition: 'outline 0.3s',
        display: 'flex', flexDirection: 'column', gap: 16,
      }}>

        {/* Cultivo */}
        <div>
          <label style={{ ...TYPE.label, color: theme.brown, display: 'block', marginBottom: 6 }}>
            CULTIVO
          </label>
          <div style={{ position: 'relative' }}>
            <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', fontSize: 18 }}>
              {currentCultivo.emoji}
            </span>
            <select
              value={cultivo}
              onChange={e => setCultivo(e.target.value)}
              style={{ ...inputStyle, paddingLeft: 44, appearance: 'none', cursor: 'pointer' }}
            >
              {CULTIVOS.map(c => (
                <option key={c.value} value={c.value}>{c.label}</option>
              ))}
            </select>
          </div>
          <input
            value={variedad}
            onChange={e => setVariedad(e.target.value)}
            placeholder="Variedad / híbrido"
            style={{ ...inputStyle, marginTop: 8 }}
          />
        </div>

        {/* Insumo */}
        <div>
          <label style={{ ...TYPE.label, color: theme.brown, display: 'block', marginBottom: 6 }}>
            INSUMO
          </label>
          <input
            value={insumo}
            onChange={e => setInsumo(e.target.value)}
            style={inputStyle}
          />
        </div>

        {/* Tasa */}
        <div>
          <label style={{ ...TYPE.label, color: theme.brown, display: 'block', marginBottom: 6 }}>
            TASA ESTÁNDAR
          </label>
          <div style={{ display: 'flex', gap: 8 }}>
            <input
              type="number"
              value={tasa}
              onChange={e => setTasa(e.target.value)}
              style={{ ...inputStyle, flex: 1, fontSize: 16, fontWeight: 700 }}
            />
            <div style={{
              padding: '12px 18px', borderRadius: RADIUS.md,
              background: theme.cream, fontWeight: 700,
              color: theme.brown2, fontSize: 13, whiteSpace: 'nowrap',
            }}>
              kg/ha
            </div>
          </div>
        </div>

        {/* Zonas toggle */}
        <div>
          <label style={{ ...TYPE.label, color: theme.brown, display: 'block', marginBottom: 6 }}>
            ZONAS DE PRODUCTIVIDAD
          </label>
          <div style={{
            display: 'flex', background: theme.cream,
            borderRadius: RADIUS.md, padding: 4, gap: 4,
          }}>
            {[3, 5, 7].map(z => (
              <button
                key={z}
                onClick={() => setZonas(z)}
                style={{
                  flex: 1, padding: '10px', borderRadius: 10, border: 'none',
                  background: zonas === z ? theme.card : 'transparent',
                  color: zonas === z ? theme.brown : theme.brown2,
                  fontWeight: 700, fontSize: 15, cursor: 'pointer',
                  boxShadow: zonas === z ? '0 2px 6px rgba(0,0,0,0.07)' : 'none',
                  transition: 'background 0.15s, color 0.15s',
                  fontFamily: 'inherit',
                }}
              >
                {z}
              </button>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
          <button
            onClick={save}
            style={{
              flex: 1, padding: '15px', borderRadius: RADIUS.md, border: 'none',
              background: saved ? '#22c55e' : theme.green,
              color: '#fff', fontWeight: 700, fontSize: 14,
              cursor: 'pointer', transition: 'background 0.2s',
              fontFamily: 'inherit',
            }}
          >
            {saving ? '⌛ Guardando…' : saved ? '✅ Guardado' : 'Guardar'}
          </button>
          <button style={{
            flex: 1, padding: '15px', borderRadius: RADIUS.md, border: 'none',
            background: theme.brown2, color: '#fff',
            fontWeight: 700, fontSize: 14, cursor: 'pointer',
            fontFamily: 'inherit',
          }}>
            Ensayos ➜
          </button>
        </div>
      </div>

      {/* Summary card */}
      <div style={{ background: theme.card, borderRadius: RADIUS.md, padding: '14px 16px' }}>
        <div style={{ ...TYPE.label, color: theme.brown, marginBottom: 8 }}>RESUMEN</div>
        <div style={{ display: 'flex', gap: 8 }}>
          <StatCard label="Zonas"    value={zonas} theme={theme}/>
          <StatCard label="kg/ha"    value={tasa}  theme={theme}/>
        </div>
      </div>

      <div style={{ height: 16 }}/>
    </div>
  );
}

window.TabCostos = TabCostos;
