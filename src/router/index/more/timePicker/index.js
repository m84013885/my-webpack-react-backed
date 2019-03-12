'use strict'
import { observer, inject } from 'mobx-react'
import style from './style.css'
import { DatePicker, Button } from 'antd'
import moment from 'moment'

@inject('more') @observer class TimePicker extends React.Component {
  static propTypes = {
    history: PropTypes.object,
    more: PropTypes.object
  }

  componentDidMount () {
    this._resetThisTime()
  }
  state = {

  }
  // 修改过去的时间
  fastChangeTime (day) {
    const changeThisTime = this.props.more.changeThisTime
    const Date1 = new Date()
    const Date2 = formatDate(Date1)
    const Date3 = formatDate(new Date(Date1.getTime() - day * 24 * 60 * 60 * 1000))
    function formatDate (now, type) {
      const year = new Date(now).getYear()
      let month = new Date(now).getMonth() + 1
      if (month < 10) {
        month = '0' + month
      }
      let date = new Date(now).getDate()
      if (date < 10) {
        date = '0' + date
      }
      if (type) {
        return (1900 + year) + type + month + type + date
      }
      else {
        return (1900 + year) + '/' + month + '/' + date
      }
    }
    const ltime = Date3.split('/')
    const start = ltime[0] + ltime[1] + ltime[2] + '+00'
    const rtime = Date2.split('/')
    const end = rtime[0] + rtime[1] + rtime[2] + '+23'
    changeThisTime([moment(Date3, 'YYYY/MM/DD'), moment(Date2, 'YYYY/MM/DD')], start, end)
  }
  // 重置时间
  _resetThisTime () {
    const changeThisTime = this.props.more.changeThisTime
    const Date1 = new Date()
    const Date2 = formatDate(Date1)
    const Date3 = formatDate(new Date(Date1.getTime() - 168 * 60 * 60 * 1000))
    function formatDate (now, type) {
      const year = new Date(now).getYear()
      let month = new Date(now).getMonth() + 1
      if (month < 10) {
        month = '0' + month
      }
      let date = new Date(now).getDate()
      if (date < 10) {
        date = '0' + date
      }
      if (type) {
        return (1900 + year) + type + month + type + date
      }
      else {
        return (1900 + year) + '/' + month + '/' + date
      }
    }
    const ltime = Date3.split('/')
    const start = ltime[0] + ltime[1] + ltime[2] + '+00'
    const rtime = Date2.split('/')
    const end = rtime[0] + rtime[1] + rtime[2] + '+23'
    changeThisTime([moment(Date3, 'YYYY/MM/DD'), moment(Date2, 'YYYY/MM/DD')], start, end)
  }
  handleChangeTime = this.handleChangeTime.bind(this)
  handleChangeTime (date, dateString) {
    const changeThisTime = this.props.more.changeThisTime
    const ltime = dateString[0].split('-')
    const start = ltime[0] + ltime[1] + ltime[2] + '+00'
    const rtime = dateString[1].split('-')
    const end = rtime[0] + rtime[1] + rtime[2] + '+23'
    changeThisTime([moment(dateString[0], 'YYYY/MM/DD'), moment(dateString[1], 'YYYY/MM/DD')], start, end)
  }

  render () {
    const { RangePicker } = DatePicker
    const thisTime = this.props.more.thisTime
    return (
      <RangePicker renderExtraFooter={() => (
        <div>
          <Button className={style.buttonMargin} onClick={() => { this.fastChangeTime(7) }}>过去7天</Button>
          <Button className={style.buttonMargin} onClick={() => { this.fastChangeTime(14) }}>过去14天</Button>
          <Button className={style.buttonMargin} onClick={() => { this.fastChangeTime(30) }}>过去30天</Button>
          <Button className={style.buttonMargin} onClick={() => { this.fastChangeTime(90) }}>过去90天</Button>
          <Button className={style.buttonMargin} onClick={() => { this.fastChangeTime(180) }}>过去180天</Button>
          <Button className={style.buttonMargin} onClick={() => { this.fastChangeTime(365) }}>过去365天</Button>
        </div>
      )} onChange={this.handleChangeTime} value={thisTime}/>
    )
  }
}

export default TimePicker
