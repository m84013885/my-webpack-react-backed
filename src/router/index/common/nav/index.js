'use strict'
import 'whatwg-fetch'
import React from 'react'
import { Layout, Icon } from 'antd'
import style from './index.css'
const { Sider } = Layout

class Component extends React.Component {
  static propTypes = {
    history: PropTypes.object
  }

  componentDidMount () {

  }
  state = {

  }
  more = this.more.bind(this)
  more () {
    const { history } = this.props
    history.push('/web/index.html')
  }
  pay = this.pay.bind(this)
  pay () {
    const { history } = this.props
    history.push('/web/pay.html')
  }
  _renderNavSelected () {
    const { history } = this.props
    const pathname = history.location.pathname
    let [more, pay] = ['', '', '']
    switch (pathname) {
      case '/web/index.html':
        more = style.active
        break
      case '/web/pay.html':
        pay = style.active
        break
    }
    return { more, pay }
  }
  render () {
    const { more, pay } = this._renderNavSelected()
    return (
      <Sider className={style.nav} width={150}>
        <div className={style.navTitle}>Remix</div>
        <div className={`${style.navBtn} ${more}`} onClick={this.more}><Icon type="bars" className={style.navBtnIcon}/>充值数据(新)</div>
        <div className={`${style.navBtn} ${pay}`} onClick={this.pay}><Icon type="bars" className={style.navBtnIcon}/>充值数据(旧)</div>
      </Sider>
    )
  }
}

export default Component
