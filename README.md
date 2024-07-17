# RN Fashion App

A fashion app demo built in React Native and TypeScript.

## Demo App:

Android: https://play.google.com/store/apps/details?id=com.rn_fashion_app

iOS: https://apps.apple.com/app/rn-fashion/id123456789

# Demo

![](./app/samples/demo.gif)

# How to run the project

## Prerequisites

- Node.js
- React Native CLI

## Installation

npm install

## Flavors

There are two flavors of the app that can be installed in parallel on a device:

### Staging

- App name: RN Fashion Staging
- Config file: .env.staging
- Android package name: com.rn_fashion_app.staging
- iOS bundle ID: com.rn-fashion-app.staging

### Production

- App name: RN Fashion
- Config file: .env
- Android package name: com.rn_fashion_app
- iOS bundle ID: com.rn-fashion-app

## Creating builds

### Android

# Staging

ENVFILE=.env.staging react-native run-android --variant=stagingDebug

# Production

ENVFILE=.env react-native run-android --variant=productionDebug

### iOS

# Staging

react-native run-ios --scheme="RN Fashion Staging"

# Production

react-native run-ios --scheme="RN Fashion"

## Libraries

- React Native
- React Navigation
- TypeScript
- Restyle

## Testing

- detox
