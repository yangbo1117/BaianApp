export const filterData = [
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
        idName: 'id',
        textName: 'deptName'
      },
      {
        id: 'positionId',
        name: '职位',
        type: 'select',
        textName: 'name',
        isShowPleaseSelect: true,
        pleaseSelectName: '全部'
      }
    ]
  },
  {
    id: 'employeeName',
    name: '职员名称'
  },
  {
    id: 'jobNo',
    name: '职员工号'
  }
]
