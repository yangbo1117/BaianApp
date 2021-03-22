export let getCompanyDetail = argus => {
  return {
    type: 'GET_COMPANY_DETAIL',
    payload: {
      url: '/company/detail',
      type: 'get',
      param: {
        ...argus
      }
    }
  }
}

export let updateGetCompanyDetail = () => {
  return {
    type: 'UPDATE_GET_COMPANY_DETAIL'
  }
}
