// import AdminUserList from '../views/dw-admin/AdminUserList'

const AdminUserList = () => import(/* webpackChunkName: "dwsurvey-admin-user" */ '../views/dw-admin/AdminUserList')
const DwSystemSetView = () => import(/* webpackChunkName: "dwsurvey-admin-user" */ '../views/dw-admin/system/DwSystemSetView')

// v6版本的新路由数组
const routesAdminChildren = [
  {
    path: 'user',
    component: AdminUserList
  },
  {
    path: 'system/set',
    component: DwSystemSetView
  }
]

const v6RouteAdmin = {routesAdminChildren}

export {v6RouteAdmin}
