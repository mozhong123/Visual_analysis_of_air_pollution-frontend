<template>
  <div class="app">
    <div class="puleftboxtmidd">
      <h2 class="tith2">平行坐标图</h2>
      <div class="container-fluid" :style="containerStyle">
        <div id="pcp_graph" class="row" :style="graphStyle"></div>
      </div>
      <div class="pollution-container">
        <div class="pollution-content" id="prov" style="">Prov:</div>
        <div class="pollution-content" id="year">Year:</div>
        <div class="pollution-content" id="AQI">AQI:</div>
        <div class="pollution-content" id="PM10">PM10:</div>
        <div class="pollution-content" id="PM25">PM2.5:</div>
        <div class="pollution-content" id="SO2">SO2:</div>
        <div class="pollution-content" id="NO2">NO2:</div>
        <div class="pollution-content" id="CO">CO:</div>
        <div class="pollution-content" id="O3">O3:</div>
        <div class="pollution-content" id="Temp">Temp:</div>
        <div class="pollution-content" id="Wind">Wind Speed:</div>
        <div class="pollution-content" id="Level">Level:</div>
      </div>
    </div>

    <div class="puleftboxtmidd1">
      <div class="total_chose_box" style="position: absolute;top:2.7%;left:7.5%">
        <span class="chose_tltle">请输入年份：</span>
        <input class="chose_text_in" id="selectDate1" type="number" value=2013>
        <span class="chose_tltle">请输入月份：</span>
        <input class="chose_text_in" id="selectDate3" type="number" value=1>
        <span class="chose_tltle">请输入城市：</span>
        <input class="chose_text_in" id="selectDate2" value=北京市>
        <button class="chose_enter1" id="selectDate">确定</button>
      </div>
      <div class="total_chose_box1" style="position: absolute;top:8%;left:2%">
        <button class="chose_enter" id="btn7">前一年</button>
        <button class="chose_enter2" id="btn9">前一月</button>
        <button class="chose_enter" id="btn10">后一月</button>
        <button class="chose_enter" id="btn8">后一年</button>
      </div>
      <div class="tittle">
        <h2 class="tith3">日历图对比与预测情况</h2>
      </div>
      <div class="con" style="display: flex;">
        <div class="con left" style="position:absolute;left:-12.7%;top:15%;height:28%;width:140%;background-color: rgba(0,0,0,0);flex: 1;">
            <div id="calander"
                 style="position:relative;height: 100%;transform: scale(0.8);background-color: rgba(0,0,0,0);"></div>
        </div>
        <div class="con right" style="position:absolute;left:-32%;top:20%;width:168%;height:100%;">
                <div id="line" style="position:relative;height: 100%;transform: scale(0.6);"></div>
        </div>
      </div>


    </div>


  </div>
</template>

<script>
import * as echarts from "echarts";
import $ from "jquery";
import {data2013, data2014, data2015, data2016, data2017, data2018} from "@/../data/2013.js"; // 根据你的项目结构修改路径
import {pcp_whole} from "@/./assets/js/SankeyMap.js";
import {backendURL, method, queryRoute} from "@/config/const.ts"; // 根据你的项目结构修改路径

export default {
  components: {},
  data() {
    return {
      containerStyle: {
        backgroundColor: "rgba(0,0,0,0)",
        position: "absolute",
        top: "0%",
        left: "0%", // 调整 left 属性
        width: "95%",
      },
      graphStyle: {
        backgroundColor: "rgba(0,0,0,0)",
        border: "solid",
        borderColor: "rgba(0,0,0,0)",
        transform: "rotate(0deg)",
        height: "650px",
      }
    };
  },
  mounted() {
    const match_list = [
      "安徽",
      "北京",
      "重庆",
      "福建",
      "甘肃",
      "广东",
      "广西",
      "贵州",
      "海南",
      "河北",
      "河南",
      "黑龙江",
      "湖北",
      "湖南",
      "吉林",
      "江苏",
      "江西",
      "辽宁",
      "内蒙古",
      "宁夏",
      "青海",
      "山东",
      "山西",
      "陕西",
      "上海",
      "四川",
      "台湾",
      "天津",
      "西藏",
      "新疆",
      "香港",
      "云南",
      "浙江"
    ];
    const wholename_list = [
      "安徽省",
      "北京市",
      "重庆市",
      "福建省",
      "甘肃省",
      "广东省",
      "广西壮族自治区",
      "贵州省",
      "海南省",
      "河北省",
      "河南省",
      "黑龙江省",
      "湖北省",
      "湖南省",
      "吉林省",
      "江苏省",
      "江西省",
      "辽宁省",
      "内蒙古自治区",
      "宁夏回族自治区",
      "青海省",
      "山东省",
      "山西省",
      "陕西省",
      "上海市",
      "四川省",
      "台湾省",
      "天津市",
      "西藏自治区",
      "新疆维吾尔自治区",
      "香港特别行政区",
      "云南省",
      "浙江省"
    ];
    const line_list = ["省份", "年份", "AQI", "PM10", "PM2.5", "SO2", "NO2", "CO", "O3", "Temp", "风力强度", "质量等级"];
    $(document).ready(function () {
      var wholedata = [data2013, data2014, data2015, data2016, data2017, data2018];
      var yeartext = ["2013", "2014", "2015", "2016", "2017", "2018"];
      let pcpchart = echarts.init(document.getElementById("pcp_graph"));
      pcpchart.setOption(pcp_whole(wholedata, match_list, wholename_list, 'whole'), true);
      pcpchart.on('mouseover', function (params) {
        if (params.componentType === 'series' && params.seriesType === 'parallel') {
          const contents = document.querySelectorAll('.pollution-content');
          let i = 0;
          contents.forEach(content => {
            content.innerText = (' ' + line_list[i] + ': ' + params.data[i++]);
          })
        }
      });
    });
    var year = 2013
    var city = '北京市'
    var month = 1
    var day1 = 31
    var yearInput = $("#selectDate1");
    var cityInput = $("#selectDate2");
    var monthInput = $("#selectDate3");

    function loadData(type) {
      let queryURL;
      if (type === 0) {
        queryURL = 'http://' + backendURL + queryRoute + "reality_predict_AQI?"
            + 'year=' + year + '&city=' + city
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
              localStorage.setItem("TWO_AQI", JSON.stringify(data.data));
            })
            .catch(error => console.error('Error:', error));

      } else {
        queryURL = 'http://' + backendURL + queryRoute + "predict_AQI?"
            + 'month=' + month + '&city=' + city
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
    }

    var mCharts = echarts.init(document.getElementById('line'),);
    var mCharts2 = echarts.init(document.getElementById('calander'), 'dark')
    var option;
    var option2;

    function dataChange() {
      loadData(0)
      var storedData = JSON.parse(localStorage.getItem("TWO_AQI"));
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
          var time = year + '年' + month + '月' + day + '日';
          var temp1 = [time, storedData[sum]['predict_AQI']];
          var temp2 = [time, storedData[sum]['AQI']];
          data1.push(temp1)
          data2.push(temp2)
          sum++;
        }
      }

      mCharts.setOption(option = {
        legend: {
          data: [year + '年实际值', year + '年预测值'],
          textStyle: {
            color: 'white',  // 这里设置字体颜色
            fontSize: 22
          },

        },
        title: {
          // text: city + pollution,
          text: city + 'AQI',
          left: '1%',
          textStyle: {
            color: 'white',  // 这里设置字体颜色
            fontSize: 28
          },

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
          top: '8%',
          left:'87%',

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
          },
          textStyle: {
            color: 'white',  // 这里设置字体颜色
            fontSize: 18
          },
        },
        series: [
          {
            name: year + '年实际值',
            type: 'line',
            data: data2.map(function (item) {
              return item[1];
            }),
            markLine: {
              silent: true,
              lineStyle: {
                color: '#ffffff'
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
            name: year + '年预测值',
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
                color: '#ffffff'
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

    function generateRange(year, month) {
      // 构建日期对象的方法，月份是从 0 开始计数的，所以需要减去 1
      var startDate = new Date(year, month - 1, 1);
      var endDate = new Date(year, month, 0); // 0 表示上一个月的最后一天
      // 将日期对象转换为字符串，格式为 'YYYY-MM-DD'
      var startStr = echarts.format.formatTime('yyyy-MM-dd', startDate)
      var endStr = echarts.format.formatTime('yyyy-MM-dd', endDate)
      return [startStr, endStr];
    }

    async function dataChange2() {
      loadData(1);
      await new Promise(resolve => setTimeout(resolve, 100));
      var storedData = JSON.parse(localStorage.getItem("AQI"));
      var thirteen_data = [];
      var fourteen_data = [];
      var fifteen_data = [];
      var sixteen_data = [];
      var seventeen_data = [];
      var eighteen_data = [];
      let sum = 0;
      for (var year = 2013; year <= 2018; year++) {
        var maxDays = new Date(year, month, 0).getDate();
        for (var day = 1; day <= maxDays; day++) {
          var time = new Date(year, month - 1, day); // 月份是从 0 开始的，所以要减去 1
          if (year === 2013) {
            thirteen_data.push([
              echarts.format.formatTime('yyyy-MM-dd', time),
              Math.floor(storedData[sum]['AQI'])
            ]);
          } else if (year === 2014) {
            fourteen_data.push([
              echarts.format.formatTime('yyyy-MM-dd', time),
              Math.floor(storedData[sum]['AQI'])
            ]);
          } else if (year === 2015) {
            fifteen_data.push([
              echarts.format.formatTime('yyyy-MM-dd', time),
              Math.floor(storedData[sum]['AQI'])
            ]);
          } else if (year === 2016) {
            sixteen_data.push([
              echarts.format.formatTime('yyyy-MM-dd', time),
              Math.floor(storedData[sum]['AQI'])
            ]);
          } else if (year === 2017) {
            seventeen_data.push([
              echarts.format.formatTime('yyyy-MM-dd', time),
              Math.floor(storedData[sum]['AQI'])
            ]);
          } else if (year === 2018) {
            eighteen_data.push([
              echarts.format.formatTime('yyyy-MM-dd', time),
              Math.floor(storedData[sum]['AQI'])
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
          max: 150,
          calculable: true,
          orient: 'vertical',
          top: '500px'
        },

        calendar: [{
          yearLabel: {
            formatter: function (param) {
              return param.end+'年'+month+'月';
            }
          },
          top:50,
          left:0,
          orient: 'vertical',
          range: generateRange(2013, month),
        },
          {
            yearLabel: {
              formatter: function (param) {
                return param.end+'年'+month+'月';
              }
            },
            left:148,
            top: 50,
            orient: 'vertical',
            range: generateRange(2014, month)
          }, {
            yearLabel: {
              formatter: function (param) {
                return param.end+'年'+month+'月';
              }
            },
            left:296,
            top: 50,
            orient: 'vertical',
            range: generateRange(2015, month)
          }, {
            yearLabel: {
              formatter: function (param) {
                return param.end+'年'+month+'月';
              }
            },
            top: 50,
            left:444,
            orient: 'vertical',
            range: generateRange(2016, month)
          }, {
            yearLabel: {
              formatter: function (param) {
                return param.end+'年'+month+'月';
              }
            },
            top: 50,
            left:592,
            orient: 'vertical',
            range: generateRange(2017, month)
          }, {
            yearLabel: {
              formatter: function (param) {
                return param.end+'年'+month+'月';
              }
            },
            top: 50,
            left:740,
            orient: 'vertical',
            range: generateRange(2018, month)
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
    $('#selectDate').click(function () {//jqury对元素进行获�?
      var flag = 0;
      var y = yearInput.val();
      var c = cityInput.val();
      var m = monthInput.val();
      if (year !== y || city !== c) {
        year = y;
        city = c;
        month = m;
        dataChange()
        dataChange2()
      } else if (month !== m) {
        year = y;
        city = c;
        month = m;
        dataChange2()
      }
      yearInput.val(y);
      cityInput.val(c);
      monthInput.val(m);

    })
    $('#btn7').click(function () {//jqury对元素进行获�?
      year = parseInt(year)
      if (year === 2013)
        year = 2018
      else year -= 1
      dataChange()
      yearInput.val(year);
    })
    $('#btn8').click(function () {//jqury对元素进行获�?
      year = parseInt(year)
      if (year === 2018)
        year = 2013
      else year += 1
      dataChange()
      yearInput.val(year);
    })
    $('#btn9').click(function () {//jqury对元素进行获�?
      month = parseInt(month)
      if (month === 1)
        month = 12
      else month -= 1
      dataChange2()
      monthInput.val(month);
    })
    $('#btn10').click(function () {//jqury对元素进行获�?
      month = parseInt(month)
      if (month === 12)
        month = 1
      else month += 1
      dataChange2()
      monthInput.val(month);
    })
  }
};
</script>

<style>
.pollution-content {
  position: absolute;
  width: 33.5%;
  border: 2px solid #c4c7ce; /* 分隔线 */
  border-color: rgb(106, 161, 228);
  padding-left: 5px;
  top: 19%;
  left: 63.8%;
  height: 4.5%;
  border-radius: 10px 10px 10px 10px; /* 10px 圆角，底部为直角 */
}

#prov {
  top: 10%;
}

#year {
  top: 17.5%;
}

#AQI {
  top: 25%;
}

#PM10 {
  top: 32.5%;
}

#PM25 {
  top: 40%;
}

#SO2 {
  top: 48%;
}

#NO2 {
  top: 55.5%;
}

#CO {
  top: 63.5%;
}

#O3 {
  top: 71%;
}

#Temp {
  top: 78.5%;
}

#Wind {
  top: 86%;
}

#Level {
  top: 93.5%;
}

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

.puleftboxtmidd {
  background: url(/src/assets/image/aleftboxtbott.png);
  position: relative;
  background-size: 100% 100%;
  top: 10%;
  width: 45%;
  height: 86.5%;
  left: 3%
}

.puleftboxtmidd1 {
  background: url(/src/assets/image/aleftboxtbott.png);
  position: absolute;
  background-size: 100% 100%;
  top: 10%;
  width: 49%;
  height: 86.5%;
  left: 49%
}

.tittle {
  background: url(/src/assets/image/time.png);
  position: absolute;
  background-size: 100% 100%;
  top: 8.2%;
  width: 42%;
  height: 5.6%;
  left: 29%
}

.tith2 {
  display: inline-block;
  position: relative;
  width: 100%;
  top: 2%;
  left: 40%;
}

.tith3 {
  display: inline-block;
  position: absolute;
  width: 100%;
  top: 0;
  left: 13%;
}

.lefttoday_bar ul {
  position: relative;
  width: 100%;
  height: 100%;
}

.chose_enter {
  background-color: #1795bb;
  border-radius: 12px;
  border: none;
  color: white;
  padding: 6px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 100%;
  margin: 4px 2px;
  -webkit-transition-duration: 0.4s;
  transition-duration: 0.4s;
  cursor: pointer;
}

.chose_enter:hover {
  background-color: #fff;
  color: #1795bb;
  border: 1px solid #ccc;
}

.chose_enter1 {
  background-color: #1795bb;
  border-radius: 12px;
  border: none;
  color: white;
  padding: 1% 2%;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 13px;
  -webkit-transition-duration: 0.4s;
  transition-duration: 0.4s;
  cursor: pointer;
}

.chose_enter1:hover {
  background-color: #fff;
  color: #1795bb;
  border: 1px solid #ccc;
}

.chose_enter2 {
  background-color: #1795bb;
  border-radius: 12px;
  border: none;
  color: white;
  padding: 6px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 100%;
  -webkit-transition-duration: 0.4s;
  transition-duration: 0.4s;
  cursor: pointer;
  margin-left: 2px;
  margin-right: 340px;
}

.chose_enter2:hover {
  background-color: #fff;
  color: #1795bb;
  border: 1px solid #ccc;
}

.chose_text_in {
  width: 9%;
  border: 1px solid rgb(147, 160, 231);
  border-radius: 4px;
  font-size: 16px;
  margin-right: 2.5%;
}

.chose_tltle {
  font-size: large;
  margin-right: 0.1%;
}
</style>