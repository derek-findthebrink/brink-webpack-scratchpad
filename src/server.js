import Express from "express"
import nodepath from "path"

var HOST = process.env.HOST || "localhost"
var PORT = process.env.PORT || "4500"

var appRoot = (process.env.ROOT || nodepath.resolve("../"))
var __DEVELOPMENT__ = (process.env.NODE_ENV === "development")

var app = Express()

app.use(Express.static(nodepath.join(appRoot, "build/public")))
app.set("views", nodepath.join(appRoot, "src/containers"))
app.set("view engine", "jade")

app.get("/", (req, res) => {
  if (__DEVELOPMENT__) {
    webpackIsomorphicTools.refresh()
  }
  res.render("layout", {
    jsSource: webpackIsomorphicTools.assets().javascript["main"]
  })
})

app.listen(PORT, (err) => {
  if (err) console.error(err)
  console.log("Server listening on port: %s", PORT)
})