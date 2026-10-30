// The live stage: a pager of match boards you can tap, drag or flick, the chart on each board, and the live feed.

// Theme tokens from the stylesheet; each pair passes the dataviz palette validator on its own surface.
const WORM_COLORS = { t1: "var(--worm-t1)", t2: "var(--worm-t2)" };
const wormOvers = (m) => [...new Set(["t1", "t2"].flatMap((t) => (m.worm[t] || []).map(([o]) => o)))].sort((a, b) => a - b);
const wormRuns = (m, t, over) => (m.worm[t] || []).find(([o]) => o === over)?.[1];

function wormScales(m, w, h) {
  const pad = { l: 30, r: 34, t: 10, b: 22 };
  const top = Math.max(m.chase?.target ?? 0, ...["t1", "t2"].flatMap((t) => (m.worm[t] || []).map(([, r]) => r)));
  const step = top > 250 ? 100 : 50;
  const yMax = Math.ceil(top / step) * step;
  const x = (o) => pad.l + (o / m.worm.overs) * (w - pad.l - pad.r);
  const y = (r) => h - pad.b - (r / yMax) * (h - pad.t - pad.b);
  return { pad, x, y, step, yMax, xStep: m.worm.overs > 20 ? 10 : 5 };
}

function drawWorm(plot, m) {
  const w = plot.clientWidth, h = plot.clientHeight;
  if (!w || !h) return;
  const { pad, x, y, step, yMax, xStep } = wormScales(m, w, h);
  const yTicks = times(yMax / step + 1, (i) => {
    const v = i * step;
    return `<line class="grid" x1="${pad.l}" x2="${w - pad.r}" y1="${y(v)}" y2="${y(v)}"/><text class="tick" x="${pad.l - 8}" y="${y(v) + 4}" text-anchor="end">${v}</text>`;
  });
  const xTicks = times(m.worm.overs / xStep + 1, (i) => `<text class="tick" x="${x(i * xStep)}" y="${h - 4}" text-anchor="middle">${i * xStep}</text>`);
  const lines = ["t1", "t2"].filter((t) => m.worm[t]).map((t) => {
    const pts = m.worm[t], [lastO, lastR] = pts.at(-1);
    const d = pts.map(([o, r], i) => `${i ? "L" : "M"}${x(o).toFixed(1)} ${y(r).toFixed(1)}`).join("");
    const area = m.batting === t ? `<path d="${d}L${x(lastO).toFixed(1)} ${y(0)}L${x(0)} ${y(0)}Z" style="fill:${WORM_COLORS[t]}" opacity=".12"/>` : "";
    return `${area}<path class="worm-line" d="${d}" style="stroke:${WORM_COLORS[t]}"/>
      <circle class="worm-end" cx="${x(lastO)}" cy="${y(lastR)}" r="4" style="fill:${WORM_COLORS[t]}"/>
      <text class="worm-value" x="${x(lastO) + 9}" y="${y(lastR) + 4}">${lastR}</text>`;
  }).join("");
  plot.innerHTML = `<svg width="${w}" height="${h}" aria-hidden="true">${yTicks}${xTicks}${lines}<line class="crosshair" y1="${pad.t}" y2="${h - pad.b}" hidden/></svg><div class="worm-tip" hidden></div>`;
}

function showWormTip(plot, m, over) {
  const { x } = wormScales(m, plot.clientWidth, plot.clientHeight);
  const line = plot.querySelector(".crosshair"), tip = plot.querySelector(".worm-tip");
  line.removeAttribute("hidden");
  line.setAttribute("x1", x(over));
  line.setAttribute("x2", x(over));
  tip.hidden = false;
  tip.replaceChildren();
  const head = document.createElement("div");
  head.className = "tip-head";
  head.textContent = `Over ${Math.floor(over)}${over % 1 ? `.${Math.round((over % 1) * 6)}` : ""}`;
  tip.append(head);
  for (const t of ["t1", "t2"]) {
    const runs = wormRuns(m, t, over);
    if (runs === undefined) continue;
    const row = document.createElement("div");
    row.className = "tip-row";
    const key = document.createElement("i"), value = document.createElement("b"), team = document.createElement("span");
    key.style.background = WORM_COLORS[t];
    value.textContent = runs;
    team.textContent = m[t][0];
    row.append(key, value, team);
    tip.append(row);
  }
  const room = plot.clientWidth - tip.offsetWidth - 8;
  tip.style.transform = `translateX(${Math.max(0, Math.min(room, x(over) + 10))}px)`;
}

function hideWormTip(plot) {
  plot.querySelector(".crosshair")?.setAttribute("hidden", "");
  const tip = plot.querySelector(".worm-tip");
  if (tip) tip.hidden = true;
}

function initStage(matches) {
  const pager = document.querySelector(".pager"), track = document.querySelector(".track");
  const boards = [...track.children], chips = [...document.querySelectorAll(".score-chip")];
  const rail = document.querySelector(".rail"), pill = document.querySelector(".rail-pill");
  const plots = boards.map((b) => b.querySelector(".worm-plot"));
  const state = { x: 0, v: 0 };
  const fitHeight = matchMedia("(max-width: 62.5em)");
  let index = 0, step = 0, chipX = [], heights = [], width = 0, stop = null;

  const paint = () => {
    track.style.transform = `translate3d(${state.x}px,0,0)`;
    const p = Math.min(Math.max(-state.x / step || 0, 0), boards.length - 1);
    const lo = Math.floor(p), hi = Math.ceil(p);
    pill.style.transform = `translate3d(${chipX[lo] + (chipX[hi] - chipX[lo]) * (p - lo)}px,0,0)`;
    boards.forEach((b, i) => { b.style.opacity = 1 - Math.min(Math.abs(i - p), 1); });
    // One column stacks boards of very different heights, so the pager follows the one in view
    pager.style.height = fitHeight.matches ? `${heights[lo] + (heights[hi] - heights[lo]) * (p - lo)}px` : "";
  };

  const select = (i) => {
    index = i;
    chips.forEach((c, n) => { c.setAttribute("aria-selected", n === i); c.tabIndex = n === i ? 0 : -1; });
    boards.forEach((b, n) => { b.inert = n !== i; });
    const chip = chips[i];
    rail.scrollTo({ left: chip.offsetLeft - (rail.clientWidth - chip.offsetWidth) / 2, behavior: reduceMotion.matches ? "auto" : "smooth" });
  };

  const goTo = (i, opts = {}) => {
    select(i);
    stop?.();
    if (reduceMotion.matches) {
      state.x = -i * step;
      state.v = 0;
      paint();
      boards[i].animate([{ opacity: 0 }, { opacity: 1 }], { duration: 200 });
      return;
    }
    stop = spring(state, -i * step, { damping: 1, response: 0.45, ...opts }, paint);
  };

  const measure = () => {
    step = boards[1].offsetLeft - boards[0].offsetLeft;
    chipX = chips.map((c) => c.offsetLeft);
    pill.style.width = `${chips[0].offsetWidth}px`;
    pill.style.height = `${chips[0].offsetHeight}px`;
    heights = boards.map((b) => b.offsetHeight);
    stop?.();
    state.x = -index * step;
    state.v = 0;
    paint();
    plots.forEach((plot, i) => plot && drawWorm(plot, matches[i]));
  };
  // Only a width change re-lays out the boards; the pager's own height animates on every frame
  new ResizeObserver(() => {
    if (pager.clientWidth === width) return;
    width = pager.clientWidth;
    measure();
  }).observe(pager);
  document.fonts?.ready.then(measure);

  // Drag: 1:1 tracking with a 10px hysteresis, then a projected landing and a velocity handoff to the spring
  let drag = null, justDragged = false;
  pager.addEventListener("pointerdown", (e) => {
    if (e.button) return;
    drag = { id: e.pointerId, x0: e.clientX, y0: e.clientY, from: 0, on: false, trail: [] };
  });
  pager.addEventListener("pointermove", (e) => {
    if (!drag || e.pointerId !== drag.id) return;
    const dx = e.clientX - drag.x0, dy = e.clientY - drag.y0;
    if (!drag.on) {
      if (Math.hypot(dx, dy) < 10) return;
      if (Math.abs(dy) > Math.abs(dx)) { drag = null; return; }
      drag.on = true;
      drag.x0 = e.clientX;
      stop?.();
      drag.from = state.x;
      pager.setPointerCapture(e.pointerId);
      pager.classList.add("dragging");
      getSelection()?.removeAllRanges();
    }
    const raw = drag.from + (e.clientX - drag.x0), min = -(boards.length - 1) * step;
    state.x = raw > 0 ? rubberband(raw, step) : raw < min ? min + rubberband(raw - min, step) : raw;
    drag.trail.push([e.timeStamp, e.clientX]);
    if (drag.trail.length > 6) drag.trail.shift();
    paint();
  });
  const release = (e) => {
    if (!drag || e.pointerId !== drag.id) return;
    const { on, trail } = drag;
    drag = null;
    if (!on) return;
    pager.classList.remove("dragging");
    justDragged = true;
    setTimeout(() => { justDragged = false; }, 0);
    const recent = trail.filter(([t]) => e.timeStamp - t < 100);
    const v = recent.length > 1 ? ((recent.at(-1)[1] - recent[0][1]) / (recent.at(-1)[0] - recent[0][0] || 1)) * 1000 : 0;
    // A deliberate flick commits by its direction; anything slower lands where its momentum would carry it
    const landing = Math.abs(v) > 300 ? index - Math.sign(v) : Math.round(-(state.x + project(v)) / step);
    const target = Math.min(Math.max(landing, index - 1, 0), index + 1, boards.length - 1);
    state.v = v;
    goTo(target, { damping: Math.abs(v) > 400 ? 0.82 : 1, response: 0.42 });
  };
  pager.addEventListener("pointerup", release);
  pager.addEventListener("pointercancel", release);
  pager.addEventListener("click", (e) => { if (justDragged) { e.preventDefault(); e.stopPropagation(); } }, true);

  // Chart readout: the crosshair snaps to the nearest over, on hover or with the arrow keys
  plots.forEach((plot, i) => {
    if (!plot) return;
    const m = matches[i];
    const nearest = (px) => {
      const { x } = wormScales(m, plot.clientWidth, plot.clientHeight);
      return wormOvers(m).reduce((best, o) => (Math.abs(x(o) - px) < Math.abs(x(best) - px) ? o : best));
    };
    let keyed = null;
    plot.addEventListener("pointermove", (e) => showWormTip(plot, m, nearest(e.clientX - plot.getBoundingClientRect().left)));
    plot.addEventListener("pointerleave", () => hideWormTip(plot));
    plot.addEventListener("blur", () => { keyed = null; hideWormTip(plot); });
    plot.addEventListener("keydown", (e) => {
      if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
      e.preventDefault();
      e.stopPropagation();
      const overs = wormOvers(m), at = keyed === null ? overs.length - 1 : overs.indexOf(keyed);
      keyed = overs[Math.min(Math.max(at + (e.key === "ArrowRight" ? 1 : -1), 0), overs.length - 1)];
      showWormTip(plot, m, keyed);
    });
  });

  const render = (i) => {
    const m = matches[i], board = boards[i];
    for (const root of [board, chips[i]]) {
      for (const t of ["t1", "t2"]) {
        rollTo(root.querySelector(`[data-team="${t}"] .runs`), m[t][1]);
        rollTo(root.querySelector(`[data-team="${t}"] .overs`), m[t][2]);
      }
      root.querySelector(".note").textContent = m.note;
    }
    board.querySelectorAll(".stats dd").forEach((dd, n) => rollTo(dd, m.stats[n][1]));
    if (plots[i]) drawWorm(plots[i], m);
    heights[i] = board.offsetHeight;
    paint();
  };

  return { goTo, render, board: (i) => boards[i] };
}

// Plays the sample feed into the first match. Swap for a real stream by calling stage.render() on each update.
function startSampleFeed(stage, m, feed) {
  const parse = (text) => text.split("/").map(Number);
  let [runs, wickets] = parse(m.t2[1]);
  let balls = Math.round(parseFloat(m.t2[2].slice(1)) * 10);
  balls = Math.floor(balls / 10) * 6 + (balls % 10);
  const base = m.worm.t2.length;
  const box = stage.board(0).querySelector(".balls");
  let at = 0;
  const timer = setInterval(() => {
    if (document.hidden) return;
    if (at >= feed.length) { clearInterval(timer); return; }
    const ball = feed[at++];
    if (ball === "W") wickets++; else runs += Number(ball);
    if (balls % 6 === 0) { m.over = []; box.replaceChildren(); }
    balls++;
    m.chase.balls--;
    m.over.push(ball);
    const need = m.chase.target - runs;
    m.t2[1] = `${runs}/${wickets}`;
    m.t2[2] = `(${Math.floor(balls / 6)}.${balls % 6})`;
    m.note = `${m.chase.team} need ${need} runs in ${m.chase.balls} balls`;
    m.stats = [m.stats[0], ["Req. rate", ((need * 6) / m.chase.balls).toFixed(2)], ["Run rate", ((runs * 6) / balls).toFixed(2)]];
    m.worm.t2.length = base;
    m.worm.t2.push([+(balls / 6).toFixed(2), runs]);
    box.insertAdjacentHTML("beforeend", Ball(ball));
    stage.render(0);
  }, 4500);
}
