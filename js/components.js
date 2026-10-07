// Reusable render functions. Each returns an HTML string.
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const style = (c) => Object.entries(c).map(([k, v]) => `${k}:${v}`).join(";");

const StatusBadge = (s) => ({
  live: '<span class="badge badge-live">Live</span>',
  done: '<span class="badge badge-done">Result</span>',
  soon: '<span class="badge badge-soon">Upcoming</span>',
}[s]);

const TeamRow = ([n, score, overs]) =>
  `<div class="row"><span>${esc(n)}</span><span>${esc(score)} <small class="meta">${esc(overs)}</small></span></div>`;

const Header = (items) => `
  <div class="header-top">
    <a class="logo" href="#"><span class="logo-mark">🏏</span>Cricket <em>Army</em></a>
    <label class="search"><input type="search" placeholder="Search matches, players, news" aria-label="Search"></label>
    <a class="btn-app" href="#">Get the App</a>
    <button class="menu-toggle" aria-label="Menu" aria-expanded="false">☰</button>
  </div>
  <nav class="nav" aria-label="Main"><ul>
    ${items.map((n, i) => `<li><a href="#" class="${i === 0 ? "active" : ""}">${esc(n)}</a></li>`).join("")}
  </ul></nav>`;

const ScoreChip = (m) => `
  <a class="score-chip" href="#">
    <div class="chip-meta"><span>${esc(m.series)}</span>${StatusBadge(m.status)}</div>
    ${TeamRow(m.t1)}${TeamRow(m.t2)}
    <div class="chip-status">${esc(m.note)}</div>
  </a>`;

const SectionHead = (title, link = "View all") =>
  `<div class="block-head"><h2>${esc(title)}</h2><a href="#">${esc(link)} →</a></div>`;

const HeroLead = (h) => `
  <a class="hero-lead" href="#" style="${style(h.c)}"><div class="hero-lead-body">
    <span class="tag">${esc(h.tag)}</span><h1>${esc(h.title)}</h1><p>${esc(h.desc)}</p>
  </div></a>`;

const HeroItem = (i) => `
  <a class="card hero-item" href="#">
    <div class="thumb" style="${style(i.c)}">🏏</div>
    <div><span class="tag">${esc(i.tag)}</span><h3>${esc(i.title)}</h3><span class="meta">${esc(i.time)}</span></div>
  </a>`;

const MatchCard = (m) => `
  <article class="card match-card">
    <div class="chip-meta"><span>${esc(m.series)}</span>${StatusBadge(m.status)}</div>
    <div class="venue">${esc(m.venue)}</div>
    ${TeamRow(m.t1)}${TeamRow(m.t2)}
    <div class="chip-status">${esc(m.note)}</div>
    <div class="match-actions"><button class="btn btn-primary">Scorecard</button><button class="btn">Commentary</button></div>
  </article>`;

const NewsCard = (n) => `
  <a class="card news-card" href="#">
    <div class="thumb" style="${style(n.c)}">🏏</div>
    <div><span class="tag">${esc(n.tag)}</span><h3>${esc(n.title)}</h3><p>${esc(n.desc)}</p><span class="meta">${esc(n.time)}</span></div>
  </a>`;

const Tabs = (tabs, active, group) =>
  `<div class="tabs" role="tablist" data-group="${group}">${tabs.map((t) =>
    `<button class="tab" role="tab" data-tab="${esc(t)}" aria-selected="${t === active}">${esc(t)}</button>`).join("")}</div>`;

const RankingList = (rows) => `<ul class="rank-list">${rows.map(([n, sub, pts], i) => `
  <li><span class="rank-pos">${i + 1}</span><span class="rank-name">${esc(n)}<small>${esc(sub)}</small></span><span class="rank-pts">${pts}</span></li>`).join("")}</ul>`;

const PointsTable = (p) => `
  <div class="card widget"><h3>${esc(p.title)}</h3>
  <table class="table"><thead><tr><th>Team</th><th class="num">P</th><th class="num">W</th><th class="num">L</th><th class="num">Pts</th></tr></thead>
  <tbody>${p.rows.map((r, i) => `<tr class="${i < 2 ? "q" : ""}"><td><b>${r[0]}</b></td>${r.slice(1).map((v) => `<td class="num">${v}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`;

const VideoCard = (v) => `
  <a class="card video-card" href="#">
    <div class="thumb" style="${style(v.c)}"><span class="play">▶</span><span class="dur">${esc(v.dur)}</span></div>
    <h3>${esc(v.title)}</h3><div class="meta">${esc(v.views)}</div>
  </a>`;

const SeriesCard = (s) => `
  <a class="card series-card" href="#"><span class="tag">${esc(s.dates)}</span><h3>${esc(s.name)}</h3><span class="meta">${esc(s.meta)}</span></a>`;

const Photo = (p) => `<a class="photo" href="#" style="${style(p.c)}"><span>${esc(p.cap)}</span></a>`;

const Footer = (cols) => `
  <div class="footer-grid">
    <div class="footer-brand"><a class="logo" href="#"><span class="logo-mark">🏏</span>Cricket <em>Army</em></a>
      <p>Live scores, sharp analysis and the stories behind every over.</p></div>
    ${cols.map(([h, l]) => `<div><h4>${esc(h)}</h4><ul>${l.map((x) => `<li><a href="#">${esc(x)}</a></li>`).join("")}</ul></div>`).join("")}
  </div>
  <div class="footer-bottom">© ${new Date().getFullYear()} Cricket Army. All rights reserved.</div>`;
