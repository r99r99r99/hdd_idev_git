<template>
  <div class="app-main">
    <transition mode="out-in" name="fade">
      <keep-alive :include="cachedViews">
        <router-view :key="key" v-if="reload"/>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
  export default {
    name: 'AppMain',
    computed: {
      cachedViews() {
        return this.$store.state.app.cachedViews
      },
      key() {
        return this.$route.name
      },
      reload() { // 刷新页面
        return this.$store.state.app.refreshPage !== true
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss">
  .app-main {
    height: 100%;
    overflow: auto;
  }
</style>
