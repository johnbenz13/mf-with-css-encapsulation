const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const { StylableWebpackPlugin } = require("@stylable/webpack-plugin");
const WebpackDummyPlugin = require('./WebpackDummyPlugin');
// const { resolveNamespaceFactory } = require("@stylable/node");
const resolveNamespaceFactory = require("../../resolveNamespaceFactory");
const { name } = require("./package.json");


module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  mode: "development",
  plugins: [
    new WebpackDummyPlugin(),
    new HtmlWebpackPlugin({
      title: "Output Management",
      // clean: true,
    }),
    new ModuleFederationPlugin({
      name: "appA",
      remotes: {
        appB: "appB@http://localhost:3002/remoteEntry.js",
      },
      exposes: {
        Container: "./src/components/Container.js",
      },
      shared: {
        // "@johnbenz13/shared-library": {},
        // "NotImported": {
        //   import: '../shared-library/src/components/NotImported.js',
        // },
      },
      filename: "remoteEntry.js",
    }),
    new StylableWebpackPlugin({
      runtimeStylesheetId: 'namespace',
      stylableConfig(base) {
        return {
          ...base,
          resolveNamespace: resolveNamespaceFactory(name)
        };
      },
    }),
  ],
};
