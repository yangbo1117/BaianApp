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

class NewCompany extends Component {
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
      return this.props.updateCompany(param)
    } else {
      return this.props.addNewCompany(param)
    }
  }

  componentDidMount() {
    let id = Util.getUrlArg('id')
    this.setState({ id: id }, () => {
      if (this.state.id) {
        this.props.getCompanyDetail({ id })
      } else {
        Util.resetInitialValue(newData)
      }
    })
  }
  componentWillMount() {
    this.props.getProvince(); //获取省
  }
  componentWillUpdate(nextProps, nextState) {
    //添加成功后回调
    Util.fetchCallback({
      status: nextProps.NewCompany.addNewCompanyStatus,
      code: nextProps.NewCompany.addNewCompanyCode,
      message: nextProps.NewCompany.addNewCompanyMessage,
      updateStatus: nextProps.updateAddNewCompanyStatus,
      isShowDialog: true,
      successText: '操作成功',
      successCallback: () => {
        //获取列表数据成功之后，回退到上一级
        this.props.history.goBack()
      }
    })

    //更新成功后回调
    Util.fetchCallback({
      status: nextProps.NewCompany.updateCompanyStatus,
      code: nextProps.NewCompany.updateCompanyCode,
      message: nextProps.NewCompany.updateCompanyMessage,
      updateStatus: nextProps.updateUpdateCompanyStatus,
      isShowDialog: true,
      successText: '操作成功',
      successCallback: () => {
        //获取列表数据成功之后，回退到上一级
        this.props.history.goBack()
      }
    })

    //获取详情初始值，并push到对应的newData中
    Util.fetchCallback({
      status: nextProps.NewCompany.getDetailCompanyStatus,
      code: nextProps.NewCompany.getDetailCompanyCode,
      message: nextProps.NewCompany.getDetailCompanyMessage,
      updateStatus: nextProps.updateGetCompanyDetailStatus,
      nextProps,
      successCallback: () => {
        let data = nextProps.NewCompany.getDetailCompanyData
        Util.setInitialValue(newData, data)
         //详情页获取成功之后，请求市和区
         newData && newData.forEach((item) => {
          if(item.type === 'cascader') {
            item.linkage && item.linkage.map((i) => {
              if(i.url && i.relativeFeilds) {
                //从详情结果获取到relativeFeilds对应的值
                let o = {};
                i.fetchFeilds.map((opt) => {
                  if(data[opt]){// 进行一下判断
                      o[opt] = data[opt];
                      this.props.cascaderHandleChange(o, i);
                  }
                });
              }
            });
          }
        });
      }
    })

    //获取省类型下拉表
    Util.fetchCallback({
      status: nextProps.NewCompany.getProvinceStatus,
      code: nextProps.NewCompany.getProvinceCode,
      message: nextProps.NewCompany.getProvinceMessage,
      updateStatus: nextProps.updateGetProvinceStatus,
      successCallback: () => {
        let data = nextProps.NewCompany.getProvinceData;
        newData && newData.map((item, index) => {
          if (item.type === 'cascader') {
            item.linkage && item.linkage.map((i) => {
              let enumName = i['enumName'];
              if (data[enumName]) {
                i['data'] = data[enumName]
              }
            })
          }
        })
      }
    });

    //获取市类型下拉表
    Util.fetchCallback({
      status: nextProps.NewCompany.getCityStatus,
      code: nextProps.NewCompany.getCityCode,
      message: nextProps.NewCompany.getCityMessage,
      updateStatus: nextProps.updateGetCityStatus,
      successCallback: () => {
        let data = nextProps.NewCompany.getCityData;
        newData && newData.map((item, index) => {
          if (item.type === 'cascader') {
            item.linkage && item.linkage.map((i) => {
              let enumName = i['enumName'];
              if (data[enumName]) {
                i['data'] = data[enumName]
              }
            });
          }
        })
      }
    });

    //获取区类型下拉表
    Util.fetchCallback({
      status: nextProps.NewCompany.getDistrictStatus,
      code: nextProps.NewCompany.getDistrictCode,
      message: nextProps.NewCompany.getDistrictMessage,
      updateStatus: nextProps.updateGetSDistrictStatus,
      successCallback: () => {
        let data = nextProps.NewCompany.getDistrictData;
        newData && newData.map((item, index) => {
          if(item.type === 'cascader') {
            item.linkage && item.linkage.map((i) => {
              let enumName = i['enumName'];
              if(data[enumName]) {
                i['data'] = data[enumName]
              }
            });
          }
        })
      }
    });
  }

  render() {
   
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
            this.state.id ? this.props.NewCompany.getDetailCompanyData : null
          }
          history={this.props.history}
          actionButtons={actionButtons}
          handleChange={this.props.cascaderHandleChange}
        />
        <Loader spinning={this.props.Fetch.spinning || false} />
      </div>
    )
  }
}

export default connect(
  state => {
    return {
      NewCompany: state.NewCompany,
      CompanyList: state.CompanyList,
      Fetch: state.Fetch
    }
  },
  dispatch => bindActionCreators({ ...actions }, dispatch)
)(NewCompany)
