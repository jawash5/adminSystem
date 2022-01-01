import React from 'react'
import './index.less'
import logo from '../../assets/images/logo.png'
import { Form, Input, Button } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { initLogin } from '../../redux/actions/user-action'

function Login(props) {
  const onFinish = (values) => {
    const { username, password } = values
    props.initLogin(username, password)
  }

  const validatorPsd = (rule, value) => {
    if (!value) {
      return Promise.reject(new Error('请输入密码'))
    } else if (value.length < 4) {
      return Promise.reject(new Error('密码长度至少 4 位'))
    } else if (value.length > 12) {
      return Promise.reject(new Error('密码长度至多 12 位'))
    } else if (!/^[a-zA-z0-9_]+$/.test(value)) {
      return Promise.reject(new Error('由英文、数字或下划线组成'))
    } else {
      return Promise.resolve()
    }
  }

  const user = props.user
  if (user && user._id) {
    return <Redirect to="/home" />
  }

  return (
    <div className="login">
      <header className="login-header">
        <img src={logo} alt="logo" />
        <h1>React项目：后台管理系统</h1>
      </header>
      <section className="login-content">
        <h2>用户登录</h2>
        <Form
          name="normal_login"
          className="login-form"
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            name="username"
            initialValue="admin"
            rules={[
              { required: true, message: '请输入用户名!' },
              { min: 4, message: '用户名至少 4 位' },
              { max: 12, message: '用户名至多 12 位' },
              {
                pattern: /^[a-zA-Z0-9_]+$/,
                message: '用户名必须是英文、数字或下划线组成'
              }
            ]}
          >
            <Input prefix={<UserOutlined />} placeholder="用户名" />
          </Form.Item>
          <Form.Item name="password" rules={[{ validator: validatorPsd }]}>
            <Input
              prefix={<LockOutlined />}
              type="password"
              placeholder="密码"
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              登 录
            </Button>
          </Form.Item>
        </Form>
      </section>
    </div>
  )
}

export default connect((state) => ({ user: state.user }), { initLogin })(Login)
