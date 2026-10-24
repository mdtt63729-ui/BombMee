# Bomb Me — CodeAssist + GitHub Actions

A Kotlin + Jetpack Compose Android project with a dark Material 3-style home/session UI and local-only progress simulation. It does not send SMS, place calls, or send WhatsApp messages.

## Open in CodeAssist
1. Extract the ZIP to your phone.
2. In CodeAssist, open/import the extracted project folder (the folder containing `settings.gradle.kts`).
3. Allow Gradle sync and install/configure the Android SDK components that CodeAssist requests.
4. Build/run the `app` module. Exact support depends on the CodeAssist version and its installed Android/Gradle tooling.

## Build on GitHub Actions
1. Upload the *contents* of this folder to a GitHub repository (keep `.github/workflows/build.yml`).
2. Push to `main`/`master`, or open **Actions → Build Bomb Me APK → Run workflow**.
3. Download the `BombMe-debug-apk` artifact from the successful run.

The workflow pins Gradle 8.9 to match Android Gradle Plugin 8.7.3 and sets Java/Kotlin bytecode targets to JVM 17. This avoids the previously reported Java 1.8 vs Kotlin 17 target mismatch.

APK path: `app/build/outputs/apk/debug/app-debug.apk`

## Notes
- This is a debug APK, not a signed release APK.
- A successful build has not been verified in this environment; run the workflow to confirm dependency resolution and compilation.
- History and Settings icons remain placeholders in this version.
