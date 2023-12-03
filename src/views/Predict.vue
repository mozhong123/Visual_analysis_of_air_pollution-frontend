<template>
  <div class="con" style="display: flex;">
    <div class="con left" style="width:250px;position:relative;top:80px;background-color: rgba(0,0,0,0);flex: 1;">
      <!--统计分析�?-->
      <div class="div_any">
        <div class="left div_any01" style="width:250px;">
          <div class="div_any_child"
               style="width:248px;position:relative;height: 1150px;background-color: rgba(0,0,0,0);">
            <div class="div_any_title">日历图对比</div>
            <div id="calander"
                 style="width:248px;position:relative;left:2px;height: 1050px;top:50px;background-color: rgba(0,0,0,0);"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="con right" style="width:950px;position:relative;top:50px;flex: 1;">
      <div class="div_any">
        <div class="left div_any01" style="width:950px;">
          <div class="div_any_child" style="width:948px;position:relative;height: 1150px;top:30px;">
            <div class="div_any_title">预测情况</div>
            <div id="line" style="width:948px;position:relative;left:2px;height: 1050px;top:50px"></div>
          </div>
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
import $ from "jquery";
import HeaderMenu from "@/components/HeaderMenu.vue"; // 此路径应根据你的项目结构来修改
import BackGround from "@/components/BackGround.vue"; // 此路径应根据你的项目结构来修改
import {backendURL, headers, method, queryRoute} from "@/config/const.ts";
import { defineComponent, reactive, ref } from 'vue';
export default {
  components: {
    BackGround,
    HeaderMenu
  },
  data() {
  },
  mounted() {
    function loadData(type) {
      // const DateCur = JSON.parse(localStorage.getItem("selectDate"));
      let queryURL;
      if (type === 0) {
        queryURL = 'http://' + backendURL + queryRoute + "reality_predict_AQI?"
            + 'year=' + '2016'

      } else {
        queryURL = 'http://' + backendURL + queryRoute + "predict_AQI?"
            + 'month=' + '1'
      }
      queryURL = queryURL + '&city=' + '北京市'

      fetch(queryURL, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
        }
      })
          .then(response => response.json())
          .then(data => {
            localStorage.setItem("AQI", JSON.stringify(data.data));
          })
          .catch(error => console.error('Error:', error));
    }

    var mCharts = echarts.init(document.getElementById('line'),);
    var mCharts2 = echarts.init(document.getElementById('calander'), 'dark')
    var option;
    var option2;

    function dataChange() {
      loadData(0)
      var storedData = JSON.parse(localStorage.getItem("AQI"));
      var data1 = [];
      var data2 = [];
      var sum = 0;
      for (var month = 1; month <= 12; month++) {
        for (var day = 1; day <= 31; day++) {
          // 检查是否超出月份的最大天数
          var maxDays = new Date(2013, month, 0).getDate();
          if (day > maxDays) {
            break;
          }
          var time = '2013' + '年' + month + '月' + day + '日';
          var temp1 = [time, storedData[sum]['predict_AQI']];
          var temp2 = [time, storedData[sum]['AQI']];
          data1.push(temp1)
          data2.push(temp2)
          sum++;
        }
      }

      mCharts.setOption(option = {
        legend: {
          data: ['2018年实际值', '2018年预测值']
        },
        title: {
          // text: city + pollution,
          left: '1%'
        },
        tooltip: {
          trigger: 'axis'
        },
        grid: {
          left: '5%',
          right: '15%',
          bottom: '10%'
        },
        xAxis: {
          data: data1.map(function (item) {
            return item[0];
          })
        },
        yAxis: {},
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
        dataZoom: [{
          startValue: '1�?111111�?1�?'
        }, {
          type: 'inside'
        }],
        visualMap: {
          top: 50,
          right: 10,
          pieces: [{
            gt: 0,
            lte: 50,
            color: '#ea8685'
          }, {
            gt: 50,
            lte: 50 * 2,
            color: '#e77f67'
          }, {
            gt: 50 * 2,
            lte: 50 * 3,
            color: '#e66767'
          }, {
            gt: 50 * 3,
            lte: 50 * 4,
            color: '#e15f41'
          }, {
            gt: 50 * 4,
            lte: 50 * 6,
            color: '#ff4d4d'
          }, {
            gt: 50 * 6,
            lte: 50 * 8,
            color: '#ff3838'
          }],
          outOfRange: {
            color: '#535c68'
          }
        },
        series: [
          {
            name: '2018年实际值',
            type: 'line',
            data: data2.map(function (item) {
              return item[1];
            }),
            markLine: {
              silent: true,
              lineStyle: {
                color: '#333'
              },
              data: [{
                yAxis: 0
              }, {
                yAxis: 50 * 2
              }, {
                yAxis: 50 * 3
              }, {
                yAxis: 50 * 4
              }, {
                yAxis: 50 * 6
              }, {
                yAxis: 50 * 8
              }, {
                yAxis: 50 * 10
              }]
            }
          },
          {
            // name: city + pollution,
            name: '2018年预测值',
            type: 'line',
            lineStyle: {
              color: '#34e7e4',
            },
            data: data1.map(function (item) {
              return item[1];
            }),
            markLine: {
              silent: true,
              lineStyle: {
                color: '#333'
              },
              data: [{
                yAxis: 0
              }, {
                yAxis: 50 * 2
              }, {
                yAxis: 50 * 3
              }, {
                yAxis: 50 * 4
              }, {
                yAxis: 50 * 6
              }, {
                yAxis: 50 * 8
              }, {
                yAxis: 50 * 10
              }]
            }
          },
        ]
      });

      option && mCharts.setOption(option);
      setTimeout(function () {
        window.onresize = function () {
          mCharts.resize();
          mCharts2.resize();
        }
      }, 200)

    }

    dataChange();

    function dataChange2() {
      loadData(1);
      var storedData = JSON.parse(localStorage.getItem("AQI"));
      var thirteen_data = [];
      var fourteen_data = [];
      var fifteen_data = [];
      var sixteen_data = [];
      var seventeen_data = [];
      var eighteen_data = [];
      let month = 1;
      let sum = 0;
      for (var year = 2013; year <= 2018; year++) {
        var maxDays = new Date(year, month, 0).getDate();
        for (var day = 0; day <= maxDays; day++) {
          var time = new Date(year, month - 1, day); // 月份是从 0 开始的，所以要减去 1
          if (year === 2013) {
            thirteen_data.push([
              echarts.format.formatTime('yyyy-MM-dd', time),
              Math.floor(storedData[sum]['predict_AQI'])
            ]);
          } else if (year === 2014) {
            fourteen_data.push([
              echarts.format.formatTime('yyyy-MM-dd', time),
              Math.floor(storedData[sum]['predict_AQI'])
            ]);
          } else if (year === 2015) {
            fifteen_data.push([
              echarts.format.formatTime('yyyy-MM-dd', time),
              Math.floor(storedData[sum]['predict_AQI'])
            ]);
          } else if (year === 2016) {
            sixteen_data.push([
              echarts.format.formatTime('yyyy-MM-dd', time),
              Math.floor(storedData[sum]['predict_AQI'])
            ]);
          } else if (year === 2017) {
            seventeen_data.push([
              echarts.format.formatTime('yyyy-MM-dd', time),
              Math.floor(storedData[sum]['predict_AQI'])
            ]);
          } else if (year === 2018) {
            eighteen_data.push([
              echarts.format.formatTime('yyyy-MM-dd', time),
              Math.floor(storedData[sum]['predict_AQI'])
            ]);
          }
          sum++;
        }
      }
      option2 = {

        backgroundColor: 'rgba(0, 0, 0, 0)', // 设置背景颜色为无色透明
        tooltip: {
          position: 'top',
          formatter: function (p) {
            var format = echarts.format.formatTime('yyyy-MM-dd', p.data[0]);
            return format + ': ' + p.data[1];
          }
        },
        visualMap: {
          min: 0,
          max: 400,
          calculable: true,
          orient: 'vertical',
          top: '465px'
        },

        calendar: [{
          orient: 'vertical',
          range: ['2013-01-01', '2013-01-31']
        },
          {
            top: 225,
            orient: 'vertical',
            range: ['2014-01-01', '2014-01-31']
          }, {
            top: 400,
            orient: 'vertical',
            range: ['2015-01-01', '2015-01-31']
          }, {
            top: 575,
            orient: 'vertical',
            range: ['2016-01-01', '2016-01-31']
          }, {
            top: 760,
            orient: 'vertical',
            range: ['2017-01-01', '2017-01-31']
          }, {
            yearLabel: {
              formatter: function (param) {
                return param.end;
              }
            },
            top: 920,
            orient: 'vertical',
            range: ['2018-01-01', '2018-01-31']
          },
        ],

        series: [{
          type: 'heatmap',
          coordinateSystem: 'calendar',
          calendarIndex: 0,
          data: thirteen_data
        }, {
          type: 'heatmap',
          coordinateSystem: 'calendar',
          calendarIndex: 1,
          data: fourteen_data
        }, {
          type: 'heatmap',
          coordinateSystem: 'calendar',
          calendarIndex: 2,
          data: fifteen_data
        }, {
          type: 'heatmap',
          coordinateSystem: 'calendar',
          calendarIndex: 3,
          data: sixteen_data
        }, {
          type: 'heatmap',
          coordinateSystem: 'calendar',
          calendarIndex: 4,
          data: seventeen_data
        }, {
          type: 'heatmap',
          coordinateSystem: 'calendar',
          calendarIndex: 5,
          data: eighteen_data
        },
        ]
      };

      option2 && mCharts2.setOption(option2);


    }

    dataChange2()
  }
}
;
</script>

<style>

</style>