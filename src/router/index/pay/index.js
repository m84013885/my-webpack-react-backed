'use strict'
import { observer, inject } from 'mobx-react'
import style from './style.css'
import { Icon, message, Spin } from 'antd'
import api from './api'
import DataTable from './dataTable'

import TimePicker from '../more/timePicker'
import Platform from '../more/platform'
import App from '../more/app'
import Channel from '../more/channel'
import Sumbit from '../more/sumbit'
import DownLoad from '../more/download'

@inject('store', 'more') @observer class Main extends React.Component {
  static propTypes = {
    history: PropTypes.object,
    more: PropTypes.object
  }

  componentDidMount () {

  }
  state = {
    state: 0,
    more: false
  }
  getAppArr = this.getAppArr.bind(this)
  async getAppArr () {
    const os = this.props.more.os
    const changeApp = this.props.more.changeApp
    const res = await api.getApp(os)
    if (typeof (res) === 'string') {
      message.error(res)
    }
    else {
      const arr = []
      res.data.map((content, index) => {
        if (index === 0) {
          arr.push({ value: content, checked: true, visibility: false })
        }
        else {
          arr.push({ value: content, checked: false, visibility: false })
        }
      })
      changeApp(arr)
    }
  }
  getChannelArr = this.getChannelArr.bind(this)
  async getChannelArr () {
    const os = this.props.more.os
    const app = this._getAppSelect()
    const changeChannel = this.props.more.changeChannel
    const res = await api.getChannel(os, app)
    if (typeof (res) === 'string') {
      message.error(res)
    }
    else {
      const arr = []
      res.data.map((content, index) => {
        if (index === 0) {
          arr.push({ value: content, checked: true, visibility: false })
        }
        else {
          arr.push({ value: content, checked: false, visibility: false })
        }
      })
      changeChannel(arr)
    }
  }
  getDataArr = this.getDataArr.bind(this)
  async getDataArr () {
    const changeData = this.props.more.changeData
    const changeLoading = this.props.more.changeLoading
    const start = this.props.more.startTime
    const end = this.props.more.endTime
    const os = this.props.more.os
    const channel = this._getChannelSelect()
    const app = this._getAppSelect()
    changeLoading(true)
    const res = await api.getData(start, end, os, channel, app)
    changeLoading(false)
    if (typeof (res) === 'string') {
      message.error(res)
    }
    else {
      changeData(res.data)
      const regpay = await api.getDataRegpay(start, end, os, channel, app)
      const data = this.props.more.data
      if (os === 'ios') {
        regpay.data.map((content) => {
          data.map((dataContent, index) => {
            if (content.app === dataContent.app) {
              data[index].regpaycnt = content.regpaycnt
              data[index].regpay = content.regpay
            }
          })
        })
        changeData(data)
      }
      else {
        regpay.data.map((content) => {
          data.map((dataContent, index) => {
            if (content.channel === dataContent.channel) {
              data[index].regpaycnt = content.regpaycnt
              data[index].regpay = content.regpay
            }
          })
        })
        changeData(data)
      }
    }
  }
  _getAppSelect () {
    const appSelect = this.props.more.app
    let app = ''
    const appArr = []
    appSelect.map((content) => {
      if (content.checked) {
        appArr.push(content.value)
      }
    })
    appArr.map((content, index) => {
      if (index !== appArr.length - 1) {
        app += content + ','
      }
      else {
        app += content
      }
    })
    return app
  }
  _getChannelSelect () {
    const appSelect = this.props.more.channel
    let app = ''
    const appArr = []
    appSelect.map((content) => {
      if (content.checked) {
        appArr.push(content.value)
      }
    })
    appArr.map((content, index) => {
      if (index !== appArr.length - 1) {
        app += content + ','
      }
      else {
        app += content
      }
    })
    if (appArr.length === appSelect.length) {
      return ''
    }
    else {
      return app
    }
  }
  render () {
    const loading = this.props.more.loading
    const lastLoading = this.props.more.lastLoading
    const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />
    return (
      <div className={style.payContent}>
        <div className={style.payTitle}><Icon type="bars"/>各渠道信息汇总</div>
        <div className={style.payFrom}>
          <TimePicker/>
          <Platform getAppArr={this.getAppArr} getChannelArr={this.getChannelArr}/>
          <App getAppArr={this.getAppArr} getChannelArr={this.getChannelArr}/>
          <Channel getChannelArr={this.getChannelArr}/>
          <Sumbit getDataArr={this.getDataArr}/>
          <Spin style={{ display: lastLoading ? 'block' : 'none' }} indicator={antIcon}/>
        </div>
        <DownLoad/>
        <DataTable/>
        <Spin style={{ display: loading ? 'block' : 'none' }} className={style.payLoadingSpin} size="large" />
      </div>
    )
  }
}

export default Main
