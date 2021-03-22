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
import Toast from '../../../../components/prompt/toast'
import './index.less'
const WrappedAdvancedNew = Form.create()(New)
let companys

class NewEmployee extends Component {
  constructor(props) {
    super(props)
    this._actionJudge = this._actionJudge.bind(this)
    this._getCommonSelect = this._getCommonSelect.bind(this)
    this._QiniuCallBack = this._QiniuCallBack.bind(this)
    this._removeImgFun = this._removeImgFun.bind(this)

    this.state = {
      id: 0,
      isSaveRedirect: false,
      companyVal: ''
    }
  }

  //获取下拉数据
  _getCommonSelect() {
    // this.props.getAllDepartment()
    // this.props.getAllPosition()
    this.props.getAllTitle()
    this.props.getEmployeeType()
  }

  _actionJudge(params) {
    params.actionId === 'save'
      ? (params.submitType = 1)
      : (params.submitType = 2)
    // eslint-disable-next-line
    params.id ? null : delete params.id;
    delete params.actionId

    //添加职称参数
    params.titleId &&
      newData.forEach(element => {
        if (element.id === 'titleId') {
          const title = element.data.filter(elem => {
            return elem.id === params.titleId
          })
          params.titleName = title[0].name
        }
      })

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
    console.log('param ', param)

    if (params.id) {
      this.props.updateEmployee(param)
    } else {
      this.props.addNewEmployee(param)
    }
  }

  _QiniuCallBack(res) {
    Util.QiniuCallBack(res, newData)
    //数据操作后setsate保证视图更新
    this.setState({})
  }

  _removeImgFun(flag, id) {
    Util.RemoveImgFun(flag, id, newData)
    //数据操作后setsate保证视图更新
    this.setState({})
  }

  componentDidMount() {
    this._getCommonSelect()
    this.props.getCompanyList()
    let id = Util.getUrlArg('id')
    this.setState({ id: id }, () => {
      if (this.state.id) {
        this.props.getDetailEmployee({ id })
      } else {
        Util.resetInitialValue(newData)
        newData.forEach((ele, index) => {
          if (ele.id === 'sex') {
            ele.initialValue = 1
          } else if (ele.id === 'isLogin') {
            ele.initialValue = 1
          }
          if (ele.type === 'uploadImg') {
            ele.fileList = []
          }
        })
      }
    })
  }

  componentWillUpdate(nextProps, nextState) {
    //添加成功回调
    Util.fetchCallback({
      status: nextProps.NewEmployee.addNewEmployeeStatus,
      code: nextProps.NewEmployee.addNewEmployeeCode,
      message: nextProps.NewEmployee.addNewEmployeeMessage,
      updateStatus: nextProps.updateAddNewEmployeeStatus,
      isShowDialog: true,
      successText: '操作成功',
      successCallback: () => {
        let data = nextProps.NewEmployee.addNewEmployeeData
        if (this.state.isSaveRedirect) {
          this.props.history.push(
            `/employee/employeePosition/new?employeeId=${
              data.id
            }&employeeName=${data.employeeName}&jobNo=${data.jobNo}`
          )
        } else {
          this.props.history.goBack()
        }
      }
    })

    //获取详情初始值，并push到对应的newData中
    Util.fetchCallback({
      status: nextProps.NewEmployee.getDetailEmployeeStatus,
      code: nextProps.NewEmployee.getDetailEmployeeCode,
      message: nextProps.NewEmployee.getDetailEmployeeMessage,
      updateStatus: nextProps.updateGetDetailEmployeeStatus,
      nextProps,
      successCallback: () => {
        let data = nextProps.NewEmployee.getDetailEmployeeData
        Util.setInitialValue(newData, data)
        const dateFormat = 'YYYY-MM-DD'
        data.timeRange = [
          moment(data.startTimeStr, dateFormat),
          moment(data.endTimeStr, dateFormat)
        ]
        newData &&
          newData.forEach(item => {
            if (item.id === 'portraitUrl') {
              if (data.portraitUrl) {
                item.fileList = [
                  {
                    uid: -1,
                    url: data.portraitUrl
                  }
                ]
              } else {
                item.fileList = []
              }
            }
          })
        console.log(newData)
      }
    })
    //更新成功回调
    Util.fetchCallback({
      status: nextProps.NewEmployee.updateEmployeeStatus,
      code: nextProps.NewEmployee.updateEmployeeCode,
      message: nextProps.NewEmployee.updateEmployeeMessage,
      updateStatus: nextProps.updateUpdateEmployeeStatus,
      successText: '操作成功',
      isShowToastSuccess: true,
      successCallback: () => {
        //获取列表数据成功之后，回退到上一级
        this.props.history.goBack()
      }
    })
    //获取所有部门
    Util.fetchCallback({
      status: nextProps.NewEmployee.getAllDepartmentStatus,
      code: nextProps.NewEmployee.getAllDepartmentCode,
      message: nextProps.NewEmployee.getAllDepartmentMessage,
      updateStatus: nextProps.updateGetAllDepartmentStatus,
      successCallback: () => {
        let depts = nextProps.NewEmployee.getAllDepartmentData
        let data = []
        depts &&
          depts.forEach(dept => {
            data.push({
              id: dept.id,
              name: dept.deptName
            })
          })
        newData &&
          newData.forEach(item => {
            if (item.id === 'deptId') {
              item['data'] = data
            }
          })
      }
    })
    //获取所有职位
    Util.fetchCallback({
      status: nextProps.NewEmployee.getAllPositionStatus,
      code: nextProps.NewEmployee.getAllPositionCode,
      message: nextProps.NewEmployee.getAllPositionMessage,
      updateStatus: nextProps.updateGetAllPositionStatus,
      successCallback: () => {
        let poss = nextProps.NewEmployee.getAllPositionData
        console.log('poss: ', poss)
        let data = []
        poss &&
          poss.forEach(dept => {
            data.push({
              id: dept.id,
              name: dept.positionName
            })
          })
        newData &&
          newData.forEach(item => {
            if (item.id === 'positionId') {
              item['data'] = data
            }
          })
      }
    })

    //获取所有职称
    Util.fetchCallback({
      status: nextProps.NewEmployee.getAllTitleStatus,
      code: nextProps.NewEmployee.getAllTitleCode,
      message: nextProps.NewEmployee.getAllTitleMessage,
      updateStatus: nextProps.updateGetAllTitleStatus,
      successCallback: () => {
        let poss = nextProps.NewEmployee.getAllTitleData
        let data = []
        poss &&
          poss.forEach(dept => {
            data.push({
              id: dept.id,
              name: dept.titleName
            })
          })
        newData &&
          newData.forEach(item => {
            if (item.id === 'titleId') {
              item['data'] = data
            }
          })
      }
    })

    //获取下拉表，并push到对应的newData中
    Util.fetchCallback({
      status: nextProps.EmployeeList.employeeTypeStatus,
      code: nextProps.EmployeeList.employeeTypeCode,
      message: nextProps.EmployeeList.employeeTypeMessage,
      updateStatus: nextProps.updateGetEmployeeTypeStatus,
      successCallback: () => {
        let items = nextProps.EmployeeList.employeeTypeData
        newData &&
          newData.forEach(item => {
            if (item.type === 'select') {
              if (item.id === 'employeeType') {
                item['data'] = items
              }
            }
          })
      }
    })
    //获取所有公司
    Util.fetchCallback({
      status: nextProps.NewEmployee.companyListStatus,
      code: nextProps.NewEmployee.companyListCode,
      message: nextProps.NewEmployee.companyListMessage,
      params: nextState.searchParams,
      updateStatus: nextProps.updateCompanyListStatus,
      successCallback: () => {
        companys = nextProps.NewEmployee.companyListData
        let companyData = []
        companys.forEach(company=>{
          companyData.push({
            id: company.id,
            name: company.companyCode + ' ' + company.companyName
          })
        })
        newData.forEach(item=>{
          if(item.id==='companyId'){
            item['data'] = companyData
            item.onSearch = (value) => {
              this.setState({
                companyVal: value
              })
            }
            item.onFocus = () => {
              let input = document.querySelector('input#companyId')
              input.readOnly = true
            }
            // item.onBlur = (e) => {
            //   if(this.state.companyVal){
            //     Toast.show('这是一个多选框,请勿输入任何内容!')
            //     this.setState({
            //      companyVal: ''
            //    })
            //   }
            // }
          }
        })
      }
    })
  }

  render() {
    var actionButtons = [
      {
        text: '提交并关联职位',
        id: 'save_redirect',
        clickHandle: values => {
          values.actionId = 'save'
          this.setState({ isSaveRedirect: true })
          this._actionJudge(values)
        },
        className: 'ant-btn ant-btn-primary'
      },
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
      <div className='new-employee'>
        <WrappedAdvancedNew
          newData={newData}
          //编辑页面传递detailData,创建页面不传递detailData
          detailData={
            this.state.id ? this.props.NewEmployee.getDetailEmployeeData : null
          }
          history={this.props.history}
          getQiniuToken={Util.getQiniuToken}
          QiniuCallBack={this._QiniuCallBack}
          removeImgFun={this._removeImgFun}
          actionButtons={actionButtons}
        />
        <Loader spinning={this.props.Fetch.spinning || false} />
      </div>
    )
  }
}

export default connect(
  state => {
    return {
      NewEmployee: state.NewEmployee,
      EmployeeList: state.EmployeeList,
      Fetch: state.Fetch
    }
  },
  dispatch => bindActionCreators({ ...actions }, dispatch)
)(NewEmployee)
