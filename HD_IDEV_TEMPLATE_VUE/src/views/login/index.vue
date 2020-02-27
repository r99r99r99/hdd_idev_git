<style lang="scss" rel="stylesheet/scss" scoped>
  @import "src/styles/login/login.scss";
</style>

<template>
  <div class="swiper-container loginPage">
    <div class="swiper-wrapper">
      <div class="swiper-slide slide2">
        <div class="inner" style="visibility: hidden;">

          <!--<img :src="header" class="ani img zh-a-2" swiper-animate-effect="zoomIn" swiper-animate-duration="1s" swiper-animate-delay="0s">
           <a href="http://www.baidu.com">
             <img :src="c1" class="ani img zh-a-1" swiper-animate-effect="bounceInDown" swiper-animate-duration="1s" swiper-animate-delay="0.1s"></a>
           <a href="http://www.huadong.net">
             <img :src="c2" class="ani img zh-a-3" swiper-animate-effect="bounceInDown" swiper-animate-duration="1s" swiper-animate-delay="0.2s"></a>
           <img :src="c3" class="ani img zh-a-4" swiper-animate-effect="bounceInDown" swiper-animate-duration="1s" swiper-animate-delay="0.3s">
           <img :src="c4" class="ani img zh-a-5" swiper-animate-effect="bounceInDown" swiper-animate-duration="1s" swiper-animate-delay="0.4s">
           <img :src="c5" class="ani img zh-a-6" swiper-animate-effect="bounceInDown" swiper-animate-duration="1s" swiper-animate-delay="0.5s">-->
          <img :src="header" class="ani img zh-a-2" swiper-animate-effect="zoomIn" swiper-animate-duration="1s"
               swiper-animate-delay="0s">
          <a href="#">
            <img :src="c1" onMouseOver="this.src='static/images/c1-1.png'"
                 onMouseOut="this.src='static/images/c1.png'" class="ani img zh-a-1"
                 swiper-animate-effect="bounceInDown" swiper-animate-duration="1s" swiper-animate-delay="0.1s">
          </a>
          <a href="#">
            <img :src="c2" onMouseOver="this.src='static/images/c2-1.png'"
                 onMouseOut="this.src='static/images/c2.png'" class="ani img zh-a-3"
                 swiper-animate-effect="bounceInDown" swiper-animate-duration="1s" swiper-animate-delay="0.2s">
          </a>
          <a href="#">
            <img :src="c3" onMouseOver="this.src='static/images/c3-1.png'"
                 onMouseOut="this.src='static/images/c3.png'" class="ani img zh-a-4"
                 swiper-animate-effect="bounceInDown" swiper-animate-duration="1s" swiper-animate-delay="0.3s">
          </a>
          <a href="#">
            <img :src="c4" onMouseOver="this.src='static/images/c4-1.png'"
                 onMouseOut="this.src='static/images/c4.png'" class="ani img zh-a-5"
                 swiper-animate-effect="bounceInDown" swiper-animate-duration="1s" swiper-animate-delay="0.4s">
          </a>
          <a href="#" class="round-link">
            <img :src="c5" onMouseOver="this.src='static/images/c5-1.png'"
                 onMouseOut="this.src='static/images/c5.png'" class="ani img zh-a-6"
                 swiper-animate-effect="bounceInDown" swiper-animate-duration="1s" swiper-animate-delay="0.5s">
          </a>
          <div class="panel panel-default well loginBg ani" swiper-animate-effect="bounceInRight"
               swiper-animate-duration="1s" swiper-animate-delay="0.7s" style="visibility: hidden;">
            <div class="panel-heading" style="background-color:transparent; border-bottom:1px solid #bbb;">
              <div class="panel-title" style="color:#fff;">用户登录</div>
            </div>
            <div class="panel-body loginForm">
              <el-form class="form-horizontal" autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm"
                       v-show="showtab=='1'">
                <div class="form-group">
                  <div class="col-md-12">
                    <div class="input-group"><span class="input-group-addon"> <i
                      class="glyphicon glyphicon-user"></i></span>
                      <input type="text" class="form-control" id="userCod" name="account" placeholder="用户名"
                             v-model="loginForm.account" autocomplete="on" autofocus/>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-sm-12">
                    <div class="input-group"><span class="input-group-addon"><i
                      class="glyphicon glyphicon-lock"></i> </span>
                      <input class="form-control" id="password" name="password" placeholder="密码"
                             :type="pwdType" @keyup.enter.native="handleLogin" v-model="loginForm.password"
                             autocomplete="on"/>
                    </div>
                  </div>
                </div>
                <div style="margin-bottom: 15px; width: auto;" class="form-group">
                  <div id="verify" class="col-sm-12">
                    <div class="input-group"><span class="input-group-addon"> <i
                      class="glyphicon glyphicon-transfer"></i> </span>
                      <input type="text" class="form-control" id="verifyCod" name="verifyCod" placeholder="验证码"
                             autocomplete="off"/>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-sm-6">
                    <el-button type="submit" class="btn btn-primary btn-block login_bn" :loading="loading"
                               @click.native.prevent="handleLogin"> 登&nbsp;&nbsp;&nbsp;&nbsp;录
                    </el-button>
                  </div>
                  <div class="col-sm-6">
                    <el-button type="submit" class="btn btn-primary btn-block login_bn" :loading="loading"
                               @click.native.prevent="doRegist"> 注&nbsp;&nbsp;&nbsp;&nbsp;册
                    </el-button>
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-sm-12">
                    <el-button class="btn btn-primary btn-block login_bn" @click="doFaceLogin">免密人脸识别
                    </el-button>
                  </div>

                </div>
                <!--<div  class="form-group">
                  <div class="col-sm-6">
                    <el-button  class="btn btn-primary btn-block login_bn"  @click="qrCodeLogin">二维码登录
                    </el-button>
                  </div>
                </div>-->
              </el-form>
              <div v-show="showtab=='2'">
                <vue-qr style="text-align: center" :logoSrc="qrcode" :text="juIdStr" :size="200" :margin="0"></vue-qr>
              </div>
              <hr class="footer-hr"/>
              <div class="loginWx"><img :src="wxPic" width="70" height="70" class="wxImg" alt="" @click="ck()"/></div>
              <div class="loginWx" style="text-align:left;">欢迎关注微信办理业务<br>
                <img :src="checkIcon" width="18" height="17" alt=""/>&nbsp;查询业务<br>
                <img :src="checkIcon" width="18" height="17" alt=""/>&nbsp;办理业务<br>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="login-footer">版权所有：烟台华东电子科技有限公司 <a href="http://www.miibeian.gov.cn" target="_blank">鲁ICP备05016100</a>
      鲁公网安备 37061302000012号
    </div>
    <div class="pagination"></div>
    <facelogin ref="facelogin"></facelogin>
    <registform ref="registform"></registform>
  </div>
</template>

<script>
  import header from 'static/images/header.png'
  import c1 from 'static/images/c1.png'
  import c2 from 'static/images/c2.png'
  import c3 from 'static/images/c3.png'
  import c4 from 'static/images/c4.png'
  import c5 from 'static/images/c5.png'
  import qrcode from 'static/images/wxPic.jpg'
  import wxPic from 'static/images/wxPic.jpg'
  import checkIcon from 'static/images/checkIcon.png'
  import registform from './registform'
  import facelogin from './facelogin'
  import VueQr from 'vue-qr'
  import { setToken } from '@/utils/auth'
  import 'swiper/dist/idangerous.swiper.css'
  import Swiper from 'swiper/dist/idangerous.swiper.js'
  import * as swiperAni from 'static/js/swiper.animate1.0.2.min.js'
  import 'static/css/animate.min.css'

  export default {
    name: 'login',
    components: { registform, facelogin, VueQr },
    data() {
      return {
        loginForm: {
          account: 'admin',
          password: 'ok123'
        },
        loginRules: {
          account: [{ required: true, trigger: 'blur', message: '账号不能为空' }]
        },
        pwdType: 'password',
        loading: false,
        showDialog: false,
        header: header,
        c1: c1,
        c2: c2,
        c3: c3,
        c4: c4,
        c5: c5,
        qrcode: qrcode,
        wxPic: wxPic,
        checkIcon: checkIcon,
        juIdStr: '',
        codeVal: '',
        showtab: '1'

      }
    },
    mounted() {
      this.animate()
    },
    methods: {
      addScript() {
        var head = document.getElementsByTagName('head')[0]
        var script = document.createElement('script')
        script.onload = script.onreadystatechange = () => {
          if (!this.readyState || this.readyState === 'loaded' || this.readyState === 'complete') {
            this.initPdf()
            script.onload = script.onreadystatechange = null
          }
        }
        script.type = 'text/javascript'
        script.src = 'static/js/simsun.js'
        head.appendChild(script)
      },
      showPwd() {
        if (this.pwdType === 'password') {
          this.pwdType = ''
        } else {
          this.pwdType = 'password'
        }
      },
      animate() {
        var mySwiper = new Swiper('.swiper-container', {
          pagination: '.pagination',
          paginationClickable: true,
          autoplay: 10000,
          speed: 1,

          //autoplayDisableOnInteraction : false,

          onInit: function(swiper) { //Swiper2.x的初始化是onFirstInit
            swiperAni.swiperAnimateCache(swiper) //隐藏动画元素
            swiperAni.swiperAnimate(swiper) //初始化完成开始动画
          },
          onSlideChangeEnd: function(swiper) {
            swiperAni.swiperAnimate(swiper) //每个slide切换结束时也运行当前slide动画
          }
        })
      },
      handleLogin() {
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            this.loading = true
            this.$store.dispatch('LoginByUsername', this.loginForm).then(() => {
              this.loading = false
              this.$store.dispatch('GenerateRoutes', {}).then(() => {
                this.$router.addRoutes(this.$store.getters.addRouters)
                this.$router.push({ path: '/' })
              })
              // this.showDialog = true
            }).catch((data) => {
              this.loading = false
              this.$message({
                type: 'error',
                message: data.message
              })
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      doRegist() {
        let registHref = location.href.replace('login', 'regist')
        window.open(registHref)
        // this.$router.push({path: '/regist'})

        //this.$refs['registform'].show()
      },
      doFaceLogin() {
        this.$refs.facelogin.show(this.loginForm.account)
      },
      qrCodeLogin() {
        /*     let qrcode = new QRCode('qrcodeCanvas', {
               width: 100,
               height: 100, // 高度
               text: '56663159', // 二维码内容
               image: '../../usa.png',
                render: 'canvas', // 设置渲染方式（有两种方式 table和canvas，默认是canvas）
                background: '#f0f',
                foreground: '#ff0',
             })*/
        this.juIdStr = this.guid()//生成JUID
        this.queryFrom()
      },
      S4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(32).substring(1)
      },
      guid() {
        return (this.S4() + this.S4() + '-' + this.S4() + '-' + this.S4() + '-' + this.S4() + '-' + this.S4() + this.S4() + this.S4())
      },
      query1() {
        this.$http.post('/outernet/login/priviledge/AuthChkLogin/findById?ckId=' + this.juIdStr).then(response => {
          this.loading = false
          const data = response.data
          if (data) {
            clearInterval(this.codeVal)
            setToken(data)
            location.reload()
          }
        })
      },
      queryFrom() {
        this.codeVal = setInterval(this.query1, 1000)//每 1 秒轮循一次
      },
      ck() {
        if (this.showtab == '1') {
          this.showtab = '2'
          this.qrCodeLogin()// 扫码登录
        } else {
          this.showtab = '1'
        }
      }

    },

    created() {
      // window.addEventListener('hashchange', this.afterQRScan)
    },
    destroyed() {
      // window.removeEventListener('hashchange', this.afterQRScan)
    }
  }
</script>

<!--<style src="/assets/css/bootstrap.min.css" scoped></style>
<style src="/assets/css/login.css" scoped></style>
<style src="/assets/css/navbar-static-top.css" scoped></style>-->
