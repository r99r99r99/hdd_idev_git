<template>
  <el-container style="width:auto;height: 100%; border: 1px solid #eee">
    <el-main style="width:auto;">
      <el-row>
        <el-col :span="12">
          <el-card class="menu_his_box-card" style="width:99%;">
            <div slot="header" class="clearfix">
              <span>常用菜单</span>
            </div>
            <div v-for="o in commonUse" v-on:click="openMenu(o)" :key="o.historyId" style="cursor:pointer;width:auto"
                 class="menu_his_text menu_his_item">
              <i class="el-icon-star-off"></i>{{o.title }}
            </div>
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card class="menu_his_box-card" style="width:99%;">
            <div slot="header" class="clearfix">
              <span>最近使用</span>
            </div>
            <div v-for="o in recentUse" v-on:click="openMenu(o)" :key="o.historyId" style="cursor:pointer;width:auto"
                 class="menu_his_text menu_his_item">
              <i class="el-icon-star-off"></i>{{o.title }}
            </div>
          </el-card>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>


<style>
  .menu_his_text {
    font-size: 14px;
  }

  .menu_his_item {
    padding: 18px 0;
  }

  .menu_his_box-card {
    width: auto;
  }
</style>
<script>
  import {constantRouterMap} from '@/router'

  export default {
    components: {},
    data() {
      return {
        hdQuery: new HdQuery(this),
        commonUse: [],
        recentUse: [],
        listLoading: true,
        visible: false
      }
    },
    mounted() {
      this.doQuery()
    },
    methods: {
      doQuery() {
        // 显示loading框
        this.listLoading = true
        this.$http.post('/webresources/login/com/ComMenuHistory/menuCommonUse').then(response => {
          const data = response.data
          this.commonUse = data.data
          this.listLoading = false
        })
        this.$http.post('/webresources/login/com/ComMenuHistory/menuRecentUse').then(response => {
          const data = response.data
          this.recentUse = data.data
          this.listLoading = false
        })
      },
      openMenu(item) {
        let router = this.$store.state.permission.addRouters
        let routerFilter = router[0].children.filter(v => v.menuId == item.menuId)
        if (routerFilter.length > 0) {
          this.$router.push({
            name: item.menuId,
            params: routerFilter[0].meta.addQuery
          })
        }
        this.$http.post('/webresources/login/com/ComMenuHistory/menuClick', item).then(response => {
        })
      }
    }
  }
</script>
