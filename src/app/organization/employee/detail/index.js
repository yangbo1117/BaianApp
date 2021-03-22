import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from './index.action'
import Detail from '../../../components/detail'
import { data } from './data'
import * as Util from '../../../../util/index'
import moment from 'moment'
class EmployeeDetail extends Component {
  componentWillMount() {
    const id = Util.getUrlArg('id')
    this.props.getEmployeeDetail({ id })
  }
  componentWillUpdate(nextProps) {
    Util.fetchCallback({
      status: nextProps.EmployeeDetail.getEmployeeDetailStatus,
      code: nextProps.EmployeeDetail.getEmployeeDetailCode,
      message: nextProps.EmployeeDetail.getEmployeeDetailMessage,
      updateStatus: nextProps.updateGetEmployeeDetail,
      nextProps
    })
  }
  render() {
    const detailData =
      this.props.EmployeeDetail &&
      this.props.EmployeeDetail.getEmployeeDetailData
    if (detailData) {
      console.log(detailData)
      detailData.sex = detailData.sex === 0 ? '女' : '男'
      detailData.hiredate = moment(detailData.hiredate).format('YYYY-MM-DD')
      detailData.birthday = moment(detailData.birthday).format('YYYY-MM-DD')
      detailData.isLogin = detailData.isLogin === 1 ? '有' : '无'
      detailData.titleName = Array.isArray(detailData.titleName)
        ? detailData.titleName.join(',')
        : detailData.titleName
      detailData.EmployeeName = Array.isArray(detailData.EmployeeName)
        ? detailData.EmployeeName.join(',')
        : detailData.EmployeeName
        detailData.companyName = Array.isArray(detailData.companyName)
        ? detailData.companyName.join(',')
        : detailData.companyName  
    }
    return (
      <Detail data={data} value={detailData} history={this.props.history} />
    )
  }
}

export default connect(
  state => {
    return {
      EmployeeDetail: state.EmployeeDetail
    }
  },
  dispatch => {
    return bindActionCreators({ ...actions }, dispatch)
  }
)(EmployeeDetail)
