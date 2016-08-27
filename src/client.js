import "babel-polyfill"
import React from "react"
import {render} from "react-dom"
import $ from "jquery"

import router from "./router/router"

var $container = $(".container")[0]
render(router, $container)