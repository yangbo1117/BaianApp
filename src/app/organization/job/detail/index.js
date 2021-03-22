import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from './index.action'
import Detail from '../../../components/detail'
import { data } from './data'
import * as Util from '../../../../util/index'
import moment from 'moment'
class JobDetail extends Component {
  componentWillMount() {
    const id = Util.getUrlArg('id')
    this.props.getJobDetail({ id })
  }
  componentWillUpdate(nextProps, nextState) {
    Util.fetchCallback({
      status: nextProps.JobDetail.getJobDetailStatus,
      code: nextProps.JobDetail.getJobDetailCode,
      message: nextProps.JobDetail.getJobDetailMessage,
      updateStatus: nextProps.updateGetJobDetail,
      nextProps
    })
  }
  render() {
    const detailData =
      this.props.JobDetail && this.props.JobDetail.getJobDetailData
    if (detailData) {
      detailData.hiredate = moment(detailData.hiredate).format('YYYY-MM-DD')
      detailData.birthday = moment(detailData.birthday).format('YYYY-MM-DD')
      detailData.isLogin = detailData.isLogin === 1 ? '有' : '无'
    }
    return (
      <Detail data={data} value={detailData} history={this.props.history} />
    )
  }
}

export default connect(
  state => {
    return {
      JobDetail: state.JobDetail
    }
  },
  dispatch => {
    return bindActionCreators({ ...actions }, dispatch)
  }
)(JobDetail)
