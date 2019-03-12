'use strict'
import { observer, inject } from 'mobx-react'
import style from './style.css'
import { Dropdown, Button, Menu, Checkbox, Input, message } from 'antd'

@inject('more') @observer class App extends React.Component {
  static propTypes = {
    history: PropTypes.object,
    more: PropTypes.object,
    getAppArr: PropTypes.func,
    getChannelArr: PropTypes.func
  }
  componentDidMount () {
    this.props.getAppArr().then(() => {
      this.props.getChannelArr()
    })
  }
  state = {
    checkAll: false,
    visible: false,
    SearchAppValue: ''
  }
  onChangeSearchApp (e) {
    this.setState({
      SearchAppValue: e.target.value
    })
  }
  _renderAppCheckbox () {
    const app = this.props.more.app
    const Search = Input.Search
    if (!app || app.length === 0) {
      return (
        <Menu onClick={this.handleMenuClick}>
          <Menu.Item>
            正在加载中
          </Menu.Item>
        </Menu>
      )
    }
    else {
      return (
        <Menu onClick={this.handleMenuClick} className={style.channelSelectBox}>
          <Menu.Item>
            <Search
              placeholder="input search text"
              onSearch={value => this.onSearchApp(value)}
              onChange={e => this.onChangeSearchApp(e)}
              value={this.state.SearchAppValue}
              defaultValue=''
              id="appinput"
            />
          </Menu.Item>
          <Menu.Item>
            <Checkbox onChange={this.handleCheckAllChangeApp} checked={this.state.checkAll}>
              全部
            </Checkbox>
          </Menu.Item>
          {app.map((content, key) => {
            if (!content.visibility || content.checked) {
              return (<Menu.Item key={key}><Checkbox value={content.value} checked={content.checked} onChange={this.handleChangeApp}>{content.value}</Checkbox></Menu.Item>)
            }
          })}
        </Menu>
      )
    }
  }
  onSearchApp (value) {
    const app = this.props.more.app
    const changeApp = this.props.more.changeApp
    this.setState({
      SearchAppValue: value
    })
    for (let i = 0; i < app.length; i++) {
      if (app[i].value.indexOf(value) === -1) {
        app[i].visibility = true
      }
      else {
        app[i].visibility = false
      }
    }
    changeApp(app)
  }
  handleMenuClick = this.handleMenuClick.bind(this)
  handleMenuClick () {
    this.setState({ visible: true })
  }
  handleVisibleChange = this.handleVisibleChange.bind(this)
  handleVisibleChange (flag) {
    this.setState({ visible: flag })
  }
  handleChangeApp = this.handleChangeApp.bind(this)
  handleChangeApp (e) {
    const app = this.props.more.app
    const changeApp = this.props.more.changeApp
    let all = 0
    app.map((content, index) => {
      if (content.value === e.target.value) {
        app[index].checked = e.target.checked
      }
      if (content.checked) {
        all++
      }
    })
    if (all === app.length) {
      this.setState({
        checkAll: true
      })
    }
    else {
      this.setState({
        checkAll: false
      })
    }
    changeApp(app)
    if (all !== 0) {
      this.props.getChannelArr()
    }
  }
  handleCheckAllChangeApp = this.handleCheckAllChangeApp.bind(this)
  handleCheckAllChangeApp (e) {
    const app = this.props.more.app
    const changeApp = this.props.more.changeApp
    this.setState({
      checkAll: e.target.checked
    })
    if (e.target.checked) {
      app.map((content, index) => {
        app[index].checked = true
      })
      changeApp(app)
      this.props.getChannelArr()
    }
    else {
      app.map((content, index) => {
        app[index].checked = false
      })
      changeApp(app)
    }
  }
  _renderPlatformCheckboxName () {
    const checkAll = this.state.checkAll
    const app = this.props.more.app
    const appArr = []
    if (!app || app.length === 0) {
      return
    }
    app.map((content) => {
      if (content.checked) {
        appArr.push(content.value)
      }
    })
    if (appArr.length === 0) {
      return 'None selected'
    }
    else if (appArr.length <= 3) {
      let str = ''
      appArr.map((content, index) => {
        if (index !== appArr.length - 1) {
          str += content + ','
        }
        else {
          str += content
        }
      })
      return str
    }
    else if (checkAll) {
      return `All selected(${appArr.length})`
    }
    else {
      return appArr.length + ' selected'
    }
  }
  render () {
    const app = this._renderAppCheckbox()
    const visible = this.state.visible
    return (
      <div className={style.payFrom}>
        <div className={style.payFromText}>应用</div>
        <Dropdown overlay={app} visible={visible} placement="bottomCenter" onVisibleChange={this.handleVisibleChange}>
          <Button>{this._renderPlatformCheckboxName()}</Button>
        </Dropdown>
      </div>
    )
  }
}

export default App
