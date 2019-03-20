'use strict'
import { observer, inject } from 'mobx-react'
import style from './style.css'
import { Icon, message, Spin } from 'antd'
import api from './api'

import TimePicker from './timePicker'
import Platform from './platform'
import App from './app'
import Channel from './channel'
import Sumbit from './sumbit'
import DownLoad from './download'
import DataTable from './dataTable'

@inject('store', 'more') @observer class Main extends React.Component {
  static propTypes = {
    history: PropTypes.object,
    more: PropTypes.object
  }
  GetQueryString (name) {
    const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
    const r = window.location.search.substr(1).match(reg)
    if (r != null) { return (decodeURIComponent(r[2])) }
    return null
  }
  componentDidUpdate () {
    // const start1 = this.GetQueryString('start')
    // const end1 = this.GetQueryString('end')
    // const os1 = this.GetQueryString('os')
    // const channel1 = this.GetQueryString('channel')
    // const app1 = this.GetQueryString('app')
    // const start2 = this.state.start
    // const end2 = this.state.end
    // const os2 = this.state.os
    // const channel2 = this.state.start.channel
    // const app2 = this.state.app
    // if(start1!==start2 && end1!==end2 && os1!==os2 && channel1!==channel2 && app1!==app2){
    //   this.getDataArr()
    // }
  }
  state = {
    state: 0,
    more: false,
    app: 0,
    channel: 0,
    os: 0,
    start: 0,
    end: 0
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
    const changeLastLoading = this.props.more.changeLastLoading
    const start = this.props.more.startTime
    const end = this.props.more.endTime
    const os = this.props.more.os
    const channel = this._getChannelSelect()
    const app = this._getAppSelect()
    changeLoading(true)
    const res = await api.getData(start, end, os, app, channel)
    changeLoading(false)
    if (typeof (res) === 'string') {
      message.error(res)
    }
    else {
      changeData(res.data)
      changeLastLoading(true)
      const regpay = await api.getDataRegpay(start, end, os, app, channel)
      changeLastLoading(false)
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
  _getAppSelect = this._getAppSelect.bind(this)
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
  _getChannelSelect = this._getChannelSelect.bind(this)
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
    console.log(appArr.length)
    console.log(appSelect.length)
    if (appArr.length === appSelect.length) {
      console.log(1)
      return ''
    }
    else {
      return app
    }
  }
  pushSumbit = this.pushSumbit.bind(this)
  pushSumbit () {
    const { history } = this.props
    const pathname = history.location.pathname
    const start = this.props.more.startTime
    const end = this.props.more.endTime
    const os = this.props.more.os
    const channel = this._getChannelSelect()
    const app = this._getAppSelect()
    history.push(pathname + `?start=${start}&end=${end}&os=${os}&channel=${channel}&app=${app}`)
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
        <DownLoad getChannel={this._getChannelSelect} getApp={this._getAppSelect}/>
        <DataTable/>
        <Spin style={{ display: loading ? 'block' : 'none' }} className={style.payLoadingSpin} size="large" />
      </div>
    )
  }
}

export default Main
