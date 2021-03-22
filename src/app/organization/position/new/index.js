import React, { Component } from 'react'
import { Form } from 'antd'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from './index.action'
import New from '../../../components/new/index'
import * as Util from '../../../../util/'
import * as Common from '../../../../util/common'
import Loader from '../../../../components/loader/'
import { newData } from './data'
import moment from 'moment/moment'

const WrappedAdvancedNew = Form.create()(New)

class NewPosition extends Component {
  constructor(props) {
    super(props)
    this._actionJudge = this._actionJudge.bind(this)

    this.state = {
      id: 0
    }
  }

  _actionJudge(params) {
    params.actionId === 'save'
      ? (params.submitType = 1)
      : (params.submitType = 2)
    // eslint-disable-next-line
    params.id ? null : delete params.id
    delete params.actionId
    const param = {
      data: {
        ...params
      }
    }
    if (params.id) {
      this.props.updatePosition(param)
    } else {
      this.props.addNewPosition(param)
    }
  }

  componentDidMount() {
    this.props.getAllDepartment({rootNodeId: 1})
    this.props.getAllPosition()
    //获取职务
    this.props.getAllJob();
    //职务状态
    this.props.getPositionState();

    let id = Util.getUrlArg('id')
    this.setState({ id: id }, () => {
      if (this.state.id) {
        this.props.getDetailPosition({ id })
      } else {
        Util.resetInitialValue(newData)
      }
    })
  }

  componentWillUpdate(nextProps, nextState) {
    //添加成功后回调
    Util.fetchCallback({
      status: nextProps.NewPosition.addNewPositionStatus,
      code: nextProps.NewPosition.addNewPositionCode,
      message: nextProps.NewPosition.addNewPositionMessage,
      updateStatus: nextProps.updateAddNewPositionStatus,
      isShowDialog: true,
      successText: '操作成功',
      successCallback: () => {
        //获取列表数据成功之后，回退到上一级
        this.props.history.goBack()
      }
    })

    //获取详情初始值，并push到对应的newData中
    Util.fetchCallback({
      status: nextProps.NewPosition.getDetailPositionStatus,
      code: nextProps.NewPosition.getDetailPositionCode,
      message: nextProps.NewPosition.getDetailPositionMessage,
      updateStatus: nextProps.updateGetDetailPositionStatus,
      nextProps,
      successCallback: () => {
        let data = nextProps.NewPosition.getDetailPositionData
        Util.setInitialValue(newData, data)
      }
    })

    //获取所有部门
    Util.fetchCallback({
      status: nextProps.NewPosition.getAllDepartmentStatus,
      code: nextProps.NewPosition.getAllDepartmentCode,
      message: nextProps.NewPosition.getAllDepartmentMessage,
      updateStatus: nextProps.updateGetAllDepartmentStatus,
      successCallback: () => {
        let data = nextProps.NewPosition.getAllDepartmentData
        newData && newData.forEach(item => {
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
    
    //获取所有职位
    Util.fetchCallback({
      status: nextProps.NewPosition.getAllPositionStatus,
      code: nextProps.NewPosition.getAllPositionCode,
      message: nextProps.NewPosition.getAllPositionMessage,
      updateStatus: nextProps.updateGetAllPositionStatus,
      successCallback: () => {
        let poss = nextProps.NewPosition.getAllPositionData
        let data = []
        poss && poss.forEach(pos => {
          data.push({
            id: pos.id,
            name: pos.positionName
          })
        })
        newData && newData.forEach(item => {
          if (item.id === 'parentId') {
            item['data'] = data
          }
        })
      }
    })

    //更新成功后回调
    Util.fetchCallback({
      status: nextProps.NewPosition.updatePositionStatus,
      code: nextProps.NewPosition.updatePositionCode,
      message: nextProps.NewPosition.updatePositionMessage,
      updateStatus: nextProps.updateUpdatePositionStatus,
      successText: '操作成功',
      successCallback: () => {
        //获取列表数据成功之后，回退到上一级
        this.props.history.goBack()
      }
    })

    //获取所有职务
    Util.fetchCallback({
      status: nextProps.NewPosition.getAllJobStatus,
      code: nextProps.NewPosition.getAllJobCode,
      message: nextProps.NewPosition.getAllJobMessage,
      updateStatus: nextProps.updateGetAllJobStatus,
      successCallback: () => {
        let jobs = nextProps.NewPosition.getAllJobData
        let data = []
        jobs && jobs.forEach(job => {
          data.push({
            id: job.id,
            name: job.jobName
          })
        })
        newData && newData.forEach(item => {
          if(item.id === 'jobId') {
            item.data = data;
          }
        })
      }
    })

    //获取职位状态
    Util.fetchCallback({
      status: nextProps.NewPosition.getPositionStateStatus,
      code: nextProps.NewPosition.getPositionStateCode,
      message: nextProps.NewPosition.getPositionStateMessage,
      params: nextState.searchParams,
      updateStatus: nextProps.updateGetPositionStateStatus,
      successCallback: () => {
        let items = nextProps.NewPosition.getPositionStateData
        newData && newData.forEach(item => {
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
        text: '提交',
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

    console.log(newData)
    return (
      <div>
        <WrappedAdvancedNew
          newData={newData}
          //编辑页面传递detailData,创建页面不传递detailData
          detailData={
            this.state.id ? this.props.NewPosition.getDetailPositionData : null
          }
          history={this.props.history}
          actionButtons={actionButtons}
        />
        <Loader spinning={this.props.Fetch.spinning || false} />
      </div>
    )
  }
}

export default connect(
  state => {
    return {
      NewPosition: state.NewPosition,
      PositionList: state.PositionList,
      Fetch: state.Fetch
    }
  },
  dispatch => bindActionCreators({ ...actions }, dispatch)
)(NewPosition)
