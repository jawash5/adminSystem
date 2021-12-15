import React, { Component } from 'react'
import { Card, Button, Table, Modal } from 'antd'
import { PlusOutlined, RollbackOutlined } from '@ant-design/icons'
import { addCategory, getCategories, updateCategory } from '../../api'
import AddForm from './AddForm'
import UpdateForm from './UpdateForm'

class Category extends Component {
  state = {
    categories: [],
    subCategories: [],
    loading: false,
    parentName: '',
    parentId: '0',
    showStatus: 0, // 0：不显示， 1：显示添加 2：显示更新
    category: {}
  }

  columns = [
    {
      title: '分类名称',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: '操作',
      width: 300,
      render: (category) => (
        <span>
          <Button type="link" onClick={() => this.showUpdate(category)}>
            修改分类
          </Button>
          {this.state.parentId === '0' ? (
            <Button
              onClick={() => this.showSubCategories(category)}
              type="link"
            >
              查看子分类
            </Button>
          ) : null}
        </span>
      )
    }
  ]

  getCategories = (parentId) => {
    parentId = parentId || this.state.parentId
    this.setState({ loading: true })
    getCategories({ parentId })
      .then((response) => {
        if (parentId === '0') {
          this.setState({ categories: response.data })
        } else {
          this.setState({ subCategories: response.data })
        }
      })
      .finally(() => {
        this.setState({ loading: false })
      })
  }

  showSubCategories = (category) => {
    this.setState({ parentId: category._id, parentName: category.name }, () => {
      this.getCategories()
    })
  }

  showCategories = () => {
    this.setState({ parentId: '0', parentName: '', subCategories: [] })
  }

  handleCancel = () => {
    this.setState({ showStatus: 0 })
  }

  showUpdate = (category) => {
    this.setState({ showStatus: 2, category })
  }

  addCategory = () => {
    this.form.current.validateFields().then((values) => {
      this.setState({ showStatus: 0 })
      const { parentId, categoryName } = values

      addCategory({ parentId, categoryName }).then(() => {
        if (parentId === this.state.parentId) {
          this.getCategories()
        } else if (parentId === '0') {
          this.getCategories('0')
        }
      })
    })
  }

  updateCategory = () => {
    this.form.current
      .validateFields()
      .then((values) => {
        this.setState({ showStatus: 0 })
        const categoryId = this.state.category._id
        const categoryName = values.categoryName
        return updateCategory({ categoryId, categoryName })
      })
      .then(() => {
        this.getCategories()
      })
      .catch(() => {})
  }

  componentDidMount() {
    this.getCategories()
  }

  render() {
    const {
      categories,
      loading,
      subCategories,
      parentId,
      parentName,
      showStatus,
      category
    } = this.state

    const title =
      parentId === '0' ? (
        '一级分类列表'
      ) : (
        <span>
          <Button type="link" onClick={this.showCategories}>
            一级分类列表
            <RollbackOutlined />
          </Button>
          <span style={{ fontSize: '14px' }}>{parentName}</span>
        </span>
      )
    const extra = (
      <Button
        onClick={() => this.setState({ showStatus: 1 })}
        type="primary"
        icon={<PlusOutlined />}
      >
        添加
      </Button>
    )

    return (
      <Card title={title} extra={extra}>
        <Table
          rowKey="_id"
          loading={loading}
          bordered
          dataSource={parentId === '0' ? categories : subCategories}
          columns={this.columns}
          pagination={{
            defaultPageSize: 5,
            showQuickJumper: true,
            showSizeChanger: true,
            pageSizeOptions: ['5', '10', '20', '50']
          }}
        />
        <Modal
          title="添加分类"
          visible={showStatus === 1}
          onOk={this.addCategory}
          onCancel={this.handleCancel}
          destroyOnClose={true}
        >
          <AddForm
            categories={categories}
            parentId={parentId}
            setForm={(form) => (this.form = form)}
          />
        </Modal>
        <Modal
          title="修改分类"
          visible={showStatus === 2}
          onOk={this.updateCategory}
          onCancel={this.handleCancel}
          destroyOnClose={true}
        >
          <UpdateForm
            categoryName={category.name || ''}
            setForm={(form) => (this.form = form)}
          />
        </Modal>
      </Card>
    )
  }
}

export default Category
