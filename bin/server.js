#!/usr/bin/env node
var nodepath = require("path")
var APP_ROOT = nodepath.resolve(process.env.ROOT)

require(nodepath.join(APP_ROOT, "server.babel.js"))
require("dotenv").config({
  path: nodepath.resolve(__dirname, "../.env")
})

var __DEVELOPMENT__ = process.env.NODE_ENV === "development"

if (__DEVELOPMENT__) {
  var opts = {
    hook: true,
    ignore: /(\/\.|~$|\.json$)/i,
    language: "babel-register"
  }
  if (!require("piping")(opts)) {
    return
  }
}

var WebpackIsomorphicTools = require("webpack-isomorphic-tools")
global.webpackIsomorphicTools = new WebpackIsomorphicTools(require(APP_ROOT + "/webpack/iso.webpack.js"))
.development(__DEVELOPMENT__)
.server(APP_ROOT, function () {
  require(nodepath.join(APP_ROOT, "src/server.js"))
})