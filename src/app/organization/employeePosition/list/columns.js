import React from 'react'
import moment from 'moment'

export const columns = ({actionRender}) => [
  {
    title: '操作',
    key: 'action',
    fixed: true,
    width: 120,
    render: (text, record) => {
      return actionRender(text, record);
    }
  },
  {
    title: '职员姓名',
    dataIndex: 'employeeName'
  },
  {
    title: '职员工号',
    dataIndex: 'jobNo'
  },
  {
    title: '职位名称',
    dataIndex: 'positionName'
  },
  {
    title: '所属部门',
    dataIndex: 'deptName'
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
