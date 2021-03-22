export default function(state = {}, action) {
  switch (action.type) {
    case 'ADD_NEW_POSITION':
      return {
        ...state,
        addNewPositionStatus: true,
        addNewPositionCode: action.payload.code,
        addNewPositionMessage: action.payload.message,
        addNewPositionData: action.payload.data
      }
    case 'ADD_NEW_POSITION_FAIL':
      return {
        ...state,
        addNewPositionStatus: true,
        addNewPositionCode: action.payload.code,
        addNewPositionMessage: action.payload.message
      }
    case 'UPDATE_ADD_NEW_POSITION_STATUS':
      return {
        ...state,
        addNewPositionStatus: false
      }
    //获取初始化详情
    case 'GET_DETAIL_POSITION':
      return {
        ...state,
        getDetailPositionStatus: true,
        getDetailPositionCode: action.payload.code,
        getDetailPositionData: action.payload.data
      }
    case 'GET_DETAIL_POSITION_FAIL':
      return {
        ...state,
        getDetailPositionStatus: true,
        getDetailPositionCode: action.payload.code,
        getDetailPositionMessage: action.payload.message
      }
    case 'UPDATE_GET_DETAIL_POSITION_STATUS':
      return {
        ...state,
        getDetailPositionStatus: false
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
    // 获取所有职位
    case 'GET_ALL_POSITION':
      return {
        ...state,
        getAllPositionStatus: true,
        getAllPositionCode: action.payload.code,
        getAllPositionMessage: action.payload.message,
        getAllPositionData: action.payload.data
      }
    case 'GET_ALL_POSITION_FAIL':
      return {
        ...state,
        getAllPositionStatus: true,
        getAllPositionCode: action.payload.code,
        getAllPositionMessage: action.payload.message
      }
    case 'UPDATE_GET_ALL_POSITION_STATUS':
      return {
        ...state,
        getAllPositionStatus: false
      }
    case 'UPDATE_POSITION':
      return {
        ...state,
        updatePositionStatus: true,
        updatePositionCode: action.payload.code,
        updatePositionMessage: action.payload.message,
        updatePositionData: action.payload.data
      }
    case 'UPDATE_POSITION_FAIL':
      return {
        ...state,
        updatePositionStatus: true,
        updatePositionCode: action.payload.code,
        updatePositionMessage: action.payload.message
      }
    case 'UPDATE_UPDATE_POSITION_STATUS':
      return {
        ...state,
        updatePositionStatus: false
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
