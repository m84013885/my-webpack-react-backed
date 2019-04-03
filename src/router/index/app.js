'use strict'
import stores from './stores'
import { Provider } from 'mobx-react' // 供应stores
import { Route, Switch, BrowserRouter } from 'react-router-dom'

import Home from './home'
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
        <BrowserRouter>
          <Switch>
            <Route exact path="/web/:id" component={Home}></Route>
            <Route component={Error} ></Route>
          </Switch>
        </BrowserRouter>
      </Provider>
    )
  }
}

export default App
