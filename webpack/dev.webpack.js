/* globals __dirname:true, process:true */

require("babel-polyfill")
var nodepath = require("path")

require("dotenv").config({
  path: nodepath.join(__dirname, "../.env")
})

// Vars
// -----------------------------------------------------------------
var fs = require("fs")
var webpack = require("webpack")
var WebpackIsomorphicToolsPlugin = require("webpack-isomorphic-tools/plugin")
var isoConfig = require("./iso.webpack.js")

var appRoot = nodepath.resolve(process.env.ROOT || "../")
var assetsPath = nodepath.join(appRoot, "assets")
var buildPath = nodepath.join(appRoot, "build/public")

var host = (process.env.HOST || "localhost")
var port = (Number(process.env.PORT) + 1 || 4001)

var babelQuery = require("./babel-query")

// Export
// -----------------------------------------------------------------
module.exports = {
  devtool: "eval-source-map",
  context: appRoot,
  entry: {
    "main": [
      "webpack-hot-middleware/client?path=http://" + host + ":" + port + "/__webpack_hmr",
      "./src/client.js"
    ]
  },
  output: {
    path: buildPath,
    filename: "[name]-[hash].js",
    chunkFilename: "[name]-[chunkhash].js",
    publicPath: "http://" + host + ":" + port + "/"
  },
  module: {
    loaders: [
      {test: /.jsx?$/, exclude: /node_modules/, loaders: ["babel?" + babelQuery]},
      {test: /.json$/, loaders: ["json"]},
      {test: /.scss$/, loader: "style!css?modules&importLoaders=2&sourceMap&localIdentName=[local]___[hash:base64:5]!sass?outputStyle=expanded&sourceMap"}
    ]
  },
  progress: true,
  resolve: {
    modulesDirectories: [
      "src",
      "node_modules",
      "lib"
    ],
    extensions: ["", ".json", ".js", ".jsx", ".scss", ".sass"],
    alias: {
      React: "react",
      react: "react"
    }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.IgnorePlugin(/webpack-stats\.json$/),
    new webpack.DefinePlugin({
      __CLIENT__: true,
      __SERVER__: false,
      __DEVELOPMENT__: true,
      __DEVTOOLS__: true
    }),
    new WebpackIsomorphicToolsPlugin(isoConfig).development()
  ]
}