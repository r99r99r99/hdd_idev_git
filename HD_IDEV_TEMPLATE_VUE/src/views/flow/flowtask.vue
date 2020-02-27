<template>
  <el-tabs :lazy="true" class="tabStart" v-model="activeName">
    <el-tab-pane :label="$t('待办任务')" name="todo">
      <mytodotask ref="todo"></mytodotask>
    </el-tab-pane>
    <el-tab-pane :label="$t('已办任务')" name="hasdo">
      <myapprovetask></myapprovetask>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
  import mytodotask from './mytodotask'
  import myapprovetask from './myapprovetask'


  export default {
    components: {mytodotask, myapprovetask},
    data() {
      return {
        activeName: '',
      }
    },

    mounted() {
      this.activeName = 'todo'
    },
    methods: {},
    watch: {},
  }
</script>
