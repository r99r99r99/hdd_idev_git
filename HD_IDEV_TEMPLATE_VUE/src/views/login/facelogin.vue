<template>
  <el-dialog title="人脸登录" :visible.sync="visible" append-to-body width="500px" top="15vh">
    <el-container style="height:300px">
      <el-main>
        当前账号为{{account}}
        <video ref="video" width="400" height="225" autoplay></video>
        <canvas ref='canvas' width="400px" height="225px" style="display: none"></canvas>
      </el-main>
    </el-container>
  </el-dialog>
</template>
<script>
  import {setToken} from '@/utils/auth'

  export default {
    components: {},
    data() {
      return {
        video: null,
        account: null,
        visible: false,
        stream: null
      }
    },

    mounted() {

    },
    methods: {
      show(account) {
        this.visible = true
        this.account = account
        this.init()
      },
      init() {
        navigator.webkitGetUserMedia({
          video: {width: 1280, height: 720}
        }, this.success, this.error);
        this.$nextTick(() => {
          this.video = this.$refs.video
          this.capAndLogin()
        })
      },
      success(stream) {
        this.stream = stream
        this.video.src = window.URL.createObjectURL(stream);
        this.video.play();
      },
      error(err) {
        alert('video error: ' + err)
      },
      capAndLogin() {
        this.$refs.canvas.getContext('2d').drawImage(this.video, 0, 0, 400, 225);
        let pic = this.$refs.canvas.toDataURL("image/jpg");
//对其进行base64编 之后的字符串
        pic = pic.replace(/^data:image\/(png|jpg);base64,/, "")
        this.$http.post('PrivilegeVueController/loginByFace?account=' + this.account, {"imageData": pic}).then(response => {
          const data = response.data
          if (data.code == '-2') {
            this.$message({
              type: 'error',
              message: data.message,
              duration: 9999999
            })
            return false
          } else if (data.code == '1') {
            this.$message({
              type: 'success',
              message: '验证成功,正在登录',
            })
            this.stream.getTracks()[0].stop();//停止摄像头调用
            //permession有token一刷新就会到首页
            setToken(data.data.token)
            location.reload();
          } else {
            if (this.visible) {
              this.capAndLogin()
            }
            return false
          }
        }).catch(() => {
          if (this.visible)
            this.capAndLogin()
        })

      }
    },
    watch: {
      visible(newVal) {
        if (newVal == false) {//停止摄像头调用
          this.stream.getTracks()[0].stop();
        }
      }
    }
  }
</script>
