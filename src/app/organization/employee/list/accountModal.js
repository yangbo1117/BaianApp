import React,{Component} from 'react'
import { Input, Modal } from "antd";
import sha1 from "js-sha1";

export default class UserModal extends Component{

  render() {
    return <Modal
      title={this.props.modalTitle}
      visible={this.props.visibleUserModal}
      onOk={() =>
        this.props.createAccount()
      }
      onCancel={() => {
        this.props.onCancle()
      }}
    >
      {this.props.type === 'create' && <p>
        是否创建用户名为：{this.props.userName}{' '}
        ，密码默认为：1234@abc的账号（密码可以修改）?
      </p>}
      <div className="creatAccountPaasword">
        密码：
        <Input
          type="text"
          placehoder="请输入密码"
          value={this.props.password}
          id="password"
          onChange={e => this.props.onChange(e)}
        />
      </div>
    </Modal>
  }
}