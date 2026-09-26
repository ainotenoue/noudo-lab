const state = {
  A: { weight: 100, concentration: 4 },
  B: { weight: 100, concentration: 4 },
  aLocked: true
};

// IMPORTANT:
// A and B always use the SAME scale.
// Width represents solution weight.
// Height represents concentration.
const SCALE = {
  minWeight: 50,
  maxWeight: 300,
  minConcentration: 1,
  maxConcentration: 20,
  minWidth: 90,
  maxWidth: 430,
  minHeight: 48,
  maxHeight: 310
};

function map(value, inMin, inMax, outMin, outMax) {
  return outMin + ((value - inMin) / (inMax - inMin)) * (outMax - outMin);
}

function formatNumber(n) {
  return Number.isInteger(n) ? String(n) : n.toFixed(1).replace(/\.0$/, "");
}

function renderVessel(key) {
  const data = state[key];
  const vessel = document.getElementById(`vessel${key}`);
  const width = map(
    data.weight, SCALE.minWeight, SCALE.maxWeight,
    SCALE.minWidth, SCALE.maxWidth
  );
  const height = map(
    data.concentration, SCALE.minConcentration, SCALE.maxConcentration,
    SCALE.minHeight, SCALE.maxHeight
  );

  // Keep the two diagrams visually comparable with one common scale.
  // CSS caps prevent overflow on smaller screens.
  vessel.style.width = `min(${width}px, var(--max-vessel-width))`;
  vessel.style.height = `min(${height}px, var(--max-vessel-height))`;

  const salt = data.weight * data.concentration / 100;

  document.getElementById(`weightLabel${key}`).textContent = `${data.weight}g`;
  document.getElementById(`concentrationLabel${key}`).textContent = `${data.concentration}%`;
  document.getElementById(`saltLabel${key}`).textContent = `${formatNumber(salt)}g`;

  document.getElementById(`weightValue${key}`).textContent = `${data.weight}g`;
  document.getElementById(`concentrationValue${key}`).textContent = `${data.concentration}%`;
}

function bindSlider(id, key, field) {
  const el = document.getElementById(id);
  el.addEventListener("input", () => {
    state[key][field] = Number(el.value);
    renderVessel(key);
  });
}

bindSlider("weightA", "A", "weight");
bindSlider("concentrationA", "A", "concentration");
bindSlider("weightB", "B", "weight");
bindSlider("concentrationB", "B", "concentration");

document.getElementById("lockA").addEventListener("click", () => {
  state.aLocked = !state.aLocked;

  const weightA = document.getElementById("weightA");
  const concentrationA = document.getElementById("concentrationA");
  const controlsA = document.getElementById("controlsA");
  const button = document.getElementById("lockA");

  weightA.disabled = state.aLocked;
  concentrationA.disabled = state.aLocked;
  controlsA.classList.toggle("locked", state.aLocked);

  button.textContent = state.aLocked ? "🔒 基準" : "🔓 変更できます";
  button.setAttribute("aria-pressed", String(state.aLocked));
});

document.getElementById("reset").addEventListener("click", () => {
  state.A = { weight: 100, concentration: 4 };
  state.B = { weight: 100, concentration: 4 };

  for (const key of ["A", "B"]) {
    document.getElementById(`weight${key}`).value = 100;
    document.getElementById(`concentration${key}`).value = 4;
    renderVessel(key);
  }
});

renderVessel("A");
renderVessel("B");
