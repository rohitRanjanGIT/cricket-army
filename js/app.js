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
