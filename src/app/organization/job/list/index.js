import React, { Component } from 'react'
import { filterData } from './filterData'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { columns } from './columns'
import CommonList from '../../../components/list/index'
import * as actions from './index.action'
import * as Util from '../../../../util/'
import './index.less'

class Job extends Component {
  constructor(props) {
    super(props)

    this._getJobList = this._getJobList.bind(this)

    this.state = {
      searchParams: {}
    }
  }

  _getJobList(params) {
    this.setState({ searchParams: params })
    this.props.getJobList(params)
  }

  componentWillUpdate(nextProps, nextState) {
    Util.fetchCallback({
      status: nextProps.JobList.jobListStatus,
      code: nextProps.JobList.jobListCode,
      message: nextProps.JobList.jobListMessage,
      params: nextState.searchParams,
      updateStatus: nextProps.updateJobListStatus,
      nextProps
    })
  }

  render() {
    let tableDataSource =
      this.props.JobList && this.props.JobList.jobListData
    let pagination = this.props.JobList && this.props.JobList.jobListPage

    return (
      <div className="job">
        <CommonList
          getCommonList={this._getJobList}
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
    return { JobList: state.JobList, Fetch: state.Fetch }
  },
  dispatch => bindActionCreators({ ...actions }, dispatch)
)(Job)
