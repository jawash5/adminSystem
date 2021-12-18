import React, { Component } from 'react'
import { Select, Card, Input, Button, Table, message } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { getProducts, searchProducts, updateStatus } from '../../api'
import { PAGE_SIZE } from '../../utils/constants'

class Home extends Component {
  state = {
    products: [],
    total: 0,
    pageNum: 1,
    loading: false,
    searchType: 'productName', // 搜索类型
    searchName: '' // 搜索关键字
  }

  getProducts = (pageNum, pageSize = PAGE_SIZE) => {
    this.setState({ loading: true })

    const { searchName, searchType } = this.state
    if (searchName) {
      searchProducts({ pageNum, pageSize, [searchType]: searchName })
        .then((response) => {
          const { list, total } = response.data
          this.setState({ products: list, total, pageNum })
        })
        .finally(() => this.setState({ loading: false }))
    } else {
      getProducts({ pageNum, pageSize })
        .then((response) => {
          const { list, total } = response.data
          this.setState({ products: list, total, pageNum })
        })
        .finally(() => this.setState({ loading: false }))
    }
  }

  updateStatus = (productId, status) => {
    updateStatus({ productId, status }).then((response) => {
      if (response.status === 0) {
        message.success('更新商品成功')
        this.getProducts(this.state.pageNum)
      }
    })
  }

  componentDidMount() {
    this.getProducts(1)
  }

  render() {
    const { Column } = Table
    const { products, total, pageNum, loading, searchName, searchType } =
      this.state
    const title = (
      <span>
        <Select
          value={searchType}
          onChange={(value) => this.setState({ searchType: value })}
        >
          <Select.Option value="productName">按名称搜索</Select.Option>
          <Select.Option value="productDesc">按描述搜索</Select.Option>
        </Select>
        <Input
          placeholder="请输入关键字"
          allowClear
          value={searchName}
          style={{ width: 150, margin: '0 15px' }}
          onChange={(e) => this.setState({ searchName: e.target.value })}
        />
        <Button type="primary" onClick={() => this.getProducts(1)}>
          搜索
        </Button>
      </span>
    )

    const extra = (
      <Button type="primary" icon={<PlusOutlined />}>
        添加商品
      </Button>
    )

    return (
      <Card title={title} extra={extra}>
        <Table
          bordered
          loading={loading}
          rowKey="_id"
          dataSource={products}
          pagination={{
            current: pageNum,
            defaultPageSize: PAGE_SIZE,
            showQuickJumper: true,
            total,
            onChange: this.getProducts
          }}
        >
          <Column title="商品名称" dataIndex="name" />
          <Column title="商品描述" dataIndex="desc" />
          <Column
            title="价格"
            dataIndex="price"
            render={(price) => '￥' + price}
          />
          <Column
            title="状态"
            width={100}
            render={(product) => {
              const { status, _id } = product
              return (
                <span>
                  <Button
                    onClick={() => this.updateStatus(_id, status === 1 ? 2 : 1)}
                    type="primary"
                  >
                    {status === 1 ? '下架' : '上架'}
                  </Button>
                  <span>{status === 1 ? '在售' : '已下架'}</span>
                </span>
              )
            }}
          />
          <Column
            title="操作"
            width={100}
            render={(product) => {
              return (
                <span>
                  <Button
                    type="link"
                    onClick={() =>
                      this.props.history.push('/product/detail', product)
                    }
                  >
                    详情
                  </Button>
                  <Button type="link">修改</Button>
                </span>
              )
            }}
          />
        </Table>
      </Card>
    )
  }
}

export default Home
