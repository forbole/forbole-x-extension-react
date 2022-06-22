const path = require('path');

module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/preset-create-react-app"
  ],
  "framework": "@storybook/react",
  "core": {
    "builder": "@storybook/builder-webpack5"
  },
  webpackFinal: async (config) => {
    config.resolve.alias = {
      'assets': path.resolve(__dirname, '..', 'src/assets'),
      'config': path.resolve(__dirname, '..', 'src/config'),
      'hooks': path.resolve(__dirname, '..', 'src/hooks'),
      'components': path.resolve(__dirname, '..', 'src/components'),
      'services': path.resolve(__dirname, '..', 'src/services'),
      'lib': path.resolve(__dirname, '..', 'src/lib'),
      'jest': path.resolve(__dirname, '..', 'src/jest'),
      'misc': path.resolve(__dirname, '..', 'src/misc'),
      'pages': path.resolve(__dirname, '..', 'src/pages'),
      'routes': path.resolve(__dirname, '..', 'src/routes'),
      '@recoil': path.resolve(__dirname, '..', 'src/recoil')
    };

    config.resolve.fallback = {
      ...config.resolve.fallback,
      stream: false,
      chrome: false
    }

    return config;
  },
}
