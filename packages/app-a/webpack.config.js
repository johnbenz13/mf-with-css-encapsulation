const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const { StylableWebpackPlugin } = require("@stylable/webpack-plugin");
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
        "@johnbenz13/shared-library": {},
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
