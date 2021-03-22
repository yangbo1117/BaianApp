export default (state = {}, action) => {
  switch (action.type) {
    case 'GET_EMPLOYEE_POSITION_DETAIL':
      return {
        ...state,
        getEmployeePositionDetailStatus: true,
        getEmployeePositionDetailData: action.payload.data,
        getEmployeePositionDetailCode: action.payload.code,
        getEmployeePositionDetailMessage: action.payload.message
      }
    case 'GET_EMPLOYEE_POSITION_DETAIL_FAIL':
      return {
        ...state,
        getEmployeePositionDetailStatus: true,
        getEmployeePositionDetailCode: action.payload.code,
        getEmployeePositionDetailMessage: action.payload.message
      }
    case 'UPDATE_GET_EMPLOYEE_POSITION_DETAIL':
      return {
        ...state,
        getEmployeePositionDetailStatus: false
      }
    default:
      return state
  }
}
