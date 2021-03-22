import React, { Component } from 'react'
import { Form } from 'antd'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from './index.action'
import New from '../../../components/new/index'
import * as Util from '../../../../util/'
import Loader from '../../../../components/loader/'
import { newData } from './data'
import './index.less'

const WrappedAdvancedNew = Form.create()(New)

let shops
let companys
class NewDepartment extends Component {
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

    //添加关联公司附加参数
   
    let companyName = [],companyCode = [],taxCode = []
    params.companyId.forEach(item=>{
      console.log('item',item);
      let company = companys.filter(company=>{
        return company.id === item
      })[0]
      companyName.push(company.companyName)
      companyCode.push(company.companyCode)
      taxCode.push(company.taxCode)
    })
    params.companyName = companyName
    params.companyCode = companyCode
    params.taxCode = taxCode
    const param = {
      data: {
        ...params
      }
    }

    if (params.id) {
      this.props.updateDepartment(param)
    } else {
      this.props.addNewDepartment(param)
    }
  }

  componentDidMount() {
    this.props.getProvince(); //获取省
    this.props.getCompanyList()
    // this.props.getShopList()
    this.props.getAllDepartment({rootNodeId: 1})
    let id = Util.getUrlArg('id')
    this.setState({ id: id }, () => {
      if (this.state.id) {
        this.props.getDetailDepartment({ id })
      } else {
        Util.resetInitialValue(newData)
      }
    })
  }

  componentWillUpdate(nextProps, nextState) {
    //添加部门回调
    Util.fetchCallback({
      status: nextProps.NewDepartment.addNewDepartmentStatus,
      code: nextProps.NewDepartment.addNewDepartmentCode,
      message: nextProps.NewDepartment.addNewDepartmentMessage,
      updateStatus: nextProps.updateAddNewDepartmentStatus,
      isShowDialog: true,
      successText: '操作成功',
      successCallback: () => {
        //获取列表数据成功之后，回退到上一级
        this.props.history.goBack()
      }
    })

    //获取所有部门
    Util.fetchCallback({
      status: nextProps.NewDepartment.getAllDepartmentStatus,
      code: nextProps.NewDepartment.getAllDepartmentCode,
      message: nextProps.NewDepartment.getAllDepartmentMessage,
      updateStatus: nextProps.updateGetAllDepartmentStatus,
      successCallback: () => {
        let data = nextProps.NewDepartment.getAllDepartmentData
        newData && newData.forEach(item => {
            if (item.id === 'parentDeptId') {
              let arr = [];
              arr[0] = data;
              if(arr && arr.length > 0) {
                item['data'] = arr;
              }
            }
          })
      }
    })

    //获取详情初始值，并push到对应的newData中
    Util.fetchCallback({
      status: nextProps.NewDepartment.getDetailDepartmentStatus,
      code: nextProps.NewDepartment.getDetailDepartmentCode,
      message: nextProps.NewDepartment.getDetailDepartmentMessage,
      updateStatus: nextProps.updateGetDetailDepartmentStatus,
      nextProps,
      successCallback: () => {
        let data = nextProps.NewDepartment.getDetailDepartmentData
        Util.setInitialValue(newData, data)
      }
    })

    //更新部门回调
    Util.fetchCallback({
      status: nextProps.NewDepartment.updateDepartmentStatus,
      code: nextProps.NewDepartment.updateDepartmentCode,
      message: nextProps.NewDepartment.updateDepartmentMessage,
      updateStatus: nextProps.updateUpdateDepartmentStatus,
      isShowDialog: true,
      successText: '操作成功',
      successCallback: () => {
        //获取列表数据成功之后，回退到上一级
        this.props.history.goBack()
      }
    })

    //获取所有公司
    Util.fetchCallback({
      status: nextProps.NewDepartment.companyListStatus,
      code: nextProps.NewDepartment.companyListCode,
      message: nextProps.NewDepartment.companyListMessage,
      params: nextState.searchParams,
      updateStatus: nextProps.updateCompanyListStatus,
      successCallback: () => {
        companys = nextProps.NewDepartment.companyListData
        let companyData = []
        companys.forEach(company=>{
          companyData.push({
            id: company.id,
            name: company.companyCode + ' ' +company.companyName
          })
        })
        newData.forEach(item=>{
          if(item.id==='companyId'){
            item['data'] = companyData
          }
        })
      }
    })
    //  //获取所有门店
    //  Util.fetchCallback({
    //   status: nextProps.NewDepartment.shopListStatus,
    //   code: nextProps.NewDepartment.shopListCode,
    //   message: nextProps.NewDepartment.shopListMessage,
    //   params: nextState.searchParams,
    //   updateStatus: nextProps.updateShopListStatus,
    //   successCallback: () => {
    //     shops = nextProps.NewDepartment.shopListData
    //     let shopData = []
    //     shops.forEach(shop=>{
    //       shopData.push({
    //         id: shop.id,
    //         name: shop.name
    //       })
    //     })
    //     newData.forEach(item=>{
    //       if(item.id==='shopId'){
    //         item['data'] = shopData
    //       }
    //     })
    //   }
    // })
    //获取省类型下拉表
    Util.fetchCallback({
      status: nextProps.NewDepartment.getProvinceStatus,
      code: nextProps.NewDepartment.getProvinceCode,
      message: nextProps.NewDepartment.getProvinceMessage,
      updateStatus: nextProps.updateGetProvinceStatus,
      successCallback: () => {
        let data = nextProps.NewDepartment.getProvinceData;
        newData && newData.map((item, index) => {
          if(item.type === 'cascader') {
            item.linkage && item.linkage.map((i) => {
              let enumName = i['enumName'];
              if(data[enumName]) {
                i['data'] = data[enumName]
              }
            })
          }
        })
      }
    });

    //获取市类型下拉表
    Util.fetchCallback({
      status: nextProps.NewDepartment.getCityStatus,
      code: nextProps.NewDepartment.getCityCode,
      message: nextProps.NewDepartment.getCityMessage,
      updateStatus: nextProps.updateGetCityStatus,
      successCallback: () => {
        let data = nextProps.NewDepartment.getCityData;
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

    //获取门店类型下拉表
    Util.fetchCallback({
      status: nextProps.NewDepartment.getDistrictStatus,
      code: nextProps.NewDepartment.getDistrictCode,
      message: nextProps.NewDepartment.getDistrictMessage,
      updateStatus: nextProps.updateGetDistrictStatus,
      successCallback: () => {
        let data = nextProps.NewDepartment.getDistrictData;
        newData && newData.map((item, index) => {
          if(item.type === 'cascader') {
            item.linkage && item.linkage.map((i) => {
              if(data && i['id'] === 'shopId') {
                shops = data.map(shop=>{
                  return {
                    id: shop.id,
                    shopCode: shop.shopCode,
                    name: shop.shopName
                  }
                })
                i['data'] = shops

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
        },
        className: 'ant-btn ant-btn-primary'
      },
      {
        text: '取消',
        id: 'goback',
        notCheck: true
      }
    ]
    return (
      <div className='new-dept'>
        <WrappedAdvancedNew
          newData={newData}
          //编辑页面传递detailData,创建页面不传递detailData
          detailData={
            this.state.id
              ? this.props.NewDepartment.getDetailDepartmentData
              : null
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
      NewDepartment: state.NewDepartment,
      DepartmentList: state.DepartmentList,
      Fetch: state.Fetch
    }
  },
  dispatch => bindActionCreators({ ...actions }, dispatch)
)(NewDepartment)
