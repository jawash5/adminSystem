import React, { Component } from 'react'
import './index.less'
import { getWeather } from '../../api'
import { formatDate } from '../../utils/formatDate'
import { getUser, removeUser } from '../../utils/storage'
import { withRouter } from 'react-router-dom'
import menuList from '../../config/menuConfig'
import { Modal, Button } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'

class MyHeader extends Component {
  state = {
    currentTime: formatDate(Date.now()),
    weather: '晴',
    weatherIcon: '100',
    timeKey: ''
  }

  getTime = () => {
    const timeKey = setInterval(() => {
      const currentTime = formatDate(Date.now())
      this.setState({ currentTime })
    }, 1000)
    this.setState({ timeKey })
  }

  getWeather = () => {
    getWeather('hangzhou').then((response) => {
      const { text, icon } = response.data.now
      this.setState({ weather: text, weatherIcon: icon })
    })
  }

  //Todo redux解决重复计算title问题
  getTitle = () => {
    const path = this.props.location.pathname
    let title = ''
    const deepSearch = (menu) => {
      menu.forEach((item) => {
        if (path.indexOf(item.key) === 0) {
          title = item.title
        } else if (item.children) {
          deepSearch(item.children)
        }
      })
    }

    deepSearch(menuList)

    return title
  }

  logout = () => {
    Modal.confirm({
      title: '确认退出登录?',
      icon: <ExclamationCircleOutlined />,
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        this.props.history.replace('/login')
        removeUser()
      }
    })
  }

  componentDidMount() {
    this.getWeather()
    this.getTime()
  }

  componentWillUnmount() {
    clearInterval(this.state.timeKey)
  }

  render() {
    const { currentTime, weatherIcon, weather } = this.state
    const { username } = getUser()

    return (
      <div className="my-header">
        <div className="my-header-top">
          <span>欢迎，{username}</span>
          <Button type="link" onClick={() => this.logout()}>
            退出
          </Button>
        </div>
        <div className="my-header-bottom">
          {/*<div className="my-header-bottom-left">{this.getTitle()}</div>*/}
          <div className="my-header-bottom-left">标题</div>
          <div className="my-header-bottom-right">
            <span>{currentTime}</span>
            <i className={'qi-' + weatherIcon} />
            <span>{weather}</span>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(MyHeader)
