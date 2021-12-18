import React, { Component } from 'react'
import { Card, List } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { BASE_IMG_URL } from '../../utils/constants'
import { getCategory } from '../../api'

const Item = List.Item

class Detail extends Component {
  state = {
    cFirName: '', // 一级分类名称
    cSedName: '' // 二级分类名称
  }

  componentDidMount() {
    const { pCategoryId, categoryId } = this.props.location.state

    if (pCategoryId === '0') {
      getCategory({ categoryId }).then((response) => {
        this.setState({ cFirName: response.data.name })
      })
    } else {
      getCategory({ categoryId: pCategoryId })
        .then((response) => {
          this.setState({ cFirName: response.data.name })
          return getCategory({ categoryId })
        })
        .then((response) => {
          this.setState({ cSedName: response.data.name })
        })
    }
  }

  render() {
    const { name, desc, price, detail, imgs } = this.props.location.state
    const { cFirName, cSedName } = this.state

    const title = (
      <span>
        <ArrowLeftOutlined
          style={{ marginRight: 15, color: 'green' }}
          onClick={() => {
            this.props.history.goBack()
          }}
        />
        商品详情
      </span>
    )

    return (
      <Card className="product-detail" title={title}>
        <List>
          <Item className="item">
            <span className="left">商品名称：</span>
            <span>{name}</span>
          </Item>
          <Item className="item">
            <span className="left">商品描述：</span>
            <span>{desc}</span>
          </Item>
          <Item className="item">
            <span className="left">商品价格：</span>
            <span>{price}</span>
          </Item>
          <Item className="item">
            <span className="left">所属分类：</span>
            <span>
              {cFirName} {cSedName ? '=>' + cSedName : ''}
            </span>
          </Item>
          <Item className="item">
            <span className="left">商品图片：</span>
            <span>
              {imgs.map((img) => (
                <img
                  key={img}
                  className="product-img"
                  src={BASE_IMG_URL + img}
                  alt="商品图片"
                />
              ))}
            </span>
          </Item>
          <Item className="item">
            <span className="left">商品详情：</span>
            <span dangerouslySetInnerHTML={{ __html: detail }} />
          </Item>
        </List>
      </Card>
    )
  }
}

export default Detail
