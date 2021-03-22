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
    title: '部门名称',
    dataIndex: 'deptName'
  },
  {
    title: '部门编号',
    dataIndex: 'deptCode'
  },
  {
    title: '联系人姓名',
    dataIndex: 'deptContactName'
  },
  {
    title: '联系人电话',
    dataIndex: 'deptContactMobile'
  },
  {
    title: '联系人邮箱',
    dataIndex: 'deptContactEmail'
  },
  {
    title: '直属部门',
    dataIndex: 'parentDeptName'
  },
  {
    title: '门店编码',
    dataIndex: 'shopId'
  },
  {
    title: '门店名称',
    dataIndex: 'shopName'
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
