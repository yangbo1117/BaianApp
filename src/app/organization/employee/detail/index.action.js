export let getEmployeeDetail = argus => {
  return {
    type: 'GET_EMPLOYEE_DETAIL',
    payload: {
      url: '/employee/detail',
      type: 'get',
      param: {
        ...argus
      }
    }
  }
}

export let updateGetEmployeeDetail = () => {
  return {
    type: 'UPDATE_GET_EMPLOYEE_DETAIL'
  }
}
