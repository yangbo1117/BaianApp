export default (state = {}, action) => {
  switch (action.type) {
    case 'GET_EMPLOYEE_DETAIL':
      return {
        ...state,
        getEmployeeDetailStatus: true,
        getEmployeeDetailData: action.payload.data,
        getEmployeeDetailCode: action.payload.code,
        getEmployeeDetailMessage: action.payload.message
      }
    case 'GET_EMPLOYEE_DETAIL_FAIL':
      return {
        ...state,
        getEmployeeDetailStatus: true,
        getEmployeeDetailCode: action.payload.code,
        getEmployeeDetailMessage: action.payload.message
      }
    case 'UPDATE_GET_EMPLOYEE_DETAIL':
      return {
        ...state,
        getEmployeeDetailStatus: false
      }
    default:
      return state
  }
}
