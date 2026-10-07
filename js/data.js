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
