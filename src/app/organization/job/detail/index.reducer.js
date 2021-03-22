export default (state = {}, action) => {
  switch (action.type) {
    case 'GET_JOB_DETAIL':
      return {
        ...state,
        getJobDetailStatus: true,
        getJobDetailData: action.payload.data,
        getJobDetailCode: action.payload.code,
        getJobDetailMessage: action.payload.message
      }
    case 'GET_JOB_DETAIL_FAIL':
      return {
        ...state,
        getJobDetailStatus: true,
        getJobDetailCode: action.payload.code,
        getJobDetailMessage: action.payload.message
      }
    case 'UPDATE_GET_JOB_DETAIL':
      return {
        ...state,
        getJobDetailStatus: false
      }
    default:
      return state
  }
}
