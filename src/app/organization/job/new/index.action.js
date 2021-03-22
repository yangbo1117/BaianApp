//添加
export let addNewJob = argus => {
  return {
    type: 'ADD_NEW_JOB',
    payload: {
      url: '/job/add',
      type: 'post',
      isContent: true,
      param: {
        ...argus
      }
    }
  }
}

export let updateAddNewJobStatus = () => {
  return {
    type: 'UPDATE_ADD_NEW_JOB_STATUS'
  }
}

//修改
export let updateJob = argus => {
  return {
    type: 'UPDATE_JOB',
    payload: {
      url: '/job/update',
      type: 'post',
      isContent: true,
      param: {
        ...argus
      }
    }
  }
}

export let updateUpdateJobStatus = () => {
  return {
    type: 'UPDATE_UPDATE_JOB_STATUS'
  }
}

//获取详情
export let getJobDetail = argus => {
  return {
    type: 'GET_JOB_DETAIL',
    payload: {
      url: '/job/detail',
      type: 'get',
      param: {
        ...argus
      }
    }
  }
}
export let updateGetJobDetailStatus = () => {
  return {
    type: 'UPDATE_GET_JOB_DETAIL_STATUS'
  }
}
