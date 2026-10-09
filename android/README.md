# Android native project

This project uses Expo prebuild so native Android files are generated reproducibly from `app.json` and `package.json`.

Run `npm install` then `npx expo prebuild --platform android` to generate this directory. The GitHub Actions workflows do this automatically before Gradle builds. Generated native files are intentionally not hand-maintained in this source archive.
