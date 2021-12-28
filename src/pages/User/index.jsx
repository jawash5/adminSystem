import React, { Component } from 'react'
import { Card, Button, Table, Modal, message } from 'antd'
import { formatDate } from '../../utils/formatDate'
import { getUsers, deleteUser } from '../../api'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import UserForm from './UserForm'

const { Column } = Table
class User extends Component {
  state = {
    users: [],
    roles: [],
    roleMap: {},
    isShow: false
  }

  initRoleNames = (roles) => {
    const roleMap = roles.reduce((pre, role) => {
      pre[role._id] = role.name
      return pre
    }, {})

    this.setState({ roleMap })
  }

  getUsers = () => {
    getUsers().then((response) => {
      if (response.status === 0) {
        const { users, roles } = response.data
        this.initRoleNames(roles)
        this.setState({ users, roles })
      }
    })
  }

  addOrUpdateUser = () => {}

  deleteUser = (user) => {
    Modal.confirm({
      title: `确认删除 ${user.username} 吗？`,
      icon: <ExclamationCircleOutlined />,
      onOk: () => {
        deleteUser({ userId: user._id }).then((response) => {
          if (response.status === 0) {
            message.success('删除用户成功！')
            this.getUsers()
          }
        })
      }
    })
  }

  componentDidMount() {
    this.getUsers()
  }

  render() {
    const { users, isShow, roleMap } = this.state

    const title = (
      <Button type="primary" onClick={() => this.setState({ isShow: true })}>
        创建用户
      </Button>
    )
    return (
      <Card title={title}>
        <Table
          rowKey="_id"
          bordered
          dataSource={users}
          pagination={{
            defaultPageSize: 5,
            showQuickJumper: true,
            showSizeChanger: true,
            pageSizeOptions: ['5', '10', '20', '50']
          }}
        >
          <Column title="用户名" dataIndex="username" />
          <Column title="邮箱" dataIndex="email" />
          <Column title="电话" dataIndex="phone" />
          <Column
            title="注册时间"
            dataIndex="create_time"
            render={formatDate}
          />
          <Column
            title="所属角色"
            dataIndex="role_id"
            render={(role_id) => roleMap[role_id]}
          />
          <Column
            title="操作"
            render={(user) => (
              <span>
                <Button type="link">修改</Button>
                <Button type="link" onClick={() => this.deleteUser(user)}>
                  删除
                </Button>
              </span>
            )}
          />
        </Table>
        <Modal
          title="添加用户 "
          visible={isShow}
          onOk={this.addOrUpdateUser}
          onCancel={() => this.setState({ isShow: false })}
          destroyOnClose={true}
        >
          <UserForm setForm={(form) => (this.form = form)} />
        </Modal>
      </Card>
    )
  }
}

export default User
