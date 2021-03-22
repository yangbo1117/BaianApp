import React, { Component } from 'react'
import { filterData } from './filterData'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { columns } from './columns'
import CommonList from '../../../components/list/index'
import * as actions from './index.action'
import * as Util from '../../../../util/'
import './index.less'

class Company extends Component {
  constructor(props) {
    super(props)

    this._getCompanyList = this._getCompanyList.bind(this)

    this.state = {
      searchParams: {}
    }
  }

  _getCompanyList(params) {
    this.setState({ searchParams: params })
    this.props.getCompanyList(params)
  }

  componentWillUpdate(nextProps, nextState) {
    Util.fetchCallback({
      status: nextProps.CompanyList.companyListStatus,
      code: nextProps.CompanyList.companyListCode,
      message: nextProps.CompanyList.companyListMessage,
      params: nextState.searchParams,
      updateStatus: nextProps.updateCompanyListStatus,
      nextProps
    })
  }

  render() {
    let tableDataSource =
      this.props.CompanyList && this.props.CompanyList.companyListData
    let pagination = this.props.CompanyList && this.props.CompanyList.companyListPage

    return (
      <div className="company">
        <CommonList
          getCommonList={this._getCompanyList}
          filterData={filterData}
          columns={columns}
          tableDataSource={tableDataSource}
          tableLoading={this.props.Fetch.spinning}
          pagination={pagination}
          scroll={
            tableDataSource && tableDataSource.length > 0 ? { x: 1800 } : {}
          }
        />
      </div>
    )
  }
}

export default connect(
  state => {
    return { CompanyList: state.CompanyList, Fetch: state.Fetch }
  },
  dispatch => bindActionCreators({ ...actions }, dispatch)
)(Company)
