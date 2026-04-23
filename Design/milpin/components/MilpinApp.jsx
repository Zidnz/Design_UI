// ─────────────────────────────────────────────
// components/MilpinApp.jsx
// Root application shell.
// Composes tabs, nav bar, FAB, and status label.
// Owns top-level state: activeTab, actor, aiOverride.
// Props: theme, actor, setActor, mapZoom
// ─────────────────────────────────────────────

const NAV_TABS = [
  { id: 'bi',      label: 'BI/R',   Icon: () => <Icons.BI/>     },
  { id: 'mapas',   label: 'Mapas',  Icon: () => <Icons.Map/>    },
  { id: 'costos',  label: 'Costos', Icon: () => <Icons.Cost/>   },
  { id: 'ajustes', label: 'Ajustes',Icon: () => <Icons.Gear/>   },
];

function MilpinApp({ theme, actor, setActor, mapZoom }) {
  const [tab,        setTab]        = React.useState('bi');
  const [aiOverride, setAiOverride] = React.useState(null);

  const { listening, status, toggle } = useVoice({
    onNavigate: (target) => setTab(target),
    onFillForm: (params) => setAiOverride({ ...params, _ts: Date.now() }),
  });

  const G = theme.green;

  return (
    <div style={{
      display: 'flex', flexDirection: 'column',
      height: '100%', background: theme.bg,
      position: 'relative', fontFamily: "'Segoe UI', sans-serif",
    }}>
      {/* ── Scrollable content ── */}
      <div style={{ flex: 1, overflowY: 'auto', paddingTop: 4 }}>
        {tab === 'bi'      && <TabBI      actor={actor} setActor={setActor} theme={theme}/>}
        {tab === 'mapas'   && <TabMapas   theme={theme} mapZoom={mapZoom}/>}
        {tab === 'costos'  && <TabCostos  theme={theme} aiOverride={aiOverride}/>}
        {tab === 'ajustes' && <TabAjustes theme={theme}/>}
      </div>

      {/* ── Status label ── */}
      <div style={{
        position: 'absolute', bottom: 90, left: '50%',
        transform: 'translateX(-50%)',
        fontSize: 11, color: theme.brown2,
        background: theme.card,
        padding: '4px 14px', borderRadius: 12,
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        whiteSpace: 'nowrap', zIndex: 100,
        pointerEvents: 'none',
      }}>
        {status}
      </div>

      {/* ── FAB voice button ── */}
      <div
        onClick={toggle}
        style={{
          width: 60, height: 60, borderRadius: '50%',
          background: listening ? '#E63946' : G,
          position: 'absolute', bottom: 20, left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          border: '5px solid #fff',
          boxShadow: listening
            ? '0 0 0 8px rgba(230,57,70,0.25), 0 4px 20px rgba(230,57,70,0.5)'
            : '0 4px 20px rgba(0,0,0,0.15)',
          zIndex: 200, cursor: 'pointer',
          transition: 'background 0.2s, box-shadow 0.2s',
          animation: listening ? 'milpinPulse 1.5s infinite' : 'none',
        }}
      >
        <Icons.Mic/>
      </div>

      {/* ── Bottom nav bar ── */}
      <nav style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: 70,
        background: theme.card,
        display: 'flex', justifyContent: 'space-around', alignItems: 'center',
        borderTop: '1px solid #F0EEE4', zIndex: 150,
      }}>
        {NAV_TABS.map(({ id, label, Icon }, i) => {
          const active = tab === id;
          // Leave center gap for FAB
          if (i === 2) return (
            <React.Fragment key="fab-gap">
              <div style={{ width: 60 }}/>
              <a
                key={id}
                href="#"
                onClick={e => { e.preventDefault(); setTab(id); }}
                style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center',
                  textDecoration: 'none',
                  color: active ? G : '#BDBAAE',
                  fontSize: 10, gap: 3, fontWeight: active ? 700 : 400,
                }}
              >
                <Icon/><span>{label}</span>
              </a>
            </React.Fragment>
          );

          return (
            <a
              key={id}
              href="#"
              onClick={e => { e.preventDefault(); setTab(id); }}
              style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                textDecoration: 'none',
                color: active ? G : '#BDBAAE',
                fontSize: 10, gap: 3, fontWeight: active ? 700 : 400,
                transition: 'color 0.15s',
              }}
            >
              <Icon/><span>{label}</span>
            </a>
          );
        })}
      </nav>
    </div>
  );
}

window.MilpinApp = MilpinApp;
