const url = {
  development: {
    targetUrl: 'http://org-dev.bnq.com.cn',
    apiUrl: 'http://web.futureshop.dev-zt.bnq.com.cn:8887',
    apiUrlFilter: '/organization-admin',
    authUrl: 'http://auth-dev.bnq.com.cn',
    loginAddress: 'http://auth-dev.bnq.com.cn/login/login.html',
    authUrlFilter: '/auth',
    port: 8887,
    autoOpenBrowser: true,
    proxyFilter: '/organization-admin',
    shopTargetUrl: 'http://merchant-dev.bnq.com.cn',
    shopProxyFilter: '/merchantAdmin',
    shopApiUrlFilter: '/merchantAdmin',
    addressUrl: 'http://areas-dev.bnq.com.cn/areas/area',
    qiniuUrl: 'http://xres.bnq.com.cn/file' //不支持https
  },
  prodDev: {
    apiUrl: 'http://org-dev.bnq.com.cn',
    apiUrlFilter: '/organization-admin',
    addressUrl: 'http://areas-dev.bnq.com.cn/areas/area',
    authUrl: 'http://auth-dev.bnq.com.cn',
    loginAddress: 'http://auth-dev.bnq.com.cn/login/login.html',
    authUrlFilter: '/auth',
    shopTargetUrl: 'http://merchant-dev.bnq.com.cn',
    shopProxyFilter: '/merchantAdmin',
    shopApiUrlFilter: '/merchantAdmin',
    qiniuUrl: 'http://xres.bnq.com.cn/file' //不支持https
  },
  test: {
    apiUrl: 'http://org-test.bnq.com.cn',
    apiUrlFilter: '/organization-admin',
    addressUrl: 'http://areas-test.bnq.com.cn/areas/area',
    authUrl: 'http://auth-test.bnq.com.cn',
    loginAddress: 'http://auth-test.bnq.com.cn/login/login.html',
    authUrlFilter: '/auth',
    qiniuUrl: 'http://xres.bnq.com.cn/file', //不支持https
    shopTargetUrl: 'http://merchant-test.bnq.com.cn',
    shopApiUrlFilter: '/merchantAdmin',
  },
  production: {
    apiUrl: 'http://orgadmin.bnq.com.cn',
    apiUrlFilter: '/organization-admin',
    addressUrl: 'http://areas.bnq.com.cn/areas/area',
    authUrl: 'http://auth.bnq.com.cn',
    loginAddress: 'http://auth.bnq.com.cn/login/login.html',
    authUrlFilter: '/auth',
    shopTargetUrl: 'http://merchant.bnq.com.cn',
    shopApiUrlFilter: '/merchantAdmin',
    qiniuUrl: 'http://xres.bnq.com.cn/file' //不支持https
  }
}

module.exports = url
