import router from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css' // Progress 进度条样式
import { getToken, removeToken, setToken } from '@/utils/auth' // 验权
import { Message } from 'element-ui'

const whiteList = ['/login', '/authredirect', '/regist'] // 不重定向白名单
//过滤器，当用户没有登录的时候跳转到登录页面  note by xlj
router.beforeEach((to, from, next) => {
  if (to.query && to.query.hdTokenId) {
    // 允许url中带?hdTokenId=id_md5password,实现直接登录
    setToken(to.query.hdTokenId)
  }
  NProgress.start() // 开启Progress
  if (getToken()) {
    // 判断是否有token
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done() // router在hash模式下 手动改变hash 重定向回来 不会触发afterEach 暂时hack方案 ps：history模式下无问题，可删除该行！
    } else {
      if (!store.state.user.userId) {
        // f5页面刷新时动作
        store
          .dispatch('GetUserInfo')
          .then(res => {
            // 拉取user_info
            store.dispatch('GenerateRoutes', {}).then(() => {
              // 获取菜单
              router.addRoutes(store.getters.addRouters) //
              let myr = store.getters.addRouters
              let routerFilter = myr[0].children.filter(v => {
                return v.path == to.path
              })
              if (routerFilter.length == 0 || !routerFilter[0].name) {
                next({ path: '/' }) // 在name获取不到时,跳到首页,出现的情况刷新页面 :404时,cookie被另外账号替换时,没有此菜单时
              } else {
                // 2018.8.9 wxl增加 query: to.query,新菜单(?onlycontent=1)实现只展示内容
                next({
                  name: routerFilter[0].name,
                  params: routerFilter[0].meta.addQuery,
                  query: to.query
                })
              }
            })
          })
          .catch(() => {
            store.dispatch('FedLogOut').then(() => {
              Message.error('验证失败,请重新登录')
              next({ path: '/login' })
            })
          })
      } else {
        next()
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      // 在免登录白名单，直接进入
      next()
    } else {
      next('/login') // 否则全部重定向到登录页
      NProgress.done() // router在hash模式下 手动改变hash 重定向回来 不会触发afterEach 暂时hack方案 ps：history模式下无问题，可删除该行！
    }
  }
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})
