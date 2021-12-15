import React, { Component } from 'react'
import { Form, Input } from 'antd'
import PropTypes from 'prop-types'

const Item = Form.Item

class UpdateForm extends Component {
  static propTypes = {
    categoryName: PropTypes.string.isRequired,
    setForm: PropTypes.func.isRequired
  }

  formRef = React.createRef()

  componentDidMount() {
    this.props.setForm(this.formRef)
  }

  render() {
    const { categoryName } = this.props
    return (
      <Form
        initialValues={{ categoryName }}
        autoComplete="off"
        ref={this.formRef}
        layout="vertical"
      >
        <Item
          name="categoryName"
          label="分类名称"
          rules={[{ required: true, message: '分类名称不为空' }]}
        >
          <Input aut placeholder="请输入分类名称" />
        </Item>
      </Form>
    )
  }
}

export default UpdateForm
