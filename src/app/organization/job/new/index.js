import React, { Component } from 'react'
import { Form } from 'antd'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from './index.action'
import New from '../../../components/new/index'
import * as Util from '../../../../util/'
import Loader from '../../../../components/loader/'
import { newData } from './data'
import moment from 'moment/moment'

const WrappedAdvancedNew = Form.create()(New)

class NewJob extends Component {
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
    params.id ? null : delete params.id;
    delete params.actionId
    const param = {
      data: {
        ...params
      }
    }
    if (this.state.id) {
      return this.props.updateJob(param)
    } else {
      return this.props.addNewJob(param)
    }
  }

  componentDidMount() {
    let id = Util.getUrlArg('id')
    this.setState({ id: id }, () => {
      if (this.state.id) {
        this.props.getJobDetail({ id })
      } else {
        Util.resetInitialValue(newData)
      }
    })
  }

  componentWillUpdate(nextProps, nextState) {
    //添加成功后回调
    Util.fetchCallback({
      status: nextProps.NewJob.addNewJobStatus,
      code: nextProps.NewJob.addNewJobCode,
      message: nextProps.NewJob.addNewJobMessage,
      updateStatus: nextProps.updateAddNewJobStatus,
      isShowDialog: true,
      successText: '操作成功',
      isShowToastSuccess: true,
      successCallback: () => {
        //获取列表数据成功之后，回退到上一级
        this.props.history.goBack()
      }
    })

    //更新成功后回调
    Util.fetchCallback({
      status: nextProps.NewJob.updateJobStatus,
      code: nextProps.NewJob.updateJobCode,
      message: nextProps.NewJob.updateJobMessage,
      updateStatus: nextProps.updateUpdateJobStatus,
      isShowDialog: true,
      successText: '操作成功',
      isShowToastSuccess: true,
      successCallback: () => {
        //获取列表数据成功之后，回退到上一级
        this.props.history.goBack()
      }
    })

    //获取详情初始值，并push到对应的newData中
    Util.fetchCallback({
      status: nextProps.NewJob.getDetailJobStatus,
      code: nextProps.NewJob.getDetailJobCode,
      message: nextProps.NewJob.getDetailJobMessage,
      updateStatus: nextProps.updateGetJobDetailStatus,
      nextProps,
      successCallback: () => {
        let data = nextProps.NewJob.getDetailJobData
        Util.setInitialValue(newData, data)
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
        text: '返回',
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
            this.state.id ? this.props.NewJob.getDetailJobData : null
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
      NewJob: state.NewJob,
      JobList: state.JobList,
      Fetch: state.Fetch
    }
  },
  dispatch => bindActionCreators({ ...actions }, dispatch)
)(NewJob)
