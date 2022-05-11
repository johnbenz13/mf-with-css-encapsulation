const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const { StylableWebpackPlugin } = require("@stylable/webpack-plugin");
const { resolveNamespaceFactory } = require("@stylable/node");
const { name } = require("./package.json");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  mode: "development",
  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: /\.st.css$/,
        use: [
          "style-loader",
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
        ],
      },
    ],
  },
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
      stylableConfig(base) {
        return {
          ...base,
          resolveNamespace: resolveNamespaceFactory(name)
        };
      },
    }),
  ],
};
