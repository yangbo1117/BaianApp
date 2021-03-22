export let getEmployeePositionDetail = argus => {
  return {
    type: 'GET_EMPLOYEE_POSITION_DETAIL',
    payload: {
      url: '/employeePosition/detail',
      type: 'get',
      param: {
        ...argus
      }
    }
  }
}

export let updateGetEmployeePositionDetail = () => {
  return {
    type: 'UPDATE_GET_EMPLOYEE_POSITION_DETAIL'
  }
}
