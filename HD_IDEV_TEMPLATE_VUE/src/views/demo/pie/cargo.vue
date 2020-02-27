<template>
  <div class="chart boxBg" :id="id" :style="{height:height,width:width}"></div>
</template>

<script>
  import echarts from 'echarts'

  export default {
    props: {
      id: {
        type: String,
        default: 'cargoPie'
      },
      width: {
        type: String,
        default: '100%'
      },
      height: {
        type: String,
        default: '100%'
      },
    },
    data() {
      return {
        chart: null,
        hdQuery: new HdQuery(this),
        data: [],
        data2: [],
        chartIndex: 0
      }
    },
    mounted() {
      this.init()

    },
    beforeDestroy() {
      if (!this.chart) {
        return
      }
      this.chart.dispose()
      this.chart = null
    },
    methods: {
      init () {
        this.hdQuery.query.monthId = '1';
        this.hdQuery.query.jzxId = '0';
        this.$http.post('/webresources/login/ship/ShipTopStatic/shipthruput/find', this.hdQuery).then(response => {
          const data = response.data[0];
          let cal = data.planWgt - data.factWgt;
          this.data[0] = {name:'未完成', value:cal};
          this.data[1] = {name:'实际', value:data.factWgt};
          this.data2[0] = {name:'\n\n计划：' + data.planWgt, value:data.factWgt};
          this.data2[1] = {name:'实际：' + data.factWgt, value:data.factWgt};
          this.initChart();
          this.initChartEvent();
        })
      },
      initChart() {
        this.chart = echarts.init(document.getElementById(this.id))


        this.chart.setOption(
          {
            tooltip: {
              trigger: 'item',
              formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
           // backgroundColor: '#08263a',
            backgroundColor: 'rgba(204,204,204,0.2)',
            // legend: {
            //   orient: 'vertical',
            //   x: 'left',
            //   data:['直达','营销广告','搜索引擎','邮件营销','联盟广告','视频广告','百度','谷歌','必应','其他']
            // },
            series: [
              {
                name:'访问来源',
                type:'pie',
                selectedMode: 'single',
                radius: [0, '60%'],
                startAngle: 180,
                itemStyle: {
                  normal: {
                    borderWidth: 0,
                    color: {
                      type: 'linear',
                      x: 0,
                      y: 0,
                      x2: 0,
                      y2: 1,
                      colorStops: [{
                        offset: 0, color: '#981341' // 0% 处的颜色
                      }, {
                        offset: 1, color: '#981341' // 100% 处的颜色
                      }],
                      globalCoord: false // 缺省为 false
                    },
                  }
                },
                tooltip: {
                    formatter: '{b}',
                },
                label: {
                  normal: {
                    position: 'inner',
                    formatter: '{a|{b}}{abg|}\n ',
                    rich: {
                      b: {
                        fontSize: 24,
                        lineHeight: 33
                      },
                    }
                  }
                },
                labelLine: {
                  normal: {
                    show: false
                  }
                },
                data:this.data2
              },
              {
                name:'访问来源',
                type:'pie',
                radius: ['100%', '70%'],
                clockwise: false,
                itemStyle: {
                  normal: {
                    color: function(params) {
                      var colorList = ['#f39800','#2f4554'];
                      return colorList[params.dataIndex]
                    },
                  }
                },

                label: {
                  normal: {
                    show: false,
                    formatter: '{a|{b}}{abg|}\n{hr|}\n  {c}  {c|{d}%}  ',
                    backgroundColor: '#eee',
                    borderColor: '#aaa',
                    borderWidth: 1,
                    borderRadius: 4,
                    // shadowBlur:3,
                    // shadowOffsetX: 2,
                    // shadowOffsetY: 2,
                    // shadowColor: '#999',
                    // padding: [0, 7],
                    rich: {
                      a: {
                        color: '#999',
                        lineHeight: 22,
                        align: 'center'
                      },
                      // abg: {
                      //     backgroundColor: '#333',
                      //     width: '100%',
                      //     align: 'right',
                      //     height: 22,
                      //     borderRadius: [4, 4, 0, 0]
                      // },
                      hr: {
                        borderColor: '#aaa',
                        width: '100%',
                        borderWidth: 0.5,
                        height: 0
                      },
                      b: {
                        fontSize: 16,
                        lineHeight: 33
                      },
                      per: {
                        color: '#eee',
                        backgroundColor: '#334455',
                        padding: [2, 4],
                        borderRadius: 2
                      }
                    }
                  }
                },
                data:this.data
              }
            ]
          })
      },
      initChartEvent() {
        const that = this;
        setInterval(function () {
          that.chartIndex = (that.chartIndex + 1)%2;
          that.chart.dispatchAction({
            type: 'downplay',
            seriesIndex: 1,
            dataIndex: that.chartIndex
          });
          that.chart.dispatchAction({
            type: 'highlight',
            seriesIndex: 1,
            dataIndex: 1-that.chartIndex
          });
        }, 2500)
      }
    }
  }
</script>
