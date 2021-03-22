import React, { Component } from 'react'
import { filterData } from './filterData'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { columns } from './columns'
import CommonList from '../../../components/list/index'
import * as actions from './index.action'
import * as Util from '../../../../util/'
import './index.less'

class Position extends Component {
  constructor(props) {
    super(props)

    this._getPositionList = this._getPositionList.bind(this)

    this.state = {
      searchParams: {}
    }
  }

  _getPositionList(params) {
    this.setState({ searchParams: params })
    this.props.getPositionList(params)
  }

  componentDidMount() {
    this.props.getAllDepartment({rootNodeId: 1})
    //获取职务
    this.props.getAllJob();
    //职务状态
    this.props.getPositionState();
  }

  componentWillUpdate(nextProps, nextState) {
    Util.fetchCallback({
      status: nextProps.PositionList.positionListStatus,
      code: nextProps.PositionList.positionListCode,
      message: nextProps.PositionList.positionListMessage,
      params: nextState.searchParams,
      updateStatus: nextProps.updatePositionListStatus,
      nextProps
    })

    //获取所有部门
    Util.fetchCallback({
      status: nextProps.PositionList.getAllDepartmentStatus,
      code: nextProps.PositionList.getAllDepartmentCode,
      message: nextProps.PositionList.getAllDepartmentMessage,
      updateStatus: nextProps.updateGetAllDepartmentStatus,
      successCallback: () => {
        let data = nextProps.PositionList.getAllDepartmentData
        filterData && filterData.forEach(item => {
          if (item.id === 'deptId') {
            let arr = [];
            arr[0] = data;
            if(arr && arr.length > 0) {
              item['data'] = arr;
            }
          }
        })
      }
    })

    //获取所有职务
    Util.fetchCallback({
      status: nextProps.PositionList.getAllJobStatus,
      code: nextProps.PositionList.getAllJobCode,
      message: nextProps.PositionList.getAllJobMessage,
      updateStatus: nextProps.updateGetAllJobStatus,
      successCallback: () => {
        let jobs = nextProps.PositionList.getAllJobData
        let data = []
        jobs && jobs.forEach(job => {
          data.push({
            id: job.id,
            name: job.jobName
          })
        })
        filterData && filterData.forEach(item => {
          if(item.id === 'jobId') {
            item.data = data;
          }
        })
      }
    })

    //获取职位状态
    Util.fetchCallback({
      status: nextProps.PositionList.getPositionStateStatus,
      code: nextProps.PositionList.getPositionStateCode,
      message: nextProps.PositionList.getPositionStateMessage,
      params: nextState.searchParams,
      updateStatus: nextProps.updateGetPositionStateStatus,
      successCallback: () => {
        let items = nextProps.PositionList.getPositionStateData
        filterData && filterData.forEach(item => {
          if (item.id === 'positionState') {
            item['data'] = items
          }
        })
      }
    })
  }

  render() {
    let tableDataSource =
      this.props.PositionList && this.props.PositionList.positionListData
    let pagination =
      this.props.PositionList && this.props.PositionList.positionListPage

    return (
      <div className="position">
        <CommonList
          getCommonList={this._getPositionList}
          getCommonSelect={this._getPositionSelect}
          filterData={filterData}
          columns={columns}
          tableDataSource={tableDataSource}
          tableLoading={this.props.Fetch.spinning}
          pagination={pagination}
          scroll={
            tableDataSource && tableDataSource.length > 0 ? { x: 1500 } : {}
          }
        />
      </div>
    )
  }
}

export default connect(
  state => {
    return { PositionList: state.PositionList, Fetch: state.Fetch }
  },
  dispatch => bindActionCreators({ ...actions }, dispatch)
)(Position)
