export default function(state = {}, action) {
  switch (action.type) {
    case 'GET_JOB_LIST':
      return {
        ...state,
        jobListStatus: true,
        jobListCode: action.payload.code,
        jobListData: action.payload.data,
        jobListPage: action.payload.page
      }
    case 'GET_JOB_LIST_FAIL':
      return {
        ...state,
        jobListStatus: true,
        jobListCode: action.payload.code,
        jobListMessage: action.payload.message
      }
    case 'UPDATE_GET_JOB_LIST_STATUS':
      return {
        ...state,
        jobListStatus: false
      }

    default:
      return state
  }
}
