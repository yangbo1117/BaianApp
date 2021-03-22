//添加
export let addNewTitle = argus => {
  return {
    type: 'ADD_NEW_TITLE',
    payload: {
      url: '/title/add',
      type: 'post',
      isContent: true,
      param: {
        ...argus
      }
    }
  }
}

export let updateAddNewTitleStatus = () => {
  return {
    type: 'UPDATE_ADD_NEW_TITLE_STATUS'
  }
}

//修改
export let updateTitle = argus => {
  return {
    type: 'UPDATE_TITLE',
    payload: {
      url: '/title/update',
      type: 'post',
      isContent: true,
      param: {
        ...argus
      }
    }
  }
}

export let updateUpdateTitleStatus = () => {
  return {
    type: 'UPDATE_UPDATE_TITLE_STATUS'
  }
}

//获取详情
export let getTitleDetail = argus => {
  return {
    type: 'GET_TITLE_DETAIL',
    payload: {
      url: '/title/detail',
      type: 'get',
      param: {
        ...argus
      }
    }
  }
}
export let updateGetTitleDetailStatus = () => {
  return {
    type: 'UPDATE_GET_TITLE_DETAIL_STATUS'
  }
}
