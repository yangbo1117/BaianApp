//添加
export let addNewEmployee = argus => {
  return {
    type: 'ADD_NEW_EMPLOYEE',
    payload: {
      url: '/employee/add',
      type: 'post',
      isContent: true,
      param: {
        ...argus
      }
    }
  }
}

export let updateAddNewEmployeeStatus = () => {
  return {
    type: 'UPDATE_ADD_NEW_EMPLOYEE_STATUS'
  }
}

//获取详情
export let getDetailEmployee = argus => {
  return {
    type: 'GET_DETAIL_EMPLOYEE',
    payload: {
      url: '/employee/detail',
      type: 'get',
      param: {
        ...argus
      }
    }
  }
}

export let updateGetDetailEmployeeStatus = () => {
  return {
    type: 'UPDATE_GET_DETAIL_EMPLOYEE_STATUS'
  }
}

//更新
export let updateEmployee = argus => {
  return {
    type: 'UPDATE_EMPLOYEE',
    payload: {
      url: '/employee/update',
      type: 'post',
      param: {
        ...argus
      }
    }
  }
}

export let updateUpdateEmployeeStatus = () => {
  return {
    type: 'UPDATE_UPDATE_EMPLOYEE_STATUS'
  }
}

//获取所有部门
export let getAllDepartment = () => {
  return {
    type: 'GET_ALL_DEPARTMENT',
    payload: {
      url: '/department/listAll',
      type: 'get'
    }
  }
}

export let updateGetAllDepartmentStatus = () => {
  return {
    type: 'UPDATE_GET_ALL_DEPARTMENT_STATUS'
  }
}

//获取所有职位
export let getAllPosition = () => {
  return {
    type: 'GET_ALL_POSITION',
    payload: {
      url: '/position/listAll',
      type: 'get'
    }
  }
}

export let updateGetAllPositionStatus = () => {
  return {
    type: 'UPDATE_GET_ALL_POSITION_STATUS'
  }
}

//获取所有职称
export let getAllTitle = () => {
  return {
    type: 'GET_ALL_TITLE',
    payload: {
      url: '/title/listAll',
      type: 'get'
    }
  }
}

export let updateGetAllTitleStatus = () => {
  return {
    type: 'UPDATE_GET_ALL_TITLE_STATUS'
  }
}

export let getEmployeeType = () => {
  return {
    type: 'GET_EMPLOYEE_TYPE',
    payload: {
      url: '/employee/getEmployeeType',
      type: 'get'
    }
  }
}

export let updateGetEmployeeTypeStatus = () => {
  return {
    type: 'UPDATE_GET_EMPLOYEE_TYPE_STATUS'
  }
}

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