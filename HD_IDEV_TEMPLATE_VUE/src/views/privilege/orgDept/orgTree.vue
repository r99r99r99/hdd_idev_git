<template>
  <hd-tree ref="tree" :show-checkbox="false" :highlight-current="true" :expand-on-click-node="false" :data="hdResult"
           :props="opts" @node-click="handleNodeClick" node-key="id" :filter-node-method="filterNode"
           :default-expanded-keys="defaultExpandedKeys"></hd-tree>
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
  props: { idVal: String }, // 设置value为props属性-必须
  mounted() {
    this.doQuery()
  },
  methods: {
    doQuery() {
      // 显示loading框
      this.listLoading = true
      this.$http.post('/webresources/login/privilege/AuthOrgn/gentree', this.hdQuery).then(response => {
        const data = response.data
        this.hdResult = data
        this.listLoading = false
      })
    },
    handleNodeClick(data) {
      this.$emit('org-node-click', data)
      this.currentNodeData = data
    },
    refresh: function(data) {
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
            array.splice(i, 1)
            break
          }
        }
      }
    },
    filterNode(value, data) {
      if (!value) return true
      return data.text.indexOf(value) !== -1
    },
    filter(val) {
      this.$refs.tree.$refs.eltree.filter(val)
    }
  },
  watch: {
    // 都有值才适合查询
    idVal: function(newVal) {
      this.$refs.tree.$refs.eltree.setCurrentKey(this.idVal)
    }
  },
  computed: {// 给外层v-model赋值
    defaultExpandedKeys() {
      if (this.idVal) {
        return [this.idVal]
      }
      return []
    }
  }
}
</script>
