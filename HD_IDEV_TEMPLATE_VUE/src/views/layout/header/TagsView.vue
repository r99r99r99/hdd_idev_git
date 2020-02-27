<template>
  <div class="tags-view-container">
    <scroll-pane class="tags-view-container" ref="scrollPane">
      <router-link
        :class="isActive(tag)?'active':''"
        :key="tag.name"
        :to="{ name: tag.name, params: tag.addQuery}"
        @click.middle.native="closeSelectedTag(tag)"
        @contextmenu.prevent.native="openMenu(tag,$event)"
        class="tags-view-item"
        ref="tag"
        v-for="tag in Array.from(visitedViews)"> <!--name是menuId -->
        {{ $i18n.locale == 'zh' ? tag.title : tag.enTitle }}
        <span @click.stop="closeViewTags(tag,$event)" class="el-icon-close"/>
      </router-link>
      <div @click="headerToggle()" style="position: fixed;right: 20px"><i :class="showHeaderCls"
                                                                          style="font-size:20px;color: #4d90fe"></i>
      </div>
    </scroll-pane>
    <ul :style="{left:left+'px',top:top+'px'}" class="context-menu" v-show="visible">
      <li @click="refreshSelectedTag()">{{ $t('tagsView.refresh') }}</li>
      <li @click="closeOthersTags">{{ $t('tagsView.closeOthers') }}</li>
      <li @click="closeAllTags">{{ $t('tagsView.closeAll') }}</li>
      <li @click="openInNewWin()">{{ $t('tagsView.openNew') }}</li>
    </ul>

  </div>
</template>

<script>
  import ScrollPane from './ScrollPane'

  export default {
    components: {ScrollPane},
    data() {
      return {
        visible: false,
        top: 0,
        left: 0,
        showHeaderCls: 'el-icon-upload2'
      }
    },
    computed: {
      visitedViews() {
        return this.$store.state.app.visitedViews
      }
    },
    watch: {

      $route() {
        this.addViewTags()
      },
      visible(value) {
        if (value) {
          document.body.addEventListener('click', this.closeMenu)
        } else {
          document.body.removeEventListener('click', this.closeMenu)
        }
      }
    },
    mounted() {
      this.addViewTags()
    },
    methods: {
      headerToggle() {
        let st = this.$store.state.app.headerShow
        if (st === false) {
          this.showHeaderCls = 'el-icon-upload2'
          this.$set(this.$store.state.app, 'headerShow', true)
        } else {
          this.showHeaderCls = 'el-icon-download'
          this.$set(this.$store.state.app, 'headerShow', false)
        }
      },
      closeViewTags(view, $event) {
        this.$store.dispatch('delView', view).then((views) => {
          if (this.isActive(view)) {
            const latestView = views.slice(-1)[0]
            if (latestView) {
              this.$router.push(latestView.path)
            } else {
              this.$router.push('/')
            }
          }
        })
        $event.preventDefault()
      },
      generateRoute() {
        if (this.$route.name) {
          return this.$route
        }
        return false
      },
      addViewTags() {
        const route = this.generateRoute()
        if (!route) {
          return false
        }
        this.$store.dispatch('addView', route)
      },
      isActive(route) {
        return route.name === this.$route.name
      },
      refreshSelectedTag() {
        this.$store.dispatch('refreshView', this.$store.state.app.selectedView)
      },
      closeOthersTags() {
        this.$router.push(this.$store.state.app.selectedView)
        this.$store.dispatch('delOthersViews', this.$store.state.app.selectedView).then(() => {
        })
      },
      closeAllTags() {
        this.$store.dispatch('delAllViews')
        this.$router.push('/')
      },
      openMenu(tag, e) {
        const menuMinWidth = 105
        const offsetLeft = this.$el.getBoundingClientRect().left // container margin left
        const offsetWidth = this.$el.offsetWidth // container width
        const maxLeft = offsetWidth - menuMinWidth // left boundary
        const left = e.clientX - offsetLeft + 15 // 15: margin right
        if (left > maxLeft) {
          this.left = maxLeft
        } else {
          this.left = left
        }
        this.top = e.clientY - 40
        this.visible = true
          this.$store.state.app.selectedView = tag
          console.log(this.$store.state.app.selectedView)
      },
      closeMenu() {
        this.visible = false
      },
      openInNewWin() {
          const view = this.$store.state.app.selectedView;
        const routeData = this.$router.resolve({
          name: view.name,
          params: view.params,
          query: {onlycontent: 1}
        })
        window.open(routeData.href, view.name)
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .tags-view-container {
    .tags-view-item {
      display: inline-block;
      position: relative;
      height: 26px;
      line-height: 26px;
      border: 1px solid #d8dce5;
      color: #495060;
      background: #fff;
      padding: 0 8px;
      font-size: 12px;
      margin-left: 5px;
      margin-top: 4px;

      &:first-of-type {
        margin-left: 15px;
      }

      &.active {
        background-color: #409EFF;
        color: #fff;
        border-color: #409EFF;

        &::before {
          content: '';
          background: #fff;
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          position: relative;
          margin-right: 2px;
        }
      }
    }
  }

  .tags-view-container {
    .tags-view-item {
      .el-icon-close {
        width: 16px;
        height: 16px;
        vertical-align: 2px;
        border-radius: 50%;
        text-align: center;
        transition: all .3s cubic-bezier(.645, .045, .355, 1);
        transform-origin: 100% 50%;

        &:before {
          transform: scale(.6);
          display: inline-block;
          vertical-align: -3px;
        }

        &:hover {
          background-color: #b4bccc;
          color: #fff;
        }
      }
    }
  }
</style>
