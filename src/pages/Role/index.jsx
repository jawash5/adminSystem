import React, { Component } from 'react'
import { Card, Button, Table, message, Modal, Space } from 'antd'
import { addRoles, getRoles } from '../../api'
import AddForm from './AddForm'

const { Column } = Table

class Role extends Component {
  state = {
    roles: [],
    role: {}, //当前选中的角色
    isShowAdd: false
  }

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

  componentDidMount() {
    this.getRoles()
  }

  render() {
    const { roles, role, isShowAdd } = this.state

    const title = (
      <Space>
        <Button
          type="primary"
          onClick={() => this.setState({ isShowAdd: true })}
        >
          创建角色
        </Button>
        <Button type="primary" disabled={!role._id}>
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
          <Column title="创建时间" dataIndex="create_time" />
          <Column title="授权时间" dataIndex="auth_time" />
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
      </Card>
    )
  }
}

export default Role
