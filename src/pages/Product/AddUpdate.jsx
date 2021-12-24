import React, { Component } from 'react'
import {
  Button,
  Card,
  Cascader,
  Form,
  Input,
  InputNumber,
  Spin,
  message
} from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { addProduct, getCategories, updateProduct } from '../../api'
import PicturesWall from '../../components/PicturesWall'
import RichTextEditor from '../../components/RichTextEditor'

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
  editor = React.createRef()

  product = this.props.location.state || {}

  onFinish = (values) => {
    const images = this.picturesWall.current.getImages()
    const detail = this.editor.current.getDetail()

    const { name, desc, price, categoryIds } = values
    let pCategoryId, categoryId

    if (categoryIds.length === 1) {
      pCategoryId = '0'
      categoryId = categoryIds[0]
    } else {
      pCategoryId = categoryIds[0]
      categoryId = categoryIds[1]
    }

    const isUpdate = !!Object.values(this.product).length
    const api = isUpdate ? updateProduct : addProduct

    const product = {
      name,
      desc,
      price,
      imgs: images,
      detail,
      pCategoryId,
      categoryId
    }
    if (isUpdate) {
      product._id = this.product._id
    }

    api(product).then((response) => {
      if (response.status === 0) {
        message.success(`${isUpdate ? '更新' : '添加'}商品成功`)
        this.props.history.goBack()
      } else {
        message.error(`${isUpdate ? '更新' : '添加'}商品失败`)
      }
    })
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
        this.setState({ loading: false })
        this.formRef.current.setFieldsValue({
          name: product.name,
          price: product.price,
          desc: product.desc,
          categoryIds
        })
      })
    } else {
      this.getCategories('0')
    }
  }

  render() {
    const { optionLists, loading } = this.state
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
      labelCol: { span: 2, offset: 2 },
      wrapperCol: { span: 18 }
    }

    return (
      <Card className="product-add-update" title={title}>
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
              <Input className="input" placeholder="请输入商品名称" />
            </Item>
            <Item
              name="desc"
              label="商品描述"
              rules={[{ required: true, message: '必须输入商品描述' }]}
            >
              <TextArea
                className="input"
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
              <InputNumber placeholder="请输入商品价格" addonAfter="元" />
            </Item>
            <Item
              name="categoryIds"
              label="商品分类"
              placeholder="请选择商品分类"
              rules={[{ required: true, message: '必须指定商品分类' }]}
            >
              <Cascader
                style={{ width: '50%' }}
                options={optionLists}
                loadData={this.loadData}
              />
            </Item>
            <Item label="商品图片">
              <PicturesWall ref={this.picturesWall} images={product.imgs} />
            </Item>
            <Item label="商品详情">
              <RichTextEditor ref={this.editor} detail={product.detail} />
            </Item>
            <div style={{ textAlign: 'center' }}>
              <Button type="primary" htmlType="submit">
                提交
              </Button>
            </div>
          </Form>
        </Spin>
      </Card>
    )
  }
}

export default AddUpdate
