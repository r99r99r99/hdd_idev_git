<template>
  <el-dialog title="人脸设置" :visible.sync="visible" append-to-body width="900px" top="2vh">
    <el-container style="height:500px">
      <el-aside width="410px">
        <div>{{$t('摄像头')}}</div>
        <video ref="video" width="400px" height="225px" autoplay style="border: solid"></video>
      </el-aside>
      <el-main>
        <div>{{$t('拍照')}}</div>
        <canvas ref='canvas' width="400px" height="225px" style="border: solid"></canvas>
      </el-main>
    </el-container>
    <div slot="footer" class="dialog-footer">
      <el-button @click="faceRemove">{{$t('删除特征')}}</el-button>
      <el-button @click="faceTest">{{$t('人脸测试')}}</el-button>
      <el-button type="primary" @click="capAndSave" keyType="save">
        {{$t('拍照并上传')}}
      </el-button>
      <el-upload style="display: inline"
                 :action="'/webresources/login/com/ComFaceRec/uploadFace?userId='+userId"
                 :show-file-list="false"
                 :on-success="uploadSuccess">
        <el-button>{{$t('上传图片')}}</el-button>
      </el-upload>
    </div>
  </el-dialog>
</template>
<script>
  export default {
    components: {},
    data() {
      return {
        visible: false,
        userId: null,
        account: null
      }
    },

    mounted() {

    },
    methods: {
      show(row) {
        this.userId = row.userId
        this.account = row.account
        this.visible = true
      },
      init() {
        navigator.webkitGetUserMedia({
          video: {width: 1280, height: 720}
        }, this.success, this.error);
      },
      success(stream) {
        this.$refs.video.src = window.URL.createObjectURL(stream);
        this.$refs.video.play();
      },
      error(err) {
        alert('video error: ' + err)
      },
      faceTest() {
        this.$refs.canvas.getContext('2d').drawImage(this.$refs.video, 0, 0, 400, 225);
        let pic = this.$refs.canvas.toDataURL("image/jpg");
        //对其进行base64编 之后的字符串
        pic = pic.replace(/^data:image\/(png|jpg);base64,/, "")
        this.$http.post('/webresources/login/com/ComFaceRec/faceUserTest?account=' + this.account, {
          "imageData": pic
        }).then(response => {
          const data = response.data
          this.$message({
            type: data.code === '-1' ? 'error' : 'success',
            message: data.message
          })
        })
      },
      capAndSave() {
        this.$refs.canvas.getContext('2d').drawImage(this.$refs.video, 0, 0, 400, 225);
        let pic = this.$refs.canvas.toDataURL("image/jpg");
        //对其进行base64编 之后的字符串
        pic = pic.replace(/^data:image\/(png|jpg);base64,/, "")
        this.$http.post('/webresources/login/com/ComFaceRec/faceUserSave?userId=' + this.userId, {
          "imageData": pic
        }).then(response => {
          const data = response.data
          this.$message({
            type: data.code === '-1' ? 'error' : 'success',
            message: data.message
          })
        })
      },
      uploadSuccess(response) {
        console.info(response)
        const data = response
        this.$message({
          type: data.code === '-1' ? 'error' : 'success',
          message: data.message
        })
      },
      faceRemove() {
        this.$http.post('/webresources/login/com/ComFaceRec/faceUserRemove?userId=' + this.userId).then(response => {
          const data = response.data
          this.$message({
            type: data.code === '-1' ? 'error' : 'success',
            message: data.message
          })
        })
      }
    },
    watch: {
      visible(nowVal) {
        if (nowVal) {
          this.init()
        } else {
        }
      }
    }
  }
</script>
