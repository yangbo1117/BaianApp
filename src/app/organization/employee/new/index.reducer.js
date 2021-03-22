export default function(state = {}, action) {
  switch (action.type) {
    case 'ADD_NEW_EMPLOYEE':
      return {
        ...state,
        addNewEmployeeStatus: true,
        addNewEmployeeCode: action.payload.code,
        addNewEmployeeMessage: action.payload.message,
        addNewEmployeeData: action.payload.data
      }
    case 'ADD_NEW_EMPLOYEE_FAIL':
      return {
        ...state,
        addNewEmployeeStatus: true,
        addNewEmployeeCode: action.payload.code,
        addNewEmployeeMessage: action.payload.message
      }
    case 'UPDATE_ADD_NEW_EMPLOYEE_STATUS':
      return {
        ...state,
        addNewEmployeeStatus: false
      }
    //获取详情
    case 'GET_DETAIL_EMPLOYEE':
      return {
        ...state,
        getDetailEmployeeStatus: true,
        getDetailEmployeeCode: action.payload.code,
        getDetailEmployeeData: action.payload.data
      }
    case 'GET_DETAIL_EMPLOYEE_FAIL':
      return {
        ...state,
        getDetailEmployeeStatus: true,
        getDetailEmployeeCode: action.payload.code,
        getDetailEmployeeMessage: action.payload.message
      }
    case 'UPDATE_GET_DETAIL_EMPLOYEE_STATUS':
      return {
        ...state,
        getDetailEmployeeStatus: false
      }
    //更新
    case 'UPDATE_EMPLOYEE':
      return {
        ...state,
        updateEmployeeStatus: true,
        updateEmployeeCode: action.payload.code,
        updateEmployeeData: action.payload.data
      }
    case 'UPDATE_EMPLOYEE_FAIL':
      return {
        ...state,
        updateEmployeeStatus: true,
        updateEmployeeCode: action.payload.code,
        updateEmployeeMessage: action.payload.message
      }
    case 'UPDATE_UPDATE_EMPLOYEE_STATUS':
      return {
        ...state,
        updateEmployeeStatus: false
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

    case 'GET_ALL_TITLE':
      return {
        ...state,
        getAllTitleStatus: true,
        getAllTitleCode: action.payload.code,
        getAllTitleMessage: action.payload.message,
        getAllTitleData: action.payload.data
      }
    case 'GET_ALL_TITLE_FAIL':
      return {
        ...state,
        getAllTitleStatus: true,
        getAllTitleCode: action.payload.code,
        getAllTitleMessage: action.payload.message
      }
    case 'UPDATE_GET_ALL_TITLE_STATUS':
      return {
        ...state,
        getAllTitleStatus: false
      }
    case 'GET_EMPLOYEE_TYPE':
      return {
        ...state,
        employeeTypeStatus: true,
        employeeTypeData: action.payload.data,
        employeeTypeCode: action.payload.code,
        employeeTypeMessage: action.payload.message
      }
    case 'GET_EMPLOYEE_TYPE_FAIL':
      return {
        ...state,
        employeeTypeStatus: true,
        employeeTypeCode: action.payload.code,
        employeeTypeMessage: action.payload.message
      }
    case 'UPDATE_GET_EMPLOYEE_TYPE_STATUS':
      return {
        ...state,
        employeeTypeStatus: false
      }
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
