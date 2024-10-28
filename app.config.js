/** @type {import('expo/config').ExpoConfig} */
module.exports = {
  expo: {
    name: 'Liquid',
    slug: 'liquid',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/images/liquid-icon.png',
    scheme: 'liquid',
    userInterfaceStyle: 'automatic',
    splash: {
      image: './assets/images/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff',
    },
    ios: {
      supportsTablet: true,
      bundleIdentifier: 'com.liquid.supermigrate',
      buildNumber: '1',
      infoPlist: {
        NSFaceIDUsageDescription: 'This app uses Face ID to sign in with Passkeys.',
      },
      config: {
        usesNonExemptEncryption: false,
      },
      associatedDomains: ['webcredentials:api.useliquid.xyz?mode=developer', 'webcredentials:api.useliquid.xyz'],
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/images/liquid-adaptive-icon.png',
        backgroundColor: '#ffffff',
      },
      package: 'com.liquid.supermigrate',
    },
    web: {
      bundler: 'metro',
      output: 'static',
      favicon: './assets/images/favicon.png',
    },
    plugins: [
      'expo-router',
      [
        'expo-build-properties',
        {
          android: {
            compileSdkVersion: 34,
            targetSdkVersion: 34,
            buildToolsVersion: '34.0.0',
          },
          ios: {
            deploymentTarget: '15.1',
          },
        },
      ],
    ],
    experiments: {
      typedRoutes: true,
    },
    extra: {
      router: {
        origin: false,
      },
      eas: {
        projectId: '20908dc9-e9a6-4a99-bbe3-45e48c281ae0',
      },
    },
    owner: 'supermigrate',
    newArchEnabled: true,
  },
};
