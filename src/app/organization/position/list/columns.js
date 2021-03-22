import React from 'react'
import { Divider } from 'antd'
import moment from 'moment'

export const columns = [
  {
    title: '操作',
    key: 'action',
    fixed: true,
    width: 120,
    render: (text, record) => {
      let eidt = './new?id=' + text.id
      let detail = './detail?id=' + text.id
      return (
        <span>
          <a href={eidt}>编辑</a>
          <Divider type="vertical" />
          <a href={detail}>详情</a>
        </span>
      )
    }
  },
  {
    title: '职位名称',
    dataIndex: 'positionName'
  },
  {
    title: '职位编号',
    dataIndex: 'positionCode'
  },
  {
    title: '上级职位',
    dataIndex: 'parentPositonName'
  },
  {
    title: '所属部门',
    dataIndex: 'deptName'
  },
  {
    title: '职位状态',
    dataIndex: 'positionStateName'
  },
  // {
  //   title: '职务',
  //   dataIndex: 'jobName'
  // },
  {
    title: '职位描述',
    dataIndex: 'positionDesc'
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
