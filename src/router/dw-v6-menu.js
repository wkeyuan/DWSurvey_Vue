// 用于定义左右结构右边菜单，未用于路由注册，相关路由注册在v6Routes里面完成
const dwMenus = [
  {
    path: '/dw/survey',
    icon: 'el-icon-s-claim',
    name: '我的问卷',
    meta: {
      title: '我的问卷'
    }
  },
  {
    path: '/dw/user',
    icon: 'el-icon-user',
    name: '个人中心',
    meta: {
      title: '个人中心'
    }
  }
]

const dwMenusAdmin = [
  {
    path: '/dw/admin/user',
    icon: 'el-icon-s-check',
    name: '用户管理',
    meta: {
      title: '用户管理'
    }
  }
]

const dwV6Menu = {dwMenus, dwMenusAdmin}

export {dwV6Menu}
