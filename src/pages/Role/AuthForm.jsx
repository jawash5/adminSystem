import React, { PureComponent } from 'react'
import { Form, Input, Tree } from 'antd'
import PropTypes from 'prop-types'
import menuList from '../../config/menuConfig'
import { AppstoreOutlined } from '@ant-design/icons'

const Item = Form.Item
const treeData = [
  {
    title: '平台权限',
    key: 'all',
    icon: <AppstoreOutlined />,
    children: menuList
  }
]

class AuthForm extends PureComponent {
  static propTypes = {
    role: PropTypes.object
  }

  constructor(props) {
    super(props)
    this.state = {
      checkedKeys: props.role.menus
    }
  }

  onCheck = (checkedKeys) => {
    this.setState({ checkedKeys })
  }

  getMenus = () => this.state.checkedKeys

  render() {
    const { role } = this.props
    const { checkedKeys } = this.state
    return (
      <>
        <Form autoComplete="off">
          <Item initialValue={role.name} name="roleName" label="角色名称">
            <Input disabled />
          </Item>
        </Form>
        <Tree
          checkable
          showIcon
          defaultExpandAll
          checkedKeys={checkedKeys}
          onCheck={this.onCheck}
          treeData={treeData}
        />
      </>
    )
  }
}

export default AuthForm
