import {
  HomeOutlined,
  AreaChartOutlined,
  UserOutlined,
  ShoppingOutlined,
  TagsOutlined,
  ShoppingCartOutlined,
  TeamOutlined
} from '@ant-design/icons'

const menuList = [
  {
    title: '首页',
    key: '/home',
    icon: <HomeOutlined />
  },
  {
    title: '商品',
    key: '/products',
    icon: <ShoppingOutlined />,
    children: [
      {
        title: '品类管理',
        key: '/category',
        icon: <TagsOutlined />
      },
      {
        title: '商品管理',
        key: '/product',
        icon: <ShoppingCartOutlined />
      }
    ]
  },
  {
    title: '用户管理',
    key: '/user',
    icon: <UserOutlined />
  },
  {
    title: '角色管理',
    key: '/role',
    icon: <TeamOutlined />
  },
  {
    title: '图形图表',
    key: '/charts',
    icon: <AreaChartOutlined />
  }
]

export default menuList
