'use strict'
import { observer, inject } from 'mobx-react'
import style from './style.css'
import { Dropdown, Button, Menu, Checkbox, Input } from 'antd'

@inject('more') @observer class Channel extends React.Component {
  static propTypes = {
    history: PropTypes.object,
    more: PropTypes.object,
    getAppArr: PropTypes.func
  }
  componentDidMount () {

  }
  state = {
    checkAll: false,
    visible: false,
    SearchChannelValue: ''
  }
  onChangeSearchChannel (e) {
    this.setState({
      SearchChannelValue: e.target.value
    })
  }
  _renderChannelCheckbox () {
    const channel = this.props.more.channel
    const Search = Input.Search
    if (!channel || channel.length === 0) {
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
              onSearch={value => this.onSearchChannel(value)}
              onChange={e => this.onChangeSearchChannel(e)}
              value={this.state.SearchChannelValue}
              defaultValue=''
              id="channelinput"
            />
          </Menu.Item>
          <Menu.Item>
            <Checkbox onChange={this.handleCheckAllChangeChannel} checked={this.state.checkAll}>
              全部
            </Checkbox>
          </Menu.Item>
          {channel.map((content, key) => {
            if (!content.visibility || content.checked) {
              return (<Menu.Item key={key}><Checkbox value={content.value} checked={content.checked} onChange={this.handleChangeChannel}>{content.value}</Checkbox></Menu.Item>)
            }
          })}
        </Menu>
      )
    }
  }
  onSearchChannel (value) {
    const channel = this.props.more.channel
    const changeChannel = this.props.more.changeChannel
    this.setState({
      SearchAppValue: value
    })
    for (let i = 0; i < channel.length; i++) {
      if (channel[i].value.indexOf(value) === -1) {
        channel[i].visibility = true
      }
      else {
        channel[i].visibility = false
      }
    }
    changeChannel(channel)
  }
  handleMenuClick = this.handleMenuClick.bind(this)
  handleMenuClick () {
    this.setState({ visible: true })
  }
  handleVisibleChange = this.handleVisibleChange.bind(this)
  handleVisibleChange (flag) {
    this.setState({ visible: flag })
  }
  handleChangeChannel = this.handleChangeChannel.bind(this)
  handleChangeChannel (e) {
    const channel = this.props.more.channel
    const changeChannel = this.props.more.changeChannel
    let all = 0
    channel.map((content, index) => {
      if (content.value === e.target.value) {
        channel[index].checked = e.target.checked
      }
      if (content.checked) {
        all++
      }
    })
    if (all === channel.length) {
      this.setState({
        checkAll: true
      })
    }
    else {
      this.setState({
        checkAll: false
      })
    }
    changeChannel(channel)
  }
  handleCheckAllChangeChannel = this.handleCheckAllChangeChannel.bind(this)
  handleCheckAllChangeChannel (e) {
    const channel = this.props.more.channel
    const changeChannel = this.props.more.changeChannel
    this.setState({
      checkAll: e.target.checked
    })
    if (e.target.checked) {
      channel.map((content, index) => {
        channel[index].checked = true
      })
    }
    else {
      channel.map((content, index) => {
        channel[index].checked = false
      })
    }
    changeChannel(channel)
  }
  _renderPlatformCheckboxName () {
    const checkAll = this.state.checkAll
    const channel = this.props.more.channel
    const appArr = []
    if (!channel || channel.length === 0) {
      return
    }
    channel.map((content) => {
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
    const channel = this._renderChannelCheckbox()
    const visible = this.state.visible
    return (
      <div className={style.payFrom}>
        <div className={style.payFromText}>渠道</div>
        <Dropdown overlay={channel} visible={visible} placement="bottomCenter" onVisibleChange={this.handleVisibleChange}>
          <Button>{this._renderPlatformCheckboxName()}</Button>
        </Dropdown>
      </div>
    )
  }
}

export default Channel
