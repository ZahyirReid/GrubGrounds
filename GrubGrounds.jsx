import React, { useState, useEffect, useRef, useMemo } from "react";

/* ============================================================
   GRUBGROUNDS — share and spread your love for food
   Theme: black / royal blue / dark purple / white
   ============================================================ */

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Unbounded:wght@400;600;800&family=Sora:wght@400;500;600;700&display=swap');

:root{
  --ink:#08080D; --panel:#10101A; --panel2:#161624; --line:#23233A;
  --royal:#1FA9F4; --royal-soft:#4FC3FF; --purple:#5E1E96; --purple-soft:#7E22CE;
  --white:#FFFFFF; --muted:#9CA0B8; --dim:#6B6F8A;
  --grad:linear-gradient(120deg,var(--royal) 0%,var(--purple-soft) 100%);
}
*{box-sizing:border-box; margin:0; padding:0;}
.gg{ background:var(--ink); color:var(--white); font-family:'Sora',sans-serif; min-height:100vh; }
.gg h1,.gg h2,.gg h3,.gg .disp{ font-family:'Unbounded',sans-serif; }
.gg ::selection{ background:var(--royal); color:#fff; }
.gg button{ font-family:'Sora',sans-serif; cursor:pointer; border:none; background:none; color:inherit; }
.gg input,.gg textarea,.gg select{ font-family:'Sora',sans-serif; }
.gg img{ display:block; }

/* layout */
.shell{ display:flex; min-height:100vh; }
.rail{ width:224px; flex-shrink:0; border-right:1px solid var(--line); padding:20px 12px; position:sticky; top:0; height:100vh; display:flex; flex-direction:column; gap:4px; }
.logo{ font-family:'Unbounded'; font-weight:800; font-size:19px; letter-spacing:-.5px; padding:6px 10px 18px; }
.logo em{ font-style:normal; background:var(--grad); -webkit-background-clip:text; background-clip:text; color:transparent; }
.navbtn{ display:flex; align-items:center; gap:11px; padding:10px 12px; border-radius:12px; color:var(--muted); font-size:14px; font-weight:500; text-align:left; transition:all .15s; width:100%; }
.navbtn:hover{ background:var(--panel); color:var(--white); }
.navbtn.on{ background:var(--panel2); color:var(--white); box-shadow:inset 3px 0 0 var(--royal); }
.navbtn .ic{ width:20px; text-align:center; font-size:16px; }
.main{ flex:1; min-width:0; padding:26px 30px 110px; max-width:1120px; margin:0 auto; }
.tabbar{ display:none; }

@media(max-width:840px){
  .rail{ display:none; }
  .main{ padding:16px 14px 96px; }
  .tabbar{ display:flex; position:fixed; bottom:0; left:0; right:0; background:rgba(10,10,16,.94); backdrop-filter:blur(14px); border-top:1px solid var(--line); z-index:60; justify-content:space-around; padding:8px 4px calc(8px + env(safe-area-inset-bottom)); }
  .tabbtn{ display:flex; flex-direction:column; align-items:center; gap:3px; font-size:10px; color:var(--dim); padding:4px 8px; border-radius:10px; }
  .tabbtn.on{ color:var(--white); }
  .tabbtn.on .ic{ background:var(--grad); border-radius:10px; }
  .tabbtn .ic{ font-size:18px; padding:3px 10px; }
}

/* shared bits */
.eyebrow{ font-size:11px; letter-spacing:.18em; text-transform:uppercase; color:var(--dim); font-weight:600; margin-bottom:6px; }
.h-page{ font-size:24px; font-weight:800; letter-spacing:-.5px; margin-bottom:4px; }
.sub{ color:var(--muted); font-size:13.5px; line-height:1.55; }
.card{ background:var(--panel); border:1px solid var(--line); border-radius:18px; }
.chip{ padding:7px 14px; border-radius:99px; border:1px solid var(--line); background:var(--panel); color:var(--muted); font-size:12.5px; font-weight:600; transition:all .15s; white-space:nowrap; }
.chip:hover{ color:var(--white); border-color:var(--royal); }
.chip.on{ background:var(--grad); color:#fff; border-color:transparent; }
.btn{ padding:11px 18px; border-radius:12px; font-weight:700; font-size:13.5px; transition:transform .1s, opacity .15s; }
.btn:active{ transform:scale(.97); }
.btn-grad{ background:var(--grad); color:#fff; }
.btn-ghost{ border:1px solid var(--line); color:var(--white); background:var(--panel); }
.btn-ghost:hover{ border-color:var(--royal); }
.pill-sm{ font-size:10.5px; font-weight:700; letter-spacing:.04em; padding:3px 9px; border-radius:99px; }
.grid{ display:grid; gap:16px; grid-template-columns:repeat(auto-fill,minmax(240px,1fr)); }

/* recipe card */
.rcard{ overflow:hidden; cursor:pointer; transition:transform .15s, border-color .15s; }
.rcard:hover{ transform:translateY(-3px); border-color:var(--royal); }
.rhero{ height:132px; display:flex; align-items:center; justify-content:center; font-size:52px; position:relative; }
.rhero .save{ position:absolute; top:10px; right:10px; width:32px; height:32px; border-radius:10px; background:rgba(8,8,13,.55); backdrop-filter:blur(6px); display:flex; align-items:center; justify-content:center; font-size:15px; }
.macrobar{ height:5px; border-radius:99px; background:var(--line); overflow:hidden; }
.macrobar i{ display:block; height:100%; background:var(--grad); border-radius:99px; }

/* feed */
.cutring{ width:66px; height:66px; border-radius:50%; padding:3px; background:var(--grad); flex-shrink:0; }
.cutring .inner{ width:100%; height:100%; border-radius:50%; background:var(--panel2); display:flex; align-items:center; justify-content:center; font-size:26px; border:3px solid var(--ink); }
.post{ margin-bottom:18px; overflow:hidden; }
.post .ph{ height:230px; display:flex; align-items:center; justify-content:center; font-size:72px; }
.act{ display:flex; align-items:center; gap:6px; color:var(--muted); font-size:13px; font-weight:600; padding:7px 10px; border-radius:10px; }
.act:hover{ background:var(--panel2); color:var(--white); }
.act.liked{ color:#FF5C8A; }

/* assistant */
.fab{ position:fixed; bottom:22px; right:22px; z-index:70; width:58px; height:58px; border-radius:18px; background:var(--grad); display:flex; align-items:center; justify-content:center; font-size:24px; box-shadow:0 8px 30px rgba(31,169,244,.45); transition:transform .15s; }
.fab:hover{ transform:scale(1.06); }
@media(max-width:840px){ .fab{ bottom:88px; right:14px; } }
.drawer{ position:fixed; bottom:0; right:0; top:0; width:min(420px,100vw); background:var(--panel); border-left:1px solid var(--line); z-index:80; display:flex; flex-direction:column; animation:slidein .22s ease; }
@keyframes slidein{ from{ transform:translateX(40px); opacity:0; } to{ transform:none; opacity:1; } }
.bubble{ max-width:85%; padding:11px 14px; border-radius:16px; font-size:13.5px; line-height:1.55; white-space:pre-wrap; }
.bubble.ai{ background:var(--panel2); border:1px solid var(--line); border-bottom-left-radius:4px; }
.bubble.me{ background:var(--grad); border-bottom-right-radius:4px; margin-left:auto; }

/* modal */
.ovl{ position:fixed; inset:0; background:rgba(5,5,10,.72); backdrop-filter:blur(4px); z-index:90; display:flex; align-items:center; justify-content:center; padding:18px; }
.modal{ background:var(--panel); border:1px solid var(--line); border-radius:22px; width:min(560px,100%); max-height:88vh; overflow-y:auto; }

.inp{ width:100%; background:var(--panel2); border:1px solid var(--line); border-radius:12px; padding:11px 14px; color:var(--white); font-size:13.5px; outline:none; }
.inp:focus{ border-color:var(--royal); }
.hr{ height:1px; background:var(--line); border:none; margin:16px 0; }
.tag-dark{ background:rgba(31,169,244,.16); color:#7FD4FF; }
.tag-purp{ background:rgba(126,34,206,.22); color:#D5A8FF; }
.scroll-x{ display:flex; gap:10px; overflow-x:auto; padding-bottom:6px; scrollbar-width:none; touch-action:pan-x pan-y; cursor:grab; scroll-behavior:smooth; }
.scroll-x:active{ cursor:grabbing; }
.scroll-x::-webkit-scrollbar{ display:none; }
.swiperow{ position:relative; }
.swiperow .arrow{ position:absolute; top:50%; transform:translateY(-50%); z-index:5; width:34px; height:34px; border-radius:50%; background:rgba(16,16,26,.92); border:1px solid var(--line); color:var(--white); font-size:18px; display:flex; align-items:center; justify-content:center; opacity:0; transition:opacity .15s, border-color .15s; box-shadow:0 4px 14px rgba(0,0,0,.5); }
.swiperow .arrow:hover{ border-color:var(--royal); }
.swiperow:hover .arrow{ opacity:1; }
.swiperow .arrow.left{ left:-8px; }
.swiperow .arrow.right{ right:-8px; }
.swiperow .arrow[disabled]{ opacity:0 !important; pointer-events:none; }
.swiperow .fade{ position:absolute; top:0; bottom:6px; width:34px; z-index:4; pointer-events:none; }
.swiperow .fade.right{ right:0; background:linear-gradient(to left, var(--ink), transparent); }
.swiperow .fade.left{ left:0; background:linear-gradient(to right, var(--ink), transparent); }
@media(max-width:840px){ .swiperow .arrow{ display:none; } }
.stat{ text-align:center; }
.stat b{ font-family:'Unbounded'; font-size:17px; display:block; }
.stat span{ font-size:10.5px; color:var(--dim); text-transform:uppercase; letter-spacing:.1em; }
@keyframes ggpop{ 0%{transform:scale(1);} 40%{transform:scale(1.45);} 100%{transform:scale(1);} }
@keyframes ggfadein{ from{opacity:0; transform:translateY(8px);} to{opacity:1; transform:none;} }
@keyframes ggpulse{ 0%,100%{transform:scale(1);} 50%{transform:scale(1.18);} }
@keyframes ggcheck{ 0%{transform:scale(.6); opacity:0;} 60%{transform:scale(1.15);} 100%{transform:scale(1); opacity:1;} }
.post{ animation:ggfadein .32s ease; }
.card{ transition:border-color .15s; }
.act.liked{ animation:ggpop .32s ease; }
.flame{ display:inline-block; animation:ggpulse 1.6s ease-in-out infinite; }
.checkin{ animation:ggcheck .35s ease; }
.strip{ width:100%; display:flex; align-items:center; gap:10px; padding:11px 14px; text-align:left; font-size:12.5px; color:var(--muted); }
.strip b{ color:var(--white); }
.strip .chev{ margin-left:auto; transition:transform .2s; color:var(--dim); }
.strip.open .chev{ transform:rotate(180deg); }
@media (prefers-reduced-motion:reduce){ .gg *{ animation:none!important; transition:none!important; } }
`;

const APP_ICON = "data:image/png;base64,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";

/* Persistent storage: localStorage on the real website; falls back to in-memory
   where localStorage is unavailable (e.g. sandboxed previews). */
const persist = {
  _m: {},
  get(k) { try { return window.localStorage.getItem(k); } catch (e) { return k in persist._m ? persist._m[k] : null; } },
  set(k, v) { try { window.localStorage.setItem(k, v); } catch (e) { persist._m[k] = v; } },
  del(k) { try { window.localStorage.removeItem(k); } catch (e) { delete persist._m[k]; } },
};

/* ---------------- PERSISTED STATE + GAME SYSTEMS ---------------- */

function usePersistedState(key, init) {
  const [v, setV] = useState(() => {
    try { const s = JSON.parse(persist.get(key)); if (s !== null && s !== undefined) return s; } catch (e) {}
    return init;
  });
  const set = (nv) => setV((old) => {
    const val = typeof nv === "function" ? nv(old) : nv;
    persist.set(key, JSON.stringify(val));
    return val;
  });
  return [v, set];
}

const todayStr = () => new Date().toISOString().slice(0, 10);

function streakFrom(dates) { // consecutive days ending today or yesterday
  if (!dates.length) return 0;
  const set = new Set(dates);
  let d = new Date();
  if (!set.has(d.toISOString().slice(0, 10))) d.setDate(d.getDate() - 1); // allow "yesterday" grace
  let n = 0;
  while (set.has(d.toISOString().slice(0, 10))) { n++; d.setDate(d.getDate() - 1); }
  return n;
}

const CHALLENGES = [
  { id: "c15", name: "$15 Dinner Challenge", emoji: "💸", desc: "Feed your table for under $15 total. Post the receipt flex.", joined: 1284 },
  { id: "crep", name: "Replica Week", emoji: "🍴", desc: "Recreate a restaurant favorite at home. Tag the original.", joined: 942 },
  { id: "cpan", name: "One-Pan Only", emoji: "🍳", desc: "A full meal, one pan, minimal dishes. Your sink thanks you.", joined: 767 },
];

const WEEK_DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const BADGE_DEFS = [
  { id: "first", name: "First Plate", emoji: "🍽️", test: (s) => s.cookedRecipes.length >= 1, hint: "Cook your first recipe" },
  { id: "replica", name: "Replica Rookie", emoji: "🎭", test: (s) => s.cookedRecipes.some((id) => allRecipes().find((r) => r.id === id)?.replica), hint: "Cook a restaurant replica" },
  { id: "fire", name: "On Fire", emoji: "🔥", test: (s) => s.streak >= 3, hint: "3-day cooking streak" },
  { id: "week", name: "Week Warrior", emoji: "🏆", test: (s) => s.streak >= 7, hint: "7-day cooking streak" },
  { id: "planner", name: "Planner Pro", emoji: "🗓️", test: (s) => s.plannedCount >= 5, hint: "Plan 5 meals in a week" },
  { id: "pantry", name: "Pantry Keeper", emoji: "🧺", test: (s) => s.pantryCount >= 5, hint: "Track 5 pantry items" },
  { id: "challenger", name: "Challenger", emoji: "🚩", test: (s) => s.challengeCount >= 1, hint: "Join a community challenge" },
  { id: "critic", name: "Taste Critic", emoji: "⭐", test: (s) => s.ratedCount >= 1, hint: "Rate a recipe" },
  { id: "order", name: "Smart Shopper", emoji: "🛒", test: (s) => s.orderCount >= 1, hint: "Place your first order" },
];

// seeded community ratings so recipes don't start empty
function seedRating(r) {
  const avg = 4.1 + ((r.likes % 8)) / 10; // 4.1–4.8
  const n = 80 + (r.likes % 260);
  const wma = 84 + (r.likes % 14); // % would make again
  return { avg: Math.min(4.9, avg), n, wma };
}

/* ---------------- THEMES ---------------- */

function shade(hex, pct) { // pct > 0 lightens, < 0 darkens
  const n = parseInt(hex.slice(1), 16);
  const f = (v) => Math.max(0, Math.min(255, Math.round(v + (pct > 0 ? (255 - v) * pct : v * pct))));
  const r = f(n >> 16), g = f((n >> 8) & 255), b = f(n & 255);
  return "#" + ((r << 16) | (g << 8) | b).toString(16).padStart(6, "0");
}

const THEMES = [
  { id: "saiyan", name: "Blue", a: "#1FA9F4", b: "#7E22CE" }, // default — the GrubGrounds look
  { id: "sunset", name: "Sunset", a: "#FF7A3D", b: "#D81E5B" },
  { id: "emerald", name: "Emerald", a: "#2DD4A7", b: "#0E9F6E" },
  { id: "gold", name: "Gold Rush", a: "#F5A623", b: "#B45309" },
  { id: "sakura", name: "Sakura", a: "#FB7185", b: "#A21CAF" },
  { id: "ice", name: "Ice", a: "#7DD3FC", b: "#3B82F6" },
  { id: "mono", name: "Midnight Mono", a: "#C7CBD9", b: "#5B6072" },
  { id: "crimson", name: "Crimson", a: "#F43F5E", b: "#9F1239" },
  { id: "volt", name: "Volt", a: "#A3E635", b: "#16A34A" },
  { id: "grape", name: "Grape Soda", a: "#A78BFA", b: "#6D28D9" },
  { id: "ocean", name: "Ocean", a: "#22D3EE", b: "#0E7490" },
  { id: "cocoa", name: "Cocoa", a: "#E0A96D", b: "#8A4B24" },
];

function themeVars(t) {
  return {
    "--royal": t.a,
    "--royal-soft": shade(t.a, 0.3),
    "--purple": shade(t.b, -0.22),
    "--purple-soft": t.b,
  };
}

/* ---------------- DATA ---------------- */

const STORES = [
  { id: "kroger", name: "Kroger", mult: 1.0, eta: "45–60 min", fee: 3.99, rating: 4.6 },
  { id: "publix", name: "Publix", mult: 1.15, eta: "40–55 min", fee: 4.49, rating: 4.8 },
  { id: "aldi", name: "Aldi", mult: 0.85, eta: "50–70 min", fee: 2.99, rating: 4.5 },
  { id: "lidl", name: "Lidl", mult: 0.87, eta: "55–70 min", fee: 2.99, rating: 4.4 },
  { id: "tj", name: "Trader Joe's", mult: 1.05, eta: "50–65 min", fee: 3.49, rating: 4.7 },
  { id: "wf", name: "Whole Foods", mult: 1.3, eta: "35–50 min", fee: 4.99, rating: 4.7 },
  { id: "walmart", name: "Walmart", mult: 0.82, eta: "60–80 min", fee: 1.99, rating: 4.3 },
  { id: "target", name: "Target", mult: 1.02, eta: "45–65 min", fee: 3.99, rating: 4.6 },
  { id: "costco", name: "Costco", mult: 0.78, eta: "70–90 min", fee: 5.99, rating: 4.7 },
  { id: "sprouts", name: "Sprouts", mult: 1.18, eta: "45–60 min", fee: 4.29, rating: 4.6 },
  { id: "winndixie", name: "Winn-Dixie", mult: 0.93, eta: "50–70 min", fee: 3.49, rating: 4.3 },
  { id: "foodlion", name: "Food Lion", mult: 0.9, eta: "55–75 min", fee: 3.29, rating: 4.2 },
];

/* GrubPlus delivery deals — rotate weekly, deterministic per week */
const PLUS_DELIVERY_DEALS = [
  { id: "d1", store: "kroger", type: "free", label: "Free delivery at Kroger" },
  { id: "d2", store: "aldi", type: "amount", value: 2, label: "$2 off delivery at Aldi" },
  { id: "d3", store: "any", type: "percent", value: 50, min: 50, label: "50% off delivery on $50+ carts, any store" },
  { id: "d4", store: "walmart", type: "free", label: "Free delivery at Walmart" },
  { id: "d5", store: "publix", type: "amount", value: 2.5, label: "$2.50 off delivery at Publix" },
  { id: "d6", store: "any", type: "amount", value: 1.5, min: 30, label: "$1.50 off delivery on $30+ carts, any store" },
];
function activePlusDeals() {
  const period = Math.floor(Date.now() / (14 * 24 * 3600 * 1000)); // rotates every 2 weeks
  const a = period % PLUS_DELIVERY_DEALS.length;
  const b = (period + 3) % PLUS_DELIVERY_DEALS.length;
  return a === b ? [PLUS_DELIVERY_DEALS[a]] : [PLUS_DELIVERY_DEALS[a], PLUS_DELIVERY_DEALS[b]];
}
function deliveryFee(st, subtotal, plus) {
  const base = st.fee;
  if (!plus) return { fee: base, base, deal: null };
  for (const d of activePlusDeals()) {
    const applies = (d.store === "any" || d.store === st.id) && (!d.min || subtotal >= d.min);
    if (!applies) continue;
    let fee = base;
    if (d.type === "free") fee = 0;
    else if (d.type === "amount") fee = Math.max(0, base - d.value);
    else if (d.type === "percent") fee = +(base * (1 - d.value / 100)).toFixed(2);
    if (fee < base) return { fee, base, deal: d };
  }
  return { fee: base, base, deal: null };
}

const DIETS = ["Vegan", "Vegetarian", "Gluten-free", "Dairy-free", "High-protein", "Low-carb", "Nut-free"];

// ingredient: { n:name, qty, price (base), allergens:[], alts:[{n, note}] }
const RECIPES = [
  {
    id: "r1", name: "Creamy Cajun Salmon Pasta", emoji: "🍝", grad: ["#1FA9F4", "#7E22CE"],
    cat: "main", replica: null, level: "Intermediate", time: 35, serves: 4, author: "chef.maya", likes: 2841,
    tags: ["High-protein"], desc: "Blackened salmon over a silky cajun cream sauce — restaurant energy, home prices.",
    macros: { cal: 620, protein: 42, carbs: 48, fat: 28, fiber: 4, sodium: 780 },
    ingredients: [
      { n: "Salmon fillets", qty: "4 (6 oz)", price: 14.99, allergens: ["fish"], alts: [{ n: "Chicken breast", note: "Same sear, milder flavor" }, { n: "Extra-firm tofu", note: "Plant-based, press well first" }] },
      { n: "Penne pasta", qty: "12 oz", price: 1.89, allergens: ["gluten"], alts: [{ n: "Chickpea penne", note: "Gluten-free, +protein" }] },
      { n: "Heavy cream", qty: "1 cup", price: 3.49, allergens: ["dairy"], alts: [{ n: "Full-fat coconut milk", note: "Dairy-free, just as silky" }] },
      { n: "Cajun seasoning", qty: "2 tbsp", price: 2.99, allergens: [], alts: [] },
      { n: "Parmesan", qty: "1/2 cup", price: 4.29, allergens: ["dairy"], alts: [{ n: "Nutritional yeast", note: "Dairy-free umami" }] },
      { n: "Garlic", qty: "4 cloves", price: 0.79, allergens: [], alts: [] },
    ],
    steps: [
      "Pat salmon dry and coat generously with cajun seasoning.",
      "Sear salmon 4 min per side in a hot skillet. Set aside.",
      "Boil penne to al dente; reserve 1/2 cup pasta water.",
      "Sauté garlic, pour in cream, simmer 3 min, melt in parmesan.",
      "Toss pasta in sauce, loosen with pasta water, top with salmon.",
    ],
  },
  {
    id: "r2", name: "Chipotle-Style Burrito Bowl", emoji: "🥣", grad: ["#7E22CE", "#1FA9F4"],
    cat: "main", replica: "Chipotle", level: "Beginner", time: 30, serves: 4, author: "grubking_j", likes: 5120,
    tags: ["High-protein", "Gluten-free"], desc: "The famous bowl — but with real ingredients, double the portion, half the price.",
    macros: { cal: 540, protein: 38, carbs: 55, fat: 18, fiber: 11, sodium: 640 },
    ingredients: [
      { n: "Chicken thighs", qty: "1.5 lb", price: 6.49, allergens: [], alts: [{ n: "Sofritas-style tofu", note: "Vegan swap, crumble + simmer in adobo" }] },
      { n: "White rice", qty: "2 cups", price: 1.29, allergens: [], alts: [{ n: "Cauliflower rice", note: "Low-carb" }] },
      { n: "Black beans", qty: "1 can", price: 0.99, allergens: [], alts: [] },
      { n: "Fresh cilantro + lime", qty: "1 bunch / 2", price: 1.79, allergens: [], alts: [] },
      { n: "Avocado", qty: "2", price: 2.98, allergens: [], alts: [] },
      { n: "Chipotle peppers in adobo", qty: "1 can", price: 1.89, allergens: [], alts: [] },
    ],
    steps: [
      "Marinate chicken in blended adobo, garlic, and lime 20 min.",
      "Cook rice; fold in chopped cilantro and lime juice.",
      "Grill chicken over high heat until charred, ~5 min a side; rest and chop.",
      "Warm beans with a pinch of cumin.",
      "Build bowls: rice, beans, chicken, smashed avocado, extra lime.",
    ],
  },
  {
    id: "r3", name: "5-Ingredient Garlic Butter Noodles", emoji: "🍜", grad: ["#0C6FB8", "#5E1E96"],
    cat: "beginner", replica: null, level: "Beginner", time: 15, serves: 2, author: "firstplate", likes: 3390,
    tags: ["Vegetarian"], desc: "The perfect first recipe. One pot, five ingredients, impossible to ruin.",
    macros: { cal: 480, protein: 12, carbs: 62, fat: 20, fiber: 3, sodium: 520 },
    ingredients: [
      { n: "Spaghetti", qty: "8 oz", price: 1.19, allergens: ["gluten"], alts: [{ n: "Rice noodles", note: "Gluten-free" }] },
      { n: "Butter", qty: "4 tbsp", price: 3.99, allergens: ["dairy"], alts: [{ n: "Olive oil + vegan butter", note: "Dairy-free" }] },
      { n: "Garlic", qty: "6 cloves", price: 0.79, allergens: [], alts: [] },
      { n: "Soy sauce", qty: "2 tbsp", price: 2.49, allergens: ["soy", "gluten"], alts: [{ n: "Coconut aminos", note: "Soy & gluten free" }] },
      { n: "Brown sugar", qty: "1 tbsp", price: 1.99, allergens: [], alts: [] },
    ],
    steps: [
      "Boil spaghetti; save a splash of the water.",
      "Melt butter on low, add sliced garlic until golden — don't rush it.",
      "Stir in soy sauce and brown sugar until glossy.",
      "Toss in noodles with pasta water. Done. Seriously.",
    ],
  },
  {
    id: "r4", name: "Molten Chocolate Lava Cakes", emoji: "🍫", grad: ["#4A1878", "#0A4B7D"],
    cat: "dessert", replica: null, level: "Intermediate", time: 25, serves: 4, author: "sweet.tina", likes: 7204,
    tags: ["Vegetarian"], desc: "Ten minutes in the oven, a river of chocolate in the middle. The dessert flex.",
    macros: { cal: 410, protein: 6, carbs: 38, fat: 26, fiber: 2, sodium: 160 },
    ingredients: [
      { n: "Dark chocolate", qty: "6 oz", price: 3.79, allergens: ["dairy"], alts: [{ n: "Dairy-free dark chocolate", note: "Check the label — many 70%+ bars are DF" }] },
      { n: "Butter", qty: "1/2 cup", price: 3.99, allergens: ["dairy"], alts: [{ n: "Vegan butter", note: "1:1 swap" }] },
      { n: "Eggs", qty: "3", price: 2.89, allergens: ["egg"], alts: [{ n: "JUST Egg + 1 tbsp cornstarch", note: "Softer set, still molten" }] },
      { n: "Sugar", qty: "1/2 cup", price: 2.29, allergens: [], alts: [] },
      { n: "Flour", qty: "1/4 cup", price: 1.99, allergens: ["gluten"], alts: [{ n: "GF 1:1 baking flour", note: "Works perfectly here" }] },
    ],
    steps: [
      "Melt chocolate and butter together in 30-second bursts.",
      "Whisk eggs and sugar until pale and fluffy.",
      "Fold chocolate into eggs, then fold in flour.",
      "Fill buttered ramekins; bake 425°F for 10–11 min — edges set, center jiggly.",
      "Rest 1 min, flip onto plates, dust with powdered sugar.",
    ],
  },
  {
    id: "r5", name: "Rainbow Buddha Bowl", emoji: "🥗", grad: ["#1FA9F4", "#9B30E8"],
    cat: "main", replica: null, level: "Beginner", time: 25, serves: 2, author: "plantlife.ari", likes: 1988,
    tags: ["Vegan", "Gluten-free", "Dairy-free"], desc: "Roasted chickpeas, quinoa, and a tahini drizzle that makes vegetables addictive.",
    macros: { cal: 460, protein: 18, carbs: 58, fat: 19, fiber: 14, sodium: 380 },
    ingredients: [
      { n: "Quinoa", qty: "1 cup", price: 4.49, allergens: [], alts: [] },
      { n: "Chickpeas", qty: "1 can", price: 0.99, allergens: [], alts: [] },
      { n: "Sweet potato", qty: "1 large", price: 1.49, allergens: [], alts: [] },
      { n: "Tahini", qty: "3 tbsp", price: 5.99, allergens: ["sesame"], alts: [{ n: "Sunflower seed butter", note: "Sesame-free, same creaminess" }] },
      { n: "Kale", qty: "2 cups", price: 2.29, allergens: [], alts: [] },
      { n: "Lemon", qty: "1", price: 0.69, allergens: [], alts: [] },
    ],
    steps: [
      "Roast cubed sweet potato and chickpeas at 425°F for 22 min.",
      "Cook quinoa; massage kale with a pinch of salt and lemon.",
      "Whisk tahini, lemon juice, and warm water into a drizzle.",
      "Assemble in sections — eat the rainbow, drizzle everything.",
    ],
  },
  {
    id: "r6", name: "Brown Sugar Boba Milk Tea", emoji: "🧋", grad: ["#5E1E96", "#1FA9F4"],
    cat: "drink", replica: "Kung Fu Tea", level: "Intermediate", time: 40, serves: 2, author: "sip.society", likes: 4472,
    tags: ["Vegetarian"], desc: "Tiger-striped brown sugar boba, no $7 price tag attached.",
    macros: { cal: 320, protein: 6, carbs: 58, fat: 8, fiber: 0, sodium: 90 },
    ingredients: [
      { n: "Tapioca pearls", qty: "1 cup", price: 3.99, allergens: [], alts: [] },
      { n: "Brown sugar", qty: "1/2 cup", price: 1.99, allergens: [], alts: [] },
      { n: "Black tea bags", qty: "4", price: 3.29, allergens: [], alts: [{ n: "Decaf black tea", note: "Same flavor, no buzz" }] },
      { n: "Whole milk", qty: "1.5 cups", price: 2.79, allergens: ["dairy"], alts: [{ n: "Oat milk", note: "Creamiest dairy-free option" }] },
    ],
    steps: [
      "Boil pearls 25 min, rest 5, then simmer in brown sugar syrup.",
      "Brew tea strong — 4 bags, 10 minutes — then chill.",
      "Swirl syrup + pearls around the glass walls for tiger stripes.",
      "Add ice, tea, then milk. Wide straw mandatory.",
    ],
  },
  {
    id: "r7", name: "Olive Garden Alfredo (But Better)", emoji: "🧀", grad: ["#0D5C9E", "#6D1FA0"],
    cat: "main", replica: "Olive Garden", level: "Beginner", time: 20, serves: 4, author: "chef.maya", likes: 6045, sponsored: "Barilla",
    tags: ["Vegetarian"], desc: "Real cream, real parmesan, real garlic — richer than the restaurant and no breadstick guilt.",
    macros: { cal: 690, protein: 20, carbs: 52, fat: 44, fiber: 2, sodium: 720 },
    ingredients: [
      { n: "Fettuccine", qty: "1 lb", price: 1.99, allergens: ["gluten"], alts: [{ n: "GF fettuccine", note: "Brown rice versions hold sauce best" }] },
      { n: "Heavy cream", qty: "2 cups", price: 5.49, allergens: ["dairy"], alts: [{ n: "Cashew cream", note: "Blend 1c soaked cashews + 1c water" }] },
      { n: "Parmesan", qty: "1.5 cups", price: 6.99, allergens: ["dairy"], alts: [{ n: "Vegan parm + nutritional yeast", note: "Closest dairy-free match" }] },
      { n: "Butter", qty: "6 tbsp", price: 3.99, allergens: ["dairy"], alts: [{ n: "Vegan butter", note: "1:1" }] },
      { n: "Garlic", qty: "5 cloves", price: 0.79, allergens: [], alts: [] },
    ],
    steps: [
      "Boil fettuccine to just shy of al dente.",
      "Melt butter, bloom minced garlic 1 min.",
      "Add cream, simmer gently 4 min — never boil.",
      "Whisk in parmesan off the heat until velvet.",
      "Toss pasta through; finish with black pepper.",
    ],
  },
  {
    id: "r8", name: "Strawberry Cheesecake Cups", emoji: "🍓", grad: ["#7E22CE", "#0C6FB8"],
    cat: "dessert", replica: null, level: "Beginner", time: 20, serves: 6, author: "sweet.tina", likes: 3811,
    tags: ["Vegetarian"], desc: "No-bake, no stress — layered cheesecake cups that look like you tried way harder.",
    macros: { cal: 380, protein: 5, carbs: 34, fat: 25, fiber: 1, sodium: 220 },
    ingredients: [
      { n: "Cream cheese", qty: "16 oz", price: 4.58, allergens: ["dairy"], alts: [{ n: "Dairy-free cream cheese", note: "Kite Hill or Violife work great" }] },
      { n: "Graham crackers", qty: "1 sleeve", price: 2.99, allergens: ["gluten"], alts: [{ n: "GF graham crackers", note: "Or crushed GF cookies" }] },
      { n: "Fresh strawberries", qty: "1 lb", price: 3.49, allergens: [], alts: [] },
      { n: "Powdered sugar", qty: "3/4 cup", price: 1.89, allergens: [], alts: [] },
      { n: "Vanilla + lemon", qty: "1 tsp / 1", price: 3.49, allergens: [], alts: [] },
    ],
    steps: [
      "Crush grahams with melted butter; press into cup bottoms.",
      "Whip cream cheese, powdered sugar, vanilla, and lemon zest until fluffy.",
      "Macerate sliced strawberries with a spoon of sugar 10 min.",
      "Layer: crust → cheesecake → berries → repeat. Chill 30 min.",
    ],
  },
  {
    id: "r9", name: "Crispy Smashed Potato Tacos", emoji: "🌮", grad: ["#1FA9F4", "#5E1E96"],
    cat: "main", replica: null, level: "Beginner", time: 35, serves: 3, author: "plantlife.ari", likes: 2534,
    tags: ["Vegan", "Dairy-free", "Nut-free"], desc: "Craggy roasted potatoes, charred tortillas, and a smoky salsa you'll put on everything.",
    macros: { cal: 430, protein: 10, carbs: 66, fat: 15, fiber: 9, sodium: 410 },
    ingredients: [
      { n: "Baby potatoes", qty: "1.5 lb", price: 3.29, allergens: [], alts: [] },
      { n: "Corn tortillas", qty: "9", price: 2.19, allergens: [], alts: [] },
      { n: "Chipotle salsa", qty: "1 cup", price: 3.49, allergens: [], alts: [] },
      { n: "Cabbage", qty: "1/4 head", price: 1.29, allergens: [], alts: [] },
      { n: "Lime + cilantro", qty: "2 / 1 bunch", price: 1.79, allergens: [], alts: [] },
    ],
    steps: [
      "Boil potatoes until fork-tender, ~15 min.",
      "Smash flat on a sheet pan, oil generously, roast 425°F until crispy.",
      "Char tortillas over the flame or in a dry pan.",
      "Build: potatoes, quick-pickled cabbage, salsa, cilantro, lime.",
    ],
  },
  {
    id: "r10", name: "Mango Pineapple Agua Fresca", emoji: "🥭", grad: ["#6D1FA0", "#1E96E0"],
    cat: "drink", replica: null, level: "Beginner", time: 10, serves: 4, author: "sip.society", likes: 1620,
    tags: ["Vegan", "Gluten-free", "Dairy-free", "Nut-free"], desc: "Three ingredients, one blender, instant vacation.",
    macros: { cal: 120, protein: 1, carbs: 30, fat: 0, fiber: 2, sodium: 5 },
    ingredients: [
      { n: "Frozen mango", qty: "2 cups", price: 3.99, allergens: [], alts: [] },
      { n: "Fresh pineapple", qty: "2 cups", price: 3.49, allergens: [], alts: [] },
      { n: "Limes", qty: "2", price: 1.38, allergens: [], alts: [] },
    ],
    steps: [
      "Blend fruit with 3 cups cold water and lime juice.",
      "Strain if you like it silky; keep pulp if you don't.",
      "Serve over ice with a lime wheel.",
    ],
  },
];

/* user-created recipes are synced from App state each render so every screen sees them */
let USER_RECIPES = [];
const allRecipes = () => RECIPES.concat(USER_RECIPES);

/* ---------------- DIGITAL COUPONS ---------------- */
/* Some chains accept digital coupons; others (Aldi, Costco, Trader Joe's) have everyday-low-price policies and don't. */
const NO_COUPON_STORES = ["aldi", "costco", "tj"];
const storeAllowsCoupons = (id) => !NO_COUPON_STORES.includes(id);
const STORE_COUPONS = [
  { id: "cp1", store: "kroger", label: "$5 off a $40 cart", code: "KRO5OFF40", type: "amount", value: 5, min: 40 },
  { id: "cp2", store: "kroger", label: "Free delivery, any cart", code: "KROSHIP", type: "ship" },
  { id: "cp3", store: "publix", label: "10% off up to $8", code: "PBX10", type: "percent", value: 10, cap: 8 },
  { id: "cp4", store: "walmart", label: "$3 off a $25 cart", code: "WMT3OFF25", type: "amount", value: 3, min: 25 },
  { id: "cp5", store: "target", label: "5% off your order", code: "TGT5", type: "percent", value: 5 },
  { id: "cp6", store: "wf", label: "$7 off a $60 cart", code: "WF7OFF60", type: "amount", value: 7, min: 60 },
  { id: "cp7", store: "sprouts", label: "$4 off a $30 cart", code: "SPR4OFF30", type: "amount", value: 4, min: 30 },
  { id: "cp8", store: "lidl", label: "Free delivery on $20+", code: "LIDLSHIP", type: "ship", min: 20 },
];
function couponDiscount(c, subtotal, fee) {
  if (!c) return 0;
  if (c.min && subtotal < c.min) return 0;
  if (c.type === "amount") return Math.min(c.value, subtotal);
  if (c.type === "percent") return Math.min(+(subtotal * c.value / 100).toFixed(2), c.cap || 999);
  if (c.type === "ship") return fee;
  return 0;
}
async function readCouponCode(b64, mime) {
  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST", headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ model: "claude-sonnet-4-6", max_tokens: 1000, messages: [{ role: "user", content: [
      { type: "image", source: { type: "base64", media_type: mime, data: b64 } },
      { type: "text", text: "This photo shows a coupon or a code. Extract the alphanumeric coupon code. Reply with ONLY the code, uppercase, no spaces, nothing else. If you can't find a code, reply NONE." },
    ] }] }),
  });
  const data = await response.json();
  return (data.content || []).map((i) => i.text || "").join("").trim().toUpperCase().replace(/[^A-Z0-9]/g, "");
}

const FRIENDS_INIT = [
  { id: "f1", name: "Jamal Ford", handle: "jford.eats", emoji: "🧑🏾‍🍳", status: "Cooking tonight", friend: true },
  { id: "f2", name: "Maya Chen", handle: "chef.maya", emoji: "👩‍🍳", status: "Posted a new recipe", friend: true },
  { id: "f3", name: "Ari Gomez", handle: "plantlife.ari", emoji: "🌱", status: "On a 30-day vegan run", friend: true },
  { id: "f4", name: "Tina Brooks", handle: "sweet.tina", emoji: "🧁", status: "Dessert queen", friend: false },
  { id: "f5", name: "Marcus Lee", handle: "grubking_j", emoji: "🔥", status: "Replica master", friend: false },
  { id: "f6", name: "Sofia Reyes", handle: "sip.society", emoji: "🍹", status: "Drinks only", friend: false },
];

const POSTS_INIT = [
  { id: "p1", user: "chef.maya", emoji: "👩‍🍳", time: "2h", recipeId: "r1", caption: "Cajun salmon pasta night. The sauce is doing ALL the talking 🔥", likes: 482, liked: false, comments: [{ u: "jford.eats", t: "Okay this is dinner tomorrow" }, { u: "plantlife.ari", t: "Making this with tofu — the alt swap works!" }], cut: false },
  { id: "p2", user: "grubking_j", emoji: "🔥", time: "5h", recipeId: "r2", caption: "Chipotle replica bowl: $4.20 a serving vs $13 in store. Do the math with me 🧮", likes: 913, liked: true, comments: [{ u: "chef.maya", t: "The adobo marinade is the cheat code" }], cut: true },
  { id: "p3", user: "sweet.tina", emoji: "🧁", time: "9h", recipeId: "r4", caption: "POV: you cut into the lava cake and it actually flows 🌋🍫", likes: 1204, liked: false, comments: [{ u: "sip.society", t: "SCREAMING at the flow" }, { u: "grubking_j", t: "recipe saved instantly" }], cut: true },
  { id: "p4", user: "plantlife.ari", emoji: "🌱", time: "1d", recipeId: "r9", caption: "Smashed potato tacos — crispy edges are non-negotiable. Vegan and nobody noticed 😌", likes: 640, liked: false, comments: [{ u: "jford.eats", t: "Those edges look ILLEGAL" }], cut: false },
  { id: "p5", user: "sip.society", emoji: "🍹", time: "1d", recipeId: "r6", caption: "Tiger stripe boba tutorial in my cuts. Stop paying $7. Start paying attention 🧋", likes: 856, liked: false, comments: [], cut: true },
];

const PLAN_GOALS = [
  { id: "cut", name: "Lean out", desc: "Lower calories, high protein to keep muscle while cutting.", rule: (r) => r.macros.cal <= 500 && r.macros.protein >= 15, emoji: "⚡" },
  { id: "bulk", name: "Build muscle", desc: "Protein-forward meals with the calories to grow.", rule: (r) => r.macros.protein >= 30, emoji: "💪" },
  { id: "heart", name: "Heart-healthy", desc: "Lower sodium, high fiber, plant-leaning plates.", rule: (r) => r.macros.sodium <= 450 && r.macros.fiber >= 5, emoji: "❤️" },
  { id: "plant", name: "Plant-based", desc: "Fully vegan meals, zero compromises on flavor.", rule: (r) => r.tags.includes("Vegan"), emoji: "🌱" },
];

const TUTORIAL_STEPS = [
  { icon: "logo", title: "Welcome to GrubGrounds", body: "This is your home for sharing and spreading your love for food. The Feed works like Instagram for foodies — posts, comments, and Grub Cuts (our take on reels)." },
  { icon: "🍳", title: "Discover recipes", body: "Browse everything in Discover: beginner recipes, desserts, drinks, and restaurant replicas. Use food filters to only see what fits your diet — vegan, gluten-free, whatever you're about." },
  { icon: "🛒", title: "Shop the recipe", body: "Open any recipe and add all its ingredients to your cart in one tap. Then pick your store — Kroger, Publix, Aldi, Lidl, Trader Joe's, Walmart, Target, Costco, and more — and prices update per store. Set a budget and we'll flag what fits." },
  { icon: "🧪", title: "Allergies & alternatives", body: "Every ingredient shows allergy flags and close-as-possible swaps, so you can make almost anything work for your body. Macros are on every recipe." },
  { icon: "📷", title: "Scan your food", body: "The Scanner reads a photo of your meal for macros, scans your fridge to invent meals from what you have, and checks if a product is real, healthy, and good to eat." },
  { icon: "✨", title: "Your AI assistant", body: "The assistant in the corner helps you navigate, pick recipes, shop, and even talks you through cooking step by step. Don't want it? Turn it off anytime in Settings." },
];

/* ---------------- HELPERS ---------------- */

const priceAt = (item, store) => {
  const dealMult = item.deal && item.deal.store === store.id ? 1 - item.deal.off : 1;
  return +(item.price * store.mult * dealMult).toFixed(2);
};
const bestStore = (item) => STORES.reduce((b, s) => (priceAt(item, s) < priceAt(item, b) ? s : b), STORES[0]);
const cartTotal = (cart, store) => cart.reduce((s, it) => s + priceAt(it, store) * (it.count || 1), 0);

function SwipeRow({ children, style, arrows = true }) {
  const ref = useRef(null);
  const drag = useRef(null);
  const [edge, setEdge] = useState({ l: true, r: false });

  function checkEdges() {
    const el = ref.current;
    if (!el) return;
    setEdge({ l: el.scrollLeft <= 4, r: el.scrollLeft + el.clientWidth >= el.scrollWidth - 4 });
  }
  useEffect(() => { checkEdges(); window.addEventListener("resize", checkEdges); return () => window.removeEventListener("resize", checkEdges); }, [children]);

  const go = (dir) => ref.current?.scrollBy({ left: dir * ref.current.clientWidth * 0.75, behavior: "smooth" });

  return (
    <div className="swiperow" style={style}>
      {arrows && <button className="arrow left" onClick={() => go(-1)} disabled={edge.l} aria-label="Scroll left">‹</button>}
      {!edge.l && <div className="fade left" />}
      <div
        className="scroll-x"
        ref={ref}
        onScroll={checkEdges}
        onPointerDown={(e) => { if (e.pointerType !== "mouse") return; drag.current = { x: e.clientX, sl: ref.current.scrollLeft, moved: false }; }}
        onPointerMove={(e) => {
          if (!drag.current) return;
          const dx = e.clientX - drag.current.x;
          if (Math.abs(dx) > 6) drag.current.moved = true;
          if (drag.current.moved) ref.current.scrollLeft = drag.current.sl - dx;
        }}
        onPointerUp={() => { const moved = drag.current?.moved; drag.current = null; if (moved) { const stop = (e) => { e.stopPropagation(); e.preventDefault(); }; ref.current.addEventListener("click", stop, { capture: true, once: true }); setTimeout(() => ref.current?.removeEventListener("click", stop, { capture: true }), 100); } }}
        onPointerLeave={() => { drag.current = null; }}
      >
        {children}
      </div>
      {!edge.r && <div className="fade right" />}
      {arrows && <button className="arrow right" onClick={() => go(1)} disabled={edge.r} aria-label="Scroll right">›</button>}
    </div>
  );
}

function Macro({ label, val, max, unit }) {
  return (
    <div style={{ flex: 1, minWidth: 74 }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, marginBottom: 4 }}>
        <span style={{ color: "var(--dim)" }}>{label}</span>
        <b>{val}{unit}</b>
      </div>
      <div className="macrobar"><i style={{ width: Math.min(100, (val / max) * 100) + "%" }} /></div>
    </div>
  );
}

function MacroRow({ m, compact }) {
  return (
    <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
      <Macro label="Calories" val={m.cal} max={900} unit="" />
      <Macro label="Protein" val={m.protein} max={60} unit="g" />
      <Macro label="Carbs" val={m.carbs} max={90} unit="g" />
      {!compact && <Macro label="Fat" val={m.fat} max={50} unit="g" />}
      {!compact && <Macro label="Fiber" val={m.fiber} max={15} unit="g" />}
      {!compact && <Macro label="Sodium" val={m.sodium} max={1000} unit="mg" />}
    </div>
  );
}

function RecipeCard({ r, onOpen, saved, onSave }) {
  return (
    <div className="card rcard" onClick={() => onOpen(r)}>
      <div className="rhero" style={r.photo ? { backgroundImage: `url(${r.photo})`, backgroundSize: "cover", backgroundPosition: "center" } : { background: `linear-gradient(135deg, ${r.grad[0]}, ${r.grad[1]})` }}>
        {!r.photo && <span style={{ filter: "drop-shadow(0 6px 16px rgba(0,0,0,.4))" }}>{r.emoji}</span>}
        <button className="save" title={saved ? "Saved to gallery" : "Save to gallery"} onClick={(e) => { e.stopPropagation(); onSave(r.id); }}>{saved ? "🔖" : "📑"}</button>
        {r.replica && <span className="pill-sm tag-purp" style={{ position: "absolute", left: 10, top: 10 }}>REPLICA · {r.replica}</span>}
        {r.sponsored && <span className="pill-sm" style={{ position: "absolute", left: 10, bottom: 10, background: "rgba(255,255,255,.14)", color: "#E8E9F5" }}>Sponsored · {r.sponsored}</span>}
      </div>
      <div style={{ padding: "13px 14px 15px" }}>
        <div style={{ display: "flex", gap: 6, marginBottom: 7, flexWrap: "wrap" }}>
          <span className="pill-sm tag-dark">{r.level}</span>
          <span className="pill-sm" style={{ background: "var(--panel2)", color: "var(--muted)" }}>⏱ {r.time} min</span>
        </div>
        <h3 style={{ fontSize: 14.5, fontWeight: 600, lineHeight: 1.35, marginBottom: 8 }}>{r.name}</h3>
        <MacroRow m={r.macros} compact />
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 10, fontSize: 11.5, color: "var(--dim)" }}>
          <span>@{r.author}</span><span><span style={{ color: "#F5C542" }}>★</span> {seedRating(r).avg.toFixed(1)} · ♥ {r.likes.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}

/* ---------------- VIRAL SHARE CARD ---------------- */

function homeCostPerServing(r) {
  const total = r.ingredients.reduce((s, i) => s + i.price, 0);
  return total / r.serves;
}

function downloadSavingsCard(r) {
  const c = document.createElement("canvas");
  c.width = 1080; c.height = 1080;
  const x = c.getContext("2d");
  const g = x.createLinearGradient(0, 0, 1080, 1080);
  g.addColorStop(0, "#040407"); g.addColorStop(0.4, "#3E0D68"); g.addColorStop(0.7, "#6812B5"); g.addColorStop(1, "#0E7FD0");
  x.fillStyle = g; x.fillRect(0, 0, 1080, 1080);

  x.textAlign = "center";
  x.font = "160px serif";
  x.fillText(r.emoji, 540, 250);

  // wrap the recipe name
  x.fillStyle = "#FFFFFF"; x.font = "bold 58px sans-serif";
  const words = r.name.split(" ");
  let lines = [""], li = 0;
  words.forEach((w) => {
    if (x.measureText(lines[li] + " " + w).width > 880) { li++; lines[li] = w; }
    else lines[li] = (lines[li] + " " + w).trim();
  });
  lines.forEach((ln, i) => x.fillText(ln, 540, 360 + i * 72));
  const nameBottom = 360 + lines.length * 72;

  const home = homeCostPerServing(r);
  const out = r.replica ? home * 2.9 : null;
  x.font = "bold 96px sans-serif"; x.fillStyle = "#7DE3A0";
  x.fillText("$" + home.toFixed(2) + " / serving", 540, nameBottom + 110);
  x.font = "44px sans-serif"; x.fillStyle = "#E8E9F5";
  x.fillText(out ? "made at home  ·  vs ~$" + out.toFixed(0) + " eating out" : r.macros.cal + " cal  ·  " + r.macros.protein + "g protein per serving", 540, nameBottom + 180);

  // footer brand
  x.fillStyle = "#FFFFFF"; x.font = "bold 46px sans-serif";
  x.fillText("GG  GrubGrounds", 540, 960);
  x.font = "30px sans-serif"; x.fillStyle = "#C9CFDD";
  x.fillText("share the love of food", 540, 1010);

  const a = document.createElement("a");
  a.download = r.name.replace(/[^a-z0-9]+/gi, "-").toLowerCase() + "-grubgrounds-card.png";
  a.href = c.toDataURL("image/png");
  a.click();
}

/* ---------------- AI ASSISTANT ---------------- */

async function askClaude(messages, system) {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ model: "claude-sonnet-4-6", max_tokens: 1000, system, messages }),
  });
  const data = await res.json();
  return (data.content || []).map((b) => (b.type === "text" ? b.text : "")).join("\n").trim();
}

function Assistant({ ctx, open, setOpen, seed, clearSeed }) {
  const [msgs, setMsgs] = useState([{ role: "assistant", text: "Hey! I'm your GrubGrounds assistant 👋 I can help you find a recipe, plan your shopping, swap ingredients around allergies, or walk you through cooking step by step. What are we making today?" }]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const endRef = useRef(null);
  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs, open]);
  useEffect(() => { if (seed && open) { send(seed); clearSeed(); } }, [seed, open]);

  const system = `You are the built-in AI assistant for GrubGrounds, a social food app where people share their love for food. Be warm, concise (2-5 sentences usually), and practical. You help users: navigate the app, pick recipes, build shopping lists within budget, swap ingredients for allergies or plant-based diets, understand macros, and cook step-by-step ("cooking mode": give ONE step at a time and ask them to say "next" when ready).
Current app context: ${ctx}
Recipes available in the app: ${RECIPES.map((r) => `${r.name} (${r.cat}${r.replica ? ", replica of " + r.replica : ""}, ${r.level}, ${r.time}min, ${r.macros.cal}cal/${r.macros.protein}g protein, tags: ${r.tags.join("/") || "none"})`).join("; ")}.
App sections: Feed (social posts + Grub Cuts), Discover (recipes, filters, desserts, drinks, beginner, replicas), Shopping (cart, pick store: Kroger/Publix/Aldi/Lidl/Trader Joe's/Whole Foods/Walmart/Target/Costco/Sprouts/Winn-Dixie/Food Lion, budget tool), Scanner (meal macros, fridge scan, product check), Plans (dietary plans + custom), Gallery (saved, public/private), Friends. Refer users to these by name when helpful.`;

  async function send(text) {
    const t = (text || input).trim();
    if (!t || busy) return;
    setInput("");
    const next = [...msgs, { role: "user", text: t }];
    setMsgs(next);
    setBusy(true);
    try {
      const reply = await askClaude(next.map((m) => ({ role: m.role === "assistant" ? "assistant" : "user", content: m.text })), system);
      setMsgs((m) => [...m, { role: "assistant", text: reply || "Hmm, I came back empty — try that again?" }]);
    } catch (e) {
      setMsgs((m) => [...m, { role: "assistant", text: "I hit a connection snag. Give it another try in a second." }]);
    }
    setBusy(false);
  }

  if (!open) return null;
  return (
    <div className="drawer">
      <div style={{ padding: "16px 18px", borderBottom: "1px solid var(--line)", display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ width: 34, height: 34, borderRadius: 11, background: "var(--grad)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>✨</div>
        <div style={{ flex: 1 }}>
          <b style={{ fontSize: 14 }}>Grub Assistant <span className="pill-sm tag-dark" style={{ marginLeft: 4 }}>Plus</span></b>
          <div style={{ fontSize: 11, color: "var(--dim)" }}>Recipes · Shopping · Cooking mode</div>
        </div>
        <button className="btn btn-ghost" style={{ padding: "7px 12px" }} onClick={() => setOpen(false)}>Close</button>
      </div>
      <div style={{ flex: 1, overflowY: "auto", padding: 16, display: "flex", flexDirection: "column", gap: 10 }}>
        {msgs.map((m, i) => <div key={i} className={"bubble " + (m.role === "assistant" ? "ai" : "me")}>{m.text}</div>)}
        {busy && <div className="bubble ai" style={{ color: "var(--dim)" }}>Cooking up a reply…</div>}
        <div ref={endRef} />
      </div>
      <div style={{ padding: 8, display: "flex", gap: 6, overflowX: "auto", borderTop: "1px solid var(--line)" }}>
        {["Pick dinner for me", "Help me shop on a budget", "I'm allergic to dairy", "Walk me through cooking"].map((q) => (
          <button key={q} className="chip" onClick={() => send(q)}>{q}</button>
        ))}
      </div>
      <div style={{ padding: "10px 14px 16px", display: "flex", gap: 8 }}>
        <input className="inp" placeholder="Ask anything about food…" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && send()} />
        <button className="btn btn-grad" onClick={() => send()} disabled={busy}>Send</button>
      </div>
    </div>
  );
}

/* ---------------- FEED ---------------- */

function FeedScreen({ posts, setPosts, openRecipe, friends, streak, joinedChallenges, onJoin, follows, toggleFollow, onReport, lang, planner, savedForAlerts, schedulePost, scheduled, cancelScheduled, openMedia, plusUser, favorites, onShare }) {
  const hour = new Date().getHours();
  const greet = tr(lang, hour < 12 ? "gm" : hour < 18 ? "ga" : "ge");
  const todayName = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][new Date().getDay()];
  const tonightId = (planner[todayName] || [])[0];
  const tonight = tonightId ? allRecipes().find((r) => r.id === tonightId) : null;
  const heroAlert = (() => {
    for (const g of GROCERIES.filter((x) => x.deal)) {
      const hit = savedForAlerts.some((r) => r.ingredients.some((i) => { const a = i.n.toLowerCase(), b = g.n.toLowerCase(); return a.includes(b) || b.includes(a); }));
      if (hit) return `${g.n} is ${Math.round(g.deal.off * 100)}% off at ${STORES.find((s) => s.id === g.deal.store).name} — it's in a saved recipe`;
    }
    return null;
  })();
  const [composer, setComposer] = useState("");
  const [media, setMedia] = useState(null); // {url, type, duration}
  const [mediaErr, setMediaErr] = useState("");
  const [when, setWhen] = useState("");
  const [showWhen, setShowWhen] = useState(false);
  const mediaRef = useRef(null);
  const [editing, setEditing] = useState(null); // post being edited

  function patchPost(id, patch) {
    setPosts((ps) => ps.map((x) => (x.id === id ? { ...x, ...patch } : x)));
  }
  function boostPost(id, budget) {
    const gained = budget * (100 + Math.floor(Math.random() * 40));
    setPosts((ps) => ps.map((x) => (x.id === id ? { ...x, boosted: true, boostBudget: budget, likes: x.likes + Math.floor(budget * 8) } : x)));
  }

  function pickMedia(e) {
    const f = e.target.files && e.target.files[0];
    if (!f) return;
    setMediaErr("");
    loadMediaFile(f, (m) => {
      if (m.type === "video" && m.duration && m.duration > MAX_VIDEO_SECONDS) {
        setMediaErr(`That video is ${fmtDur(m.duration)} — videos can be up to 5:00. Trim it down and try again.`);
        URL.revokeObjectURL(m.url);
      } else {
        setMedia(m);
      }
    });
    e.target.value = "";
  }
  const cuts = posts.filter((p) => p.cut);
  const byId = (id) => allRecipes().find((r) => r.id === id);

  function toggleLike(id) {
    setPosts((ps) => ps.map((p) => (p.id === id ? { ...p, liked: !p.liked, likes: p.likes + (p.liked ? -1 : 1) } : p)));
  }
  function addComment(id, text, parentIdx = null) {
    if (!text.trim()) return;
    setPosts((ps) => ps.map((p) => {
      if (p.id !== id) return p;
      if (parentIdx === null) return { ...p, comments: [...p.comments, { u: "you", t: text, replies: [] }] };
      return { ...p, comments: p.comments.map((c, i) => i === parentIdx ? { ...c, replies: [...(c.replies || []), { u: "you", t: text }] } : c) };
    }));
  }
  function post() {
    if (!composer.trim() && !media) return;
    const p = { id: "p" + Date.now(), user: "you", emoji: "😋", time: "now", recipeId: null, caption: composer.trim(), likes: 0, liked: false, comments: [], cut: media && media.type === "video", media };
    const at = when ? new Date(when).getTime() : null;
    if (at && at > Date.now()) {
      schedulePost(p, at);
    } else {
      setPosts((ps) => [p, ...ps]);
    }
    setComposer(""); setMedia(null); setWhen(""); setShowWhen(false); setMediaErr(""); stopMusic();
  }

  return (
    <div style={{ maxWidth: 620, margin: "0 auto" }}>
      <div className="eyebrow">The Feed</div>
      <h1 className="h-page">{T("feedT")}</h1>
      <p className="sub" style={{ marginBottom: 14 }}>{T("feedS")}</p>

      <div className="card" style={{ padding: "12px 16px", marginBottom: 16, display: "flex", alignItems: "center", gap: 12 }}>
        <span className={streak > 0 ? "flame" : ""} style={{ fontSize: 24 }}>🔥</span>
        <div style={{ flex: 1 }}>
          <b style={{ fontSize: 13.5 }}>{streak > 0 ? `${streak}-day cooking streak` : "No streak yet"}</b>
          <div style={{ fontSize: 11.5, color: "var(--dim)" }}>{streak > 0 ? "Cook anything today to keep it alive — tap ✅ I cooked this on a recipe." : "Cook any recipe and tap ✅ I cooked this to start one."}</div>
        </div>
        {streak >= 3 && <span className="pill-sm" style={{ background: "rgba(245,197,66,.15)", color: "#F5C542" }}>{streak >= 7 ? "🏆 Week Warrior" : "🔥 On Fire"}</span>}
      </div>

      <div className="eyebrow" style={{ marginBottom: 8 }}>This week's challenges</div>
      <SwipeRow style={{ marginBottom: 18 }}>
        {CHALLENGES.map((c) => {
          const joined = joinedChallenges.includes(c.id);
          return (
            <div key={c.id} className="card" style={{ padding: 14, minWidth: 218, flexShrink: 0 }}>
              <div style={{ fontSize: 24, marginBottom: 6 }}>{c.emoji}</div>
              <b style={{ fontSize: 13.5, display: "block", marginBottom: 4 }}>{c.name}</b>
              <p className="sub" style={{ fontSize: 11.5, marginBottom: 10, lineHeight: 1.45 }}>{c.desc}</p>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <button className={joined ? "chip on" : "btn btn-grad"} style={joined ? {} : { padding: "7px 14px", fontSize: 12 }} onClick={() => onJoin(c.id)} disabled={joined}>{joined ? "✓ Joined" : "Join"}</button>
                <span style={{ fontSize: 11, color: "var(--dim)" }}>{(c.joined + (joined ? 1 : 0)).toLocaleString()} in</span>
              </div>
            </div>
          );
        })}
      </SwipeRow>

      <div className="eyebrow" style={{ marginBottom: 8 }}>Grub Cuts</div>
      <SwipeRow style={{ marginBottom: 20 }}>
        {cuts.map((p) => (
          <div key={p.id} style={{ textAlign: "center", cursor: "pointer" }} onClick={() => p.recipeId && openRecipe(byId(p.recipeId))}>
            <div className="cutring"><div className="inner">{byId(p.recipeId)?.emoji || p.emoji}</div></div>
            <div style={{ fontSize: 10.5, color: "var(--muted)", marginTop: 5, maxWidth: 70, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>@{p.user}</div>
          </div>
        ))}
        <div style={{ textAlign: "center", cursor: "pointer" }}>
          <div className="cutring" style={{ background: "var(--line)" }}><div className="inner" style={{ fontSize: 22, color: "var(--muted)" }}>＋</div></div>
          <div style={{ fontSize: 10.5, color: "var(--dim)", marginTop: 5 }}>Your cut</div>
        </div>
      </SwipeRow>

      <div className="card" style={{ padding: 14, marginBottom: 20 }}>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          {MY_PHOTO ? <Avatar photo={MY_PHOTO} emoji="😋" size={32} /> : <div style={{ fontSize: 24 }}>😋</div>}
          <input className="inp" placeholder="Share what you're cooking…" value={composer} onChange={(e) => setComposer(e.target.value)} onKeyDown={(e) => e.key === "Enter" && post()} />
        </div>
        <input ref={mediaRef} type="file" accept="image/*,video/*" onChange={pickMedia} style={{ display: "none" }} />
        {media && (
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 10 }}>
            {media.type === "video"
              ? <video src={media.url} muted playsInline style={{ height: 74, borderRadius: 10, background: "#000" }} />
              : <img src={media.url} alt="Attached" style={{ height: 74, borderRadius: 10, objectFit: "cover" }} />}
            <div style={{ fontSize: 12, color: "var(--muted)", flex: 1 }}>{media.type === "video" ? "🎬 Video" + (media.duration ? " · " + fmtDur(media.duration) : "") : "🖼️ Photo"} attached</div>
            <button className="chip" onClick={() => { setMedia(null); stopMusic(); }}>✕ Remove</button>
          </div>
        )}
        {media && media.type === "video" && (
          <input className="inp" style={{ marginTop: 8, padding: "8px 12px", fontSize: 12.5 }} placeholder={"💬 Captions — type what's said in the video so everyone can read along (viewers can translate them)"} value={media.captions || ""} onChange={(e) => setMedia((m) => ({ ...m, captions: e.target.value }))} />
        )}
        {media && media.type === "image" && (
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 8, alignItems: "center" }}>
            <span style={{ fontSize: 11.5, color: "var(--dim)" }}>🎵 Music:</span>
            <button className={"chip" + (!media.music ? " on" : "")} style={{ padding: "5px 10px", fontSize: 11.5 }} onClick={() => { setMedia((m) => ({ ...m, music: undefined })); stopMusic(); }}>None</button>
            {MUSIC_TRACKS.map((t) => (
              <button key={t.id} className={"chip" + (media.music === t.id ? " on" : "")} style={{ padding: "5px 10px", fontSize: 11.5 }} onClick={() => { setMedia((m) => ({ ...m, music: t.id })); playMusic(t.id); }}>{t.emoji} {t.name}</button>
            ))}
          </div>
        )}
        {mediaErr && <p style={{ color: "#FF7A9C", fontSize: 12, marginTop: 8 }}>{mediaErr}</p>}
        {showWhen && (
          <div style={{ display: "flex", gap: 8, alignItems: "center", marginTop: 10, flexWrap: "wrap" }}>
            <span style={{ fontSize: 12, color: "var(--dim)" }}>Go live at:</span>
            <input className="inp" type="datetime-local" style={{ width: "auto", padding: "8px 10px" }} value={when} min={new Date(Date.now() + 60000).toISOString().slice(0, 16)} onChange={(e) => setWhen(e.target.value)} />
            {when && <button className="chip" onClick={() => setWhen("")}>Clear</button>}
          </div>
        )}
        <div style={{ display: "flex", gap: 8, marginTop: 10, alignItems: "center" }}>
          <button className="chip" onClick={() => mediaRef.current.click()}>📎 Photo / video</button>
          <button className={"chip" + (showWhen ? " on" : "")} onClick={() => setShowWhen(!showWhen)}>🕒 Schedule</button>
          <span style={{ flex: 1 }} />
          <button className="btn btn-grad" onClick={post}>{when && new Date(when) > new Date() ? "Schedule post 🕒" : "Post"}</button>
        </div>
        <p className="sub" style={{ fontSize: 10.5, marginTop: 8 }}>Videos up to 5 minutes. Tap any photo or video in the feed to watch it full-screen.</p>
      </div>

      {scheduled.length > 0 && (
        <div className="card" style={{ padding: 14, marginBottom: 20 }}>
          <div className="eyebrow" style={{ marginBottom: 8 }}>🕒 Scheduled · goes live automatically</div>
          {scheduled.map((s, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "6px 0" }}>
              <span style={{ fontSize: 16 }}>{s.post.media ? (s.post.media.type === "video" ? "🎬" : "🖼️") : "📝"}</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 12.5, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{s.post.caption || "(media post)"}</div>
                <div style={{ fontSize: 10.5, color: "var(--dim)" }}>{new Date(s.at).toLocaleString([], { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" })}</div>
              </div>
              <button className="chip" onClick={() => cancelScheduled(i)}>Cancel</button>
            </div>
          ))}
        </div>
      )}

      {editing && <PostEditor p={editing} onClose={() => { setEditing(null); stopMusic(); }} onSave={(patch) => patchPost(editing.id, patch)} onDelete={() => setPosts((ps) => ps.filter((x) => x.id !== editing.id))} onBoost={(b) => boostPost(editing.id, b)} />}
      {[...posts].sort((a, b) => ((b.pinned ? 2 : 0) + (favorites.includes(b.user) ? 1 : 0)) - ((a.pinned ? 2 : 0) + (favorites.includes(a.user) ? 1 : 0))).map((p) => {
        const r = p.recipeId ? byId(p.recipeId) : null;
        return <Post key={p.id} p={p} r={r} onLike={() => toggleLike(p.id)} onComment={(t, parent) => addComment(p.id, t, parent)} onOpen={() => r && openRecipe(r)} onShare={() => onShare(p)} following={follows.includes(p.user)} onFollow={() => toggleFollow(p.user)} onReport={() => onReport(p)} onEdit={() => setEditing(p)} openMedia={openMedia} plusUser={plusUser} />;
      })}
    </div>
  );
}

function Post({ p, r, onLike, onComment, onOpen, onShare, following, onFollow, onReport, onEdit, openMedia, plusUser }) {
  const [c, setC] = useState("");
  const [showC, setShowC] = useState(false);
  const [trans, setTrans] = useState(null); // translated caption
  const [showTrans, setShowTrans] = useState(false);
  const [transBusy, setTransBusy] = useState(false);
  async function doTranslate() {
    if (showTrans) { setShowTrans(false); return; }
    if (trans) { setShowTrans(true); return; }
    setTransBusy(true);
    try { const t = await aiTranslate(p.caption, CURRENT_LANG); if (t) { setTrans(t); setShowTrans(true); } } catch (e) {}
    setTransBusy(false);
  }
  const [replyTo, setReplyTo] = useState(null);
  const [reply, setReply] = useState("");
  return (
    <div className="card post">
      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 14px" }}>
        {p.user === "you" && MY_PHOTO
          ? <Avatar photo={MY_PHOTO} emoji={p.emoji} />
          : <div style={{ width: 36, height: 36, borderRadius: "50%", background: "var(--panel2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 17 }}>{p.emoji}</div>}
        <div style={{ flex: 1 }}>
          <b style={{ fontSize: 13.5 }}>@{p.user}{p.user === "you" && plusUser && <span title="GrubPlus member" style={{ color: "#F5C542", marginLeft: 3 }}>✦</span>}</b>
          <div style={{ fontSize: 11, color: "var(--dim)" }}>{p.time} ago {p.cut && "· 🎬 Grub Cut"}{p.cookedIt && <span style={{ color: "#7DE3A0" }}> · ✅ Cooked it</span>}{p.edited && " · edited"}{p.pinned && " · 📌 Pinned"}{p.boosted && <span style={{ color: "#F5C542" }}> · 🚀 Boosted</span>}{p.media && p.media.music && <span style={{ color: "var(--royal-soft)" }}> · 🎵 {trackName(p.media.music)}</span>}</div>
        </div>
        {p.user !== "you" && <button className={"chip" + (following ? " on" : "")} onClick={onFollow}>{following ? "Following ✓" : "Follow"}</button>}
        {r && <button className="chip" onClick={onOpen}>View recipe</button>}
        {p.user !== "you" && <button className="chip" onClick={onReport} aria-label="Post options" title="Report or block">⋯</button>}
        {p.user === "you" && <button className="chip" onClick={onEdit} aria-label="Edit post" title="Edit, boost, or delete">✏️</button>}
      </div>
      {p.media ? (
        <div style={{ position: "relative", cursor: "zoom-in", background: "#000" }} onClick={() => openMedia(p.media)} title="Tap to view full-screen">
          {p.media.type === "video"
            ? <video src={p.media.url} muted playsInline preload="metadata" style={{ width: "100%", maxHeight: 340, objectFit: "cover", display: "block" }} />
            : <img src={p.media.url} alt="Post" style={{ width: "100%", maxHeight: 340, objectFit: "cover", display: "block" }} />}
          {p.media.type === "video" && (
            <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ width: 58, height: 58, borderRadius: "50%", background: "rgba(8,8,13,.6)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, paddingLeft: 4 }}>▶</div>
            </div>
          )}
          {p.media.type === "video" && p.media.duration && (
            <span className="pill-sm" style={{ position: "absolute", bottom: 10, right: 10, background: "rgba(8,8,13,.7)", color: "#fff" }}>{fmtDur(p.media.duration)}</span>
          )}
        </div>
      ) : r && (
        <div className="ph" style={{ background: `linear-gradient(135deg, ${r.grad[0]}, ${r.grad[1]})`, cursor: "pointer" }} onClick={onOpen}>
          <span style={{ filter: "drop-shadow(0 10px 24px rgba(0,0,0,.45))" }}>{r.emoji}</span>
        </div>
      )}
      <div style={{ padding: "12px 14px 6px", fontSize: 13.5, lineHeight: 1.5 }}>
        {showTrans && trans ? trans : p.caption}
        {CURRENT_LANG !== "en" && p.caption && (
          <button style={{ display: "block", fontSize: 11, color: "var(--royal-soft)", marginTop: 4 }} onClick={doTranslate}>
            {transBusy ? "…" : "🌐 " + (showTrans ? T("original") : T("translate"))}
          </button>
        )}
      </div>
      <div style={{ display: "flex", padding: "4px 8px 8px" }}>
        <button className={"act" + (p.liked ? " liked" : "")} onClick={onLike}>{p.liked ? "♥" : "♡"} {p.hideLikes ? "—" : p.likes.toLocaleString()}</button>
        <button className="act" onClick={() => setShowC(!showC)}>💬 {p.commentsOff ? "off" : p.comments.length}</button>
        <button className="act" onClick={onShare}>↗ Share</button>
      </div>
      {showC && p.commentsOff && (
        <div style={{ borderTop: "1px solid var(--line)", padding: "10px 14px 14px" }}><p className="sub" style={{ fontSize: 12 }}>💬 Comments are turned off for this post.</p></div>
      )}
      {showC && !p.commentsOff && (
        <div style={{ borderTop: "1px solid var(--line)", padding: "10px 14px 14px" }}>
          {p.comments.map((cm, i) => (
            <div key={i} style={{ marginBottom: 8 }}>
              <div style={{ fontSize: 12.5 }}>
                <b style={{ color: "var(--royal-soft)" }}>@{cm.u}{cm.u === "you" && plusUser && <span title="GrubPlus member" style={{ color: "#F5C542", marginLeft: 2 }}>✦</span>}</b> <span style={{ color: "var(--muted)" }}><Mention text={cm.t} /></span>
                <button style={{ fontSize: 10.5, color: "var(--dim)", marginLeft: 8 }} onClick={() => { setReplyTo(replyTo === i ? null : i); setReply("@" + cm.u + " "); }}>Reply</button>
              </div>
              {(cm.replies || []).map((rp, j) => (
                <div key={j} style={{ fontSize: 12, marginLeft: 18, marginTop: 4, paddingLeft: 10, borderLeft: "2px solid var(--line)" }}>
                  <b style={{ color: "var(--royal-soft)" }}>@{rp.u}</b> <span style={{ color: "var(--muted)" }}><Mention text={rp.t} /></span>
                </div>
              ))}
              {replyTo === i && (
                <div style={{ display: "flex", gap: 6, marginLeft: 18, marginTop: 6 }}>
                  <input className="inp" style={{ padding: "7px 10px", fontSize: 12 }} value={reply} onChange={(e) => setReply(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") { onComment(reply, i); setReply(""); setReplyTo(null); } }} autoFocus />
                  <button className="chip" onClick={() => { onComment(reply, i); setReply(""); setReplyTo(null); }}>Send</button>
                </div>
              )}
            </div>
          ))}
          <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
            <input className="inp" style={{ padding: "8px 12px" }} placeholder="Add a comment… (@mention someone)" value={c} onChange={(e) => setC(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") { onComment(c, null); setC(""); } }} />
            <button className="btn btn-ghost" style={{ padding: "8px 14px" }} onClick={() => { onComment(c, null); setC(""); }}>Comment</button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------------- DISCOVER ---------------- */

const CATS = [
  { id: "all", name: "All" },
  { id: "beginner", name: "Beginner recipes" },
  { id: "dessert", name: "Desserts" },
  { id: "drink", name: "Drinks" },
  { id: "replica", name: "Restaurant replicas" },
];

function DiscoverScreen({ openRecipe, saved, onSave, filters, setFilters, viewed, onCreate }) {
  const [cat, setCat] = useState("all");
  const [q, setQ] = useState("");

  const list = allRecipes().filter((r) => {
    if (cat === "replica" && !r.replica) return false;
    if (cat !== "all" && cat !== "replica" && r.cat !== cat && !(cat === "beginner" && r.level === "Beginner")) return false;
    if (filters.length && !filters.every((f) => r.tags.includes(f))) return false;
    if (q && !r.name.toLowerCase().includes(q.toLowerCase())) return false;
    return true;
  });

  // recommendations: based on what you've viewed (tags + categories)
  const recs = useMemo(() => {
    if (!viewed.length) return allRecipes().slice().sort((a, b) => b.likes - a.likes).slice(0, 3);
    const score = (r) => viewed.reduce((s, v) => s + (v.id !== r.id ? (v.cat === r.cat ? 2 : 0) + r.tags.filter((t) => v.tags.includes(t)).length : -99), 0);
    return allRecipes().slice().sort((a, b) => score(b) - score(a)).slice(0, 3);
  }, [viewed]);

  return (
    <div style={{ maxWidth: 960, margin: "0 auto" }}>
      <div style={{ display: "flex", alignItems: "flex-start", gap: 12, flexWrap: "wrap" }}>
        <div style={{ flex: 1, minWidth: 220 }}>
          <div className="eyebrow">Discover</div>
          <h1 className="h-page">{T("discT")}</h1>
          <p className="sub" style={{ marginBottom: 16 }}>Filter by diet, browse by mood, or recreate your favorite restaurant order.</p>
        </div>
        <button className="btn btn-grad" onClick={onCreate}>＋ Create recipe</button>
      </div>

      <input className="inp" style={{ marginBottom: 14, maxWidth: 420 }} placeholder="Search recipes…" value={q} onChange={(e) => setQ(e.target.value)} />

      <SwipeRow arrows={false} style={{ marginBottom: 10 }}>
        {CATS.map((c) => <button key={c.id} className={"chip" + (cat === c.id ? " on" : "")} onClick={() => setCat(c.id)}>{c.name}</button>)}
      </SwipeRow>
      <SwipeRow arrows={false} style={{ marginBottom: 22 }}>
        <span style={{ fontSize: 11, color: "var(--dim)", alignSelf: "center", flexShrink: 0, letterSpacing: ".12em", textTransform: "uppercase", fontWeight: 600 }}>Food filters</span>
        {DIETS.map((d) => (
          <button key={d} className={"chip" + (filters.includes(d) ? " on" : "")} onClick={() => setFilters((f) => (f.includes(d) ? f.filter((x) => x !== d) : [...f, d]))}>{d}</button>
        ))}
      </SwipeRow>

      <div className="eyebrow" style={{ marginBottom: 8 }}>Recommended for you {viewed.length ? "· based on what you've been browsing" : "· trending now"}</div>
      <div className="grid" style={{ marginBottom: 26 }}>
        {recs.map((r) => <RecipeCard key={r.id} r={r} onOpen={openRecipe} saved={saved.some((s) => s.id === r.id)} onSave={onSave} />)}
      </div>

      <div className="eyebrow" style={{ marginBottom: 8 }}>{cat === "all" ? "Everything" : CATS.find((c) => c.id === cat).name} · {list.length}</div>
      {list.length === 0 && <div className="card" style={{ padding: 24, color: "var(--muted)", fontSize: 13.5 }}>No recipes match those filters yet. Loosen a filter to see more.</div>}
      <div className="grid">
        {list.map((r) => <RecipeCard key={r.id} r={r} onOpen={openRecipe} saved={saved.some((s) => s.id === r.id)} onSave={onSave} />)}
      </div>
    </div>
  );
}

/* ---------------- RECIPE DETAIL ---------------- */

function RecipeDetail({ r, back, addAllToCart, pantry, follows, toggleFollow, startCooking, onCooked, myRating, rate, saved, onSave, aiEnabled, startCookMode, allergies, setAllergies, onShareRecipe, onTip }) {
  const [swaps, setSwaps] = useState({}); // idx -> alt name
  const [servings, setServings] = useState(r.serves);
  const factor = servings / r.serves;
  const seed = seedRating(r);
  const dispAvg = myRating ? ((seed.avg * seed.n + myRating.stars) / (seed.n + 1)) : seed.avg;
  const havePantry = (ing) => pantry.some((p) => {
    const a = ing.n.toLowerCase(), b = p.toLowerCase();
    return a.includes(b) || b.includes(a) || a.split(" ")[0] === b.split(" ")[0];
  });
  const haveCount = r.ingredients.filter(havePantry).length;
  const flagged = (ing) => ing.allergens.some((a) => allergies.includes(a)) || allergies.some((al) => ing.n.toLowerCase().includes(al.toLowerCase()));
  const flaggedTerms = (ing) => [...ing.allergens.filter((a) => allergies.includes(a)), ...allergies.filter((al) => ing.n.toLowerCase().includes(al.toLowerCase()))].filter((v, i, arr) => arr.indexOf(v) === i);
  const ALLERGY_OPTS = ["dairy", "gluten", "egg", "fish", "soy", "sesame", "nuts"];
  const allergyChips = [...ALLERGY_OPTS, ...allergies.filter((a) => !ALLERGY_OPTS.includes(a))];
  const [customAllergy, setCustomAllergy] = useState("");
  function addCustomAllergy() {
    const n = customAllergy.trim().toLowerCase();
    if (n && !allergies.includes(n)) setAllergies((al) => [...al, n]);
    setCustomAllergy("");
  }

  return (
    <div style={{ maxWidth: 760, margin: "0 auto" }}>
      <button className="chip" onClick={back} style={{ marginBottom: 16 }}>← Back</button>
      <div className="card" style={{ overflow: "hidden", marginBottom: 18 }}>
        <div style={{ height: r.photo ? 240 : 180, background: r.photo ? `url(${r.photo}) center/cover` : `linear-gradient(135deg, ${r.grad[0]}, ${r.grad[1]})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 84 }}>
          {!r.photo && <span style={{ filter: "drop-shadow(0 12px 28px rgba(0,0,0,.45))" }}>{r.emoji}</span>}
        </div>
        <div style={{ padding: 20 }}>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 10 }}>
            <span className="pill-sm tag-dark">{r.level}</span>
            <span className="pill-sm" style={{ background: "var(--panel2)", color: "var(--muted)" }}>⏱ {r.time} min · serves {r.serves}</span>
            {r.replica && <span className="pill-sm tag-purp">Replica · {r.replica} (but better)</span>}
            {r.sponsored && <span className="pill-sm" style={{ background: "var(--panel2)", color: "var(--muted)" }}>Sponsored · {r.sponsored}</span>}
            {r.tags.map((t) => <span key={t} className="pill-sm" style={{ background: "var(--panel2)", color: "var(--royal-soft)" }}>{t}</span>)}
          </div>
          <h1 className="h-page" style={{ fontSize: 21 }}>{r.name}</h1>
          <p className="sub" style={{ marginBottom: 14 }}>{r.desc} — @{r.author}{r.author !== "you" && <button className={"chip" + (follows.includes(r.author) ? " on" : "")} style={{ marginLeft: 8 }} onClick={() => toggleFollow(r.author)}>{follows.includes(r.author) ? "Following ✓" : "＋ Follow"}</button>}</p>
          <MacroRow m={r.macros} />

          <div style={{ display: "flex", gap: 14, alignItems: "center", marginTop: 14, flexWrap: "wrap" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 12, color: "var(--dim)" }}>Servings</span>
              <button className="chip" onClick={() => setServings(Math.max(1, servings - 1))}>−</button>
              <b style={{ fontSize: 14, minWidth: 18, textAlign: "center" }}>{servings}</b>
              <button className="chip" onClick={() => setServings(Math.min(12, servings + 1))}>＋</button>
              {factor !== 1 && <span className="pill-sm tag-dark">×{+factor.toFixed(2)} ingredients & prices</span>}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13 }}>
              <span style={{ color: "#F5C542" }}>{"★".repeat(Math.round(dispAvg))}<span style={{ opacity: 0.3 }}>{"★".repeat(5 - Math.round(dispAvg))}</span></span>
              <b>{dispAvg.toFixed(1)}</b>
              <span style={{ color: "var(--dim)", fontSize: 11.5 }}>({seed.n + (myRating ? 1 : 0)}) · {seed.wma}% would make again</span>
            </div>
          </div>

          {haveCount > 0 && (
            <div style={{ marginTop: 12, fontSize: 12.5, color: "#7DE3A0" }}>🧺 You already have {haveCount} of {r.ingredients.length} ingredients in your pantry</div>
          )}

          <div style={{ display: "flex", gap: 8, marginTop: 16, flexWrap: "wrap" }}>
            <button className="btn btn-grad" onClick={() => addAllToCart(r, swaps, factor)}>🛒 {T("addCart")}</button>
            <button className="btn btn-ghost" onClick={startCooking}>▶ {T("cook")}</button>
            <button className="btn btn-ghost" onClick={onCooked}>✅ {T("cooked")}</button>
            <button className="btn btn-ghost" onClick={() => onSave(r.id)}>{saved ? "🔖 Saved" : "📑 Save to gallery"}</button>
            <button className="btn btn-ghost" onClick={onShareRecipe}>↗ Share with friends</button>
            <button className="btn btn-ghost" onClick={() => downloadSavingsCard(r)} title="Download a branded card for TikTok / Instagram">📸 Savings card</button>
            <button className="btn btn-ghost" onClick={onTip}>☕ Support @{r.author}</button>
            {aiEnabled && <button className="btn btn-ghost" onClick={startCookMode}>✨ Cook with AI</button>}
          </div>
        </div>
      </div>

      <div className="card" style={{ padding: 18, marginBottom: 18 }}>
        <div className="eyebrow">Allergy alterations</div>
        <p className="sub" style={{ marginBottom: 10 }}>Tell us your allergies and we'll flag ingredients and suggest the closest-tasting swap.</p>
        <div className="scroll-x" style={{ marginBottom: 10 }}>
          {allergyChips.map((a) => (
            <button key={a} className={"chip" + (allergies.includes(a) ? " on" : "")} onClick={() => setAllergies((al) => (al.includes(a) ? al.filter((x) => x !== a) : [...al, a]))}>{a}</button>
          ))}
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <input className="inp" style={{ padding: "8px 12px", maxWidth: 240 }} placeholder="Not listed? Type it (e.g. shellfish)" value={customAllergy} onChange={(e) => setCustomAllergy(e.target.value)} onKeyDown={(e) => e.key === "Enter" && addCustomAllergy()} />
          <button className="chip" onClick={addCustomAllergy}>＋ Add</button>
        </div>
      </div>

      <div className="card" style={{ padding: 18, marginBottom: 18 }}>
        <div className="eyebrow" style={{ marginBottom: 10 }}>Ingredients & alternatives</div>
        {r.ingredients.map((ing, i) => {
          const bad = flagged(ing);
          const swapped = swaps[i];
          return (
            <div key={i} style={{ padding: "11px 0", borderBottom: i < r.ingredients.length - 1 ? "1px solid var(--line)" : "none" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                <div style={{ flex: 1, minWidth: 170 }}>
                  <b style={{ fontSize: 13.5, textDecoration: swapped ? "line-through" : "none", color: swapped ? "var(--dim)" : bad ? "#FF7A9C" : "var(--white)" }}>{ing.n}</b>
                  <span style={{ color: "var(--dim)", fontSize: 12.5 }}> · {ing.qty}</span>
                  {bad && !swapped && <span className="pill-sm" style={{ background: "rgba(255,92,138,.15)", color: "#FF7A9C", marginLeft: 8 }}>⚠ {flaggedTerms(ing).join(", ")}</span>}
                  {swapped && <div style={{ fontSize: 13, color: "#7DE3A0", marginTop: 3 }}>→ {swapped}</div>}
                </div>
                {havePantry(ing) && <span className="pill-sm" style={{ background: "rgba(125,227,160,.12)", color: "#7DE3A0" }}>🧺 in pantry</span>}
                <span style={{ fontSize: 12.5, color: "var(--muted)" }}>${(ing.price * factor).toFixed(2)}</span>
              </div>
              {ing.alts.length > 0 && (
                <div style={{ display: "flex", gap: 6, marginTop: 8, flexWrap: "wrap" }}>
                  {ing.alts.map((alt) => (
                    <button key={alt.n} className={"chip" + (swapped === alt.n ? " on" : "")} style={bad && !swapped ? { borderColor: "#FF7A9C" } : {}} title={alt.note}
                      onClick={() => setSwaps((s) => ({ ...s, [i]: s[i] === alt.n ? undefined : alt.n }))}>
                      ⇄ {alt.n} <span style={{ opacity: 0.65, fontWeight: 400 }}>· {alt.note}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
        <p className="sub" style={{ marginTop: 12, fontSize: 12 }}>Heads up: a swap gets you as close as possible to the original flavor, but it may not be the exact same — that's the trade for making it work for your body.</p>
      </div>

      <div className="card" style={{ padding: 18, marginBottom: 18 }}>
        <div className="eyebrow" style={{ marginBottom: 8 }}>Rate this recipe</div>
        <div style={{ display: "flex", gap: 14, alignItems: "center", flexWrap: "wrap" }}>
          <div>
            {[1, 2, 3, 4, 5].map((s) => (
              <button key={s} onClick={() => rate(s, myRating ? myRating.wma : true)} style={{ fontSize: 26, color: (myRating ? myRating.stars : 0) >= s ? "#F5C542" : "var(--line)", padding: "0 2px" }} aria-label={s + " stars"}>★</button>
            ))}
          </div>
          <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
            <span style={{ fontSize: 12.5, color: "var(--dim)" }}>Would make again?</span>
            <button className={"chip" + (myRating && myRating.wma === true ? " on" : "")} onClick={() => rate(myRating ? myRating.stars : 5, true)}>👍 Yes</button>
            <button className={"chip" + (myRating && myRating.wma === false ? " on" : "")} onClick={() => rate(myRating ? myRating.stars : 3, false)}>👎 No</button>
          </div>
          {myRating && <span style={{ fontSize: 12, color: "#7DE3A0" }}>✓ Thanks — your rating counts</span>}
        </div>
      </div>

      <div className="card" style={{ padding: 18 }}>
        <div className="eyebrow" style={{ marginBottom: 10 }}>Steps</div>
        {r.steps.map((s, i) => (
          <div key={i} style={{ display: "flex", gap: 12, padding: "9px 0", alignItems: "flex-start" }}>
            <div style={{ width: 26, height: 26, borderRadius: 9, background: "var(--grad)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, flexShrink: 0 }}>{i + 1}</div>
            <p style={{ fontSize: 13.5, lineHeight: 1.55, color: "var(--muted)", paddingTop: 3 }}>{s}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------- SHOPPING ---------------- */

const G_CATS = ["All", "Produce", "Meat & Seafood", "Dairy & Eggs", "Pantry", "Frozen", "Snacks", "Drinks", "Bakery"];

// deal: { store, off } = % off at that store this week
const GROCERIES = [
  { id: "g1", n: "Chicken breast", emoji: "🍗", cat: "Meat & Seafood", size: "1 lb", price: 4.99, deal: { store: "kroger", off: 0.2 }, pop: 9 },
  { id: "g2", n: "Salmon fillets", emoji: "🐟", cat: "Meat & Seafood", size: "2 × 6 oz", price: 9.99, deal: { store: "aldi", off: 0.15 }, pop: 7 },
  { id: "g3", n: "Ground beef 90/10", emoji: "🥩", cat: "Meat & Seafood", size: "1 lb", price: 5.79, deal: { store: "walmart", off: 0.15 }, pop: 8 },
  { id: "g4", n: "Eggs", emoji: "🥚", cat: "Dairy & Eggs", size: "dozen", price: 2.89, deal: { store: "lidl", off: 0.2 }, pop: 10 },
  { id: "g5", n: "Whole milk", emoji: "🥛", cat: "Dairy & Eggs", size: "1 gal", price: 3.29, deal: { store: "costco", off: 0.2 }, pop: 9 },
  { id: "g6", n: "Butter", emoji: "🧈", cat: "Dairy & Eggs", size: "1 lb", price: 3.99, pop: 8 },
  { id: "g7", n: "Parmesan", emoji: "🧀", cat: "Dairy & Eggs", size: "8 oz wedge", price: 4.29, deal: { store: "tj", off: 0.15 }, pop: 6 },
  { id: "g8", n: "Heavy cream", emoji: "🍶", cat: "Dairy & Eggs", size: "1 pt", price: 3.49, pop: 5 },
  { id: "g9", n: "Greek yogurt", emoji: "🥣", cat: "Dairy & Eggs", size: "32 oz", price: 4.79, deal: { store: "aldi", off: 0.2 }, pop: 7 },
  { id: "g10", n: "Avocados", emoji: "🥑", cat: "Produce", size: "bag of 4", price: 3.99, deal: { store: "aldi", off: 0.25 }, pop: 9 },
  { id: "g11", n: "Bananas", emoji: "🍌", cat: "Produce", size: "bunch", price: 1.49, deal: { store: "walmart", off: 0.2 }, pop: 10 },
  { id: "g12", n: "Baby potatoes", emoji: "🥔", cat: "Produce", size: "1.5 lb", price: 3.29, pop: 6 },
  { id: "g13", n: "Garlic", emoji: "🧄", cat: "Produce", size: "3 bulbs", price: 0.99, pop: 8 },
  { id: "g14", n: "Kale", emoji: "🥬", cat: "Produce", size: "1 bunch", price: 2.29, deal: { store: "sprouts", off: 0.25 }, pop: 5 },
  { id: "g15", n: "Sweet potatoes", emoji: "🍠", cat: "Produce", size: "2 lb", price: 2.79, pop: 6 },
  { id: "g16", n: "Limes", emoji: "🍋", cat: "Produce", size: "bag of 6", price: 2.49, pop: 6 },
  { id: "g17", n: "Strawberries", emoji: "🍓", cat: "Produce", size: "1 lb", price: 3.49, deal: { store: "publix", off: 0.3 }, pop: 8 },
  { id: "g18", n: "Fresh cilantro", emoji: "🌿", cat: "Produce", size: "1 bunch", price: 0.99, pop: 5 },
  { id: "g19", n: "Spaghetti", emoji: "🍝", cat: "Pantry", size: "16 oz", price: 1.19, pop: 8 },
  { id: "g20", n: "Penne pasta", emoji: "🍤", cat: "Pantry", size: "16 oz", price: 1.29, pop: 7 },
  { id: "g21", n: "White rice", emoji: "🍚", cat: "Pantry", size: "2 lb", price: 2.19, deal: { store: "costco", off: 0.25 }, pop: 8 },
  { id: "g22", n: "Quinoa", emoji: "🌾", cat: "Pantry", size: "16 oz", price: 4.49, pop: 5 },
  { id: "g23", n: "Black beans", emoji: "🫘", cat: "Pantry", size: "15 oz can", price: 0.99, deal: { store: "lidl", off: 0.2 }, pop: 7 },
  { id: "g24", n: "Olive oil", emoji: "🫒", cat: "Pantry", size: "500 ml", price: 7.99, deal: { store: "tj", off: 0.2 }, pop: 8 },
  { id: "g25", n: "Cajun seasoning", emoji: "🌶️", cat: "Pantry", size: "3 oz", price: 2.99, pop: 4 },
  { id: "g26", n: "Soy sauce", emoji: "🍾", cat: "Pantry", size: "10 oz", price: 2.49, pop: 6 },
  { id: "g27", n: "Tahini", emoji: "🥜", cat: "Pantry", size: "16 oz", price: 5.99, pop: 4 },
  { id: "g28", n: "Dark chocolate", emoji: "🍫", cat: "Snacks", size: "2 bars", price: 3.79, deal: { store: "aldi", off: 0.2 }, pop: 8 },
  { id: "g29", n: "Tortilla chips", emoji: "🌽", cat: "Snacks", size: "13 oz", price: 3.29, deal: { store: "target", off: 0.2 }, pop: 8 },
  { id: "g30", n: "Graham crackers", emoji: "🍪", cat: "Snacks", size: "14 oz", price: 2.99, pop: 5 },
  { id: "g31", n: "Frozen mango", emoji: "🥭", cat: "Frozen", size: "16 oz", price: 3.99, pop: 6 },
  { id: "g32", n: "Frozen pizza", emoji: "🍕", cat: "Frozen", size: "each", price: 5.49, deal: { store: "kroger", off: 0.25 }, pop: 9 },
  { id: "g33", n: "Ice cream", emoji: "🍨", cat: "Frozen", size: "1 pt", price: 4.49, deal: { store: "target", off: 0.25 }, pop: 8 },
  { id: "g34", n: "Sparkling water", emoji: "🫧", cat: "Drinks", size: "8 pk", price: 3.99, deal: { store: "winndixie", off: 0.2 }, pop: 7 },
  { id: "g35", n: "Black tea", emoji: "🍵", cat: "Drinks", size: "20 bags", price: 3.29, pop: 5 },
  { id: "g36", n: "Oat milk", emoji: "🌾", cat: "Drinks", size: "64 oz", price: 4.29, deal: { store: "tj", off: 0.15 }, pop: 6 },
  { id: "g37", n: "Sourdough bread", emoji: "🍞", cat: "Bakery", size: "loaf", price: 4.49, deal: { store: "publix", off: 0.2 }, pop: 8 },
  { id: "g38", n: "Corn tortillas", emoji: "🫓", cat: "Bakery", size: "30 ct", price: 2.19, pop: 6 },
  { id: "g39", n: "Croissants", emoji: "🥐", cat: "Bakery", size: "4 pk", price: 3.99, deal: { store: "foodlion", off: 0.2 }, pop: 6 },
  { id: "g40", n: "Fettuccine", emoji: "🍜", cat: "Pantry", size: "16 oz", price: 1.99, pop: 5 },
];

// what pairs well with what — powers "suggested for you"
const PAIRS = [
  ["Spaghetti", "Garlic"], ["Spaghetti", "Parmesan"], ["Spaghetti", "Olive oil"], ["Penne pasta", "Heavy cream"], ["Penne pasta", "Parmesan"],
  ["Fettuccine", "Heavy cream"], ["Fettuccine", "Parmesan"], ["Fettuccine", "Butter"],
  ["Chicken breast", "White rice"], ["Chicken breast", "Cajun seasoning"], ["Chicken breast", "Limes"],
  ["Salmon fillets", "Cajun seasoning"], ["Salmon fillets", "Limes"], ["Salmon fillets", "Baby potatoes"],
  ["Ground beef 90/10", "Corn tortillas"], ["Corn tortillas", "Avocados"], ["Corn tortillas", "Fresh cilantro"], ["Black beans", "White rice"], ["Black beans", "Avocados"],
  ["Eggs", "Sourdough bread"], ["Eggs", "Butter"], ["Sourdough bread", "Butter"], ["Sourdough bread", "Avocados"],
  ["Strawberries", "Greek yogurt"], ["Strawberries", "Graham crackers"], ["Dark chocolate", "Strawberries"], ["Ice cream", "Dark chocolate"],
  ["Kale", "Quinoa"], ["Quinoa", "Sweet potatoes"], ["Tahini", "Kale"], ["Bananas", "Greek yogurt"],
  ["Tortilla chips", "Avocados"], ["Frozen mango", "Limes"], ["Black tea", "Oat milk"], ["Frozen pizza", "Sparkling water"],
];

function toCartItem(g) {
  return { n: g.n, detail: g.size, price: g.price, deal: g.deal, from: "Grocery", count: 1, emoji: g.emoji };
}

function GroceryTile({ g, st, count, onAdd, onSub }) {
  const p = priceAt(g, st);
  const best = bestStore(g);
  const hasDeal = g.deal && g.deal.store === st.id;
  return (
    <div className="card" style={{ padding: 12, position: "relative" }}>
      {hasDeal && <span className="pill-sm" style={{ position: "absolute", top: 10, left: 10, background: "rgba(125,227,160,.15)", color: "#7DE3A0" }}>{Math.round(g.deal.off * 100)}% off</span>}
      <div style={{ fontSize: 36, textAlign: "center", padding: "14px 0 8px" }}>{g.emoji}</div>
      <b style={{ fontSize: 13, display: "block", lineHeight: 1.3 }}>{g.n}</b>
      <div style={{ fontSize: 11, color: "var(--dim)", marginBottom: 6 }}>{g.size}</div>
      <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 4 }}>
        <b className="disp" style={{ fontSize: 15 }}>${p.toFixed(2)}</b>
        {hasDeal && <s style={{ fontSize: 11, color: "var(--dim)" }}>${(g.price * st.mult).toFixed(2)}</s>}
      </div>
      <div style={{ fontSize: 10.5, color: best.id === st.id ? "#7DE3A0" : "var(--dim)", marginBottom: 10 }}>
        {best.id === st.id ? "✓ Best price here" : `Cheapest: ${best.name} $${priceAt(g, best).toFixed(2)}`}
      </div>
      {count === 0 ? (
        <button className="btn btn-grad" style={{ width: "100%", padding: "8px 0" }} onClick={onAdd}>＋ Add</button>
      ) : (
        <div style={{ display: "flex", alignItems: "center", gap: 8, justifyContent: "center" }}>
          <button className="chip" onClick={onSub}>−</button>
          <b style={{ fontSize: 14, minWidth: 20, textAlign: "center" }}>{count}</b>
          <button className="chip on" onClick={onAdd}>＋</button>
        </div>
      )}
    </div>
  );
}

function hashStr(s) { let h = 7; for (const c of s) h = (h * 31 + c.charCodeAt(0)) >>> 0; return h; }

function ShoppingScreen({ cart, setCart, store, setStore, budget, setBudget, savedRecipes, orders, placeOrder, reorder, friends, plus, goPlus, clipped, usedCoupons, clipCoupon, aiEnabled }) {
  const [splitWith, setSplitWith] = useState([]);
  const [appliedId, setAppliedId] = useState(null);
  const [codeInput, setCodeInput] = useState("");
  const [couponMsg, setCouponMsg] = useState("");
  const [scanBusy, setScanBusy] = useState(false);
  const couponScanRef = useRef(null);
  function tryApply(codeOrId, viaCode) {
    const c = viaCode
      ? STORE_COUPONS.find((x) => x.code === codeOrId)
      : STORE_COUPONS.find((x) => x.id === codeOrId);
    if (!c) { setCouponMsg("❌ That code isn't one of ours — double-check it."); return; }
    if (usedCoupons.includes(c.id)) { setCouponMsg("❌ That coupon was already used."); return; }
    if (c.store !== st.id) { setCouponMsg(`❌ That coupon is for ${STORES.find((s) => s.id === c.store).name} — switch stores to use it.`); return; }
    if (!storeAllowsCoupons(st.id)) { setCouponMsg(`❌ ${st.name} doesn't accept digital coupons.`); return; }
    if (c.min && cartTotal(cart, st) < c.min) { setCouponMsg(`⚠️ ${c.label} needs a $${c.min}+ cart — you're at $${cartTotal(cart, st).toFixed(2)}.`); return; }
    setAppliedId(c.id);
    setCouponMsg("✅ " + c.label + " applied!");
    setCodeInput("");
  }
  async function scanCoupon(e) {
    const f = e.target.files && e.target.files[0];
    e.target.value = "";
    if (!f) return;
    setScanBusy(true); setCouponMsg("");
    const r = new FileReader();
    r.onload = async () => {
      try {
        const code = await readCouponCode(String(r.result).split(",")[1], f.type || "image/jpeg");
        if (!code || code === "NONE") setCouponMsg("❌ Couldn't read a code in that photo — try again closer, or type it.");
        else tryApply(code, true);
      } catch (err) { setCouponMsg("❌ Scan hiccup — type the code instead."); }
      setScanBusy(false);
    };
    r.readAsDataURL(f);
  }
  const [tab, setTab] = useState("browse");
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("All");
  const [loc, setLoc] = useState("");        // confirmed location label
  const [locSeed, setLocSeed] = useState(""); // seed for distance simulation
  const [locInput, setLocInput] = useState("");
  const [showFar, setShowFar] = useState(false);
  const [geoMsg, setGeoMsg] = useState("");
  const st = STORES.find((s) => s.id === store);

  // simulated proximity: deterministic per location+store, 0.4–15 mi; closest 3 always deliver
  const storeMeta = useMemo(() => {
    if (!locSeed) return STORES.map((s) => ({ ...s, dist: null, avail: true }));
    const withDist = STORES.map((s) => ({ ...s, dist: +(0.4 + (hashStr(locSeed.toLowerCase() + s.id) % 146) / 10).toFixed(1) }));
    withDist.sort((a, b) => a.dist - b.dist);
    return withDist.map((s, i) => ({ ...s, avail: i < 3 || s.dist <= 9 }));
  }, [locSeed]);
  const nearby = storeMeta.filter((s) => s.avail);
  const visibleStores = locSeed ? (showFar ? storeMeta : nearby) : storeMeta;

  function setLocation(label, seed) {
    setLoc(label); setLocSeed(seed); setGeoMsg("");
    // if the selected store no longer delivers here, hop to the closest one that does
    const meta = STORES.map((s) => ({ id: s.id, dist: +(0.4 + (hashStr(seed.toLowerCase() + s.id) % 146) / 10).toFixed(1) })).sort((a, b) => a.dist - b.dist);
    const avail = new Set(meta.filter((s, i) => i < 3 || s.dist <= 9).map((s) => s.id));
    if (!avail.has(store)) setStore(meta[0].id);
  }
  function searchLoc() { if (locInput.trim()) setLocation(locInput.trim(), locInput.trim()); }
  function useMyLocation() {
    if (!navigator.geolocation) { setGeoMsg("Location isn't available in this browser — type your city or ZIP instead."); return; }
    setGeoMsg("Finding you…");
    navigator.geolocation.getCurrentPosition(
      (pos) => setLocation("your location", pos.coords.latitude.toFixed(2) + "," + pos.coords.longitude.toFixed(2)),
      () => setGeoMsg("Couldn't get your location — type your city or ZIP instead.")
    );
  }

  const subtotal = cartTotal(cart, st);
  const feeInfo = deliveryFee(st, subtotal, plus);
  const applied = appliedId ? STORE_COUPONS.find((x) => x.id === appliedId) : null;
  const couponOff = cart.length ? couponDiscount(applied, subtotal, feeInfo.fee) : 0;
  const total = Math.max(0, subtotal + (cart.length ? feeInfo.fee : 0) - couponOff);
  const remaining = budget - total;
  const over = remaining < 0;
  const itemCount = cart.reduce((s, i) => s + i.count, 0);

  // best-store savings banner: same cart, cheapest total (only stores that deliver to you)
  const pool = locSeed ? nearby : STORES;
  const feeOf = (s) => deliveryFee(s, cartTotal(cart, s), plus).fee;
  const cheapest = pool.reduce((b, s) => (cartTotal(cart, s) + feeOf(s) < cartTotal(cart, b) + feeOf(b) ? s : b), pool[0]);
  const savings = cart.length ? total - (cartTotal(cart, cheapest) + cheapest.fee) : 0;

  function add(g) {
    setCart((c) => {
      const j = c.findIndex((x) => x.n === g.n);
      if (j >= 0) return c.map((x, i) => (i === j ? { ...x, count: x.count + 1 } : x));
      return [...c, toCartItem(g)];
    });
  }
  function sub(name) {
    setCart((c) => c.map((x) => (x.n === name ? { ...x, count: x.count - 1 } : x)).filter((x) => x.count > 0));
  }
  const countOf = (name) => cart.find((x) => x.n === name)?.count || 0;

  // ---- suggestions: pairs with your cart + fits remaining budget ----
  const suggestions = useMemo(() => {
    const inCart = new Set(cart.map((c) => c.n));
    const scored = GROCERIES.filter((g) => !inCart.has(g.n)).map((g) => {
      let score = 0;
      PAIRS.forEach(([a, b]) => {
        if ((a === g.n && inCart.has(b)) || (b === g.n && inCart.has(a))) score += 3;
      });
      if (g.deal) score += 1;
      score += g.pop / 10;
      const fits = priceAt(g, st) <= Math.max(remaining, 0) || cart.length === 0;
      return { g, score, fits };
    });
    const paired = scored.filter((x) => x.score >= 3 && x.fits).sort((a, b) => b.score - a.score);
    const fallback = scored.filter((x) => x.fits).sort((a, b) => b.score - a.score);
    return (paired.length >= 3 ? paired : fallback).slice(0, 6).map((x) => x.g);
  }, [cart, store, remaining]);

  const deals = GROCERIES.filter((g) => g.deal && g.deal.store === st.id);

  const savingsAlerts = useMemo(() => {
    const out = [];
    GROCERIES.filter((g) => g.deal).forEach((g) => {
      const inRecipes = savedRecipes.filter((r) => r.ingredients.some((i) => {
        const a = i.n.toLowerCase(), b = g.n.toLowerCase();
        return a.includes(b) || b.includes(a) || a.split(" ")[0] === b.split(" ")[0];
      }));
      if (inRecipes.length) out.push({ g, count: inRecipes.length, storeName: STORES.find((s) => s.id === g.deal.store).name });
    });
    return out.slice(0, 3);
  }, [savedRecipes]);
  const list = GROCERIES.filter((g) => (cat === "All" || g.cat === cat) && (!q || g.n.toLowerCase().includes(q.toLowerCase())));

  return (
    <div style={{ maxWidth: 820, margin: "0 auto" }}>
      <div className="eyebrow">Shopping</div>
      <h1 className="h-page">{T("shopT")}</h1>
      <p className="sub" style={{ marginBottom: 16 }}>Browse like DoorDash, pay like a genius — we compare every item across stores and keep you inside budget.</p>

      {/* store locator */}
      <Disclosure icon="📍" summary={loc ? <span><b>{loc}</b> · {nearby.length} stores deliver</span> : "Find stores near you — city, ZIP, or GPS"}>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
          <input className="inp" style={{ flex: 1, minWidth: 160, padding: "9px 12px" }} placeholder="City or ZIP — find stores near you" value={locInput} onChange={(e) => setLocInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && searchLoc()} />
          <button className="btn btn-grad" style={{ padding: "9px 14px" }} onClick={searchLoc}>Search</button>
          <button className="btn btn-ghost" style={{ padding: "9px 14px" }} onClick={useMyLocation}>Use my location</button>
        </div>
        {geoMsg && <p style={{ fontSize: 12, color: "var(--muted)", marginTop: 8 }}>{geoMsg}</p>}
        {loc && (
          <p style={{ fontSize: 12, color: "var(--muted)", marginTop: 8 }}>
            <b style={{ color: "#7DE3A0" }}>{nearby.length} of {STORES.length}</b> stores deliver near <b style={{ color: "var(--white)" }}>{loc}</b>, sorted closest first.
            {nearby.length < STORES.length && <button className="chip" style={{ marginLeft: 8 }} onClick={() => setShowFar(!showFar)}>{showFar ? "Hide out-of-range" : `Show ${STORES.length - nearby.length} out-of-range`}</button>}
          </p>
        )}
      </Disclosure>

      {/* store cards */}
      <SwipeRow style={{ marginBottom: 16 }}>
        {visibleStores.map((s) => {
          const on = store === s.id;
          const far = locSeed && !s.avail;
          return (
            <button key={s.id} className="card" style={{ padding: "12px 16px", minWidth: 156, textAlign: "left", flexShrink: 0, borderColor: on ? "var(--royal)" : "var(--line)", background: on ? "var(--panel2)" : "var(--panel)", opacity: far ? 0.55 : 1 }} onClick={() => setStore(s.id)}>
              <b style={{ fontSize: 13.5, display: "block" }}>{s.name}</b>
              <div style={{ fontSize: 11, color: "var(--dim)", margin: "3px 0" }}>⭐ {s.rating} · {s.eta}</div>
              {s.dist != null && <div style={{ fontSize: 11, color: far ? "#FF7A9C" : "var(--royal-soft)", marginBottom: 2 }}>{far ? `${s.dist} mi · outside delivery range` : `${s.dist} mi away`}</div>}
              <div style={{ fontSize: 11 }}>
                {(() => { const fi = deliveryFee(s, cartTotal(cart, s), plus); return fi.deal
                  ? <span style={{ color: "#7DE3A0" }}>{fi.fee === 0 ? "Free delivery" : "$" + fi.fee.toFixed(2) + " delivery"} <s style={{ color: "var(--dim)" }}>${fi.base.toFixed(2)}</s> · Plus</span>
                  : <span style={{ color: "var(--muted)" }}>${s.fee.toFixed(2)} delivery</span>; })()}
                {cart.length > 0 && <span style={{ color: cheapest.id === s.id ? "#7DE3A0" : "var(--dim)", display: "block", marginTop: 2 }}>{cheapest.id === s.id ? "💸 Cheapest for your cart" : `Cart: $${(cartTotal(cart, s) + deliveryFee(s, cartTotal(cart, s), plus).fee).toFixed(2)}`}</span>}
              </div>
            </button>
          );
        })}
      </SwipeRow>

      {/* budget strip — always visible */}
      <div className="card" style={{ padding: "14px 16px", marginBottom: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
          <div style={{ flex: 1, minWidth: 200 }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11.5, marginBottom: 5 }}>
              <span style={{ color: "var(--dim)" }}>Budget: <b style={{ color: "var(--white)" }}>${budget}</b></span>
              <span style={{ color: over ? "#FF7A9C" : "#7DE3A0", fontWeight: 700 }}>{over ? `$${Math.abs(remaining).toFixed(2)} over` : `$${remaining.toFixed(2)} left`}</span>
            </div>
            <div className="macrobar" style={{ height: 7 }}><i style={{ width: Math.min(100, (total / budget) * 100) + "%", background: over ? "#FF5C8A" : "var(--grad)" }} /></div>
          </div>
          <input type="range" min="10" max="150" value={budget} onChange={(e) => setBudget(+e.target.value)} style={{ width: 130, accentColor: "var(--royal)" }} aria-label="Budget" />
        </div>
        {cart.length > 0 && savings > 0.5 && (
          <div style={{ marginTop: 10, fontSize: 12.5, color: "#7DE3A0" }}>
            💸 Switch to <b>{cheapest.name}</b> and save <b>${savings.toFixed(2)}</b> on this exact cart{" "}
            <button className="chip" style={{ marginLeft: 6 }} onClick={() => setStore(cheapest.id)}>Switch</button>
          </div>
        )}
        {over && cart.length > 0 && (
          <div style={{ marginTop: 8, fontSize: 12, color: "#FF7A9C" }}>Over budget — try {cheapest.id !== store ? cheapest.name + ", " : ""}trimming an item, or raising your budget.</div>
        )}
      </div>

      <Disclosure icon="🚚" summary={plus ? <span><b>{activePlusDeals().length} GrubPlus delivery deals</b> active — applied automatically</span> : "GrubPlus delivery deals — see what members get"}>
        {activePlusDeals().map((d) => (
          <div key={d.id} style={{ fontSize: 12.5, color: plus ? "#7DE3A0" : "var(--muted)", padding: "2px 0" }}>
            {plus ? "✓ " : ""}{d.label}
          </div>
        ))}
        {!plus && (
          <div style={{ marginTop: 8, display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
            <span style={{ fontSize: 12, color: "var(--dim)" }}>Deals apply automatically for GrubPlus members.</span>
            <button className="chip" onClick={goPlus}>Start free trial</button>
          </div>
        )}
      </Disclosure>

      <Disclosure icon="🎟️" summary={storeAllowsCoupons(st.id)
        ? <span><b>Digital coupons at {st.name}</b> — clip them, use them at checkout</span>
        : <span>{st.name} doesn't accept digital coupons (everyday-low-price store)</span>}>
        {!storeAllowsCoupons(st.id) && <p className="sub" style={{ fontSize: 12 }}>Some chains skip coupons entirely and keep base prices low instead. Your clipped coupons stay in your wallet for participating stores.</p>}
        {storeAllowsCoupons(st.id) && STORE_COUPONS.filter((c) => c.store === st.id).map((c) => {
          const isClipped = clipped.includes(c.id), isUsed = usedCoupons.includes(c.id);
          return (
            <div key={c.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0", borderBottom: "1px solid var(--line)" }}>
              <span style={{ fontSize: 18 }}>🎟️</span>
              <div style={{ flex: 1 }}>
                <b style={{ fontSize: 12.5 }}>{c.label}</b>
                <div style={{ fontSize: 10.5, color: "var(--dim)" }}>Code: {c.code}{c.min ? ` · $${c.min}+ cart` : ""}</div>
              </div>
              {isUsed ? <span className="pill-sm tag-dark">Used ✓</span>
                : isClipped ? <span className="pill-sm" style={{ background: "rgba(125,227,160,.15)", color: "#7DE3A0" }}>✂️ Clipped</span>
                : <button className="chip on" onClick={() => clipCoupon(c.id)}>✂️ Clip</button>}
            </div>
          );
        })}
        <p className="sub" style={{ fontSize: 11, marginTop: 8 }}>💡 You also earn a fresh coupon after every order at participating stores.</p>
      </Disclosure>

      {savingsAlerts.length > 0 && (
        <Disclosure icon="🔔" summary={<span><b>{savingsAlerts.length} savings alert{savingsAlerts.length > 1 ? "s" : ""}</b> on ingredients in your saved recipes</span>}>
          {savingsAlerts.map((a, i) => (
            <div key={i} style={{ fontSize: 12.5, color: "var(--muted)", padding: "3px 0" }}>
              <b style={{ color: "#7DE3A0" }}>{a.g.n}</b> is {Math.round(a.g.deal.off * 100)}% off at <b style={{ color: "var(--white)" }}>{a.storeName}</b> this week — it's in {a.count} of your saved recipe{a.count > 1 ? "s" : ""}.
            </div>
          ))}
        </Disclosure>
      )}

      {/* browse / cart / orders tabs */}
      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        <button className={"chip" + (tab === "browse" ? " on" : "")} onClick={() => setTab("browse")}>🛍️ Browse {st.name}</button>
        <button className={"chip" + (tab === "cart" ? " on" : "")} onClick={() => setTab("cart")}>🛒 Cart ({itemCount})</button>
        <button className={"chip" + (tab === "orders" ? " on" : "")} onClick={() => setTab("orders")}>📦 Orders ({orders.length})</button>
      </div>

      {tab === "browse" && (
        <>
          <input className="inp" style={{ marginBottom: 12 }} placeholder={`Search ${st.name} — "salmon", "chocolate", "eggs"…`} value={q} onChange={(e) => setQ(e.target.value)} />
          <SwipeRow arrows={false} style={{ marginBottom: 18 }}>
            {G_CATS.map((c) => <button key={c} className={"chip" + (cat === c ? " on" : "")} onClick={() => setCat(c)}>{c}</button>)}
          </SwipeRow>

          {!q && cat === "All" && deals.length > 0 && (
            <>
              <div className="eyebrow" style={{ marginBottom: 8 }}>🔥 Deals at {st.name} this week</div>
              <SwipeRow style={{ marginBottom: 20 }}>
                {deals.map((g) => <div key={g.id} style={{ minWidth: 168, flexShrink: 0 }}><GroceryTile g={g} st={st} count={countOf(g.n)} onAdd={() => add(g)} onSub={() => sub(g.n)} /></div>)}
              </SwipeRow>
            </>
          )}

          {!q && cat === "All" && (
            <>
              <div className="eyebrow" style={{ marginBottom: 8 }}>
                ✨ Suggested for you {cart.length > 0 ? "· pairs with your cart, fits your budget" : "· popular staples to start with"}
              </div>
              <SwipeRow style={{ marginBottom: 20 }}>
                {suggestions.map((g) => <div key={g.id} style={{ minWidth: 168, flexShrink: 0 }}><GroceryTile g={g} st={st} count={countOf(g.n)} onAdd={() => add(g)} onSub={() => sub(g.n)} /></div>)}
              </SwipeRow>
            </>
          )}

          <div className="eyebrow" style={{ marginBottom: 8 }}>{q ? `Results for "${q}"` : cat} · {list.length} item{list.length !== 1 ? "s" : ""}</div>
          {list.length === 0 && <div className="card" style={{ padding: 22, color: "var(--muted)", fontSize: 13 }}>Nothing matches that search. Try a broader word — "pasta" instead of a brand name.</div>}
          <div style={{ display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fill,minmax(160px,1fr))" }}>
            {list.map((g) => <GroceryTile key={g.id} g={g} st={st} count={countOf(g.n)} onAdd={() => add(g)} onSub={() => sub(g.n)} />)}
          </div>
        </>
      )}

      {tab === "cart" && (
        <div className="card" style={{ padding: 18 }}>
          {cart.length === 0 && <p className="sub">Your cart is empty. Browse the aisles above, or open a recipe and tap "Add all to cart".</p>}
          {cart.map((it, i) => {
            const p = priceAt(it, st);
            const hasDeal = it.deal && it.deal.store === st.id;
            return (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 0", borderBottom: "1px solid var(--line)" }}>
                <span style={{ fontSize: 20 }}>{it.emoji || "🧺"}</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <b style={{ fontSize: 13.5 }}>{it.n}</b>
                  <div style={{ fontSize: 11, color: "var(--dim)" }}>{it.detail} · {it.from === "Grocery" ? st.name : "for " + it.from}{hasDeal && <span style={{ color: "#7DE3A0" }}> · {Math.round(it.deal.off * 100)}% off</span>}</div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <button className="chip" onClick={() => sub(it.n)}>−</button>
                  <b style={{ fontSize: 13, minWidth: 16, textAlign: "center" }}>{it.count}</b>
                  <button className="chip" onClick={() => setCart((c) => c.map((x) => (x.n === it.n ? { ...x, count: x.count + 1 } : x)))}>＋</button>
                </div>
                <b style={{ fontSize: 13, minWidth: 56, textAlign: "right" }}>${(p * it.count).toFixed(2)}</b>
              </div>
            );
          })}
          {cart.length > 0 && (
            <>
              <div style={{ padding: "14px 0 2px", fontSize: 13, color: "var(--muted)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}><span>Subtotal ({itemCount} items)</span><span>${subtotal.toFixed(2)}</span></div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                  <span>Delivery — {st.name} ({st.eta}){feeInfo.deal && <span style={{ color: "#7DE3A0" }}> · {feeInfo.deal.label}</span>}</span>
                  <span>{feeInfo.deal && <s style={{ color: "var(--dim)", marginRight: 6 }}>${feeInfo.base.toFixed(2)}</s>}{feeInfo.fee === 0 ? <b style={{ color: "#7DE3A0" }}>FREE</b> : "$" + feeInfo.fee.toFixed(2)}</span>
                </div>
                {couponOff > 0 && applied && (
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5, color: "#7DE3A0" }}>
                    <span>🎟️ {applied.label} ({applied.code})</span><span>−${couponOff.toFixed(2)}</span>
                  </div>
                )}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 8, borderTop: "1px solid var(--line)" }}>
                  <b style={{ color: "var(--white)" }}>Total</b>
                  <b className="disp" style={{ fontSize: 20, color: over ? "#FF7A9C" : "#7DE3A0" }}>${total.toFixed(2)}</b>
                </div>
              </div>
              <div style={{ marginTop: 14, padding: "12px 14px", background: "var(--panel2)", borderRadius: 12 }}>
                <div className="eyebrow" style={{ marginBottom: 6 }}>🎟️ Coupons at checkout</div>
                {!storeAllowsCoupons(st.id) && <p className="sub" style={{ fontSize: 12 }}>{st.name} doesn't accept digital coupons.</p>}
                {storeAllowsCoupons(st.id) && (
                  <>
                    <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 8 }}>
                      {STORE_COUPONS.filter((c) => c.store === st.id && clipped.includes(c.id) && !usedCoupons.includes(c.id)).map((c) => (
                        <button key={c.id} className={"chip" + (appliedId === c.id ? " on" : "")} onClick={() => (appliedId === c.id ? (setAppliedId(null), setCouponMsg("")) : tryApply(c.id, false))}>🎟️ {c.label}</button>
                      ))}
                      {STORE_COUPONS.filter((c) => c.store === st.id && clipped.includes(c.id) && !usedCoupons.includes(c.id)).length === 0 && <span className="sub" style={{ fontSize: 11.5 }}>No clipped coupons for {st.name} — clip some in Browse, or enter a code:</span>}
                    </div>
                    <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                      <input className="inp" style={{ padding: "8px 12px", maxWidth: 170, textTransform: "uppercase" }} placeholder="Coupon code" value={codeInput} onChange={(e) => setCodeInput(e.target.value.toUpperCase())} onKeyDown={(e) => e.key === "Enter" && tryApply(codeInput.trim(), true)} />
                      <button className="chip" onClick={() => tryApply(codeInput.trim(), true)} disabled={!codeInput.trim()}>Apply</button>
                      <input ref={couponScanRef} type="file" accept="image/*" capture="environment" style={{ display: "none" }} onChange={scanCoupon} />
                      <button className="chip" onClick={() => couponScanRef.current.click()} disabled={scanBusy || !aiEnabled} title={aiEnabled ? "Photograph a coupon and we'll read the code" : "Enable the AI assistant to scan coupons"}>{scanBusy ? "Reading…" : "📷 Scan coupon"}</button>
                    </div>
                    {couponMsg && <p style={{ fontSize: 12, marginTop: 8, color: couponMsg.startsWith("✅") ? "#7DE3A0" : couponMsg.startsWith("⚠️") ? "#F5C542" : "#FF7A9C" }}>{couponMsg}</p>}
                  </>
                )}
              </div>

              <div style={{ marginTop: 12, padding: "12px 14px", background: "var(--panel2)", borderRadius: 12 }}>
                <div className="eyebrow" style={{ marginBottom: 6 }}>👥 Group cart — split the cost</div>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: splitWith.length ? 8 : 0 }}>
                  {friends.filter((f) => f.friend).map((f) => (
                    <button key={f.id} className={"chip" + (splitWith.includes(f.id) ? " on" : "")} onClick={() => setSplitWith((s) => (s.includes(f.id) ? s.filter((x) => x !== f.id) : [...s, f.id]))}>{f.emoji} {f.name.split(" ")[0]}</button>
                  ))}
                </div>
                {splitWith.length > 0 && <div style={{ fontSize: 12.5, color: "#7DE3A0" }}>Split {splitWith.length + 1} ways: <b>${(total / (splitWith.length + 1)).toFixed(2)} each</b> — we'll send everyone their share.</div>}
              </div>
              <button className="btn btn-grad" style={{ width: "100%", marginTop: 12 }} onClick={() => { placeOrder({ id: "o" + Date.now(), store: st.name, storeId: st.id, eta: st.eta, items: cart.map((c) => ({ ...c })), total: +total.toFixed(2), couponId: appliedId, couponOff: +couponOff.toFixed(2), split: splitWith.length + 1, date: new Date().toLocaleDateString() }); setAppliedId(null); setCouponMsg(""); }}>Checkout at {st.name} · ${total.toFixed(2)}{splitWith.length ? ` (${(total / (splitWith.length + 1)).toFixed(2)} each)` : ""} →</button>
              <p className="sub" style={{ fontSize: 11, marginTop: 10, textAlign: "center" }}>Orders are fulfilled by our store partners. GrubGrounds earns a small commission at no extra cost to you — it's how we keep the feed free.</p>
              <button className="btn btn-ghost" style={{ width: "100%", marginTop: 8 }} onClick={() => setCart([])}>Empty cart</button>
            </>
          )}
        </div>
      )}

      {tab === "orders" && (
        <div className="card" style={{ padding: 18 }}>
          {orders.length === 0 && <p className="sub">No orders yet. Your past orders will show here with one-tap reorder — people buy the same staples weekly, so this saves real time.</p>}
          {orders.map((o) => (
            <div key={o.id} style={{ padding: "12px 0", borderBottom: "1px solid var(--line)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                <div style={{ flex: 1, minWidth: 160 }}>
                  <b style={{ fontSize: 13.5 }}>{o.store} · ${o.total.toFixed(2)}</b>
                  <div style={{ fontSize: 11.5, color: "var(--dim)" }}>{o.date} · {o.items.reduce((s, i) => s + i.count, 0)} items{o.split > 1 ? ` · split ${o.split} ways` : ""}{o.couponOff > 0 && <span style={{ color: "#7DE3A0" }}> · 🎟️ saved ${o.couponOff.toFixed(2)}</span>}</div>
                </div>
                <button className="btn btn-grad" style={{ padding: "8px 14px" }} onClick={() => { reorder(o); setTab("cart"); }}>↻ Reorder</button>
              </div>
              <div style={{ fontSize: 11.5, color: "var(--muted)", marginTop: 6, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {o.items.map((i) => i.n).join(", ")}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ---------------- SCANNER ---------------- */

const SCAN_MODES = [
  { id: "macros", name: "Meal macros", icon: "🍽️", desc: "Snap your plate — get calories, protein, carbs, fat, fiber, and sodium estimates.", prompt: "Analyze this photo of food. Estimate its nutrition. Respond ONLY with JSON, no markdown fences: {\"dish\":\"name\",\"cal\":0,\"protein\":0,\"carbs\":0,\"fat\":0,\"fiber\":0,\"sodium\":0,\"notes\":\"one short sentence\"} (numbers are per serving, grams except cal and sodium mg)." },
  { id: "fridge", name: "Fridge scan", icon: "🧊", desc: "Photograph your fridge or pantry — we'll invent meals from what you already have.", prompt: "This is a photo of the inside of a fridge or pantry. Identify visible ingredients and propose meals. Respond ONLY with JSON, no markdown fences: {\"found\":[\"ingredient\",...],\"meals\":[{\"name\":\"...\",\"uses\":[\"...\"],\"time\":\"20 min\"},... up to 3]}." },
  { id: "check", name: "Is it real?", icon: "🔍", desc: "Scan a food product to check if it's real, healthy, and good for consumption.", prompt: "This is a photo of a food product or meal. Assess it. Respond ONLY with JSON, no markdown fences: {\"item\":\"name\",\"real\":\"Yes/Likely/Unclear\",\"healthy\":\"score out of 10 with 1-line reason\",\"consume\":\"Good to eat / Caution / Avoid\",\"notes\":\"one short practical sentence\"}. Be honest about uncertainty from a photo alone." },
];

function ScannerScreen({ aiEnabled, pantry, setPantry }) {
  const [pantryInput, setPantryInput] = useState("");
  const [leftover, setLeftover] = useState("");
  const [remix, setRemix] = useState("");
  const [remixBusy, setRemixBusy] = useState(false);
  function addPantry(name) {
    const n = name.trim();
    if (!n) return;
    setPantry((p) => (p.some((x) => x.toLowerCase() === n.toLowerCase()) ? p : [...p, n]));
    setPantryInput("");
  }
  async function runRemix() {
    if (!leftover.trim() || remixBusy) return;
    setRemixBusy(true); setRemix("");
    try {
      const reply = await askClaude(
        [{ role: "user", content: `I have leftovers of: ${leftover}. ${pantry.length ? "My pantry also has: " + pantry.join(", ") + "." : ""} Give me exactly 3 quick leftover-remix ideas. Format each as "Name — one sentence how". No intro, no outro.` }],
        "You are GrubGrounds' leftover remix helper. Be practical, quick, and food-waste-conscious."
      );
      setRemix(reply || "Hmm, no ideas came back — try describing the leftovers differently.");
    } catch (e) { setRemix("Connection hiccup — try again in a moment."); }
    setRemixBusy(false);
  }
  const [mode, setMode] = useState("macros");
  const [img, setImg] = useState(null); // {b64, type, preview}
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState(null);
  const [err, setErr] = useState("");
  const [camOpen, setCamOpen] = useState(false);
  const [facing, setFacing] = useState("environment");
  const fileRef = useRef(null);
  const camFileRef = useRef(null); // fallback: file input that opens the camera on phones
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const m = SCAN_MODES.find((x) => x.id === mode);

  function pick(e) {
    const f = e.target.files?.[0];
    if (!f) return;
    setResult(null); setErr("");
    const r = new FileReader();
    r.onload = () => setImg({ b64: r.result.split(",")[1], type: f.type, preview: r.result });
    r.readAsDataURL(f);
    e.target.value = "";
  }

  function stopCam() {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
    setCamOpen(false);
  }
  useEffect(() => () => { streamRef.current?.getTracks().forEach((t) => t.stop()); }, []);

  async function openCamera(face = facing) {
    setErr("");
    if (!navigator.mediaDevices?.getUserMedia) { camFileRef.current?.click(); return; }
    try {
      streamRef.current?.getTracks().forEach((t) => t.stop());
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: face, width: { ideal: 1280 } }, audio: false });
      streamRef.current = stream;
      setFacing(face);
      setCamOpen(true);
      // attach after the video element mounts
      setTimeout(() => { if (videoRef.current) { videoRef.current.srcObject = stream; videoRef.current.play().catch(() => {}); } }, 50);
    } catch (e) {
      // permission denied or no camera — fall back to the native camera picker
      camFileRef.current?.click();
    }
  }

  function flipCamera() { openCamera(facing === "environment" ? "user" : "environment"); }

  function capture() {
    const v = videoRef.current;
    if (!v || !v.videoWidth) return;
    const scale = Math.min(1, 1280 / v.videoWidth);
    const c = document.createElement("canvas");
    c.width = Math.round(v.videoWidth * scale);
    c.height = Math.round(v.videoHeight * scale);
    c.getContext("2d").drawImage(v, 0, 0, c.width, c.height);
    const dataUrl = c.toDataURL("image/jpeg", 0.88);
    setImg({ b64: dataUrl.split(",")[1], type: "image/jpeg", preview: dataUrl });
    setResult(null);
    stopCam();
  }

  async function scan() {
    if (!img || busy) return;
    setBusy(true); setErr(""); setResult(null);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-6", max_tokens: 1000,
          messages: [{ role: "user", content: [
            { type: "image", source: { type: "base64", media_type: img.type, data: img.b64 } },
            { type: "text", text: m.prompt },
          ]}],
        }),
      });
      const data = await res.json();
      const text = (data.content || []).map((b) => b.text || "").join("").replace(/```json|```/g, "").trim();
      setResult({ mode, data: JSON.parse(text) });
    } catch (e) {
      setErr("Couldn't read that one — try a clearer, well-lit photo.");
    }
    setBusy(false);
  }

  return (
    <div style={{ maxWidth: 680, margin: "0 auto" }}>
      <div className="eyebrow">Food Scanner · <span style={{ color: "var(--royal-soft)" }}>Plus</span></div>
      <h1 className="h-page">{T("scanT")}</h1>
      <p className="sub" style={{ marginBottom: 18 }}>One camera, three superpowers: macros from a plate, meals from a fridge, and a reality check on any product.</p>

      {!aiEnabled && <div className="card" style={{ padding: 16, marginBottom: 16, fontSize: 13, color: "var(--muted)" }}>⚠ The scanner uses the AI assistant. Turn it back on in Settings to scan.</div>}

      <div style={{ display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", marginBottom: 18 }}>
        {SCAN_MODES.map((s) => (
          <button key={s.id} className="card" style={{ padding: 16, textAlign: "left", borderColor: mode === s.id ? "var(--royal)" : "var(--line)", background: mode === s.id ? "var(--panel2)" : "var(--panel)" }} onClick={() => { setMode(s.id); setResult(null); }}>
            <div style={{ fontSize: 26, marginBottom: 8 }}>{s.icon}</div>
            <b style={{ fontSize: 13.5, display: "block", marginBottom: 4 }}>{s.name}</b>
            <span style={{ fontSize: 11.5, color: "var(--dim)", lineHeight: 1.5 }}>{s.desc}</span>
          </button>
        ))}
      </div>

      <div className="card" style={{ padding: 20, textAlign: "center" }}>
        <input ref={fileRef} type="file" accept="image/*" onChange={pick} style={{ display: "none" }} />
        <input ref={camFileRef} type="file" accept="image/*" capture="environment" onChange={pick} style={{ display: "none" }} />
        {!img ? (
          <div style={{ padding: "26px 0" }}>
            <div style={{ fontSize: 42, marginBottom: 10 }}>📸</div>
            <p className="sub" style={{ marginBottom: 16 }}>Snap it live or upload a photo for <b style={{ color: "var(--white)" }}>{m.name}</b></p>
            <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
              <button className="btn btn-grad" onClick={() => openCamera()} disabled={!aiEnabled}>📷 Use camera</button>
              <button className="btn btn-ghost" onClick={() => fileRef.current.click()} disabled={!aiEnabled}>🖼️ Upload photo</button>
            </div>
          </div>
        ) : (
          <>
            <img src={img.preview} alt="Your photo" style={{ maxHeight: 240, margin: "0 auto 14px", borderRadius: 14, maxWidth: "100%" }} />
            <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap" }}>
              <button className="btn btn-grad" onClick={scan} disabled={busy || !aiEnabled}>{busy ? "Scanning…" : `Run ${m.name}`}</button>
              <button className="btn btn-ghost" onClick={() => openCamera()}>📷 Retake</button>
              <button className="btn btn-ghost" onClick={() => { setImg(null); setResult(null); }}>Remove</button>
            </div>
          </>
        )}
        {err && <p style={{ color: "#FF7A9C", fontSize: 13, marginTop: 12 }}>{err}</p>}
      </div>

      {camOpen && (
        <div className="ovl" onClick={stopCam}>
          <div className="modal" style={{ padding: 16, textAlign: "center", background: "#000" }} onClick={(e) => e.stopPropagation()}>
            <video ref={videoRef} autoPlay playsInline muted style={{ width: "100%", maxHeight: "62vh", borderRadius: 14, background: "#000", transform: facing === "user" ? "scaleX(-1)" : "none" }} />
            <div style={{ display: "flex", gap: 10, justifyContent: "center", marginTop: 14, flexWrap: "wrap" }}>
              <button className="btn btn-grad" style={{ fontSize: 15, padding: "12px 26px" }} onClick={capture}>⚪ Capture</button>
              <button className="btn btn-ghost" onClick={flipCamera}>🔄 Flip</button>
              <button className="btn btn-ghost" onClick={stopCam}>Cancel</button>
            </div>
            <p className="sub" style={{ fontSize: 11.5, marginTop: 10 }}>Point the camera at your {mode === "fridge" ? "open fridge or pantry" : mode === "check" ? "product or label" : "plate"} and tap Capture.</p>
          </div>
        </div>
      )}

      {result?.mode === "macros" && (
        <div className="card" style={{ padding: 18, marginTop: 16 }}>
          <div className="eyebrow">Scan result</div>
          <h3 style={{ fontSize: 16, margin: "4px 0 12px" }}>{result.data.dish}</h3>
          <MacroRow m={result.data} />
          <p className="sub" style={{ marginTop: 12 }}>{result.data.notes}</p>
        </div>
      )}
      {result?.mode === "fridge" && (
        <div className="card" style={{ padding: 18, marginTop: 16 }}>
          <div className="eyebrow">Found in your fridge</div>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", margin: "8px 0 10px" }}>
            {result.data.found.map((f, i) => <span key={i} className="pill-sm tag-dark">{f}</span>)}
          </div>
          <button className="chip" style={{ marginBottom: 14 }} onClick={() => { setPantry((p) => { const merged = [...p]; result.data.found.forEach((f) => { if (!merged.some((x) => x.toLowerCase() === f.toLowerCase())) merged.push(f); }); return merged; }); }}>🧺 Save all to my pantry</button>
          <div className="eyebrow">Meals you could make</div>
          {result.data.meals.map((ml, i) => (
            <div key={i} style={{ padding: "10px 0", borderBottom: i < result.data.meals.length - 1 ? "1px solid var(--line)" : "none" }}>
              <b style={{ fontSize: 14 }}>{ml.name}</b> <span className="pill-sm" style={{ background: "var(--panel2)", color: "var(--muted)", marginLeft: 6 }}>⏱ {ml.time}</span>
              <div style={{ fontSize: 12.5, color: "var(--muted)", marginTop: 4 }}>Uses: {ml.uses.join(", ")}</div>
            </div>
          ))}
        </div>
      )}
      <div className="card" style={{ padding: 18, marginTop: 16 }}>
        <div className="eyebrow" style={{ marginBottom: 4 }}>🧺 My pantry</div>
        <p className="sub" style={{ fontSize: 12, marginBottom: 10 }}>Track what you have — recipes will show "you already have X of Y ingredients."</p>
        <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
          <input className="inp" style={{ padding: "9px 12px" }} placeholder="Add an item (e.g. eggs, rice, garlic)" value={pantryInput} onChange={(e) => setPantryInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && addPantry(pantryInput)} />
          <button className="btn btn-ghost" style={{ padding: "9px 14px" }} onClick={() => addPantry(pantryInput)}>Add</button>
        </div>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {pantry.length === 0 && <span className="sub" style={{ fontSize: 12 }}>Nothing tracked yet — add items above or run a fridge scan and save the finds.</span>}
          {pantry.map((p) => <button key={p} className="chip" title="Tap to remove" onClick={() => setPantry((ps) => ps.filter((x) => x !== p))}>{p} ✕</button>)}
        </div>
      </div>

      <div className="card" style={{ padding: 18, marginTop: 16 }}>
        <div className="eyebrow" style={{ marginBottom: 4 }}>♻️ Leftover remix <span style={{ color: "var(--royal-soft)" }}>· Plus</span></div>
        <p className="sub" style={{ fontSize: 12, marginBottom: 10 }}>Tell us what you cooked — get three ideas to turn the leftovers into tomorrow's meal instead of waste.</p>
        <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
          <input className="inp" style={{ padding: "9px 12px" }} placeholder='e.g. "cajun salmon pasta" or "half a rotisserie chicken"' value={leftover} onChange={(e) => setLeftover(e.target.value)} onKeyDown={(e) => e.key === "Enter" && runRemix()} disabled={!aiEnabled} />
          <button className="btn btn-grad" style={{ padding: "9px 14px" }} onClick={runRemix} disabled={remixBusy || !aiEnabled}>{remixBusy ? "Thinking…" : "Remix"}</button>
        </div>
        {remix && <div style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.6, whiteSpace: "pre-wrap" }}>{remix}</div>}
      </div>

      {result?.mode === "check" && (
        <div className="card" style={{ padding: 18, marginTop: 16 }}>
          <div className="eyebrow">Product check</div>
          <h3 style={{ fontSize: 16, margin: "4px 0 12px" }}>{result.data.item}</h3>
          <div style={{ display: "flex", gap: 18, flexWrap: "wrap", marginBottom: 12 }}>
            <div className="stat"><b>{result.data.real}</b><span>Real food?</span></div>
            <div className="stat"><b style={{ fontSize: 14 }}>{result.data.healthy}</b><span>Health score</span></div>
            <div className="stat"><b style={{ fontSize: 14 }}>{result.data.consume}</b><span>Verdict</span></div>
          </div>
          <p className="sub">{result.data.notes}</p>
        </div>
      )}
    </div>
  );
}

/* ---------------- PLANS (dietary + macros) ---------------- */

function PlansScreen({ openRecipe, saved, onSave, planner, setPlanner, addWeekToCart, cookedLog }) {
  const TARGETS = { cal: 2200, protein: 120 };
  const dayMacros = (dateStr) => cookedLog.filter((e) => e.d === dateStr).reduce((t, e) => {
    const r = allRecipes().find((x) => x.id === e.id);
    return r ? { cal: t.cal + r.macros.cal, protein: t.protein + r.macros.protein, carbs: t.carbs + r.macros.carbs, fat: t.fat + r.macros.fat } : t;
  }, { cal: 0, protein: 0, carbs: 0, fat: 0 });
  const today = dayMacros(todayStr());
  const week = [...Array(7)].map((_, i) => { const d = new Date(); d.setDate(d.getDate() - (6 - i)); const ds = d.toISOString().slice(0, 10); return { label: d.toLocaleDateString(undefined, { weekday: "short" }).slice(0, 2), cal: dayMacros(ds).cal, isToday: ds === todayStr() }; });
  const maxCal = Math.max(TARGETS.cal, ...week.map((w) => w.cal));
  const [goal, setGoal] = useState(null);
  const [pickDay, setPickDay] = useState(null);
  const plannedIds = Object.values(planner).flat();
  const weekCost = plannedIds.reduce((s, id) => { const r = allRecipes().find((x) => x.id === id); return s + (r ? r.ingredients.reduce((a, i) => a + i.price, 0) : 0); }, 0);
  function assign(day, rid) { setPlanner((p) => ({ ...p, [day]: [...(p[day] || []), rid] })); setPickDay(null); }
  function unassign(day, idx) { setPlanner((p) => ({ ...p, [day]: p[day].filter((_, i) => i !== idx) })); }
  const [custom, setCustom] = useState([]); // recipe ids
  const [customName, setCustomName] = useState("");
  const [building, setBuilding] = useState(false);

  const matches = goal ? allRecipes().filter(PLAN_GOALS.find((g) => g.id === goal).rule) : [];
  const customRecipes = allRecipes().filter((r) => custom.includes(r.id));
  const totals = customRecipes.reduce((t, r) => ({ cal: t.cal + r.macros.cal, protein: t.protein + r.macros.protein, carbs: t.carbs + r.macros.carbs, fat: t.fat + r.macros.fat, fiber: t.fiber + r.macros.fiber, sodium: t.sodium + r.macros.sodium }), { cal: 0, protein: 0, carbs: 0, fat: 0, fiber: 0, sodium: 0 });

  return (
    <div style={{ maxWidth: 760, margin: "0 auto" }}>
      <div className="eyebrow">Dietary plans & macros · <span style={{ color: "var(--royal-soft)" }}>custom plans are Plus</span></div>
      <h1 className="h-page">{T("plansT")}</h1>
      <p className="sub" style={{ marginBottom: 18 }}>Pick a health goal and we'll surface the meals that get you there — or build your own custom plan and watch the macros add up.</p>

      <Disclosure icon="📊" summary={today.cal > 0 ? <span>Today: <b>{today.cal} cal · {today.protein}g protein</b> — tap for the week</span> : "Nutrition tracker — fills in as you cook"}>
        {today.cal === 0
          ? <p className="sub" style={{ fontSize: 12.5 }}>Nothing logged yet today — tap "✅ I cooked this" on a recipe and it lands here automatically.</p>
          : <div style={{ display: "flex", gap: 18, flexWrap: "wrap", marginTop: 8 }}>
              <div className="stat"><b style={{ color: today.cal > TARGETS.cal ? "#F5C542" : "#7DE3A0" }}>{today.cal}</b><span>/ {TARGETS.cal} cal</span></div>
              <div className="stat"><b>{today.protein}g</b><span>/ {TARGETS.protein}g protein</span></div>
              <div className="stat"><b>{today.carbs}g</b><span>carbs</span></div>
              <div className="stat"><b>{today.fat}g</b><span>fat</span></div>
            </div>}
        <div style={{ display: "flex", alignItems: "flex-end", gap: 8, height: 74, marginTop: 16 }}>
          {week.map((w, i) => (
            <div key={i} style={{ flex: 1, textAlign: "center" }}>
              <div style={{ height: 54, display: "flex", alignItems: "flex-end", justifyContent: "center" }}>
                <div style={{ width: "70%", height: Math.max(3, (w.cal / maxCal) * 54), borderRadius: 5, background: w.isToday ? "var(--grad)" : "var(--line)" }} title={w.cal + " cal"} />
              </div>
              <div style={{ fontSize: 9.5, color: w.isToday ? "var(--white)" : "var(--dim)", marginTop: 4 }}>{w.label}</div>
            </div>
          ))}
        </div>
      </Disclosure>

      <div className="card" style={{ padding: 18, marginBottom: 20 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10, marginBottom: 12 }}>
          <div>
            <div className="eyebrow">Weekly meal planner</div>
            <p className="sub" style={{ fontSize: 12 }}>Drop recipes onto days, then fill the whole week's cart in one tap.</p>
          </div>
          <button className="btn btn-grad" onClick={addWeekToCart} disabled={!plannedIds.length}>🛒 Add week to cart{plannedIds.length ? ` · ~$${weekCost.toFixed(0)}` : ""}</button>
        </div>
        {plannedIds.length === 0 && (
          <div style={{ padding: "10px 12px", background: "var(--panel2)", borderRadius: 12, marginBottom: 12, display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
            <span style={{ fontSize: 12.5, color: "var(--muted)", flex: 1, minWidth: 180 }}>Empty week, endless options. Want us to drop in 3 easy dinners to get you rolling?</span>
            <button className="chip on" onClick={() => { const easy = allRecipes().filter((r) => r.level === "Beginner" && r.cat !== "drink").slice(0, 3); setPlanner({ Mon: easy[0] ? [easy[0].id] : [], Wed: easy[1] ? [easy[1].id] : [], Fri: easy[2] ? [easy[2].id] : [] }); }}>✨ Plan 3 easy dinners</button>
          </div>
        )}
        <div style={{ display: "grid", gap: 8, gridTemplateColumns: "repeat(auto-fit,minmax(118px,1fr))" }}>
          {WEEK_DAYS.map((d) => (
            <div key={d} style={{ background: "var(--panel2)", border: "1px solid var(--line)", borderRadius: 12, padding: 10, minHeight: 96 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "var(--dim)", letterSpacing: ".08em", marginBottom: 8 }}>{d.toUpperCase()}</div>
              {(planner[d] || []).map((rid, i) => {
                const r = allRecipes().find((x) => x.id === rid);
                return r ? <button key={i} className="chip" style={{ display: "block", width: "100%", marginBottom: 6, textAlign: "left", fontSize: 11 }} title="Tap to remove" onClick={() => unassign(d, i)}>{r.emoji} {r.name.length > 16 ? r.name.slice(0, 15) + "…" : r.name} ✕</button> : null;
              })}
              <button className="chip" style={{ width: "100%", fontSize: 12, borderStyle: "dashed" }} onClick={() => setPickDay(pickDay === d ? null : d)}>＋ meal</button>
            </div>
          ))}
        </div>
        {pickDay && (
          <div style={{ marginTop: 12 }}>
            <div className="eyebrow" style={{ marginBottom: 6 }}>Pick a meal for {pickDay}</div>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {allRecipes().map((r) => <button key={r.id} className="chip" onClick={() => assign(pickDay, r.id)}>{r.emoji} {r.name}</button>)}
            </div>
          </div>
        )}
      </div>

      <div style={{ display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))", marginBottom: 20 }}>
        {PLAN_GOALS.map((g) => (
          <button key={g.id} className="card" style={{ padding: 16, textAlign: "left", borderColor: goal === g.id ? "var(--royal)" : "var(--line)" }} onClick={() => setGoal(goal === g.id ? null : g.id)}>
            <div style={{ fontSize: 24, marginBottom: 6 }}>{g.emoji}</div>
            <b style={{ fontSize: 13.5, display: "block", marginBottom: 4 }}>{g.name}</b>
            <span style={{ fontSize: 11.5, color: "var(--dim)", lineHeight: 1.5 }}>{g.desc}</span>
          </button>
        ))}
      </div>

      {goal && (
        <>
          <div className="eyebrow" style={{ marginBottom: 8 }}>{PLAN_GOALS.find((g) => g.id === goal).name} · {matches.length} matching meal{matches.length !== 1 ? "s" : ""}</div>
          <div className="grid" style={{ marginBottom: 24 }}>
            {matches.map((r) => <RecipeCard key={r.id} r={r} onOpen={openRecipe} saved={saved.some((s) => s.id === r.id)} onSave={onSave} />)}
          </div>
        </>
      )}

      <div className="card" style={{ padding: 18 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10 }}>
          <div>
            <div className="eyebrow">Custom plan builder</div>
            <p className="sub">Hand-pick your day of meals and see total macros live.</p>
          </div>
          <button className="btn btn-ghost" onClick={() => setBuilding(!building)}>{building ? "Done picking" : "＋ Pick meals"}</button>
        </div>

        {building && (
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 14 }}>
            {allRecipes().map((r) => (
              <button key={r.id} className={"chip" + (custom.includes(r.id) ? " on" : "")} onClick={() => setCustom((c) => (c.includes(r.id) ? c.filter((x) => x !== r.id) : [...c, r.id]))}>{r.emoji} {r.name}</button>
            ))}
          </div>
        )}

        {customRecipes.length > 0 && (
          <>
            <hr className="hr" />
            <input className="inp" style={{ marginBottom: 14, maxWidth: 300 }} placeholder="Name your plan (e.g. Cut week 1)" value={customName} onChange={(e) => setCustomName(e.target.value)} />
            <div className="eyebrow" style={{ marginBottom: 8 }}>{customName || "Your plan"} · day totals</div>
            <MacroRow m={{ ...totals, cal: totals.cal }} />
            <div style={{ marginTop: 12, fontSize: 12.5, color: "var(--muted)" }}>
              {customRecipes.map((r) => r.emoji + " " + r.name).join("  ·  ")}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

/* ---------------- GALLERY ---------------- */

function GalleryScreen({ saved, setSaved, openRecipe, goDiscover }) {
  const [activeCol, setActiveCol] = useState("All");
  const [newCol, setNewCol] = useState("");
  const [adding, setAdding] = useState(false);
  const cols = ["All", ...Array.from(new Set(saved.map((s) => s.col).filter(Boolean)))];
  const visible = activeCol === "All" ? saved : saved.filter((s) => s.col === activeCol);
  return (
    <div>
      <div className="eyebrow">Gallery</div>
      <h1 className="h-page">{T("galT")}</h1>
      <p className="sub" style={{ marginBottom: 14 }}>Everything you've bookmarked to make later — plus your own recipes. Organize into collections, flip anything public or private.</p>

      <div className="scroll-x" style={{ marginBottom: 16 }}>
        {cols.map((c) => <button key={c} className={"chip" + (activeCol === c ? " on" : "")} onClick={() => setActiveCol(c)}>{c === "All" ? "📚 All" : "📁 " + c}</button>)}
        {!adding
          ? <button className="chip" style={{ borderStyle: "dashed" }} onClick={() => setAdding(true)}>＋ New collection</button>
          : <span style={{ display: "flex", gap: 6 }}>
              <input className="inp" style={{ padding: "6px 10px", width: 150, fontSize: 12 }} placeholder="Collection name" value={newCol} onChange={(e) => setNewCol(e.target.value)} autoFocus
                onKeyDown={(e) => { if (e.key === "Enter" && newCol.trim()) { setActiveCol(newCol.trim()); setAdding(false); setNewCol(""); } }} />
              <button className="chip" onClick={() => { if (newCol.trim()) { setActiveCol(newCol.trim()); } setAdding(false); setNewCol(""); }}>✓</button>
            </span>}
      </div>
      {activeCol !== "All" && visible.length === 0 && <p className="sub" style={{ marginBottom: 14 }}>"{activeCol}" is empty — assign saved recipes to it using the 📁 selector on any card below (switch to All to see them).</p>}
      {saved.length === 0 && (
        <div className="card" style={{ padding: 28, textAlign: "center" }}>
          <div style={{ fontSize: 38, marginBottom: 10 }}>📑</div>
          <p className="sub" style={{ marginBottom: 12 }}>Nothing saved yet — your gallery fills up as you bookmark recipes you want to make.</p>
          <button className="btn btn-grad" onClick={goDiscover}>Browse Discover →</button>
        </div>
      )}
      <div className="grid">
        {visible.map((s) => {
          const r = allRecipes().find((x) => x.id === s.id);
          return (
            <div key={s.id} className="card rcard">
              <div className="rhero" style={{ background: `linear-gradient(135deg, ${r.grad[0]}, ${r.grad[1]})` }} onClick={() => openRecipe(r)}>
                <span>{r.emoji}</span>
              </div>
              <div style={{ padding: "12px 14px" }}>
                <b style={{ fontSize: 13.5, display: "block", marginBottom: 8 }}>{r.name}</b>
                <div style={{ display: "flex", gap: 6, alignItems: "center", flexWrap: "wrap" }}>
                  <button className={"chip" + (s.pub ? " on" : "")} onClick={() => setSaved((sv) => sv.map((x) => (x.id === s.id ? { ...x, pub: !x.pub } : x)))}>
                    {s.pub ? "🌍 Public" : "🔒 Private"}
                  </button>
                  <select className="chip" style={{ background: "var(--panel)", maxWidth: 110 }} value={s.col || ""} onChange={(e) => setSaved((sv) => sv.map((x) => (x.id === s.id ? { ...x, col: e.target.value || undefined } : x)))} aria-label="Collection">
                    <option value="">📁 None</option>
                    {cols.filter((c) => c !== "All").map((c) => <option key={c} value={c}>📁 {c}</option>)}
                    {activeCol !== "All" && !cols.includes(activeCol) && <option value={activeCol}>📁 {activeCol}</option>}
                  </select>
                  <button className="chip" onClick={() => setSaved((sv) => sv.filter((x) => x.id !== s.id))}>✕</button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ---------------- FRIENDS ---------------- */

const DM_REPLIES = [
  "Yesss I was just thinking about this 😂",
  "Okay say less — sending you what I made last night",
  "We're cooking together this weekend, no excuses 🍳",
  "LOL the streak is carrying me right now 🔥",
];

function FriendsScreen({ friends, setFriends, dms, setDms }) {
  const refCode = "GRUB-LATIF";
  const [chat, setChat] = useState(null); // handle being chatted with
  const [draft, setDraft] = useState("");
  const endRef = useRef(null);
  useEffect(() => { endRef.current && endRef.current.scrollIntoView({ behavior: "smooth" }); }, [dms, chat]);

  const personOf = (h) => friends.find((f) => f.handle === h);
  const convo = chat ? (dms[chat] || { msgs: [], accepted: !!(personOf(chat) && personOf(chat).friend) }) : null;
  const sentCount = convo ? convo.msgs.filter((m) => m.from === "you").length : 0;
  const mutual = chat ? !!(personOf(chat) && personOf(chat).friend) : false;
  const accepted = convo ? (convo.accepted || mutual) : false;
  const capped = !accepted && sentCount >= 3;

  function send() {
    const t = draft.trim();
    if (!t || capped) return;
    setDms((d) => {
      const cur = d[chat] || { msgs: [], accepted: mutual };
      if (!(cur.accepted || mutual) && cur.msgs.filter((m) => m.from === "you").length >= 3) return d;
      return { ...d, [chat]: { ...cur, msgs: [...cur.msgs, { from: "you", t, time: "now" }] } };
    });
    setDraft("");
    if (accepted || mutual) {
      const reply = DM_REPLIES[sentCount % DM_REPLIES.length];
      setTimeout(() => setDms((d) => ({ ...d, [chat]: { ...d[chat], msgs: [...d[chat].msgs, { from: chat, t: reply, time: "now" }] } })), 1400);
    }
  }
  function simAccept() {
    setDms((d) => ({ ...d, [chat]: { ...(d[chat] || { msgs: [] }), accepted: true, msgs: [...((d[chat] && d[chat].msgs) || []), { from: chat, t: "Hey! Accepting your message request 🙌 what's up?", time: "now" }] } }));
  }

  if (chat) {
    const p = personOf(chat) || { name: "@" + chat, handle: chat, emoji: "🧑‍🍳" };
    return (
      <div style={{ maxWidth: 620, margin: "0 auto" }}>
        <button className="chip" style={{ marginBottom: 14 }} onClick={() => setChat(null)}>← Friends</button>
        <div className="card" style={{ padding: 14, marginBottom: 14, display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: 26 }}>{p.emoji}</span>
          <div style={{ flex: 1 }}>
            <b style={{ fontSize: 14 }}>{p.name}</b>
            <div style={{ fontSize: 11.5, color: "var(--dim)" }}>@{p.handle} · {mutual ? "Friends ✓" : accepted ? "Request accepted ✓" : `Message request · ${sentCount}/3 sent`}</div>
          </div>
        </div>

        {!accepted && (
          <div className="card" style={{ padding: "12px 14px", marginBottom: 14, borderColor: capped ? "#FF7A9C" : "var(--line)" }}>
            <p className="sub" style={{ fontSize: 12 }}>
              {capped
                ? "You've used all 3 request messages. The composer unlocks when they accept your request."
                : `@${p.handle} doesn't follow you back yet, so this lands as a message request — you can send up to 3 messages until they accept.`}
            </p>
            <button className="chip" style={{ marginTop: 8 }} onClick={simAccept}>Simulate their accept (demo)</button>
          </div>
        )}

        <div className="card" style={{ padding: 16, marginBottom: 14, minHeight: 220, display: "flex", flexDirection: "column", gap: 8 }}>
          {convo.msgs.length === 0 && <p className="sub" style={{ margin: "auto" }}>No messages yet — say hi 👋</p>}
          {convo.msgs.map((m, i) => (
            <div key={i} className={"bubble " + (m.from === "you" ? "me" : "ai")}>{m.t}</div>
          ))}
          <div ref={endRef} />
        </div>

        <div style={{ display: "flex", gap: 8 }}>
          <input className="inp" placeholder={capped ? "Waiting for them to accept…" : "Message " + p.name.split(" ")[0] + "…"} value={draft} onChange={(e) => setDraft(e.target.value)} onKeyDown={(e) => e.key === "Enter" && send()} disabled={capped} />
          <button className="btn btn-grad" onClick={send} disabled={capped}>Send</button>
        </div>
      </div>
    );
  }
  const mine = friends.filter((f) => f.friend);
  const sugg = friends.filter((f) => !f.friend);
  return (
    <div style={{ maxWidth: 620, margin: "0 auto" }}>
      <div className="eyebrow">Friends</div>
      <h1 className="h-page">{T("frT")}</h1>
      <p className="sub" style={{ marginBottom: 18 }}>Send posts, recipes, and dishes you want to make — straight to the people you cook for.</p>

      <div className="card" style={{ padding: 18, marginBottom: 18, background: "linear-gradient(120deg, rgba(31,169,244,.12), rgba(104,18,181,.16))", borderColor: "var(--royal)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
          <div style={{ fontSize: 30 }}>🎁</div>
          <div style={{ flex: 1, minWidth: 200 }}>
            <b style={{ fontSize: 14 }}>Invite friends, both of you win</b>
            <p className="sub" style={{ fontSize: 12 }}>They get a free month of GrubPlus, you get a delivery-fee credit. Share your code:</p>
          </div>
          <button className="btn btn-grad" onClick={() => { navigator.clipboard?.writeText(refCode); }}
            title="Copy referral code">{refCode} · Copy</button>
        </div>
      </div>

      <div className="eyebrow" style={{ marginBottom: 8 }}>Friends · {mine.length}</div>
      {mine.map((f) => (
        <div key={f.id} className="card" style={{ padding: 14, marginBottom: 10, display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ fontSize: 26 }}>{f.emoji}</div>
          <div style={{ flex: 1 }}>
            <b style={{ fontSize: 13.5 }}>{f.name}</b>
            <div style={{ fontSize: 11.5, color: "var(--dim)" }}>@{f.handle} · {f.status}</div>
          </div>
          <button className="chip" onClick={() => setChat(f.handle)}>💬 Message</button>
        </div>
      ))}

      <div className="eyebrow" style={{ margin: "20px 0 8px" }}>Suggested foodies</div>
      {sugg.map((f) => (
        <div key={f.id} className="card" style={{ padding: 14, marginBottom: 10, display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ fontSize: 26 }}>{f.emoji}</div>
          <div style={{ flex: 1 }}>
            <b style={{ fontSize: 13.5 }}>{f.name}</b>
            <div style={{ fontSize: 11.5, color: "var(--dim)" }}>@{f.handle} · {f.status}</div>
          </div>
          <button className="chip" onClick={() => setChat(f.handle)} title="They don't follow you yet — you can send up to 3 request messages">💬</button>
          <button className="btn btn-grad" style={{ padding: "8px 14px" }} onClick={() => setFriends((fs) => fs.map((x) => (x.id === f.id ? { ...x, friend: true } : x)))}>＋ Add</button>
        </div>
      ))}
    </div>
  );
}

/* ---------------- ACCOUNT / AUTH ----------------
   NOTE: login is currently DISABLED. This screen is kept ready for when
   accounts move to a real backend (e.g. Supabase Auth). To re-enable,
   restore the auth gate in the App component (see note there). */

function AuthScreen({ onAuth }) {
  const hasAccount = !!persist.get("gg_user");
  const [mode, setMode] = useState(hasAccount ? "login" : "signup");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [err, setErr] = useState("");

  function submit() {
    setErr("");
    if (mode === "signup") {
      if (name.trim().length < 2) return setErr("Tell us your name — it's how friends will find you.");
      if (!email.includes("@") || email.length < 5) return setErr("That email doesn't look right.");
      if (pw.length < 6) return setErr("Password needs at least 6 characters.");
      const user = { name: name.trim(), email: email.trim().toLowerCase(), joined: new Date().toISOString().slice(0, 10) };
      persist.set("gg_user", JSON.stringify(user));
      persist.set("gg_cred", btoa(pw)); // demo credential — a real launch uses a proper auth backend
      onAuth(user);
    } else {
      let saved = null;
      try { saved = JSON.parse(persist.get("gg_user")); } catch (e) {}
      if (!saved) return setErr("No account found on this device yet — create one below.");
      if (saved.email !== email.trim().toLowerCase()) return setErr("That email doesn't match this device's account.");
      if (persist.get("gg_cred") !== btoa(pw)) return setErr("Wrong password — try again.");
      onAuth(saved);
    }
  }

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 18, background: "linear-gradient(135deg, #040407 0%, #3E0D68 40%, #6812B5 70%, #0E7FD0 100%)" }}>
      <div className="card" style={{ width: "min(420px,100%)", padding: 28, textAlign: "center", background: "rgba(16,16,26,.92)", backdropFilter: "blur(8px)" }}>
        <img src={APP_ICON} alt="GrubGrounds" width="76" height="76" style={{ borderRadius: 18, margin: "0 auto 12px" }} />
        <h1 className="disp" style={{ fontSize: 22, marginBottom: 4 }}>Grub<span style={{ background: "var(--grad)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>Grounds</span></h1>
        <p className="sub" style={{ marginBottom: 20 }}>{mode === "signup" ? "Create your account to start sharing the love of food." : "Welcome back — good to see you again."}</p>

        {mode === "signup" && <input className="inp" style={{ marginBottom: 10 }} placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" />}
        <input className="inp" style={{ marginBottom: 10 }} type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
        <input className="inp" style={{ marginBottom: 14 }} type="password" placeholder={mode === "signup" ? "Create a password (6+ characters)" : "Password"} value={pw} onChange={(e) => setPw(e.target.value)} onKeyDown={(e) => e.key === "Enter" && submit()} autoComplete={mode === "signup" ? "new-password" : "current-password"} />
        {err && <p style={{ color: "#FF7A9C", fontSize: 12.5, marginBottom: 12 }}>{err}</p>}

        <button className="btn btn-grad" style={{ width: "100%", marginBottom: 12 }} onClick={submit}>{mode === "signup" ? "Create account →" : "Log in →"}</button>
        <button className="chip" onClick={() => { setMode(mode === "signup" ? "login" : "signup"); setErr(""); }}>
          {mode === "signup" ? "Already have an account? Log in" : "New here? Create an account"}
        </button>
        <p className="sub" style={{ fontSize: 10.5, marginTop: 16 }}>Demo build: your account lives on this device only. A production launch would use secure server-side accounts.</p>
      </div>
    </div>
  );
}

/* ---------------- TUTORIAL + SHARE MODAL + SETTINGS ---------------- */

function Tutorial({ onClose }) {
  const [i, setI] = useState(0);
  const s = TUTORIAL_STEPS[i];
  return (
    <div className="ovl" onClick={onClose}>
      <div className="modal" style={{ padding: 28, textAlign: "center" }} onClick={(e) => e.stopPropagation()}>
        <div style={{ fontSize: 46, marginBottom: 12 }}>{s.icon === "logo" ? <img src={APP_ICON} alt="GrubGrounds" width="84" height="84" style={{ borderRadius: 20, display: "inline-block" }} /> : s.icon}</div>
        <h2 style={{ fontSize: 18, marginBottom: 10 }}>{s.title}</h2>
        <p className="sub" style={{ marginBottom: 20 }}>{s.body}</p>
        <div style={{ display: "flex", justifyContent: "center", gap: 6, marginBottom: 20 }}>
          {TUTORIAL_STEPS.map((_, j) => <span key={j} style={{ width: j === i ? 22 : 7, height: 7, borderRadius: 99, background: j === i ? "var(--royal)" : "var(--line)", transition: "all .2s" }} />)}
        </div>
        <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
          <button className="btn btn-ghost" onClick={onClose}>Skip tutorial</button>
          {i < TUTORIAL_STEPS.length - 1
            ? <button className="btn btn-grad" onClick={() => setI(i + 1)}>Next →</button>
            : <button className="btn btn-grad" onClick={onClose}>Start cooking 🍳</button>}
        </div>
      </div>
    </div>
  );
}

function ShareModal({ item, friends, onClose }) {
  const [sent, setSent] = useState([]);
  return (
    <div className="ovl" onClick={onClose}>
      <div className="modal" style={{ padding: 24 }} onClick={(e) => e.stopPropagation()}>
        <h2 style={{ fontSize: 16, marginBottom: 4 }}>Share {item.type}</h2>
        <p className="sub" style={{ marginBottom: 16 }}>{item.label}</p>
        {friends.filter((f) => f.friend).map((f) => (
          <div key={f.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "9px 0", borderBottom: "1px solid var(--line)" }}>
            <span style={{ fontSize: 22 }}>{f.emoji}</span>
            <div style={{ flex: 1 }}>
              <b style={{ fontSize: 13 }}>{f.name}</b>
              <div style={{ fontSize: 11, color: "var(--dim)" }}>@{f.handle}</div>
            </div>
            <button className={"chip" + (sent.includes(f.id) ? " on" : "")} onClick={() => setSent((s) => [...s, f.id])} disabled={sent.includes(f.id)}>
              {sent.includes(f.id) ? "Sent ✓" : "Send"}
            </button>
          </div>
        ))}
        <button className="btn btn-ghost" style={{ width: "100%", marginTop: 16 }} onClick={onClose}>Done</button>
      </div>
    </div>
  );
}

function ProfileScreen({ profile, setProfile, posts, follows, saved, openRecipe, openMedia, badges, streak, allergies, setAllergies, goSettings }) {
  const ALLERGY_OPTS = ["dairy", "gluten", "egg", "fish", "soy", "sesame", "nuts"];
  const allergyChips = [...ALLERGY_OPTS, ...allergies.filter((a) => !ALLERGY_OPTS.includes(a))];
  const [customAllergy, setCustomAllergy] = useState("");
  function addCustomAllergy() {
    const n = customAllergy.trim().toLowerCase();
    if (n && !allergies.includes(n)) setAllergies((al) => [...al, n]);
    setCustomAllergy("");
  }
  const [tab, setTab] = useState("posts");
  const [editing, setEditing] = useState(false);
  const photoRef = useRef(null);
  const [photoErr, setPhotoErr] = useState("");
  const [rawPhoto, setRawPhoto] = useState(null); // original upload, for manual cropping
  const [cropOpen, setCropOpen] = useState(false);
  const [crop, setCrop] = useState({ z: 1, x: 50, y: 50 });
  const [cropBig, setCropBig] = useState(false);
  function applyCrop(c) {
    const img = new Image();
    img.onload = () => {
      const S = 256, cv = document.createElement("canvas");
      cv.width = S; cv.height = S;
      const side = Math.min(img.width, img.height) / c.z;
      const sx = (img.width - side) * c.x / 100, sy = (img.height - side) * c.y / 100;
      cv.getContext("2d").drawImage(img, sx, sy, side, side, 0, 0, S, S);
      setPf((x) => ({ ...x, photo: cv.toDataURL("image/jpeg", 0.82) }));
    };
    img.src = rawPhoto;
  }
  const [pf, setPf] = useState(profile);
  const myPosts = posts.filter((p) => p.user === "you" && !p.archived);
  const likedPosts = posts.filter((p) => p.liked && !p.archived);
  const savedRecipes = saved.map((s) => allRecipes().find((r) => r.id === s.id)).filter(Boolean);
  const followers = 128 + Math.floor(follows.length * 1.5);

  const MiniPost = ({ p }) => (
    <div className="card" style={{ padding: 14, marginBottom: 10 }}>
      <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
        {p.media && (
          <button onClick={() => openMedia(p.media)} style={{ flexShrink: 0 }}>
            {p.media.type === "video"
              ? <video src={p.media.url} muted playsInline style={{ width: 58, height: 58, objectFit: "cover", borderRadius: 10, background: "#000" }} />
              : <img src={p.media.url} alt="" style={{ width: 58, height: 58, objectFit: "cover", borderRadius: 10 }} />}
          </button>
        )}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 12.5, lineHeight: 1.5, overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>{p.user !== "you" && <b style={{ color: "var(--royal-soft)" }}>@{p.user} </b>}{p.caption || "(media post)"}</div>
          <div style={{ fontSize: 10.5, color: "var(--dim)", marginTop: 4 }}>♥ {p.likes.toLocaleString()} · 💬 {p.comments.length} · {p.time} ago{p.pinned && " · 📌"}{p.boosted && " · 🚀"}</div>
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ maxWidth: 560, margin: "0 auto" }}>
      <div className="card" style={{ padding: 20, marginBottom: 14 }}>
        <div style={{ display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" }}>
          <Avatar photo={profile.photo} emoji={profile.emoji} size={74} fs={36} />
          <div style={{ flex: 1, minWidth: 160 }}>
            <b style={{ fontSize: 17 }}>{profile.name}</b>
            <div style={{ fontSize: 12.5, color: "var(--royal-soft)" }}>@{profile.handle}</div>
            {profile.bio && <p className="sub" style={{ fontSize: 12.5, marginTop: 4 }}>{profile.bio}</p>}
          </div>
          <button className="chip" onClick={() => { setPf(profile); setEditing(!editing); }}>{editing ? "Close" : "✏️ Edit profile"}</button>
        </div>
        {editing && (
          <div style={{ marginTop: 14, borderTop: "1px solid var(--line)", paddingTop: 14 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
              <Avatar photo={pf.photo} emoji={pf.emoji} size={52} fs={26} />
              <label className="chip" style={{ cursor: "pointer" }}>📷 {pf.photo ? "Change" : "Photo or GIF"}
                <input type="file" accept="image/*,.gif" style={{ display: "none" }} onChange={(e) => {
                  const f = e.target.files && e.target.files[0]; e.target.value = "";
                  if (!f) return;
                  setPhotoErr("");
                  if (f.type === "image/gif") {
                    if (f.size > 1000000) { setPhotoErr("That GIF is " + (f.size / 1048576).toFixed(1) + " MB — animated avatars need to be under 1 MB."); return; }
                    const r = new FileReader();
                    r.onload = () => setPf((x) => ({ ...x, photo: String(r.result) }));
                    r.readAsDataURL(f);
                  } else {
                    const rr = new FileReader();
                    rr.onload = () => { setRawPhoto(String(rr.result)); setCrop({ z: 1, x: 50, y: 50 }); };
                    rr.readAsDataURL(f);
                    downscalePhoto(f, (d, err) => { if (err) setPhotoErr(err); else setPf((x) => ({ ...x, photo: d })); });
                  }
                }} />
              </label>
              {pf.photo && <button className="chip" onClick={() => setPf((x) => ({ ...x, photo: null }))}>✕ Remove</button>}
              {pf.photo && pf.photo.startsWith("data:image/gif") && <span className="pill-sm" style={{ background: "rgba(245,197,66,.15)", color: "#F5C542" }}>✨ Animated</span>}
            </div>
            {photoErr && <p style={{ color: "#FF7A9C", fontSize: 12, marginBottom: 8 }}>{photoErr}</p>}
            <p className="sub" style={{ fontSize: 10.5, marginBottom: 8 }}>Photos are auto-cropped square. Small GIFs (under 1 MB) stay animated.</p>
            {rawPhoto && pf.photo && !pf.photo.startsWith("data:image/gif") && (
              <div style={{ marginBottom: 10 }}>
                <button className="chip" onClick={() => setCropOpen(!cropOpen)}>✂️ {cropOpen ? "Done cropping" : "Adjust crop yourself"}</button>
                {cropOpen && (
                  <div style={{ marginTop: 10, padding: "12px 14px", background: "var(--panel2)", borderRadius: 12 }}>
                    <div onClick={() => setCropBig(!cropBig)} title="Tap to zoom the preview" style={{ width: cropBig ? "min(78vw, 300px)" : 110, height: cropBig ? "min(78vw, 300px)" : 110, borderRadius: "50%", margin: "0 auto 8px", backgroundImage: `url(${rawPhoto})`, backgroundSize: `${crop.z * 100}%`, backgroundPosition: `${crop.x}% ${crop.y}%`, border: "2px solid var(--royal)", cursor: "zoom-in", transition: "width .2s, height .2s" }} />
                    <p className="sub" style={{ fontSize: 10.5, textAlign: "center", marginBottom: 10 }}>🔍 Tap the circle to {cropBig ? "shrink" : "enlarge"} the preview</p>
                    {[["z", "Zoom", 1, 3, 0.05], ["x", "Left ↔ Right", 0, 100, 1], ["y", "Up ↕ Down", 0, 100, 1]].map(([k, lb, mn, mx, stp]) => (
                      <label key={k} style={{ display: "block", fontSize: 11.5, color: "var(--dim)", marginBottom: 6 }}>{lb}
                        <input type="range" min={mn} max={mx} step={stp} value={crop[k]} style={{ width: "100%" }} onChange={(e) => { const c = { ...crop, [k]: +e.target.value }; setCrop(c); applyCrop(c); }} />
                      </label>
                    ))}
                    <p className="sub" style={{ fontSize: 10.5 }}>The circle above is exactly what your avatar will show — auto-crop stays until you move a slider.</p>
                  </div>
                )}
              </div>
            )}
            <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
              <input className="inp" style={{ width: 60, textAlign: "center", fontSize: 20 }} value={pf.emoji} onChange={(e) => setPf((x) => ({ ...x, emoji: e.target.value }))} aria-label="Avatar emoji (fallback)" />
              <input className="inp" placeholder="Display name" value={pf.name} onChange={(e) => setPf((x) => ({ ...x, name: e.target.value }))} />
            </div>
            <input className="inp" style={{ marginBottom: 8 }} placeholder="Handle" value={pf.handle} onChange={(e) => setPf((x) => ({ ...x, handle: e.target.value.replace(/[^\w.]/g, "").toLowerCase() }))} />
            <input className="inp" style={{ marginBottom: 10 }} placeholder="Bio — tell foodies who you are" value={pf.bio} onChange={(e) => setPf((x) => ({ ...x, bio: e.target.value }))} />
            <button className="btn btn-grad" onClick={() => { setProfile({ ...pf, name: pf.name.trim() || "You", handle: pf.handle || "you" }); setEditing(false); }}>Save profile</button>
          </div>
        )}
        <div style={{ display: "flex", gap: 26, marginTop: 16 }}>
          <div className="stat"><b>{myPosts.length}</b><span>posts</span></div>
          <div className="stat"><b>{followers.toLocaleString()}</b><span>followers</span></div>
          <div className="stat"><b>{follows.length}</b><span>following</span></div>
          {streak > 0 && <div className="stat"><b style={{ color: "#F5C542" }}>🔥 {streak}</b><span>streak</span></div>}
        </div>
      </div>

      <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
        <button className={"chip" + (tab === "posts" ? " on" : "")} onClick={() => setTab("posts")}>📝 Posts ({myPosts.length})</button>
        <button className={"chip" + (tab === "liked" ? " on" : "")} onClick={() => setTab("liked")}>♥ Liked ({likedPosts.length})</button>
        <button className={"chip" + (tab === "saved" ? " on" : "")} onClick={() => setTab("saved")}>🔖 Saved ({savedRecipes.length})</button>
      </div>

      {tab === "posts" && (myPosts.length ? myPosts.map((p) => <MiniPost key={p.id} p={p} />) : <div className="card" style={{ padding: 18, marginBottom: 14 }}><p className="sub">Nothing posted yet — share what you're cooking from the Home tab.</p></div>)}
      {tab === "liked" && (likedPosts.length ? likedPosts.map((p) => <MiniPost key={p.id} p={p} />) : <div className="card" style={{ padding: 18, marginBottom: 14 }}><p className="sub">Posts you ♥ will collect here.</p></div>)}
      {tab === "saved" && (savedRecipes.length ? (
        <div className="grid" style={{ marginBottom: 14 }}>
          {savedRecipes.map((r) => (
            <button key={r.id} className="card rcard" style={{ padding: 14, textAlign: "left" }} onClick={() => openRecipe(r)}>
              <div style={{ fontSize: 26, marginBottom: 6 }}>{r.emoji}</div>
              <b style={{ fontSize: 12.5 }}>{r.name}</b>
              <div style={{ fontSize: 10.5, color: "var(--dim)", marginTop: 3 }}>{r.time} min · {r.macros.cal} cal</div>
            </button>
          ))}
        </div>
      ) : <div className="card" style={{ padding: 18, marginBottom: 14 }}><p className="sub">Bookmark recipes in Discover and they'll live here.</p></div>)}

      <p className="sub" style={{ fontSize: 11.5, margin: "4px 0 14px" }}>Looking for themes, GrubPlus, or preferences? They moved to <button className="chip" onClick={goSettings}>⚙️ Settings</button></p>

      <div className="card" style={{ padding: 18, marginBottom: 14 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 12 }}>
          <div style={{ fontSize: 24 }}>🏅</div>
          <div style={{ flex: 1 }}>
            <b style={{ fontSize: 14 }}>Achievements</b>
            <p className="sub" style={{ fontSize: 12 }}>{badges.filter((b) => b.earned).length} of {badges.length} earned{streak > 0 ? ` · 🔥 ${streak}-day streak` : ""}</p>
          </div>
        </div>
        <div style={{ display: "grid", gap: 8, gridTemplateColumns: "repeat(auto-fill,minmax(108px,1fr))" }}>
          {badges.map((b) => (
            <div key={b.id} title={b.hint} style={{ padding: "10px 8px", borderRadius: 12, border: "1px solid var(--line)", background: b.earned ? "var(--panel2)" : "var(--panel)", textAlign: "center", opacity: b.earned ? 1 : 0.45 }}>
              <div style={{ fontSize: 22, filter: b.earned ? "none" : "grayscale(1)" }}>{b.emoji}</div>
              <div style={{ fontSize: 10.5, fontWeight: 700, marginTop: 4 }}>{b.name}</div>
              <div style={{ fontSize: 9.5, color: "var(--dim)", marginTop: 2 }}>{b.earned ? "Earned ✓" : b.hint}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card" style={{ padding: 18, marginBottom: 14 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 10 }}>
          <div style={{ fontSize: 24 }}>⚠️</div>
          <div>
            <b style={{ fontSize: 14 }}>My allergies</b>
            <p className="sub" style={{ fontSize: 12 }}>We'll flag these in every recipe and suggest alterations.</p>
          </div>
        </div>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 10 }}>
          {allergyChips.map((a) => (
            <button key={a} className={"chip" + (allergies.includes(a) ? " on" : "")} onClick={() => setAllergies((al) => (al.includes(a) ? al.filter((x) => x !== a) : [...al, a]))}>{a}</button>
          ))}
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <input className="inp" style={{ padding: "8px 12px" }} placeholder="Not listed? Type your allergy (e.g. shellfish)" value={customAllergy} onChange={(e) => setCustomAllergy(e.target.value)} onKeyDown={(e) => e.key === "Enter" && addCustomAllergy()} />
          <button className="chip" onClick={addCustomAllergy}>＋ Add</button>
        </div>
      </div>
    </div>
  );
}

/* ---------------- CREATE RECIPE / COOK MODE / SEARCH / NOTIFICATIONS / REPORT ---------------- */

/* ---------------- LANGUAGES / DISCLOSURE / QUICK SETUP ---------------- */

const LANGS = [
  { id: "en", name: "English" }, { id: "zh", name: "中文" }, { id: "hi", name: "हिन्दी" }, { id: "es", name: "Español" },
  { id: "fr", name: "Français" }, { id: "ar", name: "العربية" }, { id: "bn", name: "বাংলা" }, { id: "pt", name: "Português" },
  { id: "ru", name: "Русский" }, { id: "ja", name: "日本語" }, { id: "de", name: "Deutsch" }, { id: "id", name: "Bahasa Indonesia" },
  { id: "ko", name: "한국어" }, { id: "tr", name: "Türkçe" }, { id: "vi", name: "Tiếng Việt" }, { id: "it", name: "Italiano" },
];
const STRINGS = {
  en: { home: "Home", discover: "Discover", shop: "Shopping", scan: "Scanner", plans: "Plans", profile: "Profile", settings: "Settings", gm: "Good morning", ga: "Good afternoon", ge: "Good evening", ready: "Ready to cook something great?", tonight: "Tonight's plan", streak: "day streak" },
  zh: { home: "首页", discover: "发现", shop: "购物", scan: "扫描", plans: "计划", profile: "个人", settings: "设置", gm: "早上好", ga: "下午好", ge: "晚上好", ready: "准备好做饭了吗？", tonight: "今晚计划", streak: "天连续" },
  hi: { home: "होम", discover: "खोजें", shop: "खरीदारी", scan: "स्कैनर", plans: "योजनाएँ", profile: "प्रोफ़ाइल", settings: "सेटिंग्स", gm: "सुप्रभात", ga: "नमस्ते", ge: "शुभ संध्या", ready: "कुछ स्वादिष्ट बनाने के लिए तैयार?", tonight: "आज रात की योजना", streak: "दिन की स्ट्रीक" },
  es: { home: "Inicio", discover: "Descubrir", shop: "Compras", scan: "Escáner", plans: "Planes", profile: "Perfil", settings: "Ajustes", gm: "Buenos días", ga: "Buenas tardes", ge: "Buenas noches", ready: "¿Listo para cocinar algo rico?", tonight: "Plan de esta noche", streak: "días de racha" },
  fr: { home: "Accueil", discover: "Découvrir", shop: "Courses", scan: "Scanner", plans: "Plans", profile: "Profil", settings: "Réglages", gm: "Bonjour", ga: "Bon après-midi", ge: "Bonsoir", ready: "Prêt à cuisiner quelque chose de bon ?", tonight: "Plan de ce soir", streak: "jours de série" },
  ar: { home: "الرئيسية", discover: "استكشف", shop: "التسوق", scan: "الماسح", plans: "الخطط", profile: "الملف الشخصي", settings: "الإعدادات", gm: "صباح الخير", ga: "مساء الخير", ge: "مساء الخير", ready: "هل أنت مستعد لطهي شيء لذيذ؟", tonight: "خطة الليلة", streak: "يوم متتالي" },
  bn: { home: "হোম", discover: "আবিষ্কার", shop: "কেনাকাটা", scan: "স্ক্যানার", plans: "পরিকল্পনা", profile: "প্রোফাইল", settings: "সেটিংস", gm: "সুপ্রভাত", ga: "শুভ অপরাহ্ন", ge: "শুভ সন্ধ্যা", ready: "দারুণ কিছু রান্না করতে প্রস্তুত?", tonight: "আজ রাতের পরিকল্পনা", streak: "দিনের ধারা" },
  pt: { home: "Início", discover: "Descobrir", shop: "Compras", scan: "Scanner", plans: "Planos", profile: "Perfil", settings: "Ajustes", gm: "Bom dia", ga: "Boa tarde", ge: "Boa noite", ready: "Pronto para cozinhar algo bom?", tonight: "Plano de hoje à noite", streak: "dias seguidos" },
  ru: { home: "Главная", discover: "Обзор", shop: "Покупки", scan: "Сканер", plans: "Планы", profile: "Профиль", settings: "Настройки", gm: "Доброе утро", ga: "Добрый день", ge: "Добрый вечер", ready: "Готовы приготовить что-то вкусное?", tonight: "План на вечер", streak: "дней подряд" },
  ja: { home: "ホーム", discover: "発見", shop: "買い物", scan: "スキャナー", plans: "プラン", profile: "プロフィール", settings: "設定", gm: "おはようございます", ga: "こんにちは", ge: "こんばんは", ready: "美味しいものを作る準備はいい？", tonight: "今夜の予定", streak: "日連続" },
  de: { home: "Start", discover: "Entdecken", shop: "Einkauf", scan: "Scanner", plans: "Pläne", profile: "Profil", settings: "Einstellungen", gm: "Guten Morgen", ga: "Guten Tag", ge: "Guten Abend", ready: "Bereit, etwas Leckeres zu kochen?", tonight: "Plan für heute Abend", streak: "Tage in Folge" },
  id: { home: "Beranda", discover: "Jelajahi", shop: "Belanja", scan: "Pemindai", plans: "Rencana", profile: "Profil", settings: "Pengaturan", gm: "Selamat pagi", ga: "Selamat siang", ge: "Selamat malam", ready: "Siap memasak sesuatu yang enak?", tonight: "Rencana malam ini", streak: "hari beruntun" },
  ko: { home: "홈", discover: "발견", shop: "쇼핑", scan: "스캐너", plans: "플랜", profile: "프로필", settings: "설정", gm: "좋은 아침이에요", ga: "좋은 오후예요", ge: "좋은 저녁이에요", ready: "맛있는 요리 준비됐나요?", tonight: "오늘 밤 계획", streak: "일 연속" },
  tr: { home: "Ana Sayfa", discover: "Keşfet", shop: "Alışveriş", scan: "Tarayıcı", plans: "Planlar", profile: "Profil", settings: "Ayarlar", gm: "Günaydın", ga: "İyi günler", ge: "İyi akşamlar", ready: "Güzel bir şeyler pişirmeye hazır mısın?", tonight: "Bu akşamın planı", streak: "günlük seri" },
  vi: { home: "Trang chủ", discover: "Khám phá", shop: "Mua sắm", scan: "Máy quét", plans: "Kế hoạch", profile: "Hồ sơ", settings: "Cài đặt", gm: "Chào buổi sáng", ga: "Chào buổi chiều", ge: "Chào buổi tối", ready: "Sẵn sàng nấu món ngon chưa?", tonight: "Kế hoạch tối nay", streak: "ngày liên tiếp" },
  it: { home: "Home", discover: "Scopri", shop: "Spesa", scan: "Scanner", plans: "Piani", profile: "Profilo", settings: "Impostazioni", gm: "Buongiorno", ga: "Buon pomeriggio", ge: "Buonasera", ready: "Pronto a cucinare qualcosa di buono?", tonight: "Piano di stasera", streak: "giorni di fila" },
};
const NAV_KEY = { feed: "home", discover: "discover", shop: "shop", scan: "scan", plans: "plans", gallery: "gallery", friends: "friends", communities: "communities", settings: "profile", sysset: "settings" };
const LANG_EN = { en: "English", zh: "Simplified Chinese", hi: "Hindi", es: "Spanish", fr: "French", ar: "Arabic", bn: "Bengali", pt: "Portuguese", ru: "Russian", ja: "Japanese", de: "German", id: "Indonesian", ko: "Korean", tr: "Turkish", vi: "Vietnamese", it: "Italian" };
let CURRENT_LANG = "en";
const T = (k) => (STRINGS[CURRENT_LANG] && STRINGS[CURRENT_LANG][k]) || (STRINGS2[CURRENT_LANG] && STRINGS2[CURRENT_LANG][k]) || (STRINGS.en[k]) || (STRINGS2.en[k]) || k;
async function aiTranslate(text, langId) {
  const reply = await askClaude(
    [{ role: "user", content: "Translate the following into " + (LANG_EN[langId] || "English") + ". Reply with ONLY the translation, nothing else:\n\n" + text }],
    "You are a precise translator for a food app. Keep emoji, keep the tone casual, translate naturally."
  );
  return (reply || "").trim();
}

/* extended UI strings — core surface translated for all 16 languages */
const STRINGS2 = {
  en: { feedT: "What the world is cooking", feedS: "Photos, videos, and Grub Cuts from foodies everywhere.", discT: "Find your next plate", shopT: "Groceries, delivered your way", scanT: "Point. Shoot. Know.", plansT: "Eat toward your goal", galT: "Your saved collection", frT: "Your food circle", comT: "Find your food people", setT: "Account & preferences", search: "Search", cancel: "Cancel", save: "Save", del: "Delete", send: "Send", postBtn: "Post", join: "Join", joined: "Joined", follow: "Follow", following: "Following", addCart: "Add all to cart", translate: "See translation", original: "See original", captions: "Captions", cook: "Cook mode", cooked: "I cooked this" },
  es: { feedT: "Lo que el mundo está cocinando", feedS: "Fotos, videos y Grub Cuts de foodies de todo el mundo.", discT: "Encuentra tu próximo plato", shopT: "Compras, entregadas a tu manera", scanT: "Apunta. Captura. Descubre.", plansT: "Come según tu meta", galT: "Tu colección guardada", frT: "Tu círculo foodie", comT: "Encuentra a tu gente foodie", setT: "Cuenta y preferencias", search: "Buscar", cancel: "Cancelar", save: "Guardar", del: "Eliminar", send: "Enviar", postBtn: "Publicar", join: "Unirse", joined: "Unido", follow: "Seguir", following: "Siguiendo", addCart: "Añadir todo al carrito", translate: "Ver traducción", original: "Ver original", captions: "Subtítulos", cook: "Modo cocina", cooked: "Lo cociné" },
  fr: { feedT: "Ce que le monde cuisine", feedS: "Photos, vidéos et Grub Cuts de foodies du monde entier.", discT: "Trouvez votre prochain plat", shopT: "Courses livrées à votre façon", scanT: "Visez. Photographiez. Sachez.", plansT: "Mangez selon votre objectif", galT: "Votre collection", frT: "Votre cercle food", comT: "Trouvez votre communauté food", setT: "Compte et préférences", search: "Rechercher", cancel: "Annuler", save: "Enregistrer", del: "Supprimer", send: "Envoyer", postBtn: "Publier", join: "Rejoindre", joined: "Membre", follow: "Suivre", following: "Suivi", addCart: "Tout ajouter au panier", translate: "Voir la traduction", original: "Voir l'original", captions: "Sous-titres", cook: "Mode cuisine", cooked: "Je l'ai cuisiné" },
  de: { feedT: "Was die Welt gerade kocht", feedS: "Fotos, Videos und Grub Cuts von Foodies überall.", discT: "Finde dein nächstes Gericht", shopT: "Einkäufe, geliefert wie du willst", scanT: "Zielen. Knipsen. Wissen.", plansT: "Iss auf dein Ziel hin", galT: "Deine gespeicherte Sammlung", frT: "Dein Food-Kreis", comT: "Finde deine Food-Leute", setT: "Konto & Einstellungen", search: "Suchen", cancel: "Abbrechen", save: "Speichern", del: "Löschen", send: "Senden", postBtn: "Posten", join: "Beitreten", joined: "Dabei", follow: "Folgen", following: "Folge ich", addCart: "Alles in den Warenkorb", translate: "Übersetzung anzeigen", original: "Original anzeigen", captions: "Untertitel", cook: "Kochmodus", cooked: "Hab ich gekocht" },
  pt: { feedT: "O que o mundo está cozinhando", feedS: "Fotos, vídeos e Grub Cuts de foodies do mundo todo.", discT: "Encontre seu próximo prato", shopT: "Compras entregues do seu jeito", scanT: "Aponte. Fotografe. Saiba.", plansT: "Coma rumo à sua meta", galT: "Sua coleção salva", frT: "Seu círculo foodie", comT: "Encontre sua turma da comida", setT: "Conta e preferências", search: "Buscar", cancel: "Cancelar", save: "Salvar", del: "Excluir", send: "Enviar", postBtn: "Publicar", join: "Entrar", joined: "Membro", follow: "Seguir", following: "Seguindo", addCart: "Adicionar tudo ao carrinho", translate: "Ver tradução", original: "Ver original", captions: "Legendas", cook: "Modo cozinha", cooked: "Eu cozinhei" },
  it: { feedT: "Cosa sta cucinando il mondo", feedS: "Foto, video e Grub Cuts da foodie di ovunque.", discT: "Trova il tuo prossimo piatto", shopT: "Spesa consegnata a modo tuo", scanT: "Inquadra. Scatta. Scopri.", plansT: "Mangia verso il tuo obiettivo", galT: "La tua collezione salvata", frT: "La tua cerchia food", comT: "Trova la tua gente del cibo", setT: "Account e preferenze", search: "Cerca", cancel: "Annulla", save: "Salva", del: "Elimina", send: "Invia", postBtn: "Pubblica", join: "Unisciti", joined: "Iscritto", follow: "Segui", following: "Segui già", addCart: "Aggiungi tutto al carrello", translate: "Vedi traduzione", original: "Vedi originale", captions: "Sottotitoli", cook: "Modalità cucina", cooked: "L'ho cucinato" },
  zh: { feedT: "看看世界都在做什么菜", feedS: "来自各地美食家的照片、视频和 Grub Cuts。", discT: "发现你的下一道菜", shopT: "食材配送，随你安排", scanT: "对准，拍照，即刻了解", plansT: "朝着目标吃", galT: "你的收藏", frT: "你的美食圈", comT: "找到你的美食伙伴", setT: "账号与偏好", search: "搜索", cancel: "取消", save: "保存", del: "删除", send: "发送", postBtn: "发布", join: "加入", joined: "已加入", follow: "关注", following: "已关注", addCart: "全部加入购物车", translate: "查看翻译", original: "查看原文", captions: "字幕", cook: "烹饪模式", cooked: "我做了这道菜" },
  ja: { feedT: "世界のキッチンから", feedS: "世界中のフーディーの写真・動画・Grub Cuts。", discT: "次の一皿を見つけよう", shopT: "食材をあなた流にお届け", scanT: "向けて、撮って、わかる", plansT: "目標に合わせて食べる", galT: "保存したコレクション", frT: "あなたのフードサークル", comT: "食の仲間を見つけよう", setT: "アカウントと設定", search: "検索", cancel: "キャンセル", save: "保存", del: "削除", send: "送信", postBtn: "投稿", join: "参加", joined: "参加中", follow: "フォロー", following: "フォロー中", addCart: "全部カートに追加", translate: "翻訳を見る", original: "原文を見る", captions: "字幕", cook: "調理モード", cooked: "作りました", },
  ko: { feedT: "전 세계의 요리 이야기", feedS: "전 세계 푸디들의 사진, 영상, Grub Cuts.", discT: "다음 요리를 찾아보세요", shopT: "장보기, 원하는 방식으로 배송", scanT: "찍으면 바로 알 수 있어요", plansT: "목표에 맞게 먹기", galT: "저장한 컬렉션", frT: "나의 푸드 서클", comT: "음식 친구들을 찾아보세요", setT: "계정 및 환경설정", search: "검색", cancel: "취소", save: "저장", del: "삭제", send: "보내기", postBtn: "게시", join: "가입", joined: "가입됨", follow: "팔로우", following: "팔로잉", addCart: "전부 장바구니에 담기", translate: "번역 보기", original: "원문 보기", captions: "자막", cook: "요리 모드", cooked: "만들었어요" },
  hi: { feedT: "दुनिया क्या पका रही है", feedS: "दुनिया भर के फ़ूडीज़ की तस्वीरें, वीडियो और Grub Cuts।", discT: "अपनी अगली डिश खोजें", shopT: "किराना, आपके तरीक़े से डिलीवर", scanT: "दिखाओ। खींचो। जानो।", plansT: "अपने लक्ष्य के हिसाब से खाएँ", galT: "आपका सहेजा संग्रह", frT: "आपका फ़ूड सर्कल", comT: "अपने फ़ूड साथी खोजें", setT: "खाता और प्राथमिकताएँ", search: "खोजें", cancel: "रद्द करें", save: "सहेजें", del: "हटाएँ", send: "भेजें", postBtn: "पोस्ट करें", join: "जुड़ें", joined: "जुड़ चुके", follow: "फ़ॉलो करें", following: "फ़ॉलो कर रहे", addCart: "सब कार्ट में डालें", translate: "अनुवाद देखें", original: "मूल देखें", captions: "कैप्शन", cook: "कुकिंग मोड", cooked: "मैंने बनाया" },
  bn: { feedT: "বিশ্ব এখন কী রাঁধছে", feedS: "সারা বিশ্বের ফুডিদের ছবি, ভিডিও ও Grub Cuts।", discT: "আপনার পরের পদ খুঁজুন", shopT: "মুদি বাজার, আপনার মতো করে ডেলিভারি", scanT: "তাক করুন। ছবি তুলুন। জানুন।", plansT: "লক্ষ্য ধরে খান", galT: "আপনার সংরক্ষিত সংগ্রহ", frT: "আপনার ফুড সার্কেল", comT: "আপনার খাবারের মানুষ খুঁজুন", setT: "অ্যাকাউন্ট ও পছন্দ", search: "খুঁজুন", cancel: "বাতিল", save: "সংরক্ষণ", del: "মুছুন", send: "পাঠান", postBtn: "পোস্ট", join: "যোগ দিন", joined: "যুক্ত", follow: "ফলো করুন", following: "ফলো করছেন", addCart: "সব কার্টে দিন", translate: "অনুবাদ দেখুন", original: "মূল দেখুন", captions: "ক্যাপশন", cook: "রান্নার মোড", cooked: "আমি রেঁধেছি" },
  ar: { feedT: "ماذا يطبخ العالم الآن", feedS: "صور وفيديوهات وGrub Cuts من عشّاق الطعام حول العالم.", discT: "اكتشف طبقك التالي", shopT: "بقالتك تصلك على طريقتك", scanT: "صوّب. صوّر. اعرف.", plansT: "كُل نحو هدفك", galT: "مجموعتك المحفوظة", frT: "دائرتك الغذائية", comT: "اعثر على أهل الطعام", setT: "الحساب والتفضيلات", search: "بحث", cancel: "إلغاء", save: "حفظ", del: "حذف", send: "إرسال", postBtn: "نشر", join: "انضم", joined: "منضم", follow: "متابعة", following: "تتابع", addCart: "أضف الكل إلى السلة", translate: "عرض الترجمة", original: "عرض الأصل", captions: "ترجمة الفيديو", cook: "وضع الطبخ", cooked: "طبختها" },
  ru: { feedT: "Что готовит мир", feedS: "Фото, видео и Grub Cuts от фуди со всего мира.", discT: "Найдите своё следующее блюдо", shopT: "Продукты с доставкой по-вашему", scanT: "Наведи. Сними. Узнай.", plansT: "Ешьте по своей цели", galT: "Ваша коллекция", frT: "Ваш круг фуди", comT: "Найдите своих по еде", setT: "Аккаунт и настройки", search: "Поиск", cancel: "Отмена", save: "Сохранить", del: "Удалить", send: "Отправить", postBtn: "Опубликовать", join: "Вступить", joined: "Вы участник", follow: "Подписаться", following: "Вы подписаны", addCart: "Всё в корзину", translate: "Показать перевод", original: "Показать оригинал", captions: "Субтитры", cook: "Режим готовки", cooked: "Я приготовил(а)" },
  tr: { feedT: "Dünya ne pişiriyor", feedS: "Dünyanın dört yanından foodie fotoğrafları, videoları ve Grub Cuts.", discT: "Sıradaki tabağını bul", shopT: "Market alışverişi, senin usulünle", scanT: "Tut. Çek. Öğren.", plansT: "Hedefine göre ye", galT: "Kaydedilen koleksiyonun", frT: "Yemek çevren", comT: "Yemek insanlarını bul", setT: "Hesap ve tercihler", search: "Ara", cancel: "İptal", save: "Kaydet", del: "Sil", send: "Gönder", postBtn: "Paylaş", join: "Katıl", joined: "Katıldın", follow: "Takip et", following: "Takiptesin", addCart: "Hepsini sepete ekle", translate: "Çeviriyi gör", original: "Orijinali gör", captions: "Altyazı", cook: "Pişirme modu", cooked: "Ben pişirdim" },
  vi: { feedT: "Thế giới đang nấu gì", feedS: "Ảnh, video và Grub Cuts từ hội mê ẩm thực khắp nơi.", discT: "Tìm món tiếp theo của bạn", shopT: "Đi chợ, giao theo cách của bạn", scanT: "Giơ máy. Chụp. Biết ngay.", plansT: "Ăn theo mục tiêu", galT: "Bộ sưu tập đã lưu", frT: "Hội bạn ăn uống", comT: "Tìm hội mê ẩm thực của bạn", setT: "Tài khoản & tuỳ chọn", search: "Tìm kiếm", cancel: "Huỷ", save: "Lưu", del: "Xoá", send: "Gửi", postBtn: "Đăng", join: "Tham gia", joined: "Đã tham gia", follow: "Theo dõi", following: "Đang theo dõi", addCart: "Thêm tất cả vào giỏ", translate: "Xem bản dịch", original: "Xem bản gốc", captions: "Phụ đề", cook: "Chế độ nấu", cooked: "Tôi đã nấu" },
  id: { feedT: "Apa yang sedang dimasak dunia", feedS: "Foto, video, dan Grub Cuts dari foodie di mana-mana.", discT: "Temukan piring berikutnya", shopT: "Belanjaan, diantar sesuai maumu", scanT: "Arahkan. Jepret. Tahu.", plansT: "Makan sesuai targetmu", galT: "Koleksi tersimpanmu", frT: "Lingkaran kulinermu", comT: "Temukan teman kulinermu", setT: "Akun & preferensi", search: "Cari", cancel: "Batal", save: "Simpan", del: "Hapus", send: "Kirim", postBtn: "Posting", join: "Gabung", joined: "Tergabung", follow: "Ikuti", following: "Mengikuti", addCart: "Tambahkan semua ke keranjang", translate: "Lihat terjemahan", original: "Lihat asli", captions: "Takarir", cook: "Mode masak", cooked: "Sudah kumasak" },
};
const tr2 = (lang, key) => (STRINGS2[lang] || STRINGS2.en)[key] || STRINGS2.en[key] || key;
const tr = (lang, key) => (STRINGS[lang] || STRINGS.en)[key] || STRINGS.en[key] || key;

function Disclosure({ icon, summary, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="card" style={{ marginBottom: 12, overflow: "hidden" }}>
      <button className={"strip" + (open ? " open" : "")} onClick={() => setOpen(!open)}>
        <span style={{ fontSize: 16 }}>{icon}</span>
        <span style={{ flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{summary}</span>
        <span className="chev">▾</span>
      </button>
      {open && <div style={{ padding: "0 16px 14px", borderTop: "1px solid var(--line)" }}><div style={{ paddingTop: 12 }}>{children}</div></div>}
    </div>
  );
}

function LanguageGate({ lang, setLang, onDone }) {
  return (
    <div className="ovl">
      <div className="modal" style={{ padding: 26, textAlign: "center" }}>
        <div style={{ fontSize: 34, marginBottom: 8 }}>🌐</div>
        <h2 style={{ fontSize: 17, marginBottom: 4 }}>Choose your language</h2>
        <p className="sub" style={{ fontSize: 12, marginBottom: 16 }}>Elige tu idioma · Choisissez votre langue · 选择语言 · اختر لغتك · अपनी भाषा चुनें</p>
        <div style={{ display: "grid", gap: 8, gridTemplateColumns: "1fr 1fr", marginBottom: 18, maxHeight: 300, overflowY: "auto" }}>
          {LANGS.map((l) => (
            <button key={l.id} className={"chip" + (lang === l.id ? " on" : "")} style={{ padding: "11px 12px", fontSize: 13.5 }} onClick={() => setLang(l.id)}>{l.name}</button>
          ))}
        </div>
        <button className="btn btn-grad" style={{ width: "100%" }} onClick={onDone}>Continue → {LANGS.find((l) => l.id === lang).name}</button>
        <p className="sub" style={{ fontSize: 10.5, marginTop: 10 }}>Change anytime in Settings. Community posts get one-tap translation.</p>
      </div>
    </div>
  );
}

function QuickSetup({ onDone, setFilters, setAllergies }) {
  const [step, setStep] = useState(0);
  const [goal, setGoal] = useState(null);
  const [diets, setDiets] = useState([]);
  const [alls, setAlls] = useState([]);
  const [custom, setCustom] = useState("");
  const ALLERGY_OPTS = ["dairy", "gluten", "egg", "fish", "soy", "sesame", "nuts"];
  const GOALS = [{ id: "save", n: "💸 Save money" }, { id: "health", n: "🥗 Eat healthier" }, { id: "learn", n: "🍳 Learn to cook" }, { id: "all", n: "✨ All of it" }];
  function finish() {
    setFilters(diets);
    setAllergies(alls);
    onDone(goal);
  }
  const Q = [
    { t: "What brings you to GrubGrounds?", body: <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center" }}>{GOALS.map((g) => <button key={g.id} className={"chip" + (goal === g.id ? " on" : "")} onClick={() => setGoal(g.id)}>{g.n}</button>)}</div> },
    { t: "Do you follow any diets or eating styles?", body: <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center" }}>{DIETS.map((d) => <button key={d} className={"chip" + (diets.includes(d) ? " on" : "")} onClick={() => setDiets((x) => x.includes(d) ? x.filter((y) => y !== d) : [...x, d])}>{d}</button>)}</div> },
    { t: "Any food allergies? We'll flag them in every recipe.", body: <div>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center", marginBottom: 12 }}>{[...ALLERGY_OPTS, ...alls.filter((a) => !ALLERGY_OPTS.includes(a))].map((a) => <button key={a} className={"chip" + (alls.includes(a) ? " on" : "")} onClick={() => setAlls((x) => x.includes(a) ? x.filter((y) => y !== a) : [...x, a])}>{a.charAt(0).toUpperCase() + a.slice(1)}</button>)}</div>
      <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
        <input className="inp" style={{ padding: "8px 12px", maxWidth: 220 }} placeholder="Not listed? Type it here" value={custom} onChange={(e) => setCustom(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter" && custom.trim()) { const n = custom.trim().toLowerCase(); if (!alls.includes(n)) setAlls((x) => [...x, n]); setCustom(""); } }} />
        <button className="chip" onClick={() => { const n = custom.trim().toLowerCase(); if (n && !alls.includes(n)) setAlls((x) => [...x, n]); setCustom(""); }}>＋ Add</button>
      </div>
    </div> },
  ];
  return (
    <div className="ovl">
      <div className="modal" style={{ padding: 26, textAlign: "center" }}>
        <div className="eyebrow" style={{ marginBottom: 8 }}>Quick setup · {step + 1} of 3 · 15 seconds</div>
        <h2 style={{ fontSize: 17, marginBottom: 16 }}>{Q[step].t}</h2>
        {Q[step].body}
        <div style={{ display: "flex", gap: 8, justifyContent: "center", marginTop: 20 }}>
          <button className="chip" onClick={finish}>Skip</button>
          {step < 2
            ? <button className="btn btn-grad" onClick={() => setStep(step + 1)}>Next →</button>
            : <button className="btn btn-grad" onClick={finish}>Set up my app ✨</button>}
        </div>
      </div>
    </div>
  );
}

/* ---------------- MEDIA (photos & video) ---------------- */

const MAX_VIDEO_SECONDS = 300; // 5 minutes

function loadMediaFile(file, cb) {
  const url = URL.createObjectURL(file);
  if (file.type.startsWith("video/")) {
    const v = document.createElement("video");
    v.preload = "metadata";
    v.onloadedmetadata = () => cb({ url, type: "video", duration: v.duration });
    v.onerror = () => cb({ url, type: "video", duration: null });
    v.src = url;
  } else {
    cb({ url, type: "image", duration: null });
  }
}

const fmtDur = (s) => Math.floor(s / 60) + ":" + String(Math.round(s % 60)).padStart(2, "0");

let MY_PHOTO = null; // synced from App each render so any component can show the user's avatar
function downscalePhoto(file, cb) { // → small square dataURL that persists in storage; cb(dataUrl, errMsg)
  const url = URL.createObjectURL(file);
  const img = new Image();
  img.onload = () => {
    try {
      const S = 256, c = document.createElement("canvas");
      c.width = S; c.height = S;
      const x = c.getContext("2d");
      const side = Math.min(img.width, img.height);
      x.drawImage(img, (img.width - side) / 2, (img.height - side) / 2, side, side, 0, 0, S, S);
      cb(c.toDataURL("image/jpeg", 0.82), null);
    } catch (e) { cb(null, "Couldn't process that image — try a JPG or PNG."); }
    URL.revokeObjectURL(url);
  };
  img.onerror = () => { // format the browser can't decode (e.g. HEIC in some browsers)
    URL.revokeObjectURL(url);
    const r = new FileReader();
    r.onload = () => {
      if (file.size <= 1500000) cb(String(r.result), null);
      else cb(null, "Your browser can't process that photo format — try a JPG or PNG (screenshots work great).");
    };
    r.onerror = () => cb(null, "Couldn't read that file — try a different photo.");
    r.readAsDataURL(file);
  };
  img.src = url;
}
function Avatar({ photo, emoji, size = 36, fs = 17 }) {
  return photo
    ? <img src={photo} alt="" style={{ width: size, height: size, borderRadius: "50%", objectFit: "cover", flexShrink: 0 }} />
    : <div style={{ width: size, height: size, borderRadius: "50%", background: "var(--grad)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: fs, flexShrink: 0 }}>{emoji}</div>;
}

function MediaViewer({ media, onClose }) {
  const vidRef = useRef(null);
  const [muted, setMuted] = useState(false);
  const [cc, setCc] = useState(true);
  const [ccTrans, setCcTrans] = useState(null);
  const [ccShowTrans, setCcShowTrans] = useState(false);
  const [ccBusy, setCcBusy] = useState(false);
  async function translateCc() {
    if (ccShowTrans) { setCcShowTrans(false); return; }
    if (ccTrans) { setCcShowTrans(true); return; }
    setCcBusy(true);
    try { const t = await aiTranslate(media.captions, CURRENT_LANG); if (t) { setCcTrans(t); setCcShowTrans(true); } } catch (e) {}
    setCcBusy(false);
  }
  useEffect(() => {
    if (media.type === "image" && media.music && !muted) playMusic(media.music);
    else stopMusic();
    return () => stopMusic();
  }, [media, muted]);
  useEffect(() => {
    const v = vidRef.current;
    if (!v || media.type !== "video") return;
    const start = media.trimStart || 0, end = media.trimEnd || 0;
    const onMeta = () => { if (start > 0) v.currentTime = start; };
    const onTime = () => { if (end > 0 && v.currentTime >= end) { v.currentTime = start; } };
    v.addEventListener("loadedmetadata", onMeta); v.addEventListener("timeupdate", onTime);
    return () => { v.removeEventListener("loadedmetadata", onMeta); v.removeEventListener("timeupdate", onTime); };
  }, [media]);
  return (
    <div className="ovl" style={{ background: "rgba(3,3,6,.94)", padding: 12 }} onClick={onClose}>
      <div style={{ position: "relative", width: "100%", maxWidth: 1100, display: "flex", flexDirection: "column", alignItems: "center" }} onClick={(e) => e.stopPropagation()}>
        <button className="chip" style={{ position: "absolute", top: -6, right: 0, zIndex: 2, background: "rgba(16,16,26,.9)" }} onClick={onClose}>✕ Close</button>
        {media.type === "video"
          ? <video ref={vidRef} src={media.url} controls autoPlay playsInline style={{ width: "100%", maxHeight: "86vh", borderRadius: 16, background: "#000" }} />
          : <img src={media.url} alt={media.alt || "Post media"} style={{ maxWidth: "100%", maxHeight: "86vh", borderRadius: 16, objectFit: "contain" }} />}
        {media.type === "image" && media.music && (
          <button className="chip" style={{ marginTop: 12 }} onClick={() => setMuted(!muted)}>{muted ? "🔇 Music off" : "🎵 " + trackName(media.music) + " — tap to mute"}</button>
        )}
        {media.type === "video" && media.captions && cc && (
          <div style={{ position: "absolute", bottom: 74, left: "50%", transform: "translateX(-50%)", maxWidth: "88%", background: "rgba(5,5,10,.78)", backdropFilter: "blur(4px)", borderRadius: 10, padding: "8px 14px", fontSize: "clamp(13px, 2.4vw, 17px)", lineHeight: 1.45, textAlign: "center" }}>
            {ccShowTrans && ccTrans ? ccTrans : media.captions}
          </div>
        )}
        {media.type === "video" && media.captions && (
          <div style={{ display: "flex", gap: 8, marginTop: 12, flexWrap: "wrap", justifyContent: "center" }}>
            <button className={"chip" + (cc ? " on" : "")} onClick={() => setCc(!cc)}>💬 {T("captions")} {cc ? "ON" : "OFF"}</button>
            {CURRENT_LANG !== "en" && <button className={"chip" + (ccShowTrans ? " on" : "")} onClick={translateCc}>{ccBusy ? "…" : "🌐 " + (ccShowTrans ? T("original") : T("translate"))}</button>}
          </div>
        )}
        {media.type === "video" && (media.trimStart || media.trimEnd) ? <span className="pill-sm tag-dark" style={{ marginTop: 10 }}>✂️ Trimmed clip</span> : null}
      </div>
    </div>
  );
}

/* ---------------- MUSIC (WebAudio loops — no files needed) ---------------- */

const MUSIC_TRACKS = [
  { id: "lofi", name: "Lo-fi Chill", emoji: "🎧", bpm: 72, wave: "sine", notes: [220, 262, 330, 262, 196, 262, 330, 392] },
  { id: "jazz", name: "Kitchen Jazz", emoji: "🎷", bpm: 96, wave: "triangle", notes: [262, 311, 392, 466, 392, 311, 349, 415] },
  { id: "pop", name: "Summer Pop", emoji: "🌞", bpm: 118, wave: "square", notes: [392, 440, 494, 587, 494, 440, 392, 330] },
  { id: "hype", name: "Hype Beat", emoji: "🔥", bpm: 140, wave: "sawtooth", notes: [147, 147, 175, 147, 196, 147, 220, 175] },
  { id: "acoustic", name: "Acoustic Morning", emoji: "🌿", bpm: 84, wave: "triangle", notes: [330, 392, 440, 523, 440, 392, 330, 294] },
];
let _audio = { ctx: null, timer: null, playing: null };
function playMusic(trackId) {
  stopMusic();
  const t = MUSIC_TRACKS.find((x) => x.id === trackId);
  if (!t) return;
  try {
    _audio.ctx = _audio.ctx || new (window.AudioContext || window.webkitAudioContext)();
    const ctx = _audio.ctx;
    if (ctx.state === "suspended") ctx.resume();
    let i = 0;
    const beat = 60 / t.bpm;
    const tick = () => {
      const o = ctx.createOscillator(), g = ctx.createGain();
      o.type = t.wave; o.frequency.value = t.notes[i % t.notes.length];
      g.gain.setValueAtTime(0.0001, ctx.currentTime);
      g.gain.exponentialRampToValueAtTime(0.12, ctx.currentTime + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + beat * 0.9);
      o.connect(g); g.connect(ctx.destination);
      o.start(); o.stop(ctx.currentTime + beat);
      i++;
    };
    tick();
    _audio.timer = setInterval(tick, beat * 1000);
    _audio.playing = trackId;
  } catch (e) {}
}
function stopMusic() {
  if (_audio.timer) clearInterval(_audio.timer);
  _audio.timer = null; _audio.playing = null;
}
const trackName = (id) => { const t = MUSIC_TRACKS.find((x) => x.id === id); return t ? t.emoji + " " + t.name : ""; };

/* ---------------- POST EDITOR ---------------- */

function PostEditor({ p, onSave, onDelete, onBoost, onClose }) {
  const [caption, setCaption] = useState(p.caption);
  const [alt, setAlt] = useState(p.alt || "");
  const [music, setMusic] = useState(p.media && p.media.music || "");
  const [media, setMedia] = useState(p.media || null);
  const [mediaErr, setMediaErr] = useState("");
  const [trim, setTrim] = useState({ start: (p.media && p.media.trimStart) || 0, end: (p.media && p.media.trimEnd) || 0 });
  const [pinned, setPinned] = useState(!!p.pinned);
  const [commentsOff, setCommentsOff] = useState(!!p.commentsOff);
  const [hideLikes, setHideLikes] = useState(!!p.hideLikes);
  const [confirmDel, setConfirmDel] = useState(false);
  const [boostOpen, setBoostOpen] = useState(false);
  const [archived, setArchived] = useState(!!p.archived);
  const fileRef = useRef(null);
  const isVideo = media && media.type === "video";
  const dur = isVideo && media.duration ? media.duration : 0;

  function pickReplacement(e) {
    const f = e.target.files && e.target.files[0];
    if (!f) return;
    setMediaErr("");
    loadMediaFile(f, (m) => {
      if (m.type === "video" && m.duration && m.duration > MAX_VIDEO_SECONDS) {
        setMediaErr(`That video is ${fmtDur(m.duration)} — max is 5:00.`);
        URL.revokeObjectURL(m.url);
      } else { setMedia(m); setTrim({ start: 0, end: 0 }); if (m.type === "video") setMusic(""); }
    });
    e.target.value = "";
  }
  function save() {
    const newMedia = media ? { ...media, captions: media.captions || undefined, music: media.type === "image" ? (music || undefined) : undefined, trimStart: isVideo && trim.start > 0 ? trim.start : undefined, trimEnd: isVideo && trim.end > 0 ? trim.end : undefined } : null;
    onSave({ caption: caption.trim(), alt: alt.trim() || undefined, media: newMedia, pinned, commentsOff, hideLikes, archived, edited: true });
    onClose();
  }

  return (
    <div className="ovl" onClick={onClose}>
      <div className="modal" style={{ padding: 20 }} onClick={(e) => e.stopPropagation()}>
        <h2 style={{ fontSize: 16, marginBottom: 14 }}>✏️ Edit post</h2>

        <div className="eyebrow" style={{ marginBottom: 6 }}>Caption</div>
        <textarea className="inp" rows="2" style={{ resize: "vertical", marginBottom: 12 }} value={caption} onChange={(e) => setCaption(e.target.value)} />

        {media && (
          <>
            <div className="eyebrow" style={{ marginBottom: 6 }}>Media</div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10, flexWrap: "wrap" }}>
              {media.type === "video"
                ? <video src={media.url} muted playsInline style={{ height: 70, borderRadius: 10, background: "#000" }} />
                : <img src={media.url} alt="" style={{ height: 70, borderRadius: 10, objectFit: "cover" }} />}
              <input ref={fileRef} type="file" accept="image/*,video/*" onChange={pickReplacement} style={{ display: "none" }} />
              <button className="chip" onClick={() => fileRef.current.click()}>🔁 Replace</button>
              <button className="chip" onClick={() => { setMedia(null); setMusic(""); }}>✕ Remove media</button>
            </div>
            {mediaErr && <p style={{ color: "#FF7A9C", fontSize: 12, marginBottom: 10 }}>{mediaErr}</p>}

            {media.type === "image" && (
              <>
                <div className="eyebrow" style={{ marginBottom: 6 }}>🎵 Music over this photo</div>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 12 }}>
                  <button className={"chip" + (!music ? " on" : "")} onClick={() => { setMusic(""); stopMusic(); }}>None</button>
                  {MUSIC_TRACKS.map((t) => (
                    <button key={t.id} className={"chip" + (music === t.id ? " on" : "")} onClick={() => { setMusic(t.id); playMusic(t.id); }}>{t.emoji} {t.name}</button>
                  ))}
                </div>
                {music && <p className="sub" style={{ fontSize: 11, marginBottom: 12 }}>Previewing — it plays whenever someone views the photo. Tap None to silence.</p>}
              </>
            )}

            {isVideo && (
              <>
                <div className="eyebrow" style={{ marginBottom: 6 }}>💬 Captions</div>
                <input className="inp" style={{ marginBottom: 12, padding: "8px 12px" }} placeholder="Type what's said — viewers can read & translate along" value={media.captions || ""} onChange={(e) => setMedia((m) => ({ ...m, captions: e.target.value }))} />
              </>
            )}
            {isVideo && dur > 0 && (
              <>
                <div className="eyebrow" style={{ marginBottom: 6 }}>✂️ Trim video</div>
                <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 4, fontSize: 12 }}>
                  <label style={{ flex: 1 }}>Start: <b>{fmtDur(trim.start)}</b>
                    <input type="range" min="0" max={Math.max(0, dur - 1)} step="1" value={trim.start} onChange={(e) => setTrim((t) => ({ ...t, start: Math.min(+e.target.value, (t.end || dur) - 1) }))} style={{ width: "100%" }} />
                  </label>
                  <label style={{ flex: 1 }}>End: <b>{fmtDur(trim.end || dur)}</b>
                    <input type="range" min="1" max={dur} step="1" value={trim.end || dur} onChange={(e) => setTrim((t) => ({ ...t, end: Math.max(+e.target.value, t.start + 1) }))} style={{ width: "100%" }} />
                  </label>
                </div>
                <p className="sub" style={{ fontSize: 11, marginBottom: 12 }}>Viewers see just your selected section ({fmtDur((trim.end || dur) - trim.start)}).</p>
              </>
            )}
          </>
        )}

        <div className="eyebrow" style={{ marginBottom: 6 }}>Accessibility</div>
        <input className="inp" style={{ marginBottom: 12 }} placeholder="Alt text — describe the photo/video for screen readers" value={alt} onChange={(e) => setAlt(e.target.value)} />

        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 16 }}>
          <button className={"chip" + (pinned ? " on" : "")} onClick={() => setPinned(!pinned)}>📌 {pinned ? "Pinned to top" : "Pin to top"}</button>
          <button className={"chip" + (commentsOff ? " on" : "")} onClick={() => setCommentsOff(!commentsOff)}>💬 {commentsOff ? "Comments off" : "Turn off comments"}</button>
          <button className={"chip" + (hideLikes ? " on" : "")} onClick={() => setHideLikes(!hideLikes)}>🙈 {hideLikes ? "Like count hidden" : "Hide like count"}</button>
          <button className={"chip" + (archived ? " on" : "")} onClick={() => setArchived(!archived)}>🗄️ {archived ? "Archived" : "Archive"}</button>
        </div>

        {!boostOpen ? (
          <button className="chip" style={{ marginBottom: 14, borderColor: "#F5C542", color: "#F5C542" }} onClick={() => setBoostOpen(true)}>🚀 Boost this post…</button>
        ) : (
          <div style={{ padding: "12px 14px", background: "var(--panel2)", borderRadius: 12, marginBottom: 14 }}>
            <div className="eyebrow" style={{ marginBottom: 6 }}>🚀 Boost for more engagement</div>
            <p className="sub" style={{ fontSize: 11.5, marginBottom: 10 }}>Put your post in front of more foodies. Pick a budget (demo — no real charge):</p>
            <div style={{ display: "flex", gap: 6 }}>
              {[5, 10, 25].map((b) => <button key={b} className="chip" onClick={() => { onBoost(b); onClose(); }}>${b} · ~{b * 120} reach</button>)}
            </div>
          </div>
        )}

        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
          <button className="btn btn-grad" onClick={save}>Save changes</button>
          <button className="btn btn-ghost" onClick={() => { stopMusic(); onClose(); }}>Cancel</button>
          <span style={{ flex: 1 }} />
          {!confirmDel
            ? <button className="chip" style={{ borderColor: "#FF7A9C", color: "#FF7A9C" }} onClick={() => setConfirmDel(true)}>🗑 Delete</button>
            : <><span style={{ fontSize: 11.5, color: "#FF7A9C" }}>Sure?</span><button className="chip" style={{ borderColor: "#FF7A9C", color: "#FF7A9C" }} onClick={() => { onDelete(); onClose(); }}>Yes, delete</button></>}
        </div>
      </div>
    </div>
  );
}

const GRAD_POOL = [["#1FA9F4", "#7E22CE"], ["#7E22CE", "#1FA9F4"], ["#0C6FB8", "#5E1E96"], ["#5E1E96", "#1E96E0"], ["#0D5C9E", "#6D1FA0"]];

function CreateRecipe({ onSave, onClose }) {
  const [f, setF] = useState({ name: "", emoji: "🍽️", cat: "main", replica: "", level: "Beginner", time: 30, serves: 4, desc: "", tags: [], photo: null });
  const photoRef = useRef(null);
  const [photoErr, setPhotoErr] = useState("");
  const [rawPhoto, setRawPhoto] = useState(null); // original upload, for manual cropping
  const [cropOpen, setCropOpen] = useState(false);
  const [crop, setCrop] = useState({ z: 1, x: 50, y: 50 });
  const [cropBig, setCropBig] = useState(false);
  function applyCrop(c) {
    const img = new Image();
    img.onload = () => {
      const S = 256, cv = document.createElement("canvas");
      cv.width = S; cv.height = S;
      const side = Math.min(img.width, img.height) / c.z;
      const sx = (img.width - side) * c.x / 100, sy = (img.height - side) * c.y / 100;
      cv.getContext("2d").drawImage(img, sx, sy, side, side, 0, 0, S, S);
      setPf((x) => ({ ...x, photo: cv.toDataURL("image/jpeg", 0.82) }));
    };
    img.src = rawPhoto;
  }
  const [ings, setIngs] = useState([{ n: "", qty: "", price: "" }]);
  const [steps, setSteps] = useState([""]);
  const [macros, setMacros] = useState({ cal: "", protein: "", carbs: "", fat: "", fiber: "", sodium: "" });
  const [err, setErr] = useState("");
  const set = (k, v) => setF((x) => ({ ...x, [k]: v }));

  function save() {
    if (f.name.trim().length < 3) return setErr("Give your recipe a name (3+ characters).");
    const goodIngs = ings.filter((i) => i.n.trim());
    if (!goodIngs.length) return setErr("Add at least one ingredient.");
    const goodSteps = steps.filter((s) => s.trim());
    if (!goodSteps.length) return setErr("Add at least one step.");
    const m = {};
    for (const k of ["cal", "protein", "carbs", "fat", "fiber", "sodium"]) m[k] = Math.max(0, parseInt(macros[k]) || 0);
    onSave({
      id: "u" + Date.now(), name: f.name.trim(), emoji: f.emoji.trim() || "🍽️",
      grad: GRAD_POOL[Date.now() % GRAD_POOL.length], photo: f.photo,
      cat: f.cat, replica: f.replica.trim() || null, level: f.level,
      time: Math.max(1, parseInt(f.time) || 30), serves: Math.max(1, parseInt(f.serves) || 4),
      author: "you", likes: 0, tags: f.tags, desc: f.desc.trim() || "A homemade original.",
      macros: m,
      ingredients: goodIngs.map((i) => ({ n: i.n.trim(), qty: i.qty.trim() || "to taste", price: Math.max(0, parseFloat(i.price) || 0), allergens: [], alts: [] })),
      steps: goodSteps.map((s) => s.trim()),
    });
  }

  const numIn = (v, on, ph, w = 70) => <input className="inp" style={{ width: w, padding: "8px 10px" }} inputMode="numeric" placeholder={ph} value={v} onChange={on} />;

  return (
    <div className="ovl" onClick={onClose}>
      <div className="modal" style={{ padding: 22 }} onClick={(e) => e.stopPropagation()}>
        <h2 style={{ fontSize: 17, marginBottom: 4 }}>Create a recipe</h2>
        <p className="sub" style={{ marginBottom: 16 }}>Share your dish with the community — it joins Discover, plans, and carts like any other recipe.</p>

        <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
          <input className="inp" style={{ width: 64, textAlign: "center", fontSize: 20 }} value={f.emoji} onChange={(e) => set("emoji", e.target.value)} aria-label="Recipe emoji" />
          <input className="inp" placeholder="Recipe name" value={f.name} onChange={(e) => set("name", e.target.value)} />
        </div>
        <input ref={photoRef} type="file" accept="image/*" style={{ display: "none" }} onChange={(e) => { const file = e.target.files && e.target.files[0]; if (file) set("photo", URL.createObjectURL(file)); e.target.value = ""; }} />
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
          {f.photo
            ? <><img src={f.photo} alt="Dish" style={{ height: 64, borderRadius: 10, objectFit: "cover" }} /><button className="chip" onClick={() => set("photo", null)}>✕ Remove photo</button></>
            : <button className="chip" onClick={() => photoRef.current.click()}>📷 Add a photo of the dish (recommended)</button>}
        </div>
        <textarea className="inp" rows="2" style={{ resize: "vertical", marginBottom: 10 }} placeholder="One-line description — sell the dish!" value={f.desc} onChange={(e) => set("desc", e.target.value)} />

        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 10 }}>
          <select className="inp" style={{ width: "auto" }} value={f.cat} onChange={(e) => set("cat", e.target.value)}>
            <option value="main">Main</option><option value="dessert">Dessert</option><option value="drink">Drink</option><option value="beginner">Beginner</option>
          </select>
          <select className="inp" style={{ width: "auto" }} value={f.level} onChange={(e) => set("level", e.target.value)}>
            <option>Beginner</option><option>Intermediate</option><option>Advanced</option>
          </select>
          {numIn(f.time, (e) => set("time", e.target.value), "min")}
          {numIn(f.serves, (e) => set("serves", e.target.value), "serves")}
          <input className="inp" style={{ width: 150 }} placeholder="Replica of… (optional)" value={f.replica} onChange={(e) => set("replica", e.target.value)} />
        </div>

        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 14 }}>
          {DIETS.map((d) => <button key={d} className={"chip" + (f.tags.includes(d) ? " on" : "")} onClick={() => set("tags", f.tags.includes(d) ? f.tags.filter((x) => x !== d) : [...f.tags, d])}>{d}</button>)}
        </div>

        <div className="eyebrow" style={{ marginBottom: 6 }}>Ingredients</div>
        {ings.map((ing, i) => (
          <div key={i} style={{ display: "flex", gap: 6, marginBottom: 6 }}>
            <input className="inp" style={{ flex: 2, padding: "8px 10px" }} placeholder="Ingredient" value={ing.n} onChange={(e) => setIngs((a) => a.map((x, j) => j === i ? { ...x, n: e.target.value } : x))} />
            <input className="inp" style={{ flex: 1, padding: "8px 10px" }} placeholder="Qty (2 cups)" value={ing.qty} onChange={(e) => setIngs((a) => a.map((x, j) => j === i ? { ...x, qty: e.target.value } : x))} />
            <input className="inp" style={{ width: 76, padding: "8px 10px" }} inputMode="decimal" placeholder="$" value={ing.price} onChange={(e) => setIngs((a) => a.map((x, j) => j === i ? { ...x, price: e.target.value } : x))} />
            {ings.length > 1 && <button className="chip" onClick={() => setIngs((a) => a.filter((_, j) => j !== i))}>✕</button>}
          </div>
        ))}
        <button className="chip" style={{ marginBottom: 14 }} onClick={() => setIngs((a) => [...a, { n: "", qty: "", price: "" }])}>＋ ingredient</button>

        <div className="eyebrow" style={{ marginBottom: 6 }}>Steps</div>
        {steps.map((s, i) => (
          <div key={i} style={{ display: "flex", gap: 6, marginBottom: 6 }}>
            <input className="inp" style={{ padding: "8px 10px" }} placeholder={"Step " + (i + 1)} value={s} onChange={(e) => setSteps((a) => a.map((x, j) => j === i ? e.target.value : x))} />
            {steps.length > 1 && <button className="chip" onClick={() => setSteps((a) => a.filter((_, j) => j !== i))}>✕</button>}
          </div>
        ))}
        <button className="chip" style={{ marginBottom: 14 }} onClick={() => setSteps((a) => [...a, ""])}>＋ step</button>

        <div className="eyebrow" style={{ marginBottom: 6 }}>Macros per serving (optional)</div>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 14 }}>
          {numIn(macros.cal, (e) => setMacros((m) => ({ ...m, cal: e.target.value })), "cal")}
          {numIn(macros.protein, (e) => setMacros((m) => ({ ...m, protein: e.target.value })), "protein g")}
          {numIn(macros.carbs, (e) => setMacros((m) => ({ ...m, carbs: e.target.value })), "carbs g")}
          {numIn(macros.fat, (e) => setMacros((m) => ({ ...m, fat: e.target.value })), "fat g")}
          {numIn(macros.fiber, (e) => setMacros((m) => ({ ...m, fiber: e.target.value })), "fiber g")}
          {numIn(macros.sodium, (e) => setMacros((m) => ({ ...m, sodium: e.target.value })), "sodium mg", 90)}
        </div>

        {err && <p style={{ color: "#FF7A9C", fontSize: 12.5, marginBottom: 10 }}>{err}</p>}
        <div style={{ display: "flex", gap: 8 }}>
          <button className="btn btn-grad" style={{ flex: 1 }} onClick={save}>Publish recipe 🍳</button>
          <button className="btn btn-ghost" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

function CookMode({ r, onClose, onDone }) {
  const [i, setI] = useState(0);
  const [timer, setTimer] = useState(null); // {left, total}
  useEffect(() => {
    if (!timer || timer.left <= 0) return;
    const t = setTimeout(() => setTimer((x) => x && { ...x, left: x.left - 1 }), 1000);
    return () => clearTimeout(t);
  }, [timer]);
  const step = r.steps[i];
  const m = step.match(/(\d+)\s*(?:[–-]\s*\d+\s*)?min/i);
  const mins = m ? parseInt(m[1]) : null;
  const fmt = (s) => Math.floor(s / 60) + ":" + String(s % 60).padStart(2, "0");
  const last = i === r.steps.length - 1;

  return (
    <div className="ovl" style={{ alignItems: "stretch", padding: 0 }}>
      <div style={{ background: "var(--ink)", width: "100%", display: "flex", flexDirection: "column", padding: "24px 22px calc(24px + env(safe-area-inset-bottom))" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
          <span style={{ fontSize: 26 }}>{r.emoji}</span>
          <b style={{ fontSize: 15, flex: 1 }}>{r.name}</b>
          <button className="chip" onClick={onClose}>✕ Exit</button>
        </div>
        <div className="macrobar" style={{ height: 6, marginBottom: 26 }}><i style={{ width: ((i + 1) / r.steps.length) * 100 + "%" }} /></div>

        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", textAlign: "center" }}>
          <div className="eyebrow" style={{ marginBottom: 14 }}>Step {i + 1} of {r.steps.length}</div>
          <p style={{ fontSize: "clamp(22px, 4.5vw, 34px)", lineHeight: 1.45, fontWeight: 600, maxWidth: 680, margin: "0 auto" }}>{step}</p>
          {mins && !timer && (
            <button className="btn btn-grad" style={{ margin: "26px auto 0", fontSize: 15, padding: "13px 26px" }} onClick={() => setTimer({ left: mins * 60, total: mins * 60 })}>⏱ Start {mins}-minute timer</button>
          )}
          {timer && (
            <div style={{ marginTop: 26 }}>
              <div className="disp" style={{ fontSize: 52, color: timer.left === 0 ? "#7DE3A0" : "var(--white)" }}>{timer.left === 0 ? "Done! ✓" : fmt(timer.left)}</div>
              <div className="macrobar" style={{ height: 6, maxWidth: 300, margin: "12px auto 0" }}><i style={{ width: (100 - (timer.left / timer.total) * 100) + "%" }} /></div>
              <button className="chip" style={{ marginTop: 12 }} onClick={() => setTimer(null)}>Reset timer</button>
            </div>
          )}
        </div>

        <div style={{ display: "flex", gap: 10, justifyContent: "center", marginTop: 20 }}>
          <button className="btn btn-ghost" style={{ fontSize: 15, padding: "13px 26px" }} disabled={i === 0} onClick={() => { setI(i - 1); setTimer(null); }}>← Back</button>
          {!last
            ? <button className="btn btn-grad" style={{ fontSize: 15, padding: "13px 34px" }} onClick={() => { setI(i + 1); setTimer(null); }}>Next →</button>
            : <button className="btn btn-grad" style={{ fontSize: 15, padding: "13px 34px" }} onClick={onDone}>✅ Finished — I cooked it!</button>}
        </div>
      </div>
    </div>
  );
}

function Mention({ text }) {
  return <>{text.split(/(@[\w.]+)/g).map((p, i) => p.startsWith("@") ? <b key={i} style={{ color: "var(--royal-soft)" }}>{p}</b> : p)}</>;
}

function SearchOverlay({ onClose, openRecipe, addGrocery, follows, toggleFollow, posts }) {
  const [q, setQ] = useState("");
  const ql = q.trim().toLowerCase();
  const recs = ql ? allRecipes().filter((r) => r.name.toLowerCase().includes(ql) || r.tags.some((t) => t.toLowerCase().includes(ql))).slice(0, 5) : [];
  const grocs = ql ? GROCERIES.filter((g) => g.n.toLowerCase().includes(ql)).slice(0, 5) : [];
  const people = ql ? FRIENDS_INIT.filter((f) => (f.name + f.handle).toLowerCase().includes(ql)).slice(0, 4) : [];
  const foundPosts = ql ? posts.filter((p) => p.caption.toLowerCase().includes(ql)).slice(0, 3) : [];
  const empty = ql && !recs.length && !grocs.length && !people.length && !foundPosts.length;

  return (
    <div className="ovl" onClick={onClose} style={{ alignItems: "flex-start", paddingTop: 60 }}>
      <div className="modal" style={{ padding: 18 }} onClick={(e) => e.stopPropagation()}>
        <input className="inp" autoFocus placeholder="Search recipes, groceries, people, posts…" value={q} onChange={(e) => setQ(e.target.value)} style={{ marginBottom: 12, fontSize: 15, padding: "12px 14px" }} />
        {!ql && <p className="sub" style={{ fontSize: 12.5 }}>One search across everything — try "salmon", "vegan", "Maya", or "boba".</p>}
        {empty && <p className="sub">Nothing matched "{q}". Try a shorter word.</p>}

        {recs.length > 0 && <div className="eyebrow" style={{ margin: "6px 0" }}>Recipes</div>}
        {recs.map((r) => (
          <button key={r.id} style={{ display: "flex", width: "100%", alignItems: "center", gap: 10, padding: "8px 6px", borderRadius: 10, textAlign: "left" }} className="act" onClick={() => { openRecipe(r); onClose(); }}>
            <span style={{ fontSize: 20 }}>{r.emoji}</span>
            <span style={{ flex: 1, color: "var(--white)" }}>{r.name}</span>
            <span style={{ fontSize: 11 }}>{r.time} min</span>
          </button>
        ))}

        {grocs.length > 0 && <div className="eyebrow" style={{ margin: "6px 0" }}>Groceries</div>}
        {grocs.map((g) => (
          <div key={g.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 6px" }}>
            <span style={{ fontSize: 20 }}>{g.emoji}</span>
            <span style={{ flex: 1, fontSize: 13.5 }}>{g.n} <span style={{ color: "var(--dim)", fontSize: 11.5 }}>· {g.size}</span></span>
            <button className="chip" onClick={() => addGrocery(g)}>＋ Cart</button>
          </div>
        ))}

        {people.length > 0 && <div className="eyebrow" style={{ margin: "6px 0" }}>People</div>}
        {people.map((f) => (
          <div key={f.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 6px" }}>
            <span style={{ fontSize: 20 }}>{f.emoji}</span>
            <span style={{ flex: 1, fontSize: 13.5 }}>{f.name} <span style={{ color: "var(--dim)", fontSize: 11.5 }}>@{f.handle}</span></span>
            <button className={"chip" + (follows.includes(f.handle) ? " on" : "")} onClick={() => toggleFollow(f.handle)}>{follows.includes(f.handle) ? "Following ✓" : "Follow"}</button>
          </div>
        ))}

        {foundPosts.length > 0 && <div className="eyebrow" style={{ margin: "6px 0" }}>Posts</div>}
        {foundPosts.map((p) => (
          <div key={p.id} style={{ padding: "8px 6px", fontSize: 12.5, color: "var(--muted)" }}>
            <b style={{ color: "var(--royal-soft)" }}>@{p.user}</b> {p.caption.slice(0, 80)}{p.caption.length > 80 ? "…" : ""}
          </div>
        ))}
      </div>
    </div>
  );
}

function NotifPanel({ notifs, onClose, markRead }) {
  useEffect(() => { markRead(); }, []);
  return (
    <div className="ovl" onClick={onClose} style={{ alignItems: "flex-start", justifyContent: "flex-end", padding: "56px 16px 16px" }}>
      <div className="modal" style={{ padding: 16, width: "min(380px, 100%)", maxHeight: "72vh" }} onClick={(e) => e.stopPropagation()}>
        <div style={{ display: "flex", alignItems: "center", marginBottom: 10 }}>
          <b style={{ fontSize: 15, flex: 1 }}>🔔 Notifications</b>
          <button className="chip" onClick={onClose}>Close</button>
        </div>
        {notifs.length === 0 && <p className="sub">All quiet for now — cook something, join a challenge, or post to get things buzzing.</p>}
        {notifs.map((n) => (
          <div key={n.id} style={{ display: "flex", gap: 10, padding: "10px 4px", borderBottom: "1px solid var(--line)", opacity: n.read ? 0.65 : 1 }}>
            <span style={{ fontSize: 18 }}>{n.icon}</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, lineHeight: 1.45 }}><Mention text={n.text} /></div>
              <div style={{ fontSize: 10.5, color: "var(--dim)", marginTop: 2 }}>{n.time}</div>
            </div>
            {!n.read && <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--royal)", marginTop: 6, flexShrink: 0 }} />}
          </div>
        ))}
      </div>
    </div>
  );
}

function ReportModal({ target, onClose, onReport, onBlock, onMute }) {
  const REASONS = ["Spam", "Harassment", "Dangerous content", "Misinformation", "Something else"];
  const [reason, setReason] = useState(null);
  return (
    <div className="ovl" onClick={onClose}>
      <div className="modal" style={{ padding: 20 }} onClick={(e) => e.stopPropagation()}>
        <h2 style={{ fontSize: 16, marginBottom: 4 }}>Report @{target.user}</h2>
        <p className="sub" style={{ marginBottom: 14 }}>Help us keep GrubGrounds a good table to sit at. What's wrong with this post?</p>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 16 }}>
          {REASONS.map((r) => <button key={r} className={"chip" + (reason === r ? " on" : "")} onClick={() => setReason(r)}>{r}</button>)}
        </div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <button className="btn btn-grad" disabled={!reason} onClick={() => { onReport(reason); onClose(); }}>Submit report</button>
          <button className="btn btn-ghost" onClick={() => { onMute(target.user); onClose(); }}>🔕 Mute @{target.user}</button>
          <button className="btn btn-ghost" style={{ borderColor: "#FF7A9C", color: "#FF7A9C" }} onClick={() => { onBlock(target.user); onClose(); }}>🚫 Block @{target.user}</button>
          <button className="chip" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

/* ---------------- COMMUNITIES (creator channels) ---------------- */

const COMMUNITIES_INIT = [
  { id: "cm1", name: "Maya's Sauce Lab", emoji: "🍝", creator: "chef.maya", members: 4218, desc: "Sauce science, pan drama, and weekly technique drops from Maya's kitchen." },
  { id: "cm2", name: "Replica Nation", emoji: "🎭", creator: "grubking_j", members: 6934, desc: "We remake restaurant hits for a fraction of the price. Receipts required." },
  { id: "cm3", name: "Plant Gang", emoji: "🌱", creator: "plantlife.ari", members: 3512, desc: "Fully plant-based, fully flavorful. Swaps, hauls, and zero preaching." },
  { id: "cm4", name: "Sweet Tooth Society", emoji: "🧁", creator: "sweet.tina", members: 5127, desc: "Desserts only. Lava flows, no-bake hacks, and frosting confessions." },
  { id: "cm5", name: "Sip Club", emoji: "🧋", creator: "sip.society", members: 2288, desc: "Boba, agua frescas, and drinks that cost $7 outside and $1.50 here." },
];

const COMM_MSGS = {
  cm1: [
    { id: "m1", t: "Dropping a 3-ingredient pan sauce technique Friday — have butter, stock, and something acidic ready 🔥", time: "2h", early: true },
    { id: "m2", t: "Poll results are in: next week we're breaking down vodka sauce. 62% of you voted for it!", time: "1d" },
  ],
  cm2: [
    { id: "m1", t: "Chick-fil-A sauce replica hits DIFFERENT. Recipe drops tomorrow, start your honey mustard engines 🍯", time: "4h", early: true },
    { id: "m2", t: "Community challenge: replicate your favorite fast-food breakfast this weekend. Tag your posts!", time: "2d" },
  ],
  cm3: [{ id: "m1", t: "Crispy tofu masterclass this week. The secret is pressing AND cornstarch. Yes, both.", time: "6h" }],
  cm4: [{ id: "m1", t: "No-bake cheesecake cups are trending in the community — 400+ of you cooked it this week 🥹", time: "3h" }],
  cm5: [{ id: "m1", t: "Tiger stripe tutorial passed 1k saves! Next up: brown sugar cold foam. Bring oat milk.", time: "8h" }],
};

const REACT_SET = ["🔥", "❤️", "😂", "👏"];

function CommMsgText({ text }) {
  const [trans, setTrans] = useState(null);
  const [show, setShow] = useState(false);
  const [busy, setBusy] = useState(false);
  async function go() {
    if (show) { setShow(false); return; }
    if (trans) { setShow(true); return; }
    setBusy(true);
    try { const t = await aiTranslate(text, CURRENT_LANG); if (t) { setTrans(t); setShow(true); } } catch (e) {}
    setBusy(false);
  }
  return (
    <div>
      <p style={{ fontSize: 13.5, lineHeight: 1.55, marginTop: 4 }}>{show && trans ? trans : text}</p>
      {CURRENT_LANG !== "en" && <button style={{ fontSize: 11, color: "var(--royal-soft)", marginTop: 2 }} onClick={go}>{busy ? "…" : "🌐 " + (show ? T("original") : T("translate"))}</button>}
    </div>
  );
}

function CommunitiesScreen({ joined, setJoined, myComms, setMyComms, commPosts, setCommPosts, reacts, setReacts, showToast, plus, goPlus }) {
  const [open, setOpen] = useState(null);
  const [creating, setCreating] = useState(false);
  const [nf, setNf] = useState({ name: "", emoji: "📣", desc: "" });
  const [msg, setMsg] = useState("");
  const all = [...myComms, ...COMMUNITIES_INIT];
  const comm = open ? all.find((c) => c.id === open) : null;
  const isMine = comm && myComms.some((c) => c.id === comm.id);
  const isJoined = comm && (joined.includes(comm.id) || isMine);

  function toggleReact(msgId, emoji) {
    const key = open + ":" + msgId + ":" + emoji;
    setReacts((r) => ({ ...r, [key]: !r[key] }));
  }
  function reactCount(msgId, emoji, base) {
    const key = open + ":" + msgId + ":" + emoji;
    return base + (reacts[key] ? 1 : 0);
  }
  function createComm() {
    if (nf.name.trim().length < 3) return;
    const c = { id: "myc" + Date.now(), name: nf.name.trim(), emoji: nf.emoji.trim() || "📣", creator: "you", members: 1, desc: nf.desc.trim() || "A brand-new community." };
    setMyComms((m) => [c, ...m]);
    setCreating(false); setNf({ name: "", emoji: "📣", desc: "" });
    setOpen(c.id);
    showToast("📢 Community created — you're the creator. Post your first update!");
  }
  function postToComm() {
    if (!msg.trim()) return;
    setCommPosts((p) => ({ ...p, [open]: [{ id: "u" + Date.now(), t: msg.trim(), time: "now" }, ...(p[open] || [])] }));
    setMsg("");
  }

  if (comm) {
    const msgs = [...(commPosts[comm.id] || []), ...(COMM_MSGS[comm.id] || [])];
    const baseFor = (mid, e) => ((mid.charCodeAt(1) || 7) * (REACT_SET.indexOf(e) + 3)) % 90 + 4;
    return (
      <div style={{ maxWidth: 620, margin: "0 auto" }}>
        <button className="chip" style={{ marginBottom: 14 }} onClick={() => setOpen(null)}>← Communities</button>
        <div className="card" style={{ padding: 18, marginBottom: 16, display: "flex", gap: 14, alignItems: "center", flexWrap: "wrap" }}>
          <span style={{ fontSize: 36 }}>{comm.emoji}</span>
          <div style={{ flex: 1, minWidth: 180 }}>
            <b style={{ fontSize: 15 }}>{comm.name}</b>
            <div style={{ fontSize: 11.5, color: "var(--dim)" }}>by @{comm.creator} · {(comm.members + (joined.includes(comm.id) ? 1 : 0)).toLocaleString()} members</div>
            <p className="sub" style={{ fontSize: 12, marginTop: 4 }}>{comm.desc}</p>
          </div>
          {!isMine && <button className={isJoined ? "chip on" : "btn btn-grad"} onClick={() => setJoined((j) => j.includes(comm.id) ? j.filter((x) => x !== comm.id) : [...j, comm.id])}>{isJoined ? "✓ Joined" : "Join"}</button>}
          {isMine && <span className="pill-sm tag-purp">👑 Your community</span>}
        </div>

        {isMine && (
          <div className="card" style={{ padding: 14, marginBottom: 16, display: "flex", gap: 8 }}>
            <input className="inp" placeholder="Post an update to your members…" value={msg} onChange={(e) => setMsg(e.target.value)} onKeyDown={(e) => e.key === "Enter" && postToComm()} />
            <button className="btn btn-grad" onClick={postToComm}>Post</button>
          </div>
        )}
        {!isMine && <p className="sub" style={{ fontSize: 11.5, marginBottom: 14 }}>📢 Only @{comm.creator} posts here — react to join the conversation.</p>}

        {msgs.length === 0 && <div className="card" style={{ padding: 22 }}><p className="sub">No posts yet. {isMine ? "Share your first update above!" : "The creator hasn't posted yet."}</p></div>}
        {msgs.map((m) => m.early && !plus ? (
          <div key={m.id} className="card" style={{ padding: 16, marginBottom: 12, borderStyle: "dashed", textAlign: "center" }}>
            <div style={{ fontSize: 22, marginBottom: 6 }}>⚡</div>
            <b style={{ fontSize: 13 }}>Early access drop</b>
            <p className="sub" style={{ fontSize: 12, margin: "6px 0 10px" }}>@{comm.creator} just posted something new. It unlocks for everyone in 24 hours — GrubPlus members see it now.</p>
            <button className="chip on" onClick={goPlus}>✦ Get GrubPlus early access</button>
          </div>
        ) : (
          <div key={m.id} className="card" style={{ padding: 16, marginBottom: 12 }}>
            {m.early && <span className="pill-sm" style={{ background: "rgba(245,197,66,.15)", color: "#F5C542", marginBottom: 10, display: "inline-block" }}>⚡ Early access · yours 24h before everyone</span>}
            <div style={{ display: "flex", gap: 10, marginBottom: 10 }}>
              <span style={{ fontSize: 20 }}>{comm.emoji}</span>
              <div>
                <b style={{ fontSize: 12.5, color: "var(--royal-soft)" }}>@{isMine && m.id.startsWith("u") ? "you" : comm.creator}{isMine && m.id.startsWith("u") && plus && <span title="GrubPlus member" style={{ color: "#F5C542", marginLeft: 2 }}>✦</span>}</b>
                <span style={{ fontSize: 10.5, color: "var(--dim)" }}> · {m.time}</span>
                <CommMsgText text={m.t} />
              </div>
            </div>
            <div style={{ display: "flex", gap: 6 }}>
              {REACT_SET.map((e) => {
                const key = comm.id + ":" + m.id + ":" + e;
                const on = !!reacts[key];
                return <button key={e} className={"chip" + (on ? " on" : "")} style={{ padding: "5px 10px", fontSize: 12 }} onClick={() => toggleReact(m.id, e)}>{e} {reactCount(m.id, e, baseFor(m.id, e))}</button>;
              })}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 720, margin: "0 auto" }}>
      <div style={{ display: "flex", alignItems: "flex-start", gap: 12, flexWrap: "wrap" }}>
        <div style={{ flex: 1, minWidth: 220 }}>
          <div className="eyebrow">Communities</div>
          <h1 className="h-page">{T("comT")}</h1>
          <p className="sub" style={{ marginBottom: 16 }}>Creator-run channels for the content you love — join in, react, and never miss a drop.</p>
        </div>
        <button className="btn btn-grad" onClick={() => setCreating(true)}>＋ Create community</button>
      </div>

      {creating && (
        <div className="card" style={{ padding: 18, marginBottom: 16 }}>
          <div className="eyebrow" style={{ marginBottom: 10 }}>New community</div>
          <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
            <input className="inp" style={{ width: 64, textAlign: "center", fontSize: 20 }} value={nf.emoji} onChange={(e) => setNf((x) => ({ ...x, emoji: e.target.value }))} aria-label="Community emoji" />
            <input className="inp" placeholder="Community name" value={nf.name} onChange={(e) => setNf((x) => ({ ...x, name: e.target.value }))} />
          </div>
          <input className="inp" style={{ marginBottom: 12 }} placeholder="What's it about? One line." value={nf.desc} onChange={(e) => setNf((x) => ({ ...x, desc: e.target.value }))} />
          <div style={{ display: "flex", gap: 8 }}>
            <button className="btn btn-grad" onClick={createComm}>Create 📢</button>
            <button className="btn btn-ghost" onClick={() => setCreating(false)}>Cancel</button>
          </div>
        </div>
      )}

      {(myComms.length > 0 || joined.length > 0) && <div className="eyebrow" style={{ marginBottom: 8 }}>Your communities</div>}
      <div className="grid" style={{ marginBottom: 22 }}>
        {[...myComms, ...COMMUNITIES_INIT.filter((c) => joined.includes(c.id))].map((c) => (
          <button key={c.id} className="card rcard" style={{ padding: 16, textAlign: "left" }} onClick={() => setOpen(c.id)}>
            <div style={{ fontSize: 28, marginBottom: 8 }}>{c.emoji}</div>
            <b style={{ fontSize: 13.5, display: "block" }}>{c.name}</b>
            <div style={{ fontSize: 11, color: "var(--dim)", marginTop: 3 }}>@{c.creator} · {(c.members + (joined.includes(c.id) ? 1 : 0)).toLocaleString()} members</div>
          </button>
        ))}
      </div>

      <div className="eyebrow" style={{ marginBottom: 8 }}>Discover communities</div>
      <div className="grid">
        {COMMUNITIES_INIT.filter((c) => !joined.includes(c.id)).map((c) => (
          <div key={c.id} className="card" style={{ padding: 16 }}>
            <div style={{ fontSize: 28, marginBottom: 8 }}>{c.emoji}</div>
            <b style={{ fontSize: 13.5, display: "block" }}>{c.name}</b>
            <div style={{ fontSize: 11, color: "var(--dim)", margin: "3px 0 8px" }}>@{c.creator} · {c.members.toLocaleString()} members</div>
            <p className="sub" style={{ fontSize: 12, marginBottom: 12, lineHeight: 1.5 }}>{c.desc}</p>
            <div style={{ display: "flex", gap: 8 }}>
              <button className="btn btn-grad" style={{ padding: "8px 16px" }} onClick={() => { setJoined((j) => [...j, c.id]); showToast("Joined " + c.name + " " + c.emoji); }}>Join</button>
              <button className="chip" onClick={() => setOpen(c.id)}>Peek inside</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------- SETTINGS TAB (account & legal) ---------------- */

const TERMS_TEXT = `1. The basics — GrubGrounds is a platform for sharing recipes, food content, and shopping for groceries through partner stores. By using the app you agree to use it respectfully and lawfully.

2. Your content — recipes, posts, and photos you share remain yours. By posting, you give GrubGrounds a license to display them within the app so other members can see and cook them.

3. Community rules — no harassment, spam, dangerous "recipes," or content that puts anyone at risk. We can remove content or accounts that break these rules.

4. Health & allergies — allergy flags, swaps, macros, and scanner results are helpful estimates, not medical advice. Always check labels yourself, especially for severe allergies.

5. Orders & pricing — grocery orders are fulfilled by partner stores. Prices, deals, and delivery estimates can change and may vary from what's shown. GrubGrounds may earn a commission on orders at no extra cost to you.

6. GrubPlus — subscriptions renew until canceled. You can pause or cancel anytime from Settings; perks stop at the end of the paid period. Free trials convert to paid unless canceled before the trial ends.

7. Your data — we store your preferences (pantry, plans, orders, theme) to run your experience. Deleting your account removes this data. We don't sell your personal data.

8. Changes — we may update these terms as the product grows; meaningful changes will be announced in-app.

This is a demo document for the GrubGrounds prototype — a production launch requires terms reviewed by a lawyer.`;

function SettingsTab({ lang, setLang, planTypeName, plus, subPaused, setSubPaused, cancelSub, contactSupport, deleteAccount, showToast, blocked, unblock, muted, setMuted, notifPrefs, setNotifPrefs, audience, setAudience, favorites, setFavorites, friends, posts, restorePost, startPlus, planType, setPlanType, theme, applyTheme, aiEnabled, setAiEnabled, showTutorial }) {
  const [showTerms, setShowTerms] = useState(false);
  const [confirmCancel, setConfirmCancel] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [revStars, setRevStars] = useState(0);
  const [revText, setRevText] = useState("");
  const [revSent, setRevSent] = useState(false);
  const [query, setQuery] = useState("");
  const isPreset = THEMES.some((t) => t.id === theme.id);
  const q = query.trim().toLowerCase();
  const show = (kw) => !q || kw.includes(q) || q.split(" ").every((w) => kw.includes(w));
  const myPosts = posts.filter((p) => p.user === "you" && !p.archived);
  const archived = posts.filter((p) => p.user === "you" && p.archived);

  return (
    <div style={{ maxWidth: 560, margin: "0 auto" }}>
      <div className="eyebrow">Settings</div>
      <h1 className="h-page">{T("setT")}</h1>
      <p className="sub" style={{ marginBottom: 14 }}>Everything about your account, privacy, and app experience.</p>

      <input className="inp" style={{ marginBottom: 16, padding: "12px 14px" }} placeholder={'🔍 Search settings… (try "theme", "privacy", "delete")'} value={query} onChange={(e) => setQuery(e.target.value)} />
      {q && <p className="sub" style={{ fontSize: 11.5, marginBottom: 12 }}>Showing settings matching "{query}" — clear the search to see everything.</p>}

      {show("grubplus subscription membership plan trial upgrade perks") && (<div>
      <div className="card" style={{ padding: 20, marginBottom: 14, background: "linear-gradient(120deg, rgba(31,169,244,.1), rgba(104,18,181,.16))", borderColor: plus ? "#7DE3A0" : "var(--royal)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
          <b className="disp" style={{ fontSize: 17 }}>Grub<span style={{ background: "var(--grad)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>Plus</span></b>
          {plus
            ? <span className="pill-sm" style={{ background: "rgba(125,227,160,.15)", color: "#7DE3A0" }}>✓ Trial active · {planType === "annual" ? "$59.99/yr" : "$7.99/mo"}</span>
            : <span className="pill-sm tag-dark">7-day free trial</span>}
        </div>
        {!plus && (
          <div style={{ display: "grid", gap: 8, gridTemplateColumns: "1fr 1fr", marginBottom: 12 }}>
            <button className="card" style={{ padding: "12px 14px", textAlign: "left", borderColor: planType === "monthly" ? "var(--royal)" : "var(--line)" }} onClick={() => setPlanType("monthly")}>
              <b style={{ fontSize: 13.5, display: "block" }}>Monthly</b>
              <span style={{ fontSize: 12, color: "var(--muted)" }}>$7.99 / month</span>
            </button>
            <button className="card" style={{ padding: "12px 14px", textAlign: "left", borderColor: planType === "annual" ? "var(--royal)" : "var(--line)", position: "relative" }} onClick={() => setPlanType("annual")}>
              <span className="pill-sm" style={{ position: "absolute", top: -8, right: 8, background: "rgba(125,227,160,.9)", color: "#08320F" }}>Save 37%</span>
              <b style={{ fontSize: 13.5, display: "block" }}>Annual</b>
              <span style={{ fontSize: 12, color: "var(--muted)" }}>$59.99 / year <s style={{ color: "var(--dim)" }}>$95.88</s></span>
            </button>
          </div>
        )}
        <p className="sub" style={{ marginBottom: 12 }}>The feed, recipes, and shopping are free forever. GrubPlus unlocks the power tools — and usually pays for itself in grocery savings.</p>
        <div style={{ display: "grid", gap: 6, gridTemplateColumns: "repeat(auto-fit,minmax(210px,1fr))", marginBottom: 14 }}>
          {["✨ AI assistant + cooking mode", "📷 Food scanner (all 3 modes)", "🎯 Custom dietary plan builder", "💸 Advanced budget + savings alerts", "🚚 Rotating delivery deals & discounts", "⚡ Early access to creator drops (24h head start)", "✦ Plus member badge on your posts"].map((f) => (
            <div key={f} style={{ fontSize: 12.5, color: "var(--muted)" }}>{f}</div>
          ))}
        </div>
        {!plus && <button className="btn btn-grad" onClick={startPlus}>Start 7-day free trial · then {planType === "annual" ? "$59.99/yr" : "$7.99/mo"}</button>}
        {plus && (
          <div>
            <div className="eyebrow" style={{ marginBottom: 6 }}>🚚 Your current delivery deals</div>
            {activePlusDeals().map((d) => <div key={d.id} style={{ fontSize: 12.5, color: "#7DE3A0", padding: "2px 0" }}>✓ {d.label}</div>)}
            <p className="sub" style={{ fontSize: 12, marginTop: 8 }}>Fresh deals rotate in every two weeks and apply automatically at checkout. Thanks for being a GrubPlus member 💙💜</p>
          </div>
        )}
      </div>
      </div>)}

      {show("theme color appearance custom") && (<div>
      <div className="card" style={{ padding: 18, marginBottom: 14 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 12 }}>
          <div style={{ fontSize: 24 }}>🎨</div>
          <div>
            <b style={{ fontSize: 14 }}>Themes</b>
            <p className="sub" style={{ fontSize: 12 }}>Recolor the whole app. Blue is the default — or build your own.</p>
          </div>
        </div>
        <div style={{ display: "grid", gap: 10, gridTemplateColumns: "repeat(auto-fill,minmax(104px,1fr))", marginBottom: 16 }}>
          {THEMES.map((t) => {
            const on = theme.id === t.id;
            return (
              <button key={t.id} onClick={() => applyTheme(t)}
                style={{ padding: 10, borderRadius: 14, border: "1px solid " + (on ? t.a : "var(--line)"), background: on ? "var(--panel2)" : "var(--panel)", textAlign: "center" }}>
                <div style={{ width: 40, height: 40, borderRadius: "50%", margin: "0 auto 8px", background: `linear-gradient(120deg, ${t.a}, ${t.b})`, boxShadow: on ? `0 0 0 3px var(--ink), 0 0 0 5px ${t.a}` : "none" }} />
                <div style={{ fontSize: 11, color: on ? "var(--white)" : "var(--muted)", fontWeight: 600 }}>{t.name}{t.id === "saiyan" ? " · default" : ""}</div>
              </button>
            );
          })}
        </div>
        <div className="eyebrow" style={{ marginBottom: 8 }}>Custom colors</div>
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap", alignItems: "center" }}>
          <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12.5, color: "var(--muted)" }}>
            Primary
            <input type="color" value={theme.a} onChange={(e) => applyTheme({ id: "custom", name: "Custom", a: e.target.value, b: theme.b })}
              style={{ width: 42, height: 32, border: "none", borderRadius: 8, background: "none", cursor: "pointer", padding: 0 }} aria-label="Primary theme color" />
          </label>
          <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12.5, color: "var(--muted)" }}>
            Secondary
            <input type="color" value={theme.b} onChange={(e) => applyTheme({ id: "custom", name: "Custom", a: theme.a, b: e.target.value })}
              style={{ width: 42, height: 32, border: "none", borderRadius: 8, background: "none", cursor: "pointer", padding: 0 }} aria-label="Secondary theme color" />
          </label>
          <div style={{ flex: 1, minWidth: 120, height: 32, borderRadius: 10, background: `linear-gradient(120deg, ${theme.a}, ${theme.b})` }} title="Live preview" />
          {!isPreset && <button className="chip" onClick={() => applyTheme(THEMES[0])}>Reset to default</button>}
        </div>
        <p className="sub" style={{ fontSize: 11.5, marginTop: 10 }}>Your theme colors flow through buttons, gradients, badges, and highlights everywhere. Black backgrounds and white text stay put for readability.</p>
      </div>
      </div>)}

      {show("ai assistant intelligence toggle") && (<div>
      <div className="card" style={{ padding: 18, marginBottom: 14, display: "flex", alignItems: "center", gap: 14 }}>
        <div style={{ fontSize: 24 }}>✨</div>
        <div style={{ flex: 1 }}>
          <b style={{ fontSize: 14 }}>AI assistant</b>
          <p className="sub" style={{ fontSize: 12 }}>Helps you navigate, pick recipes, shop, and cook. Fully optional — the app works without it.</p>
        </div>
        <button className={"chip" + (aiEnabled ? " on" : "")} onClick={() => setAiEnabled(!aiEnabled)} role="switch" aria-checked={aiEnabled}>{aiEnabled ? "On" : "Off"}</button>
      </div>
      </div>)}

      {show("tutorial walkthrough help replay") && (<div>
      <div className="card" style={{ padding: 18, display: "flex", alignItems: "center", gap: 14 }}>
        <div style={{ fontSize: 24 }}>📘</div>
        <div style={{ flex: 1 }}>
          <b style={{ fontSize: 14 }}>Tutorial</b>
          <p className="sub" style={{ fontSize: 12 }}>You saw this once when you first joined — replay the walkthrough anytime.</p>
        </div>
        <button className="chip" onClick={showTutorial}>Replay</button>
      </div>
      </div>)}

      {show("language idioma translate") && (<div>
      {/* language */}
      <div className="card" style={{ padding: 18, marginBottom: 14, display: "flex", alignItems: "center", gap: 14 }}>
        <div style={{ fontSize: 24 }}>🌐</div>
        <div style={{ flex: 1 }}>
          <b style={{ fontSize: 14 }}>Language</b>
          <p className="sub" style={{ fontSize: 12 }}>Navigation and greetings switch instantly. Full translation of all content ships with the production build.</p>
        </div>
        <select className="inp" style={{ width: "auto" }} value={lang} onChange={(e) => setLang(e.target.value)} aria-label="App language">
          {LANGS.map((l) => <option key={l.id} value={l.id}>{l.name}</option>)}
        </select>
      </div>
      </div>)}

      {show("subscription billing pause cancel resume plan") && (<div>
      {/* subscription management */}
      <div className="card" style={{ padding: 18, marginBottom: 14 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 10 }}>
          <div style={{ fontSize: 24 }}>💳</div>
          <div style={{ flex: 1 }}>
            <b style={{ fontSize: 14 }}>Subscription</b>
            <p className="sub" style={{ fontSize: 12 }}>
              {plus ? (subPaused ? "GrubPlus — paused. Perks are sleeping; resume anytime." : `GrubPlus — active (${planTypeName}). Perks and delivery deals are on.`) : "Free plan. Upgrade anytime from your Profile."}
            </p>
          </div>
          {plus && <span className="pill-sm" style={{ background: subPaused ? "rgba(245,197,66,.15)" : "rgba(125,227,160,.15)", color: subPaused ? "#F5C542" : "#7DE3A0" }}>{subPaused ? "⏸ Paused" : "✓ Active"}</span>}
        </div>
        {plus && (
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <button className="btn btn-ghost" onClick={() => { setSubPaused(!subPaused); showToast(subPaused ? "GrubPlus resumed — perks are back on ✨" : "GrubPlus paused — resume whenever you're ready ⏸"); }}>
              {subPaused ? "▶ Resume GrubPlus" : "⏸ Pause GrubPlus"}
            </button>
            {!confirmCancel
              ? <button className="btn btn-ghost" onClick={() => setConfirmCancel(true)}>Cancel subscription</button>
              : <>
                  <button className="btn btn-ghost" style={{ borderColor: "#FF7A9C", color: "#FF7A9C" }} onClick={() => { cancelSub(); setConfirmCancel(false); }}>Yes, cancel it</button>
                  <button className="chip" onClick={() => setConfirmCancel(false)}>Keep GrubPlus</button>
                </>}
          </div>
        )}
      </div>
      </div>)}

      {show("notifications alerts push likes comments") && (<div className="card" style={{ padding: 18, marginBottom: 14 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 10 }}>
          <div style={{ fontSize: 24 }}>🔔</div>
          <div><b style={{ fontSize: 14 }}>Notification settings</b><p className="sub" style={{ fontSize: 12 }}>Choose what's worth a ping.</p></div>
        </div>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {[["likes", "❤️ Likes"], ["comments", "💬 Comments"], ["follows", "👥 New followers"], ["orders", "📦 Orders"], ["streaks", "🔥 Streak reminders"], ["drops", "📢 Community drops"]].map(([k, label]) => (
            <button key={k} className={"chip" + (notifPrefs[k] !== false ? " on" : "")} onClick={() => setNotifPrefs((n) => ({ ...n, [k]: n[k] === false }))}>{label}</button>
          ))}
        </div>
      </div>)}

      {show("privacy audience who can see visibility private") && (<div className="card" style={{ padding: 18, marginBottom: 14 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 10 }}>
          <div style={{ fontSize: 24 }}>👁️</div>
          <div><b style={{ fontSize: 14 }}>Who can see your posts</b><p className="sub" style={{ fontSize: 12 }}>Applies to new posts you share.</p></div>
        </div>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {[["everyone", "🌍 Everyone"], ["followers", "👥 Followers only"], ["friends", "🤝 Friends only"]].map(([k, label]) => (
            <button key={k} className={"chip" + (audience === k ? " on" : "")} onClick={() => setAudience(k)}>{label}</button>
          ))}
        </div>
        {audience !== "everyone" && <p className="sub" style={{ fontSize: 11.5, marginTop: 8 }}>New posts are limited to {audience === "followers" ? "people who follow you" : "your mutual friends"}. Blocked users never see your posts either way.</p>}
      </div>)}

      {show("favorites favorite profiles algorithm feed priority star") && (<div className="card" style={{ padding: 18, marginBottom: 14 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 10 }}>
          <div style={{ fontSize: 24 }}>⭐</div>
          <div><b style={{ fontSize: 14 }}>Favorite profiles</b><p className="sub" style={{ fontSize: 12 }}>Your algorithm boost — favorites' posts rise to the top of your feed.</p></div>
        </div>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {friends.map((f) => (
            <button key={f.id} className={"chip" + (favorites.includes(f.handle) ? " on" : "")} onClick={() => setFavorites((fv) => fv.includes(f.handle) ? fv.filter((x) => x !== f.handle) : [...fv, f.handle])}>{favorites.includes(f.handle) ? "⭐" : "☆"} {f.name.split(" ")[0]}</button>
          ))}
        </div>
      </div>)}

      {show("muted mute silence hidden") && (<div className="card" style={{ padding: 18, marginBottom: 14 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: muted.length ? 10 : 0 }}>
          <div style={{ fontSize: 24 }}>🔕</div>
          <div><b style={{ fontSize: 14 }}>Muted users</b><p className="sub" style={{ fontSize: 12 }}>{muted.length ? "Their posts are hidden — they don't know, and you can still message." : "Nobody muted. Use the ⋯ menu on any post to quietly mute someone."}</p></div>
        </div>
        {muted.map((h) => (
          <div key={h} style={{ display: "flex", alignItems: "center", gap: 10, padding: "6px 0" }}>
            <span style={{ flex: 1, fontSize: 13 }}>@{h}</span>
            <button className="chip" onClick={() => setMuted((m) => m.filter((x) => x !== h))}>Unmute</button>
          </div>
        ))}
      </div>)}

      {show("post activity history my posts") && (<div className="card" style={{ padding: 18, marginBottom: 14 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 10 }}>
          <div style={{ fontSize: 24 }}>📈</div>
          <div><b style={{ fontSize: 14 }}>Post activity</b><p className="sub" style={{ fontSize: 12 }}>Everything you've shared, newest first.</p></div>
        </div>
        {myPosts.length === 0 && <p className="sub" style={{ fontSize: 12 }}>No posts yet.</p>}
        {myPosts.slice(0, 6).map((p) => (
          <div key={p.id} style={{ padding: "7px 0", borderBottom: "1px solid var(--line)", fontSize: 12.5 }}>
            <span style={{ color: "var(--muted)" }}>{(p.caption || "(media post)").slice(0, 52)}{(p.caption || "").length > 52 ? "…" : ""}</span>
            <div style={{ fontSize: 10.5, color: "var(--dim)", marginTop: 2 }}>♥ {p.likes} · 💬 {p.comments.length} · {p.time} ago{p.boosted && " · 🚀 boosted"}{p.pinned && " · 📌 pinned"}</div>
          </div>
        ))}
      </div>)}

      {show("insights analytics reach performance stats engagement") && (<div className="card" style={{ padding: 18, marginBottom: 14 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 12 }}>
          <div style={{ fontSize: 24 }}>📊</div>
          <div><b style={{ fontSize: 14 }}>Post insights</b><p className="sub" style={{ fontSize: 12 }}>How your content is landing.</p></div>
        </div>
        {(() => {
          const likes = myPosts.reduce((s, p) => s + p.likes, 0);
          const cmts = myPosts.reduce((s, p) => s + p.comments.length, 0);
          const reach = likes * 7 + myPosts.length * 40 + myPosts.filter((p) => p.boosted).reduce((s, p) => s + (p.boostBudget || 0) * 120, 0);
          const best = myPosts.slice().sort((a, b) => b.likes - a.likes)[0];
          return (
            <div>
              <div style={{ display: "flex", gap: 22, flexWrap: "wrap", marginBottom: 10 }}>
                <div className="stat"><b>{myPosts.length}</b><span>posts</span></div>
                <div className="stat"><b>{likes.toLocaleString()}</b><span>likes</span></div>
                <div className="stat"><b>{cmts}</b><span>comments</span></div>
                <div className="stat"><b>~{reach.toLocaleString()}</b><span>est. reach</span></div>
              </div>
              {best && <p className="sub" style={{ fontSize: 12 }}>🏆 Top post: "{(best.caption || "(media post)").slice(0, 44)}…" with {best.likes} likes</p>}
            </div>
          );
        })()}
      </div>)}

      {show("archive archived hidden posts restore") && (<div className="card" style={{ padding: 18, marginBottom: 14 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: archived.length ? 10 : 0 }}>
          <div style={{ fontSize: 24 }}>🗄️</div>
          <div><b style={{ fontSize: 14 }}>Archive</b><p className="sub" style={{ fontSize: 12 }}>{archived.length ? "Hidden from your feed and profile — restore anytime." : "Archive posts from their ✏️ edit menu to tuck them away without deleting."}</p></div>
        </div>
        {archived.map((p) => (
          <div key={p.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "6px 0", borderBottom: "1px solid var(--line)" }}>
            <span style={{ flex: 1, fontSize: 12.5, color: "var(--muted)" }}>{(p.caption || "(media post)").slice(0, 46)}…</span>
            <button className="chip" onClick={() => restorePost(p.id)}>↩ Restore</button>
          </div>
        ))}
      </div>)}

      {show("support help customer service contact email chat") && (<div>
      {/* customer service */}
      <div className="card" style={{ padding: 18, marginBottom: 14 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 10 }}>
          <div style={{ fontSize: 24 }}>🛟</div>
          <div>
            <b style={{ fontSize: 14 }}>Customer service</b>
            <p className="sub" style={{ fontSize: 12 }}>We reply fast — food problems can't wait.</p>
          </div>
        </div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <button className="btn btn-grad" onClick={contactSupport}>💬 Chat with support</button>
          <a className="btn btn-ghost" style={{ textDecoration: "none", display: "inline-block" }} href="mailto:support@grubgrounds.app?subject=GrubGrounds%20support">✉️ Email us</a>
        </div>
      </div>
      </div>)}

      {show("review rating feedback stars") && (<div>
      {/* leave a review */}
      <div className="card" style={{ padding: 18, marginBottom: 14 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 10 }}>
          <div style={{ fontSize: 24 }}>⭐</div>
          <div>
            <b style={{ fontSize: 14 }}>Leave a review</b>
            <p className="sub" style={{ fontSize: 12 }}>Tell us (and the world) how GrubGrounds is treating you.</p>
          </div>
        </div>
        {revSent ? (
          <p style={{ fontSize: 13, color: "#7DE3A0" }}>✓ Review submitted — thank you for the love! 💙💜</p>
        ) : (
          <>
            <div style={{ marginBottom: 10 }}>
              {[1, 2, 3, 4, 5].map((s) => (
                <button key={s} onClick={() => setRevStars(s)} style={{ fontSize: 28, color: revStars >= s ? "#F5C542" : "var(--line)", padding: "0 2px" }} aria-label={s + " stars"}>★</button>
              ))}
            </div>
            <textarea className="inp" rows="3" style={{ resize: "vertical", marginBottom: 10 }} placeholder="What do you love? What should we fix?" value={revText} onChange={(e) => setRevText(e.target.value)} />
            <button className="btn btn-grad" disabled={!revStars} onClick={() => { setRevSent(true); showToast("Thanks for the " + revStars + "-star review ⭐"); }}>Submit review</button>
          </>
        )}
      </div>
      </div>)}

      {show("terms conditions legal rules") && (<div>
      {/* terms */}
      <div className="card" style={{ padding: 18, marginBottom: 14 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ fontSize: 24 }}>📜</div>
          <div style={{ flex: 1 }}>
            <b style={{ fontSize: 14 }}>Terms & conditions</b>
            <p className="sub" style={{ fontSize: 12 }}>The rules of the road, in plain language.</p>
          </div>
          <button className="chip" onClick={() => setShowTerms(!showTerms)}>{showTerms ? "Hide" : "Read"}</button>
        </div>
        {showTerms && <p style={{ fontSize: 12.5, color: "var(--muted)", lineHeight: 1.65, whiteSpace: "pre-wrap", marginTop: 12, borderTop: "1px solid var(--line)", paddingTop: 12 }}>{TERMS_TEXT}</p>}
      </div>
      </div>)}

      {show("blocked block users") && (<div>
      {/* blocked users */}
      <div className="card" style={{ padding: 18, marginBottom: 14 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: blocked.length ? 10 : 0 }}>
          <div style={{ fontSize: 24 }}>🚫</div>
          <div>
            <b style={{ fontSize: 14 }}>Blocked users</b>
            <p className="sub" style={{ fontSize: 12 }}>{blocked.length ? "Their posts are hidden from your feed." : "Nobody blocked. Use the ⋯ menu on any post if someone crosses a line."}</p>
          </div>
        </div>
        {blocked.map((h) => (
          <div key={h} style={{ display: "flex", alignItems: "center", gap: 10, padding: "6px 0" }}>
            <span style={{ flex: 1, fontSize: 13 }}>@{h}</span>
            <button className="chip" onClick={() => unblock(h)}>Unblock</button>
          </div>
        ))}
      </div>
      </div>)}

      {show("delete account erase data remove danger") && (<div>
      {/* danger zone */}
      <div className="card" style={{ padding: 18, borderColor: "rgba(255,122,156,.4)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 10 }}>
          <div style={{ fontSize: 24 }}>🗑️</div>
          <div>
            <b style={{ fontSize: 14, color: "#FF7A9C" }}>Delete account</b>
            <p className="sub" style={{ fontSize: 12 }}>Permanently erases your pantry, plans, orders, streaks, badges, ratings, and subscription on this device. This cannot be undone.</p>
          </div>
        </div>
        {!confirmDelete
          ? <button className="btn btn-ghost" style={{ borderColor: "#FF7A9C", color: "#FF7A9C" }} onClick={() => setConfirmDelete(true)}>Delete my account…</button>
          : <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
              <span style={{ fontSize: 12.5, color: "#FF7A9C" }}>Are you absolutely sure?</span>
              <button className="btn btn-ghost" style={{ borderColor: "#FF7A9C", color: "#FF7A9C" }} onClick={() => { deleteAccount(); setConfirmDelete(false); }}>Yes — delete everything</button>
              <button className="chip" onClick={() => setConfirmDelete(false)}>Never mind</button>
            </div>}
      </div>
      </div>)}

    </div>
  );
}

/* ---------------- APP SHELL ---------------- */

function BarcodeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true" style={{ display: "inline-block", verticalAlign: "-3px" }}>
      {/* corner scan brackets */}
      <path d="M3 7V4h3M17 4h3v3M21 17v3h-3M7 20H4v-3" strokeWidth="1.8" />
      {/* barcode bars */}
      <line x1="8" y1="8.5" x2="8" y2="15.5" />
      <line x1="11" y1="8.5" x2="11" y2="15.5" strokeWidth="1.2" />
      <line x1="13.5" y1="8.5" x2="13.5" y2="15.5" strokeWidth="2.6" />
      <line x1="16.5" y1="8.5" x2="16.5" y2="15.5" strokeWidth="1.2" />
    </svg>
  );
}

const NAV = [
  { id: "feed", name: "Home", ic: "🏠" },
  { id: "discover", name: "Discover", ic: "🍳" },
  { id: "shop", name: "Shopping", ic: "🛒" },
  { id: "scan", name: "Scanner", ic: <BarcodeIcon /> },
  { id: "plans", name: "Plans", ic: "🎯" },
  { id: "gallery", name: "Gallery", ic: "📑" },
  { id: "friends", name: "Friends", ic: "👥" },
  { id: "communities", name: "Communities", ic: "📢" },
  { id: "settings", name: "Profile", ic: "👤" },
  { id: "sysset", name: "Settings", ic: "⚙️" },
];
const MOBILE_NAV = ["feed", "discover", "shop", "scan", "plans", "settings"];

export default function GrubGrounds() {
  const [screen, setScreen] = useState("feed");
  const [recipe, setRecipe] = useState(null);
  const [posts, setPosts] = useState(POSTS_INIT);
  const [friends, setFriends] = useState(FRIENDS_INIT);
  const [cart, setCart] = useState([]);
  const [store, setStore] = useState("kroger");
  const [budget, setBudget] = useState(50);
  const [saved, setSaved] = usePersistedState("gg_saved", [{ id: "r3", pub: false }]);
  const [filters, setFilters] = useState([]);
  const [allergies, setAllergies] = useState([]);
  const [viewed, setViewed] = useState([]);
  const [aiEnabled, setAiEnabled] = useState(true);
  const [aiOpen, setAiOpen] = useState(false);
  const [aiSeed, setAiSeed] = useState(null);
  // login disabled for now — re-enable with Supabase auth later (see AuthScreen)
  // first-time-only tutorial: shows once per device, replayable from Settings
  const [tutorial, setTutorial] = useState(() => persist.get("gg_tutorial_seen") !== "1");
  const [plus, setPlus] = useState(() => persist.get("gg_plus") === "1");
  const [theme, setTheme] = useState(() => {
    try { const t = JSON.parse(persist.get("gg_theme")); if (t && t.a && t.b) return t; } catch (e) {}
    return THEMES[0];
  });
  function applyTheme(t) { setTheme(t); persist.set("gg_theme", JSON.stringify(t)); }
  const [subPaused, setSubPaused] = usePersistedState("gg_plus_paused", false);
  const [planType, setPlanType] = usePersistedState("gg_plus_plan", "monthly");
  const [lang, setLang] = usePersistedState("gg_lang", "en");
  const [langChosen, setLangChosen] = usePersistedState("gg_lang_chosen", false);
  const [joinedComms, setJoinedComms] = usePersistedState("gg_comms_joined", []);
  const [myComms, setMyComms] = usePersistedState("gg_comms_mine", []);
  const [commPosts, setCommPosts] = usePersistedState("gg_comms_posts", {});
  const [commReacts, setCommReacts] = usePersistedState("gg_comms_reacts", {});
  const [dms, setDms] = usePersistedState("gg_dms", {});
  const [userProfile, setUserProfile] = usePersistedState("gg_profile", { name: "You", handle: "you", bio: "", emoji: "😋" });
  const [muted, setMuted] = usePersistedState("gg_muted", []);
  const [notifPrefs, setNotifPrefs] = usePersistedState("gg_notif_prefs", {});
  const [audience, setAudience] = usePersistedState("gg_audience", "everyone");
  const [favorites, setFavorites] = usePersistedState("gg_favorites", []);
  const [clippedCoupons, setClippedCoupons] = usePersistedState("gg_coupons", []);
  const [usedCoupons, setUsedCoupons] = usePersistedState("gg_coupons_used", []);
  function clipCoupon(id) {
    setClippedCoupons((c) => (c.includes(id) ? c : [...c, id]));
    setToast("🎟️ Coupon clipped — it's in your wallet at checkout");
  }
  const [onboarded, setOnboarded] = usePersistedState("gg_onboarded", false);
  const [userRecipes, setUserRecipes] = usePersistedState("gg_user_recipes", []);
  USER_RECIPES = userRecipes; // sync module view before children render
  CURRENT_LANG = lang; // module-level so every component can call T() without prop threading
  MY_PHOTO = userProfile.photo || null;
  const [follows, setFollows] = usePersistedState("gg_follows", []);
  const [blocked, setBlocked] = usePersistedState("gg_blocked", []);
  const [cookedLog, setCookedLog] = usePersistedState("gg_cooked_log", []);
  const [notifs, setNotifs] = usePersistedState("gg_notifs", [
    { id: "n1", icon: "❤️", text: "@chef.maya and 12 others liked your comment", time: "2h ago", read: false },
    { id: "n2", icon: "💬", text: "@jford.eats replied: \"we're making this friday\"", time: "5h ago", read: false },
    { id: "n3", icon: "👥", text: "@sweet.tina started following you", time: "1d ago", read: true },
  ]);
  const [notifOpen, setNotifOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [creating, setCreating] = useState(false);
  const [cooking, setCooking] = useState(false);
  const [reporting, setReporting] = useState(null); // post being reported
  const [scheduled, setScheduled] = useState([]); // [{post, at}]
  const [mediaView, setMediaView] = useState(null);

  // publish scheduled posts when their time arrives
  useEffect(() => {
    const tick = () => {
      const now = Date.now();
      setScheduled((sc) => {
        const due = sc.filter((s) => s.at <= now);
        if (due.length) {
          setPosts((ps) => [...due.map((d) => ({ ...d.post, time: "now" })), ...ps]);
          due.forEach(() => addNotif("🕒", "Your scheduled post just went live"));
        }
        return sc.filter((s) => s.at > now);
      });
    };
    tick();
    const iv = setInterval(tick, 10000);
    return () => clearInterval(iv);
  }, []);
  function schedulePost(post, at) {
    setScheduled((sc) => [...sc, { post, at }].sort((a, b) => a.at - b.at));
    setToast("🕒 Post scheduled for " + new Date(at).toLocaleString([], { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" }));
  }
  const unread = notifs.filter((n) => !n.read).length;

  function addNotif(icon, text) {
    setNotifs((n) => [{ id: "n" + Date.now(), icon, text, time: "now", read: false }, ...n].slice(0, 30));
  }
  function toggleFollow(handle) {
    setFollows((f) => f.includes(handle) ? f.filter((x) => x !== handle) : [...f, handle]);
  }
  function blockUser(handle) {
    setBlocked((b) => (b.includes(handle) ? b : [...b, handle]));
    setToast(`@${handle} blocked — their posts are hidden. Unblock anytime in Settings.`);
  }
  function publishRecipe(r) {
    setUserRecipes((u) => [r, ...u]);
    setCreating(false);
    setPosts((ps) => [{ id: "p" + Date.now(), user: "you", emoji: "😋", time: "now", recipeId: r.id, caption: `Just published a new recipe: ${r.name} ${r.emoji} — go make it!`, likes: 0, liked: false, comments: [], cut: false }, ...ps]);
    addNotif("🍳", `Your recipe "${r.name}" is live in Discover`);
    setToast("🎉 Recipe published — it's live in Discover and on your feed");
  }
  const effectivePlus = plus && !subPaused; // paused members keep their plan but perks sleep
  function cancelSub() {
    setPlus(false); setSubPaused(false); persist.del("gg_plus");
    setToast("GrubPlus canceled — you're on the free plan. Come back anytime 💙");
  }
  function startPlus() {
    setPlus(true); persist.set("gg_plus", "1");
    setToast("Welcome to GrubPlus ✨ 7-day free trial started");
  }
  function contactSupport() {
    if (aiEnabled) { setAiSeed("Act as GrubGrounds customer support. I need help with an issue — ask me what's going on."); setAiOpen(true); }
  }
  function deleteAccount() {
    ["gg_pantry","gg_planner","gg_orders","gg_cooked_dates","gg_cooked_recipes","gg_ratings","gg_challenges","gg_plus","gg_plus_paused","gg_theme","gg_tutorial_seen","gg_user","gg_cred","gg_session","gg_user_recipes","gg_follows","gg_blocked","gg_cooked_log","gg_notifs","gg_saved","gg_comms_joined","gg_comms_mine","gg_comms_posts","gg_comms_reacts","gg_dms","gg_profile","gg_muted","gg_notif_prefs","gg_audience","gg_favorites","gg_lang_chosen","gg_coupons","gg_coupons_used"].forEach((k) => persist.del(k));
    setUserRecipes([]); setFollows([]); setBlocked([]); setCookedLog([]); setNotifs([]);
    setPantry([]); setPlanner({}); setOrders([]); setCookedDates([]); setCookedRecipes([]); setMyRatings({}); setJoinedChallenges([]);
    setPlus(false); setSubPaused(false); setTheme(THEMES[0]); setSaved([]); setCart([]); setAllergies([]); setFilters([]);
    setScreen("feed"); setTutorial(true);
    setToast("Your account data has been deleted. Fresh start 🌱");
  }

  // --- game & utility systems ---
  const [pantry, setPantry] = usePersistedState("gg_pantry", []);
  const [planner, setPlanner] = usePersistedState("gg_planner", {});
  const [orders, setOrders] = usePersistedState("gg_orders", []);
  const [cookedDates, setCookedDates] = usePersistedState("gg_cooked_dates", []);
  const [cookedRecipes, setCookedRecipes] = usePersistedState("gg_cooked_recipes", []);
  const [myRatings, setMyRatings] = usePersistedState("gg_ratings", {});
  const [joinedChallenges, setJoinedChallenges] = usePersistedState("gg_challenges", []);
  const streak = streakFrom(cookedDates);
  const plannedCount = Object.values(planner).reduce((s, a) => s + a.length, 0);
  const badgeState = { cookedRecipes, streak, plannedCount, pantryCount: pantry.length, challengeCount: joinedChallenges.length, ratedCount: Object.keys(myRatings).length, orderCount: orders.length };
  const badges = BADGE_DEFS.map((b) => ({ ...b, earned: b.test(badgeState) }));

  function markCooked(r) {
    const t = todayStr();
    setCookedDates((d) => (d.includes(t) ? d : [...d, t]));
    setCookedRecipes((c) => (c.includes(r.id) ? c : [...c, r.id]));
    setCookedLog((l) => [...l, { d: t, id: r.id }].slice(-120));
    setPosts((ps) => [{ id: "p" + Date.now(), user: "you", emoji: "😋", time: "now", recipeId: r.id, caption: `✅ Cooked it: ${r.name} — made with my own two hands ${r.emoji}`, likes: 0, liked: false, comments: [], cut: false, cookedIt: true }, ...ps]);
    const s = streakFrom(cookedDates.includes(t) ? cookedDates : [...cookedDates, t]);
    setToast(s > 1 ? `🔥 ${s}-day cooking streak! Posted to your feed` : "✅ Cooked it! Posted to your feed — streak started 🔥");
    if (s === 3 || s === 7) addNotif("🏅", s === 7 ? "Badge earned: Week Warrior — 7-day streak!" : "Badge earned: On Fire — 3-day streak!");
  }
  function rateRecipe(id, stars, wma) {
    setMyRatings((m) => ({ ...m, [id]: { stars, wma } }));
  }
  function joinChallenge(id) {
    setJoinedChallenges((j) => (j.includes(id) ? j : [...j, id]));
    setToast("🚩 Challenge joined — post your attempt to the feed!");
  }
  function placeOrder(order) {
    setOrders((o) => [order, ...o].slice(0, 20));
    setCart([]);
    if (order.couponId) setUsedCoupons((u) => [...u, order.couponId]);
    if (storeAllowsCoupons(order.storeId)) {
      const fresh = STORE_COUPONS.filter((c) => c.store === order.storeId && !clippedCoupons.includes(c.id) && !usedCoupons.includes(c.id) && c.id !== order.couponId);
      if (fresh.length) {
        const earned = fresh[Date.now() % fresh.length];
        setClippedCoupons((cc) => [...cc, earned.id]);
        addNotif("🎟️", `You earned a coupon at ${order.store}: ${earned.label} (code ${earned.code})`);
      }
    }
    setToast(`✅ Order placed with ${order.store} — arriving in ${order.eta}`);
    addNotif("📦", `Order confirmed at ${order.store} — $${order.total.toFixed(2)}, arriving in ${order.eta}`);
  }
  function reorder(order) {
    setCart(order.items.map((it) => ({ ...it })));
    setToast("🛒 Cart rebuilt from your past order");
  }
  function addWeekToCart() {
    const ids = Object.values(planner).flat();
    if (!ids.length) { setToast("Plan some meals first — then one tap fills the cart"); return; }
    ids.forEach((rid) => { const r = allRecipes().find((x) => x.id === rid); if (r) addAllToCart(r, {}, 1, true); });
    setToast(`🛒 ${ids.length} planned meal${ids.length > 1 ? "s" : ""} added to your cart`);
  }
  function closeTutorial() { setTutorial(false); persist.set("gg_tutorial_seen", "1"); }
  const [share, setShare] = useState(null);
  const [toast, setToast] = useState("");

  useEffect(() => { if (toast) { const t = setTimeout(() => setToast(""), 2200); return () => clearTimeout(t); } }, [toast]);

  function openRecipe(r) {
    setRecipe(r);
    setViewed((v) => [r, ...v.filter((x) => x.id !== r.id)].slice(0, 8));
    window.scrollTo(0, 0);
  }
  function toggleSave(id) {
    setSaved((s) => (s.some((x) => x.id === id) ? s.filter((x) => x.id !== id) : [...s, { id, pub: false }]));
    setToast(saved.some((x) => x.id === id) ? "Removed from gallery" : "Saved to your gallery 📑");
  }
  function addAllToCart(r, swaps, factor = 1, silent = false) {
    const fLabel = factor !== 1 ? ` ×${(+factor.toFixed(2))}` : "";
    const items = r.ingredients.map((ing, i) => ({ n: swaps[i] || ing.n, detail: ing.qty + fLabel, price: +(ing.price * factor).toFixed(2), from: r.name, count: 1 }));
    setCart((c) => {
      let next = [...c];
      items.forEach((it) => {
        const j = next.findIndex((x) => x.n === it.n);
        if (j >= 0) next[j] = { ...next[j], count: next[j].count + 1 };
        else next.push(it);
      });
      return next;
    });
    if (!silent) setToast(`${items.length} ingredients added to cart 🛒`);
  }
  function startCookMode() {
    setAiSeed(`I want to cook "${recipe.name}" right now. Put me in cooking mode: give me step 1 only, then wait for me to say "next".`);
    setAiOpen(true);
  }

  const ctx = `screen: ${recipe ? "recipe detail (" + recipe.name + ")" : screen}; cart items: ${cart.reduce((s, i) => s + i.count, 0)} (total at ${STORES.find((s) => s.id === store).name}: $${cartTotal(cart, STORES.find((s) => s.id === store)).toFixed(2)}); budget: $${budget}; user allergies: ${allergies.join(", ") || "none set"}; active food filters: ${filters.join(", ") || "none"}; saved recipes: ${saved.length}.`;

  const body = recipe
    ? <RecipeDetail key={recipe.id} r={recipe} back={() => setRecipe(null)} addAllToCart={addAllToCart} pantry={pantry} follows={follows} toggleFollow={toggleFollow} startCooking={() => setCooking(true)} onCooked={() => markCooked(recipe)} myRating={myRatings[recipe.id]} rate={(s, w) => rateRecipe(recipe.id, s, w)} saved={saved.some((s) => s.id === recipe.id)} onSave={toggleSave} aiEnabled={aiEnabled} startCookMode={startCookMode} allergies={allergies} setAllergies={setAllergies} onShareRecipe={() => setShare({ type: "recipe", label: recipe.emoji + " " + recipe.name })} onTip={() => setToast(`Sent a tip to @${recipe.author} ☕ Creators keep 85%`)} />
    : screen === "feed" ? <FeedScreen posts={posts.filter((p) => !blocked.includes(p.user) && !muted.includes(p.user) && !p.archived)} favorites={favorites} setPosts={setPosts} openRecipe={openRecipe} friends={friends} streak={streak} joinedChallenges={joinedChallenges} onJoin={joinChallenge} follows={follows} toggleFollow={toggleFollow} onReport={setReporting} lang={lang} plusUser={effectivePlus} planner={planner} savedForAlerts={saved.map((s) => allRecipes().find((r) => r.id === s.id)).filter(Boolean)} schedulePost={schedulePost} scheduled={scheduled} cancelScheduled={(i) => setScheduled((sc) => sc.filter((_, j) => j !== i))} openMedia={setMediaView} onShare={(p) => setShare({ type: "post", label: "@" + p.user + ": " + p.caption.slice(0, 60) })} />
    : screen === "discover" ? <DiscoverScreen openRecipe={openRecipe} saved={saved} onSave={toggleSave} filters={filters} setFilters={setFilters} viewed={viewed} onCreate={() => setCreating(true)} />
    : screen === "shop" ? <ShoppingScreen cart={cart} setCart={setCart} store={store} setStore={setStore} budget={budget} setBudget={setBudget} savedRecipes={saved.map((s) => allRecipes().find((r) => r.id === s.id)).filter(Boolean)} orders={orders} placeOrder={placeOrder} reorder={reorder} friends={friends} plus={effectivePlus} goPlus={() => setScreen("settings")} clipped={clippedCoupons} usedCoupons={usedCoupons} clipCoupon={clipCoupon} aiEnabled={aiEnabled} />
    : screen === "scan" ? <ScannerScreen aiEnabled={aiEnabled} pantry={pantry} setPantry={setPantry} />
    : screen === "plans" ? <PlansScreen openRecipe={openRecipe} saved={saved} onSave={toggleSave} planner={planner} setPlanner={setPlanner} addWeekToCart={addWeekToCart} cookedLog={cookedLog} />
    : screen === "gallery" ? <GalleryScreen saved={saved} setSaved={setSaved} openRecipe={openRecipe} goDiscover={() => setScreen("discover")} />
    : screen === "friends" ? <FriendsScreen friends={friends} setFriends={setFriends} dms={dms} setDms={setDms} />
    : screen === "communities" ? <CommunitiesScreen joined={joinedComms} setJoined={setJoinedComms} myComms={myComms} setMyComms={setMyComms} commPosts={commPosts} setCommPosts={setCommPosts} reacts={commReacts} setReacts={setCommReacts} showToast={setToast} plus={effectivePlus} goPlus={() => setScreen("settings")} clipped={clippedCoupons} usedCoupons={usedCoupons} clipCoupon={clipCoupon} aiEnabled={aiEnabled} />
    : screen === "sysset" ? <SettingsTab lang={lang} setLang={setLang} planTypeName={planType === "annual" ? "annual · $59.99/yr" : "monthly · $7.99/mo"} plus={plus} subPaused={subPaused} setSubPaused={setSubPaused} cancelSub={cancelSub} contactSupport={contactSupport} deleteAccount={deleteAccount} showToast={setToast} blocked={blocked} unblock={(h) => setBlocked((b) => b.filter((x) => x !== h))} muted={muted} setMuted={setMuted} notifPrefs={notifPrefs} setNotifPrefs={setNotifPrefs} audience={audience} setAudience={setAudience} favorites={favorites} setFavorites={setFavorites} friends={friends} posts={posts} restorePost={(id) => setPosts((ps) => ps.map((x) => (x.id === id ? { ...x, archived: false } : x)))} startPlus={startPlus} planType={planType} setPlanType={setPlanType} theme={theme} applyTheme={applyTheme} aiEnabled={aiEnabled} setAiEnabled={setAiEnabled} showTutorial={() => setTutorial(true)} />
    : <ProfileScreen profile={userProfile} setProfile={setUserProfile} posts={posts} follows={follows} saved={saved} openRecipe={openRecipe} openMedia={setMediaView} badges={badges} streak={streak} allergies={allergies} setAllergies={setAllergies} goSettings={() => setScreen("sysset")} />;

  const [splash, setSplash] = useState(true);
  useEffect(() => { const t = setTimeout(() => setSplash(false), 2000); return () => clearTimeout(t); }, []);
  if (splash) {
    return (
      <div className="gg" style={themeVars(theme)}>
        <style>{CSS}</style>
        <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 18, background: "radial-gradient(ellipse at 50% 30%, rgba(104,18,181,.35), var(--ink) 65%)" }}>
          <img src={APP_ICON} alt="GrubGrounds" width="112" height="112" className="checkin" style={{ borderRadius: 28, boxShadow: "0 14px 50px rgba(31,169,244,.35)" }} />
          <b className="disp" style={{ fontSize: 22 }}>Grub<span style={{ background: "var(--grad)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>Grounds</span></b>
          <span className="sub" style={{ fontSize: 12 }}>share the love of food</span>
        </div>
      </div>
    );
  }

  /* To re-enable accounts later:
     if (!user) return <div className="gg"><style>{CSS}</style><AuthScreen onAuth={...} /></div>; */

  return (
    <div className="gg" style={themeVars(theme)}>
      <style>{CSS}</style>
      <div className="shell">
        <nav className="rail">
          <div className="logo" style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <img src={APP_ICON} alt="GrubGrounds" width="34" height="34" style={{ borderRadius: 9 }} />
            <span>Grub<em>Grounds</em></span>
          </div>
          {NAV.map((n) => (
            <button key={n.id} className={"navbtn" + (screen === n.id && !recipe ? " on" : "")} onClick={() => { setScreen(n.id); setRecipe(null); }}>
              <span className="ic">{n.ic}</span>{tr(lang, NAV_KEY[n.id]) || n.name}
              {n.id === "shop" && cart.length > 0 && <span className="pill-sm" style={{ background: "var(--grad)", marginLeft: "auto" }}>{cart.reduce((s, i) => s + i.count, 0)}</span>}
            </button>
          ))}
          <div style={{ marginTop: "auto", padding: "12px 10px", fontSize: 11, color: "var(--dim)", lineHeight: 1.6 }}>
            Cooking isn't a chore — it's how you de-stress, eat healthier, and skip the mystery ingredients. Share the love. 💙💜
          </div>
        </nav>

        <main className="main">{body}</main>
      </div>

      <nav className="tabbar">
        {MOBILE_NAV.map((id) => {
          const n = NAV.find((x) => x.id === id);
          return (
            <button key={id} className={"tabbtn" + (screen === id && !recipe ? " on" : "")} onClick={() => { setScreen(id); setRecipe(null); }}>
              <span className="ic">{n.ic}</span>{tr(lang, NAV_KEY[n.id]) || n.name}
            </button>
          );
        })}
      </nav>

      {/* top-right quick actions: search + notifications */}
      <div style={{ position: "fixed", top: 12, right: 14, zIndex: 55, display: "flex", gap: 8 }}>
        <button className="chip" style={{ padding: "8px 12px", background: "rgba(16,16,26,.9)", backdropFilter: "blur(8px)" }} onClick={() => setSearchOpen(true)} aria-label="Search everything">🔍</button>
        <button className="chip" style={{ padding: "8px 12px", background: "rgba(16,16,26,.9)", backdropFilter: "blur(8px)", position: "relative" }} onClick={() => setNotifOpen(true)} aria-label="Notifications">
          🔔{unread > 0 && <span style={{ position: "absolute", top: 2, right: 4, minWidth: 15, height: 15, borderRadius: 99, background: "var(--grad)", fontSize: 9.5, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center", padding: "0 3px" }}>{unread}</span>}
        </button>
      </div>

      {mediaView && <MediaViewer media={mediaView} onClose={() => setMediaView(null)} />}
      {searchOpen && <SearchOverlay onClose={() => setSearchOpen(false)} openRecipe={openRecipe} posts={posts.filter((p) => !blocked.includes(p.user))} follows={follows} toggleFollow={toggleFollow}
        addGrocery={(g) => { setCart((c) => { const j = c.findIndex((x) => x.n === g.n); if (j >= 0) return c.map((x, i) => i === j ? { ...x, count: x.count + 1 } : x); return [...c, { n: g.n, detail: g.size, price: g.price, deal: g.deal, from: "Grocery", count: 1, emoji: g.emoji }]; }); setToast(g.n + " added to cart 🛒"); }} />}
      {notifOpen && <NotifPanel notifs={notifs} onClose={() => setNotifOpen(false)} markRead={() => setNotifs((n) => n.map((x) => ({ ...x, read: true })))} />}
      {creating && <CreateRecipe onSave={publishRecipe} onClose={() => setCreating(false)} />}
      {cooking && recipe && <CookMode r={recipe} onClose={() => setCooking(false)} onDone={() => { setCooking(false); markCooked(recipe); }} />}
      {reporting && <ReportModal target={reporting} onClose={() => setReporting(null)} onReport={(reason) => setToast(`Report submitted (${reason}) — our team will review it 🛟`)} onBlock={blockUser} onMute={(h) => { setMuted((m) => (m.includes(h) ? m : [...m, h])); setToast(`@${h} muted — quietly hidden from your feed. Unmute in Settings.`); }} />}

      {aiEnabled && !aiOpen && <button className="fab" onClick={() => setAiOpen(true)} aria-label="Open AI assistant">✨</button>}
      {aiEnabled && <Assistant ctx={ctx} open={aiOpen} setOpen={setAiOpen} seed={aiSeed} clearSeed={() => setAiSeed(null)} />}

      {!langChosen && <LanguageGate lang={lang} setLang={setLang} onDone={() => setLangChosen(true)} />}
      {langChosen && tutorial && <Tutorial onClose={closeTutorial} />}
      {langChosen && !tutorial && !onboarded && <QuickSetup setFilters={setFilters} setAllergies={setAllergies} onDone={(goal) => { setOnboarded(true); setToast(goal ? "You're set up — the app is tuned to you ✨" : "You're in — tune things anytime in Profile ✨"); }} />}
      {share && <ShareModal item={share} friends={friends} onClose={() => setShare(null)} />}

      {toast && (
        <div style={{ position: "fixed", bottom: 92, left: "50%", transform: "translateX(-50%)", background: "var(--panel2)", border: "1px solid var(--royal)", borderRadius: 12, padding: "10px 18px", fontSize: 13, zIndex: 100, boxShadow: "0 8px 30px rgba(0,0,0,.5)" }}>
          {toast}
        </div>
      )}
    </div>
  );
}
