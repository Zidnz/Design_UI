// ─────────────────────────────────────────────
// components/TabAjustes.jsx
// Voice settings and app preferences tab.
// Props: theme
// ─────────────────────────────────────────────

function TabAjustes({ theme }) {
  const [selVoz,      setSelVoz]      = React.useState(0);
  const [probando,    setProbando]    = React.useState(false);
  const [notifEmail,  setNotifEmail]  = React.useState(true);
  const [autoBI,      setAutoBI]      = React.useState(false);
  const [offlineMode, setOfflineMode] = React.useState(false);

  function probarVoz() {
    setProbando(true);
    const text = 'Hola, soy Milpín. Analizando el Valle del Yaqui.';
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = VOCES_PRESET[selVoz].lang;
      u.rate = 1.05;
      u.onend = () => setProbando(false);
      window.speechSynthesis.speak(u);
    } else {
      setTimeout(() => setProbando(false), 1800);
    }
  }

  const prefItems = [
    { label: 'Notificaciones por email', sub: 'Recibir reportes diarios', val: notifEmail, set: setNotifEmail },
    { label: 'BI automático al iniciar', sub: 'Cargar análisis al abrir la app', val: autoBI,      set: setAutoBI      },
    { label: 'Modo sin conexión',        sub: 'Caché local de datos',            val: offlineMode, set: setOfflineMode },
  ];

  return (
    <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: 14 }}>

      {/* Voice config card */}
      <div style={{
        background: theme.card, borderRadius: RADIUS.lg,
        padding: '20px', display: 'flex', flexDirection: 'column', gap: 14,
      }}>
        <div style={{ fontSize: 15, fontWeight: 800, color: theme.brown }}>🎙 Voz del asistente</div>
        <p style={{ fontSize: 12, color: theme.brown2, marginTop: -6 }}>
          Las voces marcadas con ★ son neurales de alta calidad.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {VOCES_PRESET.map((v, i) => (
            <div
              key={i}
              onClick={() => setSelVoz(i)}
              style={{
                padding: '12px 14px', borderRadius: RADIUS.md, cursor: 'pointer',
                border: `1.5px solid ${selVoz === i ? theme.green : theme.cream}`,
                background: selVoz === i ? `${theme.green}12` : theme.bg,
                display: 'flex', alignItems: 'center', gap: 10,
                transition: 'border-color 0.15s, background 0.15s',
              }}
            >
              {/* Radio dot */}
              <div style={{
                width: 18, height: 18, borderRadius: '50%',
                border: `2px solid ${selVoz === i ? theme.green : '#ccc'}`,
                background: selVoz === i ? theme.green : 'transparent',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0, transition: 'border-color 0.15s, background 0.15s',
              }}>
                {selVoz === i && (
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#fff' }}/>
                )}
              </div>

              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: theme.brown }}>{v.name}</div>
                <div style={{ fontSize: 11, color: theme.brown2 }}>
                  {v.lang} · {v.neural ? 'Neural' : 'Estándar'}
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={probarVoz}
          disabled={probando}
          style={{
            width: '100%', padding: '13px',
            background: probando ? '#aaa' : theme.green,
            color: '#fff', border: 'none', borderRadius: RADIUS.md,
            fontWeight: 700, fontSize: 13, cursor: probando ? 'default' : 'pointer',
            transition: 'background 0.2s', fontFamily: 'inherit',
          }}
        >
          {probando ? '🔊 Reproduciendo…' : 'Probar voz seleccionada'}
        </button>
      </div>

      {/* Preferences card */}
      <div style={{
        background: theme.card, borderRadius: RADIUS.lg,
        padding: '20px', display: 'flex', flexDirection: 'column', gap: 18,
      }}>
        <div style={{ fontSize: 15, fontWeight: 800, color: theme.brown }}>⚙ Preferencias</div>

        {prefItems.map((item, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: theme.brown }}>{item.label}</div>
              <div style={{ fontSize: 11, color: theme.brown2, marginTop: 2 }}>{item.sub}</div>
            </div>
            <Toggle value={item.val} onChange={item.set} theme={theme}/>
          </div>
        ))}
      </div>

      {/* Version badge */}
      <div style={{ textAlign: 'center', fontSize: 11, color: theme.brown2, paddingBottom: 16 }}>
        MILPÍN ERP v2.3 · Valle del Yaqui AgTech
      </div>

    </div>
  );
}

window.TabAjustes = TabAjustes;
