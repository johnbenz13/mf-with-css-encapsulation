const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;
const { StylableWebpackPlugin } = require('@stylable/webpack-plugin');

// Optimzer taken from Yoshi
// https://github.com/wix-private/yoshi/blob/80a05e59e78968707c6e01efc3e943352c9a6814/packages/yoshi-webpack-utils/src/createBaseWebpackConfig/stylableOptions.ts#L7
const loaderUtils = require('loader-utils');
const { StylableOptimizer } = require('@stylable/optimizer');

const hash = (name) => {
  return loaderUtils.getHashDigest(Buffer.from(name), 'md5', 'base64', 5);
};

class Optimizer extends StylableOptimizer {
  getNamespace(namespace) {
    const prefixedAndHashedNamespace = this.namespacePrefix + hash(namespace);

    console.log(`[Optimizer] [Namespace]: ${namespace} => ${prefixedAndHashedNamespace}`);

    return prefixedAndHashedNamespace;
  }
  // Note: this function seems to not be called
  getClassName(className) {
    const prefixedAndHashedClassName = this.classPrefix + hash(className);

    console.log(`[Optimizer][className]: ${className} => ${prefixedAndHashedClassName}`);

    return prefixedAndHashedClassName;
  }
}

// End of Optimizer

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  mode: 'development',
  module: {
    rules: [
      { 
        test: /\.css$/, 
        exclude: /\.st.css$/,
        use: [
          'style-loader', 
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              modules: {
                localIdentName: "[hash:base64:5]",
                localIdentHashSalt: "@johnbenz13/app-a",
              },
            },
          },
      ]},
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Output Management',
      // clean: true,
    }),
    new ModuleFederationPlugin({
      name: 'appA',
      remotes: {
        appB: "appB@http://localhost:3002/remoteEntry.js",
      },
      exposes: {
        'Container': './src/components/Container.js',
      },
      shared: {
        '@johnbenz13/shared-library': {},
      },
      filename: 'remoteEntry.js',
    }),
    new StylableWebpackPlugin({
      optimizer: new Optimizer(),
    }),
  ],
};