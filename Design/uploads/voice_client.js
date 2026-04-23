// ==========================================
// voice_client.js: Cliente de Interfaz de Voz (Web Audio API)
// MILPÍN AgTech v2.0
// ==========================================

const API_BASE = "http://127.0.0.1:8000/api";

let mediaRecorder;
let audioChunks = [];
let vozSeleccionada = null;

document.addEventListener('DOMContentLoaded', () => {
    const btnMilpin = document.getElementById('milpinBtn');
    const statusText = document.getElementById('statusLabel');

    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        console.error("[MILPÍN] Este navegador no soporta Web Audio API");
        if (statusText) statusText.innerText = "Navegador no compatible con micrófono";
        return;
    }

    navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
            mediaRecorder = new MediaRecorder(stream, { mimeType: 'audio/webm' });

            mediaRecorder.ondataavailable = e => {
                if (e.data.size > 0) audioChunks.push(e.data);
            };

            mediaRecorder.onstop = async () => {
                if (statusText) statusText.innerText = "Procesando...";
                btnMilpin.classList.remove('listening');

                const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
                audioChunks = [];

                // Validar que hay audio real (no solo silencio/ruido)
                if (audioBlob.size < 1000) {
                    if (statusText) statusText.innerText = "Audio muy corto. Intenta de nuevo.";
                    return;
                }

                const formData = new FormData();
                formData.append("audio_file", audioBlob, "command.webm");

                try {
                    const response = await fetch(`${API_BASE}/voice-command`, {
                        method: "POST",
                        body: formData
                    });

                    if (!response.ok) {
                        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
                    }

                    const data = await response.json();
                    console.log("[MILPÍN] Respuesta:", data);
                    procesarRespuestaIA(data);

                } catch (error) {
                    console.error("[MILPÍN] Error de conexión:", error);
                    if (statusText) statusText.innerText = "Error de conexión con el servidor";
                    hablar("No puedo conectar con el servidor. Verifica que el backend esté corriendo.");
                }
            };

            if (statusText) statusText.innerText = "MILPÍN listo";
        })
        .catch(err => {
            console.error("[MILPÍN] Micrófono denegado:", err);
            if (statusText) statusText.innerText = "Permiso de micrófono denegado";
        });

    // Controles del botón (toggle: un clic inicia, otro clic detiene)
    if (btnMilpin) {
        btnMilpin.addEventListener('click', alternarGrabacion);
        btnMilpin.addEventListener('touchstart', (e) => { e.preventDefault(); alternarGrabacion(); });
    }

    // Cargar voces del navegador
    if (window.speechSynthesis.getVoices().length > 0) {
        poblarSelectorVoces();
    } else {
        window.speechSynthesis.onvoiceschanged = poblarSelectorVoces;
    }

    // Listener del selector de voz en Ajustes
    const selectVoz = document.getElementById('selectVoz');
    if (selectVoz) {
        selectVoz.addEventListener('change', actualizarVozDesdeSelect);
    }

    // Botón probar voz
    const btnProbarVoz = document.getElementById('btnProbarVoz');
    if (btnProbarVoz) {
        btnProbarVoz.addEventListener('click', () => {
            hablar('Hola, soy Milpín. Analizando el Valle del Yaqui.');
        });
    }
});

function alternarGrabacion() {
    if (!mediaRecorder) return;
    if (mediaRecorder.state === "inactive") {
        // Primer clic: iniciar grabación
        audioChunks = [];
        mediaRecorder.start();
        const btnMilpin = document.getElementById('milpinBtn');
        const statusText = document.getElementById('statusLabel');
        if (btnMilpin) btnMilpin.classList.add('listening');
        if (statusText) statusText.innerText = "MILPÍN TE ESCUCHA... (toca para enviar)";
    } else if (mediaRecorder.state === "recording") {
        // Segundo clic: detener y enviar
        mediaRecorder.stop();
    }
}

// ── Selector y configuración de voces TTS ───────────────────────────
function poblarSelectorVoces() {
    const select = document.getElementById('selectVoz');
    if (!select) return;
    const voces = window.speechSynthesis.getVoices();
    const vocesES = voces.filter(v => v.lang.startsWith('es'));
    if (vocesES.length === 0) return;
    select.innerHTML = '';
    const ordenadas = [
        ...vocesES.filter(v => v.name.includes('Natural') || v.name.includes('Online')),
        ...vocesES.filter(v => !v.name.includes('Natural') && !v.name.includes('Online'))
    ];
    ordenadas.forEach(voz => {
        const esNeural = voz.name.includes('Natural') || voz.name.includes('Online');
        const option = document.createElement('option');
        option.value = voz.name;
        option.textContent = `${esNeural ? '★ ' : ''}${voz.name} (${voz.lang})`;
        select.appendChild(option);
    });
    const prioridad = [
        'Microsoft Sabina Online (Natural)',
        'Microsoft Renata Online (Natural)',
        'Microsoft Elvira Online (Natural)',
        'Google español de México',
        'Google español',
        'Microsoft Sabina',
        'Microsoft Helena',
    ];
    let elegida = null;
    for (const nombre of prioridad) {
        elegida = ordenadas.find(v => v.name.toLowerCase().includes(nombre.toLowerCase()));
        if (elegida) break;
    }
    if (!elegida) elegida = ordenadas[0] || null;
    if (elegida) {
        vozSeleccionada = elegida;
        select.value = elegida.name;
        const label = document.getElementById('vozActualLabel');
        const esNeural = elegida.name.includes('Natural') || elegida.name.includes('Online');
        if (label) label.textContent = `${esNeural ? '★ Voz neural activa' : 'Voz activa'}: ${elegida.name}`;
    }
}

function actualizarVozDesdeSelect() {
    const select = document.getElementById('selectVoz');
    if (!select) return;
    const todasLasVoces = window.speechSynthesis.getVoices();
    const elegida = todasLasVoces.find(v => v.name === select.value);
    if (elegida) {
        vozSeleccionada = elegida;
        const label = document.getElementById('vozActualLabel');
        const esNeural = elegida.name.includes('Natural') || elegida.name.includes('Online');
        if (label) label.textContent = `${esNeural ? '★ Voz neural activa' : 'Voz activa'}: ${elegida.name}`;
        console.log(`[MILPÍN TTS] Voz cambiada a: ${elegida.name}`);
    }
}

// ── Sintetizador de voz (TTS nativo del navegador) ──────────────────
function hablar(texto) {
    if (!texto || !window.speechSynthesis) return;
    window.speechSynthesis.cancel(); // Cancelar cualquier utterance previa
    const voz = new SpeechSynthesisUtterance(texto);
    voz.lang = vozSeleccionada?.lang || 'es-MX';
    voz.rate = 1.05;
    voz.voice = vozSeleccionada;
    window.speechSynthesis.speak(voz);
}

// ── Llenado de formulario de prescripción ───────────────────────────
/**
 * Navega a tab-costos (si no está visible) e inyecta los parámetros
 * extraídos por el LLM en los campos del formulario #form-prescripcion.
 *
 * @param {Object} data - Respuesta completa del backend.
 * @param {Object|null} data.parameters - Entidades extraídas por el LLM.
 * @param {string|null} data.parameters.cultivo  - Clave del select (uva|maiz|algodon|frijol|chile).
 * @param {string|null} data.parameters.variedad - Texto libre para el input #variedad.
 * @param {string|null} data.parameters.insumo   - Texto libre para el input #insumo.
 * @param {number|null} data.parameters.tasa     - kg/ha para el input .rate-input.
 * @param {number|null} data.parameters.zona     - Número del botón .zone-btn a activar.
 */
function ejecutarAccionIA(data) {
    const p = data.parameters;
    if (!p) return;

    // 1. Navegar a la pestaña de costos si no es la activa
    const tabCostos = document.getElementById('tab-costos');
    if (tabCostos && tabCostos.style.display === 'none') {
        if (typeof cambiarPestana === 'function') {
            cambiarPestana(null, 'tab-costos');
        }
    }

    // 2. Rellenar el formulario tras un breve tick para que el DOM esté visible
    setTimeout(() => {
        // Cultivo (select)
        if (p.cultivo) {
            const selectCultivo = document.getElementById('select-cultivo');
            if (selectCultivo) selectCultivo.value = p.cultivo;
        }

        // Variedad (text input)
        if (p.variedad) {
            const inputVariedad = document.getElementById('variedad');
            if (inputVariedad) inputVariedad.value = p.variedad;
        }

        // Insumo (text input)
        if (p.insumo) {
            const inputInsumo = document.getElementById('insumo');
            if (inputInsumo) inputInsumo.value = p.insumo;
        }

        // Tasa estándar (number input — sin ID, sólo clase)
        if (p.tasa !== null && p.tasa !== undefined) {
            const inputTasa = document.querySelector('#form-prescripcion .rate-input');
            if (inputTasa) inputTasa.value = p.tasa;
        }

        // Zona de productividad (toggle buttons por contenido de texto)
        if (p.zona !== null && p.zona !== undefined) {
            document.querySelectorAll('#form-prescripcion .zone-btn').forEach(btn => {
                const esZona = parseInt(btn.textContent.trim(), 10) === p.zona;
                btn.classList.toggle('active', esZona);
            });
        }

        // Feedback visual: highlight breve en el formulario
        const form = document.getElementById('form-prescripcion');
        if (form) {
            form.style.transition = 'box-shadow 0.3s ease';
            form.style.boxShadow = '0 0 0 3px #7BB395';
            setTimeout(() => { form.style.boxShadow = ''; }, 1500);
        }

        console.log("[MILPÍN] Formulario rellenado:", p);
    }, 350);
}

// ── Orquestador de respuestas del ERP ───────────────────────────────
function procesarRespuestaIA(data) {
    const statusText = document.getElementById('statusLabel');

    // Mostrar transcripción si viene (debug)
    if (data.transcripcion) {
        console.log(`[MILPÍN] Transcrito: "${data.transcripcion}"`);
    }

    // Reproducir respuesta con voz
    if (data.message) {
        hablar(data.message);
    }

    // Actualizar status
    if (statusText) {
        statusText.innerText = data.message || "MILPÍN listo";
        // Restaurar después de 4 segundos
        setTimeout(() => { statusText.innerText = "MILPÍN listo"; }, 4000);
    }

    // Ejecutar acciones según la intención
    switch (data.intent) {
        case "navegar":
            if (data.target && typeof cambiarPestana === 'function') {
                cambiarPestana(null, data.target);
            }
            break;

        case "ejecutar_analisis":
            if (typeof cambiarPestana === 'function') {
                cambiarPestana(null, data.target || 'tab-mapas');
            }
            // Dar tiempo al DOM para renderizar el mapa antes de ejecutar
            setTimeout(() => {
                if (data.analisis === "logistica" && typeof ejecutarAnalisisSIG === 'function') {
                    ejecutarAnalisisSIG();
                }
            }, 600);
            break;

        case "llenar_prescripcion":
            ejecutarAccionIA(data);
            break;

        case "consultar":
            // Por ahora solo muestra el mensaje. En futuras versiones,
            // aquí se pueden hacer queries a la API de datos.
            break;

        case "error":
            console.error("[MILPÍN] Error del backend:", data.message);
            break;

        case "saludo":
        case "desconocido":
        default:
            // Solo reproduce el mensaje de voz (ya manejado arriba)
            break;
    }
}
