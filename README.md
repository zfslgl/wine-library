# Wine Library

Interactive visualization and management tool for the wine storage room.

## Setup

```bash
npm install
npm run dev
```

## Deploy to Vercel

1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com) and sign in with GitHub
3. Click "Add New Project" → import this repo
4. Vercel auto-detects Vite — just click Deploy
5. Your app is live at `your-project.vercel.app`

## iPad Home Screen App

Once deployed, open the URL on iPad Safari:
1. Tap the Share button (square with arrow)
2. Tap "Add to Home Screen"
3. The app runs full-screen with no browser chrome

## Project Structure

```
src/
  main.jsx          # Entry point
  WineLibrary.jsx   # Main component (layout data + UI)
public/
  manifest.json     # PWA manifest for home screen install
  icon-192.png      # App icon
  icon-512.png      # App icon (large)
```

## Editing the Layout

All wine position data lives at the top of `src/WineLibrary.jsx` in the `INITIAL_LAYOUT` object. Positions follow the format `{shelf}{side}{level}` — e.g. `6B3` = Unit 6, Side B, Level 3.

Categories and their color coding are in the `CATEGORIES` object directly below.
