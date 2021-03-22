//添加
export let addNewDepartment = argus => {
  return {
    type: 'ADD_NEW_DEPARTMENT',
    payload: {
      url: '/department/add',
      type: 'post',
      isContent: true,
      param: {
        ...argus
      }
    }
  }
}

export let updateAddNewDepartmentStatus = () => {
  return {
    type: 'UPDATE_ADD_NEW_DEPARTMENT_STATUS'
  }
}

//获取详情
export let getDetailDepartment = argus => {
  return {
    type: 'GET_DETAIL_DEPARTMENT',
    payload: {
      url: '/department/detail',
      type: 'get',
      isContent: true,
      param: {
        ...argus
      }
    }
  }
}

export let updateGetDetailDepartmentStatus = () => {
  return {
    type: 'UPDATE_GET_DETAIL_DEPARTMENT_STATUS'
  }
}

//更新
export let updateDepartment = argus => {
  return {
    type: 'UPDATE_DEPARTMENT',
    payload: {
      url: '/department/update',
      type: 'post',
      isContent: true,
      param: {
        ...argus
      }
    }
  }
}
export let updateUpdateDepartmentStatus = () => {
  return {
    type: 'UPDATE_UPDATE_DEPARTMENT_STATUS'
  }
}

//获取所有部门
export let getAllDepartment = (argus) => {
  return {
    type: 'GET_ALL_DEPARTMENT',
    payload: {
      url: '/department/listAll',
      type: 'get',
      param: {
        ...argus
      }
    }
  }
}

export let updateGetAllDepartmentStatus = () => {
  return {
    type: 'UPDATE_GET_ALL_DEPARTMENT_STATUS'
  }
}

// 关联公司
export let getCompanyList = argus => {
  return {
    type: 'GET_COMPANY_LIST',
    payload: {
      url: '/company/list',
      type: 'get',
      param: {
        ...argus
      }
    }
  }
}

export let updateCompanyListStatus = () => {
  return {
    type: 'UPDATE_GET_COMPANY_LIST_STATUS'
  }
}

export let getShopList = () => {
  return {
    type: 'GET_SHOP_LIST',
    payload: {
      url: '/meta/dnConfig/shopList',
      type: 'get',
      isShop: true,
    }
  }
}
export let updateShopListStatus = () => {
  return {
    type: 'UPDATE_GET_SHOP_LIST_STATUS'
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
      isShop: option.isShop,
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
export let updateGetDistrictStatus = () => {
  return {
    type: 'UPDATE_GET_DISTRICT_STATUS'
  }
}
