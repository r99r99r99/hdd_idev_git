import {asyncRouterMap, constantRouterMap, genMenu} from '@/router'

/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {

  return true

}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param asyncRouterMap
 * @param roles
 */
function filterAsyncRouter(asyncRouterMap, roles) {
  // const accessedRouters = asyncRouterMap.filter(route => {
  //
  //   if (hasPermission(roles, route)) {
  //     if (route.children && route.children.length) {
  //       route.children = filterAsyncRouter(route.children, roles)
  //     }
  //     return true
  //   }
  //   return false
  // })
  return asyncRouterMap
}

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: [],
    btnRole: []//按钮权限
  },
  mutations: {
    SET_ROUTERS: (state, {hdMenu, hdRouter}) => {
      state.addRouters = hdRouter
      state.hdMenu = hdMenu
      state.routers = constantRouterMap.concat(hdRouter)
    }
  },
  actions: {
    GenerateRoutes({commit}, data) {
      return new Promise(resolve => {
        genMenu().then(function ({hdMenu, hdRouter}) {
          commit('SET_ROUTERS', {hdMenu, hdRouter})
          resolve()

        })
      })
    }
  }
}

export default permission
