import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from './index.action'
import Detail from '../../../components/detail'
import { data } from './data'
import * as Util from '../../../../util/index'
import moment from 'moment'
class EmployeePositionDetail extends Component {
  componentWillMount() {
    const id = Util.getUrlArg('id')
    this.props.getEmployeePositionDetail({ id })
  }
  componentWillUpdate(nextProps) {
    Util.fetchCallback({
      status: nextProps.EmployeePositionDetail.getEmployeePositionDetailStatus,
      code: nextProps.EmployeePositionDetail.getEmployeePositionDetailCode,
      message: nextProps.EmployeePositionDetail.getEmployeePositionDetailMessage,
      updateStatus: nextProps.updateGetEmployeePositionDetail,
      nextProps
    })
  }
  render() {
    const detailData =
      this.props.EmployeePositionDetail &&
      this.props.EmployeePositionDetail.getEmployeePositionDetailData
    if (detailData) {
      console.log(detailData)
      detailData.sex = detailData.sex === 0 ? '女' : '男'
      detailData.hiredate = moment(detailData.hiredate).format('YYYY-MM-DD')
      detailData.birthday = moment(detailData.birthday).format('YYYY-MM-DD')
      detailData.isLogin = detailData.isLogin === 1 ? '有' : '无'
      detailData.titleName = Array.isArray(detailData.titleName)
        ? detailData.titleName.join(',')
        : detailData.titleName
      detailData.EmployeePositionName = Array.isArray(
        detailData.EmployeePositionName
      )
        ? detailData.EmployeePositionName.join(',')
        : detailData.EmployeePositionName
    }
    return (
      <Detail data={data} value={detailData} history={this.props.history} />
    )
  }
}

export default connect(
  state => {
    return {
      EmployeePositionDetail: state.EmployeePositionDetail
    }
  },
  dispatch => {
    return bindActionCreators({ ...actions }, dispatch)
  }
)(EmployeePositionDetail)
