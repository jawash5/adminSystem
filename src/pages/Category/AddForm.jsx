import React, { Component } from 'react'
import { Form, Select, Input } from 'antd'
import PropTypes from 'prop-types'

const Item = Form.Item
const Option = Select.Option

class AddForm extends Component {
  static propTypes = {
    categories: PropTypes.array.isRequired, // 一级分类数组
    parentId: PropTypes.string.isRequired,
    setForm: PropTypes.func.isRequired
  }

  formRef = React.createRef()

  componentDidMount() {
    this.props.setForm(this.formRef)
  }

  render() {
    const { categories, parentId } = this.props

    return (
      <Form
        initialValues={{ parentId }}
        ref={this.formRef}
        autoComplete="off"
        layout="vertical"
      >
        <Item
          name="parentId"
          label="所属分类"
          rules={[{ required: true, message: '分类不为空' }]}
        >
          <Select>
            <Option value="0">一级分类</Option>
            {categories.map((category) => (
              <Option key={category._id} value={category._id}>
                {category.name}
              </Option>
            ))}
          </Select>
        </Item>
        <Item
          name="categoryName"
          label="分类名称"
          rules={[{ required: true, message: '分类名称不为空' }]}
        >
          <Input placeholder="请输入分类名称" />
        </Item>
      </Form>
    )
  }
}

export default AddForm
