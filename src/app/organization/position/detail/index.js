import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from './index.action'
import Detail from '../../../components/detail'
import { data } from './data'
import * as Util from '../../../../util/index'
class PositionDetail extends Component {
  componentWillMount() {
    const id = Util.getUrlArg('id')
    this.props.getPositionDetail({ id })
  }
  componentWillUpdate(nextProps) {
    Util.fetchCallback({
      status: nextProps.PositionDetail.getPositionDetailStatus,
      code: nextProps.PositionDetail.getPositionDetailCode,
      message: nextProps.PositionDetail.getPositionDetailMessage,
      updateStatus: nextProps.updateGetPositionDetail,
      nextProps
    })
  }
  render() {
    const detailData =
      this.props.PositionDetail &&
      this.props.PositionDetail.getPositionDetailData
    return (
      <Detail data={data} value={detailData} history={this.props.history} />
    )
  }
}

export default connect(
  state => {
    return {
      PositionDetail: state.PositionDetail
    }
  },
  dispatch => {
    return bindActionCreators({ ...actions }, dispatch)
  }
)(PositionDetail)
