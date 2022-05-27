const webpack = require('webpack');
const { alias, configPaths, aliasJest } = require('react-app-rewire-alias');

const aliasMap = configPaths('./tsconfig.paths.json'); // or jsconfig.paths.json

module.exports = function override(config, env) {
  config.resolve.fallback = {
    ...config.resolve.fallback,
    stream: require.resolve('stream-browserify'),
    buffer: require.resolve('buffer'),
    crypto: require.resolve('crypto-browserify'),
    path: require.resolve('path-browserify'),
  };
  config.resolve.extensions = [...config.resolve.extensions, '.ts', '.js'];
  config.plugins = [
    ...config.plugins,
    new webpack.ProvidePlugin({
      process: 'process/browser.js',
      Buffer: ['buffer', 'Buffer'],
    }),
  ];

  config.module.rules.push({
    test: /\.m?js/,
    resolve: {
      fullySpecified: false,
    },
  });
  return alias(aliasMap)(config);
};
module.exports.jest = aliasJest(aliasMap);
