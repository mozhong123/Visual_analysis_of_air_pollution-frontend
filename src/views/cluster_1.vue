<template>
    <div class="app"></div>
    <h1 style="position:fixed;color: aliceblue;top:0%;left:47%;">聚类图</h1>
    <div class="total_chose_box" style="position: fixed;top:10%;right:2%;">
        <span class="chose_tltle" style="color:aquamarine;">请输入年份：</span>
        <input class="chose_text_in" id="selectDate1" value=2013>
        <button class="chose_enter" id="selectDate">确定</button>
        <button class="chose_enter" id="btn1">PM2.5</button>
        <button class="chose_enter" id="btn2">PM10</button>
        <button class="chose_enter" id="btn3">SO2</button>
        <button class="chose_enter" id="btn4">NO2</button>
        <button class="chose_enter" id="btn5">CO</button>
        <button class="chose_enter" id="btn6">O3</button>
        <button class="chose_enter" id="btn7">前一年</button>
        <button class="chose_enter" id="btn8">后一年</button>
    </div>
    


    <div class="div_1" style="position:fixed;top:5%;left:3%;width:500px;height:450px;background:url(/src/assets/image/aleftboxtbott.png);background-size: 100% 100%;">
        <div class="div_any_title" style="position: relative;left:20px;top:10px;font-size:large;color:aliceblue">~散点聚类</div>
        <div id="main" style="width:450px;height: 450px;position: relative;top:15px;"></div>
    </div>

    <div class="div_any_child" style="width:500px;height:400px;position:fixed;bottom:2%;left:10%;background:url(/src/assets/image/aleftboxtbott.png);background-size: 100% 100%;">
        <div class="div_any_title" style="position: relative;left:20px;font-size:large;color:aliceblue">~城市聚类地图</div>
        <div id="two" style="width:500px;position:relative;height: 400px;top:10px"></div>
    </div>

    <div class="div_any_child" style="width:750px;position:fixed;bottom:0%;right:8%;background:url(/src/assets/image/aleftboxtbott.png);background-size: 100% 100%;">
        <div class="div_any_title" style="position: relative;left:100px;font-size:large;color:aliceblue;">污染物相似度对比分析</div>
        <div id="three" style="width:700px;position:relative;height: 750px;top:10px"></div>
    </div>

</template>
<script>
import HeaderMenu from "@/components/HeaderMenu.vue"; // 此路径应根据你的项目结构来修改
import BackGround from "@/components/BackGround.vue"; // 此路径应根据你的项目结构来修改
import * as echarts from "echarts";
import $ from "jquery";
import 'echarts/extension/bmap/bmap';
import 'echarts-gl';
import ecStat from 'echarts-stat';

export default {
  components: {
    BackGround,
    HeaderMenu
  },
  mounted()
  {
    var yearInput = $("#selectDate1");
  let myChart = echarts.init(document.getElementById('main'), 'dark');
  let myCharts = echarts.init(document.getElementById('two'), "dark");
  let myChartss = echarts.init(document.getElementById('three'), );
  var option;
  var optionn;
  var colors = ['#fc5c65', '#fd9644', '#fed330', '#26de81', '#2bcbba', '#45aaf2', '#4b7bec', '#a55eea', '#a5b1c2', '#778ca3', '#4b6584'];
  var data = [];
  var year = 2013;
  var pollution = 'PM2.5'
  var url = '/data/cluster_data/' + year + '/' + pollution + '.json'
  var url2 = '/data/finally/' + year + '.json'
  function dataChange(url) {
      var data = [];
      $.get(url, function (ret) {
          data = ret['coordinate'];
          var clusterNumber = 11;
          var step = ecStat.clustering.hierarchicalKMeans(data, clusterNumber, true);
          var result;

          option = {
              timeline: {
                  top: 'center',
                  right: 35,
                  height: 300,
                  width: 10,
                  inverse: true,
                  playInterval: 2500,
                  symbol: 'none',
                  orient: 'vertical',
                  axisType: 'category',
                  autoPlay: true,
                  label: {
                      normal: {
                          show: false
                      }
                  },
                  data: []
              },
              baseOption: {
                  backgroundColor: 'rgba(0, 0, 0, 0)', // 设置背景颜色为无色透明
                  toolbox: {
                      right: 10,
                      feature: {
                          dataZoom: {
                              yAxisIndex: 'none'
                          },
                          restore: {},
                          saveAsImage: {}
                      }
                  },
                  tooltip: {
                      show: true,
                      trigger: 'axis',
                      showContent: true,//是否显示提示框浮层，默认显示
                      alwaysShowContent: false,//是否永远显示提示框内容，默认情况下在移出可触发提示框区域�? 一定时�? 后隐藏，设置�? true 可以保证一直显示提示框内容
                      hideDelay: 0,//鼠标移出坐标点时，浮层隐藏的延迟时间，单位为 ms，在 alwaysShowContent �? true 的时候无�?
                      //     formatter: function (params) {
                      //        console.log(result["centroids"][i].length);
                      //  //       console.log(result)
                      //         for (var i = 0; i < result["centroids"][i].length; i++) {
                      //             console.log(result["centroids"][i][0])
                      //             var c = '';
                      //             if (result["pointsInCluster"][i][j][0] == params[0].value[0] && result["pointsInCluster"][i][j][1] == params[0].value[1]) {
                      //                 for (var k = 0; k < data.length; k++) {
                      //                     if (params[0].value[0] == data[k][0]) c = ret["city"][k];
                      //                 }
                      //                 return c + pollution + ':�?' + i + '�?'
                      //             }
                      //         }
                      //         // if (params[0].value[0] == data[i][0])
                      //         //     return ret["city"][i] + pollution + '分类�?' + ret["classify"][i];
                      //         // return params.data.name+pollution+'分类:'+ params.data.value[2]
                      //     }

                  },
                  title: {
                      text: year + '年' + pollution + '空气质量聚类分析',
                      left: 'center',
                      textStyle: {
                          color: 'white' // 设置文本颜色为黑色
                      }
                  },
                  xAxis: {
                      type: 'value',
                      axisLabel: {
                          color: 'white' // 设置X轴标签的颜色为红色
                      }
                  },
                  yAxis: {
                      type: 'value',
                      axisLabel: {
                          color: 'white' // 设置X轴标签的颜色为红色
                      }
                  },
                  series: [{
                      type: 'scatter'
                  }]
              },
              options: []
          };

          for (var i = 0; !(result = step.next()).isEnd; i++) {

              option.options.push(getOption(result, clusterNumber));
              option.timeline.data.push(i + '');

          }
          //      console.log(result);

          function getOption(result, k) {
              var clusterAssment = result.clusterAssment;
              var centroids = result.centroids;
              var ptsInCluster = result.pointsInCluster;
              var series = [];
              for (i = 0; i < k; i++) {
                  series.push({
                      name: 'scatter' + i,
                      type: 'scatter',
                      animation: false,
                      data: ptsInCluster[i],
                      markPoint: {
                          symbolSize: 29,
                          label: {
                              normal: {
                                  show: false
                              },
                              emphasis: {
                                  show: true,
                                  position: 'top',
                                  formatter: function (params) {
                                      return Math.round(params.data.coord[0] * 100) / 100 + '  ' +
                                          Math.round(params.data.coord[1] * 100) / 100 + ' ';
                                  },
                                  textStyle: {
                                      color: '#000'
                                  }
                              }
                          },
                          itemStyle: {
                              normal: {
                                  opacity: 0.7// 设置透明度
                              }
                          },
                          data: [{
                              coord: centroids[i]
                          }]
                      }
                  });
              }

              return {
                  tooltip: {
                      trigger: 'axis',
                      axisPointer: {
                          type: 'cross'
                      }
                  },
                  series: series,
                  color: colors
              };
          }
          myChart.setOption(option);
          //console.log(ret)
          //   console.log(result);
          var mapData = [];
          var curtain=[];
          for (var i = 0; i < 11; i++) {
              //     console.log(result.pointsInCluster[i])
              for (var j = 0; j < result.pointsInCluster[i].length; j++) {
                  //                  console.log(result.pointsInCluster[i][j][1])
                  for (var k = 0; k < ret.coordinate.length; k++) {
                      if (result.pointsInCluster[i][j][0] == ret.coordinate[k][0] && result.pointsInCluster[i][j][1] == ret.coordinate[k][1]) {
                          var lon = ret.position[k][0];
                          var lat = ret.position[k][1];
                          var city = ret.city[k];
                          var itemArr = [lat, lon, i, city]
                          var cur=[city,lat,lon]
                          mapData.push(itemArr)
                          curtain.push(cur)

                      }
                  }
              }
          }
          $.get('/src/assets/js/ClusterChina.json', function (ret) {
              echarts.registerMap('chinaMap', ret)
              optionn = {
                  geo: {
                      type: 'map',
                      selectedMode: 'single',
                      map: 'chinaMap',
                      roam: true,
                      label: {
                          show: false
                      },
                      zoom: 1.6,
                      center: [108.948024, 34.263161] // 设置地图中心点的坐标(陕西)
                  }
              }
              optionn = {
                  backgroundColor: 'rgba(0, 0, 0, 0)', // 设置背景颜色为无色透明
                  title: {
                      text: year + '年' + pollution + '空气质量聚类分析',
                      left: 'center',
                      textStyle: {
                          color: 'white' // 设置文本颜色为黑色
                      }
                  },
                  tooltip: {
                      show: true,
                      trigger: 'item',
                      showContent: true,//是否显示提示框浮层，默认显示
                      alwaysShowContent: false,//是否永远显示提示框内容，默认情况下在移出可触发提示框区域�? 一定时�? 后隐藏，设置�? true 可以保证一直显示提示框内容
                      hideDelay: 0,//鼠标移出坐标点时，浮层隐藏的延迟时间，单位为 ms，在 alwaysShowContent �? true 的时候无�?
                      formatter: function (params) {
                          //   console.log(params)
                          return params.data.name + pollution + '分类:' + params.data.value[2]
                      }
                  },
                  geo: {
                      map: 'chinaMap',
                      roam: true,//是否开启缩放和平移
                      zoom: 1.24,//视角缩放比例
                      label: {
                          normal: {
                              show: false,//是否显示省份名称
                              fontSize: '10',//字体大小
                              color: 'white'//字体颜色
                          },
                          // emphasis: { //动态展示的样式
                          //     fontSize: '10',//字体大小
                          //     color: '#fff'//字体颜色                                            
                          // },
                      },
                      itemStyle: {
                          normal: {
                              borderColor: 'rgba(0, 0, 0, 0.2)',
                              areaColor: '#CAD3C8',//静态时各省份区域颜�?
                          },
                          emphasis: {
                              areaColor: '#BDC581',//鼠标选择区域颜色
                              shadowOffsetX: 0,
                              shadowOffsetY: 0,
                              shadowBlur: 20,
                              borderWidth: 0,
                              shadowColor: 'rgba(0, 0, 0, 0.5)'
                          }
                      }
                  },
                  series: [
                      {
                          type: 'scatter',
                          coordinateSystem: 'geo',
                          animation: false,//坐标点是否显示动�?
                          symbol: 'pin',
                          roam: true,
                          rippleEffect: {
                              brushType: 'fill'// stroke|fill
                          },
                          symbolSize: function (val, params) {//坐标点大�?
                              return 15;
                          },
                          data: mapData.map(function (itemOpt) {
                              //  console.log(itemOpt[3]%13)
                              return {
                                  name: itemOpt[3],
                                  value: [
                                      parseFloat(itemOpt[1]),//经度
                                      parseFloat(itemOpt[0]),//维度
                                      parseFloat(itemOpt[2])//分类
                                  ],
                                  label: {
                                      emphasis: {//高亮状态下的样�?
                                          show: false

                                      }
                                  },
                                  itemStyle: {//地图区域的多边形
                                      color: colors[itemOpt[2]],
                                      emphasis: {
                                          areaColor: "#0ff",
                                          color: "#fff",
                                      }
                                  },
                              };
                          })
                      }
                  ]
              }
              myCharts.setOption(optionn)
              setTimeout(function () {
                  window.onresize = function () {
                      myChart.resize();
                      myCharts.resize();
                      myChartss.resize();
                  }
              }, 200)
          })
      })
  }
  dataChange(url);
  $('#selectDate').click(function () {//jqury对元素进行获�?
      var flag = 0;
      var y = jQuery("#selectDate1").val();
      if (year !== y) { year = y; flag = 1 }
      if (flag) {
          url = '/data/cluster_data/' + year + '/' + pollution + '.json'
          dataChange(url);
          url2 = '/data/finally/' + year + '.json'
          dataChange3(url2);
      }
  })
  $('#btn1').click(function () {//jqury对元素进行获�?
      pollution = 'PM2.5';
      url = '/data/cluster_data/' + year + '/' + pollution + '.json'
      dataChange(url);
  })
  $('#btn2').click(function () {//jqury对元素进行获�?
      pollution = 'PM10';
      url = '/data/cluster_data/' + year + '/' + pollution + '.json'
      dataChange(url);
  })
  $('#btn3').click(function () {//jqury对元素进行获�?
      pollution = 'SO2';
      url = '/data/cluster_data/' + year + '/' + pollution + '.json'
      dataChange(url);
  })
  $('#btn4').click(function () {//jqury对元素进行获�?
      pollution = 'NO2';
      url = '/data/cluster_data/' + year + '/' + pollution + '.json'
      dataChange(url);
  })
  $('#btn5').click(function () {//jqury对元素进行获�?
      pollution = 'CO';
      url = '/data/cluster_data/' + year + '/' + pollution + '.json'
      dataChange(url);
  })
  $('#btn6').click(function () {//jqury对元素进行获�?
      pollution = 'O3';
      url = '/data/cluster_data/' + year + '/' + pollution + '.json'
      dataChange(url);
  })
  $('#btn7').click(function () {//jqury对元素进行获�?
    year = parseInt(year)
      if(year === 2013)
          year = 2018
      else year -= 1
      url = '/data/cluster_data/' + year + '/' + pollution + '.json'
      url2 = '/data/finally/' + year + '.json'
      dataChange(url);
      dataChange3(url2);
      yearInput.val(year);
  })
  $('#btn8').click(function () {//jqury对元素进行获�?
    year = parseInt(year)
      if(year === 2018)
          year = 2013
      else year += 1
      url = '/data/cluster_data/' + year + '/' + pollution + '.json'
    url2 = '/data/finally/' + year + '.json'
      dataChange(url);
      dataChange3(url2);
      yearInput.val(year);
  })
  var sx=0;
  var sy=0;
  var up1=0;
  var down1=0;
  var down2=0;
  var r=0;
  function dataChange3(url) {//计算六种污染物之间的皮尔逊相关系数
      $.get(url, function (ret) {
          for(var i=0; i<ret.data.length; i++){
              sx+=ret.data[i][5];
              sy+=ret.data[i][4];
          }
          sx/=36;
          sy/=36;//均值
          for(var i=0; i<ret.data.length; i++){
             up1+=(ret.data[i][5]-sx)*(ret.data[i][4]-sy)//协方差
             down1+= Math.pow((ret.data[i][5]-sx),2)//标准差
             down2+= Math.pow((ret.data[i][4]-sy),2)
          }
          down1=Math.sqrt(down1);
          down2=Math.sqrt(down2);
          r=up1/(down1*down2);//计算皮尔逊相关系数
          var optionm;
          var schema = [
              { name: 'PM25', index: 1, text: 'PM25' },
              { name: 'PM10', index: 2, text: 'PM10' },
              { name: 'SO2', index: 3, text: 'SO2' },
              { name: 'NO2', index: 4, text: 'NO2' },
              { name: 'CO', index: 5, text: 'CO' },
              { name: 'O3', index: 6, text: 'O3' },
              { name: '污染天数', index: 7, text: '污染天数' }
          ];

          var rawData = [];
          rawData = ret.data
          var CATEGORY_DIM_COUNT = 6;
          var GAP = 2;
          var BASE_LEFT = 5;
          var BASE_TOP = 10;
          // var GRID_WIDTH = 220;
          // var GRID_HEIGHT = 220;
          var GRID_WIDTH = (100 - BASE_LEFT - GAP) / CATEGORY_DIM_COUNT - GAP;
          var GRID_HEIGHT = (100 - BASE_TOP - GAP) / CATEGORY_DIM_COUNT - GAP;
          var CATEGORY_DIM = 7;
          var SYMBOL_SIZE = 4;

          function retrieveScatterData(data, dimX, dimY) {
              var result = [];
              for (var i = 0; i < data.length; i++) {
                  var item = [data[i][dimX], data[i][dimY]];
                  item[CATEGORY_DIM] = data[i][CATEGORY_DIM];
                  result.push(item);
              }
              return result;
          }

          function generateGrids(option) {
              var index = 0;

              for (var i = 0; i < CATEGORY_DIM_COUNT; i++) {
                  for (var j = 0; j < CATEGORY_DIM_COUNT; j++) {
                      if (CATEGORY_DIM_COUNT - i + j >= CATEGORY_DIM_COUNT) {
                          continue;
                      }

                      option.grid.push({
                          left: BASE_LEFT + i * (GRID_WIDTH + GAP) + '%',
                          top: BASE_TOP + j * (GRID_HEIGHT + GAP) + '%',
                          width: GRID_WIDTH + '%',
                          height: GRID_HEIGHT + '%',

                      });

                      option.brush.xAxisIndex && option.brush.xAxisIndex.push(index);
                      option.brush.yAxisIndex && option.brush.yAxisIndex.push(index);

                      option.xAxis.push({
                          splitNumber: 3,
                          position: 'top',
                          axisLine: {
                              show: j === 0,
                              onZero: false
                          },
                          axisTick: {
                              show: j === 0,
                              inside: true
                          },
                          axisLabel: {
                              show: j === 0
                          },
                          type: 'value',
                          gridIndex: index,
                          scale: true
                      });

                      option.yAxis.push({
                          splitNumber: 3,
                          position: 'right',
                          axisLine: {
                              show: i === CATEGORY_DIM_COUNT - 1,
                              onZero: false
                          },
                          axisTick: {
                              show: i === CATEGORY_DIM_COUNT - 1,
                              inside: true
                          },
                          axisLabel: {
                              show: i === CATEGORY_DIM_COUNT - 1
                          },
                          type: 'value',
                          gridIndex: index,
                          scale: true
                      });

                      option.series.push({
                          type: 'scatter',
                          symbolSize: SYMBOL_SIZE,
                          xAxisIndex: index,
                          yAxisIndex: index,
                          data: retrieveScatterData(rawData, i, j)
                      });

                      option.visualMap.seriesIndex.push(option.series.length - 1);

                      index++;
                  }
              }
          }


          var optionm = {
              tooltip: {
                  saveAsImage: true
              },
              title: {
                  text: year + '年',
                  left: 'left'
              },
              animation: false,
              brush: {
                  brushLink: 'all',
                  xAxisIndex: [],
                  yAxisIndex: [],
                  inBrush: {
                      opacity: 1
                  }
              },
              visualMap: {
                  type: 'piecewise',
                  categories: ["北京", "武汉", "广州"],
                  dimension: CATEGORY_DIM,
                  orient: 'horizontal',
                  top: 0,
                  left: 'center',
                  inRange: {
                      color: ['#ED4C67', '#4cd137', '#00a8ff']
                  },
                  outOfRange: {
                      color: '#353b48'
                  },
                  seriesIndex: [0]
              },
              tooltip: {
                  trigger: 'item'
              },
              parallelAxis: [
                  { dim: 0, name: schema[0].text },
                  { dim: 1, name: schema[1].text },
                  { dim: 2, name: schema[2].text },
                  { dim: 3, name: schema[3].text },
                  { dim: 4, name: schema[4].text },
                  { dim: 5, name: schema[5].text },
                  {
                      dim: 6, name: schema[6].text,
                      data: [5, 10, 15, 20, 25, 30]
                  }
              ],
              parallel: {
                  bottom: '5%',
                  left: '3%',
                  height: '30%',
                  width: '55%',
                  parallelAxisDefault: {
                      type: 'value',
                      // name: 'AQI指数',
                      nameLocation: 'end',
                      nameGap: 20,
                      splitNumber: 3,
                      nameTextStyle: {
                          fontSize: 14
                      },
                      axisLine: {
                          lineStyle: {
                              color: '#555'
                          }
                      },
                      axisTick: {
                          lineStyle: {
                              color: '#555'
                          }
                      },
                      splitLine: {
                          show: false
                      },
                      axisLabel: {
                          color: '#555'
                      }
                  }
              },
              grid: [],
              xAxis: [],
              yAxis: [],
              series: [
                  {
                      name: 'parallel',
                      type: 'parallel',
                      smooth: true,
                      lineStyle: {
                          width: 1,
                          opacity: 0.3
                      },
                      data: rawData
                  }
              ]
          };

          generateGrids(optionm);

          optionm && myChartss.setOption(optionm);

      })

  }
  dataChange3(url2)
  }
};
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
.chose_enter {background-color: #1795bb;
        border-radius: 6px;
        border: none;color: white;
        padding: 8px 16px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 12px;
        margin: 4px 2px;
        -webkit-transition-duration: 0.4s;
        transition-duration: 0.4s;
        cursor: pointer;}
    .chose_enter:hover {background-color: #fff;
        color: #1795bb;
        border: 1px solid #ccc;}
.chose_text_in {
    width: 100px; 
    height: 30px; 
    padding: 5px; 
    border: 1px solid rgb(147, 160, 231); 
    border-radius: 4px; 
    font-size: 15px; 
}
</style>