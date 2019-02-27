'use strict'
import {
  observable,
  action,
  computed
} from 'mobx'

// 请求
class Store {
  @observable payBox=true
  @action payBoxhide = () => {
    this.payBox=true
  }
}
const store = new Store()

export default {
  store
}