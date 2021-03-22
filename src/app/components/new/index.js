import React, { Component } from 'react'
import {
  Form,
  Input,
  Button,
  Select,
  DatePicker,
  InputNumber,
  Checkbox,
  Switch,
  Radio,
  TreeSelect,
  Divider
} from 'antd'
import PicturesWall from '../uploadImage/'
import PropTypes from 'prop-types'
import './index.less'
import * as Util from '../../../util'
import Dialog from '../../../components/dialog'
import Toast from '../../../components/prompt/toast'
import Cascader from '../../components/cascader'
const FormItem = Form.Item
const RangePicker = DatePicker.RangePicker
const Option = Select.Option
const { TextArea } = Input
const RadioGroup = Radio.Group
const CheckboxGroup = Checkbox.Group
const TreeNode = TreeSelect.TreeNode

export default class New extends Component {
  constructor(props) {
    super(props)

    this._handelRegister = this._handelRegister.bind(this)
    this._getFields = this._getFields.bind(this)
    this._getFormItem = this._getFormItem.bind(this)
    this._checkErr = this._checkErr.bind(this)
    this._getTreeNode = this._getTreeNode.bind(this)
    this._getTextById = this._getTextById.bind(this)
    this._addedValue = {} //目的: 当表单类型为下拉表、树选择等时，除了传所需的ID，还要传相应的Text，传相应Text的一个集合对象

    this.state = {
      provinces: [],
      endDate: ''
    }
  }

  componentWillMount() {
    this.props.getCommonSelect && this.props.getCommonSelect()
  }

  //修复场景：isRequired元素点击保存后有错误提示，但是切换选项后该元素隐藏了，但是保存时依然还在错误范围内
  _checkErr(err, newData) {
    let errStatus = false
    let keys = (err && Object.keys(err)) || []
    keys.forEach(ele => {
      newData.forEach(item => {
        if (item.type === 'cascader') {
          item.linkage &&
            item.linkage.forEach(i => {
              if (i.id == ele && i.isRequired) {
                errStatus = true
              }
            })
        } else {
          if (item.id == ele && item.isRequired) {
            errStatus = true
          }
        }
      })
    })
    return errStatus
  }

  //遍历下拉表或者树选择里面的下拉值，取出对应的TEXT
  _getTextById(
    data,
    value,
    parameterName,
    idName = 'id',
    textName = 'text',
    childTreeNodeName = 'childTreeNode'
  ) {
    console.log(parameterName)
    data.map(item => {
      let parameter = !parameterName ? textName : parameterName
      if (item[idName] === value) {
        this._addedValue[parameter] = item[textName]
      } else if (
        childTreeNodeName &&
        item[childTreeNodeName] &&
        Array.isArray(item[childTreeNodeName]) &&
        item[childTreeNodeName].length > 0
      ) {
        this._getTextById(
          item[childTreeNodeName],
          value,
          parameter,
          idName,
          textName,
          childTreeNodeName
        )
      }
    })
  }

  _handelRegister(e, item) {
    e.preventDefault()
    //notCheck:是否校验表单，默认false，如果配置了按钮，并且该按钮指定notCheck，则直接执行定义的方法
    if (item && item.notCheck) {
      item.clickHandle ? item.clickHandle() : this.props.history.go(-1)
      return
    }
    let that = this
    this.props.form.validateFields((err, values) => {
      //用来记录一些非表格元素的非空校验状态
      that.props.newData &&
        that.props.newData.map(item => {
          if (
            (item.type === 'select' || item.type === 'TreeSelect') &&
            item.isRetrunText
          ) {
            //遍历下拉表或者树选择里面的下拉值，取出对应的TEXT
            that._getTextById(
              item.data,
              values[item.id],
              item.parameterName,
              item.idName,
              item.textName
            )
          } else if (item.type === 'cascader') {
            item.linkage &&
              item.linkage.map(i => {
                if (
                  (i.type === 'select' || i.type === 'TreeSelect') &&
                  i.isRetrunText
                ) {
                  //遍历下拉表或者树选择里面的下拉值，取出对应的TEXT
                  that._getTextById(
                    i.data,
                    values[i.id],
                    i.parameterName,
                    i.idName,
                    i.textName
                  )
                }
              })
          }
        })
      console.log(that._addedValue)
      Object.assign(values, that._addedValue)
      console.log(values)
      let errorStatus = false
      if (!this._checkErr(err, this.props.newData)) {
        let datas = this.props.newData
        if (datas) {
          try {
            datas.forEach(data => {
              //如果有CheckBox类型的且不是多选的，将true改成1，undefined改为0
              if (data.type === 'checkbox' && !data.multiple) {
                let value = values[data.id]
                values[data.id] = value ? 1 : 0
              }
              if (data.type === 'switch') {
                let value = values[data.id]
                values[data.id] = value ? 1 : 0
              }
              if (data.type === 'select') {
                let value = values[data.id]
                values[data.id] = value === 'undefined' ? undefined : value
              }
              if (data.type === 'uploadImg') {
                //上传图片组件，传值
                if (data.notNull && data.fileList.length == 0) {
                  errorStatus = true
                  Toast.show('请上传' + data.name)
                  new Error('StopIteration')
                  return
                }
                if (
                  data.uploadImgLimitNumber &&
                  data.uploadImgLimitNumber > 1
                ) {
                  values[data.id] = data.fileList || []
                } else {
                  values[data.id] =
                    (data.fileList[0] && data.fileList[0].url) || ''
                }
              }
              if (data.type === 'inputList') {
                let list = this.props.inputListConfig.listData || []
                list.forEach(item => {
                  if ((!item.url && item.name) || (!item.name && item.url)) {
                    errorStatus = true
                    Toast.show('请补充全景图数据')
                    new Error('StopIteration')
                    return
                  }
                  delete item.flag
                })
                let arry = []
                list.forEach((ele, index) => {
                  if (ele.url && ele.name) {
                    arry.push(ele)
                  }
                })
                values[data.id] = arry
              }
              if (data.type === 'rangedatepicker') {
                let arry = []
                values[data.id] &&
                  values[data.id].forEach((ele, index) => {
                    arry.push(Util.msToDate(new Date(ele)).withoutTime)
                  })
                values[data.id] = arry
              }
              if (
                data.isRequired &&
                ((!values[data.id] && values[data.id] !== 0) ||
                  values[data.id].length == 0)
              ) {
                errorStatus = true
                Toast.show(data.name + '不能为空')
                new Error('StopIteration')
                return
              }
            })
          } catch (e) {
            console.log(e.message)
            if (e.message === 'foreach is not defined') {
              console.log('跳出forEach循环') //
              return
            } else throw e
          }
        }
        if (errorStatus) {
          return
        }
        //如果是默认的按钮配置，则直接执行父组件的addNew函数（在父组件redux调接口）
        if (!this.props.actionButtons || this.props.actionButtons === 0) {
          this.props.addNew(values)
          return
        }
        //如果按钮是定制的则执行按钮定制的方法
        if (item) {
          values.id = this.props.detailData ? this.props.detailData.id : ''
          if (item.submitAlertInfo) {
            Dialog.open({
              message: '',
              showInputSelect: [
                {
                  type: 'detail',
                  className: 'sure-text',
                  id: 'sureText',
                  value: item.submitAlertInfo.mainText
                },
                {
                  type: 'detail',
                  className: 'sure-info',
                  id: 'sureInfo',
                  value: item.submitAlertInfo.secondText
                }
              ],
              dialogButton: [
                {
                  text: '取消',
                  clickHandle: () => {
                    Dialog.close()
                    return
                  }
                },
                {
                  text: '确定',
                  type: 'primary',
                  clickHandle: () => {
                    Dialog.close()
                    //执行父组件的addNew函数（在父组件redux调接口）
                    item.clickHandle(values)
                    return
                  }
                }
              ]
            })
          } else {
            item.clickHandle(values)
          }
        }
      }
    })
  }

  _getTreeNode(
    data,
    id = 'id',
    name = 'name',
    childTreeNodeName = 'childTreeNode'
  ) {
    return (
      data &&
      data.length > 0 &&
      data.map(item => {
        if (Util.isNotNull(item[childTreeNodeName])) {
          return (
            <TreeNode value={item[id]} title={item[name]} key={item[id]}>
              {this._getTreeNode(
                item[childTreeNodeName],
                id,
                name,
                childTreeNodeName
              )}
            </TreeNode>
          )
        }
        return <TreeNode value={item[id]} title={item[name]} key={item[id]} />
      })
    )
  }

  _getFormItem(option) {
    switch (option.type) {
      case 'select':
        return (
          <Select
            mode={option.mode}
            disabled={option.disabled}
            className={'select'}
            onChange={option.onChange ? option.onChange : null}
            onSearch={option.onSearch ? option.onSearch : null}
            onBlur={option.onBlur ? option.onBlur : null}
            placeholder={option.placeholder}
            showArrow={option.showArrow}
            onFocus={option.onFocus ? option.onFocus : null}
          >
            {option.isHidePleaseSelect ? null : (
              <Option key="undefined" value="undefined">
                请选择
              </Option>
            )}
            {option.data &&
              option.data.map((item, key) => {
                return (
                  /*通用管理/明星工地/城市，筛选条件需要用code查询*/
                  <Option
                    key={key}
                    value={item.id || item.id === 0 ? item.id : item.code}
                  >
                    {item.name}
                  </Option>
                )
              })}
          </Select>
        )
      case 'datepicker':
        return <DatePicker disabled={option.disabled} format="YYYY-MM-DD" />
      case 'rangedatepicker':
        return <RangePicker disabled={option.disabled} format="YYYY-MM-DD" />
      case 'switch':
        return (
          <Switch
            disabled={option.disabled}
            checkedChildren="是"
            unCheckedChildren="否"
          />
        )
      case 'textarea':
        return (
          <TextArea
            maxLength={option.maxlength}
            disabled={option.disabled}
            cols={30}
            rows={4}
          />
        )
      case 'number':
        return (
          <InputNumber
            disabled={option.disabled}
            min={option.min}
            max={option.max}
            formatter={option.formatter}
            parser={option.parse}
          />
        )
      case 'checkbox':
        return (
          <CheckboxGroup
            disabled={option.disabled}
            className={option.className}
          >
            {option.data &&
              option.data.map((item, key) => (
                <Checkbox key={key} value={item.id}>
                  {item.name}
                </Checkbox>
              ))}
          </CheckboxGroup>
        )
      case 'uploadImg':
        return (
          <PicturesWall
            disabled={option.disabled}
            id={option.id}
            className={(option.isHide ? 'hide' : '') + (' ' + option.className)}
            fileList={option.fileList || []}
            getQiniuToken={this.props.getQiniuToken}
            QiniuCallBack={this.props.QiniuCallBack}
            imgDesc={option.imgDesc} //图片说明
            isVideoUpload={option.isVideoUpload} // 是否是 上传视频类型
            uploadImgLimitNumber={option.uploadImgLimitNumber} //允许上传图片的张数
            fileSizeLimit={option.fileSizeLimit} //上传图片的size限制
            removeImgFun={this.props.removeImgFun} //删除图片
            //下面是自定义的照片墙需要的参数
            isUploadDefine={option.isUploadDefine} //是否是自定义的照片墙
            sortImgFun={this.props.sortImgFun} //自定义照片墙排序
            beforeUpload={option.onChange || null} //限制用户上传的图片格式和大小。
          />
        )
      case 'radio':
        return (
          <RadioGroup
            disabled={option.disabled}
            name={option.id}
            onChange={option.onChange}
          >
            {option.data &&
              option.data.map((item, key) => (
                <Radio key={key} disabled={item.disabled} value={item.id}>
                  {item.name}
                </Radio>
              ))}
          </RadioGroup>
        )
      case 'button':
        return <Button type={option.btnType}>{option.data.name}</Button>
      case 'TreeSelect':
        if (option && option.data && option.data.length > 0) {
          return (
            <TreeSelect placeholder="请选择" allowClear>
              {this._getTreeNode(
                option.data,
                option.idName,
                option.textName,
                option.childTreeNodeName
              )}
            </TreeSelect>
          )
          break
        }

      default:
        return (
          <Input
            disabled={option.disabled}
            maxLength={option.maxlength}
            placeholder={option.placeholder}
            onBlur={option.onChange}
            type={option.type === 'password' ? 'password' : ''}
          />
        )
    }
  }

  _getFields() {
    const { getFieldDecorator } = this.props.form
    const that = this
    return that.props.newData.map((option, i) => {
      if (option.type === 'divider') {
        return (
          <Divider key={i} dashed orientation="left">
            <span style={{ color: 'blue' }}>{option.text}</span>
          </Divider>
        )
      }
      if (option.isHide === 'true') {
        //隐藏的条目
        return <div key={i} style={{ display: 'none' }} />
      } else if (option.type === 'cascader') {
        return (
          //将父组件的form传递给子组件，共用一个form控件
          <Cascader
            data={option.linkage}
            key={i}
            form={that.props.form}
            handleChange={this.props.handleChange}
          />
        )
      } else {
        let decoratorRules =
          option.type === 'switch'
            ? {
                valuePropName: 'checked',
                initialValue: option.initialValue
              }
            : {
                rules: [
                  {
                    required: option.isRequired,
                    message: '不能为空！'
                  }
                ],
                initialValue: option.initialValue
              }
        return (
          <FormItem label={option.name} key={i}>
            {getFieldDecorator(`${option.id}`, decoratorRules)(
              that._getFormItem(option)
            )}
          </FormItem>
        )
      }
    })
  }

  //默认一个提交按钮，一个取消按钮，且提交按钮submit，如果定义多个按钮，按钮都要执行表单校验后再通过触发的按钮标识来调用不同的方法
  _renderButtons() {
    let id = Util.getUrlArg('id')
    if (this.props.actionButtons && this.props.actionButtons.length) {
      return this.props.actionButtons.map((item, i) => {
        if (item.id === 'save_redirect' && id) {
          return
        } else {
          return (
            <Button
              id={item.actionId}
              type={item.type}
              key={i}
              className={item.className ? item.className : 'btn'}
              onClick={e => this._handelRegister(e, item)}
            >
              {item.text}
            </Button>
          )
        }
      })
    } else {
      return (
        <div>
          {this.props.isHideSubmit === true ? (
            ''
          ) : (
            <Button type="primary" htmlType="submit">
              提交
            </Button>
          )}
          <Button
            className="reset"
            onClick={() => {
              this.props.history.goBack()
            }}
          >
            返回
          </Button>
        </div>
      )
    }
  }

  render() {
    // 默认是展示一个提交按钮，一个取消按钮，提交按钮的默认方法指向_handelRegister，取消则默认返回前一页，如果有多个按钮，则为每个按钮配置方法
    return (
      <Form
        layout={'inline'}
        className={'new-form'}
        onSubmit={
          this.props.actionButtons && this.props.actionButtons.length
            ? null
            : this._handelRegister
        }
      >
        {/*此处动态生成表单域*/}
        {this._getFields()}
        <div className="btnItem">
          {this._renderButtons()}
          {this.props.buttonsDesc ? (
            <div style={{ color: '#999999' }}>{this.props.buttonsDesc}</div>
          ) : (
            ''
          )}
        </div>
      </Form>
    )
  }
}

New.propTypes = {
  newData: PropTypes.arrayOf(PropTypes.object),
  addNew: PropTypes.func,
  history: PropTypes.object,
  actionButtons: PropTypes.arrayOf(PropTypes.object)
}

/*如果没有配置actionButtons,则默认组件的提交和取消按钮，此时必须传addNew方法
 * actionButtons-》object-》info
 * text:'按钮名称'-必须
 * id:'按钮标识'-非必须
 * notCheck:'提交前不校验表单数据 默认false'
 * actionSubmitAlert:'提交前是否需要进行弹窗提示 默认false'
 * submitAlertInfo:'弹窗提示语，包含两条文字'
 * clickHandle:'按钮对应的执行方法'
 * */
