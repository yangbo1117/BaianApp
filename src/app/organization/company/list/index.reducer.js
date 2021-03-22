export default function(state = {}, action) {
  switch (action.type) {
    case 'GET_COMPANY_LIST':
      return {
        ...state,
        companyListStatus: true,
        companyListCode: action.payload.code,
        companyListData: action.payload.data,
        companyListPage: action.payload.page
      }
    case 'GET_COMPANY_LIST_FAIL':
      return {
        ...state,
        companyListStatus: true,
        companyListCode: action.payload.code,
        companyListMessage: action.payload.message
      }
    case 'UPDATE_GET_COMPANY_LIST_STATUS':
      return {
        ...state,
        companyListStatus: false
      }

    default:
      return state
  }
}
