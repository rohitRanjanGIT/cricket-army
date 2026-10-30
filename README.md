# Cricket Army

Web design for Cricket Army (CrickBuster). White and purple: a white page with the score numerals and headings in brand purple, solid purple blocks for Top stories, Videos and the footer, and the live scoreboard as the first thing you see.

Static site, no build step: open `index.html`.

- `css/styles.css`: design tokens at the top. `--brand` is the logo colour from cricketarmy.com; every surface and tint derives from it. Colours use `light-dark()`, so `color-scheme` on any element re-themes that whole subtree. The site is white by default; dark is opt-in through the header toggle.
- `js/data.js`: sample content (swap for API/CMS data)
- `js/logo.js`: the logo as inline SVG, traced from the PNG on cricketarmy.com. Replace with the official vector if you have one.
- `js/art.js`: cover art drawn from cricket's own graphics (wagon wheels, pitch maps, field settings). Set `img` on a data item and its real photo is used instead.
- `js/components.js`: reusable components (Header, Stage, Board, ScoreChip, HeroLead, NewsCard, RankingList, PointsTable, VideoCard, SeriesCard, Photo, Footer)
- `js/motion.js`: spring physics, momentum projection, rubber-banding, digit rolls
- `js/stage.js`: the match pager (tap, drag, flick), the runs-by-over chart and the sample feed
- `js/app.js`: page assembly, tabs, menu and theme

**Going live:** remove `startSampleFeed` from `js/app.js`. It plays scripted balls into the first match so the live state can be seen. For a real stream, update the match object and call `stage.render(index)`; scores, rates and the chart animate from there.

**Accessibility:** follows `prefers-reduced-motion`, `prefers-reduced-transparency`, `prefers-contrast` and `forced-colors`. Layout scales with the browser's text size. Chart colours are validated against the stage surface.
