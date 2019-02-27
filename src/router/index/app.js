'use strict'
import stores from './stores'
import { Provider } from 'mobx-react' // 供应stores
import { Route, Switch,HashRouter } from 'react-router-dom'

import Main from './main'
import Error from './error'
class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {

    }
  }

  render () {
    return (
      <Provider {...stores}>
        <HashRouter>
          <Switch>
            <Route exact path="/" component={Main}></Route>
            <Route component={Error} ></Route>
          </Switch>
        </HashRouter>
      </Provider>
    )
  }
}

export default App
