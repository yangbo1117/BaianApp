export default function(state = {}, action) {
  switch (action.type) {
    case "GET_EMPLOYEE_LIST":
      return {
        ...state,
        employeeListStatus: true,
        employeeListCode: action.payload.code,
        employeeListData: action.payload.data,
        employeeListPage: action.payload.page,
        employeeListMessage: action.payload.message
      };
    case "GET_EMPLOYEE_LIST_FAIL":
      return {
        ...state,
        employeeListStatus: true,
        employeeListCode: action.payload.code,
        employeeListMessage: action.payload.message
      };
    case "UPDATE_GET_EMPLOYEE_LIST_STATUS":
      return {
        ...state,
        employeeListStatus: false
      };
    case "GET_EMPLOYEE_TYPE":
      return {
        ...state,
        employeeTypeStatus: true,
        employeeTypeData: action.payload.data,
        employeeTypeCode: action.payload.code,
        employeeTypeMessage: action.payload.message
      };
    case "GET_EMPLOYEE_TYPE_FAIL":
      return {
        ...state,
        employeeTypeStatus: true,
        employeeTypeCode: action.payload.code,
        employeeTypeMessage: action.payload.message
      };
    case "UPDATE_GET_EMPLOYEE_TYPE_STATUS":
      return {
        ...state,
        employeeTypeStatus: false
      };
    case "CREATE_ACCOUNT":
      return {
        ...state,
        createAccountStatus: true,
        createAccountData: action.payload.data,
        createAccountCode: action.payload.code,
        createAccountMessage: action.payload.message
      };
    case "CREATE_ACCOUNT_FAIL":
      return {
        ...state,
        createAccountStatus: true,
        createAccountCode: action.payload.code,
        createAccountMessage: action.payload.message
      };
    case "UPDATE_CREATE_ACCOUNT_STATUS":
      return {
        ...state,
        createAccountStatus: false
      };
    case "GET_COMPANY_LIST":
      return {
        ...state,
        companyListStatus: true,
        companyListCode: action.payload.code,
        companyListData: action.payload.data,
        companyListPage: action.payload.page
      };
    case "GET_COMPANY_LIST_FAIL":
      return {
        ...state,
        companyListStatus: true,
        companyListCode: action.payload.code,
        companyListMessage: action.payload.message
      };
    case "UPDATE_GET_COMPANY_LIST_STATUS":
      return {
        ...state,
        companyListStatus: false
      };
    case "UPDATE_PASSWORD":
      return {
        ...state,
        updatePasswordStatus: true,
        updatePasswordData: action.payload.data,
        updatePasswordCode: action.payload.code,
        updatePasswordMessage: action.payload.message
      };
    case "UPDATE_PASSWORD_FAIL":
      return {
        ...state,
        updatePasswordStatus: true,
        updatePasswordCode: action.payload.code,
        updatePasswordMessage: action.payload.message
      };
    case "UPDATE_UPDATE_PASSWORD_STATUS":
      return {
        ...state,
        updatePasswordStatus: false
      };
    default:
      return state;
  }
}
