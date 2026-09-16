<p align="center">
  <img src="assets/icons/GrubGrounds-icon-512.png" width="120" alt="GrubGrounds icon"/>
</p>

<h1 align="center">GrubGrounds</h1>
<p align="center"><b>Share and spread your love for food around the world — and pay less doing it.</b></p>
<p align="center"><i>v1.0 prototype · built by Latif Reid</i></p>

---

## What is GrubGrounds?

GrubGrounds is a social food platform that sits at the exact moment where food inspiration becomes a purchase. See a recipe, tap "Add all to cart," pick from 12 grocery stores, and buy — with the app comparing prices, applying deals, and keeping you inside budget the whole way.

Instagram has the inspiration but no cart. Instacart has the cart but no inspiration. **GrubGrounds owns both ends of the funnel.**

## Features

### 🏠 Social
- Feed with posts, likes, threaded comments, @mentions, and "Grub Cuts" (short-form video row)
- Photo & video posts (videos up to 5 minutes) with a full-screen media viewer
- Scheduled posts, follow system, direct messages (3-message request cap for non-mutual follows)
- **Communities** — creator-run broadcast channels with emoji reactions and early-access drops
- Weekly challenges, cooking streaks, and 9 earnable achievement badges
- Report & block moderation tools

- **Direct messages** with a 3-message request cap for non-mutual follows
- **Post editing suite**: edit captions, replace/trim video, music over photos (5 built-in tracks), pin, archive, boost, comments/likes toggles, alt text
- Video **captions with one-tap AI translation**; posts & community messages translate into the viewer's language
- **Digital coupons**: clip store offers, earn on orders, redeem by code or AI camera scan at checkout
- Profile pictures (photos with manual crop + zoomable preview) and **animated GIF avatars**
- First-open language picker; core UI translated into **16 languages**

### 🍳 Cooking
- Recipe catalog with macros, difficulty, time, and diet tags on everything
- **User recipe creation** — publish your own recipes with photos; they flow into every system
- **Cook Mode** — full-screen step-by-step with auto-detected countdown timers
- Allergy engine: preset + custom typed allergies, flagged on every ingredient with closest-taste swaps
- Serving scaler, star ratings, "would make again %" on every recipe
- Restaurant replicas, desserts, drinks, and beginner categories

### 🛒 Shopping
- Same cart priced across **12 stores** (Kroger, Publix, Aldi, Lidl, Trader Joe's, Whole Foods, Walmart, Target, Costco, Sprouts, Winn-Dixie, Food Lion)
- Live budget engine, "switch and save" recommendations, weekly per-store deals
- Store locator (city/ZIP/GPS), order history with one-tap reorder, group carts with cost splitting
- Savings alerts computed from your saved recipes

### 🤖 AI (Claude-powered)
- In-app assistant with cooking mode and full app context
- Food scanner: meal macros from a photo, fridge scan → meal ideas, product reality check
- Camera capture with native fallback on all devices
- Leftover remix — turn yesterday's dinner into tomorrow's lunch

### 📊 Health
- Nutrition dashboard: daily totals + weekly trends from meals you actually cooked
- Weekly meal planner with one-tap "add week to cart"
- Pantry tracker ("you already have 4 of 6 ingredients")
- Dietary goal plans (lean out, build muscle, heart-healthy, plant-based)

### 💎 GrubPlus ($7.99/mo or $59.99/yr)
- 7-day free trial, pause/cancel anytime
- Rotating delivery deals (every 2 weeks), early access to creator drops, ✦ member badge
- Premium AI features, custom plans, advanced budget tools

### ✨ Experience
- 12 preset themes + full custom color picker
- 16 languages (nav & greetings; full localization on the production roadmap)
- 2-second branded splash, first-run tutorial, 15-second personalization survey
- Fully responsive — sidebar on desktop, bottom tabs on mobile

## Running it

**Zero-setup:** open `index.html` in any modern browser. Everything (React included) is bundled into the single file — it even works offline.

**Development:** `src/GrubGrounds.jsx` is the full application source (a single React component tree). Bundle with esbuild:

```bash
npm install react@18 react-dom@18 esbuild
npx esbuild entry.jsx --bundle --minify --loader:.jsx=jsx --outfile=bundle.js
```

where `entry.jsx` renders `<GrubGrounds />` into `#root`.

**Hosting:** the single `index.html` deploys as-is to GitHub Pages, Netlify, or Vercel. HTTPS hosting also enables the camera features.

## Honest roadmap

This is a **v1.0 prototype** — complete as a demonstration, deliberately pre-backend:

- [ ] **Supabase backend** — real cross-device accounts, shared feed, live communities & DMs (auth UI already built and dormant in the code)
- [ ] **Real grocery pricing** — Kroger public API / Instacart developer platform (prices are currently simulated with realistic per-store multipliers)
- [ ] **AI key proxy** — a small backend so the Claude-powered assistant/scanner run on the public site without exposing keys
- [ ] **Media storage** — uploaded photos/videos currently live per-session; production needs object storage
- [ ] **Allergen database** — name-matching works today; a real launch pairs it with a proper allergen dataset
- [ ] **Legal review** — the in-app terms are a prototype document
- [ ] Full localization of all content across the 16 supported languages

## Repo layout

```
index.html      → the complete app, self-contained (open this)
src/            → GrubGrounds.jsx application source
assets/icons/   → app icon (1024/512/192/180 PNG + editable SVG)
docs/           → business, growth & marketing plan
```

## License

**All rights reserved.** This code is published for demonstration and portfolio purposes. GrubGrounds is an active product concept — please don't reuse the code or brand commercially without permission.

---

<p align="center">💙💜 <i>Cooking isn't a chore — it's how you de-stress, eat healthier, and skip the mystery ingredients.</i></p>
