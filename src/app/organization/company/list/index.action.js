export let getCompanyList = argus => {
  return {
    type: 'GET_COMPANY_LIST',
    payload: {
      url: '/company/list',
      type: 'get',
      param: {
        ...argus
      }
    }
  }
}

export let updateCompanyListStatus = () => {
  return {
    type: 'UPDATE_GET_COMPANY_LIST_STATUS'
  }
}
