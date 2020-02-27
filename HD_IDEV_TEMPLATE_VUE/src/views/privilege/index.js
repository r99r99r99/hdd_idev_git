import sysfieldframe from './syscode/sysfieldframe'
import menu from './menu/menu'
import menuinfo from './menu/menuinfo'
import userRole from './userRole/userRole'
import role from './role/role'
import orgDept from './orgDept/orgDept'
import personDept from './personDept/personDept'
import orgTree from './orgDept/orgTree.vue'
import commsg from './commsg/commsg.vue'
import commsgto from './commsg/commsgto.vue'
import syslog from './syslog/syslog.vue'
import syslogframe from './syslog/syslogframe.vue'
import comquartzlog from './quartz/comquartzlog.vue'
import comquartzjob from './quartz/comquartzjob.vue'
import comsearch from './search/comsearch.vue'
import authmobileupdate from './mobile/authmobileupdate.vue'
import comexfield from './exfield/comexfieldsub.vue'
import comexcolumn from './exfield/comexcolumn.vue'

export default {
  install(Vue) {
    Vue.component('PrivilegeSyscode', sysfieldframe)
    Vue.component('PrivilegeMenu', menu)
    Vue.component('MenuInfo', menuinfo)
    Vue.component('PrivilegeRole', role)
    Vue.component('PrivilegeOrgDept', orgDept)
    Vue.component('PrivilegePersonDept', personDept)
    Vue.component('PrivilegeUserRole', userRole)
    Vue.component('PrivilegeComMsg', commsg)
    Vue.component('PrivilegeComMsgTo', commsgto)
   // Vue.component('orgTree', orgTree) // 树组件
    Vue.component('SysLog', syslog) // 日志
    Vue.component('SysLogConfig', syslogframe) // 日志设置
    Vue.component('QuartzLog', comquartzlog) //
    Vue.component('QuartzJob', comquartzjob) //
    Vue.component('Search', comsearch) //
    Vue.component('AuthMobileUpdate', authmobileupdate) //
    Vue.component('ComExField', comexfield) //
    Vue.component('ComExColumn', comexcolumn) //
  }
}

