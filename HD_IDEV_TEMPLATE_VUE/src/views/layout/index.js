import HdLayout from './HdLayout'
import HdSearch from './header/HeaderSearch'


export default {
  install(Vue) {//布局,包括菜单,多任务tag,用户设置等
    Vue.component('HdLayout', HdLayout)
    Vue.component('HdSearch', HdSearch)
  }
}


