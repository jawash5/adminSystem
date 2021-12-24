import React, { Component } from 'react'
import { Form, Input } from 'antd'
import PropTypes from 'prop-types'

const Item = Form.Item

class AddForm extends Component {
  static propTypes = {
    setForm: PropTypes.func.isRequired
  }

  formRef = React.createRef()

  componentDidMount() {
    this.props.setForm(this.formRef)
  }

  render() {
    return (
      <Form ref={this.formRef} autoComplete="off">
        <Item
          name="roleName"
          label="角色名称"
          rules={[{ required: true, message: '角色名称不为空' }]}
        >
          <Input placeholder="请输入角色名称" />
        </Item>
      </Form>
    )
  }
}

export default AddForm
