# BMB·Me — Personal money tracker

A lightweight, offline-first React Native / Expo app for tracking income and expenses. The app uses the requested `App.js`, `endpoints.js` and `src/` structure and ships without image or font assets to keep the source ZIP small.

## Features

- At-a-glance balance, income, spending and recent activity
- Add income or expense transactions with a title, category and amount
- Long-press a transaction to delete it
- Choose BDT (৳), INR (₹), USD ($), EUR (€) or GBP (£)
- Locally persisted transaction data; works without an account or server
- Reset saved transaction records from Settings
- Home, Settings and About screens

## Run

Requirements: Node.js 20+ and npm.

```sh
npm install
npx expo start
```

Scan the QR code with Expo Go, or press `a`/`i` for an available emulator. For web preview use `npm run web`; for a static web build use `npm run export:web`.

The native build uses AsyncStorage. In web preview data is stored in browser localStorage. Sample transactions are shown on first launch; clear them from Settings whenever you want a clean start. Settings currency is a display preference for the active session.

## Optional API

The app is fully functional offline. To connect a future API, set `API_BASE_URL` in `endpoints.js`; the `request()` helper in `src/utils/api.js` is intentionally small and has no additional networking dependency.

## Build workflow

`.github/workflows/build.yml` runs Expo's web export on pushes, pull requests and manual workflow dispatch, then uploads the generated `dist/` folder as an artifact.

## Project layout

```text
BMB-Me/
├── .github/workflows/build.yml
├── App.js
├── endpoints.js
├── app.json
├── package.json
└── src/
    ├── screens/HomeScreen.js
    ├── screens/SettingsScreen.js
    ├── screens/AboutScreen.js
    ├── utils/api.js
    └── theme/colors.js
```
