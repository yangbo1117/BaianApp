export default function(state = {}, action) {
  switch (action.type) {
    case 'ADD_NEW_EMPLOYEE_POSITION':
      return {
        ...state,
        addNewEmployeePositionStatus: true,
        addNewEmployeePositionCode: action.payload.code,
        addNewEmployeePositionMessage: action.payload.message,
        addNewEmployeePositionData: action.payload.data
      }
    case 'ADD_NEW_EMPLOYEE_POSITION_FAIL':
      return {
        ...state,
        addNewEmployeePositionStatus: true,
        addNewEmployeePositionCode: action.payload.code,
        addNewEmployeePositionMessage: action.payload.message
      }
    case 'UPDATE_ADD_NEW_EMPLOYEE_POSITION_STATUS':
      return {
        ...state,
        addNewEmployeePositionStatus: false
      }
    //获取详情
    case 'GET_DETAIL_EMPLOYEE_POSITION':
      return {
        ...state,
        getDetailEmployeePositionStatus: true,
        getDetailEmployeePositionCode: action.payload.code,
        getDetailEmployeePositionData: action.payload.data
      }
    case 'GET_DETAIL_EMPLOYEE_POSITION_FAIL':
      return {
        ...state,
        getDetailEmployeePositionStatus: true,
        getDetailEmployeePositionCode: action.payload.code,
        getDetailEmployeePositionMessage: action.payload.message
      }
    case 'UPDATE_GET_DETAIL_EMPLOYEE_POSITION_STATUS':
      return {
        ...state,
        getDetailEmployeePositionStatus: false
      }
    //更新
    case 'UPDATE_EMPLOYEE_POSITION':
      return {
        ...state,
        updateEmployeePositionStatus: true,
        updateEmployeePositionCode: action.payload.code,
        updateEmployeePositionData: action.payload.data
      }
    case 'UPDATE_EMPLOYEE_POSITION_FAIL':
      return {
        ...state,
        updateEmployeePositionStatus: true,
        updateEmployeePositionCode: action.payload.code,
        updateEmployeePositionMessage: action.payload.message
      }
    case 'UPDATE_UPDATE_EMPLOYEE_POSITION_STATUS':
      return {
        ...state,
        updateEmployeePositionStatus: false
      }
    //获取所有部门
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

    case 'GET_TITLE_BY_POSITION':
      return {
        ...state,
        getTitleByPositionStatus: true,
        getTitleByPositionCode: action.payload.code,
        getTitleByPositionMessage: action.payload.message,
        getTitleByPositionData: action.payload.data
      }
    case 'GET_TITLE_BY_POSITION_FAIL':
      return {
        ...state,
        getTitleByPositionStatus: true,
        getTitleByPositionCode: action.payload.code,
        getTitleByPositionMessage: action.payload.message
      }
    case 'UPDATE_GET_TITLE_BY_POSITION_STATUS':
      return {
        ...state,
        getTitleByPositionStatus: false
      }
    //获取关联职位
    case 'GET_RELATIVE_EMPLOYEE_POSITION_LIST':
      return {
        ...state,
        relativeEmployeePositionListStatus: true,
        relativeEmployeePositionListCode: action.payload.code,
        relativeEmployeePositionListData: action.payload.data,
        relativeEmployeePositionListPage: action.payload.page,
        relativeEmployeePositionListMessage: action.payload.message
      }
    case 'GET_RELATIVE_EMPLOYEE_POSITION_LIST_FAIL':
      return {
        ...state,
        relativeEmployeePositionListStatus: true,
        relativeEmployeePositionListCode: action.payload.code,
        relativeEmployeePositionListMessage: action.payload.message
      }
    case 'UPDATE_GET_RELATIVE_EMPLOYEE_POSITION_LIST_STATUS':
      return {
        ...state,
        relativeEmployeePositionListStatus: false
      }
    //删除关联职位
    case 'DELETE_EMPLOYEE_POSITION':
      return {
        ...state,
        deleteEmployeePositionStatus: true,
        deleteEmployeePositionCode: action.payload.code,
        deleteEmployeePositionData: action.payload.data,
        deleteEmployeePositionPage: action.payload.page,
        deleteEmployeePositionMessage: action.payload.message
      }
    case 'DELETE_EMPLOYEE_POSITION_FAIL':
      return {
        ...state,
        deleteEmployeePositionStatus: true,
        deleteEmployeePositionCode: action.payload.code,
        deleteEmployeePositionMessage: action.payload.message
      }
    case 'UPDATE_DELETE_EMPLOYEE_POSITION_STATUS':
      return {
        ...state,
        deleteEmployeePositionStatus: false
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
