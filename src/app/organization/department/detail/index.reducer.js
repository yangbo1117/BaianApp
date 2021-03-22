export default (state = {}, action) => {
  switch (action.type) {
    case 'GET_DEPARTMENT_DETAIL':
      return {
        ...state,
        getDepartmentDetailStatus: true,
        getDepartmentDetailData: action.payload.data,
        getDepartmentDetailCode: action.payload.code,
        getDepartmentDetailMessage: action.payload.message
      }
    case 'GET_DEPARTMENT_DETAIL_FAIL':
      return {
        ...state,
        getDepartmentDetailStatus: true,
        getDepartmentDetailCode: action.payload.code,
        getDepartmentDetailMessage: action.payload.message
      }
    case 'UPDATE_GET_DEPARTMENT_DETAIL':
      return {
        ...state,
        getDepartmentDetailStatus: false
      }
    default:
      return state
  }
}
