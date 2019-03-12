'use strict'
import { observer, inject } from 'mobx-react'
import style from './style.css'
import { Button } from 'antd'

@inject('more') @observer class Sumbit extends React.Component {
  static propTypes = {
    getDataArr: PropTypes.func,
    more: PropTypes.object
  }

  componentDidMount () {

  }
  state = {

  }
  handleSearch = this.handleSearch.bind(this)
  handleSearch () {
    this.props.getDataArr()
  }
  render () {
    return (
      <Button className={style.payBtn} onClick={this.handleSearch}>查询</Button>
    )
  }
}

export default Sumbit
