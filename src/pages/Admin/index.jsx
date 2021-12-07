import React, { Component } from 'react'
import { Layout } from 'antd'
import LeftNav from '../../components/LeftNav'
import MyHeader from '../../components/MyHeader'
import Home from '../Home'
import Category from '../Category'
import Product from '../Product'
import Role from '../Role'
import User from '../User'
import Bar from '../Charts/Bar'
import Line from '../Charts/Line'
import Pie from '../Charts/Pie'
import { Redirect, Route, Switch } from 'react-router-dom'

const { Header, Footer, Sider, Content } = Layout

class Admin extends Component {
  render() {
    return (
      <Layout style={{ height: '100%' }}>
        <Sider>
          <LeftNav />
        </Sider>
        <Layout>
          <Header style={{ backgroundColor: 'transparent', height: '80px' }}>
            <MyHeader />
          </Header>
          <Content style={{ backgroundColor: '#fff' }}>
            <Switch>
              <Route path="/home" component={Home} />
              <Route path="/category" component={Category} />
              <Route path="/product" component={Product} />
              <Route path="/role" component={Role} />
              <Route path="/user" component={User} />
              <Route path="/charts/bar" component={Bar} />
              <Route path="/charts/pie" component={Pie} />
              <Route path="/charts/line" component={Line} />
              <Redirect to="/home" />
            </Switch>
          </Content>
          <Footer style={{ textAlign: 'center', color: '#cccccc' }}>
            推荐使用谷歌浏览器，可以获得更加页面操作体验 —— Lay
          </Footer>
        </Layout>
      </Layout>
    )
  }
}

export default Admin
