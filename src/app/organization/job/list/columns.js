import React from 'react'
import { Divider } from 'antd'
import moment from 'moment'

export const columns = [
  {
    title: '操作',
    key: 'action',
    width: '100px',
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
    title: '职务名称',
    dataIndex: 'jobName'
  },
  {
    title: '职务编号',
    dataIndex: 'jobCode'
  },
  {
    title: '职务描述',
    dataIndex: 'jobDesc'
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
