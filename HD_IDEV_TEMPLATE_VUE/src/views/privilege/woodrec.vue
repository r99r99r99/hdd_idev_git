<template>
  <el-container v-loading="loading">
    <el-main>
      木头大小:
      <el-radio-group v-model="woodType">
        <el-radio :label="0">细</el-radio>
        <el-radio :label="1">中</el-radio>
        <el-radio :label="2">粗</el-radio>
      </el-radio-group>
      <el-upload style="display: inline"
                 :action="'webresources/login/com/ComWoodRec/upload?woodType='+woodType"
                 :show-file-list="false"
                 :before-upload="beforeUpload"
                 :on-success="uploadSuccess"
                 :on-error="uploadError">
        <el-button>上传图片</el-button>
      </el-upload>
      <div>
        识别数量:{{this.recNum-this.dValue}}
        <img :src="recpic" :width="woodWidth" :height="woodHeight">
      </div>
    </el-main>
    <el-aside width="50%">
      木材识别修改图<br/><br/>
      <div class="hdcanvas" @mousemove="beginPath($event)">
        <div align="center" class="father">
          <canvas
            class="wood-canvas"
            ref="canvas"
            :width="woodWidth"
            :height="woodHeight"
            @mousedown.stop="canvasDown($event)"
            @mouseup.stop="canvasUp($event)"
            @mousemove.stop="canvasMove($event)"
            @touchstart.stop="canvasDown($event)"
            @touchend.stop="canvasUp($event)"
            @touchmove.stop="canvasMove($event)"
          >
          </canvas>
          <img :src="recpic" class="canvas_bgp" :width="woodWidth" :height="woodHeight"/>
        </div>
      </div>
    </el-aside>
  </el-container>
</template>
<script>
  import  woodcanvas from './canvas'
  export default {
    components: {woodcanvas},
    data() {
      return {
        recpic: '',
        recNum: '',
        woodType: 1,
        loading: false,
        woodWidth: 400,
        woodHeight: 400,
        context: {},
        canvasMoveUse: false,
        // 存储当前表面状态数组-上一步
        preDrawAry: [],
        // 存储当前表面状态数组-下一步
        nextDrawAry: [],
        // 中间数组
        middleAry: [],
        // 配置参数
        config: {
          //线条大小
          lineWidth: 1,
          //线条颜色
          lineColor: 'red',
          //	设置或返回用于阴影的模糊级别
          shadowBlur: 0
        },
        dValue: 0
      }
    },

    mounted() {
      const canvas = this.$refs.canvas
      this.context = canvas.getContext('2d')
      this.initDraw()
      this.setCanvasStyle()
    },
    methods: {
      beforeUpload() {
        this.loading = true
      },
      uploadSuccess(response) {
        this.loading = false
        console.info(response)
        let data = response
        this.recNum = data.num

        this.recpic = 'data:image/png;base64,' + data.pic
        //差值重置为0
        this.dValue = 0
        //清空图中叉号
        this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height)
        this.preDrawAry = []
        this.nextDrawAry = []
        this.middleAry = [this.middleAry[0]]
      },
      uploadError(err, file, fileList) {
        this.loading = false
      },
      initDraw() {
        const preData = this.context.getImageData(0, 0, this.woodWidth, this.woodHeight)
        // 空绘图表面进栈
        this.middleAry.push(preData)
      },
      canvasMove(event) {
        // if (this.canvasMoveUse) {
        //   console.log('canvasMove')
        //   const canvasX =event.offsetX;
        //   //获取y轴坐标不准
        //   const canvasY = event.offsetY
        //   this.context.lineTo(canvasX, canvasY)
        //   this.context.stroke()
        // }
      },
      beginPath(e) {
        const canvas = this.$refs.canvas
        if (e.target !== canvas) {
          console.log('beginPath')
          this.context.beginPath()
        }
      },
      // mouseup
      canvasUp(e) {
        console.log('canvasUp')
        const preData = this.context.getImageData(0, 0, this.woodWidth, this.woodHeight)
        if (!this.nextDrawAry.length) {
          // 当前绘图表面进栈
          this.middleAry.push(preData)
        } else {
          this.middleAry = []
          this.middleAry = this.middleAry.concat(this.preDrawAry)
          this.middleAry.push(preData)
          this.nextDrawAry = []
        }
        this.canvasMoveUse = false
      },
      // mousedown
      canvasDown(event) {
        console.log('canvasDown')
        this.canvasMoveUse = true
        // client是基于整个页面的坐标
        // offset是cavas距离顶部以及左边的距离
        //获取鼠标的X轴，Y轴坐标值
        const canvasX = event.offsetX
        const canvasY = event.offsetY
        this.setCanvasStyle()
        // 清除子路径
        this.context.beginPath()
        //圆的半径
        const radius = 10
        //画个圆
        this.context.arc(canvasX, canvasY, radius * 2, 0, 2 * Math.PI);
        //画叉号
        this.context.moveTo(canvasX - radius, canvasY - radius);
        this.context.lineTo(canvasX + radius, canvasY + radius);
        this.context.moveTo(canvasX + radius, canvasY - radius);
        this.context.lineTo(canvasX - radius, canvasY + radius);

        // // 对号起点
        // this.context.moveTo(canvasX - 1.3 * radius, canvasY - 0.5 * radius);
        // // 对号拐角点
        // this.context.lineTo(canvasX - 0.1 * radius, canvasY + 0.9 * radius);
        // // 对号终点
        // this.context.lineTo(canvasX + 1.7 * radius, canvasY - 1.4 * radius);
        console.log('moveTo', canvasX, canvasY)
        // 当前绘图表面状态
        const preData = this.context.getImageData(0, 0, this.woodWidth, this.woodHeight)
        // 当前绘图表面进栈
        this.preDrawAry.push(preData)
        this.context.stroke()
        this.dValue++

      },
      // 设置绘画配置
      setCanvasStyle() {
        this.context.lineWidth = this.config.lineWidth
        this.context.shadowBlur = this.config.shadowBlur
        this.context.shadowColor = this.config.lineColor
        this.context.strokeStyle = this.config.lineColor
      },
    }
  }
</script>


<style rel="stylesheet/scss" lang="scss" scoped>
  /deep/ .hdcanvas {
    .father{
      /*标签位置设置为相对的*/
      position: relative;
      text-align: center;
    }
    /*canvas的大小需要在起标签内设置，否则会拉伸或缩小默认的大小*/
    .wood-canvas{
      /*位置绝对*/
      position: absolute;
      /*设置所在层数，在上层*/
      z-index: 1;
      cursor: crosshair;
      display: block;
    }

    .canvas_bgp{
      /*位置绝对*/
      position: absolute;
      top: 0;
      left: 0;
    }
  }
</style>
