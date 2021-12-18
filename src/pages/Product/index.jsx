import React, { Component } from 'react'
import ProductAddUpdate from './AddUpdate'
import ProductHome from './Home'
import ProductDetail from './Detail'
import { Redirect, Switch, Route } from 'react-router-dom'
import './index.less'

class Product extends Component {
  render() {
    return (
      <Switch>
        <Route path="/product" exact component={ProductHome} />
        <Route path="/product/detail" component={ProductDetail} />
        <Route path="/product/addUpdate" component={ProductAddUpdate} />
        <Redirect to="/product" />
      </Switch>
    )
  }
}

export default Product
