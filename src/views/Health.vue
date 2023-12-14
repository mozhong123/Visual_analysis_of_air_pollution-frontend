<template>
  <div class = 'Pie-chart-container' >
    <div class = 'con' >
        <div class = 'con_left' >
            <div class = 'left-chart' id="pie1" 
                style="position: absolute;width: 50%;left: 0;height: 92%;top: 8%;">
            </div>
        </div>
        <div class = 'con_right' >
            <div class = 'right-chart' id="pie2"
                style="position: absolute;width: 50%;left: 0;height: 92%;top: 8%;transform:translate(100%, 0);background-color: rgb(255, 255, 255,0);">
            </div>
        </div>
    </div>
  </div>
  <div>
    <HeaderMenu></HeaderMenu>
    <BackGround></BackGround>
    <!-- 其他页面内容 -->
  </div>
</template>
<script>
import * as echarts from "echarts";
import {ElSelect, ElOption} from "element-plus";
import HeaderMenu from "@/components/HeaderMenu.vue"; // 此路径应根据你的项目结构来修改
import BackGround from "@/components/BackGround.vue"; // 此路径应根据你的项目结构来修改
import {backendURL, headers, method, queryRoute} from "@/config/const.ts";

export default {
  components: {
    BackGround,
    HeaderMenu
  },
  mounted() {
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
    var myChart = echarts.init(document.getElementById('pie2'));
    var myChart2 = echarts.init(document.getElementById('pie1'));
    var option;
    var option2;
    function Vis(){
        option = {
            // title: {
            //         text: '2013-2018年天津市大气污染造成的心血管疾病死亡人数图',
            //         left: 'center',
            //         textStyle: {
            //         color: 'black' // 设置文本颜色为黑色
            //     }
            // },
            // legend: {
            //     top: 'bottom'
            // },
            // toolbox: {
            //     show: true,
            //     feature: {
            //     mark: { show: true },
            //     dataView: { show: true, readOnly: false },
            //     restore: { show: true },
            //     saveAsImage: { show: true }
            //     }
            // },
            // series: [
            //     {
            //     name: 'Nightingale Chart',
            //     type: 'pie',
            //     radius: [50, 250],
            //     center: ['50%', '50%'],
            //     roseType: 'area',
            //     itemStyle: {
            //         borderRadius: 8
            //     },
            //     data: data1,
            //     label:{
            //         show: true,
            //         formatter: '{c}({d}%)'
            //     }
            //     }
            // ]
            title: {
                    text: '2013-2018年天津市大气污染造成的心血管疾病与呼吸系统疾病死亡人数图',
                    left: 'center',
                    textStyle: {
                    color: 'black' // 设置文本颜色为黑色
                }
            },
            tooltip: {
                //{a}
                trigger: 'item',
                formatter: ' <br/>{b}: {c} ({d}%)'
            },
            legend: {
                data: [
                'PM2.5导致的心血管疾病死亡人数',
                'PM10导致的心血管疾病死亡人数',
                'SO2导致的心血管疾病死亡人数',
                'NO2导致的心血管疾病死亡人数',
                'CO导致的心血管疾病死亡人数',
                'O3导致的心血管疾病死亡人数',
                'PM2.5导致的呼吸系统疾病死亡人数',
                'PM10导致的呼吸系统疾病死亡人数',
                'SO2导致的呼吸系统疾病死亡人数',
                'NO2导致的呼吸系统疾病死亡人数',
                'CO导致的呼吸系统疾病死亡人数',
                'O3导致的呼吸系统疾病死亡人数'
                ],
                top: 'bottom'
            },
            series: [
                {
                name: '大气污染导致的两种疾病的死亡人数',
                type: 'pie',
                selectedMode: 'single',
                radius: [0, '30%'],
                label: {
                    position: 'inner',
                    fontSize: 14
                },
                labelLine: {
                    show: false
                },
                data: [
                    { value: 50955, name: '大气污染导致的心血管疾病死亡人数' },
                    { value: 9259, name: '大气污染导致的呼吸系统疾病死亡人数', selected: true }
                ]
                },
                {
                name: '666',
                type: 'pie',
                radius: ['45%', '60%'],
                labelLine: {
                    length: 30
                },
                label: {
                    //{a|{a}}{abg|}\n{hr|}\n  
                    formatter: '{b|{b}:}{c}  {per|{d}%} ',
                    backgroundColor: '#F6F8FC',
                    borderColor: '#8C8D8E',
                    borderWidth: 1,
                    borderRadius: 4,

                    rich: {
                    a: {
                        color: '#6E7079',
                        lineHeight: 22,
                        align: 'center'
                    },
                    hr: {
                        borderColor: '#8C8D8E',
                        width: '100%',
                        borderWidth: 1,
                        height: 0
                    },
                    b: {
                        color: '#4C5058',
                        fontSize: 14,
                        fontWeight: 'bold',
                        lineHeight: 33
                    },
                    per: {
                        color: '#fff',
                        backgroundColor: '#4C5058',
                        padding: [3, 4],
                        borderRadius: 4
                    }
                    }
                },
                data: [
                    {value:9318,name:'PM2.5导致的心血管疾病死亡人数'},
                    {value:14430,name:'PM10导致的心血管疾病死亡人数'},
                    {value:6904,name:'SO2导致的心血管疾病死亡人数'},
                    {value:4602,name:'NO2导致的心血管疾病死亡人数'},
                    {value:10914,name:'CO导致的心血管疾病死亡人数'},
                    {value:4760,name:'O3导致的心血管疾病死亡人数'},
                    {value:1543,name:'PM2.5导致的呼吸系统疾病死亡人数'},
                    {value:1424,name:'PM10导致的呼吸系统疾病死亡人数'},
                    {value:1716,name:'SO2导致的呼吸系统疾病死亡人数'},
                    {value:826,name:'NO2导致的呼吸系统疾病死亡人数'},
                    {value:2665,name:'CO导致的呼吸系统疾病死亡人数'},
                    {value:1085,name:'O3导致的呼吸系统疾病死亡人数'}
                ]
                }
            ]
        };
        option2 = {
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
    top: '3%'
  },
  legend: {
    right: '10%',
    top: '3%',
    data: ['PM2.5', 'PM10', 'NO2', 'SO2', 'CO', 'O3']
  },
  grid: {
    left: '8%',
    top: '10%'
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
      data: data[0],
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
      data: data[1],
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
      data: data[2],
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
      data: data[3],
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
      data: data[4],
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
      data: data[5],
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

        option && myChart.setOption(option);
        option2 && myChart2.setOption(option2);
    }
    Vis();
  }
};
</script>

<style>
          
</style>