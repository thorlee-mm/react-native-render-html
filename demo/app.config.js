const version = require('./version');
module.exports = {
  expo: {
    name: 'Foundry Playground',
    slug: 'react-native-render-html-foundry-demo',
    description:
      'A playground for the (amazing) upcoming release of React Native Render HTML!',
    version: version,
    orientation: 'default',
    icon: './assets/images/icon.png',
    scheme: 'myapp',
    userInterfaceStyle: 'automatic',
    splash: {
      backgroundColor: '#ffffff'
    },
    updates: {
      fallbackToCacheTimeout: 0
    },
    assetBundlePatterns: ['**/*'],
    ios: {
      supportsTablet: true
    },
    web: {
      favicon: './assets/images/favicon.png'
    }
  }
};
