import React, { Component } from 'react'
import { filterData } from './filterData'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { columns } from './columns'
import CommonList from '../../../components/list/index'
import * as actions from './index.action'
import * as Util from '../../../../util/'
import { Divider } from 'antd'
import Dialog from '../../../../components/dialog'
import './index.less'

class EmployeePosition extends Component {
  constructor(props) {
    super(props)

    this._getEmployeePositionList = this._getEmployeePositionList.bind(this)
    this._actionRender = this._actionRender.bind(this)
    this._deleteEmployeePosition = this._deleteEmployeePosition.bind(this)

    this.state = {
      searchParams: {}
    }
  }

  _getEmployeePositionList(params) {
    this.setState({ searchParams: params })
    this.props.getEmployeePositionList(params)
    this.props.getAllDepartment({rootNodeId: 1})
  }

  _actionRender(text, recode) {
    let id = text.id
    let detail = './detail?id=' + id
    return (
      <span>
        <a onClick={() => this._deleteEmployeePosition(id)}>删除</a>
        <Divider type="vertical" />
        <a href={detail}>详情</a>
      </span>
    )
  }

  _deleteEmployeePosition(id) {
    Dialog.open({
      message: '确定删除吗？',
      dialogButton: [
        {
          text: '取消',
          clickHandle: () => {
            Dialog.close()
          }
        },
        {
          text: '确定',
          type: 'primary',
          clickHandle: () => {
            Dialog.close()
            this.props.deleteEmployeePosition({id})
          }
        }
      ]
    })

    return false;
  }

  componentWillUpdate(nextProps, nextState) {
    Util.fetchCallback({
      status: nextProps.EmployeePositionList.employeePositionListStatus,
      code: nextProps.EmployeePositionList.employeePositionListCode,
      message: nextProps.EmployeePositionList.employeePositionListMessage,
      params: nextState.searchParams,
      updateStatus: nextProps.updateEmployeePositionListStatus,
      nextProps
    })

    //获取下拉表，并push到对应的filterData中
    Util.fetchCallback({
      status: nextProps.EmployeePositionList.employeePositionSelectStatus,
      code: nextProps.EmployeePositionList.employeePositionSelectCode,
      message: nextProps.EmployeePositionList.employeePositionSelectMessage,
      updateStatus: nextProps.updateEmployeePositionSelectStatus,
      successCallback: () => {
        let items = nextProps.EmployeePositionList.employeePositionSelectData
        filterData &&
          filterData.forEach(item => {
            if (item.type === 'select') {
              for (let i in items) {
                if (item.enumName === i) {
                  item['data'] = items[i]
                }
              }
            }
          })
      }
    })
    //获取所有部门
    Util.fetchCallback({
      status: nextProps.EmployeePositionList.getAllDepartmentStatus,
      code: nextProps.EmployeePositionList.getAllDepartmentCode,
      message: nextProps.EmployeePositionList.getAllDepartmentMessage,
      updateStatus: nextProps.updateGetAllDepartmentStatus,
      successCallback: () => {
        let data = nextProps.EmployeePositionList.getAllDepartmentData
        filterData && filterData.forEach(item => {
          if(item.type === 'cascader') {
            item.linkage && item.linkage.map(i => {
              if (i.id === 'deptId') {
                let arr = [];
                arr[0] = data;
                if(arr && arr.length > 0) {
                  i['data'] = arr;
                }
              }
            })
          }
        })
      }
    })

    //根据部门id获取
    Util.fetchCallback({
      status: nextProps.EmployeePositionList.getTitleByPositionStatus,
      code: nextProps.EmployeePositionList.getTitleByPositionCode,
      message: nextProps.EmployeePositionList.getTitleByPositionMessage,
      updateStatus: nextProps.updateGetTitleByPositionStatus,
      successCallback: () => {
        let poss = nextProps.EmployeePositionList.getTitleByPositionData
        let data = []
        poss &&
          poss.forEach(dept => {
            data.push({
              id: dept.id,
              name: dept.positionName
            })
          })
        filterData &&
          filterData.forEach(item => {
            if (item.type === 'cascader') {
              item.linkage &&
                item.linkage.map(i => {
                  if (i.id === 'positionId') {
                    i['data'] = data
                  }
                })
            }
          })
      }
    })

    //删除关联职位
    Util.fetchCallback({
      status: nextProps.EmployeePositionList.deleteEmployeePositionStatus,
      code: nextProps.EmployeePositionList.deleteEmployeePositionCode,
      message: nextProps.EmployeePositionList.deleteEmployeePositionMessage,
      params: nextState.searchParams,
      updateStatus: nextProps.deleteEmployeePositionStatus,
      successText: '删除成功',
      isShowToastSuccess: true,
      successCallback: () => {
        this.props.getEmployeePositionList(nextState.searchParams)
      }
    })
  }

  render() {
    let tableDataSource =
      this.props.EmployeePositionList &&
      this.props.EmployeePositionList.employeePositionListData
    let pagination =
      this.props.EmployeePositionList &&
      this.props.EmployeePositionList.employeePositionListPage

    return (
      <div className="EmployeePosition">
        <CommonList
          isHideNewBtn={true}
          getCommonList={this._getEmployeePositionList}
          filterData={filterData}
          columns={columns({
            actionRender: (text, recode) => this._actionRender(text, recode)
          })}
          tableDataSource={tableDataSource}
          tableLoading={this.props.Fetch.spinning}
          pagination={pagination}
          scroll={
            tableDataSource && tableDataSource.length > 0 ? { x: 800 } : {}
          }
          handleChange={(args, option) =>
            this.props.cascaderHandleChange(args, option)
          }
        />
      </div>
    )
  }
}

export default connect(
  state => {
    return {
      EmployeePositionList: state.EmployeePositionList,
      Fetch: state.Fetch
    }
  },
  dispatch => bindActionCreators({ ...actions }, dispatch)
)(EmployeePosition)
