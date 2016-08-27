import React from "react"
import {Router, Route, Link, browserHistory} from "react-router"
import App from "../containers/app/app"

export default (
  <Router history={browserHistory}>
    <Route path="/" component={App} />
  </Router>
  )