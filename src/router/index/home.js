'use strict'
import 'whatwg-fetch'
import React from 'react'
import { Route, Switch } from 'react-router-dom'

import _Header from './common/header'
import _Nav from './common/nav'
import { Layout } from 'antd'
import style from './home.css'

import More from './more'
class Home extends React.Component {
  static propTypes = {
    history: PropTypes.object
  }
  componentDidMount () {
    const { history } = this.props
    const pathname = history.location.pathname
    const router = ['/web/more', '', '']
    for (let i = 0; i < router.length; i++) {
      if (pathname === router[i]) {
        return
      }
    }
    history.replace('error')
  }
  render () {
    const { Content } = Layout
    return (
      <Layout className={style.main}>
        <_Nav history={this.props.history}></_Nav>
        <Layout>
          <_Header></_Header>
          <Content>
            <Switch>
              <Route exact path="/web/more" component={More}></Route>
            </Switch>
          </Content>
        </Layout>
      </Layout>
    )
  }
}

export default Home
