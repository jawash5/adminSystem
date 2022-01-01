import React, { Component } from 'react'
import './index.less'
import logo from '../../assets/images/logo.png'
import { Link, withRouter } from 'react-router-dom'
import { Menu } from 'antd'
import menuList from '../../config/menuConfig'
import { connect } from 'react-redux'
import { setHeadTitle } from '../../redux/actions/head-action'

const { SubMenu } = Menu

class LeftNav extends Component {
  openKey = ''

  hasAuth = (item) => {
    const { key, isPublic } = item
    const user = this.props.user
    const username = user.username
    const menus = user.role.menus

    if (username === 'admin' || isPublic || menus.includes(key)) {
      return true
    } else if (item.children) {
      return !!item.children.find((child) => menus.includes(child.key))
    }

    return false
  }

  getMenuNodes = (menuList, path) => {
    return menuList.map((item) => {
      if (this.hasAuth(item)) {
        if (item.children) {
          if (item.children.find((i) => path.indexOf(i.key) === 0)) {
            this.openKey = item.key
          }

          return (
            <SubMenu key={item.key} icon={item.icon} title={item.title}>
              {this.getMenuNodes(item.children, path)}
            </SubMenu>
          )
        } else {
          if (
            this.props.title !== item.title &&
            (item.key === path || path.indexOf(item.key) === 0)
          ) {
            this.props.setHeadTitle(item.title)
          }
          return (
            <Menu.Item key={item.key} icon={item.icon}>
              <Link
                to={item.key}
                onClick={() => this.props.setHeadTitle(item.title)}
              >
                {item.title}
              </Link>
            </Menu.Item>
          )
        }
      }
      return null
    })
  }

  render() {
    let path = this.props.location.pathname
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

export default connect(
  (state) => ({
    title: state.header,
    user: state.user
  }),
  {
    setHeadTitle
  }
)(withRouter(LeftNav))
