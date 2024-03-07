const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common');

const path = require('path');
const devConfig = {
  mode: 'development',
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'), // где index.html
    },
    port: 3000,
    compress: true,
    open: true,
    hot: true,
  },
};

module.exports = merge(devConfig, commonConfig);
