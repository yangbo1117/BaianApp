export const newData = [
  {
    type: 'divider',
    text: '职员基本信息'
  },
  {
    id: 'employeeName',
    name: '职员姓名',
    isRequired: 'true',
    disabled: true
  },
  {
    id: 'jobNo',
    name: '职员工号',
    isRequired: 'true',
    disabled: true
  },
  {
    type: 'divider',
    text: '待关联职位'
  },
  {
    type: 'cascader',
    linkage: [
      {
        id: 'deptId',
        name: '所属部门',
        type: 'TreeSelect',
        actionName: 'GET_TITLE_BY_POSITION',
        url: '/position/queryByDeptId',
        relativeFeilds: ['positionId'],
        fetchFeilds: ['deptId'],
        isRequired: true,
        idName: 'id',
        textName: 'deptName',
        isRetrunText: true
      },
      {
        id: 'positionId',
        name: '职位',
        type: 'select',
        isRequired: 'true',
        parameterName: 'positionName',
        textName: 'name',
        isRetrunText: true
      }
    ]
  },
  {
    id: 'positionState',
    name: '职位状态',
    type: 'select',
    isRequired: 'true',
    isHidePleaseSelect: true,
    placeholder: '请选择',
    textName: 'name',
    parameterName: 'positionStateName',
    isRetrunText: true
  }
]
