export const newData = [
  {
    id: 'deptId',
    name: '所属部门',
    type: 'TreeSelect',
    isRequired: true,
    idName: 'id',
    textName: 'deptName',
    isRetrunText: true
  },
  {
    id: 'positionName',
    name: '职位名称',
    isRequired: 'true'
  },

  {
    id: 'positionCode',
    name: '职位编号',
    isRequired: 'true'
  },

  {
    id: 'parentId',
    name: '上级职位',
    type: 'select'
  },
  // {
  //   id: 'jobId',
  //   name: '职务',
  //   type: 'select',
  //   isRequired: 'true',
  //   isHidePleaseSelect: true,
  //   placeholder: '请选择',
  //   textName: 'name',
  //   parameterName: 'jobName',
  //   isRetrunText: true
  // },
  {
    id: 'positionState',
    name: '职位状态',
    type: 'select',
    isRequired: true,
    isHidePleaseSelect: true
  },
  {
    id: 'positionDesc',
    name: '职位描述',
    type: 'textarea',
    mode: 'multiple',
    isHide: true,
    isHidePleaseSelect: 'true',
    className: 'block-div'
  }
]
