# Bomb Me (Kotlin + Jetpack Compose)

A dark Material 3 Expressive UI prototype with the home/session flow, per-service event counts, animated progress rings, automatic local simulation, and Stop/back navigation.

**Safety scope:** this project simulates events locally. It does not send SMS, place calls, or send WhatsApp messages.

## Build with GitHub Actions
1. Create a GitHub repository and upload/push the contents of this folder.
2. Open **Actions** and run **Build Bomb Me APK**, or push to `main`.
3. Download the `BombMe-debug-apk` artifact from the completed workflow.

## Build locally
Use JDK 17 and Android SDK installed, then run:
```bash
gradle assembleDebug
```
APK output: `app/build/outputs/apk/debug/app-debug.apk`

This is a starter Android project; confirm SDK/tool versions in your build environment. The top-bar History and Settings icons are visual placeholders in this initial build.
