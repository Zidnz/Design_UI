// ─────────────────────────────────────────────
// theme.js — Design tokens for MILPÍN ERP
// Single source of truth for all colors,
// radii, shadows and spacing.
// ─────────────────────────────────────────────

const THEMES = {
  default: {
    green:   '#7BB395',
    green2:  '#5a9175',
    brown:   '#4A3B28',
    brown2:  '#8C7F6E',
    cream:   '#F1ECE1',
    bg:      '#FBF9F6',
    card:    '#FFFFFF',
    accent:  '#E8C27D',
    red:     '#E63946',
    sky:     '#5DADE2',
  },
  slate: {
    green:   '#5B8FA8',
    green2:  '#2E6B8F',
    brown:   '#2E3A47',
    brown2:  '#5A6E7D',
    cream:   '#E8EEF4',
    bg:      '#F5F8FC',
    card:    '#FFFFFF',
    accent:  '#7BB395',
    red:     '#E63946',
    sky:     '#5DADE2',
  },
  terra: {
    green:   '#B37B5B',
    green2:  '#8A5C3E',
    brown:   '#3B2A1A',
    brown2:  '#7A6050',
    cream:   '#F4EDE6',
    bg:      '#FBF7F4',
    card:    '#FFFFFF',
    accent:  '#C8A87D',
    red:     '#E63946',
    sky:     '#5DADE2',
  },
};

// Border & shadow utilities derived from theme
function themeShadow(t) {
  return `0 1px 3px rgba(74,59,40,0.05), 0 4px 16px rgba(74,59,40,0.07)`;
}
function themeBorder(t) {
  return `1px solid rgba(74,59,40,0.08)`;
}

// Radii
const RADIUS = {
  sm:  '10px',
  md:  '14px',
  lg:  '20px',
  xl:  '28px',
  pill:'999px',
};

// Spacing scale (px)
const SPACE = {
  xs:  4,
  sm:  8,
  md:  12,
  lg:  16,
  xl:  24,
};

// Typography scale
const TYPE = {
  label:  { fontSize: 11, fontWeight: 700, letterSpacing: '0.6px', textTransform: 'uppercase' },
  body:   { fontSize: 13, fontWeight: 400 },
  bodyMd: { fontSize: 14, fontWeight: 500 },
  title:  { fontSize: 15, fontWeight: 700, letterSpacing: '-0.2px' },
  value:  { fontSize: 28, fontWeight: 700, letterSpacing: '-1px', lineHeight: 1 },
};

Object.assign(window, { THEMES, themeShadow, themeBorder, RADIUS, SPACE, TYPE });
