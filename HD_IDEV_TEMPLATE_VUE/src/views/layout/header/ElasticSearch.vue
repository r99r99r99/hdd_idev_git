<template>
  <div :class="{'show':show}" class="header-search">
    <svg @click="click" class="search-icon screenfull-svg" height="32" viewBox="-10 -10 150 150"
         width="32" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M124.884 109.812L94.256 79.166c-.357-.357-.757-.629-1.129-.914a50.366 50.366 0 0 0 8.186-27.59C101.327 22.689 78.656 0 50.67 0 22.685 0 0 22.688 0 50.663c0 27.989 22.685 50.663 50.656 50.663 10.186 0 19.643-3.03 27.6-8.201.286.385.557.771.9 1.114l30.628 30.632a10.633 10.633 0 0 0 7.543 3.129c2.728 0 5.457-1.043 7.543-3.115 4.171-4.157 4.171-10.915.014-15.073M50.671 85.338C31.557 85.338 16 69.78 16 50.663c0-19.102 15.557-34.661 34.67-34.661 19.115 0 34.657 15.559 34.657 34.675 0 19.102-15.557 34.661-34.656 34.661"/>
    </svg>
    <el-select
      :remote-method="querySearch"
      @change="change"
      class="header-search-select"
      default-first-option
      filterable
      :placeholder="$t('菜单查询')"
      ref="headerSearchSelect"
      remote
      v-model="search"
    >
      <el-option-group :key="$t('检索菜单')" :label="$t('检索菜单')" v-if="options1.length>0">
        <el-option :key="index" :label="item.title.join(' > ')" :value="item" v-for="item,index in options1"/>
      </el-option-group>
      <el-option-group :key="$t('更多结果')" :label="$t('更多结果')" v-if="options2.length>0">
        <el-option :key="index" :label="item.text" :value="item" v-for="item,index in options2"/>
      </el-option-group>
    </el-select>
  </div>
</template>

<script>
  import Fuse from 'fuse.js'
  import path from 'path'

  export default {
    name: 'ElasticSearch',
    data() {
      return {
        search: '',
        options1: [],
        options2: [],
        searchPool: [],
        show: false,
        fuse: undefined
      }
    },
    computed: {
      routes() {
        return this.$store.state.permission.hdMenu;
      },
      lang() {
        return this.$store.getters.language
      }
    },
    watch: {
      lang() {
        this.searchPool = this.generateRoutes(this.routes)
      },
      routes() {
        this.searchPool = this.generateRoutes(this.routes)
      },
      searchPool(list) {
        this.initFuse(list)
      },
      show(value) {
        if (value) {
          document.body.addEventListener('click', this.close)
        } else {
          document.body.removeEventListener('click', this.close)
        }
      }
    },
    mounted() {
      this.searchPool = this.generateRoutes(this.routes)
    },
    methods: {
      click() {
        this.show = !this.show
        if (this.show) {
          this.$refs.headerSearchSelect && this.$refs.headerSearchSelect.focus()
        }
      },
      close() {
        this.$refs.headerSearchSelect && this.$refs.headerSearchSelect.blur()
        this.options1 = [];
        this.options2 = [];
        this.show = false
      },
      change(val) {
        this.$router.push(val.path)
        this.search = ''
        this.options1 = [];
        this.options2 = [];
        this.$nextTick(() => {
          this.show = false
        })
      },
      initFuse(list) {
        this.fuse = new Fuse(list, {
          shouldSort: true,
          threshold: 0.4,
          location: 0,
          distance: 100,
          maxPatternLength: 32,
          minMatchCharLength: 1,
          keys: [{
            name: 'title',
            weight: 0.7
          }, {
            name: 'path',
            weight: 0.3
          }]
        })
      },
      // Filter out the routes that can be displayed in the sidebar
      // And generate the internationalized title
      generateRoutes(routes, basePath = '/', prefixTitle = []) {
        let res = []
        for (const router of routes) {
          // skip hidden router
          if (router.hidden) {
            continue
          }

          const data = {
            path: path.resolve(basePath, router.path),
            title: [...prefixTitle]
          }

          if (router.meta && router.meta.title) {
            // generate internationalized title
            const i18ntitle = this.$i18n.locale == 'zh' ? router.meta.title : router.meta.enTitle;

            data.title = [...data.title, i18ntitle]

            if (router.redirect !== 'noredirect') {
              // only push the routes with title
              // special case: need to exclude parent router without redirect
              res.push(data)
            }
          }

          // recursive child routes
          if (router.children) {
            const tempRoutes = this.generateRoutes(router.children, data.path, data.title)
            if (tempRoutes.length >= 1) {
              res = [...res, ...tempRoutes]
            }
          }
        }

        return res
      },
      querySearch(query) {
        if (query !== '') {
          this.options1 = this.fuse.search(query)
        } else {
          this.options1 = []
        }


        this.options2 = [{text: this.$t('加载中...')}];
        this.$http.get(`/webresources/login/com/ComSearch/search?q=${query}&type=${this.$i18n.locale}`).then(response => {

          this.options2 = [];
          response.data.forEach(v => {
            let t = v.menuPath.reverse().join('=>')
            if(this.$i18n.locale == 'en') {
              t = v.menuEnPath.reverse().join('=>')
            }

            this.options2.push({
              path: '/' + v.menuUrl + '?q=' + query,
              text: t + '=>' + v.content
            })
          })
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .header-search {
    font-size: 0 !important;

    .search-icon {
      font-size: 18px;
      vertical-align: middle;
      display: inline-block;
      cursor: pointer;
      fill: #e4e9ef;
      /* width: 20px;
       height: 20px;
       vertical-align: 10px;*/
    }

    .header-search-select {
      font-size: 18px;
      transition: width 0.2s;
      width: 0;
      overflow: hidden;
      background: transparent;
      border-radius: 0;
      display: inline-block;
      vertical-align: middle;

      /deep/ .el-input__inner {
        border-radius: 0;
        border: 0;
        padding-left: 0;
        padding-right: 0;
        box-shadow: none !important;
        border-bottom: 1px solid #d9d9d9;
        vertical-align: middle;
      }
    }

    &.show {
      .header-search-select {
        width: 150px;
        margin-left: 10px;
      }
    }
  }
</style>
