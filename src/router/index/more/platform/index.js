'use strict'
import { observer, inject } from 'mobx-react'
import style from './style.css'
import { Dropdown, Button, Menu } from 'antd'

@inject('more') @observer class Platform extends React.Component {
  static propTypes = {
    history: PropTypes.object,
    more: PropTypes.object,
    getAppArr: PropTypes.func,
    getChannelArr: PropTypes.func
  }

  componentDidMount () {
    this._resetOs()
  }
  state = {

  }
  _renderPlatformCheckbox () {
    return (
      <Menu onClick={this.handlePlatformClick}>
        <Menu.Item key='ios'>ios</Menu.Item>
        <Menu.Item key='mac'>mac</Menu.Item>
        <Menu.Item key='touch'>touch</Menu.Item>
        <Menu.Item key='web'>web</Menu.Item>
        <Menu.Item key='h5'>h5</Menu.Item>
        <Menu.Item key='windows'>windows</Menu.Item>
        <Menu.Item key='android'>android</Menu.Item>
      </Menu>
    )
  }
  handlePlatformClick = this.handlePlatformClick.bind(this)
  handlePlatformClick ({ key }) {
    const changeOs = this.props.more.changeOs
    changeOs(key)
    this.props.getAppArr().then(() => {
      this.props.getChannelArr()
    })
  }
  _resetOs () {
    const changeOs = this.props.more.changeOs
    changeOs('ios')
  }
  render () {
    const platform = this._renderPlatformCheckbox()
    const os = this.props.more.os
    return (
      <div className={style.payFrom}>
        <div className={style.payFromText}>平台</div>
        <Dropdown overlay={platform} placement="bottomCenter">
          <Button>{os}</Button>
        </Dropdown>
      </div>
    )
  }
}

export default Platform
