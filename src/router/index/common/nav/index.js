'use strict'
import 'whatwg-fetch'
import React from 'react'
import { Layout, Icon } from 'antd'
import style from './index.css'
const { Sider } = Layout

class Component extends React.Component {
  static propTypes = {

  }
  pay = this.pay.bind(this)
  keep = this.keep.bind(this)
  more = this.more.bind(this)
  pay () {
    const { history } = this.props
    history.replace('/web/pay')
  }
  more () {
    const { history } = this.props
    history.replace('/web/index.html')
  }
  keep () {
    const { history } = this.props
    history.replace('/web/keep')
  }
  _renderNavSelected () {
    const { history } = this.props
    const pathname = history.location.pathname
    let [more, pay, keep] = ['', '', '']
    switch (pathname) {
      case '/web/keep':
        keep = style.active
        break

      case '/web/index.html':
        more = style.active
        break

      case '/web/pay':
        pay = style.active
        break
    }
    return { more, pay, keep }
  }
  render () {
    const { more, pay, keep } = this._renderNavSelected()
    return (
      <Sider className={style.nav} width={150}>
        <div className={style.navTitle}>Remix</div>
        <div className={`${style.navBtn} ${more}`} onClick={this.more}><Icon type="bars" className={style.navBtnIcon}/>充值数据(新)</div>
        <div className={`${style.navBtn} ${pay}`} onClick={this.pay}><Icon type="bars" className={style.navBtnIcon}/>充值数据(旧)</div>
        <div className={`${style.navBtn} ${keep}`} onClick={this.keep}><Icon type="bars" className={style.navBtnIcon}/>留存数据</div>
      </Sider>
    )
  }
}

export default Component
