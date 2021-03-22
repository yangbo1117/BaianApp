export default function(state = {}, action) {
  switch (action.type) {
    case 'GET_DEPARTMENT_LIST':
      return {
        ...state,
        departmentListStatus: true,
        departmentListCode: action.payload.code,
        departmentListData: action.payload.data,
        departmentListPage: action.payload.page,
        departmentListMessage: action.payload.message
      }
    case 'GET_DEPARTMENT_LIST_FAIL':
      return {
        ...state,
        departmentListStatus: true,
        departmentListCode: action.payload.code,
        departmentListMessage: action.payload.message
      }
    case 'UPDATE_GET_DEPARTMENT_LIST_STATUS':
      return {
        ...state,
        departmentListStatus: false
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
    default:
      return state
  }
}
