export default function(state = {}, action) {
  switch (action.type) {
    case 'GET_EMPLOYEE_POSITION_LIST':
      return {
        ...state,
        employeePositionListStatus: true,
        employeePositionListCode: action.payload.code,
        employeePositionListData: action.payload.data,
        employeePositionListPage: action.payload.page,
        employeePositionListMessage: action.payload.message
      }
    case 'GET_EMPLOYEE_POSITION_LIST_FAIL':
      return {
        ...state,
        employeePositionListStatus: true,
        employeePositionListCode: action.payload.code,
        employeePositionListMessage: action.payload.message
      }
    case 'UPDATE_GET_EMPLOYEE_POSITION_LIST_STATUS':
      return {
        ...state,
        employeePositionListStatus: false
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
    default:
      return state
  }
}
