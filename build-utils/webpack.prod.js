const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");

const commonPaths = require("./common-paths");

module.exports = {
  devtool: "source-map",
  mode: "production",
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              modules: true,
            }
          },
        ],
      },
      {
        test: /\.jsx?$/,
        use: {
          loader: "babel-loader"
        },
        exclude: /(node_modules|dist|build-utils|webpack.config.js)/
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(["build"], {
      root: commonPaths.root
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    }),
    new webpack.EnvironmentPlugin({
      NODE_ENV: "production",
      DEBUG: false
    }),
  ]
};