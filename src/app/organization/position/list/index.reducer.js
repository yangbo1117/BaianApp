export default function(state = {}, action) {
  switch (action.type) {
    case 'GET_POSITION_LIST':
      return {
        ...state,
        positionListStatus: true,
        positionListCode: action.payload.code,
        positionListData: action.payload.data,
        positionListPage: action.payload.page
      }
    case 'GET_POSITION_LIST_FAIL':
      return {
        ...state,
        positionListStatus: true,
        positionListCode: action.payload.code,
        positionListMessage: action.payload.message
      }
    case 'UPDATE_GET_POSITION_LIST_STATUS':
      return {
        ...state,
        positionListStatus: false
      }
    // 获取所有部门
    case 'GET_ALL_DEPARTMENT':
      return {
        ...state,
        getAllDepartmentStatus: true,
        getAllDepartmentCode: action.payload.code,
        getAllDepartmentMessage: action.payload.message,
        getAllDepartmentData: action.payload.data
      }
    case 'GET_ALL_DEPARTMENT_FAIL':
      return {
        ...state,
        getAllDepartmentStatus: true,
        getAllDepartmentCode: action.payload.code,
        getAllDepartmentMessage: action.payload.message
      }
    case 'UPDATE_GET_ALL_DEPARTMENT_STATUS':
      return {
        ...state,
        getAllDepartmentStatus: false
      }
    //获取所有职务
    case 'GET_ALL_JOB':
      return {
        ...state,
        getAllJobStatus: true,
        getAllJobCode: action.payload.code,
        getAllJobMessage: action.payload.message,
        getAllJobData: action.payload.data
      }
    case 'GET_ALL_JOB_FAIL':
      return {
        ...state,
        getAllJobStatus: true,
        getAllJobCode: action.payload.code,
        getAllJobMessage: action.payload.message
      }
    case 'UPDATE_GET_ALL_JOB_STATUS':
      return {
        ...state,
        getAllJobStatus: false
      }
    //获取职位状态
    case 'GET_POSITION_STATE':
      return {
        ...state,
        getPositionStateStatus: true,
        getPositionStateCode: action.payload.code,
        getPositionStateData: action.payload.data,
        getPositionStateMessage: action.payload.message
      }
    case 'GET_POSITION_STATE_FAIL':
      return {
        ...state,
        getPositionStateStatus: true,
        getPositionStateCode: action.payload.code,
        getPositionStateMessage: action.payload.message
      }
    case 'UPDATE_GET_POSITION_STATE_STATUS':
      return {
        ...state,
        getPositionStateStatus: false
      }
    default:
      return state
  }
}
