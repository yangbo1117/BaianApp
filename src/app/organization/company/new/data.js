export const newData = [
  {
    id: 'companyName',
    name: '公司名称',
    isRequired: 'true'
  },
  {
    id: 'companyCode',
    name: '公司代码',
    isRequired: 'true'
  },
  {
    id: 'taxCode',
    name: '纳税人识别号',
    isRequired: 'true'
  },
  {
    id: 'telephone',
    name: '联系电话',
  },
  {
    id: 'depositBank',
    name: '开户银行',
  },
  {
    id: 'bankAccount',
    name: '银行账号'
  },
  {
    id: 'legalRepresentative',
    name: '法人代表',
  },
  {
    id: 'state',
    name: '经营状态',
    type: 'select',
    isHidePleaseSelect: true,
    data: [
      {
        id: 1,
        name: '营业'
      },
      {
        id: 2,
        name: '歇业'
      }
    ]
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
        relativeFeilds: ['cityId'],
        fetchFeilds: ['provinceId']
      },
      {
        id: 'cityId',
        name: '市',
        type: 'select',
        enumName: 'cityList',
        actionName: 'GET_DISTRICT',
        url: '/districts',
        isAddress: 'true', //决定域名来源
        relativeFeilds: ['districtId'],
        fetchFeilds: ['cityId']
      },
      {
        id: 'districtId',//districtId
        name: '区',
        type: 'select',
        enumName: 'districtList'
      }
    ]
  },
  {
    id: 'address',
    name: '详细地址'
  }
  
]
