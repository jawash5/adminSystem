import React, { Component } from 'react'
import { Form, Input, Select } from 'antd'
import PropTypes from 'prop-types'

const Item = Form.Item
const Option = Select.Option

class AddForm extends Component {
  static propTypes = {
    setForm: PropTypes.func.isRequired,
    roles: PropTypes.array.isRequired,
    user: PropTypes.object
  }

  formRef = React.createRef()

  componentDidMount() {
    this.props.setForm(this.formRef)
  }

  render() {
    const { roles, user } = this.props

    return (
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
        ref={this.formRef}
        autoComplete="off"
        initialValues={user}
      >
        <Item
          name="username"
          label="用户名"
          rules={[{ required: true, message: '用户名不为空' }]}
        >
          <Input placeholder="请输入用户名" />
        </Item>
        {user._id ? null : (
          <Item
            name="password"
            label="密码"
            rules={[{ required: true, message: '密码不为空' }]}
          >
            <Input type="password" placeholder="请输入密码" />
          </Item>
        )}
        <Item
          name="phone"
          label="手机号"
          rules={[{ required: true, message: '手机号不为空' }]}
        >
          <Input placeholder="请输入手机号" />
        </Item>
        <Item
          name="email"
          label="邮箱"
          rules={[{ required: true, message: '邮箱不为空' }]}
        >
          <Input placeholder="请输入邮箱" />
        </Item>
        <Item
          name="role_id"
          label="角色"
          rules={[{ required: true, message: '角色不为空' }]}
        >
          <Select placeholder="请选择角色">
            {roles.map((role) => (
              <Option key={role._id} value={role._id}>
                {role.name}
              </Option>
            ))}
          </Select>
        </Item>
      </Form>
    )
  }
}

export default AddForm
