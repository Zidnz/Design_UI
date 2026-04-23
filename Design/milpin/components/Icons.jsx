// ─────────────────────────────────────────────
// components/Icons.jsx
// Centralized SVG icon library.
// All icons accept optional size + color props.
// ─────────────────────────────────────────────

const Icons = {
  BI: ({ size = 22, color = 'currentColor' }) => (
    <svg viewBox="0 0 24 24" width={size} height={size} fill={color}>
      <rect x="5" y="9.2" width="3" height="9.8" rx="1"/>
      <rect x="10.6" y="5" width="2.8" height="14" rx="1"/>
      <rect x="16.2" y="12" width="2.8" height="7" rx="1"/>
      <rect x="4" y="19" width="16" height="1.5" rx="0.7"/>
    </svg>
  ),
  Map: ({ size = 22, color = 'currentColor' }) => (
    <svg viewBox="0 0 24 24" width={size} height={size} fill={color}>
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
    </svg>
  ),
  Cost: ({ size = 22, color = 'currentColor' }) => (
    <svg viewBox="0 0 24 24" width={size} height={size} fill={color}>
      <path d="M19 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2zm-9 14H7v-7h3v7zm5 0h-3V7h3v10zm4 0h-3v-4h3v4z"/>
    </svg>
  ),
  Gear: ({ size = 22, color = 'currentColor' }) => (
    <svg viewBox="0 0 24 24" width={size} height={size} fill={color}>
      <path d="M19.14 12.94c.04-.3.06-.61.06-.94s-.02-.64-.07-.94l2.03-1.58a.49.49 0 00.12-.61l-1.92-3.32a.49.49 0 00-.59-.22l-2.39.96a7.02 7.02 0 00-1.62-.94l-.36-2.54A.484.484 0 0014 2h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96a.47.47 0 00-.59.22L2.74 9.87a.49.49 0 00.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58a.49.49 0 00-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32a.49.49 0 00-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/>
    </svg>
  ),
  Mic: ({ size = 28, color = 'white' }) => (
    <svg viewBox="0 0 24 24" width={size} height={size} fill={color}>
      <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/>
      <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/>
    </svg>
  ),
  ArrowUp: ({ size = 10, color = 'currentColor' }) => (
    <svg viewBox="0 0 10 10" width={size} height={size}>
      <path d="M5 1L9 5H6v4H4V5H1L5 1z" fill={color}/>
    </svg>
  ),
  Check: ({ size = 16, color = 'currentColor' }) => (
    <svg viewBox="0 0 16 16" width={size} height={size} fill="none">
      <path d="M3 8l4 4 6-7" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  Leaf: ({ size = 24, color = 'white' }) => (
    <svg viewBox="0 0 24 24" width={size} height={size} fill={color}>
      <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 008 20C19 20 22 3 22 3c-1 2-8 4-9 8-1.5-2-2-3.5-1.5-6C9 7 6 8 4 11"/>
    </svg>
  ),
};

window.Icons = Icons;
