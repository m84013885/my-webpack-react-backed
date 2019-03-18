'use strict'
import { observer, inject } from 'mobx-react'
import style from './style.css'
import { Button } from 'antd'
import api from '../api'

@inject('more') @observer class DownLoad extends React.Component {
  static propTypes = {
    history: PropTypes.object,
    more: PropTypes.object,
    getAppArr: PropTypes.func,
    getChannelArr: PropTypes.func
  }

  componentDidMount () {

  }
  state = {

  }
  handleDownloadChannelDetailMisc = this.handleDownloadChannelDetailMisc.bind()
  handleDownloadChannelDetailMisc () {
    const start = this.props.more.startTime
    const end = this.props.more.endTime
    const os = this.props.more.os
    const channel = this._getChannelSelect()
    const app = this._getAppSelect()
    const iframe = api.downloadChannelDetailMisc(start, end, os, channel, app)
    const body = document.getElementsByTagName('body')[0]
    body.appendChild(iframe)
  }
  handleDownloadChannelDetail = this.handleDownloadChannelDetail.bind()
  handleDownloadChannelDetail () {
    const start = this.props.more.startTime
    const end = this.props.more.endTime
    const os = this.props.more.os
    const channel = this._getChannelSelect()
    const app = this._getAppSelect()
    const iframe = api.downloadChannelDetail(start, end, os, channel, app)
    const body = document.getElementsByTagName('body')[0]
    body.appendChild(iframe)
  }
  handleDownloadChannel = this.handleDownloadChannel.bind()
  handleDownloadChannel () {
    const start = this.props.more.startTime
    const end = this.props.more.endTime
    const os = this.props.more.os
    const channel = this._getChannelSelect()
    const app = this._getAppSelect()
    const iframe = api.downloadChannel(start, end, os, channel, app)
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
