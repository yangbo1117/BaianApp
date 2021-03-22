export let getDepartmentList = argus => {
  return {
    type: 'GET_DEPARTMENT_LIST',
    payload: {
      url: '/department/list',
      type: 'get',
      param: {
        ...argus
      }
    }
  }
}

export let updateDepartmentListStatus = () => {
  return {
    type: 'UPDATE_GET_DEPARTMENT_LIST_STATUS'
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