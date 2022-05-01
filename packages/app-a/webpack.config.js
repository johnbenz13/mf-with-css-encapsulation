const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  mode: 'development',
  module: {
    rules: [
      { test: /\.css$/, use: [
        'style-loader', 
        {
          loader: "css-loader",
          options: {
            importLoaders: 1,
            modules: true,
          },
        },
      ]},
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Output Management',
      clean: true,
    }),
  ],
};