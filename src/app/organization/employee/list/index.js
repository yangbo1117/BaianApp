import React, { Component } from "react";
import sha1 from "js-sha1";
import { filterData } from "./filterData";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { columns } from "./columns";
import CommonList from "../../../components/list/index";
import * as actions from "./index.action";
import * as Util from "../../../../util/";
import { Divider, Input, Modal } from "antd";
import UserModal from "./accountModal";
import "./index.less";

class Employee extends Component {
  constructor(props) {
    super(props);

    this._getEmployeeList = this._getEmployeeList.bind(this);
    this._getEmployeeSelect = this._getEmployeeSelect.bind(this);
    this._actionRender = this._actionRender.bind(this);
    this._onChange = this._onChange.bind(this);

    this.state = {
      searchParams: {},
      visibleUserModal: false,
      employeeId: "",
      userName: "",
      password: "1234@abc",
      type: 'create',//弹框类别 create: 创建账号 update: 修改密码
    };
  }

  _getEmployeeList(params) {
    this.setState({ searchParams: params });
    this.props.getEmployeeList(params);
  }

  _getEmployeeSelect() {
    this.props.getEmployeeType();
    this.props.getCompanyList();
  }

  componentWillUpdate(nextProps, nextState) {
    Util.fetchCallback({
      status: nextProps.EmployeeList.employeeListStatus,
      code: nextProps.EmployeeList.employeeListCode,
      message: nextProps.EmployeeList.employeeListMessage,
      params: nextState.searchParams,
      updateStatus: nextProps.updateEmployeeListStatus,
      nextProps
    });

    //获取下拉表，并push到对应的filterData中
    Util.fetchCallback({
      status: nextProps.EmployeeList.employeeTypeStatus,
      code: nextProps.EmployeeList.employeeTypeCode,
      message: nextProps.EmployeeList.employeeTypeMessage,
      updateStatus: nextProps.updateGetEmployeeTypeStatus,
      successCallback: () => {
        let items = nextProps.EmployeeList.employeeTypeData;
        filterData &&
        filterData.forEach(item => {
          if (item.type === "select") {
            if (item.id === "employeeType") {
              item["data"] = items;
            }
          }
        });
      }
    });

    //获取下拉表，并push到对应的filterData中
    Util.fetchCallback({
      status: nextProps.EmployeeList.companyListStatus,
      code: nextProps.EmployeeList.companyListCode,
      message: nextProps.EmployeeList.companyListMessage,
      updateStatus: nextProps.updateCompanyListStatus,
      successCallback: () => {
        let items = nextProps.EmployeeList.companyListData;
        let data = items.map((item) => {
          return {
            id: item.id,
            name: item.companyName
          };
        });
        console.log("companyData", data);
        filterData &&
        filterData.forEach(item => {
          if (item.type === "select") {
            if (item.id === "companyId") {
              item["data"] = data;
            }
          }
        });
      }
    });
    //创建账号
    Util.fetchCallback({
      status: nextProps.EmployeeList.createAccountStatus,
      code: nextProps.EmployeeList.createAccountCode,
      message: nextProps.EmployeeList.createAccountMessage,
      params: nextState.searchParams,
      updateStatus: nextProps.updateCreateAccountStatus,
      isShowToastSuccess: true,
      successText: "创建账号成功",
      isShowDialog: true,
      successCallback: () => {
        this.props.getEmployeeList(this.state.searchParams);
        this.setState({ visibleUserModal: false });
      }
    });
    //重置密码
    Util.fetchCallback({
      status: nextProps.EmployeeList.updatePasswordStatus,
      code: nextProps.EmployeeList.updatePasswordCode,
      message: nextProps.EmployeeList.updatePasswordMessage,
      params: nextState.searchParams,
      updateStatus: nextProps.updateUpdatePasswordStatus,
      isShowToastSuccess: true,
      successText: "重置密码成功",
      isShowDialog: true,
      successCallback: () => {
        // this.props.getEmployeeList(this.state.searchParams); 这边其实不需要重新加载 因为没有新数据产生
        this.setState({ visibleUserModal: false });
      }
    });
  }

  _onChange(e) {
    console.log(e.target.value);
    this.setState({ password: e.target.value });
  }

  _actionRender(text, recode) {
    let eidt = "./new?id=" + text.id;
    let detail = "./detail?id=" + text.id;
    let newPosition =
      "../employeePosition/new?" +
      "employeeId=" +
      text.id +
      "&employeeName=" +
      text.employeeName +
      "&jobNo=" +
      text.jobNo;
    return (
      <span>
        <a href={eidt}>编辑</a>
        <Divider type="vertical"/>
        <a href={detail}>详情</a>
        <Divider type="vertical"/>
        {!text.isLogin ? (
          <a
            onClick={() => {
              this.setState({
                visibleUserModal: true,
                password: "1234@abc",
                type: 'create'
              });
              let userName = text.employeeType === 1 ? text.jobNo : text.mobile;
              this.setState({ userName: userName, employeeId: text.id });
              return false;
            }}
          >
            创建账号
          </a>
        ) : (
          <a onClick={() => {
            this.setState({
              visibleUserModal: true,
              type: 'update',
              password: '1234@abc'
            });
            let userName = text.employeeType === 1 ? text.jobNo : text.mobile;
            this.setState({ userName: userName, employeeId: text.id });
            return false;
          }}>重置密码</a>
        )}
        <Divider type="vertical"/>

        <a href={newPosition}>关联职位</a>
      </span>
    );
  }

  _createAccout = () => {
    console.log('this.state.type',this.state.type)
    if(this.state.type === 'create'){
      return this.props.createAccount({
        userName: this.state.userName,
        password: sha1(this.state.password),
        id: this.state.employeeId
      });
    }

    this.props.updatePassword({
      userName: this.state.userName,
      newPassword: sha1(this.state.password),
    })
  };
  _onCancle = () => {
    this.setState({
      visibleUserModal: false
    })
  }
  render() {
    let tableDataSource =
      this.props.EmployeeList && this.props.EmployeeList.employeeListData;
    let pagination =
      this.props.EmployeeList && this.props.EmployeeList.employeeListPage;

    return (
      <div className="employee">
        <CommonList
          getCommonList={this._getEmployeeList}
          getCommonSelect={this._getEmployeeSelect}
          filterData={filterData}
          columns={columns({
            actionRender: (text, recode) => this._actionRender(text, recode)
          })}
          tableDataSource={tableDataSource}
          tableLoading={this.props.Fetch.spinning}
          pagination={pagination}
          scroll={
            tableDataSource && tableDataSource.length > 0 ? { x: 3000 } : {}
          }
        />
        <UserModal
          visibleUserModal={this.state.visibleUserModal}
          createAccount={this._createAccout}
          userName={this.state.userName}
          password={this.state.password}
          onCancle={this._onCancle}
          modalTitle={this.state.type === 'create' ? '创建账号' : '修改密码'}
          onChange={this._onChange}
          type={this.state.type}
        />
      </div>
    );
  }
}

export default connect(
  state => {
    return { EmployeeList: state.EmployeeList, Fetch: state.Fetch };
  },
  dispatch => bindActionCreators({ ...actions }, dispatch)
)(Employee);
