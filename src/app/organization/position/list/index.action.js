//获取职位列表
export let getPositionList = argus => {
  return {
    type: 'GET_POSITION_LIST',
    payload: {
      url: '/position/list',
      type: 'get',
      param: {
        ...argus
      }
    }
  }
}

export let updatePositionListStatus = () => {
  return {
    type: 'UPDATE_GET_POSITION_LIST_STATUS'
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

//获取所有职务
export let getAllJob = (argus) => {
  return {
    type: 'GET_ALL_JOB',
    payload: {
      url: '/job/listAll',
      type: 'get',
      param: {
        ...argus
      }
    }
  }
}

export let updateGetAllJobStatus = () => {
  return {
    type: 'UPDATE_GET_ALL_JOB_STATUS'
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
