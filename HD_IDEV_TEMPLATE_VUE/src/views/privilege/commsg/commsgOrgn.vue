<template>
  <div style="height: 100%;min-height: 400px">
     <hd-tree :data="hdTree" v-loading="listLoading" node-key="id" ref="orgnTree" style="height: 100%"
             height="100%" show-checkbox></hd-tree>
  </div>
</template>
<script>

  export default {
    name: 'commsgOrgn',
    data: function () {
      return {
        hdTree: [],
        listLoading: false
      }
    },
    methods: {
      doQuery() {
        this.listLoading = true
        this.$http.get(`../webresources/login/com/ComMsg/findOrgnByMsgId/${this.msgId}`).then(response => {
          const data = response.data
          this.hdTree = data
          this.listLoading = false
        })
      },
      getOrgIds() {
        const os = this.$refs.orgnTree.getCheckedNodes(false)
        let orgnIds = ''
        for (let i = 0; i < os.length; i++) {
          orgnIds = orgnIds + os[i].id + ','
        }
        return orgnIds;
      }
    },
    props: ['orgnIds', 'msgId'],
    watch: {
      msgId : function (newVal) {
        this.doQuery()
      }
    }
  }
</script>
