const path = require('path');
const { StylableWebpackPlugin } = require('@stylable/webpack-plugin');


module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'umd',
    globalObject: 'this',
  },
  mode: 'development',
  // module: {
  //   rules: [{
  //     test: /\.(png|jpg|gif)$/,
  //     use: [
  //     {
  //         loader: "url-loader",
  //         options: {
  //             limit: 8192
  //         }
  //     }
  //     ]
  // }]
  // },
  plugins: [
    new StylableWebpackPlugin()
  ],
};