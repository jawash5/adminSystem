import React, { Component } from 'react'
import { Button, Card, Cascader, Form, Input, Spin } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { getCategories } from '../../api'
import PicturesWall from '../../components/PicturesWall'

const Item = Form.Item
const TextArea = Input.TextArea

class AddUpdate extends Component {
  state = {
    optionLists: [],
    images: [],
    loading: false
  }

  formRef = React.createRef()

  picturesWall = React.createRef()

  product = this.props.location.state || {}

  onFinish = (values) => {
    const images = this.picturesWall.current.getImages()
    console.log(images)
    console.log(values)
  }

  getCategories = (parentId) => {
    return getCategories({ parentId }).then(async (response) => {
      const categories = response.data
      if (parentId === '0') {
        const options = categories.map((c) => ({
          value: c._id,
          label: c.name,
          isLeaf: false
        }))
        const { product } = this
        const { pCategoryId } = product
        const isUpdate = !!Object.values(product).length

        if (isUpdate && pCategoryId !== '0') {
          const subCategories = await this.getCategories(pCategoryId)
          options.find((c) => c.value === pCategoryId).children =
            subCategories.map((c) => ({
              value: c._id,
              label: c.name,
              isLeaf: true
            }))
        }
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
    const { product } = this
    const isUpdate = !!Object.values(product).length

    if (isUpdate) {
      this.setState({ loading: true })
      const categoryIds = []

      if (product.pCategoryId === '0') {
        categoryIds.push(product.categoryId)
      } else {
        categoryIds.push(product.pCategoryId)
        categoryIds.push(product.categoryId)
      }

      this.getCategories('0').finally(() => {
        this.setState({ loading: false, images: product.imgs })
        this.formRef.current.setFieldsValue({
          name: product.name,
          price: product.price,
          desc: product.desc,
          categoryId: categoryIds
        })
      })
    } else {
      this.getCategories('0')
    }
  }

  render() {
    const { optionLists, loading, images } = this.state
    const { product } = this
    const isUpdate = !!Object.values(product).length

    const title = (
      <span>
        <Button
          type="link"
          icon={<ArrowLeftOutlined />}
          onClick={() => this.props.history.goBack()}
        />
        <span>{isUpdate ? '修改商品' : '添加商品'}</span>
      </span>
    )

    const formItemLayout = {
      labelCol: { span: 4, offset: 4 },
      wrapperCol: { span: 12 }
    }

    return (
      <Card title={title}>
        <Spin spinning={loading}>
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
              <Input
                type="number"
                placeholder="请输入商品价格"
                addonAfter="元"
              />
            </Item>
            <Item
              name="categoryId"
              label="商品分类"
              placeholder="请选择商品分类"
              rules={[{ required: true, message: '必须指定商品分类' }]}
            >
              <Cascader options={optionLists} loadData={this.loadData} />
            </Item>
            <Item label="商品图片">
              <PicturesWall ref={this.picturesWall} images={images} />
            </Item>
            <Item label="商品详情">
              <Input
                type="number"
                placeholder="请输入商品价格"
                addonAfter="元"
              />
            </Item>
            <Item>
              <Button type="primary" htmlType="submit">
                提交
              </Button>
            </Item>
          </Form>
        </Spin>
      </Card>
    )
  }
}

export default AddUpdate
