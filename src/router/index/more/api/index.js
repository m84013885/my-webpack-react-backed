
import asyncFetch from '../../../../utills/asyncFetch'
import { message } from 'antd'

// const URLPREFIX = '/api/'
const URLPREFIX = 'http://remix-tj.moumentei.com/'

class Api {
  getApp (os) {
    return new Promise((resolve, reject) => {
      asyncFetch({
        url: URLPREFIX + `layer/` + os,
        method: 'GET'
      }).then(res => {
        if (res.err === 0) {
          resolve(res)
        }
        else {
          reject('网络错误')
        }
      })
    })
  }
  getChannel (os, app) {
    return new Promise((resolve, reject) => {
      asyncFetch({
        url: URLPREFIX + `layer/${os}/` + app,
        method: 'GET'
      }).then(res => {
        if (res.err === 0) {
          resolve(res)
        }
        else {
          reject('网络错误')
        }
      })
    })
  }
  getData (start, end, os, app, channel) {
    return new Promise((resolve, reject) => {
      asyncFetch({
        url: URLPREFIX + `default/misc?start=${start}&end=${end}&os=${os}&app=${app}&channel=${channel}&sort=`,
        method: 'GET'
      }).then(res => {
        if (res.err === 0) {
          resolve(res)
        }
        else {
          reject('网络错误')
        }
      })
    })
  }
  getDataRegpay (start, end, os, app, channel) {
    return new Promise((resolve, reject) => {
      asyncFetch({
        url: URLPREFIX + `default/regpay?start=${start}&end=${end}&os=${os}&app=${app}&channel=${channel}&sort=`,
        method: 'GET'
      }).then(res => {
        if (res.err === 0) {
          resolve(res)
        }
        else {
          reject('网络错误')
        }
      })
    })
  }
}
const api = new Api()
export default api
