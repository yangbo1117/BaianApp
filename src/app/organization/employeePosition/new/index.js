import React, { Component } from 'react'
import { Form, Table, Divider } from 'antd'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from './index.action'
import New from '../../../components/new/index'
import * as Util from '../../../../util/'
import Loader from '../../../../components/loader/'
import Dialog from '../../../../components/dialog'
import { newData } from './data'
import moment from 'moment/moment'

const WrappedAdvancedNew = Form.create()(New)

class NewEmployeePosition extends Component {
  constructor(props) {
    super(props)
    this._actionJudge = this._actionJudge.bind(this)
    this._deleteEmployeePosition = this._deleteEmployeePosition.bind(this)

    this.state = {
      employeeName: Util.getUrlArg('employeeName') || '',
      jobNo: Util.getUrlArg('jobNo') || -1,
      employeeId: -1
    }
  }

  _actionJudge(params) {
    params.actionId === 'save'
      ? (params.submitType = 1)
      : (params.submitType = 2)
    // eslint-disable-next-line
    params.id ? null : delete params.id;
    delete params.actionId
    Util.getUrlArg('employeeId')
      ? (params['employeeId'] = Util.getUrlArg('employeeId'))
      : null
    const param = {
      data: {
        ...params
      }
    }

    this.props.addNewEmployeePosition(param)
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
            this.props.deleteEmployeePosition({ id })
          }
        }
      ]
    })

    return false
  }

  componentWillMount() {
    this.props.getPositionState()
    this.props.getAllDepartment({ rootNodeId: 1 })
  }

  componentDidMount() {
    Util.resetInitialValue(newData)
    newData.forEach((ele, index) => {
      if (ele.id === 'employeeName') {
        ele.initialValue = this.state.employeeName
          ? decodeURI(this.state.employeeName)
          : ''
      }
      if (ele.id === 'jobNo') {
        ele.initialValue = this.state.jobNo
      }
    })

    //获取关联职位
    let employeeId = Util.getUrlArg('employeeId')
    employeeId &&
      this.props.getRelativeEmployeePositionList({ employeeId: employeeId })
  }

  componentWillUpdate(nextProps, nextState) {
    //添加成功回调
    Util.fetchCallback({
      status: nextProps.NewEmployeePosition.addNewEmployeePositionStatus,
      code: nextProps.NewEmployeePosition.addNewEmployeePositionCode,
      message: nextProps.NewEmployeePosition.addNewEmployeePositionMessage,
      updateStatus: nextProps.updateAddNewEmployeePositionStatus,
      isShowDialog: true,
      successCallback: () => {
        //获取列表数据成功之后，跳转到职员-职位列表
        this.props.history.push('./list')
      }
    })

    //获取所有部门
    Util.fetchCallback({
      status: nextProps.NewEmployeePosition.getAllDepartmentStatus,
      code: nextProps.NewEmployeePosition.getAllDepartmentCode,
      message: nextProps.NewEmployeePosition.getAllDepartmentMessage,
      updateStatus: nextProps.updateGetAllDepartmentStatus,
      successCallback: () => {
        let data = nextProps.NewEmployeePosition.getAllDepartmentData
        newData &&
          newData.forEach(item => {
            if (item.type === 'cascader') {
              item.linkage &&
                item.linkage.map(i => {
                  if (i.id === 'deptId') {
                    let arr = []
                    arr[0] = data
                    if (arr && arr.length > 0) {
                      i['data'] = arr
                    }
                  }
                })
            }
          })
      }
    })

    //根据部门id获取
    Util.fetchCallback({
      status: nextProps.NewEmployeePosition.getTitleByPositionStatus,
      code: nextProps.NewEmployeePosition.getTitleByPositionCode,
      message: nextProps.NewEmployeePosition.getTitleByPositionMessage,
      updateStatus: nextProps.updateGetTitleByPositionStatus,
      successCallback: () => {
        let poss = nextProps.NewEmployeePosition.getTitleByPositionData
        let data = []
        poss &&
          poss.forEach(dept => {
            data.push({
              id: dept.id,
              name: dept.positionName
            })
          })
        newData &&
          newData.forEach(item => {
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

    //关联职位列表
    Util.fetchCallback({
      status: nextProps.NewEmployeePosition.relativeEmployeePositionListStatus,
      code: nextProps.NewEmployeePosition.relativeEmployeePositionListCode,
      message:
        nextProps.NewEmployeePosition.relativeEmployeePositionListMessage,
      params: nextState.searchParams,
      updateStatus: nextProps.updateRelativeEmployeePositionListStatus
    })

    //删除关联职位
    Util.fetchCallback({
      status: nextProps.NewEmployeePosition.deleteEmployeePositionStatus,
      code: nextProps.NewEmployeePosition.deleteEmployeePositionCode,
      message: nextProps.NewEmployeePosition.deleteEmployeePositionMessage,
      params: nextState.searchParams,
      updateStatus: nextProps.deleteEmployeePositionStatus,
      successText: '删除成功',
      isShowToastSuccess: true,
      successCallback: () => {
        //获取关联职位
        let employeeId = Util.getUrlArg('employeeId') //创建职位页面
        this.props.getRelativeEmployeePositionList({ employeeId: employeeId })
      }
    })

    //获取职位状态
    Util.fetchCallback({
      status: nextProps.NewEmployeePosition.getPositionStateStatus,
      code: nextProps.NewEmployeePosition.getPositionStateCode,
      message: nextProps.NewEmployeePosition.getPositionStateMessage,
      params: nextState.searchParams,
      updateStatus: nextProps.updateGetPositionStateStatus,
      successCallback: () => {
        let items = nextProps.NewEmployeePosition.getPositionStateData
        newData &&
          newData.forEach(item => {
            if (item.id === 'positionState') {
              item['data'] = items
            }
          })
      }
    })
  }

  render() {
    var actionButtons = [
      {
        text: '添加',
        id: 'save',
        clickHandle: values => {
          values.actionId = 'save'
          this._actionJudge(values)
        },
        className: 'ant-btn ant-btn-primary'
      },
      {
        text: '取消',
        id: 'goback',
        notCheck: true
      }
    ]
    return (
      <div>
        <WrappedAdvancedNew
          newData={newData}
          //编辑页面传递detailData,创建页面不传递detailData
          detailData={
            this.state.id
              ? this.props.NewEmployeePosition.getDetailEmployeePositionData
              : null
          }
          history={this.props.history}
          actionButtons={actionButtons}
          handleChange={(args, option) =>
            this.props.cascaderHandleChange(args, option)
          }
        />
        <Divider dashed orientation="left">
          <span style={{ color: 'blue' }}>已关联的职位</span>
        </Divider>
        <Table
          columns={[
            {
              title: '操作',
              key: 'action',
              render: (text, record) => {
                let id = text.id
                return (
                  <a onClick={() => this._deleteEmployeePosition(id)}>删除</a>
                )
              }
            },
            {
              title: '部门',
              dataIndex: 'deptName'
            },
            {
              title: '职位',
              dataIndex: 'positionName'
            }
          ]}
          dataSource={
            this.props.NewEmployeePosition.relativeEmployeePositionListData ||
            []
          }
          rowKey={item => item.id}
        />
        <Loader spinning={this.props.Fetch.spinning || false} />
      </div>
    )
  }
}

export default connect(
  state => {
    return {
      NewEmployeePosition: state.NewEmployeePosition,
      Fetch: state.Fetch
    }
  },
  dispatch => bindActionCreators({ ...actions }, dispatch)
)(NewEmployeePosition)
