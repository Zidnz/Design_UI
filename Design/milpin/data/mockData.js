// ─────────────────────────────────────────────
// data/mockData.js — Centralized mock data
// All static datasets used across the app.
// ─────────────────────────────────────────────

// ── BI / Collaborative filtering ─────────────
const PRODUCTOS = ['Uva', 'Maíz', 'Frijol'];

// historial[actor][producto] = [min, avg, max] kg
const HISTORIAL = [
  [[200, 230, 260], [  0,   0,   0], [  0,   0,   0]],
  [[210, 230, 250], [100, 120, 140], [200, 220, 240]],
  [[  0,   0,   0], [ 90, 110, 130], [180, 200, 220]],
  [[190, 220, 250], [ 80,  90, 100], [160, 180, 200]],
];

const ACTOR_LABELS = ['Actor 1', 'Actor 2', 'Actor 3', 'Actor 4'];

const PRODUCT_EMOJIS = { Uva: '🍇', Maíz: '🌽', Frijol: '🫘' };

// ── GIS / Map parcels ─────────────────────────
// x/y are percentage positions on the map canvas
const PARCELAS = [
  { id:1, x:46, y:42, ndvi:88, nombre:'Lote Norte A',  estado:'Óptimo'   },
  { id:2, x:58, y:55, ndvi:72, nombre:'Lote Centro',   estado:'Bueno'    },
  { id:3, x:35, y:62, ndvi:48, nombre:'Lote Sur B',    estado:'Moderado' },
  { id:4, x:68, y:38, ndvi:31, nombre:'Parcela 4',     estado:'Crítico'  },
  { id:5, x:52, y:70, ndvi:91, nombre:'Lote Rio 1',    estado:'Óptimo'   },
  { id:6, x:30, y:45, ndvi:65, nombre:'Lote Poniente', estado:'Bueno'    },
  { id:7, x:74, y:62, ndvi:22, nombre:'Parcela 7',     estado:'Crítico'  },
  { id:8, x:42, y:78, ndvi:78, nombre:'Lote Sur C',    estado:'Bueno'    },
];

// Suggested warehouse positions (after clustering)
const ALMACENES_SUGERIDOS = [
  { x:50, y:50 },
  { x:38, y:60 },
  { x:64, y:44 },
];

// ── Voice assistant responses ─────────────────
// Simulated AI intent responses (replaces real backend)
const VOICE_INTENTS = [
  {
    intent: 'llenar_prescripcion',
    message: 'Prescripción de Uva lista ✅',
    parameters: { cultivo:'uva', insumo:'Nitrato de amonio', tasa:280, zona:5 },
  },
  {
    intent: 'navegar',
    message: 'Navegando al análisis BI',
    target: 'bi',
  },
  {
    intent: 'saludo',
    message: 'Hola, soy Milpín. ¿En qué te ayudo?',
  },
  {
    intent: 'consultar',
    message: 'NDVI promedio en el valle: 62%. Tres parcelas en estado crítico.',
  },
];

// ── Ajustes: TTS voice presets ────────────────
const VOCES_PRESET = [
  { name:'★ Microsoft Sabina (Natural)', lang:'es-MX', neural:true  },
  { name:'★ Microsoft Renata (Natural)', lang:'es-MX', neural:true  },
  { name:'Google español de México',     lang:'es-MX', neural:false },
  { name:'Microsoft Helena',             lang:'es-ES', neural:false },
];

// ── Cultivos catalog ──────────────────────────
const CULTIVOS = [
  { value:'uva',      label:'Uva de mesa',    emoji:'🍇' },
  { value:'maiz',     label:'Maíz para grano',emoji:'🌽' },
  { value:'algodon',  label:'Algodón',        emoji:'🌿' },
  { value:'frijol',   label:'Frijol',         emoji:'🫘' },
  { value:'chile',    label:'Chile verde',    emoji:'🌶' },
];

Object.assign(window, {
  PRODUCTOS, HISTORIAL, ACTOR_LABELS, PRODUCT_EMOJIS,
  PARCELAS, ALMACENES_SUGERIDOS,
  VOICE_INTENTS,
  VOCES_PRESET,
  CULTIVOS,
});
