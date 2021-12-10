import React, { Component } from 'react'
import './index.less'
import logo from '../../assets/images/logo.png'
import { Link, withRouter } from 'react-router-dom'
import { Menu } from 'antd'
import menuList from '../../config/menuConfig'

const { SubMenu } = Menu

class LeftNav extends Component {
  openKey = ''

  getMenuNodes = (menuList, path) => {
    return menuList.map((item) => {
      if (item.children) {
        if (item.children.find((i) => i.key === path)) {
          this.openKey = item.key
        }

        return (
          <SubMenu key={item.key} icon={item.icon} title={item.title}>
            {this.getMenuNodes(item.children, path)}
          </SubMenu>
        )
      } else {
        return (
          <Menu.Item key={item.key} icon={item.icon}>
            <Link to={item.key}>{item.title}</Link>
          </Menu.Item>
        )
      }
    })
  }

  render() {
    const path = this.props.location.pathname
    const menuNodes = this.getMenuNodes(menuList, path)

    return (
      <div>
        <div className="left-nav">
          <Link to="/" className="left-nav-header">
            <img src={logo} alt="logo" />
            <h1>后台管理</h1>
          </Link>
        </div>

        <Menu
          selectedKeys={[path]}
          defaultOpenKeys={[this.openKey]}
          mode="inline"
          theme="dark"
        >
          {menuNodes}
        </Menu>
      </div>
    )
  }
}

export default withRouter(LeftNav)
