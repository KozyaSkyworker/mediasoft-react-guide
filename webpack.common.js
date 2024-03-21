const path = require('path');
const webpack = require('webpack');

require('dotenv').config();

module.exports = {
  entry: path.resolve(__dirname, 'src', 'index.tsx'), // точка входа
  // выход
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public'),
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
    ],
  },
  resolve: {
    alias: {
      '@store': path.resolve(__dirname, './src/store'),
      '@components': path.resolve(__dirname, './src/components'),
    },
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
  },
  plugins: [
    new webpack.DefinePlugin({
      // NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      // API_BASE_URL: JSON.stringify(process.env.API_BASE_URL),
      'process.env': JSON.stringify(process.env),
    }),
  ],
};
