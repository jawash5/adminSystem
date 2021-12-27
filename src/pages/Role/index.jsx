import React, { Component } from 'react'
import { Button, Card, message, Modal, Space, Table } from 'antd'
import { addRoles, getRoles, updateRole } from '../../api'
import AddForm from './AddForm'
import AuthForm from './AuthForm'
import { getUser } from '../../utils/storage'
import { formatDate } from '../../utils/formatDate'

const { Column } = Table

class Role extends Component {
  state = {
    roles: [],
    role: {}, //当前选中的角色
    isShowAdd: false,
    isShowAuth: false
  }

  auth = React.createRef()

  onRow = (role) => {
    return {
      onClick: () => {
        this.setState({ role })
      }
    }
  }

  getRoles = () => {
    getRoles().then((response) => {
      if (response.status === 0) {
        const roles = response.data
        this.setState({ roles })
      } else {
        message.error('角色列表请求失败')
      }
    })
  }

  addRole = () => {
    this.form.current.validateFields().then((values) => {
      const { roleName } = values
      addRoles({ roleName })
        .then((response) => {
          if (response.status === 0) {
            message.success('添加角色成功')
            this.setState((state) => ({
              roles: [...state.roles, response.data]
            }))
          } else {
            message.error('添加角色失败')
          }
        })
        .finally(() => this.setState({ isShowAdd: false }))
    })
  }

  updateRole = () => {
    const role = this.state.role
    role.menus = this.auth.current.getMenus()
    role.auth_name = getUser().username
    role.auth_time = Date.now()
    updateRole(role)
      .then((response) => {
        if (response.status === 0) {
          message.success('更新角色权限成功')
          this.setState({ roles: [...this.state.roles] })
        } else {
          message.error('更新角色权限失败')
        }
      })
      .finally(() => {
        this.setState({ isShowAuth: false })
      })
  }

  componentDidMount() {
    this.getRoles()
  }

  render() {
    const { roles, role, isShowAdd, isShowAuth } = this.state

    const title = (
      <Space>
        <Button
          type="primary"
          onClick={() => this.setState({ isShowAdd: true })}
        >
          创建角色
        </Button>
        <Button
          type="primary"
          disabled={!role._id}
          onClick={() => this.setState({ isShowAuth: true })}
        >
          设置角色权限
        </Button>
      </Space>
    )

    return (
      <Card title={title}>
        <Table
          rowKey="_id"
          bordered
          dataSource={roles}
          rowSelection={{
            type: 'radio',
            selectedRowKeys: [role._id],
            onChange: (_, selectedRows) => {
              this.setState({ role: selectedRows[0] })
            }
          }}
          pagination={{
            defaultPageSize: 5,
            showQuickJumper: true,
            showSizeChanger: true,
            pageSizeOptions: ['5', '10', '20', '50']
          }}
          onRow={this.onRow}
        >
          <Column title="角色名称" dataIndex="name" />
          <Column
            title="创建时间"
            dataIndex="create_time"
            render={formatDate}
          />
          <Column title="授权时间" dataIndex="auth_time" render={formatDate} />
          <Column title="授权人" dataIndex="auth_name" />
        </Table>
        <Modal
          title="添加角色"
          visible={isShowAdd}
          onOk={this.addRole}
          onCancel={() => this.setState({ isShowAdd: false })}
          destroyOnClose={true}
        >
          <AddForm setForm={(form) => (this.form = form)} />
        </Modal>
        <Modal
          title="设置角色权限"
          visible={isShowAuth}
          onOk={this.updateRole}
          onCancel={() => this.setState({ isShowAuth: false })}
          destroyOnClose={true}
        >
          <AuthForm ref={this.auth} role={role} />
        </Modal>
      </Card>
    )
  }
}

export default Role
