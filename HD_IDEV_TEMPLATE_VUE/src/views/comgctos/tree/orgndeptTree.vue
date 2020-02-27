<template>
  <hd-tree ref="tree" :show-checkbox="false" :highlight-current="true" :expand-on-click-node="true" :data="hdResult"
           :props="opts" @node-click="handleNodeClick" node-key="id"></hd-tree>
</template>

<script>

  export default {
    name: 'orgTree',
    data() {
      return {
        hdQuery: new HdQuery(this),
        hdResult: [],
        listLoading: true,
        visible: false,
        opts: {
          label: 'text'
        },
        currentNodeData: {}
      }
    },
    mounted() {
      this.hdQuery.add('deptFlag', this.deptFlag)
      this.doQuery()
    },
    props: {deptFlag: String},
    methods: {
      doQuery() {
        // 显示loading框
        this.listLoading = true
        this.$http.post('/webresources/login/code/AuthOrgnExt/gentree', this.hdQuery).then(response => {
          const data = response.data
          this.hdResult = data
          this.listLoading = false
        })
      },
      handleNodeClick(data) {
        this.$emit('org-node-click', data)
        this.currentNodeData = data
      },
      refresh: function (data) {
        const tree = this.$refs.tree.$refs.eltree
        if (data.type === 'add') {
          this.currentNodeData.children.push(data.data)
        } else if (data.type === 'edit') {
          const array = this.currentNodeData.children
          for (let i = 0; i < array.length; i++) {
            const obj = array[i]
            if (obj.id === data.data.id) {
              Object.assign(array[i], data.data)
              break
            }
          }
        } else if (data.type === 'remove') {
          const array = this.currentNodeData.children
          for (let i = 0; i < array.length; i++) {
            const obj = array[i]
            if (obj.id === data.data.id) {
              array.splice(i, 1);
              break
            }
          }
        }
      }
    }
  }
</script>
