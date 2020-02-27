<script>
  import './HZRecorder.js'

  export default {
    name: 'VocRec',
    components: {},
    mounted() {
      this.vocRec()
    },
    data() {
      return {
        vocTimeHandle: null,
        vocTime: 0,//录制的毫秒数,低于1秒的丢弃
        recorder: null,
        hotKeyDown: false,
        isRecording: false//是否正在录音由于录音设备异步问题,需要标志位控制
        //log: errLogStore.state.errLog
      }
    },
    methods: {
      vocHotKey() {
        if (!this.hotKeyDown) {
          this.hotKeyDown = true
          this.startRecording()
        } else {
          this.hotKeyDown = false
          this.endRecording();
        }
      },
      vocRec() {
        $(".mainHeader .mike").mousedown(() => {
          console.info('startClick')
          this.startRecording()
        });

        $(".mainHeader .mike").mouseup(() => {
          this.endRecording();
        });
      },
      startRecording() {
        this.isRecording = true
        HZRecorder.get((rec) => {
          this.recorder = rec;
          if (this.isRecording) {//还未启动就释放的
            this.recorder.start();
          } else {
            this.recorder.stop();
          }
        })
        this.vocTime = new Date().getTime()
        this.$message({
          message: this.$t('正在录音...'),
          type: 'warn',
          duration: 999999,
          showClose: true
        })
      },
      endRecording() {
        this.stopRecording()
        this.$message.closeAll()
        let nowTime = new Date().getTime()
        if (nowTime - this.vocTime < 1000) {//低于一秒的录制不处理
          return false
        }
        this.uploadAudio()
      },
      uploadAudio() {//doClose是否关闭录音,repeate是否同时上传
        this.recorder.upload("/webresources/login/com/comwav/vocRec", (state, e) => {
          switch (state) {
            case 'uploading':
              //var percentComplete = Math.round(e.loaded * 100 / e.total) + '%';
              break;
            case 'ok':
              var genJson = eval('(' + e.target.responseText + ')');
              if (genJson.message) {
                if (genJson.code == '1') {//根据id打开菜单
                  this.$router.push({name: genJson.message})
                } else {
                  this.$store.state.app.vocRec = genJson.message//识别为拼音名
                  console.info(genJson.message)
                }
              }
              break;
            case 'error':
              break;
            case 'cancel':
              break;
          }
        });
      },
      stopRecording() {//停止录音
        this.isRecording = false
        this.recorder.stop();
      }
    }
  }
</script>
