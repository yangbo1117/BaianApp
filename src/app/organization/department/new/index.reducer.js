export default function(state = {}, action) {
  switch (action.type) {
    case 'ADD_NEW_DEPARTMENT':
      return {
        ...state,
        addNewDepartmentStatus: true,
        addNewDepartmentCode: action.payload.code,
        addNewDepartmentMessage: action.payload.message,
        addNewDepartmentData: action.payload.data
      }
    case 'ADD_NEW_DEPARTMENT_FAIL':
      return {
        ...state,
        addNewDepartmentStatus: true,
        addNewDepartmentCode: action.payload.code,
        addNewDepartmentMessage: action.payload.message
      }
    case 'UPDATE_ADD_NEW_DEPARTMENT_STATUS':
      return {
        ...state,
        addNewDepartmentStatus: false
      }
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
    //获取初始化详情
    case 'GET_DETAIL_DEPARTMENT':
      return {
        ...state,
        getDetailDepartmentStatus: true,
        getDetailDepartmentCode: action.payload.code,
        getDetailDepartmentData: action.payload.data
      }
    case 'GET_DETAIL_DEPARTMENT_FAIL':
      return {
        ...state,
        getDetailDepartmentStatus: true,
        getDetailDepartmentCode: action.payload.code,
        getDetailDepartmentMessage: action.payload.message
      }
    case 'UPDATE_GET_DETAIL_DEPARTMENT_STATUS':
      return {
        ...state,
        getDetailDepartmentStatus: false
      }

    //更新
    case 'UPDATE_DEPARTMENT':
      return {
        ...state,
        updateDepartmentStatus: true,
        updateDepartmentCode: action.payload.code,
        updateDepartmentData: action.payload.data
      }
    case 'UPDATE_DEPARTMENT_FAIL':
      return {
        ...state,
        updateDepartmentStatus: true,
        updateDepartmentCode: action.payload.code,
        updateDepartmentMessage: action.payload.message
      }
    case 'UPDATE_UPDATE_DEPARTMENT_STATUS':
      return {
        ...state,
        updateDepartmentStatus: false
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

      case 'GET_SHOP_LIST':
      return {
        ...state,
        shopListStatus: true,
        shopListCode: action.payload.code,
        shopListData: action.payload.data,
        shopListPage: action.payload.page
      }
    case 'GET_SHOP_LIST_FAIL':
      return {
        ...state,
        shopListStatus: true,
        shopListCode: action.payload.code,
        shopListMessage: action.payload.message
      }
    case 'UPDATE_GET_SHOP_LIST_STATUS':
      return {
        ...state,
        shopListStatus: false
      }

    case 'GET_PROVINCE':
      return {
        ...state,
        getProvinceStatus: true,
        getProvinceCode: action.payload.code,
        getProvinceMessage: action.payload.message,
        getProvinceData: action.payload.data
      }

    case 'GET_PROVINCE_FAIL':
      return {
        ...state,
        getProvinceStatus: true,
        getProvinceCode: action.payload.code,
        getProvinceMessage: action.payload.message
      }

    case 'UPDATE_GET_PROVINCE_STATUS':
      return {
        ...state,
        getProvinceStatus: false
      }

    case 'GET_CITY':
      return {
        ...state,
        getCityStatus: true,
        getCityCode: action.payload.code,
        getCityMessage: action.payload.message,
        getCityData: action.payload.data
      }

    case 'GET_CITY_FAIL':
      return {
        ...state,
        getCityStatus: true,
        getCityCode: action.payload.code,
        getCityMessage: action.payload.message
      }

    case 'UPDATE_GET_CITY_STATUS':
      return {
        ...state,
        getCityStatus: false
      }
    case 'GET_DISTRICT':
      return {
        ...state,
        getDistrictStatus: true,
        getDistrictCode: action.payload.code,
        getDistrictMessage: action.payload.message,
        getDistrictData: action.payload.data
      }
    case 'GET_DISTRICT_FAIL':
      return {
        ...state,
        getDistrictStatus: true,
        getDistrictCode: action.payload.code,
        getDistrictMessage: action.payload.message
      }
    case 'UPDATE_GET_DISTRICT_STATUS':
      return {
        ...state,
        getDistrictStatus: false
      }
    default:
      return state
  }
}
