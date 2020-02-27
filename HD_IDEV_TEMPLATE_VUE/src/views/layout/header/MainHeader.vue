<template>
  <div>
    <div class="headerLogo"></div>
    <div class="headerIcon">
      <a @click="logout" class="headerIconLink5" href="javascript:void(0)"><!--退出--></a>


      <el-dropdown class="avatar-container right-menu-item" style="float: right" trigger="click">
        <a class="headerIconLink7" href="javascript:void(0)">
          <el-badge :hidden="$store.state.user.messageNum==0" :max="99" :value="$store.state.user.messageNum"
                    style="float: left;"></el-badge>
          <!--<el-badge :value="$store.state.user.messageNum" :hidden="$store.state.user.messageNum==0" :max="99">-->
          <div class="avatar-wrapper" style="float: left;">
            <span class="headerIconFontColor"> {{name}}</span>
          </div>
        </a>

        <el-dropdown-menu slot="dropdown">
          <router-link to="/">
            <el-dropdown-item>
              {{$t('首页')}}
            </el-dropdown-item>
          </router-link>
          <el-dropdown-item>
            <span @click="changePsw" style="display:block;"> {{$t('修改密码')}}</span>
          </el-dropdown-item>
          <el-dropdown-item>
            <span @click="editBoard" style="display:block;"> {{$t('修改首页')}}</span>
          </el-dropdown-item>
          <el-dropdown-item>

            <span @click="showMessage" style="display:block;">
              {{$t('查看消息')}}
              <el-badge :hidden="$store.state.user.messageNum==0" :max="99"
                      :value="$store.state.user.messageNum" type="warning" style="margin-top: -5px"/>
            </span>

          </el-dropdown-item>

          <!--<el-dropdown-item>
            <span @click="chgLanguage" style="display:block;">{{nextLanguage}}</span>
          </el-dropdown-item>-->
        </el-dropdown-menu>
      </el-dropdown>


      <el-dropdown class="avatar-container right-menu-item" style="float: right" trigger="click">
        <a class="headerIconLink3" href="javascript:void(0)">
          <div class="avatar-wrapper">
            <i class="el-icon-caret-bottom headerIconFontColor"></i>
          </div>
        </a>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            <span @click="changeStyle('metro-orange')" style="display:block;"> {{$t('橙色')}}</span>
          </el-dropdown-item>
          <el-dropdown-item>

            <span @click="changeStyle('metro-green')" style="display:block;"> {{$t('绿色')}}</span>
          </el-dropdown-item>
          <el-dropdown-item>
            <span @click="changeStyle('metro-mauves')" style="display:block;"> {{$t('紫色')}}</span>
          </el-dropdown-item>
          <el-dropdown-item>
            <span @click="changeStyle('metro-blue')" style="display:block;"> {{$t('蓝色')}}</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>

      <el-dropdown class="avatar-container right-menu-item" style="float: right" trigger="hover">
        <a :class="colorStyle" href="javascript:void(0)">
          <div class="avatar-wrapper">
            <i class="el-icon-caret-bottom headerIconFontColor"></i>
          </div>
        </a>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            <span @click="changeLanguage('zh')" style="display:block;">中文</span>
            <!--<span @click="chgLanguage" style="display:block;">{{nextLanguage}}</span>-->
          </el-dropdown-item>
          <el-dropdown-item>
            <span @click="changeLanguage('en')" style="display:block;">English</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>

      <div class="avatar-container right-menu-item" style="float: right" trigger="click">
        <a class="mike" href="javascript:void(0)">
          <div @shortkey="vocHotKey" v-shortkey.push="['ctrl','`']">
          </div>
        </a>
      </div>

      <a class="headerIconLink2" href="javascript:void(0)">
        <screenfull class="screenfull right-menu-item" style="padding-top:2px"></screenfull>
        <!-- 全屏-->
      </a>
      <search class="avatar-container right-menu-item" style="float: right"></search>


      <changepswform ref="changepswform"></changepswform>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import Screenfull from './Screenfull'
  import search from './ElasticSearch'
  import changepswform from './changepswform'
  import VocRec from './VocRec'


  export default {
    name: 'mainHeader',
    mixins: [VocRec],
    components: {
      Screenfull,
      changepswform,
      search
    },
    data() {
      return {
        show: false,
        params: {
          entityId: this.$store.getters.token,
          entityName: 'avatar'
        },
        headers: {
          smail: '*_~'
        },
        imgDataUrl: '', // the datebase64 url of created image
        style: this.$store.state.user.skin,
        //log: errLogStore.state.errLog
      }
    },
    mounted() {
      //this.screenShotFn = screenShot([16, 65], 27);
      if (this.$store.state.user.nextChgId == "1") {
        this.changePsw();
      }
      this.$i18n.locale = this.$store.state.user.language || 'zh';
      this.placeholderChg()
    },
    computed: {
      ...mapGetters([
        'sidebar',
        'name',
        'avatar',
        'language'
      ]),
      nextLanguage() {
        if (this.$i18n.locale == 'zh') {
          return 'English'
        } else {
          return '中文'
        }
      },
      colorStyle() {
        if (this.$i18n.locale == 'zh') {
          return 'zhjack'
        } else {
          return 'enjack'
        }
      }
    },
    methods: {
      // toggleSideBar() {
      //   this.$store.dispatch('toggleSideBar')
      // },
      // handleSetLanguage(lang) {
      //   this.$i18n.locale = lang
      //   this.$store.dispatch('setLanguage', lang)
      //   this.$message({
      //     message: 'switch language success',
      //     type: 'success'
      //   })
      // },

      editBoard() {
        this.$router.push({
          path: '/dashboard',
          query: {
            isEdit: '1'
          }
        })
      },
      logout() {
        this.$store.dispatch('LogOut').then(() => {
          location.reload()// 为了重新实例化vue-router对象 避免bug
        })
      },
      changePsw() {
        this.$refs['changepswform'].show()
      },
      changeAvatar() {
        this.show = !this.show
      },
      /**
       * crop success
       *
       * [param] imgDataUrl
       * [param] field
       */
      cropSuccess(imgDataUrl, field) {
        // console.log('-------- crop success --------')
        // this.imgDataUrl = imgDataUrl
        // store.getters.avatar = imgDataUrl
        this.$store.state.user.avatar = imgDataUrl;
      },
      /**
       * upload success
       *
       * [param] jsonData   服务器返回数据，已进行json转码
       * [param] field
       */
      cropUploadSuccess(jsonData, field) {
        // console.log('-------- upload success --------')
        // console.log(jsonData)
        // console.log('field: ' + field)
        // this.imgDataUrl = 'webresources/login/com/comfileupload/download?uploadId=' + jsonData.message
      },
      /**
       * upload fail
       *
       * [param] status    server api return error status, like 500
       * [param] field
       */
      cropUploadFail(status, field) {
        // console.log('-------- upload fail --------')
        // console.log(status)
        // console.log('field: ' + field)
      },
      changeStyle(style) {
        this.$store.state.user.skin = style;
        this.$http.get(`/webresources/login/privilege/AuthUser/updateUserStyleCss/${style}?stylecss=${style}`).then(response => {
          const data = response.data

        })
      },
      showMessage() {
        this.$router.push({path: '/privilege/commsgto'})
      },
      changeLanguage(val) {
        this.$i18n.locale = val
        this.$store.state.user.language = val;
        this.placeholderChg()
        this.$http.get(`/webresources/login/privilege/AuthUser/updateUserLanguage/${val}`).then(response => {
          const data = response.datas
        })
      },
      placeholderChg() {
        this.$date.placeholder = this.$t('选择日期')
        this.$time.placeholder = this.$t('选择时间')
        this.$simdate.placeholder = this.$t('选择日期')
        this.$simtime.placeholder = this.$t('选择时间')
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .screenfull {
    vertical-align: middle;
    height: 40px;
  }

  .right-menu-item {
    display: inline-block;
    margin: 0 8px;
  }

  .item {
    position: absolute;
    z-index: 2000;
    margin-left: -10px;
  }

  .el-icon-caret-bottom:before {
    content: "" !important;
  }
</style>
