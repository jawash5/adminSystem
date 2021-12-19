import React, { Component } from 'react'
import { Button, Card, Cascader, Form, Input } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { getCategories } from '../../api'

const Item = Form.Item
const TextArea = Input.TextArea

class AddUpdate extends Component {
  state = {
    optionLists: []
  }

  formRef = React.createRef()

  onFinish = (values) => {
    console.log(values)
  }

  initOptions = (categories) => {
    const options = categories.map((c) => ({
      value: c._id,
      label: c.name,
      isLeaf: false
    }))
    this.setState({ optionLists: options })
  }

  getCategories = (parentId) => {
    return getCategories({ parentId }).then((response) => {
      const categories = response.data
      if (parentId === '0') {
        const options = categories.map((c) => ({
          value: c._id,
          label: c.name,
          isLeaf: false
        }))
        this.setState({ optionLists: options })
      } else {
        return categories
      }
    })
  }

  loadData = async (selectedOptions) => {
    const targetOption = selectedOptions[0]
    targetOption.loading = true

    const subCategories = await this.getCategories(targetOption.value)
    targetOption.loading = false

    if (subCategories && subCategories.length > 0) {
      targetOption.children = subCategories.map((c) => ({
        value: c._id,
        label: c.name,
        isLeaf: true
      }))
    } else {
      targetOption.isLeaf = true
    }

    this.setState({ optionLists: [...this.state.optionLists] })
  }

  componentDidMount() {
    this.getCategories('0')
  }

  render() {
    const { optionLists } = this.state

    const title = (
      <span>
        <Button type="link" icon={<ArrowLeftOutlined />} />
        <span>添加商品</span>
      </span>
    )

    const formItemLayout = {
      labelCol: { span: 2, offset: 5 },
      wrapperCol: { span: 12 }
    }

    return (
      <Card title={title}>
        <Form
          autoComplete="off"
          {...formItemLayout}
          ref={this.formRef}
          onFinish={this.onFinish}
        >
          <Item
            name="name"
            label="商品名称"
            rules={[{ required: true, message: '必须输入商品名称' }]}
          >
            <Input placeholder="请输入商品名称" />
          </Item>
          <Item
            name="desc"
            label="商品描述"
            rules={[{ required: true, message: '必须输入商品描述' }]}
          >
            <TextArea
              autoSize={{ minRows: 2, maxRows: 6 }}
              placeholder="请输入商品描述"
            />
          </Item>
          <Item
            name="price"
            label="商品价格"
            rules={[
              { required: true, message: '必须输入商品价格' },
              {
                validator: (_, value) =>
                  value * 1 >= 0
                    ? Promise.resolve()
                    : Promise.reject(new Error('商品价格必须大于0'))
              }
            ]}
          >
            <Input type="number" placeholder="请输入商品价格" addonAfter="元" />
          </Item>
          <Item label="商品分类">
            <Cascader options={optionLists} loadData={this.loadData} />
          </Item>
          <Item label="商品图片">
            <Input type="number" placeholder="请输入商品价格" addonAfter="元" />
          </Item>
          <Item label="商品详情">
            <Input type="number" placeholder="请输入商品价格" addonAfter="元" />
          </Item>
          <Item>
            <Button type="primary" htmlType="submit">
              提交
            </Button>
          </Item>
        </Form>
      </Card>
    )
  }
}

export default AddUpdate
