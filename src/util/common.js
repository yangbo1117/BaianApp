//上架状态
const upperStatusEnum = [{ name: '上架', id: 1 }, { name: '下架', id: 2 }]
//进行状态
const scheduleStatusEnum = [
  { name: '未开始', id: 1 },
  { name: '进行中', id: 2 },
  { name: '已结束', id: 3 }
]
//详情状态
const detailTypeEnum = [
  { name: '自定义', id: 2 },
  { name: 'H5链接', id: 1 },
  { name: '无', id: 3 }
]
//所属门店
const ownShopEnum = [{ name: '全部门店', id: 1 }, { name: '指定门店', id: 0 }]
//所属城市
const ownCityEnum = [{ name: '全部城市', id: 1 }, { name: '指定城市', id: 0 }]
//所属终端
const ownEndEnum = [{ name: '全部终端', id: 1 }, { name: '指定终端', id: 0 }]
//是否
const yesOrNoEnum = [{ name: '否', id: 0 }, { name: '是', id: 1 }]
//业务类型
const bizTypeObj = {
  content: { bizType: 0 },
  futureShop: { bizType: 1 },
  bthome: { bizType: 2 },
  ownerApp: { bizType: 3 }
}
//关联公司
const company = [
  {
    id: 1,
    name: '百安居（中国）投资有限公司'
  },
  {
    id: 2,
    name: '百安居（中国）置业发展有限公司'
  }
]
export {
  upperStatusEnum,
  scheduleStatusEnum,
  detailTypeEnum,
  ownShopEnum,
  ownEndEnum,
  ownCityEnum,
  bizTypeObj,
  yesOrNoEnum,
  company
}
