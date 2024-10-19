import AdminUserList from '../views/dw-admin/AdminUserList'

// v6版本的新路由数组
const routesAdminChildren = [
  {
    path: 'user',
    component: AdminUserList
  }
]

const v6RouteAdmin = {routesAdminChildren}

export {v6RouteAdmin}
