// Motion primitives. Springs use Apple's two parameters: damping ratio (1 = no overshoot) and response in seconds.
const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)");
const SPRING_EASE = getComputedStyle(document.documentElement).getPropertyValue("--spring").trim();

// Animates state.x to `to`, starting from its current position and velocity, so any motion can be interrupted.
const spring = (state, to, { damping = 1, response = 0.4 }, onFrame) => {
  const w = (2 * Math.PI) / response;
  const wd = w * Math.sqrt(Math.max(1 - damping * damping, 0));
  const under = damping < 1;
  const A = state.x - to;
  const B = under ? (state.v + damping * w * A) / wd : state.v + w * A;
  const start = performance.now();
  let raf = requestAnimationFrame(function tick(now) {
    const t = (now - start) / 1000;
    const decay = Math.exp(-damping * w * t);
    const [c, s, dc, ds] = under
      ? [Math.cos(wd * t), Math.sin(wd * t), -wd * Math.sin(wd * t), wd * Math.cos(wd * t)]
      : [1, t, 0, 1];
    state.x = to + decay * (A * c + B * s);
    state.v = decay * (A * dc + B * ds - damping * w * (A * c + B * s));
    if (Math.abs(state.x - to) < 0.2 && Math.abs(state.v) < 4) {
      state.x = to;
      state.v = 0;
      onFrame();
      return;
    }
    onFrame();
    raf = requestAnimationFrame(tick);
  });
  return () => cancelAnimationFrame(raf);
};

// Where a flick would come to rest, using the same decay as scrolling.
const project = (velocity, decel = 0.998) => ((velocity / 1000) * decel) / (1 - decel);

// Progressive resistance past an edge.
const rubberband = (over, size, c = 0.55) => (over * size * c) / (size + c * Math.abs(over));

// Swaps text and rolls only the characters that changed, like a numeric content transition.
const rollTo = (el, text) => {
  const old = el.textContent;
  if (old === text) return;
  if (reduceMotion.matches) { el.innerHTML = scoreHtml(text); return; }
  el.innerHTML = [...text].map((ch) => `<span class="digit${ch === "/" ? " slash" : ""}">${esc(ch)}</span>`).join("");
  [...el.children].forEach((d, i) => {
    const prev = old[old.length - (text.length - i)];
    if (prev === d.textContent) return;
    d.dataset.old = prev ?? "";
    const opts = { duration: 520, easing: SPRING_EASE };
    d.animate([{ transform: "translateY(.6em)", opacity: 0, filter: "blur(.05em)" }, { transform: "none", opacity: 1, filter: "blur(0)" }], opts);
    d.animate([{ transform: "none", opacity: 1, filter: "blur(0)" }, { transform: "translateY(-.6em)", opacity: 0, filter: "blur(.05em)" }], { ...opts, pseudoElement: "::before" });
  });
  // Back to plain text afterwards, so kerning returns and screen readers get a whole number
  setTimeout(() => { if (el.textContent === text) el.innerHTML = scoreHtml(text); }, 560);
};
