// ─────────────────────────────────────────────
// hooks/useVoice.js — Voice assistant hook
// Manages mic toggle, processing state and
// dispatches AI intent actions back to the app.
// ─────────────────────────────────────────────

/**
 * useVoice({ onNavigate, onFillForm })
 *
 * @param {object} handlers
 *   onNavigate(tabId)   – called when AI intent === 'navegar'
 *   onFillForm(params)  – called when AI intent === 'llenar_prescripcion'
 *
 * @returns {object}
 *   listening  {boolean}  Is mic active?
 *   status     {string}   Status label shown in UI
 *   toggle     {fn}       Toggle mic on/off
 */
function useVoice({ onNavigate, onFillForm }) {
  const { useState, useCallback, useRef } = React;

  const [listening, setListening] = useState(false);
  const [status,    setStatus]    = useState('MILPÍN listo');
  const timerRef = useRef(null);

  // Speak via browser TTS
  const speak = useCallback((text) => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utt = new SpeechSynthesisUtterance(text);
    utt.lang = 'es-MX';
    utt.rate = 1.05;
    window.speechSynthesis.speak(utt);
  }, []);

  // Simulate processing a voice command and resolving an intent
  const processIntent = useCallback(() => {
    setStatus('Procesando…');
    clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
      // Pick a random simulated intent
      const intent = VOICE_INTENTS[Math.floor(Math.random() * VOICE_INTENTS.length)];

      speak(intent.message);
      setStatus(intent.message);

      if (intent.intent === 'navegar' && intent.target) {
        onNavigate?.(intent.target);
      }
      if (intent.intent === 'llenar_prescripcion' && intent.parameters) {
        onNavigate?.('costos');
        onFillForm?.(intent.parameters);
      }

      // Reset status after delay
      timerRef.current = setTimeout(() => setStatus('MILPÍN listo'), 3500);
    }, 1600);
  }, [onNavigate, onFillForm, speak]);

  const toggle = useCallback(() => {
    if (listening) {
      setListening(false);
      processIntent();
    } else {
      setListening(true);
      setStatus('MILPÍN TE ESCUCHA…');
    }
  }, [listening, processIntent]);

  return { listening, status, toggle };
}

window.useVoice = useVoice;
