# RN Fashion App

A fashion app demo built in React Native and Typescript.

## Demo App:

Android: https://play.google.com/store/apps/details?id=com.rn_fashion_app

# Demo

![](./samples/demo.gif)

# How to run the project

## Flavor configurations

There are two flavours of the app that can be installed parallely on a device: staging and production.

### Differences between the two flavors are listed below

#### Staging

App name: RN Fashion Staging<br/>
Configurations file: .env.staging<br/>
Android App Id: com.rn_fashion_app.staging<br/>
iOS App Id: com.rn-fashion-app.staging

#### Production

App name: RN Fashion <br/>
Configurations file: .env<br/>
Android App Id: com.rn_fashion_app<br/>
iOS App Id: com.rn-fashion-app

## Creating builds locally for Staging and Production flavors

#### (Android Only) The following environment variables must be set to create builds locally

ENVFILE - This defines the name of the environment config file to be used<br/>
ENV_KEYSTORE_PASSWORD - This defines the password for the keystore for the build flavour in question<br/>
ENG_KEY_ALIAS - This defines the alias for the keystore for the build flavour in question<br/>
ENV_KEY_PASSWORD - This defines the key password for the keystore for the build flavour in question

### Staging

#### Android

```
ENVFILE=.env.staging react-native run-android --variant=stagingDebug --appId com.rn_fashion_app.staging
```

#### iOS

```
react-native run-ios --scheme="RN Fashion Staging"
```

### **Production**

#### Android

```
ENVFILE=.env react-native run-android --variant=productionDebug --appId com.rn_fashion_app
```

#### iOS

```
react-native run-ios --scheme="RN Fashion"
```

# Libraries Used

- React Native
- React Navigation
- TypeScript
- Restyle

## Testing Framework

- detox
