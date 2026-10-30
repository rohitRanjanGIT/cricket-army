// Cover art drawn from cricket's own graphics: wagon wheels, pitch maps, field settings.
// Stands in until an item has a real photo; set `img` on the data item and Cover uses that instead.
const seeded = (text) => {
  let s = [...String(text)].reduce((h, c) => (h * 31 + c.charCodeAt(0)) % 2147483646, 7) + 1;
  return () => (s = (s * 16807) % 2147483647) / 2147483647;
};
const f1 = (v) => +v.toFixed(1);
const times = (n, fn) => Array.from({ length: n }, (_, i) => fn(i)).join("");

const FIELD = `<ellipse class="a-line" cx="160" cy="100" rx="148" ry="92"/><ellipse class="a-faint" cx="160" cy="100" rx="86" ry="56"/><rect class="a-dot" x="156" y="85" width="8" height="30" rx="1" opacity=".5"/>`;

const ART = {
  wagon: (r) => FIELD + times(36, () => {
    const a = r() * Math.PI * 2, reach = r() ** 0.6, boundary = reach > 0.82, f = boundary ? 1 : reach;
    return `<line class="${boundary ? "a-chalk" : "a-line"}" x1="160" y1="100" x2="${f1(160 + Math.cos(a) * 148 * f)}" y2="${f1(100 + Math.sin(a) * 92 * f)}"/>`;
  }) + `<circle class="a-white" cx="160" cy="100" r="3"/>`,

  pitch: (r) => `<polygon class="a-fill" points="122,-6 198,-6 262,206 58,206"/><polygon class="a-line" points="122,-6 198,-6 262,206 58,206"/>
    <line class="a-chalk" x1="112" y1="26" x2="208" y2="26"/><line class="a-chalk" x1="82" y1="162" x2="238" y2="162"/>` + times(30, () => {
    const y = 58 + r() * 84, spread = 40 + (y - 26) * 0.3, hot = r() > 0.72;
    return `<circle class="${hot ? "a-white" : "a-dot"}" cx="${f1(160 + (r() - 0.5) * spread * 1.6)}" cy="${f1(y)}" r="${f1(2.2 + (y / 200) * 3)}"/>`;
  }),

  field: (r) => FIELD + times(11, (i) => {
    const a = (i / 11) * Math.PI * 2 + r() * 0.4, f = 0.42 + r() * 0.52;
    return `<circle class="${i % 4 ? "a-white" : "a-dot"}" cx="${f1(160 + Math.cos(a) * 148 * f)}" cy="${f1(100 + Math.sin(a) * 92 * f)}" r="4.5"/>`;
  }),

  manhattan: (r) => `<line class="a-faint" x1="0" y1="178" x2="320" y2="178"/>` + times(20, (i) => {
    const h = 18 + r() ** 1.4 * 128, tall = h > 104, x = 12 + i * 15;
    return `<path class="${tall ? "a-white" : "a-dot"}" d="M${x} 178V${f1(178 - h + 3)}q0-3 3-3h4q3 0 3 3V178z"/>` + (r() > 0.84 ? `<circle class="a-white" cx="${x + 5}" cy="${f1(178 - h - 10)}" r="3"/>` : "");
  }),

  worm: (r) => {
    const line = (lift) => {
      let y = 186;
      return times(21, (i) => `${i ? "L" : "M"}${i * 16} ${f1((y -= (5 + r() * 9) * lift))}`);
    };
    return times(4, (i) => `<line class="a-faint" x1="0" y1="${40 + i * 44}" x2="320" y2="${40 + i * 44}"/>`) + `<path class="a-line a-thick" d="${line(1)}"/><path class="a-chalk a-thick" d="${line(0.86)}"/>`;
  },

  // A whole ball, seam on the diagonal like the one in the logo
  seam: () => {
    const R = 88, cx = 160, cy = 100, x = (y, off) => f1(cx + off + 14 * Math.sin((y / R) * 1.5));
    const curve = (off) => times(21, (i) => { const y = -R + (i * 2 * R) / 20; return `${i ? "L" : "M"}${x(y, off)} ${f1(cy + y)}`; });
    const stitches = (off) => times(15, (i) => { const y = -R + ((i + 1) * 2 * R) / 16; return `<line class="a-chalk" x1="${x(y, off - 4)}" y1="${f1(cy + y - 1.5)}" x2="${x(y, off + 4)}" y2="${f1(cy + y + 1.5)}"/>`; });
    return `<g transform="rotate(28 ${cx} ${cy})"><circle class="a-ball" cx="${cx}" cy="${cy}" r="${R}"/><path class="a-chalk" d="${curve(-2.5)}"/><path class="a-chalk" d="${curve(2.5)}"/>${stitches(-10)}${stitches(10)}</g>
      <path class="a-shade" d="M${cx} ${cy - R}A${R} ${R} 0 0 1 ${cx} ${cy + R}A${R * 0.62} ${R} 0 0 0 ${cx} ${cy - R}Z"/>`;
  },

  stumps: () => `<line class="a-faint" x1="0" y1="172" x2="320" y2="172"/>` +
    [126, 156.5, 187].map((x) => `<rect class="a-white" x="${x}" y="48" width="7" height="124" rx="3.5"/>`).join("") +
    `<rect class="a-dot" x="122" y="40" width="36" height="5" rx="2.5"/><rect class="a-dot" x="162" y="40" width="36" height="5" rx="2.5"/>` +
    times(7, (i) => `<circle class="a-dot" cx="${252 + i * 12}" cy="${f1(138 - i * i * 1.6)}" r="${f1(5 - i * 0.5)}" opacity="${f1(1 - i * 0.12)}"/>`) + `<circle class="a-white" cx="226" cy="132" r="7"/>`,

  // Two towers at different distances, their beams crossing over the ground
  lights: (r) => {
    const tower = (cx, top, scale) => {
      const w = 46 * scale, h = 26 * scale;
      return `<polygon class="a-beam" points="${cx - w / 2},${top + h} ${cx - 190 * scale},212 ${cx + 110 * scale},212"/>
        <polygon class="a-steel" points="${f1(cx - 2.2 * scale)},${top + h} ${f1(cx + 2.2 * scale)},${top + h} ${f1(cx + 5 * scale)},212 ${f1(cx - 5 * scale)},212"/>
        <rect class="a-steel" x="${cx - w / 2}" y="${top}" width="${w}" height="${h}" rx="${2 * scale}"/>` +
        times(24, (i) => `<circle class="a-white" cx="${f1(cx - w / 2 + (w / 7) * ((i % 6) + 1))}" cy="${f1(top + (h / 5) * (Math.floor(i / 6) + 1))}" r="${f1(1.5 * scale)}" opacity="${f1(0.6 + r() * 0.4)}"/>`);
    };
    return tower(236, 16, 1.5) + tower(92, 62, 0.8) + `<line class="a-faint" x1="0" y1="186" x2="320" y2="186"/>`;
  },

  crowd: (r) => times(420, (i) => {
    const col = i % 30, row = Math.floor(i / 30), torch = r() > 0.84;
    return `<circle class="${torch ? "a-white" : "a-dot"}" cx="${f1(4 + col * 10.8 + (row % 2) * 5)}" cy="${f1(6 + row * 14)}" r="${f1(torch ? 2.8 : 1 + r() * 1.6)}" opacity="${f1(torch ? 1 : 0.2 + (row / 14) * 0.6)}"/>`;
  }),
};

const Art = (kind, seed) =>
  `<svg class="art" viewBox="0 0 320 200" preserveAspectRatio="xMidYMid slice" aria-hidden="true">${ART[kind](seeded(seed))}</svg>`;
