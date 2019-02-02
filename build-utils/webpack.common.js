const commonPaths = require("./common-paths");
const webpack = require("webpack");

const config = {
  entry: commonPaths.appSrc,
  output: {
    filename: "js-live.js",
    path: commonPaths.outputPath,
    publicPath: "/",
    library: 'JSLive',
    libraryTarget: "commonjs2"
  },
  resolve: {
    extensions: [".js", ".jsx"]
  },
  module: {
    rules: [
      {
        test: /\.(jpe?g|png|gif|svg|eot|ttf|woff|woff2)$/i,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 1000
            }
          }
        ]
      },
      {
        test: /\.html$/,
        loader: "html-loader"
      }
    ]
  },
  plugins: [
    new webpack.ProgressPlugin(),
  ]
};

module.exports = config;