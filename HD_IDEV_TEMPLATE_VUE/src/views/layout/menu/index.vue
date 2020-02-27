<template>
  <scroll-bar>
    <el-menu :collapse="isCollapse" :default-active="$route.name" active-text-color="#ffffff" background-color="#ffffff"
             mode="vertical" text-color="#fff">
      <HdMenu :routes="hdMenu"></HdMenu>
    </el-menu>
  </scroll-bar>
</template>

<script>
  import {mapGetters} from 'vuex'
  import ScrollBar from './ScrollBar'
  import HdMenu from './HdMenu'

  export default {
    components: {HdMenu, ScrollBar},
    computed: {
      ...mapGetters([
        'hdMenu',
        'sidebar'
      ]),
      isCollapse() {
        return !this.sidebar.opened
      }
    }
  }
</script>
