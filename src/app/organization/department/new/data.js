import {company} from '../../../../util/common.js'

export const newData = [
  {
    id: 'deptName',
    name: '部门名称',
    isRequired: 'true'
  },

  {
    id: 'deptCode',
    name: '部门编号',
    isRequired: 'true'
  },
  {
    id: 'deptContactName',
    name: '联系人姓名'
  },
  {
    id: 'deptContactMobile',
    name: '联系人手机号'
  },

  {
    id: 'deptContactEmail',
    name: '联系人邮箱'
  },
  {
    id: 'parentDeptId',
    name: '直属部门',
    type: 'TreeSelect',
    isRequired: true,
    idName: 'id',
    textName: 'deptName',
    isRetrunText: true,
    parameterName: 'parentDeptName'
  },

  {
    type: 'cascader',
    linkage: [
      {
        id: 'provinceId',
        name: '省',
        type: 'select',
        enumName: 'provinceList',
        actionName: 'GET_CITY',
        url: '/cities',
        isAddress: 'true', //决定域名来源
        relativeFeilds: ['cityId', 'districtId'],
        fetchFeilds: ['provinceId']
      },
      {
        id: 'cityId',
        name: '市',
        type: 'select',
        enumName: 'cityList',
        actionName: 'GET_DISTRICT',
        url: '/shop/query',
        isShop: 'true', //决定域名来源
        relativeFeilds: ['shopId'],
        fetchFeilds: ['cityId','provinceId']
      },
      {
        id: 'shopId',
        name: '门店',
        type: 'select',
      }
    ]
  },
  {
    id: 'companyId',
    name: '关联公司',
    type: 'select',
    mode: 'multiple',
    placeholder: '请选择',
    isHidePleaseSelect: true,
    isRequired: true
  },
]
