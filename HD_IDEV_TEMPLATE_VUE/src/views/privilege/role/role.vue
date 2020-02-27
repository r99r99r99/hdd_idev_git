<template>
  <el-container>
    <el-aside width="40%">
      <rolelist @selRoleId="selRoleId"></rolelist>
    </el-aside>
    <el-main>
      <el-tabs v-model="activeName">
        <el-tab-pane :label="$t('菜单')" name="menu">
          <menuRole :roleId="roleId" v-if="activeName=='menu'&&roleId"></menuRole>
        </el-tab-pane>
        <el-tab-pane :label="$t('数据')" name="data">
          <el-container v-if="activeName=='data'">
            <el-aside width="30%">
              <comMenu @selMenu="selMenu"></comMenu>
            </el-aside>
            <el-main>
              <orgnRole :roleId="roleId" :menuId="menu.id" v-if="roleId&&menu.url"></orgnRole>
            </el-main>
          </el-container>
        </el-tab-pane>
        <el-tab-pane :label="$t('按钮')" name="btn">
          <el-container v-if="activeName=='btn'">
            <el-aside width="30%">
              <comMenu @selMenu="selMenu"></comMenu>
            </el-aside>
            <el-main>
              <btnRole :roleId="roleId" :menu="menu" v-if="roleId&&menu.url" :imFromPro="imFromPro"></btnRole>
            </el-main>
          </el-container>
        </el-tab-pane>
      </el-tabs>
    </el-main>
  </el-container>
</template>
<script>
import btnRole from './btnRole'
import rolelist from './rolelist'
import menuRole from './menuRole'
import orgnRole from './orgnRole'
import comMenu from '../menu/comMenu'

export default {
  components: {
    orgnRole, rolelist, menuRole, btnRole, comMenu
  },
  name: 'role',
  data() {
    return {
      roleId: null,
      menu: {},
      activeName: 'menu'
    }
  },
  props: ['imFromPro'], // imFromPro:import不能来自node_module,需要项目传入
  mounted() {
    this.$route.meta.btnRoleCheck = true // 按钮权限,开启注册
  },
  methods: {
    selRoleId(roleId) {
      this.roleId = roleId
    },
    selMenu(menu) {
      this.menu = menu
    }
  }
}
</script>
