import React, { Component } from 'react'
import { filterData } from './filterData'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { columns } from './columns'
import CommonList from '../../../components/list/index'
import * as actions from './index.action'
import * as Util from '../../../../util/'
import './index.less'

class Department extends Component {
  constructor(props) {
    super(props)

    this._getDepartmentList = this._getDepartmentList.bind(this)

    this.state = {
      searchParams: {}
    }
  }

  _getDepartmentList(params) {
    this.setState({ searchParams: params })
    this.props.getDepartmentList(params)
  }

  componentDidMount() {
    this.props.getAllDepartment({rootNodeId: 1})
  }

  componentWillUpdate(nextProps, nextState) {
    Util.fetchCallback({
      status: nextProps.DepartmentList.departmentListStatus,
      code: nextProps.DepartmentList.departmentListCode,
      message: nextProps.DepartmentList.DepartmentListMessage,
      params: nextState.searchParams,
      updateStatus: nextProps.updateDepartmentListStatus,
      nextProps
    })

    //获取所有部门
    Util.fetchCallback({
      status: nextProps.DepartmentList.getAllDepartmentStatus,
      code: nextProps.DepartmentList.getAllDepartmentCode,
      message: nextProps.DepartmentList.getAllDepartmentMessage,
      updateStatus: nextProps.updateGetAllDepartmentStatus,
      successCallback: () => {
        let data = nextProps.DepartmentList.getAllDepartmentData
        filterData && filterData.forEach(item => {
          if (item.id === 'parentDeptId') {
            let arr = [];
            arr[0] = data;
            if(arr && arr.length > 0) {
              item['data'] = arr;
            }
          }
        })
      }
    })
  }

  render() {
    let tableDataSource =
      this.props.DepartmentList && this.props.DepartmentList.departmentListData
    let pagination =
      this.props.DepartmentList && this.props.DepartmentList.departmentListPage

    return (
      <div className="department">
        <CommonList
          getCommonList={this._getDepartmentList}
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
    return { DepartmentList: state.DepartmentList, Fetch: state.Fetch }
  },
  dispatch => bindActionCreators({ ...actions }, dispatch)
)(Department)
