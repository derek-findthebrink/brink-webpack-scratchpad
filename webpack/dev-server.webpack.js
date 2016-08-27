var express = require("express")
var webpack = require("webpack")

var config = require("./dev.webpack.js")
var compiler = webpack(config)

var host = process.env.HOST || "localhost"
var port = (Number(process.env.PORT) + 1 || 4001)

var opts = {
  contentBase: ["http://", host, ":", port].join(""),
  quiet: true,
  noInfo: true,
  hot: true,
  inline: true,
  lazy: false,
  publicPath: config.output.publicPath,
  headers: {"Access-Control-Allow-Origin": "*"},
  stats: { colors: true }
}

var app = new express()
app.use(require("webpack-dev-middleware")(compiler, opts))
app.use(require("webpack-hot-middleware")(compiler))

app.listen(port, function (err) {
  if (err) console.error(err)
  console.log("Webpack Dev Server listening on port: %s", port)
})