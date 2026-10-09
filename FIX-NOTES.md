# Build fix notes

## Symptom (from the CI log)
Gradle task `:app:createBundleReleaseJsAndAssets` failed during the Android
release build:

    SyntaxError: node_modules/expo/AppEntry.js: Cannot find module 'babel-preset-expo'
    ...
    Error: Cannot find module 'babel-preset-expo'
    > Task :app:createBundleReleaseJsAndAssets FAILED
    BUILD FAILED

## Root cause
`babel.config.js` tells Babel to use the `babel-preset-expo` preset:

    module.exports = function (api) {
      api.cache(true);
      return { presets: ['babel-preset-expo'] };
    };

but `babel-preset-expo` was never declared in `package.json`. Metro runs Babel
to bundle the JavaScript for the release APK, Babel looks for the preset in the
project's `node_modules`, does not find it, and aborts — which fails the Gradle
bundle task and the whole build.

## Fix
Added the missing packages to `devDependencies` in `package.json`:

    "babel-preset-expo": "~54.0.0",   <- the missing preset (matches Expo SDK 54)
    "@babel/core": "^7.28.0",         <- Babel core, standard for Expo projects

This is exactly the workaround the error message itself recommends: "you can
workaround this problem by explicitly adding the missing package to your
top-level package.json."

## After the fix
Run a clean install so the preset is present before building:

    rm -rf node_modules package-lock.json
    npm install
    npx expo prebuild --platform android --non-interactive
    cd android && ./gradlew assembleRelease --no-daemon

The `:app:createBundleReleaseJsAndAssets` task now resolves the preset and the
release bundle is produced.

## Verified locally
- `babel-preset-expo` resolves from the project root.
- `npx tsc --noEmit` passes (no type errors).
- Babel transforms `src/App.tsx` through the project's `babel.config.js`
  successfully (the exact operation that failed in CI).
