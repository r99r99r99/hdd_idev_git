<template>
  <div :class="[{hideSidebar:!sidebar.opened}, $store.state.user.skin]" class="hd-layout app-wrapper"
       v-if="!onlyContent">
    <main-header class="hd-header mainHeader" v-if="$store.state.app.headerShow!=false"></main-header>
    <div class="hd-content">
      <hdmenu class="hd-menu sidebar-container"></hdmenu>
      <div class="hd-main main-container">
        <Navbar></Navbar>
        <AppMain style="flex:1"></AppMain>
        <slot></slot>
      </div>
    </div>
  </div>
  <app-main :class="[{hideSidebar:!sidebar.opened}, $store.state.user.skin]" class="app-wrapper" v-else></app-main>
</template>

<script>
  import Navbar from './header/Navbar'
  import TagsView from './header/TagsView'
  import MainHeader from './header/MainHeader'
  import AppMain from './AppMain'
  import hdmenu from './menu'

  export default {
    name: 'layout',
    components: {
      MainHeader,
      Navbar,
      hdmenu,
      AppMain,
      TagsView,
    },
    computed: {
      sidebar() {
        return this.$store.state.app.sidebar
      },
      onlyContent() {
        return this.$route.query.onlycontent == 1
      }
    },
    watch: {
      '$store.state.user.skin': {//弹窗的因为和#app平级,无法换肤
        handler: function (newVal, oldVal) {
          document.getElementsByTagName('body')[0].className = 'body-' + newVal;
          this.$emit("chgTheme", newVal)
        },
        immediate: true
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .hd-layout {
    display: flex;
    flex-direction: column;

    .hd-header {
      height: 52px;
      width: 100%
    }

    .hd-content {
      flex: 1;
      display: flex;
      flex-direction: row;

      .hd-menu {
        width: 50px
      }

      .hd-main {
        flex: 1;
        display: flex;
        flex-direction: column;
      }
    }
  }
</style>
