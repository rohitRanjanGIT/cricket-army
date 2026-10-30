// Reusable render functions. Each returns an HTML string.
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const style = (c) => Object.entries(c).map(([k, v]) => `${k}:${v}`).join(";");
const scoreHtml = (s) => esc(s).replace("/", '<span class="slash">/</span>');
const svgIcon = (d) => `<svg class="icon" viewBox="0 0 24 24" aria-hidden="true">${d}</svg>`;

const ICON = {
  search: svgIcon('<circle cx="11" cy="11" r="6.5"/><path d="m16 16 4.5 4.5"/>'),
  theme: svgIcon('<circle cx="12" cy="12" r="8.5"/><path d="M12 3.5a8.5 8.5 0 0 1 0 17z" fill="currentColor" stroke="none"/>'),
  menu: svgIcon('<path d="M4 8h16M4 16h16"/>'),
  chevron: svgIcon('<path d="m9.5 5.5 6.5 6.5-6.5 6.5"/>'),
  play: svgIcon('<path d="M8 5.2v13.6a.6.6 0 0 0 .9.5l11-6.8a.6.6 0 0 0 0-1l-11-6.8a.6.6 0 0 0-.9.5z" fill="currentColor" stroke="none"/>'),
};

const StatusBadge = (s) => ({
  live: '<span class="badge badge-live">Live</span>',
  done: '<span class="badge badge-done">Result</span>',
  soon: '<span class="badge badge-soon">Upcoming</span>',
}[s]);

const Header = (items) => `
  <div class="header-top">
    <a class="logo" href="#">${Logo()}</a>
    <div class="header-menu" id="header-menu">
      <nav class="nav" aria-label="Main"><ul>
        ${items.map((n, i) => `<li><a href="#" class="${i === 0 ? "active" : ""}"${i === 0 ? ' aria-current="page"' : ""}>${esc(n)}</a></li>`).join("")}
      </ul></nav>
      <label class="search">${ICON.search}<input type="search" placeholder="Search matches, players, news" aria-label="Search"></label>
      <a class="btn-app" href="#">Get the App</a>
    </div>
    <button class="icon-btn theme-toggle" aria-label="Switch between light and dark">${ICON.theme}</button>
    <button class="icon-btn menu-toggle" aria-label="Menu" aria-expanded="false" aria-controls="header-menu">${ICON.menu}</button>
  </div>`;

// ---------- Live stage ----------
const Ball = (b) => `<span class="ball ball-${b.toLowerCase()}">${b === "0" ? "•" : esc(b)}</span>`;

const ScoreRow = (m, t) => {
  const [team, score, overs] = m[t];
  const size = !score ? "" : !/\d/.test(score) ? " none" : score.length > 7 ? " long" : "";
  return `<div class="score-row${m.batting === t ? " batting" : ""}" data-team="${t}">
    <span class="team">${esc(team)}</span><span class="runs${size}">${scoreHtml(score)}</span>
    <span class="overs-cell"><span class="overs">${esc(overs)}</span>${m.batting === t ? '<span class="bat-flag">Batting</span>' : ""}</span>
  </div>`;
};

const WormPanel = (m) => {
  const teams = ["t1", "t2"].filter((t) => m.worm[t]);
  const legend = teams.length > 1 ? `<span class="legend">${teams.map((t) => `<span><i style="background:${WORM_COLORS[t]}"></i>${esc(m[t][0])}</span>`).join("")}</span>` : "";
  return `<figure class="worm">
    <figcaption class="worm-head"><span>Runs by over</span>${legend}</figcaption>
    <div class="worm-plot" tabindex="0" role="img" aria-label="Runs by over chart. Use the left and right arrow keys to read each point."></div>
    ${WormTable(m, teams)}
  </figure>`;
};

const WormTable = (m, teams) => `<table class="sr-only"><caption>Runs by over</caption>
  <thead><tr><th>Over</th>${teams.map((t) => `<th>${esc(m[t][0])}</th>`).join("")}</tr></thead>
  <tbody>${wormOvers(m).map((o) => `<tr><td>${o}</td>${teams.map((t) => `<td>${wormRuns(m, t, o) ?? "–"}</td>`).join("")}</tr>`).join("")}</tbody></table>`;

const BoardActions = (s) => (s === "soon" ? ["Preview", "Squads"] : ["Scorecard", "Commentary"])
  .map((label, i) => `<button class="btn${i ? "" : " btn-primary"}">${label}</button>`).join("");

const Board = (m, i) => `
  <div class="board${m.worm ? " has-worm" : ""}" role="tabpanel" id="board-${i}" aria-labelledby="chip-${i}" data-index="${i}"${i ? " inert" : ""}>
    <div class="board-head">
      <div class="board-meta">${StatusBadge(m.status)}<span class="board-series">${esc(m.series)}</span><span class="board-venue">${esc(m.venue)}</span></div>
      <div class="board-actions">${BoardActions(m.status)}</div>
    </div>
    <div class="scoreboard">${ScoreRow(m, "t1")}${ScoreRow(m, "t2")}</div>
    <p class="board-note note"${m.status === "live" ? ' aria-live="polite"' : ""}>${esc(m.note)}</p>
    ${m.worm ? `<div class="board-live">
      <div class="over"><span class="label">This over</span><div class="balls">${m.over.map(Ball).join("")}</div></div>
      <dl class="stats">${m.stats.map(([k, v]) => `<div><dt class="label">${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join("")}</dl>
    </div>${WormPanel(m)}` : ""}
  </div>`;

const TeamRow = ([n, score, overs], t) =>
  `<span class="row" data-team="${t}"><span>${esc(n)}</span><span><b class="runs">${esc(score)}</b> <small class="overs">${esc(overs)}</small></span></span>`;

const ScoreChip = (m, i) => `
  <button class="score-chip" role="tab" id="chip-${i}" aria-controls="board-${i}" aria-selected="${i === 0}" tabindex="${i ? -1 : 0}" data-index="${i}">
    <span class="chip-meta"><span class="chip-series">${esc(m.short)}</span>${StatusBadge(m.status)}</span>
    ${TeamRow(m.t1, "t1")}${TeamRow(m.t2, "t2")}
    <span class="chip-status note">${esc(m.note)}</span>
  </button>`;

const Pylon = (side) => `<svg class="pylon pylon-${side}" viewBox="0 0 126 48">${times(21, (i) => `<circle cx="${9 + (i % 7) * 18}" cy="${8 + Math.floor(i / 7) * 16}" r="4"/>`)}</svg>`;

const StageHead = (label) =>
  `<div class="stage-head"><span class="label">${esc(label)}</span><a class="more" href="#">View all ${ICON.chevron}</a></div>`;

// The switcher comes first in the DOM, as tabs precede their panels; wide screens show it below the board with CSS order
const Stage = (matches, stories) => `
  <div class="stage-sky" aria-hidden="true">
    ${Pylon("l")}${Pylon("r")}
    <div class="outfield"></div>
  </div>
  <div class="stage-inner">
    <div class="stage-main">
      ${StageHead("Matches")}
      <div class="rail" role="tablist" aria-label="Choose a match"><span class="rail-pill" aria-hidden="true"></span>${matches.map(ScoreChip).join("")}</div>
      <div class="pager"><div class="track">${matches.map(Board).join("")}</div></div>
    </div>
    <aside class="stage-news" aria-label="Top stories">
      ${StageHead("Top stories")}
      <div class="hero-side">${stories.map(HeroItem).join("")}</div>
    </aside>
  </div>`;

// ---------- Editorial ----------
const SectionHead = (title, link = "View all") =>
  `<div class="block-head"><h2>${esc(title)}</h2><a class="more" href="#">${esc(link)} ${ICON.chevron}</a></div>`;

const Cover = (item, seed, inner = "") => `
  <div class="cover" style="${style(item.c)}">${item.img ? `<img src="${esc(item.img)}" alt="" loading="lazy">` : Art(item.art, seed)}${inner}</div>`;

const Kicker = (tag, time) => `<span class="kicker"><span class="tag">${esc(tag)}</span><span class="meta">${esc(time)}</span></span>`;

const HeroLead = (h) => `
  <a class="hero-lead" href="#">${Cover(h, h.title)}
    <div class="hero-lead-body">${Kicker(h.tag, h.time)}<h1>${esc(h.title)}</h1><p>${esc(h.desc)}</p></div>
  </a>`;

const HeroItem = (i) => `
  <a class="hero-item" href="#">
    <div>${Kicker(i.tag, i.time)}<h3>${esc(i.title)}</h3></div>${Cover(i, i.title)}
  </a>`;

const NewsCard = (n, i) => `
  <a class="news-card rise" href="#" style="--i:${i}">
    <div>${Kicker(n.tag, n.time)}<h3>${esc(n.title)}</h3><p>${esc(n.desc)}</p></div>${Cover(n, n.title)}
  </a>`;

const Tabs = (tabs, active, group) =>
  `<div class="tabs" role="tablist" data-group="${group}"><span class="tab-pill" aria-hidden="true"></span>${tabs.map((t) =>
    `<button class="tab" role="tab" data-tab="${esc(t)}" aria-selected="${t === active}" tabindex="${t === active ? 0 : -1}">${esc(t)}</button>`).join("")}</div>`;

const RankingList = (rows) => `<ul class="rank-list">${rows.map(([n, sub, pts], i) => `
  <li class="rise" style="--i:${i}"><span class="rank-pos">${i + 1}</span><span class="rank-name">${esc(n)}<small>${esc(sub)}</small></span><span class="rank-pts">${pts}</span></li>`).join("")}</ul>`;

const PointsTable = (p) => `
  <div class="card widget"><h3>${esc(p.title)}</h3>
  <table class="table"><thead><tr><th>Team</th><th class="num">P</th><th class="num">W</th><th class="num">L</th><th class="num">Pts</th></tr></thead>
  <tbody>${p.rows.map((r, i) => `<tr class="${i < 2 ? "q" : ""}"><td><b>${esc(r[0])}</b></td>${r.slice(1).map((v) => `<td class="num">${v}</td>`).join("")}</tr>`).join("")}</tbody></table>
  <p class="table-note"><i></i>${esc(p.note)}</p></div>`;

const VideoCard = (v) => `
  <a class="video-card" href="#">
    ${Cover(v, v.title, `<span class="play">${ICON.play}</span><span class="dur">${esc(v.dur)}</span>`)}
    <h3>${esc(v.title)}</h3><div class="meta">${esc(v.views)}</div>
  </a>`;

const SeriesCard = (s) => `
  <a class="series-card" href="#"><span class="series-dates">${esc(s.dates)}</span><h3>${esc(s.name)}</h3><span class="meta">${esc(s.meta)}</span></a>`;

const Photo = (p) => `<a class="photo" href="#">${Cover(p, p.cap)}<span>${esc(p.cap)}</span></a>`;

const Footer = (cols) => `
  <div class="footer-crest" aria-hidden="true">${Crest()}</div>
  <div class="footer-grid">
    <div class="footer-brand"><a class="logo" href="#">${Logo()}</a>
      <p>Live scores, sharp analysis and the stories behind every over.</p></div>
    ${cols.map(([h, l]) => `<div><h4>${esc(h)}</h4><ul>${l.map((x) => `<li><a href="#">${esc(x)}</a></li>`).join("")}</ul></div>`).join("")}
  </div>
  <div class="footer-bottom">© ${new Date().getFullYear()} Cricket Army. All rights reserved.</div>`;
