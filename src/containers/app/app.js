import React from "react"
import CSSModules from "react-css-modules"

@CSSModules(require("./app.scss"))
export default class App extends React.Component {
  constructor (props) {
    super(props)
  }
  render () {
    return (
      <div styleName="container">
        <h2>Welcome to Brink Scratchpad</h2>
        <ul>
          <li>Webpack</li>
          <li>Hot Reload</li>
          <li>React</li>
          <li>CSS Modules</li>
          <li>Webpack Isomorphic Tools</li>
          <li>Express.js Server</li>
          <li>Jade Templating</li>
          <li>SASS</li>
          <li>Bourbon SASS</li>
          <li>Neat SASS</li>
        </ul>
      </div>
      )
  }
}