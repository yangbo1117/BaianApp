export default function(state = {}, action) {
  switch (action.type) {
    //添加
    case 'ADD_NEW_JOB':
      return {
        ...state,
        addNewJobStatus: true,
        addNewJobCode: action.payload.code,
        addNewJobMessage: action.payload.message,
        addNewJobData: action.payload.data
      }
    case 'ADD_NEW_JOB_FAIL':
      return {
        ...state,
        addNewJobStatus: true,
        addNewJobCode: action.payload.code,
        addNewJobMessage: action.payload.message
      }
    case 'UPDATE_ADD_NEW_JOB_STATUS':
      return {
        ...state,
        addNewJobStatus: false
      }
    case 'UPDATE_JOB':
      return {
        ...state,
        updateJobStatus: true,
        updateJobCode: action.payload.code,
        updateJobMessage: action.payload.message,
        updateJobData: action.payload.data
      }
    case 'UPDATE_JOB_FAIL':
      return {
        ...state,
        updateJobStatus: true,
        updateJobCode: action.payload.code,
        updateJobMessage: action.payload.message
      }
    case 'UPDATE_UPDATE_JOB_STATUS':
      return {
        ...state,
        updateJobStatus: false
      }
    //获取初始化详情
    case 'GET_JOB_DETAIL':
      return {
        ...state,
        getDetailJobStatus: true,
        getDetailJobCode: action.payload.code,
        getDetailJobData: action.payload.data
      }
    case 'GET_JOB_DETAIL_FAIL':
      return {
        ...state,
        getDetailJobStatus: true,
        getDetailJobCode: action.payload.code,
        getDetailJobMessage: action.payload.message
      }
    case 'UPDATE_GET_JOB_DETAIL_STATUS':
      return {
        ...state,
        getDetailJobStatus: false
      }
    default:
      return state
  }
}
