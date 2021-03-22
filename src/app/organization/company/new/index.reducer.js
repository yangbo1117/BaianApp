export default function(state = {}, action) {
  switch (action.type) {
    //添加
    case 'ADD_NEW_COMPANY':
      return {
        ...state,
        addNewCompanyStatus: true,
        addNewCompanyCode: action.payload.code,
        addNewCompanyMessage: action.payload.message,
        addNewCompanyData: action.payload.data
      }
    case 'ADD_NEW_COMPANY_FAIL':
      return {
        ...state,
        addNewCompanyStatus: true,
        addNewCompanyCode: action.payload.code,
        addNewCompanyMessage: action.payload.message
      }
    case 'UPDATE_ADD_NEW_COMPANY_STATUS':
      return {
        ...state,
        addNewCompanyStatus: false
      }
    case 'UPDATE_COMPANY':
      return {
        ...state,
        updateCompanyStatus: true,
        updateCompanyCode: action.payload.code,
        updateCompanyMessage: action.payload.message,
        updateCompanyData: action.payload.data
      }
    case 'UPDATE_COMPANY_FAIL':
      return {
        ...state,
        updateCompanyStatus: true,
        updateCompanyCode: action.payload.code,
        updateCompanyMessage: action.payload.message
      }
    case 'UPDATE_UPDATE_COMPANY_STATUS':
      return {
        ...state,
        updateCompanyStatus: false
      }
    //获取初始化详情
    case 'GET_COMPANY_DETAIL':
      return {
        ...state,
        getDetailCompanyStatus: true,
        getDetailCompanyCode: action.payload.code,
        getDetailCompanyData: action.payload.data
      }
    case 'GET_COMPANY_DETAIL_FAIL':
      return {
        ...state,
        getDetailCompanyStatus: true,
        getDetailCompanyCode: action.payload.code,
        getDetailCompanyMessage: action.payload.message
      }
    case 'UPDATE_GET_COMPANY_DETAIL_STATUS':
      return {
        ...state,
        getDetailCompanyStatus: false
      }
      case 'GET_PROVINCE':
      return {
        ...state,
        getProvinceStatus: true,
        getProvinceCode: action.payload.code,
        getProvinceMessage: action.payload.message,
        getProvinceData: action.payload.data
      }
      break;
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
