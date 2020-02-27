<template>
  <el-container>
    <el-aside width="50%">
      <comexcolumn @rowClick="rowClick"></comexcolumn>
    </el-aside>
    <el-main>
      <comexfieldsub ref="comexfieldsub"></comexfieldsub>
    </el-main>
  </el-container>
</template>
<script>
  import comexfieldsub from './comexfieldsub'
  import comexcolumn from "./comexcolumn";
  export default {
    name: 'comexfield',
    components: {comexcolumn,  comexfieldsub },
    data() {
        return {
        }
    },

    mounted() {

    },
    methods: {
      rowClick(row) {
          this.$refs['comexfieldsub'].query(row.exColumnId)
      }
    }
  }
</script>
