'use strict'
import { observer, inject } from 'mobx-react'
import style from './style.css'

@inject('store') @observer class Main extends React.Component {
  static propTypes = {
    history: PropTypes.object
  }

  componentDidMount () {

  }
  state = {
    state: 0,
    more: false
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
