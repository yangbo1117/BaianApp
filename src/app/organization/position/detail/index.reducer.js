export default (state = {}, action) => {
  switch (action.type) {
    case 'GET_POSITION_DETAIL':
      return {
        ...state,
        getPositionDetailStatus: true,
        getPositionDetailData: action.payload.data,
        getPositionDetailCode: action.payload.code,
        getPositionDetailMessage: action.payload.message
      }
    case 'GET_POSITION_DETAIL_FAIL':
      return {
        ...state,
        getPositionDetailStatus: true,
        getPositionDetailCode: action.payload.code,
        getPositionDetailMessage: action.payload.message
      }
    case 'UPDATE_GET_POSITION_DETAIL':
      return {
        ...state,
        getPositionDetailStatus: false
      }
    default:
      return state
  }
}
