import React, { Component } from 'react'
import { Card, Button, Table } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { getCategories } from '../../api'

class Category extends Component {
  state = {
    categories: [],
    subCategories: [],
    loading: false,
    parentName: '',
    parentId: 0
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
          <Button type="link">修改分类</Button>
          {this.state.parentId === 0 ? (
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

  getCategories = () => {
    const { parentId } = this.state
    this.setState({ loading: true })
    getCategories({ parentId })
      .then((response) => {
        if (parentId === 0) {
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
    this.setState({ parentId: 0, parentName: '', subCategories: [] })
  }

  componentDidMount() {
    this.getCategories()
  }

  render() {
    const { categories, loading, subCategories, parentId, parentName } =
      this.state

    const title =
      parentId === 0 ? (
        '一级分类列表'
      ) : (
        <span>
          <Button type="link" onClick={this.showCategories}>
            一级分类列表
          </Button>
          <span style={{ fontSize: '14px' }}>{parentName}</span>
        </span>
      )
    const extra = (
      <Button type="primary" icon={<PlusOutlined />}>
        添加
      </Button>
    )

    return (
      <Card title={title} extra={extra}>
        <Table
          rowKey="_id"
          loading={loading}
          bordered
          dataSource={parentId === 0 ? categories : subCategories}
          columns={this.columns}
          pagination={{
            defaultPageSize: 5,
            showQuickJumper: true,
            showSizeChanger: true,
            pageSizeOptions: ['5', '10', '20', '50']
          }}
        />
      </Card>
    )
  }
}

export default Category
