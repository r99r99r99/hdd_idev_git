import Vue from 'vue'
import Router from 'vue-router'
import axios from 'axios'
/* Layout */
import Layout from '../views/layout/Layout'

Vue.prototype.$ajax = axios
const _import = require('./_import_' + process.env.NODE_ENV)
// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/**
 * hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
 * redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    role: ['admin','editor']     will control the page role (you can set multiple roles)
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
    noCache: true                if fasle ,the page will no be cached(default is false)
  }
 **/
export function genMenu() {
  return new Promise(function (resolve, reject) {
    axios.get('/webresources/login/privilegeVue/findMenu').then(response => {
      let tree = response.data//前台数据
      let hdMenu = []   //组织菜单树
      let hdRouter = [] //router用
      let routChildPathLev1 = {
        path: '',
        component: Layout,
        children: [],
      }

      let orgMeus = {children: []};
      orgMeus = orgForMenu(tree, orgMeus, routChildPathLev1);
      hdRouter.push(routChildPathLev1);

      hdRouter.push({path: '*', redirect: '/404', hidden: true, menuId: 'all'})
      hdMenu = orgMeus.children;
      resolve({hdMenu, hdRouter})
    })
  })
}

/**
 *
 * @param treeInfo  数据
 * @param menuInfo  组织的单位节点
 */
function orgForMenu(treeInfo, menuInfo, routChildPathLev1) {
  treeInfo.forEach(function (leavInfo) {
    //返回组织菜单
    let menuItem = orgLeaf(leavInfo, routChildPathLev1)
    menuInfo.children.push(menuItem);
    if (leavInfo.children && leavInfo.children.length > 0) {
      orgForMenu(leavInfo.children, menuItem, routChildPathLev1);//递归开始
    }
  })
  return menuInfo;
}

/**
 * 组织树叶
 * @param leafItem
 */
function orgLeaf(leafItem, routChildPathLev1) {//添加菜单及router

  let menuItem = {meta: {}}
  menuItem.children = []
  menuItem.meta.title = leafItem.obj.text;
  menuItem.menuId = leafItem.id;
  menuItem.name = leafItem.id;
  if (leafItem.obj) {
    menuItem.meta.enTitle = leafItem.obj.enText;
    menuItem.meta.icon = leafItem.obj.iconCls;
  }

  menuItem.meta.type = leafItem.type;
  menuItem.path = ''
  menuItem.url = leafItem.url;

  if (leafItem.url) {

    let paramIndex = leafItem.url.indexOf("?") //存在参数
    if (paramIndex > 0 && leafItem.type != '2') {//带参数时的系统内菜单

      try {//?a=1 进行处理
        menuItem.meta.addQuery = eval("({" + leafItem.url.substring(paramIndex + 1).replaceAll("=", ':').replaceAll("&", ',') + "})");//类似这种 a=1=>{a:1}
        menuItem.path = "/" + leafItem.url.substring(0, paramIndex) + leafItem.url.substring(paramIndex).replaceAll("\\?", '/').replaceAll("=", '/')
        menuItem.component = _import(leafItem.url.substring(0, paramIndex))
        routChildPathLev1.children.push(menuItem)
      } catch (err) {
        console.error(err)
        return menuItem
      }
    } else if (leafItem.type != '2') {//不带参数的内部
      menuItem.path = "/" + leafItem.url
      menuItem.component = _import(leafItem.url, Vue)
      routChildPathLev1.children.push(menuItem)
    } else {//跳转出去打开
      if (leafItem.url.indexOf("http") >= 0) {//外部地址
        menuItem.redirect = leafItem.url
      } else {
        menuItem.component = _import(leafItem.url)
        routChildPathLev1.children.push(menuItem)
      }
    }
  }

  let result = Object.assign({}, menuItem)//防止router和menu共用一个
  result.children = []
  return result;
}


function loadMenu() {
  return []
}

export const constantRouterMap = [
  {path: '/login', menuId: 'login', component: _import('login/index'), hidden: true},
  {path: '/authredirect', menuId: 'authredirect', component: _import('login/authredirect'), hidden: true},
  {path: '/regist', menuId: 'regist', component: _import('login/registform'), hidden: true},// 添加注册页面的路由器
  {path: '/404', menuId: '404', component: _import('errorPage/404'), hidden: true},
  {path: '/401', menuId: '401', component: _import('errorPage/401'), hidden: true},
  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    menuId: 'mainpage',
    children: [{
      path: 'dashboard',
      component: _import('dashboard/index'),
      name: 'mainpage',
      menuId: 'mainpage',
      meta: {title: '首页', icon: 'dashboard', noCache: true,enText:"Home",enTitle:"Home"}
    }]
  }
]
export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({y: 0}),
  routes: constantRouterMap
})
export const asyncRouterMap = []




