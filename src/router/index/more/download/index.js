'use strict'
import { observer, inject } from 'mobx-react'
import style from './style.css'
import { Button } from 'antd'
import api from '../api'

@inject('more') @observer class DownLoad extends React.Component {
  static propTypes = {
    history: PropTypes.object,
    more: PropTypes.object,
    getChannel: PropTypes.func,
    getApp: PropTypes.func
  }
  state = {

  }
  handleDownloadChannelDetailMisc = this.handleDownloadChannelDetailMisc.bind(this)
  handleDownloadChannelDetail = this.handleDownloadChannelDetail.bind(this)
  handleDownloadChannel = this.handleDownloadChannel.bind(this)
  componentDidMount () {
  }
  async handleDownloadChannelDetailMisc () {
    const start = this.props.more.startTime
    const end = this.props.more.endTime
    const os = this.props.more.os
    const channel = this.props.getChannel()
    const app = this.props.getApp()
    const iframe = api.downloadChannelDetailMisc(start, end, os, app, channel)
    const body = document.getElementsByTagName('body')[0]
    body.appendChild(iframe)
  }
  async handleDownloadChannelDetail () {
    const start = this.props.more.startTime
    const end = this.props.more.endTime
    const os = this.props.more.os
    const channel = this.props.getChannel()
    const app = this.props.getApp()
    const iframe = api.downloadChannelDetail(start, end, os, app, channel)
    const body = document.getElementsByTagName('body')[0]
    body.appendChild(iframe)
  }
  handleDownloadChannel () {
    const start = this.props.more.startTime
    const end = this.props.more.endTime
    const os = this.props.more.os
    const channel = this.props.getChannel()
    const app = this.props.getApp()
    const iframe = api.downloadChannel(start, end, os, app, channel)
    const body = document.getElementsByTagName('body')[0]
    body.appendChild(iframe)
  }

  render () {
    const ButtonGroup = Button.Group
    return (
      <div className={style.payFrom}>
        <ButtonGroup>
          <Button onClick={this.handleDownloadChannel}>支付渠道详情</Button>
          <Button onClick={this.handleDownloadChannelDetail}>注册渠道详情</Button>
          <Button onClick={this.handleDownloadChannelDetailMisc}>渠道详情下载</Button>
        </ButtonGroup>
      </div>
    )
  }
}

export default DownLoad
