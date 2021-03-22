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

class NewTitle extends Component {
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
      return this.props.updateTitle(param)
    } else {
      return this.props.addNewTitle(param)
    }
  }

  componentDidMount() {
    let id = Util.getUrlArg('id')
    this.setState({ id: id }, () => {
      if (this.state.id) {
        this.props.getTitleDetail({ id })
      } else {
        Util.resetInitialValue(newData)
        newData.forEach((ele, index) => {
          if (ele.id === 'coverAllShopFlag') {
            ele.initialValue = 1
          } else if (ele.id === 'coverAllTerminalFlag') {
            ele.initialValue = 1
          } else if (ele.id === 'shopIdList') {
            ele.isHide = true
            ele.isRequired = false
          } else if (ele.id === 'terminalTypeList') {
            ele.isHide = true
            ele.isRequired = false
          }
          if (ele.type === 'uploadImg') {
            ele.fileList = []
          }
        })
      }
    })
  }

  componentWillUpdate(nextProps, nextState) {
    //添加成功后回调
    Util.fetchCallback({
      status: nextProps.NewTitle.addNewTitleStatus,
      code: nextProps.NewTitle.addNewTitleCode,
      message: nextProps.NewTitle.addNewTitleMessage,
      updateStatus: nextProps.updateAddNewTitleStatus,
      isShowDialog: true,
      successText: '操作成功',
      successCallback: () => {
        //获取列表数据成功之后，回退到上一级
        this.props.history.goBack()
      }
    })

    //更新成功后回调
    Util.fetchCallback({
      status: nextProps.NewTitle.updateTitleStatus,
      code: nextProps.NewTitle.updateTitleCode,
      message: nextProps.NewTitle.updateTitleMessage,
      updateStatus: nextProps.updateUpdateTitleStatus,
      isShowDialog: true,
      successText: '操作成功',
      successCallback: () => {
        //获取列表数据成功之后，回退到上一级
        this.props.history.goBack()
      }
    })

    //获取详情初始值，并push到对应的newData中
    Util.fetchCallback({
      status: nextProps.NewTitle.getDetailTitleStatus,
      code: nextProps.NewTitle.getDetailTitleCode,
      message: nextProps.NewTitle.getDetailTitleMessage,
      updateStatus: nextProps.updateGetTitleDetailStatus,
      nextProps,
      successCallback: () => {
        let data = nextProps.NewTitle.getDetailTitleData
        Util.setInitialValue(newData, data)
        const dateFormat = 'YYYY-MM-DD'
        data.timeRange = [
          moment(data.startTimeStr, dateFormat),
          moment(data.endTimeStr, dateFormat)
        ]
        newData &&
          newData.forEach(item => {
            if (item.id === '`picture`') {
              if (data.mainPicUrl) {
                item.fileList = [
                  {
                    uid: -1,
                    url: data.mainPicUrl
                  }
                ]
              } else {
                item.fileList = []
              }
            }
            if (item.id === 'shopIdList') {
              if (data.coverAllShopFlag === 0) {
                item.isHide = false
                item.isRequired = true
              } else {
                item.isHide = true
                item.isRequired = false
              }
            }
            if (item.id === 'terminalTypeList') {
              if (data.coverAllTerminalFlag === 0) {
                item.isHide = false
                item.isRequired = true
              } else {
                item.isHide = true
                item.isRequired = false
              }
            }
          })
      }
    })
  }

  render() {
    let endToggleIndex = 0
    let shopToggleIndex = 0
    newData.forEach((ele, i) => {
      if (ele.id === 'terminalTypeList') {
        endToggleIndex = i
      } else if (ele.id === 'shopIdList') {
        shopToggleIndex = i
      }
    })
    newData.forEach(ele => {
      if (ele.id === 'coverAllTerminalFlag') {
        ele.onChange = val => {
          if (val.target.value === 0) {
            newData[endToggleIndex].isHide = false
            newData[endToggleIndex].isRequired = true
          } else {
            newData[endToggleIndex].isHide = true
            newData[endToggleIndex].isRequired = false
          }
        }
      } else if (ele.id === 'coverAllShopFlag') {
        ele.onChange = val => {
          if (val.target.value === 0) {
            newData[shopToggleIndex].isHide = false
            newData[shopToggleIndex].isRequired = true
          } else {
            newData[shopToggleIndex].isHide = true
            newData[shopToggleIndex].isRequired = false
          }
        }
      }
    })

    var actionButtons = [
      {
        text: '提交',
        id: 'save',
        clickHandle: values => {
          values.actionId = 'save'
          this._actionJudge(values)
        }
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
            this.state.id ? this.props.NewTitle.getDetailTitleData : null
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
      NewTitle: state.NewTitle,
      TitleList: state.TitleList,
      Fetch: state.Fetch
    }
  },
  dispatch => bindActionCreators({ ...actions }, dispatch)
)(NewTitle)
