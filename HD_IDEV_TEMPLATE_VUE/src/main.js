import 'babel-polyfill'
import Vue from 'vue'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import hdcom from 'idevvue' // 权限
import i18n from './lang' // 国际化
import App from './App'
import router from './router'
import store from './store'
import * as filters from './filters' // 全局filter
import './icons' // icon
import './errorLog' // error log
import './permission' // 权限
import axios from 'axios'
import schema from 'async-validator'
import HdQuery from './utils/HdQuery'
import keymap from './utils/keymap'
import validateInput from './utils/validateInput'
// idevvue中使用了echarts,为了让idevvue不特别庞大,(echarts1.5M)这样传入
import echarts from 'echarts'

import $ from 'jquery'
/*import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'*/
/*import 'bootstrap-table/dist/bootstrap-table.css'
import 'bootstrap-table/dist/bootstrap-table.js'
import 'bootstrap-table/dist/locale/bootstrap-table-zh-CN.min.js'*/
import 'static/bootstrap/dist/css/bootstrap.css'
import 'static/bootstrap/dist/js/bootstrap.js'
import 'static/bootstrap-table/dist/bootstrap-table.css'
import 'static/bootstrap-table/dist/bootstrap-table.js'
import 'static/bootstrap-table/src/extensions/export/bootstrap-table-export.js'
import 'static/bootstrap-table/src/extensions/export/tableExport.min.js'
import 'static/bootstrap-table/dist/locale/bootstrap-table-zh-CN.min.js'


window.echarts = echarts
if (window.location.href.indexOf('file:') === 0) {
  // 非服务器模式,file模式
  axios.defaults.baseURL = 'http://172.16.30.2:23330' // 放在permission之前防止刷新报错
}

window.schema = schema // 校验
window.HdQuery = HdQuery // 校验
window.HdRules = validateInput // 校验
Vue.prototype.$http = axios
Vue.prototype.$keyMap = keymap // 快捷键匹配

Vue.use(
  hdcom,
  {
    i18n: (key, value) => i18n.t(key, value)
  },
  Element
)

// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
// Vue.prototype.$utils=utils
Vue.config.productionTip = false

const myVue = new Vue({
  el: '#app',
  router,
  store,
  i18n,
  components: { App },
  template: '<App/>'
})
// http请求通用异常处理
axios.interceptors.request.use(
  config => {
    if (!config.data) {
      config.data = {}
    }
    if (myVue.$route) {
      config.headers.mainMenuId = myVue.$route.name // 权限用,设置当前menuId
    }
    if (myVue.$store && myVue.$store.getters && myVue.$store.getters.token) {
      config.headers.hdTokenId = myVue.$store.getters.token // 权限用,设置当前toekn
    }
    if (!config.params) {
      config.params = {}
    }
    config.params.iecacheclear = new Date().getTime() // 只是为了解决ie get请求缓存问题
    return config
  },
  err => {
    return Promise.reject(err)
  }
)

axios.interceptors.response.use(
  response => {
    if (response.data === -999) {
      // 无权限的跳到登录页
      myVue.$store.dispatch('LogOut').then(() => {
        location.reload() // 为了重新实例化vue-router对象 避免bug
      })
    }
    return response
  },
  error => {
    console.warn(error.response)
    if (error && error.response && error.response.data) {
      if (error.response.data.path) {
        myVue.$message({
          type: 'error',
          message: error.response.data.path + '---' + error.response.data.status
        })
      } else if (error.response.data.code === '-1') {
        myVue.$message({
          type: 'error',
          message: error.response.data.message
        })
      } else if (error.response.data.code === '-1') {
        myVue.$message({
          type: 'error',
          message: error.response.data
        })
      }
    }
    return Promise.reject(error)
  }
)
