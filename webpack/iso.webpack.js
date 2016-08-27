var WebpackIsomorphicToolsPlugin = require("webpack-isomorphic-tools/plugin")

module.exports = {
  debug: false,
  assets: {
    style_modules: {
      extensions: ["scss", "sass"],
      filter: function (module, regex, options, log) {
        if (options.development) {
          return WebpackIsomorphicToolsPlugin.style_loader_filter(module, regex, options, log)
        } else {
          return regex.test(module.name)
        }
      },
      path: function (module, options, log) {
        if (options.development) {
          return WebpackIsomorphicToolsPlugin.style_loader_path_extractor(module, options, log)
        } else {
          return module.name
        }
      },
      parser: function (module, options, log) {
        if (options.development) {
          return WebpackIsomorphicToolsPlugin.css_modules_loader_parser(module, options, log)
        } else {
          return module.source
        }
      }
    }
  }
}