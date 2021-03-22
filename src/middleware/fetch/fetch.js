import * as __URL__ from '../../../config/index'
import * as Util from '../../util/index'

export default args => {
  //判断当前环境
  const ENV = process.env.CURRENT_ENV
  console.log(ENV)
  let params = args.type.toUpperCase() === 'GET' ? null : args.param
  let url = args.type.toUpperCase() === 'GET' ? Util.createUrl(args) : args.url
  let requestUrl = __URL__[ENV]['apiUrl'] + __URL__[ENV]['apiUrlFilter'] + url
  if(args.isShop){
    requestUrl = __URL__[ENV]['shopTargetUrl'] + __URL__[ENV]['shopApiUrlFilter'] + url
  }
  if (args.isAddress) {
    requestUrl = __URL__[ENV]['addressUrl'] + url
  }
  if (args.isAuth) {
    requestUrl = __URL__[ENV]['authUrl'] + __URL__[ENV]['authUrlFilter'] + url
  }
  if (args.isQiniu) {
    requestUrl = __URL__[ENV]['qiniuUrl'] + url
  }
  let headers = {
    Accept: 'application/json'
  }
  if (!args.isAddress && !args.isAuth && !args.isQiniu) {
    headers['Cache-Control'] = 'no-cache'
    headers['Content-Type'] = args.contentType || 'application/json'
  }
  //这个项目这边注释掉是因为 后台要求传递的json对象是data:{key:value}这样的
  // if (params && params.data) {
  //   params = JSON.stringify(params.data);
  // } else
  if (params) {
    params = JSON.stringify({ ...params })
  }

  //添加window.location.protocol
  if (requestUrl.indexOf('http') === -1) {
    requestUrl = window.location.protocol + '//' + requestUrl
  } else if (requestUrl.indexOf('http') > -1) {
    requestUrl = requestUrl.replace(/^http(s?):/, window.location.protocol)
  }

  return fetch(requestUrl, {
    credentials: 'include', // 请求带上cookies，是每次请求保持会话一直
    method: args.type.toUpperCase(),
    follow: 1,
    timeout: 10000,
    headers: headers,
    body: params ? params : null
  })
    .then(res => {
      if (res.status >= 200 && res.status < 300) {
        return res
      }
      const error = new Error(res.statusText)
      error.res = res
      throw error
    })
    .then(response => {
      return response.json()
    })
}
