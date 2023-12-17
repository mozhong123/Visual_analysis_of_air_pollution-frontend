<template>
<div class="app" >
  <div class="con">
    <div class="Left_2_chart_continer">
      <div class="left_up_chart" id="line1">
      </div>
    </div>
    <div class="Mid_chart_continer">
      <div class="mid_chart" id="map1">
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
    var myChart = echarts.init(document.getElementById('line1'));
    var myChart2 = echarts.init(document.getElementById('map1'));
    var option;
    var option2;
    const Data = [
  ['Num', 'Pollution', 'Year'],
  [2137, 'PM2.5(心血管)', 2013],
  [3071, 'PM10(心血管)', 2013],
  [2203, 'SO2(心血管)', 2013],
  [879, 'NO2(心血管)', 2013],
  [2544, 'CO(心血管)', 2013],
  [525, 'O3(心血管)', 2013],
  [1829, 'PM2.5(心血管)', 2014],
  [3204, 'PM10(心血管)', 2014],
  [1828, 'SO2(心血管)', 2014],
  [875, 'NO2(心血管)', 2014],
  [2067, 'CO(心血管)', 2014],
  [578, 'O3(心血管)', 2014],
  [1505, 'PM2.5(心血管)', 2015],
  [2567, 'PM10(心血管)', 2015],
  [1072, 'SO2(心血管)', 2015],
  [628, 'NO2(心血管)', 2015],
  [1726, 'CO(心血管)', 2015],
  [574, 'O3(心血管)', 2015],
  [1495, 'PM2.5(心血管)', 2016],
  [2220, 'PM10(心血管)', 2016],
  [785, 'SO2(心血管)', 2016],
  [751, 'NO2(心血管)', 2016],
  [1741, 'CO(心血管)', 2016],
  [655, 'O3(心血管)', 2016],
  [1318, 'PM2.5(心血管)', 2017],
  [1778, 'PM10(心血管)', 2017],
  [593, 'SO2(心血管)', 2017],
  [782, 'NO2(心血管)', 2017],
  [1567, 'CO(心血管)', 2017],
  [1181, 'O3(心血管)', 2017],
  [1034, 'PM2.5(心血管)', 2018],
  [1590, 'PM10(心血管)', 2018],
  [423, 'SO2(心血管)', 2018],
  [687, 'NO2(心血管)', 2018],
  [1296, 'CO(心血管)', 2018],
  [1247, 'O3(心血管)', 2018],
  [363, 'PM2.5(呼吸系统)', 2013],
  [339, 'PM10(呼吸系统)', 2013],
  [548, 'SO2(呼吸系统)', 2013],
  [164, 'NO2(呼吸系统)', 2013],
  [391, 'CO(呼吸系统)', 2013],
  [86, 'O3(呼吸系统)', 2013],
  [326, 'PM2.5(呼吸系统)', 2014],
  [310, 'PM10(呼吸系统)', 2014],
  [477, 'SO2(呼吸系统)', 2014],
  [171, 'NO2(呼吸系统)', 2014],
  [333, 'CO(呼吸系统)', 2014],
  [99, 'O3(呼吸系统)', 2014],
  [274, 'PM2.5(呼吸系统)', 2015],
  [268, 'PM10(呼吸系统)', 2015],
  [288, 'SO2(呼吸系统)', 2015],
  [126, 'NO2(呼吸系统)', 2015],
  [285, 'CO(呼吸系统)', 2015],
  [574, 'O3(呼吸系统)', 2015],
  [240, 'PM2.5(呼吸系统)', 2016],
  [207, 'PM10(呼吸系统)', 2016],
  [186, 'SO2(呼吸系统)', 2016],
  [132, 'NO2(呼吸系统)', 2016],
  [253, 'CO(呼吸系统)', 2016],
  [655, 'O3(呼吸系统)', 2016],
  [194, 'PM2.5(呼吸系统)', 2017],
  [169, 'PM10(呼吸系统)', 2017],
  [129, 'SO2(呼吸系统)', 2017],
  [126, 'NO2(呼吸系统)', 2017],
  [209, 'CO(呼吸系统)', 2017],
  [168, 'O3(呼吸系统)', 2017],
  [146, 'PM2.5(呼吸系统)', 2018],
  [131, 'PM10(呼吸系统)', 2018],
  [88, 'SO2(呼吸系统)', 2018],
  [107, 'NO2(呼吸系统)', 2018],
  [1194, 'CO(呼吸系统)', 2018],
  [170, 'O3(呼吸系统)', 2018]
];
function run(Data) {
  const pollutions = [
    'PM2.5(心血管)',
    'PM10(心血管)',
    'SO2(心血管)',
    'NO2(心血管)',
    'CO(心血管)',
    'O3(心血管)',
    'PM2.5(呼吸系统)',
    'PM10(呼吸系统)',
    'SO2(呼吸系统)',
    'NO2(呼吸系统)',
    'CO(呼吸系统)',
    'O3(呼吸系统)'
  ];

  const datasetWithFilters = [];
  const seriesList = [];
  const legendData = pollutions.slice(); // copy all pollutions for legend

  const cardiovascularPollutions = pollutions.slice(0, 6); // 前6个属于心血管疾病的污染物
  const respiratoryPollutions = pollutions.slice(6); // 后6个属于呼吸系统疾病的污染物

  function createSeries(pollutionList) {
    return pollutionList.map(function (pollution) {
      var datasetId = 'dataset_' + pollution;
      datasetWithFilters.push({
        id: datasetId,
        fromDatasetId: 'dataset_raw',
        transform: {
          type: 'filter',
          config: {
            and: [
              { dimension: 'Year', gte: 2013 },
              { dimension: 'Pollution', '=': pollution }
            ]
          }
        }
      });
      return {
        type: 'line',
        smooth: true,
        datasetId: datasetId,
        showSymbol: false,
        name: pollution,
        endLabel: {
          show: true,
          formatter: function (params) {
            return params.value[1] + ': ' + params.value[0];
          }
        },
        labelLayout: {
          moveOverlap: 'shiftY'
        },
        emphasis: {
          focus: 'series'
        },
        encode: {
          x: 'Year',
          y: 'Num',
          label: ['Pollution', 'Num'],
          itemName: 'Year',
          tooltip: ['Num']
        }
      };
    });
  }

  seriesList.push(...createSeries(cardiovascularPollutions));
  seriesList.push(...createSeries(respiratoryPollutions));

  option = {
    animationDuration: 10000,
    dataset: [
      {
        id: 'dataset_raw',
        source: Data
      },
      ...datasetWithFilters
    ],
    title: {
      text: '天津市因各污染物导致两种疾病死亡人数的变化情况',
      left: 'center',
      top: '5%',
      textStyle: {
        color: 'white',
        fontSize: 18
      }
    },
    tooltip: {
      order: 'valueDesc',
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      nameTextStyle:{
        color: 'white'
      },
      nameLocation: 'middle',
      axisLabel: {
        textStyle: {
          color: 'white' // 设置坐标轴文本颜色为白色
        }
      }
    },
    yAxis: {
      name: '死亡人数',
      nameTextStyle:{
        color: 'white'
      },
      axisLabel: {
        textStyle: {
          color: 'white' // 设置坐标轴文本颜色为白色
        }
      },
    },
    grid: {
      left: '6%',
      right: '12%',
      bottom: '15%',
      top: '15%'
    },
    series: seriesList,
    legend: {
      data: legendData,
      textStyle:{
        color: 'white'
      },
      selected: createLegendSelected(
        cardiovascularPollutions,
        respiratoryPollutions
      ),
      bottom: 0,
      // You can customize the legend position, layout, and other properties here
      left: '5%',
      color: 'white',
    }
  };

  myChart.setOption(option);
}

function createLegendSelected(cardiovascularPollutions, respiratoryPollutions) {
  const selected = {};
  cardiovascularPollutions.forEach((pollution) => {
    selected[pollution] = true;
  });
  respiratoryPollutions.forEach((pollution) => {
    selected[pollution] = true;
  });
  return selected;
}

run(Data);

option && myChart.setOption(option);
function run1()
{
  option2 = {
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
                    text: '大气污染造成的天津市心血管疾病与呼吸系统疾病死亡人数图',
                    left: 'center',
                    top: '5%',
                    textStyle: {
                    color: 'white', // 设置文本颜色为白色
                    fontSize: 18
                }
            },
            tooltip: {
                //{a}
                trigger: 'item',
                formatter: ' <br/>{b}: {c} ({d}%)'
            },
            legend: {
                data: [
                'PM2.5心血管死亡数',
                'PM10心血管死亡数',
                'SO2心血管死亡数',
                'NO2心血管死亡数',
                'CO心血管死亡数',
                'O3心血管死亡数',
                'PM2.5呼吸系统死亡数',
                'PM10呼吸系统死亡数',
                'SO2呼吸系统死亡数',
                'NO2呼吸系统死亡数',
                'CO呼吸系统死亡数',
                'O3呼吸系统死亡数'
                ],
                top: '88%',
                left: '5%',
                textStyle:{
                  color: 'white'
                }
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
                    textStyle:{
                      color: 'white'
                    },
                    backgroundColor: 'rgba(0,0,0,0)',
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
                        color: 'white',
                        fontSize: 14,
                        fontWeight: 'bold',
                        lineHeight: 33
                    },
                    per: {
                        color: '#fff',
                        backgroundColor: 'rgba(255,255,255,0.1)',
                        padding: [3, 4],
                        borderRadius: 4
                    }
                    }
                },
                data: [
                    {value:9318,name:'PM2.5心血管死亡数'},
                    {value:14430,name:'PM10心血管死亡数'},
                    {value:6904,name:'SO2心血管死亡数'},
                    {value:4602,name:'NO2心血管死亡数'},
                    {value:10914,name:'CO心血管死亡数'},
                    {value:4760,name:'O3心血管死亡数'},
                    {value:1543,name:'PM2.5呼吸系统死亡数'},
                    {value:1424,name:'PM10呼吸系统死亡数'},
                    {value:1716,name:'SO2呼吸系统死亡数'},
                    {value:826,name:'NO2呼吸系统死亡数'},
                    {value:2665,name:'CO呼吸系统死亡数'},
                    {value:1085,name:'O3呼吸系统死亡数'}
                ]
                }
            ]
        };
        option2 && myChart2.setOption(option2);
}
run1();
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
.mid_chart{
    background: url(/src/assets/image/leftb1.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-position: top center;
    width: 94%;
    height: 86.5%;
    margin-top: 10%;
    margin-left: 0%;
}
.con{
  flex: 1;
  width: 100%;
  height: 100%;
  display: flex;
}
.Left_2_chart_continer,
.Mid_chart_continer {
  flex: 1;
  display: flex;
  flex-direction: column; /* 子元素上下布局 */
  align-items: center; /* 水平居中对齐 */
  height: 100%;
  box-sizing: border-box;
}

</style>