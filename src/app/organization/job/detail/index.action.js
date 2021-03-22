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

export let updateGetJobDetail = () => {
  return {
    type: 'UPDATE_GET_JOB_DETAIL'
  }
}
