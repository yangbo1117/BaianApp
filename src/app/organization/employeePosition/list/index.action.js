export let getEmployeePositionList = argus => {
  return {
    type: 'GET_EMPLOYEE_POSITION_LIST',
    payload: {
      url: '/employeePosition/list',
      type: 'get',
      param: {
        ...argus
      }
    }
  }
}

export let updateEmployeePositionListStatus = () => {
  return {
    type: 'UPDATE_GET_EMPLOYEE_POSITION_LIST_STATUS'
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
