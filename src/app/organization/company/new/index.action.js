//添加
export let addNewCompany = argus => {
  return {
    type: 'ADD_NEW_COMPANY',
    payload: {
      url: '/company/add',
      type: 'post',
      isContent: true,
      param: {
        ...argus
      }
    }
  }
}

export let updateAddNewCompanyStatus = () => {
  return {
    type: 'UPDATE_ADD_NEW_COMPANY_STATUS'
  }
}

//修改
export let updateCompany = argus => {
  return {
    type: 'UPDATE_COMPANY',
    payload: {
      url: '/company/update',
      type: 'post',
      isContent: true,
      param: {
        ...argus
      }
    }
  }
}

export let updateUpdateCompanyStatus = () => {
  return {
    type: 'UPDATE_UPDATE_COMPANY_STATUS'
  }
}

//获取详情
export let getCompanyDetail = argus => {
  return {
    type: 'GET_COMPANY_DETAIL',
    payload: {
      url: '/company/detail',
      type: 'get',
      param: {
        ...argus
      }
    }
  }
}
export let updateGetCompanyDetailStatus = () => {
  return {
    type: 'UPDATE_GET_COMPANY_DETAIL_STATUS'
  }
}


/*
 *获取省
 *isAddress: 决定请求域名
*/
export let getProvince = () => {
  return {
    type: 'GET_PROVINCE',
    payload: {
      url: '/provinces',
      type: 'get',
      isAddress: 'true'
    }
  }
}

export let updateGetProvinceStatus = () => {
  return {
    type: 'UPDATE_GET_PROVINCE_STATUS'
  }
}

export let cascaderHandleChange = (argus, option) => {
  return {
    type: option.actionName,
    payload: {
      url: option.url,
      type: 'get',
      isAddress: option.isAddress,
      param: {
        ...argus
      }
    }
  }
}

export let updateGetCityStatus = () => {
  return {
    type: 'UPDATE_GET_CITY_STATUS'
  }
}
export let updateGetSDistrictStatus = () => {
  return {
    type: 'UPDATE_GET_DISTRICT_STATUS'
  }
}