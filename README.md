# Habit Tracker PWA

A mobile-first Progressive Web App for tracking daily habits, built with Next.js, TypeScript, and Tailwind CSS.

[View Live Demo](https://habit-tracker-nu-ecru.vercel.app/)

## Project Overview

This app allows users to:
- Sign up and log in with email and password
- Create, edit, and delete daily habits
- Mark habits as complete for today
- View current streaks
- Use the app offline after first load (PWA)

All data is stored locally in the browser using localStorage. There is no backend or remote database.

## Setup Instructions

```bash
git clone https://github.com/odielijah/habit-tracker.git
cd habit-tracker
npm install
npx playwright install
```

## Run Instructions

```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000)

## Test Instructions

Run unit and integration tests:
```bash
npm run test:unit
```

Run end-to-end tests (make sure dev server is running):
```bash
npm run test:e2e
```

Run all tests:
```bash
npm run test
```

## Local Persistence Structure

All data is saved to localStorage using these keys:

| Key | Description |
|---|---|
| `habit-tracker-users` | Array of registered users |
| `habit-tracker-session` | Current logged-in session |
| `habit-tracker-habits` | Array of all habits |

## PWA Support

The app includes:
- `public/manifest.json` — defines app name, icons, colors, and display mode
- `public/sw.js` — service worker that caches the app shell on first load
- The service worker is registered in `src/components/shared/ServiceWorkerRegister.tsx`

After the first visit, the app shell loads from cache even when offline.

## Trade-offs and Limitations

- Passwords are stored in plain text in localStorage — not suitable for production
- No real authentication — all auth is local and deterministic
- Data is per-browser — no sync across devices
- Only daily frequency is supported for habits

## Test File Map

| File | What it verifies |
|---|---|
| `tests/unit/slug.test.ts` | `getHabitSlug` converts habit names to URL-safe slugs |
| `tests/unit/validators.test.ts` | `validateHabitName` rejects empty and long names |
| `tests/unit/streaks.test.ts` | `calculateCurrentStreak` counts consecutive days correctly |
| `tests/unit/habits.test.ts` | `toggleHabitCompletion` adds/removes dates without mutation |
| `tests/integration/auth-flow.test.tsx` | Signup, login, logout forms behave correctly |
| `tests/integration/habit-form.test.tsx` | Habit creation, editing, deletion, and completion work |
| `tests/e2e/app.spec.ts` | Full user flows in a real browser via Playwright |
