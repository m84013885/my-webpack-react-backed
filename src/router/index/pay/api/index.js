
import asyncFetch from '../../../../utills/asyncFetch'

// const URLPREFIX = '/api/'
// const URLPREFIX = 'http://remix-tj.moumentei.com/'
const URLPREFIX = '/'

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
        url: URLPREFIX + `default?page=0&start=${start}&end=${end}&os=${os}&app=${app}&channel=${channel}&sort=`,
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
  downloadChannel (start, end, os, app, channel) {
    const iframe = document.createElement('iframe')
    iframe.src = URLPREFIX + `download/payinfo/channel?start=${start}&end=${end}&os=${os}&app=${app}&channel=${channel}`
    iframe.style.display = 'none'
    return iframe
  }
  downloadChannelDetail (start, end, os, app, channel) {
    const iframe = document.createElement('iframe')
    iframe.src = URLPREFIX + `download/payinfo/ochannel?start=${start}&end=${end}&os=${os}&app=${app}&channel=${channel}`
    iframe.style.display = 'none'
    return iframe
  }
  downloadChannelDetailMisc (start, end, os, app, channel) {
    const iframe = document.createElement('iframe')
    iframe.src = URLPREFIX + `download/default/misc?start=${start}&end=${end}&os=${os}&app=${app}&channel=${channel}&sort=`
    iframe.style.display = 'none'
    return iframe
  }
}
const api = new Api()
export default api
