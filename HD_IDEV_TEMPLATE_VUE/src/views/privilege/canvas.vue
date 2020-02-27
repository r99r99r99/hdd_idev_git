<template>
  <el-container>
    <el-main>
      <div class="hdcanvas" @mousemove="beginPath($event)">
        <div class="wrap">
          <div align="center" class="father">
            <canvas
              class="canvas fl"
              ref="canvas"
              :width="canvasWidth"
              :height="canvasHeight"
              @mousedown="canvasDown($event)"
              @mouseup="canvasUp($event)"
              @mousemove="canvasMove($event)"
              @touchstart="canvasDown($event)"
              @touchend="canvasUp($event)"
              @touchmove="canvasMove($event)"
            >
            </canvas>
            <img :src="base64Img" class="canvas_bgp" :width="canvasWidth" :height="canvasHeight"/>
          </div>
          <div class="control fl">
            <!--操作-->
            <div class="canvas-control">
              <h5>操作</h5>
              <span
                v-for="control in controls"
                :title="control.title"
                :class="control.className"
                @click="controlCanvas(control.action)"
              ></span>
            </div>
          </div>
        </div>
      </div>
    </el-main>
  </el-container>
</template>

<script>
  export default {
    name: 'canvas',
    props: {
      base64Img: {
        default:''
      },
      canvasWidth: {
        default: 600
      },
      canvasHeight: {
        default: 600
      }
    },
    data() {
      return {
        context: {},
        imgUrl: [],
        canvasMoveUse: false,
        // 存储当前表面状态数组-上一步
        preDrawAry: [],
        // 存储当前表面状态数组-下一步
        nextDrawAry: [],
        // 中间数组
        middleAry: [],
        // 配置参数
        config: {
          lineWidth: 1,
          lineColor: 'red',
          shadowBlur: 2
        },
      }
    },
    created() {
    },
    mounted() {
      const canvas = this.$refs.canvas
      this.context = canvas.getContext('2d')
      this.initDraw()
      this.setCanvasStyle()
    },
    destroyed() {

    },
    computed: {
      controls() {
        return [{
          title: '上一步',
          action: 'prev',
          className: this.preDrawAry.length ? 'active fa fa-reply' : 'fa fa-reply'
        }, {
          title: '下一步',
          action: 'next',
          className: this.nextDrawAry.length ? 'active fa fa-share' : 'fa fa-share'
        }, {
          title: '清除',
          action: 'clear',
          className: (this.preDrawAry.length || this.nextDrawAry.length) ? 'active fa fa-trash' : 'fa fa-trash'
        }]
      }
    },
    methods: {
      initDraw() {
        const preData = this.context.getImageData(0, 0, this.canvasWidth, this.canvasHeight)
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
        const preData = this.context.getImageData(0, 0, this.canvasWidth, this.canvasHeight)
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
        const preData = this.context.getImageData(0, 0, this.canvasWidth, this.canvasHeight)
        // 当前绘图表面进栈
        this.preDrawAry.push(preData)
        this.context.stroke()
      },
      // 操作
      controlCanvas(action) {
        switch (action) {
          case 'prev':
            if (this.preDrawAry.length) {
              const popData = this.preDrawAry.pop()
              const midData = this.middleAry[this.preDrawAry.length + 1]
              this.nextDrawAry.push(midData)
              this.context.putImageData(popData, 0, 0)
            }
            break
          case 'next':
            if (this.nextDrawAry.length) {
              const popData = this.nextDrawAry.pop()
              const midData = this.middleAry[this.middleAry.length - this.nextDrawAry.length - 2]
              this.preDrawAry.push(midData)
              this.context.putImageData(popData, 0, 0)
            }
            break
          case 'clear':
            this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height)
            this.preDrawAry = []
            this.nextDrawAry = []
            this.middleAry = [this.middleAry[0]]
            break
        }
      },
      // 设置绘画配置
      setCanvasStyle() {
        this.context.lineWidth = this.config.lineWidth
        this.context.shadowBlur = this.config.shadowBlur
        this.context.shadowColor = this.config.lineColor
        this.context.strokeStyle = this.config.lineColor
      }
    }
  }
</script>


<style rel="stylesheet/scss" lang="scss" scoped>
  /deep/ .hdcanvas {
    .wrap {
      border: 1px #585858 solid;
      overflow: hidden;
    }

    .fl {
      float: left;
      display: block;
    }
    .father{
      /*标签位置设置为相对的*/
      position: relative;
      text-align: center;
    }
    /*canvas的大小需要在起标签内设置，否则会拉伸或缩小默认的大小*/
    .canvas{
      /*位置绝对*/
      position: absolute;
      /*设置所在层数，在上层*/
      z-index: 1;
      border-right: 1px #585858 solid;
      cursor: crosshair;
    }

    .canvas_bgp{
      /*位置绝对*/
      position: absolute;
      top: 0;
      left: 0;
    }

    .control {
      width: 130px;
      height: 400px;
      margin-left: 400px;
    }

    .control div {
      padding: 5px;
    }
    .canvas-control span {
      display: inline-block;
      font-size: 14px;
      width: 20px;
      height: 15px;
      margin-left: 10px;
      cursor: pointer;
    }

    .canvas-control .active,
    .canvas-brush .active {
      color: #f2849e;
    }

  }
</style>
