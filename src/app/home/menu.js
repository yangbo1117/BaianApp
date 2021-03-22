export const menus = [
  {
    name: '职员管理',
    url: 'employee',
    icon: 'appstore',
    children: [
      {
        name: '职员',
        icon: 'appstore',
        url: '/employee/employee/list'
      },
      {
        name: '职员-职位',
        icon: 'appstore',
        url: '/employee/employeePosition/list'
      }
    ]
  },
  {
    name: '部门管理',
    url: 'department',
    icon: 'appstore',
    children: [
      {
        name: '部门',
        icon: 'appstore',
        url: '/department/department/list'
      },
      {
        name: '职位',
        icon: 'appstore',
        url: '/department/position/list'
      }
    ]
  },
  {
    name: '配置',
    url: 'configuration',
    icon: 'appstore',
    children: [
      // {
      //   name: '职务',
      //   icon: 'appstore',
      //   url: '/configuration/job/list'
      // },
      {
        name: '职称',
        icon: 'appstore',
        url: '/configuration/title/list'
      },
      {
        name: '公司',
        icon: 'appstore',
        url: '/configuration/company/list'
      }
    ]
  }
]
