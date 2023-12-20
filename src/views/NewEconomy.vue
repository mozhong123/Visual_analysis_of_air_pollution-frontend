<template>
  <div class="app" >
    <div class="con">
      <div class="Left_2_chart_continer">
        <div class="left_up_chart" id="line1">
          <iframe
          class="letf_up_chart1"
          src="/src/assets/html/heatmap.html"
          ref="iframeDom"
          style="width: 100%;height: 100%;top: 10%;left: 0%;"
          ></iframe>
        </div>
        <!-- <div id="heatmap-buttons">
        <button @click="showHeatmap1()">PMx</button>
        <button @click="showHeatmap2()">NOx</button>
        <button @click="showHeatmap3()">SOx</button>
        </div> -->
        <div class="left_mid_chart" id="legend">
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
    </template>
    
    <script>
    import * as echarts from "echarts";
    import $ from "jquery";
    import HeaderMenu from "@/components/NewHeaderMenu.vue"; // 根据你的项目结构修改路径
    import BaiduMap from 'vue-baidu-map'
    export default {
      components: {
        HeaderMenu
      },
      mounted(){
        var myChart3 = echarts.init(document.getElementById('line2'));
        var myChart4 = echarts.init(document.getElementById('pie1'));
        var myChart5 = echarts.init(document.getElementById('scatter1'));
        var option3;
        var option4;
        var option5;
        const data1 = [
          [
            [2013, 182.67, 1200, 'PM2.5-2013:182.67', 'PM2.5'],
            [2014, 168.53, 1040, 'PM2.5-2014:168.53', 'PM2.5'],
            [2015, 138.29, 836, 'PM2.5-2015:138.29', 'PM2.5'],
            [2016, 142.66, 823, 'PM2.5-2016:142.66', 'PM2.5'],
            [2017, 129.55, 742, 'PM2.5-2017:129.55', 'PM2.5'],
            [2018, 116.46, 583, 'PM2.5-2018:116.46', 'PM2.5']
          ],
          [
            [2013, 237.4, 1890, 'PM10-2013:237.4', 'PM10'],
            [2014, 223.12, 1623, 'PM10-2014:223.12', 'PM10'],
            [2015, 188.26, 1443, 'PM10-2015:188.26', 'PM10'],
            [2016, 172.74, 1291, 'PM10-2016:172.74', 'PM10'],
            [2017, 158.79, 1119, 'PM10-2017:158.79', 'PM10'],
            [2018, 146.58, 925, 'PM10-2018:146.58', 'PM10']
          ],
          [
            [2013, 93.05, 732, 'NO2-2013:93.05', 'NO2'],
            [2014, 100.07, 654, 'NO2-2014:100.07', 'NO2'],
            [2015, 71.32, 497, 'NO2-2015:71.32', 'NO2'],
            [2016, 88.56, 577, 'NO2-2016:88.56', 'NO2'],
            [2017, 94.07, 603, 'NO2-2017:94.07', 'NO2'],
            [2018, 95.6, 516, 'NO2-2018:95.6', 'NO2']
          ],
          [
            [2013, 242.13, 684, 'SO2-2013:242.13', 'SO2'],
            [2014, 217.33, 577, 'SO2-2014:217.33', 'SO2'],
            [2015, 126.91, 346, 'SO2-2015:126.91', 'SO2'],
            [2016, 96.33, 253, 'SO2-2016:96.33', 'SO2'],
            [2017, 74.18, 195, 'SO2-2017:74.18', 'SO2'],
            [2018, 61.13, 134, 'SO2-2018:61.13', 'SO2']
          ],
          [
            [2013, 198.27, 21.373, 'CO-2013:198.27', 'CO'],
            [2014, 173.42, 20.073, 'CO-2014:173.42', 'CO'],
            [2015, 144.78, 16.415, 'CO-2015:144.78', 'CO'],
            [2016, 151.76, 16.474, 'CO-2016:151.76', 'CO'],
            [2017, 141.22, 16.391, 'CO-2017:141.22', 'CO'],
            [2018, 268.65, 11.889, 'CO-2018:268.65', 'CO']
          ],
          [
            [2013, 43.62, 1073, 'O3-2013:43.62', 'O3'],
            [2014, 51.72, 995, 'O3-2014:51.72', 'O3'],
            [2015, 119.18, 923, 'O3-2015:119.18', 'O3'],
            [2016, 60.81, 1023, 'O3-2016:60.81', 'O3'],
            [2017, 113.11, 1253, 'O3-2017:113.11', 'O3'],
            [2018, 136.74, 1197, 'O3-2018:136.74', 'O3']
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
text: '天津市2013-2018年大气污染造成的GDP损失',
left: '10%',
top: '3%',
textStyle: {
  color: 'white'
}
},
legend: {
right: '10%',
top: '12%',
data: ['PM2.5', 'PM10', 'NO2', 'SO2', 'CO', 'O3'],
textStyle: {
        color: 'white',  // 这里设置字体颜色
},
},
grid: {
left: '8%',
top: '22%',
height: '68%'
},
xAxis: {
axisLabel: {
    textStyle: {
      color: 'white' // 设置坐标轴文本颜色为白色
    }
  },
splitLine: {
  lineStyle: {
    type: 'dashed'
  }
},
min: 2012, // 设置横坐标轴的最小值
max: 2019, // 设置横坐标轴的最大值
name: '年份',
nameTextStyle:{
  color: 'white'
}
},
yAxis: {
axisLabel: {
    textStyle: {
      color: 'white' // 设置坐标轴文本颜色为白色
    }
  },
splitLine: {
  lineStyle: {
    type: 'dashed'
  }
},
scale: true,
name: 'GDP',
nameTextStyle:{
  color: 'white'
}
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
        return Math.sqrt(data[2])*4;
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
        text: '各污染物健康经济损失价值占天津市GDP比重与变化趋势',
        left: 'center',
        top: '3%',
        textStyle: {
        color: 'white' // 设置文本颜色为白色
        }
},
legend: {
  top: '10%',
  textStyle: {
        color: 'white',  // 这里设置字体颜色
},
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
xAxis: { type: 'category' ,
axisLabel: {
    textStyle: {
      color: 'white' // 设置坐标轴文本颜色为白色
    }
  }},
yAxis: { gridIndex: 0 ,
  axisLabel: {
    textStyle: {
      color: 'white' // 设置坐标轴文本颜色为白色
    }
  }},
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
      formatter: '{b}: {@2012} ({d}%)',
      textStyle:{
        color: 'white'
      }
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
        text: '天津市PM10与NO2健康经济损失价值与工业发展指标的相关性分析',
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
textStyle: {
    color: 'white',  // 这里设置字体颜色
},
},
grid: {
left: '3%',
right: '4%',
bottom: '0%',
containLabel: true
},
xAxis: [
{
  type: 'value',
  axisLabel:{
    textStyle:{
      color: 'white'
    }
  }
}
],
yAxis: [
{
  type: 'category',
  axisLabel:{
    textStyle:{
      color: 'white'
    }
  },
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
function Vis_map(){
var map = new BMap.Map("line1");
    map.centerAndZoom(new BMap.Point(117.740583, 38.934309), 10);
    map.enableScrollWheelZoom();

    // 定义工厂类别和对应的颜色
    var factoryCategories = [
        {
            "name": "钢铁厂",
            "color": "red",
            "symbol": BMap_Symbol_SHAPE_POINT,
            "factories": [
                {
                    "name": "天津钢铁集团有限公司",
                    "lat": "39.042481",
                    "lng": "117.522049"
                },
                {
                    "name": "天津市宝丰钢管厂",
                    "lat": "38.765429",
                    "lng": "117.163013"
                },
                {
                    "name": "亿利通钢管厂",
                    "lat": "38.788404",
                    "lng": "117.117836"
                },
                {
                    "name": "得利伟铸钢厂",
                    "lat": "39.308963",
                    "lng": "117.700041"
                },
                {
                    "name": "同力玻璃钢厂",
                    "lat": "39.271005",
                    "lng": "117.272932"
                }

            ]
        },
        {
            "name": "发电厂",
            "color": "blue",
            "symbol": BMap_Symbol_SHAPE_POINT,
            "factories": [
                {
                    "name": "华能(天津)煤气化发电有限公司",
                    "lat": "38.934309",
                    "lng": "117.740583"
                },
                {
                    "name": "大唐盘山发电公司",
                    "lat": "39.981895",
                    "lng": "117.476295"
                },
                {
                    "name": "天津国能盘山发电有限责任公司",
                    "lat": "39.981699",
                    "lng": "117.470654"
                },
                {
                    "name": "卡特彼勒公司大型发动机和发电机组制造工厂",
                    "lat": "39.14832",
                    "lng": "117.393727"
                },
                {
                    "name": "天津天发发电设备制造有限公司",
                    "lat": "39.244265",
                    "lng": "117.271001"
                },


            ]
        },
        {
            "name": "化肥厂",
            "color": "green",
            "symbol": BMap_Symbol_SHAPE_POINT,
            "factories": [
                {
                    "name": "天津中农化肥储运贸易有限公司",
                    "lat": "39.324057",
                    "lng": "117.107443"
                },
                {
                    "name": "汉沽化肥厂",
                    "lat": "39.3249",
                    "lng": "117.858321"
                },
                {
                    "name": "天津东阳化肥股份有限公司",
                    "lat": "39.312089",
                    "lng": "117.781748"
                },
                {
                    "name": "天津市中天化肥有限公司",
                    "lat": "39.311797",
                    "lng": "117.919563"
                },
                {
                    "name": "津天化化肥(天津)有限公司",
                    "lat": "39.584046",
                    "lng": "116.980026"
                },

            ]
        },
        {
            "name": "化工厂",
            "color": "yellow",
            "symbol": BMap_Symbol_SHAPE_POINT,
            "factories": [
                {
                    "name": "科迈化工股份有限公司",
                    "lat": "38.822688",
                    "lng": "117.516036"
                },
                {
                    "name": "天津渤海化工集团公司",
                    "lat": "39.124335",
                    "lng": "117.216381"
                },
                {
                    "name": "卡博特化工公司",
                    "lat": "39.221362",
                    "lng": "117.7992"
                },
                {
                    "name": "天津大沽化工股份有限公司(顺化道)",
                    "lat": "39.004127",
                    "lng": "117.65657"
                },
                {
                    "name": "海晶集团有限公司化工厂",
                    "lat": "39.002774",
                    "lng": "117.65892"
                },
            ]
        },
        {
            "name": "化妆品厂",
            "color": "Purple",
            "symbol": BMap_Symbol_SHAPE_POINT,
            "factories": [
                {
                    "name": "高丽雅娜化妆品(天津有限公司)",
                    "lat": "38.990803",
                    "lng": "117.484904"
                },
                {
                    "name": "旺通工贸有限公司丽芬化妆品厂",
                    "lat": "39.084084",
                    "lng": "117.050015"
                },
                {
                    "name": "天津市亨美达化妆品工贸有限公司",
                    "lat": "39.246372",
                    "lng": "116.963697"
                },
                {
                    "name": "希恩碧化妆品(天津)有限公司",
                    "lat": "38.9",
                    "lng": "117.276113"
                },
                {
                    "name": "天津佰纳黛丝化妆品",
                    "lat": "38.824943",
                    "lng": "117.479817"
                },

            ]
        },
        {
            "name": "焦化厂",
            "color": "Black",
            "symbol": BMap_Symbol_SHAPE_POINT,
            "factories": [
                {
                    "name": "天津华电南疆热电有限公司",
                    "lat": "38.96625",
                    "lng": "117.58711"
                },
                {
                    "name": "天津天保热电公司",
                    "lat": "39.126803",
                    "lng": "117.467421"
                },
                {
                    "name": "国家能源集团天津国能津能热电有限公司",
                    "lat": "39.225313",
                    "lng": "117.363404"
                },
                {
                    "name": "天津泰达西区热电有限公司",
                    "lat": "39.111517",
                    "lng": "117.557257"
                },
                {
                    "name": "天津市陈塘热电有限公司",
                    "lat": "38.966491",
                    "lng": "117.198145"
                },

            ]
        },
        {
            "name": "炼油厂",
            "color": "White",
            "symbol": BMap_Symbol_SHAPE_POINT,
            "factories": [
                {
                    "name": "中国石化天津分公司炼油部",
                    "lat": "38.832456",
                    "lng": "117.414073"
                }

            ]
        },
        {
            "name": "水泥厂",
            "color": "Orange",
            "symbol": BMap_Symbol_SHAPE_POINT,
            "factories": [
                {
                    "name": "天津水泥工业设计研究院有限公司(引河里北道)",
                    "lat": "39.243224",
                    "lng": "117.125444"
                },
                {
                    "name": "大站水泥厂",
                    "lat": "38.959962",
                    "lng": "117.493287"
                },
                {
                    "name": "天津振兴水泥有限公司(创富路)",
                    "lat": "39.282071",
                    "lng": "117.143102"
                },
                {
                    "name": "金晟华水泥公司天津水泥厂分厂",
                    "lat": "38.978348",
                    "lng": "117.219723"
                },
                {
                    "name": "蓟县鑫旺发水泥制品厂",
                    "lat": "39.027583",
                    "lng": "117.254044"
                },
            ]
        },

        {
            "name": "制药厂",
            "color": "Brown",
            "symbol": BMap_Symbol_SHAPE_POINT,
            "factories": [
                {
                    "name": "诺和诺德(中国)制药有限公司",
                    "lat": "39.053491",
                    "lng": "117.711769"
                },
                {
                    "name": "中美天津史克制药有限公司",
                    "lat": "39.141672",
                    "lng": "117.315049"
                },
                {
                    "name": "天津天威制药有限公司",
                    "lat": "39.071392",
                    "lng": "117.727366"
                },
                {
                    "name": "天津九州通达医药有限公司",
                    "lat": "39.239726",
                    "lng": "117.081399"
                },
                {
                    "name": "中国大冢制药公司",
                    "lat": "39.031758",
                    "lng": "117.094484"
                }, {
                    "name": "天津药明康德新药开发有限公司",
                    "lat": "39.069397",
                    "lng": "117.7204"
                },
                {
                    "name": "天津市医药集团有限公司",
                    "lat": "39.128886",
                    "lng": "117.233874"
                },
                {
                    "name": "辰光(天津)制药有限公司",
                    "lat": "39.100689",
                    "lng": "117.548405"
                },
                {
                    "name": "天士力圣特制药有限公司",
                    "lat": "39.230451",
                    "lng": "117.200071"
                },
                {
                    "name": "天津生物化学制药有限公司",
                    "lat": "39.12572",
                    "lng": "117.428022"
                },
            ]
        }
    ];

    // 标注工厂位置
    factoryCategories.forEach(function (category) {
        var color = category.color;
        var symbol = category.symbol;
        var factories = category.factories;

        factories.forEach(function (factory) {
            var name = factory.name;
            var lat = parseFloat(factory.lat);
            var lng = parseFloat(factory.lng);

            var point = new BMap.Point(lng, lat);

            // 创建标注样式
            var markerOptions = {
                icon: new BMap.Symbol(symbol, {
                    scale: 1,
                    fillColor: color, // 使用不同颜色的标记
                    fillOpacity: 0.8
                })
            };

            // 创建标记对象
            var marker = new BMap.Marker(point, markerOptions);

            // 创建文本标签
            var label = new BMap.Label(name, { offset: new BMap.Size(20, -10) });
            label.setStyle({
                color: "black",
                backgroundColor: "white",
                border: "1px solid #ccc",
                padding: "5px"
            });
            marker.setLabel(label);

            // 鼠标悬停时显示工厂名称
            marker.addEventListener("mouseover", function () {
                label.show();
            });

            // 鼠标移开时隐藏工厂名称
            marker.addEventListener("mouseout", function () {
                label.hide();
            });

            // 将标记对象添加到地图上
            map.addOverlay(marker);
        });
    });

    // 显示工厂种类和标记颜色的对应关系
    const data_legend=[{name:'钢铁厂',color:'red'},
    {name:'发电厂',color:'blue'},
    {name:'化工厂',color:'yellow'},
    {name:'化肥厂',color:'green'},
    {name:'化妆品厂',color:'purple'},
    {name:'焦化厂',color:'black'},
    {name:'炼油厂',color:'white'},
    {name:'水泥厂',color:'orange'},
    {name:'制药厂',color:'brown'}]
    var legendContainer = document.getElementById('legend');

    data_legend.forEach(item => {
        var legendItem = document.createElement('div');
        legendItem.classList.add('legend-item');

        var colorBox = document.createElement('div');
        colorBox.classList.add('color-box');
        colorBox.style.backgroundColor = item.color;

        var itemName = document.createElement('span');
        itemName.textContent = item.name;

        legendItem.appendChild(colorBox);
        legendItem.appendChild(itemName);

        legendContainer.appendChild(legendItem);
    });

}
//Vis_map();

  // 创建地图实例
//   var map1 = new BMap.Map("line1");
//         // 创建地图中心点
//         var point1 = new BMap.Point(117.198, 39.117);
//         // 初始化地图，设置中心点和缩放级别
//         map1.centerAndZoom(point1, 10);
//         // 启用滚轮缩放
//         map1.enableScrollWheelZoom(true);

//         // 模拟污染物浓度数据
//         var pollutionData1 = [
//             { lat: 38.82269, lng: 117.51604, intensity: 20 },
//             { lat: 38.96625, lng: 117.58711, intensity: 21.72 },
//             { lat: 39.22531, lng: 117.36340, intensity: 189.6 },
//             { lat: 39.11152, lng: 117.55726, intensity: 74.2 },
//             { lat: 39.14167, lng: 117.31505, intensity: 117.6 },
//             { lat: 39.96030, lng: 117.42430, intensity: 45.6 },
//             { lat: 39.10921, lng: 117.27588, intensity: 70.56 },
//             { lat: 39.84813, lng: 117.43146, intensity: 81.8 },
//             { lat: 38.87222, lng: 116.84222, intensity: 96 },
//             { lat: 38.84527, lng: 116.80587, intensity: 188.32 },
//             { lat: 38.78142, lng: 117.18111, intensity: 22.2 },
//             { lat: 39.31690, lng: 117.73440, intensity: 195.048 },
//             { lat: 39.35178, lng: 117.72483, intensity: 17.2 },
//             { lat: 39.35390, lng: 117.77000, intensity: 47.9 },
//             { lat: 39.32270, lng: 117.72500, intensity: 15 },
//             { lat: 39.88420, lng: 117.40080, intensity: 31 },
//             { lat: 40.02490, lng: 117.32490, intensity: 20.28 },
//             { lat: 39.96265, lng: 117.46265, intensity: 12.455 },
//             { lat: 39.98825, lng: 39.98825, intensity: 47.8 },
//             { lat: 38.81352, lng: 117.24685, intensity: 56.8 },
//             { lat: 38.98959, lng: 117.62292, intensity: 72 },
//             { lat: 39.09003, lng: 117.54003, intensity: 90 },
//             { lat: 38.92111, lng: 117.72111, intensity: 125.88 },
//             { lat: 39.09817, lng: 117.63151, intensity: 23.6 },
//             { lat: 38.92750, lng: 117.72750, intensity: 13 },
//             { lat: 38.92944, lng: 117.72945, intensity: 50 },
//             { lat: 38.95880, lng: 117.57547, intensity: 21.72 },
//             { lat: 39.14816, lng: 117.51480, intensity: 53 },
//             { lat: 38.92525, lng: 117.79191, intensity: 122.7 },
//             // 添加更多污染物浓度数据
//         ];

//         var pollutionData2 = [
//             { lat: 38.82269, lng: 117.51604, intensity: 61 },
//             { lat: 38.96625, lng: 117.58711, intensity: 110.284 },
//             { lat: 39.22531, lng: 117.36340, intensity: 345.01 },
//             { lat: 39.11152, lng: 117.55726, intensity: 118.19 },
//             { lat: 39.14167, lng: 117.31505, intensity: 35.938 },
//             { lat: 39.96030, lng: 117.42430, intensity: 45.6 },
//             { lat: 39.10921, lng: 117.27588, intensity: 141.12 },
//             { lat: 39.84813, lng: 117.43146, intensity: 36.7 },
//             { lat: 38.87222, lng: 116.84222, intensity: 72 },
//             { lat: 38.84527, lng: 116.80587, intensity: 188.32 },
//             { lat: 38.78142, lng: 117.18111, intensity: 41 },
//             { lat: 39.31690, lng: 117.73440, intensity: 168.216 },
//             { lat: 39.35178, lng: 117.72483, intensity: 24.7 },
//             { lat: 39.35390, lng: 117.77000, intensity: 47.9 },
//             { lat: 39.32270, lng: 117.72500, intensity: 67.5 },
//             { lat: 39.88420, lng: 117.40080, intensity: 31 },
//             { lat: 40.02490, lng: 117.32490, intensity: 20.28 },
//             { lat: 39.96265, lng: 117.46265, intensity: 12.455 },
//             { lat: 39.98825, lng: 39.98825, intensity: 47.8 },
//             { lat: 38.81352, lng: 117.24685, intensity: 42.3 },
//             { lat: 38.98959, lng: 117.62292, intensity: 34.55 },
//             { lat: 39.09003, lng: 117.54003, intensity: 22.3 },
//             { lat: 38.92111, lng: 117.72111, intensity: 247.525 },
//             { lat: 39.09817, lng: 117.63151, intensity: 199.2 },
//             { lat: 38.92750, lng: 117.72750, intensity: 61 },
//             { lat: 38.92944, lng: 117.72945, intensity: 107.6 },
//             { lat: 38.95880, lng: 117.57547, intensity: 110.284 },
//             { lat: 39.14816, lng: 117.51480, intensity: 48.8 },
//             { lat: 38.92525, lng: 117.79191, intensity: 33.214 },
//             // 添加更多污染物浓度数据
//         ];

//         var pollutionData3 = [
//             { lat: 38.82269, lng: 117.51604, intensity: 61 },
//             { lat: 38.96625, lng: 117.58711, intensity: 23.94 },
//             { lat: 39.22531, lng: 117.36340, intensity: 121.21 },
//             { lat: 39.11152, lng: 117.55726, intensity: 14.617 },
//             { lat: 39.14167, lng: 117.31505, intensity: 35.938 },
//             { lat: 39.96030, lng: 117.42430, intensity: 45.6 },
//             { lat: 39.10921, lng: 117.27588, intensity: 35.28 },
//             { lat: 39.84813, lng: 117.43146, intensity: 34 },
//             { lat: 38.87222, lng: 116.84222, intensity: 12 },
//             { lat: 38.84527, lng: 116.80587, intensity: 18.832 },
//             { lat: 38.78142, lng: 117.18111, intensity: 25.2 },
//             { lat: 39.31690, lng: 117.73440, intensity: 78.948 },
//             { lat: 39.35178, lng: 117.72483, intensity: 49.5 },
//             { lat: 39.35390, lng: 117.77000, intensity: 47.9 },
//             { lat: 39.32270, lng: 117.72500, intensity: 18 },
//             { lat: 39.88420, lng: 117.40080, intensity: 31 },
//             { lat: 40.02490, lng: 117.32490, intensity: 20.28 },
//             { lat: 39.96265, lng: 117.46265, intensity: 12.455 },
//             { lat: 39.98825, lng: 39.98825, intensity: 47.8 },
//             { lat: 38.81352, lng: 117.24685, intensity: 42.3 },
//             { lat: 38.98959, lng: 117.62292, intensity: 57 },
//             { lat: 39.09003, lng: 117.54003, intensity: 36 },
//             { lat: 38.92111, lng: 117.72111, intensity: 65.617 },
//             { lat: 39.09817, lng: 117.63151, intensity: 35 },
//             { lat: 38.92750, lng: 117.72750, intensity: 60 },
//             { lat: 38.92944, lng: 117.72945, intensity: 120 },
//             { lat: 38.95880, lng: 117.57547, intensity: 53.94 },
//             { lat: 39.14816, lng: 117.51480, intensity: 82 },
//             { lat: 38.92525, lng: 117.79191, intensity: 60.37 },
//             // 添加更多污染物浓度数据
//         ];

//         // 创建热力图数据集
//         var heatmapData1 = [];
//         pollutionData1.forEach(function (data) {
//             var point = new BMap.Point(data.lng, data.lat);
//             var intensity = data.intensity;
//             heatmapData1.push({ "lng": point.lng, "lat": point.lat, "count": intensity });
//         });

//         var heatmapData2 = [];
//         pollutionData2.forEach(function (data) {
//             var point = new BMap.Point(data.lng, data.lat);
//             var intensity = data.intensity;
//             heatmapData2.push({ "lng": point.lng, "lat": point.lat, "count": intensity });
//         });

//         var heatmapData3 = [];
//         pollutionData3.forEach(function (data) {
//             var point = new BMap.Point(data.lng, data.lat);
//             var intensity = data.intensity;
//             heatmapData3.push({ "lng": point.lng, "lat": point.lat, "count": intensity });
//         });

//         // 创建热力图图层
//         var heatmapOverlay1 = new BMapLib.HeatmapOverlay({ radius: 20, gradient: { 0.1: 'blue', 0.8: 'yellow', 1: 'red' } });
//         var heatmapOverlay2 = new BMapLib.HeatmapOverlay({ radius: 20, gradient: { 0.1: 'green', 0.8: 'yellow', 1: 'orange' } });
//         var heatmapOverlay3 = new BMapLib.HeatmapOverlay({ radius: 20, gradient: { 0.1: 'purple', 0.8: 'blue', 1: 'green' } });

//         // 添加热力图图层到地图
//         map1.addOverlay(heatmapOverlay1);
//         map1.addOverlay(heatmapOverlay2);
//         map1.addOverlay(heatmapOverlay3);

// // 显示热力图1
// //function showHeatmap1() {
//             heatmapOverlay1.setDataSet({ data: heatmapData1, max: 120 });
//             heatmapOverlay1.show();
//             heatmapOverlay2.hide();
//             heatmapOverlay3.hide();
        //}

        // 显示热力图2
        // function showHeatmap2() {
        //     heatmapOverlay1.hide();
        //     heatmapOverlay2.setDataSet({ data: heatmapData2, max: 130 });
        //     heatmapOverlay2.show();
        //     heatmapOverlay3.hide();
        // }

        // // 显示热力图3
        // function showHeatmap3() {
        //     heatmapOverlay1.hide();
        //     heatmapOverlay2.hide();
        //     heatmapOverlay3.setDataSet({ data: heatmapData3, max: 120 });
        //     heatmapOverlay3.show();
        // }

        // 默认显示热力图1
        //showHeatmap1();
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
    width: 90%;
    height: 46.5%;
    margin-top: 10%;
    margin-left: 6%;
}
.left_mid_chart{
    display: flex;
    width: 90%;
    height: 3%;
    margin-top: 0%;
    margin-left: 6%;
}
.left_down_chart{
background: url(/src/assets/image/leftb1.png);
background-size: 100% 100%;
background-repeat: no-repeat;
background-position: top center;
width: 100%;
height: 70%;
margin-top: 0%;
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