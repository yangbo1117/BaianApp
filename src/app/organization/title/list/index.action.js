export let getTitleList = argus => {
  return {
    type: 'GET_TITLE_LIST',
    payload: {
      url: '/title/list',
      type: 'get',
      param: {
        ...argus
      }
    }
  }
}

export let updateTitleListStatus = () => {
  return {
    type: 'UPDATE_GET_TITLE_LIST_STATUS'
  }
}
