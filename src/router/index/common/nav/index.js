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
    history.push('/web/more')
  }
  _renderNavSelected () {
    const { history } = this.props
    const pathname = history.location.pathname
    let [more] = ['', '', '']
    switch (pathname) {
      case '/web/more':
        more = style.active
        break
    }
    return { more }
  }
  render () {
    const { more } = this._renderNavSelected()
    return (
      <Sider className={style.nav} width={150}>
        <div className={style.navTitle}>Remix</div>
        <div className={`${style.navBtn} ${more}`} onClick={this.more}><Icon type="bars" className={style.navBtnIcon}/>充值数据</div>
      </Sider>
    )
  }
}

export default Component
