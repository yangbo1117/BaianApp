
export const filterData = [
  {
    id: 'employeeName',
    name: '姓名'
  },
  {
    id: 'jobNo',
    name: '工号'
  },
  {
    id: 'mobile',
    name: '电话'
  },
  {
    id: 'sex',
    name: '性别',
    type: 'select',
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
    type: 'datepicker',
    timeNames: ['birthdayTimeStart', 'birthdayTimeEnd']
  },

  {
    id: 'hiredate',
    name: '入职日期',
    type: 'datepicker',
    timeNames: ['hiredateTimeStart', 'hiredateTimeEnd']
  },
  {
    id: 'onPosition',
    name: '是否在职',
    type: 'select',
    data: [
      {
        id: 1,
        name: '是'
      },
      {
        id: 0,
        name: '否'
      }
    ]
  },
  {
    id: 'titleName',
    name: '职称'
  },
  {
    id: 'employeeType',
    name: '人员类型',
    type: 'select'
  },
  {
    id: 'companyId',
    name: '关联公司',
    type: 'select',
  }
]
