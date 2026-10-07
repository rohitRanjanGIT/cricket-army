// Sample content. Replace with API/CMS responses.
const G = (a, b) => ({ "--c1": a, "--c2": b });
const DATA = {
  nav: ["Home", "Live Scores", "Schedule", "Series", "News", "Videos", "Photos", "Rankings", "Teams", "IPL", "Fantasy"],
  matches: [
    { id: 1, series: "India vs Australia, 2nd ODI", status: "live", venue: "Wankhede Stadium, Mumbai",
      t1: ["IND", "287/6", "(48.2)"], t2: ["AUS", "241/8", "(45.0)"], note: "Australia need 47 runs in 30 balls" },
    { id: 2, series: "England vs South Africa, 3rd T20I", status: "live", venue: "Lord's, London",
      t1: ["ENG", "168/4", "(17.3)"], t2: ["SA", "Yet to bat", ""], note: "England lead by 0 runs" },
    { id: 3, series: "Ranji Trophy, Group A", status: "done", venue: "Eden Gardens, Kolkata",
      t1: ["BEN", "412 & 188", ""], t2: ["MUM", "356 & 190/4", ""], note: "Mumbai won by 6 wickets" },
    { id: 4, series: "Pakistan vs New Zealand, 1st Test", status: "soon", venue: "National Stadium, Karachi",
      t1: ["PAK", "", ""], t2: ["NZ", "", ""], note: "Starts today, 10:00 AM IST" },
  ],
  hero: {
    lead: { tag: "Match Report", title: "Kohli's 96 not out drives India to the brink of series win",
      desc: "A masterclass in chasing under lights as India took a 2-0 lead in Mumbai.", c: G("#0b3d2e", "#1d8f5a") },
    side: [
      { tag: "Analysis", title: "Why the middle-overs spin squeeze decided the game", time: "2h ago", c: G("#1f2a44", "#4c6fbf") },
      { tag: "Injury", title: "Bumrah ruled out of next Test with back stiffness", time: "3h ago", c: G("#4a1f1f", "#c25555") },
      { tag: "Auction", title: "Franchises finalise retention lists ahead of mega auction", time: "5h ago", c: G("#3b2a0b", "#d89a1d") },
    ],
  },
  news: {
    tabs: ["All", "India", "IPL", "Test", "ODI", "T20", "Women's"],
    items: [
      { cat: "India", tag: "India", title: "Rohit Sharma backs young top order after Mumbai collapse scare", desc: "The captain praised the fearless approach despite losing three early wickets.", time: "1h ago", c: G("#0d3b66", "#3e8ed0") },
      { cat: "IPL", tag: "IPL", title: "Mumbai Indians eye marquee overseas pacer in 2027 auction", desc: "Sources say the franchise has shortlisted four fast bowlers.", time: "2h ago", c: G("#12355b", "#2a9d8f") },
      { cat: "Test", tag: "Test", title: "Karachi pitch report: expect early seam, then turn from day three", desc: "Curators leave a generous grass covering on the surface.", time: "4h ago", c: G("#5a3e1b", "#c9954a") },
      { cat: "Women's", tag: "Women's", title: "Harmanpreet's side announce squad for Australia tour", desc: "Three uncapped players earn call-ups in the 16-member group.", time: "6h ago", c: G("#5b1a4a", "#d0549c") },
      { cat: "T20", tag: "T20", title: "Buttler smashes fastest T20I fifty at Lord's in 17 balls", desc: "England post their highest powerplay score against South Africa.", time: "7h ago", c: G("#1b4332", "#52b788") },
      { cat: "ODI", tag: "ODI", title: "Records tumble as India and Australia combine for 528 runs", desc: "Highest aggregate in a Mumbai ODI and a new venue record.", time: "9h ago", c: G("#2b2d42", "#8d99ae") },
    ],
  },
  rankings: {
    tabs: ["Teams", "Batters", "Bowlers"],
    Teams: [["India", "Test · 124 pts", 124], ["Australia", "Test · 120 pts", 120], ["England", "Test · 108 pts", 108], ["South Africa", "Test · 99 pts", 99], ["New Zealand", "Test · 93 pts", 93]],
    Batters: [["Joe Root", "England", 887], ["Kane Williamson", "New Zealand", 859], ["Yashasvi Jaiswal", "India", 842], ["Steve Smith", "Australia", 821], ["Babar Azam", "Pakistan", 805]],
    Bowlers: [["Jasprit Bumrah", "India", 901], ["Pat Cummins", "Australia", 862], ["Kagiso Rabada", "South Africa", 840], ["R Ashwin", "India", 818], ["Shaheen Afridi", "Pakistan", 797]],
  },
  points: { title: "Points Table · Group A", rows: [["IND", 5, 4, 1, 8], ["AUS", 5, 3, 2, 6], ["ENG", 5, 3, 2, 6], ["SA", 5, 2, 3, 4], ["NZ", 5, 1, 4, 2]] },
  videos: [
    { title: "Highlights: India vs Australia 2nd ODI", dur: "8:42", views: "1.2M views", c: G("#0b3d2e", "#1d8f5a") },
    { title: "Kohli on his 96*: 'I enjoyed every ball'", dur: "4:15", views: "640K views", c: G("#1f2a44", "#4c6fbf") },
    { title: "Top 10 catches of the season", dur: "6:03", views: "910K views", c: G("#4a1f1f", "#c25555") },
    { title: "Pitch vs Pitch: Mumbai or Karachi?", dur: "11:20", views: "210K views", c: G("#3b2a0b", "#d89a1d") },
  ],
  series: [
    { name: "India vs Australia ODIs", dates: "Oct 4 – Oct 10", meta: "3 ODIs · India lead 2–0" },
    { name: "England vs South Africa T20Is", dates: "Oct 5 – Oct 12", meta: "3 T20Is · Level 1–1" },
    { name: "Pakistan vs New Zealand Tests", dates: "Oct 7 – Oct 25", meta: "2 Tests · Starts today" },
    { name: "Ranji Trophy 2026-27", dates: "Oct 1 – Dec 20", meta: "38 teams · Round 3" },
  ],
  photos: [
    { cap: "India celebrate series-clinching partnership at the Wankhede", c: G("#0b3d2e", "#1d8f5a") },
    { cap: "Buttler's blitz at Lord's", c: G("#1f2a44", "#4c6fbf") },
    { cap: "Karachi practice sessions", c: G("#5a3e1b", "#c9954a") },
    { cap: "Fans light up Mumbai", c: G("#5b1a4a", "#d0549c") },
    { cap: "Bumrah in the nets", c: G("#4a1f1f", "#c25555") },
  ],
  footer: [
    ["Cricket", ["Live Scores", "Schedule", "Series", "Rankings", "Teams"]],
    ["Media", ["News", "Videos", "Photos", "Opinion", "Fantasy"]],
    ["Company", ["About Us", "Contact", "Careers", "Privacy Policy", "Terms of Use"]],
  ],
};
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
const $ = (id) => document.getElementById(id);

$("site-header").innerHTML = Header(DATA.nav);
$("ticker").innerHTML = `<div class="ticker-track">${DATA.matches.map(ScoreChip).join("")}</div>`;

$("hero").innerHTML = `${HeroLead(DATA.hero.lead)}<div class="hero-side">${DATA.hero.side.map(HeroItem).join("")}</div>`;

$("live-matches").innerHTML = SectionHead("Matches") + `<div class="match-grid">${DATA.matches.map(MatchCard).join("")}</div>`;

// News with category tabs
function renderNews(cat) {
  const items = cat === "All" ? DATA.news.items : DATA.news.items.filter((n) => n.cat === cat);
  $("latest-news").innerHTML = SectionHead("Latest News") + Tabs(DATA.news.tabs, cat, "news") +
    `<div class="news-list">${items.length ? items.map(NewsCard).join("") : '<p class="meta">No stories in this category yet.</p>'}</div>`;
}
renderNews("All");

// Rankings with tabs
function renderRankings(tab) {
  $("rankings").innerHTML = `<div class="card widget"><h3>ICC Rankings</h3>${Tabs(DATA.rankings.tabs, tab, "rank")}${RankingList(DATA.rankings[tab])}</div>`;
}
renderRankings("Teams");

$("points-table").innerHTML = PointsTable(DATA.points);
$("videos").innerHTML = SectionHead("Videos") + `<div class="video-grid">${DATA.videos.map(VideoCard).join("")}</div>`;
$("series").innerHTML = SectionHead("Series & Tournaments") + `<div class="series-row">${DATA.series.map(SeriesCard).join("")}</div>`;
$("photos").innerHTML = SectionHead("Photos") + `<div class="photo-grid">${DATA.photos.map(Photo).join("")}</div>`;
$("site-footer").innerHTML = Footer(DATA.footer);

// Interactions (event delegation, so re-rendered tabs keep working)
document.addEventListener("click", (e) => {
  const tab = e.target.closest(".tab");
  if (tab) {
    const group = tab.parentElement.dataset.group;
    (group === "news" ? renderNews : renderRankings)(tab.dataset.tab);
    return;
  }
  const toggle = e.target.closest(".menu-toggle");
  if (toggle) {
    const open = document.querySelector(".nav").classList.toggle("open");
    toggle.setAttribute("aria-expanded", open);
  }
  if (e.target.closest('a[href="#"]')) e.preventDefault();
});
