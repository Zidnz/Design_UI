// ─────────────────────────────────────────────
// hooks/useBI.js — Collaborative filtering hook
// Encapsulates cosine similarity logic for the
// BI/Recommendations tab.
// ─────────────────────────────────────────────

/**
 * cosineSimilarity(a, b) → number [0..1]
 * Computes the cosine similarity between two
 * equal-length numeric arrays.
 */
function cosineSimilarity(a, b) {
  let dot = 0, na = 0, nb = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    na  += a[i] * a[i];
    nb  += b[i] * b[i];
  }
  if (!na || !nb) return 0;
  return dot / (Math.sqrt(na) * Math.sqrt(nb));
}

/**
 * useBI(actorIndex) → { simIdx, similarity, recs }
 *
 * @param {number} actorIndex – 0-based index of the active actor
 * @returns {object}
 *   simIdx     {number}  Index of the most similar actor
 *   similarity {number}  Cosine similarity score [0..1]
 *   recs       {Array}   Per-product recommendation objects:
 *     { producto, cantidad, nuevo, historico }
 */
function useBI(actorIndex) {
  const { useState, useEffect } = React;
  const [result, setResult] = React.useState(null);

  React.useEffect(() => {
    // Average each product's [min,avg,max] triple into a scalar
    const avgs = HISTORIAL.map(actor =>
      actor.map(product => product.reduce((a, b) => a + b, 0) / product.length)
    );

    const current = avgs[actorIndex];

    // Find the actor with highest cosine similarity (excluding self)
    let maxSim = -1, simIdx = -1;
    avgs.forEach((actorAvg, i) => {
      if (i === actorIndex) return;
      const sim = cosineSimilarity(current, actorAvg);
      if (sim > maxSim) { maxSim = sim; simIdx = i; }
    });

    const recs = current.map((avg, i) => ({
      producto:   PRODUCTOS[i],
      cantidad:   Math.round(avg > 0 ? avg : avgs[simIdx][i]),
      nuevo:      avg === 0 && avgs[simIdx][i] > 0,
      historico:  HISTORIAL[actorIndex][i],   // [min, avg, max]
    }));

    setResult({ simIdx, similarity: maxSim, recs });
  }, [actorIndex]);

  return result;
}

window.useBI = useBI;
window.cosineSimilarity = cosineSimilarity;
