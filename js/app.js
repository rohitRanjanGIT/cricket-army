const $ = (id) => document.getElementById(id);

$("site-header").innerHTML = Header(DATA.nav);
$("stage").innerHTML = Stage(DATA.matches, DATA.hero.side);
$("hero").innerHTML = HeroLead(DATA.hero.lead);

// News with category tabs
$("latest-news").innerHTML = SectionHead("Latest News") + Tabs(DATA.news.tabs, "All", "news") + '<div class="news-list" id="news-list"></div>';
function renderNews(cat) {
  const items = cat === "All" ? DATA.news.items : DATA.news.items.filter((n) => n.cat === cat);
  $("news-list").innerHTML = items.length ? items.map(NewsCard).join("") : '<p class="meta">No stories in this category yet.</p>';
}
renderNews("All");

// Rankings with tabs
$("rankings").innerHTML = `<div class="card widget"><h3>ICC Rankings</h3>${Tabs(DATA.rankings.tabs, "Teams", "rank")}<div id="rank-list"></div></div>`;
function renderRankings(tab) {
  $("rank-list").innerHTML = RankingList(DATA.rankings[tab]);
}
renderRankings("Teams");

$("points-table").innerHTML = PointsTable(DATA.points);
$("videos").innerHTML = SectionHead("Videos") + `<div class="video-grid">${DATA.videos.map(VideoCard).join("")}</div>`;
$("series").innerHTML = SectionHead("Series & Tournaments") + `<div class="series-row">${DATA.series.map(SeriesCard).join("")}</div>`;
$("photos").innerHTML = SectionHead("Photos") + `<div class="photo-grid">${DATA.photos.map(Photo).join("")}</div>`;
$("site-footer").innerHTML = Footer(DATA.footer);

const stage = initStage(DATA.matches);
startSampleFeed(stage, DATA.matches[0], DATA.feed);

// Sliding pill behind the selected tab
function syncPill(list) {
  const pill = list.querySelector(".tab-pill"), tab = list.querySelector('[aria-selected="true"]');
  pill.style.width = `${tab.offsetWidth}px`;
  pill.style.transform = `translateX(${tab.offsetLeft}px)`;
}
const tabLists = [...document.querySelectorAll(".tabs")];
const syncPills = () => tabLists.forEach(syncPill);
new ResizeObserver(syncPills).observe(document.body);
document.fonts?.ready.then(syncPills);
syncPills();

function selectTab(tab) {
  const list = tab.parentElement;
  list.querySelectorAll(".tab").forEach((t) => { t.setAttribute("aria-selected", t === tab); t.tabIndex = t === tab ? 0 : -1; });
  syncPill(list);
  (list.dataset.group === "news" ? renderNews : renderRankings)(tab.dataset.tab);
}

// Header turns dark while the stage is under it, and follows the page theme after that
const header = $("site-header");
new IntersectionObserver(([entry]) => header.classList.toggle("over-stage", entry.isIntersecting), {
  rootMargin: `-${header.offsetHeight}px 0px 0px 0px`,
}).observe($("stage"));

function toggleTheme() {
  const root = document.documentElement;
  const dark = root.dataset.theme ? root.dataset.theme === "dark" : matchMedia("(prefers-color-scheme: dark)").matches;
  const next = dark ? "light" : "dark";
  root.classList.add("theming");
  root.dataset.theme = next;
  setTimeout(() => root.classList.remove("theming"), 350);
  try { localStorage.setItem("ca-theme", next); } catch {}
}

function setMenu(open) {
  $("header-menu").classList.toggle("open", open);
  document.querySelector(".menu-toggle").setAttribute("aria-expanded", open);
}

// Interactions (event delegation, so re-rendered lists keep working)
document.addEventListener("click", (e) => {
  const chip = e.target.closest(".score-chip");
  if (chip) { stage.goTo(+chip.dataset.index); return; }
  const tab = e.target.closest(".tab");
  if (tab) { selectTab(tab); return; }
  if (e.target.closest(".theme-toggle")) { toggleTheme(); return; }
  const toggle = e.target.closest(".menu-toggle");
  if (toggle) { setMenu(toggle.getAttribute("aria-expanded") !== "true"); return; }
  if (!e.target.closest("#header-menu")) setMenu(false);
  if (e.target.closest('a[href="#"]')) e.preventDefault();
});

// Arrow keys move between tabs, as the tab role promises
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") setMenu(false);
  const tab = e.target.closest?.('[role="tab"]');
  if (!tab || (e.key !== "ArrowLeft" && e.key !== "ArrowRight")) return;
  const all = [...tab.parentElement.querySelectorAll('[role="tab"]')];
  const next = all[(all.indexOf(tab) + (e.key === "ArrowRight" ? 1 : -1) + all.length) % all.length];
  e.preventDefault();
  next.focus();
  next.click();
});

// Lets :active fire on touch-down in iOS Safari, so presses respond instantly
document.addEventListener("touchstart", () => {}, { passive: true });
