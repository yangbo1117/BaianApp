import moment from 'moment'
import Toast from '../components/prompt/toast'
import Dialog from '../components/dialog/index'
import * as Qiniu from 'qiniu-js'
import Fetch from '../middleware/fetch/fetch'
import * as __URL__ from '../../config/index'

const createUrl = request => {
  let url = request.url
  let param = request.param
  let isExport = request.isExport

  if (param) {
    url = !url.includes('?') && url + '?'
    if (!isExport) {
      for (let key of Object.keys(param)) {
        url = url + key + '=' + param[key] + '&'
      }
    } else {
      //列表导出接口不需要传pageSize&curPage
      for (let key of Object.keys(param)) {
        if (key === 'pageSize' || key === 'curPage') {
          continue
        } else {
          url = url + key + '=' + param[key] + '&'
        }
      }
    }
    if (url.endsWith('&')) {
      url = url.substring(0, url.length - 1)
    }
  }
  return url
}

const getUrlArg = name => {
  let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
  let arg = window.location.search.substr(1).match(reg)
  return arg ? arg[2] : ''
}

//判断字符串/数组/对象/不为空时返回true
const isNotNull = obj => {
  if (obj instanceof Object) {
    for (var a in obj) {
      return true
    }
    return false
  }
  return (
    typeof obj != 'undefined' &&
    obj !== null &&
    (Array.isArray(obj) ? obj.length !== 0 : obj !== '')
  )
}

//时间戳转标准日期
const fmtDate = obj => {
  var date = new Date(obj)
  var y = 1900 + date.getYear()
  var m = '0' + (date.getMonth() + 1)
  var d = '0' + date.getDate()
  return (
    y +
    '-' +
    m.substring(m.length - 2, m.length) +
    '-' +
    d.substring(d.length - 2, d.length)
  )
}

//毫秒数或中国标准时间转日期：
function msToDate(msec) {
  let datetime = new Date(msec)
  let year = datetime.getFullYear()
  let month = datetime.getMonth()
  let date = datetime.getDate()
  let hour = datetime.getHours()
  let minute = datetime.getMinutes()
  let second = datetime.getSeconds()
  let result1 =
    year +
    '-' +
    (month + 1 >= 10 ? month + 1 : '0' + (month + 1)) +
    '-' +
    (date + 1 < 10 ? '0' + date : date) +
    ' ' +
    (hour + 1 < 10 ? '0' + hour : hour) +
    ':' +
    (minute + 1 < 10 ? '0' + minute : minute) +
    ':' +
    (second + 1 < 10 ? '0' + second : second)

  let result2 =
    year +
    '-' +
    (month + 1 >= 10 ? month + 1 : '0' + (month + 1)) +
    '-' +
    (date + 1 < 10 ? '0' + date : date)

  let result = {
    hasTime: result1,
    withoutTime: result2
  }
  return result
}

//向data里面添加初始化（initalValue）值
const setInitialValue = (items, values) => {
  items &&
    items.forEach(item => {
      if (item.type === 'cascader') {
        setInitialValue(item.linkage, values)
      }
      let value = values && values[item.id]
      if (value === 0 || value) {
        if (item.type === 'datepicker') {
          value = moment(fmtDate(value), 'YYYY-MM-DD')
        } else if (item.type === 'switch') {
          value === 0 ? (value = false) : (value = true)
        }
        item.initialValue = value
      } else {
        if (
          (item.mode === 'multiple' && item.type === 'select') ||
          item.type === 'checkbox'
        ) {
          item.initialValue = []
        } else {
          item.initialValue = ''
        }
      }
    })
}

//用于新建的页面将所有数据重置（用于新建和编辑是一个页面的时候）
const resetInitialValue = items => {
  items &&
    items.forEach(item => {
      delete item.initialValue
    })
}
/*
 *argus: object，里面包含参数
 *status
 *code
 *message
 *params: 当前列表搜索的参数值，fetch成功之后，无刷新更改浏览器URL
 *isShowDialog: 控制当code不等于-1、0的时候，是否显示Dialog，还是Toast
 */
const fetchCallback = argus => {
  const {
    nextProps,
    status,
    code,
    message,
    params,
    updateStatus,
    successCallback,
    isShowToastSuccess,
    successText,
    isShowDialog,
    isNotReplaceState
  } = argus
  if (status) {
    updateStatus()
    if (code && code !== 0) {
      if (code >= 500) {
        Toast.show('服务器异常')
      } else if (code >= 400) {
        if (code === 404) {
          Toast.show('服务器找不到请求地址')
        } else if (code === 414) {
          Toast.show('请求的 URI（通常为网址）过长，服务器无法处理')
        } else {
          Toast.show('错误请求')
        }
      } else if (code >= 300) {
        Toast.show('网络异常')
      } else if (code === -1) {
        window.location.href = getLoginUrl()
      } else if (code === -2 && nextProps) {
        const { history } = nextProps
        history.push('/permission')
      } else {
        !isShowDialog
          ? Toast.show(message)
          : Dialog.open({
              message: message,
              dialogButton: [
                {
                  text: '确定',
                  type: 'primary',
                  clickHandle: () => {
                    Dialog.close()
                  }
                }
              ]
            })
      }
    } else if (code === 0) {
      // eslint-disable-next-line
      isShowToastSuccess ? Toast.show(successText || message) : null

      if (params) {
        //获取列表数据成功之后，无刷新更新URL
        if (isNotReplaceState === true) {
        } else {
          let url = createUrl({
            url: window.location.origin + window.location.pathname,
            param: params
          })
          window.history.replaceState({}, 0, url)
        }
      }
      successCallback && successCallback()
    }
  }
}

const getAuthUrl = () => {
  // eslint-disable-next-line
  let currentUrl = location.href
  const ENV = process.env.CURRENT_ENV
  let authUrl = __URL__[ENV]['authUrl']
  let apiUrl = __URL__[ENV]['apiUrl']
  return authUrl + '?originUrl=' + currentUrl
}

//获取登录地址
const getLoginUrl = () => {
  let currentUrl = location.href
  const ENV = process.env.CURRENT_ENV
  let loginUrl = __URL__[ENV]['loginAddress']
  let apiUrl = __URL__[ENV]['apiUrl']
  return loginUrl + '?originUrl=' + currentUrl
}

const getCookie = cookieName => {
  let cookieStr = decodeURI(document.cookie)
  let arr = cookieStr.split('; ')
  let cookieValue = ''
  for (let i = 0; i < arr.length; i++) {
    let temp = arr[i].split('=')
    if (temp[0] === cookieName) {
      cookieValue = temp[1]
      break
    }
  }
  return decodeURI(cookieValue)
}

//图片上传七牛云，调用七牛云SDK
/*
 * id:标记上传图片的元素，一个页面中可能有多个上传图片的地方
 * fileSizeLimit：图片大小限制 eg：5
 * */

var uploadImgList = [] //上传图片的key和order顺序排序
var uploadImgTimes = 0 //记录顺序
const getQiniuToken = (e, callBack, id, fileSizeLimit) => {
  Toast.show('上传图片中')
  let file = e.file
  let key = uuid()
  let obj = {
    key: key,
    uploadOrder: uploadImgTimes
  }
  uploadImgTimes++
  uploadImgList.push(obj)
  Fetch({
    url: '/upload/getQiniuTokenWithParams',
    type: 'GET',
    isQiniu: 'true'
  }).then(res => {
    if (res.response.code === 0) {
      let token = res.response.data.upToken
      if (fileSizeLimit && file.size > fileSizeLimit * 1048576) {
        Toast.show('支持' + fileSizeLimit + 'M以内图片')
        return
      }
      let putExtra = {
        fname: '',
        params: {},
        mimeType: ['image/png', 'image/jpeg', 'image/jpg']
      }
      let observer = {
        next(res) {
          let total = res.total
        },
        error(err) {
          if (err && err.isRequestError) {
            switch (err.code) {
              case 614:
                Toast.show('该图片已经存在!')
                break
              default:
                Toast.show(err.message)
            }
          } else {
            Toast.show('支持jpg、.png、.jpeg格式!')
          }
        },
        complete(res) {
          res.id = id
          res.fileName = file.name
          uploadImgList.forEach(ele => {
            if (ele.key === res.key) {
              res.uploadOrder = ele.uploadOrder
            }
          })
          callBack && callBack(res)
        }
      }
      //调用sdk上传接口获得相应的observable，控制上传和暂停
      let observable = Qiniu.upload(file, key, token, putExtra)
      let subscription = observable.subscribe(observer)
    }
  })
}
const getQiniuVideoToken = (e, callBack, id, fileSizeLimit) => {
  Toast.show('上传视频中')
  let file = e.file
  let key = uuid()
  let obj = {
    key: key,
    uploadOrder: uploadImgTimes
  }
  uploadImgTimes++
  uploadImgList.push(obj)
  Fetch({
    url: '/upload/getQiniuTokenWithParams',
    type: 'GET',
    isQiniu: 'true'
  }).then(res => {
    if (res.response.code === 0) {
      let token = res.response.data.upToken
      if (fileSizeLimit && file.size > fileSizeLimit * 1048576) {
        Toast.show('支持' + fileSizeLimit + 'M以内视频')
        return
      }
      let putExtra = {
        fname: '',
        params: {},
        mimeType: ['video/mp4']
      }
      let observer = {
        next(res) {
          let total = res.total
        },
        error(err) {
          if (err && err.isRequestError) {
            switch (err.code) {
              case 614:
                Toast.show('该视频已经存在!')
                break
              default:
                Toast.show(err.message)
            }
          } else {
            Toast.show('支持.mp4格式!')
          }
        },
        complete(res) {
          res.id = id
          res.fileName = file.name
          uploadImgList.forEach(ele => {
            if (ele.key === res.key) {
              res.uploadOrder = ele.uploadOrder
            }
          })
          callBack && callBack(res)
        }
      }
      //调用sdk上传接口获得相应的observable，控制上传和暂停
      let observable = Qiniu.upload(file, key, token, putExtra)
      let subscription = observable.subscribe(observer)
    }
  })
}
//数组交换顺序 用于元素的前移或者后移
const swapItems = (arr, index1, index2) => {
  arr[index1] = arr.splice(index2, 1, arr[index1])[0]
  return arr
}

const QiniuCallBack = (res, newData) => {
  let timeStamp = new Date().getTime()
  newData.forEach((ele, index) => {
    if (ele.id === res.id) {
      if (
        ele.uploadImgLimitNumber > 1 ||
        (!ele.uploadImgLimitNumber && ele.uploadImgLimitNumber != 0)
      ) {
        let list = ele.fileList
        if (list.length === ele.uploadImgLimitNumber) {
          let msg = `最多允许传${ele.uploadImgLimitNumber}张图`
          Toast.show(msg)
          return
        }
        list.push({
          flag: timeStamp,
          uid: timeStamp,
          name: res.key,
          width: res.w,
          height: res.h,
          uploadOrder: res.uploadOrder, //用来记录上传图片的顺序
          status: 'done',
          url: 'https://res1.bnq.com.cn/' + res.key + '?t=' + timeStamp
        })
        ele.fileList = list
      } else {
        ele.fileList = [
          {
            uid: -1,
            name: res.key,
            uploadOrder: res.uploadOrder,
            status: 'done',
            url:
              'https://res1.bnq.com.cn/' +
              res.key +
              '?t=' +
              timeStamp +
              '&width=' +
              res.w +
              '&height=' +
              res.h,
            width: res.w,
            height: res.h
          }
        ]
      }
      //只对新上传的图片进行排序
      let rawList = []
      let concatList = []
      ele.fileList.forEach((ele, index) => {
        if (ele.uploadOrder || ele.uploadOrder === 0) {
          concatList.push(ele)
        } else {
          rawList.push(ele)
        }
      })
      concatList.sort(function(a, b) {
        return a.uploadOrder - b.uploadOrder
      })
      ele.fileList = rawList.concat(concatList)
    }
  })
}

const RemoveImgFun = (flag, id, newData) => {
  newData.forEach(ele => {
    if (ele.id === id) {
      ele.fileList.forEach((item, index) => {
        if (item.flag === flag) {
          ele.fileList.splice(index, 1)
        }
      })
    }
  })
}

const SortImgFun = (index, type, id, newData) => {
  newData.forEach(ele => {
    if (ele.id === id) {
      if (type === 'pre') {
        if (index === 0) {
          return
        }
        ele.fileList = swapItems(ele.fileList, index, index - 1)
      } else {
        if (index === ele.fileList.length - 1) {
          return
        }
        ele.fileList = swapItems(ele.fileList, index, index + 1)
      }
    }
  })
}

//深拷贝
const deepClone = obj => {
  var str,
    newobj = obj.constructor === Array ? [] : {}
  if (typeof obj !== 'object') {
    return
  } else if (window.JSON) {
    // eslint-disable-next-line
    ;(str = JSON.stringify(obj)), //序列化对象
      (newobj = JSON.parse(str)) //还原
  } else {
    for (var i in obj) {
      newobj[i] = typeof obj[i] === 'object' ? deepClone(obj[i]) : obj[i]
    }
  }
  return newobj
}

const ToPreviewIndex = (id, type) => {
  const ENV = process.env.CURRENT_ENV
  window.open(
    __URL__[ENV].previewUrl + '?fromIndex=pc&id=' + id + '&type=' + type
  )
}

const uuid = () => {
  var s = []
  var hexDigits = '0123456789abcdef'
  for (var i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
  }
  s[14] = '4' // bits 12-15 of the time_hi_and_version field to 0010
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1) // bits 6-7 of the clock_seq_hi_and_reserved to 01
  s[8] = s[13] = s[18] = s[23] = '-'

  var uuid = s.join('')
  return uuid
}

export {
  createUrl,
  getUrlArg,
  isNotNull,
  msToDate,
  fmtDate,
  setInitialValue,
  resetInitialValue,
  fetchCallback,
  getCookie,
  getQiniuToken,
  getQiniuVideoToken,
  swapItems,
  getAuthUrl,
  getLoginUrl,
  QiniuCallBack,
  RemoveImgFun,
  SortImgFun,
  deepClone,
  ToPreviewIndex,
  uuid
}
