export default (state = {}, action) => {
  switch (action.type) {
    case 'GET_TITLE_DETAIL':
      return {
        ...state,
        getTitleDetailStatus: true,
        getTitleDetailData: action.payload.data,
        getTitleDetailCode: action.payload.code,
        getTitleDetailMessage: action.payload.message
      }
    case 'GET_TITLE_DETAIL_FAIL':
      return {
        ...state,
        getTitleDetailStatus: true,
        getTitleDetailCode: action.payload.code,
        getTitleDetailMessage: action.payload.message
      }
    case 'UPDATE_GET_TITLE_DETAIL':
      return {
        ...state,
        getTitleDetailStatus: false
      }
    default:
      return state
  }
}
