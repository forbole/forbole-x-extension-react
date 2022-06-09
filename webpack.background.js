// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')

module.exports = {
  entry: './src/background/index.ts',
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              configFile: 'tsconfig.background.json',
            },
          },
        ],
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    fallback: {
      crypto: require.resolve('crypto-browserify'),
      buffer: require.resolve('buffer/'),
      path: require.resolve('path-browserify'),
      stream: require.resolve('stream-browserify'),
    },
  },
  output: {
    filename: 'background.js',
    path: path.resolve(__dirname, 'build'),
  },
}
