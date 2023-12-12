<template>
    <div class = 'Pie-chart-container' >
      <div class = 'con' >
          <div class = 'con_left' >
            <h3 style="position: absolute;top:10%;left:10%; font-weight: bold;">各污染物健康经济损失价值占天津GDP比重与变化趋势</h3>
            <div class = 'left-chart' id="pie1" style="position: absolute;width: 50%;left: 0;height: 83%;top: 17%;"></div>
          </div>
          <div class = 'con_right' >
            <h3 style="position: absolute;top:10%;right:10%; font-weight: bold;">PM10与NO2健康经济损失价值与工业发展指标的相关性分析</h3>
            <div class = 'right-chart' id="pie2" style="position: absolute;width: 50%;left: 0;height: 83%;top: 17%;transform:translate(100%, 0);"></div>
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
        var myChart2 = echarts.init(document.getElementById('pie2'));
        var myChart = echarts.init(document.getElementById('pie1'));
        var option;
        var option2;
function Vis(){
    option = {
    legend: {},
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
    grid: { top: '55%' },
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
        center: ['50%', '25%'],
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
  myChart.on('updateAxisPointer', function (event) {
    console.log(event);
    const xAxisInfo = event.axesInfo[0];
    if (xAxisInfo) {
      const dimension = xAxisInfo.value + 1;
      myChart.setOption({
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
    option2 = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  legend: {
    data: ['PM10', 'NO2']
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
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
option && myChart.setOption(option);
option2 && myChart2.setOption(option2);
}
Vis();
}

};
</script>
  
<style>
            
</style>