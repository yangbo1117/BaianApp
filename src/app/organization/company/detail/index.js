import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "./index.action";
import Detail from "../../../components/detail";
import { data } from "./data";
import * as Util from "../../../../util/index";
import moment from "moment";

class CompanyDetail extends Component {
  componentWillMount() {
    const id = Util.getUrlArg("id");
    this.props.getCompanyDetail({ id });
  }

  componentWillUpdate(nextProps, nextState) {
    Util.fetchCallback({
      status: nextProps.CompanyDetail.getCompanyDetailStatus,
      code: nextProps.CompanyDetail.getCompanyDetailCode,
      message: nextProps.CompanyDetail.getCompanyDetailMessage,
      updateStatus: nextProps.updateGetCompanyDetail,
      successCallback: () => {
        const detailData = nextProps.CompanyDetail.getCompanyDetailData;
        if (detailData) {
          detailData.state = detailData.state === 1 ? "营业" : "歇业";
        }
      }
    });
  }

  render() {

    return (
      <Detail data={data} value={this.props.CompanyDetail.getCompanyDetailData} history={this.props.history}/>
    );
  }
}

export default connect(
  state => {
    return {
      CompanyDetail: state.CompanyDetail
    };
  },
  dispatch => {
    return bindActionCreators({ ...actions }, dispatch);
  }
)(CompanyDetail);
