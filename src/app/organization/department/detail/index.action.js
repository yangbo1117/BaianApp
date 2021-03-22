export let getDepartmentDetail = argus => {
  return {
    type: 'GET_DEPARTMENT_DETAIL',
    payload: {
      url: '/department/detail',
      type: 'get',
      param: {
        ...argus
      }
    }
  }
}

export let updateGetDepartmentDetail = () => {
  return {
    type: 'UPDATE_GET_DEPARTMENT_DETAIL'
  }
}
