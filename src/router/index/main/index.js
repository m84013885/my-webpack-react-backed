'use strict'
import { observer, inject } from 'mobx-react'
import style from './style.css'

@inject('store') @observer class Main extends React.Component {
  constructor (props) {
    super(props)
    this.state = {

    }
  }
  componentWillMount () {

  }
  keep = this.keep.bind(this)
  keep () {
    const { history } = this.props
    history.replace('/s')
  }
  render () {
    return (
      <div className={style.test}>
        <div onClick={this.keep}>留存数据</div>
      </div>
    )
  }
}

export default Main
