import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from './index.action'
import Detail from '../../../components/detail'
import { data } from './data'
import * as Util from '../../../../util/index'
import moment from 'moment'
class TitleDetail extends Component {
  componentWillMount() {
    const id = Util.getUrlArg('id')
    this.props.getTitleDetail({ id })
  }
  componentWillUpdate(nextProps, nextState) {
    Util.fetchCallback({
      status: nextProps.TitleDetail.getTitleDetailStatus,
      code: nextProps.TitleDetail.getTitleDetailCode,
      message: nextProps.TitleDetail.getTitleDetailMessage,
      updateStatus: nextProps.updateGetTitleDetail,
      nextProps
    })
  }
  render() {
    const detailData =
      this.props.TitleDetail && this.props.TitleDetail.getTitleDetailData
    if (detailData) {
      console.log(detailData)
      detailData.sex = detailData.sex === 0 ? '女' : '男'
      detailData.hiredate = moment(detailData.hiredate).format('YYYY-MM-DD')
      detailData.birthday = moment(detailData.birthday).format('YYYY-MM-DD')
      detailData.isLogin = detailData.isLogin === 1 ? '有' : '无'
      detailData.titleName = Array.isArray(detailData.titleName)
        ? detailData.titleName.join(',')
        : detailData.titleName
      detailData.positionName = Array.isArray(detailData.positionName)
        ? detailData.positionName.join(',')
        : detailData.positionName
    }
    return (
      <Detail data={data} value={detailData} history={this.props.history} />
    )
  }
}

export default connect(
  state => {
    return {
      TitleDetail: state.TitleDetail
    }
  },
  dispatch => {
    return bindActionCreators({ ...actions }, dispatch)
  }
)(TitleDetail)
