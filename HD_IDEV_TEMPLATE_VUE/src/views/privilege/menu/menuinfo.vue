<template>
  <el-container>
    <el-aside style="border-right: 1px solid #eee" width="260px">
      <hd-tree :data="data" @node-click="handleNodeClick" node-key="id"></hd-tree>
    </el-aside>
    <el-main>
      <el-tabs v-model="activeTab">
        <el-tab-pane :label="$t('角色')" name="role">
          <rolelist ref="rolelist"></rolelist>
        </el-tab-pane>
        <el-tab-pane :label="$t('用户')" name="user">
          <userlist ref="userlist"></userlist>
        </el-tab-pane>
      </el-tabs>
    </el-main>
  </el-container>
</template>
<script>

  import userlist from "./userlist";
  import rolelist from "./rolelist";

  export default {
    components: {
      rolelist,
      userlist},
    data() {
      return {
        data: [],
        hdQuery: new HdQuery(this),
        activeTab: 'role'
      }
    },
    mounted() {
      this.doQuery()
    },
    methods: {
      doQuery() {
        this.$http.post('/webresources/login/privilege/AuthPrivilege/getAllTree').then(response => {
          this.data = response.data
        })
      },
      handleNodeClick(obj) {
        if(!obj.url) {
          this.$refs.userlist.query('xxx');
          return;
        }
        if(this.activeTab === 'role') {
          this.$refs.rolelist.query(obj.id);
        } else if(this.activeTab === 'user') {
          this.$refs.userlist.query(obj.id);
        }
      },
    },
  }
</script>
