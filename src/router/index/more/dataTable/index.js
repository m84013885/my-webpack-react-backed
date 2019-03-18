'use strict'
import { observer, inject } from 'mobx-react'
import { Table } from 'antd'

@inject('more') @observer class DataTable extends React.Component {
  static propTypes = {
    history: PropTypes.object,
    more: PropTypes.object,
    getAppArr: PropTypes.func,
    getChannelArr: PropTypes.func
  }

  componentDidMount () {

  }
  state = {

  }
  _timeRender (t) {
    if (!t) {
      return <span href="javascript:;">{`-`}</span>
    }
    else if (t.length >= 8) {
      return <span href="javascript:;">{t.slice(0, 4) + '-' + t.slice(4, 6) + '-' + t.slice(6)}</span>
    }
    else {
      return <span href="javascript:;">-</span>
    }
  }
  render () {
    const { Column, ColumnGroup } = Table
    const data = this.props.more.data
    return (
      <Table dataSource={data} bordered={true} scroll={{ x: 1480, y: 450 }} size="small" pagination={false}>
        <Column title="时间" render={this._timeRender} dataIndex="date" key="date" width={100} fixed="left"/>
        <Column title="平台" dataIndex="os" key="os" width={70} fixed="left"/>
        <Column title="产品" dataIndex="app" key="app" width={70} fixed="left"/>
        <Column title="渠道" dataIndex="channel" key="channel" width={70} fixed="left"/>
        <Column title="新增设备" dataIndex="new" key="new" width={70}/>
        <Column title="新增注册" dataIndex="reg" key="reg" width={70}/>
        <Column title="新增注册设备" dataIndex="reg1" key="reg1" width={70}/>
        <Column title="活跃设备" dataIndex="device" key="device" width={70}/>
        <ColumnGroup title="新用户付费：付费时所在渠道来源">
          <Column title="人数" dataIndex="newpeop" key="newpeop" width={80}/>
          <Column title="次数" dataIndex="newnums" key="newnums" width={80}/>
          <Column title="金额" dataIndex="newsums" key="newsums" width={80}/>
        </ColumnGroup>
        <ColumnGroup title="累计付费：注册用户渠道来源" >
          <Column title="人数" dataIndex="opeop" key="opeop" width={80}/>
          <Column title="次数" dataIndex="onums" key="onums" width={80}/>
          <Column title="金额" dataIndex="osums" key="osums" width={80}/>
        </ColumnGroup>
        <ColumnGroup title="累计付费：付费时所在渠道来源" >
          <Column title="人数" dataIndex="peop" key="peop" width={80}/>
          <Column title="次数" dataIndex="nums" key="nums" width={80}/>
          <Column title="金额" dataIndex="sums" key="sums" width={80}/>
        </ColumnGroup>
        <ColumnGroup title="相应时间段注册用户付费" >
          <Column title="人数" dataIndex="regpaycnt" key="regpaycnt" width={80}/>
          <Column title="金额" dataIndex="regpay" key="regpay" width={80}/>
        </ColumnGroup>
      </Table>
    )
  }
}

export default DataTable
