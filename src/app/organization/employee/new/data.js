import {company} from '../../../../util/common.js'

export const newData = [
  {
    id: 'employeeName',
    name: '姓名',
    isRequired: 'true'
  },
  {
    id: 'jobNo',
    name: '工号',
    isRequired: 'true'
  },
  {
    id: 'portraitUrl',
    name: '点击上传头像',
    type: 'uploadImg',
    fileList: [],
    uploadImgLimitNumber: 1
  },
  {
    id: 'mobile',
    name: '电话',
    isRequired: true
  },
  {
    id: 'email',
    name: '邮箱'
  },
  {
    id: 'sex',
    name: '性别',
    type: 'radio',
    isRequired: true,
    className: 'block-div',
    data: [
      {
        id: 1,
        name: '男'
      },
      {
        id: 0,
        name: '女'
      }
    ]
  },
  {
    id: 'birthday',
    name: '生日',
    type: 'datepicker'
  },
  {
    id: 'hiredate',
    name: '入职日期',
    type: 'datepicker',
    isRequired: true
  },
  {
    id: 'titleId',
    name: '职称',
    type: 'select',
    placeholder: '请选择',
    isHidePleaseSelect: true,
    isRequired: true
  },
  {
    id: 'employeeType',
    name: '人员类型',
    type: 'select',
    placeholder: '请选择',
    isHidePleaseSelect: true,
    isRequired: true
  },
  {
    id: 'companyId',
    name: '关联公司',
    type: 'select',
    mode: 'multiple',
    showArrow: true,
    data: company,
    placeholder: '请选择',
    isHidePleaseSelect: true,
    isRequired: true,
  }
]
