<template>
    <div class="app" >
      <div class="con">
        <div class="Left_2_chart_continer">
          <div class="left_up_chart" id="line1">
          </div>
          <div class="left_down_chart" id="pie1">
          </div>
        </div>
        <div class="Right_3_chart_continer">
          <div class="right_up_chart" id="line2">
          </div>
          <div class="right_down_chart" id="scatter1">
          </div>
        </div>
      </div>

        <div>
          <HeaderMenu></HeaderMenu>
          <!-- 其他页面内容 -->
        </div>
    </div>
    </template>
    
    <script>
    import * as echarts from "echarts";
    import $ from "jquery";
    import HeaderMenu from "@/components/NewHeaderMenu.vue"; // 根据你的项目结构修改路径
    export default {
      components: {
        HeaderMenu
      },
      mounted(){
        var myChart3 = echarts.init(document.getElementById('line2'));
        var myChart4 = echarts.init(document.getElementById('pie1'));
        var myChart5 = echarts.init(document.getElementById('scatter1'));
        var myChart6 = echarts.init(document.getElementById('line1'));
        var option3;
        var option4;
        var option5;
        var option6;
        const data1 = [
    [
      [2013, 182.67, 182.67, 'PM2.5-2013', 'PM2.5'],
      [2014, 168.53, 168.53, 'PM2.5-2014', 'PM2.5'],
      [2015, 138.29, 138.29, 'PM2.5-2015', 'PM2.5'],
      [2016, 142.66, 142.66, 'PM2.5-2016', 'PM2.5'],
      [2017, 129.55, 129.55, 'PM2.5-2017', 'PM2.5'],
      [2018, 116.46, 116.46, 'PM2.5-2018', 'PM2.5']
    ],
    [
      [2013, 237.4, 237.4, 'PM10-2013', 'PM10'],
      [2014, 223.12, 223.12, 'PM10-2014', 'PM10'],
      [2015, 188.26, 188.26, 'PM10-2015', 'PM10'],
      [2016, 172.74, 172.74, 'PM10-2016', 'PM10'],
      [2017, 158.79, 158.79, 'PM10-2017', 'PM10'],
      [2018, 146.58, 146.58, 'PM10-2018', 'PM10']
    ],
    [
      [2013, 93.05, 93.05, 'NO2-2013', 'NO2'],
      [2014, 100.07, 100.07, 'NO2-2014', 'NO2'],
      [2015, 71.32, 71.32, 'NO2-2015', 'NO2'],
      [2016, 88.56, 88.56, 'NO2-2016', 'NO2'],
      [2017, 94.07, 94.07, 'NO2-2017', 'NO2'],
      [2018, 95.6, 95.6, 'NO2-2018', 'NO2']
    ],
    [
      [2013, 242.13, 242.13, 'SO2-2013', 'SO2'],
      [2014, 217.33, 217.33, 'SO2-2014', 'SO2'],
      [2015, 126.91, 126.91, 'SO2-2015', 'SO2'],
      [2016, 96.33, 96.33, 'SO2-2016', 'SO2'],
      [2017, 74.18, 74.18, 'SO2-2017', 'SO2'],
      [2018, 61.13, 61.13, 'SO2-2018', 'SO2']
    ],
    [
      [2013, 198.27, 198.27, 'CO-2013', 'CO'],
      [2014, 173.42, 173.42, 'CO-2014', 'CO'],
      [2015, 144.78, 144.78, 'CO-2015', 'CO'],
      [2016, 151.76, 151.76, 'CO-2016', 'CO'],
      [2017, 141.22, 141.22, 'CO-2017', 'CO'],
      [2018, 268.65, 268.65, 'CO-2018', 'CO']
    ],
    [
      [2013, 43.62, 43.62, 'O3-2013', 'O3'],
      [2014, 51.72, 51.72, 'O3-2014', 'O3'],
      [2015, 119.18, 119.18, 'O3-2015', 'O3'],
      [2016, 60.81, 60.81, 'O3-2016', 'O3'],
      [2017, 113.11, 113.11, 'O3-2017', 'O3'],
      [2018, 136.74, 136.74, 'O3-2018', 'O3']
    ]
  ];
      const data = [
  [
    [2013, 182.67, 1200, 'PM2.5-2013', 'PM2.5'],
    [2014, 168.53, 1040, 'PM2.5-2014', 'PM2.5'],
    [2015, 138.29, 836, 'PM2.5-2015', 'PM2.5'],
    [2016, 142.66, 823, 'PM2.5-2016', 'PM2.5'],
    [2017, 129.55, 742, 'PM2.5-2017', 'PM2.5'],
    [2018, 116.46, 583, 'PM2.5-2018', 'PM2.5']
  ],
  [
    [2013, 237.4, 1890, 'PM10-2013', 'PM10'],
    [2014, 223.12, 1623, 'PM10-2014', 'PM10'],
    [2015, 188.26, 1443, 'PM10-2015', 'PM10'],
    [2016, 172.74, 1291, 'PM10-2016', 'PM10'],
    [2017, 158.79, 1119, 'PM10-2017', 'PM10'],
    [2018, 146.58, 925, 'PM10-2018', 'PM10']
  ],
  [
    [2013, 93.05, 732, 'NO2-2013', 'NO2'],
    [2014, 100.07, 654, 'NO2-2014', 'NO2'],
    [2015, 71.32, 497, 'NO2-2015', 'NO2'],
    [2016, 88.56, 577, 'NO2-2016', 'NO2'],
    [2017, 94.07, 603, 'NO2-2017', 'NO2'],
    [2018, 95.6, 516, 'NO2-2018', 'NO2']
  ],
  [
    [2013, 242.13, 684, 'SO2-2013', 'SO2'],
    [2014, 217.33, 577, 'SO2-2014', 'SO2'],
    [2015, 126.91, 346, 'SO2-2015', 'SO2'],
    [2016, 96.33, 253, 'SO2-2016', 'SO2'],
    [2017, 74.18, 195, 'SO2-2017', 'SO2'],
    [2018, 61.13, 134, 'SO2-2018', 'SO2']
  ],
  [
    [2013, 198.27, 21.373, 'CO-2013', 'CO'],
    [2014, 173.42, 20.073, 'CO-2014', 'CO'],
    [2015, 144.78, 16.415, 'CO-2015', 'CO'],
    [2016, 151.76, 16.474, 'CO-2016', 'CO'],
    [2017, 141.22, 16.391, 'CO-2017', 'CO'],
    [2018, 268.65, 11.889, 'CO-2018', 'CO']
  ],
  [
    [2013, 43.62, 1073, 'O3-2013', 'O3'],
    [2014, 51.72, 995, 'O3-2014', 'O3'],
    [2015, 119.18, 923, 'O3-2015', 'O3'],
    [2016, 60.81, 1023, 'O3-2016', 'O3'],
    [2017, 113.11, 1253, 'O3-2017', 'O3'],
    [2018, 136.74, 1197, 'O3-2018', 'O3']
  ]
];
function Vis_right()
{
  option3 = {
  // backgroundColor: new echarts.graphic.RadialGradient(0.3, 0.3, 0.8, [
  //   {
  //     offset: 0,
  //     color: '#f7f8fa'
  //   },
  //   {
  //     offset: 1,
  //     color: '#cdd0d5'
  //   }
  // ]),
  title: {
    text: '2013-2018年大气污染造成的GDP损失',
    left: '10%',
    top: '3%',
    textStyle: {
      color: 'white'
    }
  },
  legend: {
    right: '10%',
    top: '12%',
    data: ['PM2.5', 'PM10', 'NO2', 'SO2', 'CO', 'O3']
  },
  grid: {
    left: '8%',
    top: '22%',
    height: '68%'
  },
  xAxis: {
    splitLine: {
      lineStyle: {
        type: 'dashed'
      }
    },
    min: 2012, // 设置横坐标轴的最小值
    max: 2019, // 设置横坐标轴的最大值
    name: '年份'
  },
  yAxis: {
    splitLine: {
      lineStyle: {
        type: 'dashed'
      }
    },
    scale: true,
    name: 'GDP'
  },
  series: [
    {
      name: 'PM2.5',
      data: data1[0],
      type: 'scatter',
      symbolSize: function (data) {
        return Math.sqrt(data[2]);
      },
      emphasis: {
        focus: 'series',
        label: {
          show: true,
          formatter: function (param) {
            return param.data[3];
          },
          position: 'top'
        }
      },
      itemStyle: {
        shadowBlur: 10,
        shadowColor: 'rgba(12, 38, 50, 0.5)',
        shadowOffsetY: 5,
        color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [
          {
            offset: 0,
            color: 'rgb(183,183,183)'
          },
          {
            offset: 1,
            color: 'rgb(107,107,107)'
          }
        ])
      }
    },
    {
      name: 'PM10',
      data: data1[1],
      type: 'scatter',
      symbolSize: function (data) {
        return Math.sqrt(data[2]);
      },
      emphasis: {
        focus: 'series',
        label: {
          show: true,
          formatter: function (param) {
            return param.data[3];
          },
          position: 'top'
        }
      },
      itemStyle: {
        shadowBlur: 10,
        shadowColor: 'rgba(120, 6, 50, 0.5)',
        shadowOffsetY: 5,
        color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [
          {
            offset: 0,
            color: 'rgb(107,107,107)'
          },
          {
            offset: 1,
            color: 'rgb(80,80,80)'
          }
        ])
      }
    },
    {
      name: 'NO2',
      data: data1[2],
      type: 'scatter',
      symbolSize: function (data) {
        return Math.sqrt(data[2]);
      },
      emphasis: {
        focus: 'series',
        label: {
          show: true,
          formatter: function (param) {
            return param.data[3];
          },
          position: 'top'
        }
      },
      itemStyle: {
        shadowBlur: 10,
        shadowColor: 'rgba(150, 36, 5, 0.5)',
        shadowOffsetY: 5,
        color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [
          {
            offset: 0,
            color: 'rgb(147,222,0)'
          },
          {
            offset: 1,
            color: 'rgb(104, 246, 172)'
          }
        ])
      }
    },
    {
      name: 'SO2',
      data: data1[3],
      type: 'scatter',
      symbolSize: function (data) {
        return Math.sqrt(data[2]);
      },
      emphasis: {
        focus: 'series',
        label: {
          show: true,
          formatter: function (param) {
            return param.data[3];
          },
          position: 'top'
        }
      },
      itemStyle: {
        shadowBlur: 10,
        shadowColor: 'rgba(12, 86, 100, 0.5)',
        shadowOffsetY: 5,
        color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [
          {
            offset: 0,
            color: 'rgb(157,0,0)'
          },
          {
            offset: 1,
            color: 'rgb(185,65,0)'
          }
        ])
      }
    },
    {
      name: 'CO',
      data: data1[4],
      type: 'scatter',
      symbolSize: function (data) {
        return Math.sqrt(data[2]);
      },
      emphasis: {
        focus: 'series',
        label: {
          show: true,
          formatter: function (param) {
            return param.data[3];
          },
          position: 'top'
        }
      },
      itemStyle: {
        shadowBlur: 10,
        shadowColor: 'rgba(129, 16, 90, 0.5)',
        shadowOffsetY: 5,
        color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [
          {
            offset: 0,
            color: 'rgb(115,48,53)'
          },
          {
            offset: 1,
            color: 'rgb(213,0,117)'
          }
        ])
      }
    },
    {
      name: 'O3',
      data: data1[5],
      type: 'scatter',
      symbolSize: function (data) {
        return Math.sqrt(data[2]);
      },
      emphasis: {
        focus: 'series',
        label: {
          show: true,
          formatter: function (param) {
            return param.data[3];
          },
          position: 'top'
        }
      },
      itemStyle: {
        shadowBlur: 10,
        shadowColor: 'rgba(120, 36, 50, 0.5)',
        shadowOffsetY: 5,
        color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [
          {
            offset: 0,
            color: 'rgb(25, 10, 123)'
          },
          {
            offset: 1,
            color: 'rgb(140,140,140)'
          }
        ])
      }
    }
  ]
};
option4 = {
    title: {
            text: '各污染物健康经济损失价值占天津GDP比重与变化趋势',
            left: 'center',
            top: '3%',
            textStyle: {
            color: 'white' // 设置文本颜色为白色
            }
    },
    legend: {
      top: '10%'
    },
    tooltip: {
      trigger: 'axis',
      showContent: false
    },
    dataset: {
      source: [
        ['污染物占GDP比重', '2013', '2014', '2015', '2016', '2017','2018'],
        ['PM2.5',1.84,1.58,1.27,1.24,1.04,0.87],
        ['PM10', 2.39,	2.10,1.73,1.51,1.28,1.10],
        ['NO2',0.94,	0.94,	0.66,0.77,0.76,0.72],
        ['S02', 2.43,	2.04,1.17,0.84,0.60,0.46],
        ['CO',1.99,	1.63,	1.33,1.32,1.13,2.01],
        ['O3',0.44,0.49,1.10,	0.53,0.91,1.02]
      ]
    },
    xAxis: { type: 'category' },
    yAxis: { gridIndex: 0 },
    grid: { top: '60%' ,
            height:'30%'
    },
    series: [
      {
        type: 'line',
        smooth: true,
        seriesLayoutBy: 'row',
        emphasis: { focus: 'series' }
      },
      {
        type: 'line',
        smooth: true,
        seriesLayoutBy: 'row',
        emphasis: { focus: 'series' }
      },
      {
        type: 'line',
        smooth: true,
        seriesLayoutBy: 'row',
        emphasis: { focus: 'series' }
      },
      {
        type: 'line',
        smooth: true,
        seriesLayoutBy: 'row',
        emphasis: { focus: 'series' }
      },
      {
        type: 'line',
        smooth: true,
        seriesLayoutBy: 'row',
        emphasis: { focus: 'series' }
      },
      {
        type: 'line',
        smooth: true,
        seriesLayoutBy: 'row',
        emphasis: { focus: 'series' }
      },
      {
        type: 'pie',
        id: 'pie',
        radius: '25%',
        center: ['50%', '38%'],
        emphasis: {
          focus: 'self'
        },
        label: {
          formatter: '{b}: {@2012} ({d}%)'
        },
        encode: {
          itemName: '污染物占GDP比重',
          value: '2013',
          tooltip: '2013'
        }
      }
    ]
  };
  //myChart.setOption(option);
  myChart4.on('updateAxisPointer', function (event) {
    //console.log(event);
    const xAxisInfo = event.axesInfo[0];
    if (xAxisInfo) {
      const dimension = xAxisInfo.value + 1;
      myChart4.setOption({
        series: [{
          id: 'pie',
          label: {
            formatter: '{b}: {@[' + dimension + ']} ({d}%)'
          },
          encode: {
            value: dimension,
            tooltip: dimension
          }
        }]
      });
    }
});
option5 = {
  title: {
            text: 'PM10与NO2健康经济损失价值与工业发展指标的相关性分析',
            left: 'center',
            top: '3%',
            textStyle: {
              color: 'white' // 设置文本颜色为白色
            }
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  legend: {
    data: ['PM10', 'NO2'],
    top: '10%',
    color: 'white'
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '0%',
    containLabel: true
  },
  xAxis: [
    {
      type: 'value'
    }
  ],
  yAxis: [
    {
      type: 'category',
      axisTick: {
        show: false
      },
      data: ['规模以上工业企业数量', '规模以上工业企业资产总计', 
      '煤炭开采和洗选业资产', '石油和天然气开采业资产', 
      '石油/煤炭及其他燃料加工业资产', '化学原料和化学制品制造业资产', 
      '电力/热力生产和供应业资产','燃气生产和供应业资产',
      '氮氧化物排放量','工业烟粉尘排放量']
    }
  ],
  series: [
    {
      name: 'PM10',
      type: 'bar',
      label: {
        show: true,
        position: 'inside'
      },
      emphasis: {
        focus: 'series'
      },
      data: [-0.744,-0.125, 0.054, -0.988, -0.490,
      -0.129, -0.854,-0.797,0.302,0.994]
    },
    {
      name: 'NO2',
      type: 'bar',
      stack: 'Total',
      label: {
        show: true
      },
      emphasis: {
        focus: 'series'
      },
      data: [-0.757,-0.190,0.007,-0.958,
      -0.131,0.073,-0.819,-0.786,0.373,0.879]
    }
   
  ]
};
option3 && myChart3.setOption(option3);
option4 && myChart4.setOption(option4);
option5 && myChart5.setOption(option5);
}
Vis_right();
      }//mounted
    };//export
    
    
    
    </script>
    <style>
    .app {
      color: #fff;
      background: url(/src/assets/image/bg.jpg);
      background-size: 100% 100%;
      background-position: 0 0;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
    .left_up_chart{
        background: url(/src/assets/image/leftb1.png);
        background-size: 100% 100%;
        background-repeat: no-repeat;
        background-position: top center;
        width: 90%;
        height: 86.5%;
        margin-top: 10%;
        margin-left: 6%;
    }
    .left_down_chart{
    background: url(/src/assets/image/leftb1.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-position: top center;
    width: 100%;
    height: 45%;
    margin-top: 1%;
    margin-bottom: 5%;
    left: 4%;
}
.right_up_chart{
    background: url(/src/assets/image/leftb1.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-position: top center;
    width: 90%;
    height: 42%;
    margin-top: 10%;
    left: 0%;
}
.right_down_chart{
    background: url(/src/assets/image/leftb1.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-position: top center;
    width: 90%;
    height: 42%;
    top: 1%;
    left: 0%;
}
    .con{
      flex: 1;
      width: 100%;
      height: 100%;
      display: flex;
    }
    .Left_2_chart_continer,
    .Right_3_chart_continer {
      flex: 1;
      display: flex;
      flex-direction: column; /* 子元素上下布局 */
      align-items: center; /* 水平居中对齐 */
      height: 100%;
      box-sizing: border-box;
    }
    
    </style>