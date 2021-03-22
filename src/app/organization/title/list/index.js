import React, { Component } from 'react'
import { filterData } from './filterData'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { columns } from './columns'
import CommonList from '../../../components/list/index'
import * as actions from './index.action'
import * as Util from '../../../../util/'
import './index.less'

class Title extends Component {
  constructor(props) {
    super(props)

    this._getTitleList = this._getTitleList.bind(this)

    this.state = {
      searchParams: {}
    }
  }

  _getTitleList(params) {
    this.setState({ searchParams: params })
    this.props.getTitleList(params)
  }

  componentWillUpdate(nextProps, nextState) {
    Util.fetchCallback({
      status: nextProps.TitleList.titleListStatus,
      code: nextProps.TitleList.titleListCode,
      message: nextProps.TitleList.titleListMessage,
      params: nextState.searchParams,
      updateStatus: nextProps.updateTitleListStatus,
      nextProps
    })
  }

  render() {
    let tableDataSource =
      this.props.TitleList && this.props.TitleList.titleListData
    let pagination = this.props.TitleList && this.props.TitleList.titleListPage

    return (
      <div className="title">
        <CommonList
          getCommonList={this._getTitleList}
          filterData={filterData}
          columns={columns}
          tableDataSource={tableDataSource}
          tableLoading={this.props.Fetch.spinning}
          pagination={pagination}
          scroll={
            tableDataSource && tableDataSource.length > 0 ? { x: 1000 } : {}
          }
        />
      </div>
    )
  }
}

export default connect(
  state => {
    return { TitleList: state.TitleList, Fetch: state.Fetch }
  },
  dispatch => bindActionCreators({ ...actions }, dispatch)
)(Title)
