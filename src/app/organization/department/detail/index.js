import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from './index.action'
import Detail from '../../../components/detail'
import { data } from './data'
import * as Util from '../../../../util/index'
class DepartmentDetail extends Component {
  componentWillMount() {
    const id = Util.getUrlArg('id')
    this.props.getDepartmentDetail({ id })
  }
  componentWillUpdate(nextProps) {
    Util.fetchCallback({
      status: nextProps.DepartmentDetail.getDepartmentDetailStatus,
      code: nextProps.DepartmentDetail.getDepartmentDetailCode,
      message: nextProps.DepartmentDetail.getDepartmentDetailMessage,
      updateStatus: nextProps.updateGetDepartmentDetail,
      nextProps
    })
  }
  render() {
    const detailData =
      this.props.DepartmentDetail &&
      this.props.DepartmentDetail.getDepartmentDetailData
    if (detailData) {
      console.log(detailData)
    }
    return (
      <Detail data={data} value={detailData} history={this.props.history} />
    )
  }
}

export default connect(
  state => {
    return {
      DepartmentDetail: state.DepartmentDetail
    }
  },
  dispatch => {
    return bindActionCreators({ ...actions }, dispatch)
  }
)(DepartmentDetail)
