export let getEmployeeList = argus => {
  return {
    type: 'GET_EMPLOYEE_LIST',
    payload: {
      url: '/employee/list',
      type: 'get',
      param: {
        ...argus
      }
    }
  }
}

export let updateEmployeeListStatus = () => {
  return {
    type: 'UPDATE_GET_EMPLOYEE_LIST_STATUS'
  }
}

export let getEmployeeType = () => {
  return {
    type: 'GET_EMPLOYEE_TYPE',
    payload: {
      url: '/employee/getEmployeeType',
      type: 'get'
    }
  }
}

export let updateGetEmployeeTypeStatus = () => {
  return {
    type: 'UPDATE_GET_EMPLOYEE_TYPE_STATUS'
  }
}



export let createAccount = (argus) => {
  return {
    type: 'CREATE_ACCOUNT',
    payload: {
      url: '/employee/addAccount',
      type: 'get',
      param: {
        ...argus
      }
    }
  }
}

export let updateCreateAccountStatus = () => {
  return {
    type: 'UPDATE_CREATE_ACCOUNT_STATUS'
  }
}
export let getCompanyList = argus => {
  return {
    type: 'GET_COMPANY_LIST',
    payload: {
      url: '/company/list',
      type: 'get',
      param: {
        ...argus
      }
    }
  }
}

export let updateCompanyListStatus = () => {
  return {
    type: 'UPDATE_GET_COMPANY_LIST_STATUS'
  }
}

export let updatePassword = (argus) => {
  return {
    type: 'UPDATE_PASSWORD',
    payload: {
      url: '/employee/resetPassword',
      type: 'get',
      param: {
        ...argus
      }
    }
  }
}

export let updateUpdatePasswordStatus = () => {
  return {
    type: 'UPDATE_UPDATE_PASSWORD_STATUS'
  }
}