export let getJobList = argus => {
  return {
    type: 'GET_JOB_LIST',
    payload: {
      url: '/job/list',
      type: 'get',
      param: {
        ...argus
      }
    }
  }
}

export let updateJobListStatus = () => {
  return {
    type: 'UPDATE_GET_JOB_LIST_STATUS'
  }
}
