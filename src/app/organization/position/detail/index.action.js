export let getPositionDetail = argus => {
  return {
    type: 'GET_POSITION_DETAIL',
    payload: {
      url: '/position/detail',
      type: 'get',
      param: {
        ...argus
      }
    }
  }
}

export let updateGetPositionDetail = () => {
  return {
    type: 'UPDATE_GET_POSITION_DETAIL'
  }
}
