import React from 'react'
import moment from 'moment'

export const columns = ({ actionRender }) => [
  {
    title: '操作',
    key: 'action',
    fixed: true,
    width: 250,
    render: (text, record) => {
      return actionRender(text, record)
    }
  },
  {
    title: '姓名',
    dataIndex: 'employeeName'
  },
  {
    title: '工号',
    dataIndex: 'jobNo'
  },
  {
    title: '手机号',
    dataIndex: 'mobile'
  },
  {
    title: '性别',
    dataIndex: 'sex',
    render: text => {
      return text === 1 ? '男' : '女'
    }
  },
  {
    title: '是否在职',
    dataIndex: 'employeeStatus',
    render: text => {
      return text === 1 ? '是' : '否'
    }
  },
  {
    title: '人员类型',
    dataIndex: 'employeeTypeStr'
  },
  {
    title: '入职日期',
    dataIndex: 'hiredate',
    render: text => {
      return moment(text).format('YYYY-MM-DD HH:mm:ss')
    }
  },
  {
    title: '生日',
    dataIndex: 'birthday',
    render: text => {
      return moment(text).format('YYYY-MM-DD HH:mm:ss')
    }
  },
  {
    title: '是否有登录账号',
    dataIndex: 'isLogin',
    render: text => {
      return text === 1 ? '有' : '无'
    }
  },
  {
    title: '职称',
    dataIndex: 'titleName'
  },
  {
    title: '邮箱',
    dataIndex: 'email'
  },
  {
    title: '创建人',
    dataIndex: 'creatorName'
  },
  {
    title: '更新人',
    dataIndex: 'modifierName'
  },
  {
    title: '创建日期',
    dataIndex: 'createTime',
    render: text => {
      return moment(text).format('YYYY-MM-DD HH:mm:ss')
    }
  },
  {
    title: '更新日期',
    dataIndex: 'modifyTime',
    render: text => {
      return moment(text).format('YYYY-MM-DD HH:mm:ss')
    }
  }
]
