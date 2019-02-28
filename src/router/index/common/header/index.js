'use strict'
import 'whatwg-fetch'
import React from 'react'
import { Layout } from 'antd'
import style from './index.css'

const { Header } = Layout

class Component extends React.Component {
  static propTypes = {

  }
  render () {
    return (
      <Header className={style.header}>
        <div>热猫Remix - 集美貌与才艺一身的直播平台</div>
        <div className={style.headerCenter}></div>
      </Header>
    )
  }
}

export default Component
