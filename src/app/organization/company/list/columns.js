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
    title: '公司名称',
    dataIndex: 'companyName'
  },
  {
    title: '公司代码',
    dataIndex: 'companyCode'
  },
  {
    title: '纳税人识别号',
    dataIndex: 'taxCode'
  },
  {
    title: '联系电话',
    dataIndex: 'telephone'
  },
  {
    title: '开户银行',
    dataIndex: 'depositBank'
  },
  {
    title: '银行账号',
    dataIndex: 'bankAccount',
    
  },
  {
    title: '法人代表',
    dataIndex: 'legalRepresentative',
    
  },
  {
    title: '经营状态',
    dataIndex: 'state',
    render(h) {
      return h === 1? '营业' : '歇业'
    },
  },
  {
    title: '省',
    dataIndex: 'provinceName'
  },
  {
    title: '市',
    dataIndex: 'cityName'
  },
  ,
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
