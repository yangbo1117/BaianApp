export default (state = {}, action) => {
  switch (action.type) {
    case 'GET_COMPANY_DETAIL':
      return {
        ...state,
        getCompanyDetailStatus: true,
        getCompanyDetailData: action.payload.data,
        getCompanyDetailCode: action.payload.code,
        getCompanyDetailMessage: action.payload.message
      }
    case 'GET_COMPANY_DETAIL_FAIL':
      return {
        ...state,
        getCompanyDetailStatus: true,
        getCompanyDetailCode: action.payload.code,
        getCompanyDetailMessage: action.payload.message
      }
    case 'UPDATE_GET_COMPANY_DETAIL':
      return {
        ...state,
        getCompanyDetailStatus: false
      }
    default:
      return state
  }
}
