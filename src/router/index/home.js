'use strict'
import 'whatwg-fetch'
import React from 'react'
import { Route, Switch } from 'react-router-dom'

import _Header from './common/header'
import _Nav from './common/nav'
import { Layout } from 'antd'
import style from './home.css'
class Home extends React.Component {
  static propTypes = {

  }
  componentDidMount () {

  }
  render () {
    const { Content } = Layout
    return (
      <Layout className={style.main}>
        <_Nav history={this.props.history}></_Nav>
        <Layout>
          <_Header></_Header>
          <Content></Content>
        </Layout>
      </Layout>
    )
  }
}

export default Home
