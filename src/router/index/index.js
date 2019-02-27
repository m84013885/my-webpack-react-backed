'use strict'
import '../../utills/resize'
import App from './app'

if(module.hot){
  module.hot.accept()
}
const main = function () {
  ReactDom.render(<App/>, document.getElementById('main'))
}
window.onload = function () {
  main()
}

