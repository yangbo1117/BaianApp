//添加
export let addNewEmployeePosition = argus => {
  return {
    type: 'ADD_NEW_EMPLOYEE_POSITION',
    payload: {
      url: '/employeePosition/add',
      type: 'post',
      isContent: true,
      param: {
        ...argus
      }
    }
  }
}

export let updateAddNewEmployeePositionStatus = () => {
  return {
    type: 'UPDATE_ADD_NEW_EMPLOYEE_POSITION_STATUS'
  }
}

//获取详情
export let getDetailEmployeePosition = argus => {
  return {
    type: 'GET_DETAIL_EMPLOYEE_POSITION',
    payload: {
      url: '/employeePosition/detail',
      type: 'get',
      param: {
        ...argus
      }
    }
  }
}

export let updateGetDetailEmployeePositionStatus = () => {
  return {
    type: 'UPDATE_GET_DETAIL_EMPLOYEE_POSITION_STATUS'
  }
}

//更新
export let updateEmployeePosition = argus => {
  return {
    type: 'UPDATE_EMPLOYEE_POSITION',
    payload: {
      url: '/employeePosition/update',
      type: 'post',
      param: {
        ...argus
      }
    }
  }
}

export let updateUpdateEmployeePositionStatus = () => {
  return {
    type: 'UPDATE_UPDATE_EMPLOYEE_POSITION_STATUS'
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
export let cascaderHandleChange = (argus, option) => {
  return {
    type: option.actionName,
    payload: {
      url: option.url,
      type: 'get',
      param: {
        ...argus
      }
    }
  }
}
export let updateGetTitleByPositionStatus = () => {
  return {
    type: 'UPDATE_GET_TITLE_BY_POSITION_STATUS'
  }
}


//获取关联职位
export let getRelativeEmployeePositionList = argus => {
  return {
    type: 'GET_RELATIVE_EMPLOYEE_POSITION_LIST',
    payload: {
      url: '/employeePosition/queryByEmployeeId',
      type: 'get',
      param: {
        ...argus
      }
    }
  }
}

export let updateRelativeEmployeePositionListStatus = () => {
  return {
    type: 'UPDATE_GET_RELATIVE_EMPLOYEE_POSITION_LIST_STATUS'
  }
}

//删除关联职位
export let deleteEmployeePosition = argus => {
  return {
    type: 'DELETE_EMPLOYEE_POSITION',
    payload: {
      url: '/employeePosition/delete',
      type: 'get',
      param: {
        ...argus
      }
    }
  }
}

export let deleteEmployeePositionStatus = () => {
  return {
    type: 'UPDATE_DELETE_EMPLOYEE_POSITION_STATUS'
  }
}

//获取职位状态
export let getPositionState = () => {
  return {
    type: 'GET_POSITION_STATE',
    payload: {
      url: '/employee/getPositionState',
      type: 'get'
    }
  }
}

export let updateGetPositionStateStatus = () => {
  return {
    type: 'UPDATE_GET_POSITION_STATE_STATUS'
  }
}