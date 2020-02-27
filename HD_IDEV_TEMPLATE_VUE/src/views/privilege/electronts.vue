<template>
  <el-container>
    <el-main>
      <div>直接打印当前页面
        <button @click="tsPrint">打印</button>
      </div>
      <div>
        pdf展示,这里自己新开的系统窗口
        <button @click="tsPrinPdf">pdf</button>
      </div>
      <div>从网络下载excel到临时文件夹,然后再打开
        <button @click="tsExcel">打开excel</button>
      </div>

      <div>
        消息不在浏览器内的,能随时通知用户的,声音也应该在里面
        <button @click="tsNoti">消息</button>
      </div>
      <div>从网络下载excel到临时文件夹,然后直接通过cmd执行脚本,调用默认打印机,这种方式严重依赖vba脚本!!!!
        <button @click="tsExcelPrint">excel直接打印(命令行执行:vba脚本)</button>
      </div>
      <div>截图
        <button @click="tsShot">截图</button>
      </div>
      <div>websocket打印Excel
        <button @click="loadExcelAndPrintUseWs">websocket excel打印</button>
      </div>
      <div>websocket打印pdf
        <button @click="loadPdfAndPrintUseWs">websocket pdf打印</button>
      </div>
      <div>向手机推送消息
        <button @click="sendMessageToMobile">向手机推送消息</button>
      </div>
    </el-main>
  </el-container>
</template>
<script>

  export default {
    components: {},
    data() {
      return {
        hdServiceWs: {}
      }
    },
    mounted() {
      this.initHdService()
      // this.doQuery()

    },

    methods: {
      initHdService() {
        this.hdServiceWs = new WebSocket("ws://localhost:28090/ws");
        this.hdServiceWs.onopen = (e) => {//连接成功后才能打印
          this.$message({
            type: 'success',
            message: '华东websocket服务,连接成功！'
          })
          //TODO websocket虽然是长连接,但是通过nginx会在60秒后终端
//          let obj = {type: type, content: base64}
//          this.hdServiceWs.send(JSON.stringify(obj))
//          this.hdServiceWs.close()
        }
        // Listen for the close connection event
        this.hdServiceWs.onclose = (e) => {
          this.hdServiceWs = new WebSocket("ws://localhost:28090/ws");//各种原因断开重新连
        }
        // Listen for connection errors
        this.hdServiceWs.onerror = (e) => {
          this.$message({
            type: 'error',
            message: '未监测到华东websocket服务,连接失败,客户端打印功能不能使用！'
          })
        }
        // Listen for new messages arriving at the client
        this.hdServiceWs.onmessage = function (e) {
          console.log(e)
          // Close the socket once one message has arrived.
          //  ws.close();
        }
      },
      tsPrint() {
        HDEL.electron.ipcRenderer.send('printNowPage', 'param');
      },
      tsPrinPdf() {
        HDEL.electron.ipcRenderer.send('printPdf', 'param')
      },
      tsExcel() {
        let shell = HDEL.electron.shell
        this.loadExcelFromUrl().then((filepath) => {
          shell.openItem(filepath);
        })
//        let nowP = path.join('D:\\hddz\\hddz\\tech\\HD_GCTOS6\\04_SRC\\GCTOS_VUE\\static/xdjh.xlsx')

//        console.info(nowP)
      },
      loadExcelFromUrl() {
        let tempPath = HDEL.os.tmpdir()
        const promise = new Promise((resolve, reject) => {
          //  let url = 'http://zhidao.qidun.cn/file/download/file_name-SC4yNjVfTlZS6Kej56CB5rWL6K+VXy54bHN4__url-aHR0cDovL3poaWRhby5xaWR1bi5jbi91cGxvYWRzL2FydGljbGUvMjAxODA1MTgvZWJiOTYwYjJhOTU4NDE5ZGIyN2ZlNDU2NjgwNDJmYjk='
          var timestamp = new Date().getTime();
          let pathfile = tempPath + timestamp + '.xlsx'
          this.$http.get('../static/xdjh.xlsx', {responseType: 'arraybuffer'}).then((data) => {
            HDEL.fs.writeFile(pathfile, new Buffer(data.data), function (err) {
              if (err) {
                throw err;
              }
              resolve(pathfile)
            });
          })
        })
        return promise
      },
      loadExcelAndPrintUseWs() {

        this.$http.get('../static/xdjh.xlsx', {responseType: 'arraybuffer'}).then((data) => {
          let base64 = this.arrayBufferToBase64(data.data)
          this.wsConnectAndPrint(base64, 2)
        })
      },
      loadPdfAndPrintUseWs() {

        this.$http.get('../static/xpdf.pdf', {responseType: 'arraybuffer'}).then((data) => {
          let base64 = this.arrayBufferToBase64(data.data)
          this.wsConnectAndPrint(base64, 3)
        })
      },
      arrayBufferToBase64(buffer) {
        var binary = '';
        var bytes = new Uint8Array(buffer);
        var len = bytes.byteLength;
        for (var i = 0; i < len; i++) {
          binary += String.fromCharCode(bytes[i]);
        }
        return window.btoa(binary);
      },
      wsConnectAndPrint(base64, type) {
        let obj = {type: type, content: base64}
        this.hdServiceWs.send(JSON.stringify(obj))
      },
      tsNoti() {
        const myNotification = new window.Notification('测试', {
          body: '你好啊！我是蚂蚁，我在测试桌面推送'
        })
      }
      ,
      tsExcelPrint() {
        this.loadExcelFromUrl().then((filepath) => {
          HDEL.electron.ipcRenderer.send('printExcel', filepath)
        })

      }
      ,
      sendMessageToMobile() {
        this.$http.get('/webresources/login/msg/jpush/send').then((data) => {
        })
      },
      tsShot() {
        HDEL.electron.desktopCapturer.getSources({types: ['screen']}, (error, sources) => {
          if (error) return console.log(error)

          sources.forEach((source) => {
            if (source.name === 'Entire screen' || source.name === 'Screen 1') {
              const screenshotPath = HDEL.os.tmpdir() + 'screenshot.png'

              HDEL.fs.writeFile(screenshotPath, source.thumbnail.toPNG(), (error) => {
                if (error) return console.log(error)
                HDEL.electron.shell.openExternal(`file://${screenshotPath}`)

              })
            }
          })
        })
      }
    }
  }
</script>
