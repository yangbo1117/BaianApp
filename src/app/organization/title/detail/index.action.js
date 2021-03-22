export let getTitleDetail = argus => {
  return {
    type: 'GET_TITLE_DETAIL',
    payload: {
      url: '/title/detail',
      type: 'get',
      param: {
        ...argus
      }
    }
  }
}

export let updateGetTitleDetail = () => {
  return {
    type: 'UPDATE_GET_TITLE_DETAIL'
  }
}
