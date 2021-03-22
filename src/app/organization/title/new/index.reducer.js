export default function(state = {}, action) {
  switch (action.type) {
    //添加
    case 'ADD_NEW_TITLE':
      return {
        ...state,
        addNewTitleStatus: true,
        addNewTitleCode: action.payload.code,
        addNewTitleMessage: action.payload.message,
        addNewTitleData: action.payload.data
      }
    case 'ADD_NEW_TITLE_FAIL':
      return {
        ...state,
        addNewTitleStatus: true,
        addNewTitleCode: action.payload.code,
        addNewTitleMessage: action.payload.message
      }
    case 'UPDATE_ADD_NEW_TITLE_STATUS':
      return {
        ...state,
        addNewTitleStatus: false
      }
    case 'UPDATE_TITLE':
      return {
        ...state,
        updateTitleStatus: true,
        updateTitleCode: action.payload.code,
        updateTitleMessage: action.payload.message,
        updateTitleData: action.payload.data
      }
    case 'UPDATE_TITLE_FAIL':
      return {
        ...state,
        updateTitleStatus: true,
        updateTitleCode: action.payload.code,
        updateTitleMessage: action.payload.message
      }
    case 'UPDATE_UPDATE_TITLE_STATUS':
      return {
        ...state,
        updateTitleStatus: false
      }
    //获取初始化详情
    case 'GET_TITLE_DETAIL':
      return {
        ...state,
        getDetailTitleStatus: true,
        getDetailTitleCode: action.payload.code,
        getDetailTitleData: action.payload.data
      }
    case 'GET_TITLE_DETAIL_FAIL':
      return {
        ...state,
        getDetailTitleStatus: true,
        getDetailTitleCode: action.payload.code,
        getDetailTitleMessage: action.payload.message
      }
    case 'UPDATE_GET_TITLE_DETAIL_STATUS':
      return {
        ...state,
        getDetailTitleStatus: false
      }
    default:
      return state
  }
}
