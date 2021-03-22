export default function(state = {}, action) {
  switch (action.type) {
    case 'GET_TITLE_LIST':
      return {
        ...state,
        titleListStatus: true,
        titleListCode: action.payload.code,
        titleListData: action.payload.data,
        titleListPage: action.payload.page
      }
    case 'GET_TITLE_LIST_FAIL':
      return {
        ...state,
        titleListStatus: true,
        titleListCode: action.payload.code,
        titleListMessage: action.payload.message
      }
    case 'UPDATE_GET_TITLE_LIST_STATUS':
      return {
        ...state,
        titleListStatus: false
      }

    default:
      return state
  }
}
