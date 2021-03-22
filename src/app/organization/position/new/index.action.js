//添加/编辑
export let addNewPosition = argus => {
  return {
    type: 'ADD_NEW_POSITION',
    payload: {
      url: '/position/add',
      type: 'post',
      isContent: true,
      param: {
        ...argus
      }
    }
  }
}

export let updateAddNewPositionStatus = () => {
  return {
    type: 'UPDATE_ADD_NEW_POSITION_STATUS'
  }
}

//获取职位详情
export let getDetailPosition = argus => {
  return {
    type: 'GET_DETAIL_POSITION',
    payload: {
      url: '/position/detail',
      type: 'get',
      isContent: true,
      param: {
        ...argus
      }
    }
  }
}

export let updateGetDetailPositionStatus = () => {
  return {
    type: 'UPDATE_GET_DETAIL_POSITION_STATUS'
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

export let updatePosition = argus => {
  return {
    type: 'UPDATE_POSITION',
    payload: {
      url: '/position/update',
      type: 'post',
      isContent: true,
      param: {
        ...argus
      }
    }
  }
}

export let updateUpdatePositionStatus = () => {
  return {
    type: 'UPDATE_UPDATE_POSITION_STATUS'
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
