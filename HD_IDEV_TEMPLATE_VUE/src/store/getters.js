const getters = {//getters的作用只是简化写法,不要用了,直接 state.user.orgnId就行,wxl
  sidebar: state => state.app.sidebar,
  language: state => state.app.language,
  visitedViews: state => state.app.visitedViews,
  cachedViews: state => state.app.cachedViews,
  selectedView: state => state.app.selectedView,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  skin: state => state.user.skin,
  introduction: state => state.user.introduction,
  status: state => state.user.status,
  roles: state => state.user.roles,
  setting: state => state.user.setting,
  permission_routers: state => state.permission.routers,
  hdMenu: state => state.permission.hdMenu,
  addRouters: state => state.permission.addRouters,
  companyId: state => state.user.companyId
}
export default getters
