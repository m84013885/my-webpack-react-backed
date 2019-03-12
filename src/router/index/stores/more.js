'use strict'
import {
  observable,
  action,
  computed
} from 'mobx'

// 请求
class More {
  // 改变时间
  @observable thisTime
  @observable startTime
  @observable endTime
  @action changeThisTime = (arr, start, end) => {
    this.thisTime = arr
    this.startTime = start
    this.endTime = end
  }

  // 改变平台
  @observable os
  @action changeOs = (os) => {
    this.os = os
  }

  // 改变应用
  @observable app
  @action changeApp = (app) => {
    this.app = app
  }

  // 改变渠道
  @observable channel
  @action changeChannel = (channel) => {
    this.channel = channel
  }

  // 保存数据
  @observable data
  @action changeData = (data) => {
    this.data = data
  }
}
const more = new More()
export default more
