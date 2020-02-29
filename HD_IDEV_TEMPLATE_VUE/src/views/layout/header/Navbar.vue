<template>
  <el-menu class="navbar" style="padding:0" mode="horizontal">
    <tags-view style="width: calc(100%);height: 100%;"></tags-view>
  </el-menu>
</template>

<script>
  import TagsView from './TagsView'

  export default {
    components: {
      TagsView
    },
    data() {
      return {}
    },
    computed: {},
    methods: {
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .navbar {
    height: 30px; //jianglinghao 513
    line-height: 40px;
    border-radius: 0px !important;

    .hamburger-container {
      /*line-height: 40px;*/
      /*height: 40px;*/
      float: left;
      padding: 0 10px;
    }

    .breadcrumb-container {
      float: left;
    }

    .errLog-container {
      display: inline-block;
      vertical-align: top;
    }

    .right-menu {
      float: right;
      height: 100%;

      &:focus {
        outline: none;
      }

      .right-menu-item {
        display: inline-block;
        margin: 0 8px;
      }

      .screenfull {
        vertical-align: middle;
        height: 40px;
      }

      .international {
        vertical-align: top;

        .international-icon {
          font-size: 20px;
          cursor: pointer;
          vertical-align: -5px;
        }
      }

      .theme-switch {
        vertical-align: 15px;
      }

      .avatar-container {
        height: 40px;
        margin-right: 30px;

        .avatar-wrapper {
          cursor: pointer;
          margin-top: 5px;
          position: relative;

          .user-avatar {
            width: 30px;
            height: 30px;
            border-radius: 10px;
          }

          .el-icon-caret-bottom {
            position: absolute;
            right: -20px;
            top: 25px;
            font-size: 12px;
          }
        }
      }
    }
  }
</style>



