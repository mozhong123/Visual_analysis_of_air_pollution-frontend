<template>
  <!--顶部-->
  <div class="pollution-chart-container">
    <div class="options">
      <div class="city-location">城市定位</div>
      <div class="pollution-view">污染情况概览</div>
      <div class="chart-options">
        <div class="total_chose_box">
          <span class="chose_tltle">请输入年份：</span>
          <input class="chose_text_in" id="selectDate1" value=2013>
          <span class="chose_tltle">请输入月份：</span>
          <input class="chose_text_in" id="selectDate2" value=1>
          <span class="chose_tltle">请输入日期：</span>
          <input class="chose_text_in" id="selectDate3" value=1>
          <button class="chose_enter" id="selectDate">确定</button>
          <button class="chose_enter" id="btn1">PM2.5</button>
          <button class="chose_enter" id="btn2">PM10</button>
          <button class="chose_enter" id="btn3">SO2</button>
          <button class="chose_enter" id="btn4">NO2</button>
          <button class="chose_enter" id="btn5">CO</button>
          <button class="chose_enter" id="btn6">O3</button>
        </div>
        <button class="toggleButton"></button>
      </div>
    </div>

    <!--内容部分-->
    <!-- Content Part -->
    <div class="con">
      <!-- Chart 1 -->
      <div class="left-chart">
        <div class="chart-child-01" id="main"
             style="width: 100%;position: absolute;left: 0;height: 100%;top: 0; ">
        </div>
      </div>

      <!-- Chart 2 -->
      <div class="right-chart">
        <div class="chart-child-02" id="line"
             style="width: 100%;position: absolute;left: 0;height: 100%;top: 0;">
        </div>
      </div>
    </div>
  </div>
  <div>
    <HeaderMenu></HeaderMenu>
    <BackGround></BackGround>
    <MapChart></MapChart>
    <!-- 其他页面内容 -->
  </div>
</template>

<script>
import HeaderMenu from "@/components/HeaderMenu.vue"; // 此路径应根据你的项目结构来修改
import MapChart from "@/components/MapChart.vue";
import BackGround from "@/components/BackGround.vue";
import * as echarts from "echarts";
import $ from "jquery";
import 'echarts/extension/bmap/bmap';
import 'echarts-gl';
import {backendURL,queryRoute,method,headers} from "@/config/const.ts";
import ecStat from 'echarts-stat';


export default {
  components: {
    BackGround,
    HeaderMenu, MapChart
  },
  created() {
  },
  mounted() {
    var colors = ['#20bf6b', '#0fb9b1', '#f7b731', '#fa8231', '#eb3b5a', '#6F1E51', '#1e90ff', '#5352ed', '#3742fa', '#3c40c6'];
    var arr = ['AQI', 'PM2.5', 'PM10', 'SO2', 'NO2', 'CO', 'O3', 'U', 'V', 'TEMP', 'RH', 'PSFC']
    var arrFiltered = ['AQI', 'PM2_5', 'PM10', 'SO2', 'NO2', 'CO', 'O3', 'U', 'V', 'TEMP', 'RH', 'PSFC']
    var mCharts1 = echarts.init(document.getElementById('main'), 'dark');
    var mCharts2 = echarts.init(document.getElementById('line'),);
    var city = '北京'
    var year = 2013;
    var month = 1;
    var day = 1;
    var pollution = 'PM2.5';
    var url = '/data/2.json'
    var url3 = '/data/CO.json'
    localStorage.setItem("selectCity", '北京');
    localStorage.setItem('selectDate', JSON.stringify([2013, 1, 1]))


    function setMap() {
      // 前端代码
      // 使用fetch或其他HTTP请求库获取数据
      // 2. 获取特定日期、城市的污染数据
      const DateCur = JSON.parse(localStorage.getItem("selectDate"));
      //需要更改
      const queryMethod = "pollution_map?"
      const queryURL = 'http://' + backendURL + queryRoute + queryMethod
          + 'year=' + DateCur[0]
          + '&month=' + DateCur[1]
          + '&day=' + DateCur[2]
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
            //console.log(data.data); // 在控制台查看获取的污染数据
            // 在这里处理你的数据，更新前端界面
            localStorage.setItem("MapCur", JSON.stringify(data.data));
            //console.log(localStorage.getItem('MapCur'));
          })
          .catch(error => console.error('Error:', error));
    }

    function colorChange(pollution) {
      const choseEnterAll = document.querySelectorAll(".chose_enter");
      choseEnterAll.forEach(choseEnter => {
        if (choseEnter.textContent === pollution) {
          choseEnter.style.backgroundColor = 'white';
        } else {
          choseEnter.style.backgroundColor = '#f0f0f0';
        }
      })
    }


    function dataChange(url) {
      $.get('/data/china.json', function (ret) {
        echarts.registerMap('chinaMap', ret)
        var option = {
          geo: {
            type: 'map',
            selectedMode: 'single',
            map: 'chinaMap',
            roam: true,
            label: {
              //         show: true
            },
            zoom: 3,
            center: [114.31, 30.52] // 设置地图中心点的坐标(武汉)
          }
        }
      })


      var mapData = [];
      $.get(url, function (ret) {
        var obj = JSON.parse(localStorage.getItem("MapCur"));
        //console.log(obj);
        for (let i in obj) {
          //let flag = arr.indexOf(pollution)
          var pol = obj[i][pollution];
        }
        // console.log(min, max)
        for (let i in obj) {
          var city = i;
          let flag = arr.indexOf(pollution);
          //console.log(flag)
          var pol = obj[i][arrFiltered[flag]];
          var color = 0;
          if (flag <= 9) {
            if (pol <= 400) color = 5;
            if (pol <= 300) color = 4;
            if (pol <= 200) color = 3;
            if (pol <= 150) color = 2;
            if (pol <= 100) color = 1;
            if (pol <= 50) color = 0;
            if (pol > 400) color = 5;
          }
          var lat = obj[i]['lat'];
          var lon = obj[i]['lon'];
          var itemArr = [lat, lon, pol, obj[i]['name'], color]
          mapData.push(itemArr)
        }
        mCharts1.setOption({
          title: {
            show: true,
            text: year + '年' + month + '月' + day + '日' + pollution,
            textStyle: {
              color: 'rgba(0, 0, 0, 1)'// 设置文本颜色为黑色
            }
          },
          tooltip: {
            show: true,
            trigger: 'item',
            showContent: true,//是否显示提示框浮层，默认显示
            alwaysShowContent: false,//是否永远显示提示框内容，默认情况下在移出可触发提示框区域后 一定时间 后隐藏，设置为 true 可以保证一直显示提示框内容
            hideDelay: 0,//鼠标移出坐标点时，浮层隐藏的延迟时间，单位为 ms，在 alwaysShowContent 为 true 的时候无效
            formatter: function (params) {
              localStorage.setItem("selectCity", params.data.name);
              return params.data.name + pollution + ':' + params.data.value[3]
            }
          },
          backgroundColor: 'rgba(0, 0, 0, 0)', // 设置背景颜色为无色透明
          geo: {
            map: 'chinaMap',
            roam: true,//是否开启缩放和平移
            zoom: 1.24,
            center: [108, 36],// 设置地图中心点的坐标(西安)
            label: {
              normal: {
                show: false,//是否显示省份名称
                //       fontSize: '10',//字体大小
                color: '#57606f'//字体颜色
              },
              emphasis: { //动态展示的样式
                fontSize: '10',//字体大小
                color: 'rgba(0,0,0,1)'
                //color: '#485460f'//字体颜色
              },
            },
            itemStyle: {
              normal: {
                borderColor: 'rgba(0, 0, 0, 0.5)',
                areaColor: '#dcdde1',//静态时各省份区域颜色
              },
              emphasis: {
                areaColor: '#718093',//鼠标选择区域颜色
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
              type: 'effectScatter',
              coordinateSystem: 'geo',
              animation: false,//坐标点是否显示动画
              //       symbol: 'pin',
              roam: true,
              rippleEffect: {
                brushType: 'stroke'// stroke|fill
              },
              hoverAnimation: true,
              symbolSize: function (val, params) {//坐标点大小
                //     console.log(val)
                if (val[2] == 0) return 3;
                if (val[2] == 1) return 5;
                if (val[2] == 2) return 9;
                if (val[2] == 3) return 13;
                if (val[2] == 4) return 17;
                if (val[2] == 5) return 19;
              },
              label: {
                show: false,
                fontSize: 15,
                position: 'right',
                formatter: function (val) {
                  // if (val.data.name == '武汉') {
                  //     //                console.log(val.data.value)
                  //     return val.data.name;
                  // }
                  if (val.data.value[2] >= 9) {
                    return val.data.name;
                  } else if (val.data.value[2] >= 3 && val.data.value[2] <= 4) {
                    return val.data.name;
                  } else return '';
                }
              },
              data: mapData.map(function (itemOpt) {
                return {
                  name: itemOpt[3],
                  value: [
                    parseFloat(itemOpt[1]),//经度
                    parseFloat(itemOpt[0]),//维度
                    parseFloat(itemOpt[4]),
                    parseInt(itemOpt[2]),
                  ],
                  itemStyle: {//地图区域的多边形

                    color: colors[itemOpt[4]],
                    emphasis: {
                      areaColor: "#0ff",
                      color: '#f1f2f6'
                    },
                  },
                };
              }),

              selectedMode: 'single',
              select: {
                color: 'blue'
              }
            }
          ]
        });
        setTimeout(function () {
          window.onresize = function () {
            mCharts1.resize();
            mCharts2.resize();
          }
        }, 200)
      })
    }

    setMap();
    dataChange();

    $('#selectDate').click(function () {//jqury对元素进行获取
      var flag = 0;
      var y = jQuery("#selectDate1").val();
      var m = jQuery("#selectDate2").val();
      var d = jQuery("#selectDate3").val();
      console.log(y, m, d);
      if (year !== y) {
        year = y;
        flag = 1
      }
      if (month !== m) {
        month = m;
        flag = 1
      }
      if (day !== d) {
        day = d;
        flag = 1
      }
      if (flag) {
        //url = '../map_data/' + year + '/' + month + '/' + day + '.json'
        localStorage.setItem('selectDate', JSON.stringify([y, m, d]))
        //        console.log(url);
        //console.log([y,m,d]);
        setMap();
        dataChange(url);
      }
    })
    $('#btn1').click(function () {//jqury对元素进行获取
      pollution = 'PM2.5';
      dataChange(url);
      url3 = 'line/' + city + '/' + pollution + '.json'
      dataChange2(url3);
      colorChange(pollution);
    })
    $('#btn2').click(function () {//jqury对元素进行获取
      pollution = 'PM10';
      dataChange(url);
      url3 = 'line/' + city + '/' + pollution + '.json'
      dataChange2(url3);
      colorChange(pollution);
    })
    $('#btn3').click(function () {//jqury对元素进行获取
      pollution = 'SO2';
      dataChange(url);
      url3 = 'line/' + city + '/' + pollution + '.json'
      dataChange2(url3);
      colorChange(pollution);
    })
    $('#btn4').click(function () {//jqury对元素进行获取
      pollution = 'NO2';
      dataChange(url);
      url3 = 'line/' + city + '/' + pollution + '.json'
      dataChange2(url3);
      colorChange(pollution);
    })
    $('#btn5').click(function () {//jqury对元素进行获取
      pollution = 'CO';
      dataChange(url);
      url3 = 'line/' + city + '/' + pollution + '.json'
      dataChange2(url3);
      colorChange(pollution);
    })
    $('#btn6').click(function () {//jqury对元素进行获取
      pollution = 'O3';
      dataChange(url);
      url3 = 'line/' + city + '/' + pollution + '.json'
      dataChange2(url3);
      colorChange(pollution);
    })
    mCharts1.on('click', function (params) {
      if (city != params.name) {

        city = params.name;
        mCharts1.setOption({
          geo: {
            type: 'map',
            selectedMode: 'single',
            map: 'chinaMap',
            roam: true,
            label: {
              //         show: true
            },
            zoom: 11,
            center: [params.value[0], params.value[1]] // 设置地图中心点的坐标
          },
          series: [{
            label: {
              show: true,
              fontSize: 15,
              color: '#57606f',
              position: 'right',
              formatter: function (val) {
                if (params.name == val.data.name) {
                  return val.data.name;
                } else return '';
              }
            },

          }],
        })

        url3 = 'line/' + city + '/' + pollution + '.json'
        dataChange2(url3);
      }
    });

    var date_all = [], i = 0;

    function getDate(datestr) {
      var temp = datestr.split("-");
      var date = new Date(temp[0], temp[1] - 1, temp[2]);
      //    console.log(date);
      return date;
    }

    var start = "2013-01-01";
    var end = "2018-12-31";
    var startTime = getDate(start);
    var endTime = getDate(end);
    while ((endTime.getTime() - startTime.getTime()) >= 0) {
      var year1 = startTime.getFullYear();
      var month1 = (startTime.getMonth() + 1).toString().length == 1 ? "0" + (startTime.getMonth() + 1).toString() : (startTime.getMonth() + 1).toString();
      var day1 = startTime.getDate().toString().length == 1 ? "0" + startTime.getDate() : startTime.getDate();
      date_all[i] = year1 + "-" + month1 + "-" + day1;
      startTime.setDate(startTime.getDate() + 1);
      i += 1;
    }

    function dataChange2(url) {
      var option2;
      var data = []
      var max = 0;
      var lop = 0;
      $.get(url, function (ret) {
        for (var i = 2013; i <= 2018; i++) {
          var temp = [];
          for (var j = 0; j < 365; j++) {
            var cur = parseInt(i % 2013);
            temp = [date_all[cur * 365 + j], ret.data[i][j]]
            data.push(temp)
          }
        }
        mCharts2.setOption(option2 = {
          title: {
            text: city + 'AQI',
            left: '1%'
          },
          tooltip: {
            trigger: 'axis',
            formatter: function (params) {
              return params[0].axisValue + '  ' + pollution + ': ' + parseInt(params[0].data)
            }
          },
          grid: {
            left: '5%',
            right: '15%',
            bottom: '10%'
          },
          xAxis: {
            data: data.map(function (item) {
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
            startValue: '2013-03-01',
            endValue: '2013-03-31'
          }, {
            type: 'inside'
          }],
          visualMap: {
            top: 50,
            right: 10,
            pieces: [{
              gt: 0,
              lte: 50,
              color: '#05c46b'
            }, {
              gt: 50,
              lte: 50 * 2,
              color: '#38ada9'
            }, {
              gt: 50 * 2,
              lte: 50 * 3,
              color: '#f6b93b'
            }, {
              gt: 50 * 3,
              lte: 50 * 4,
              color: '#e67e22'
            }, {
              gt: 50 * 4,
              lte: 50 * 6,
              color: '#b71540'
            }, {
              gt: 50 * 6,
              lte: 50 * 8,
              color: '#6F1E51'
            }],
            outOfRange: {
              color: '#535c68'
            }
          },
          series: {
            name: city + 'AQI',
            type: 'line',
            data: data.map(function (item) {
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
          }
        });
      });

      option2 && mCharts2.setOption(option2);
    }

    dataChange2(url3);

    const toggleButton = document.querySelector('.toggleButton');
    const content = document.querySelector(".total_chose_box");
    const chartOptionBox = document.querySelector(".chart-options");
    const cityLocationBtn = document.querySelector(".city-location");
    const pollutionViewBtn = document.querySelector(".pollution-view");
    const cityLocationChart = document.querySelector(".left-chart");
    const pollutionViewChart = document.querySelector(".right-chart");
    const chartContainer = document.querySelector(".pollution-chart-container");
    const choseEnterAll = document.querySelectorAll(".chose_enter");

    chartContainer.style.top = window.innerHeight * 0.11 + 'px';
    chartOptionBox.style.top = "12.5%"
    chartOptionBox.style.left = "22%"
    chartOptionBox.style.maxHeight = window.innerHeight * 0.04 + 'px';
    content.style.top = -window.innerHeight * 0.0085 + 'px'
    chartOptionBox.style.width = '2%'
    chartOptionBox.style.height = '120%'
    choseEnterAll.forEach(choseEnter => {
      choseEnter.style.height = window.innerHeight * 0.04 + 'px';
    });
    mCharts1.resize();
    mCharts2.resize();

    window.addEventListener('resize', () => {
      chartContainer.style.top = window.innerHeight * 0.11 + 'px';
      chartOptionBox.style.maxHeight = window.innerHeight * 0.04 + 'px';
      choseEnterAll.forEach(choseEnter => {
        choseEnter.style.height = window.innerHeight * 0.04 + 'px';
      });
      chartOptionBox.style.top = "12.5%"
      chartOptionBox.style.left = "22%"
    })


    toggleButton.addEventListener("click", () => {
      if (chartOptionBox.style.width === '2%') {
        chartOptionBox.style.width = '67%'
        chartOptionBox.style.justifyContent = "space-between"
        content.style.display = 'block'
      } else {
        chartOptionBox.style.width = '2%'
        chartOptionBox.style.justifyContent = "center"
        content.style.display = "none"; // 折叠时将最大高度设为0，实现过渡效果

      }
      toggleButton.classList.toggle('toggleButtonExpand')
      toggleButton.classList.toggle('toggleButton')
    });

    cityLocationBtn.addEventListener('click', function () {
      cityLocationChart.style.display = "block";
      pollutionViewChart.style.display = "none"
      mCharts1.resize();
    });

    pollutionViewBtn.addEventListener('click', function () {
      cityLocationChart.style.display = "none";
      pollutionViewChart.style.display = "block"
      mCharts2.resize();
    });
  },
  methods: {},
};
</script>

<style>
.background-container1 {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 1;
}

.background-iframe1 {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
}

.pollution-chart-container {
  position: fixed;
  display: flex;
  flex-direction: column;
  left: 7%;
  height: 85%;
  width: 85%;
}

.options {
  position: relative;
  background-color: #f0f0f0;
  border: 2px solid #c4c7ce; /* 分隔线 */
  border-bottom: 2px solid #ccc; /* 分隔线 */;
  font-size: 80%;
  width: 100%;
  height: 9%;
  border-radius: 10px 10px 0 0; /* 10px 圆角，底部为直角 */
  overflow: hidden;
}


.total_chose_box {
  display: none;
  position: relative;
  transition: height 0.7s ease; /* 添加过渡效果，使显示和隐藏平滑 */
  margin-left: 1%;
}

.chart-options {
  display: flex;
  transition: width 0.5s ease; /* 添加过渡效果，使显示和隐藏平滑 */
  justify-content: center; /* 将内容水平居中 */
  border-radius: 20px;
  border: 2px solid #ccc;
  padding: 5px;
  position: fixed;
  overflow: hidden;
  max-height: 20px;
  font-size: 20px;
  top: 500px;
  left: 500px;
}

.chose_tltle,
.chose_text_in {
  float: left;
}

.chose_text_in {
  margin-top: 0.5%;
}

.chose_enter {
  border: none;
  padding: 0;
  background-color: #f0f0f0;
  cursor: pointer;
  float: left;
  justify-content: center;
  align-items: center;
  width: 5%;
}

#btn1{
  background-color: #ffffff;
}

.city-location,
.pollution-view {
  height: 100%;
  display: flex;
  float: left;
  justify-content: center;
  align-items: center;
  position: relative;
  transition: background 0.5s; /* 添加过渡效果 */
}

.city-location {
  width: 7%;
}

.pollution-view {
  width: 10%;
}

.chose_text_in {
  width: 7%;
}

.toggleButton,
.toggleButtonExpand {
  position: relative;
  align-items: center;
  width: 70px;
  height: 40px;
  margin: -10px;
  display: flex;
  justify-content: center;
  background-color: transparent;
  transition: background 0.7s; /* 添加过渡效果 */
  border: none;

}

.city-location:hover,
.pollution-view:hover {
  background: #ffffff;
}

.toggleButton:hover,
.toggleButtonExpand:hover {
  background-color: #f0f0f0;
}

.toggleButton::before,
.toggleButton::after {
  content: "";
  position: absolute;
  width: 3px;
  height: 15px;
  background-color: #989898; /* 图标颜色 */
}

.toggleButtonExpand::before,
.toggleButtonExpand::after {
  content: "";
  position: absolute;
  width: 3px;
  height: 15px;
  background-color: #989898; /* 图标颜色 */
}

.toggleButton::before {
  transform: translate(0, 31%) rotate(45deg);
}

.toggleButton::after {
  transform: translate(0, -31%) rotate(-45deg);
}

.toggleButtonExpand::before {
  transform: translate(0, 31%) rotate(-45deg);
}

.toggleButtonExpand::after {
  transform: translate(0, -31%) rotate(45deg);
}

.con {
  position: relative;
  background-color: transparent;
  border: 2px solid #c4c7ce; /* 分隔线 */
  border-top: none; /* 分隔线 */;
  border-radius: 0 0 10px 10px; /* 10px 圆角，底部为直角 */
  font-size: 70%;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.left-chart,
.right-chart {
  flex: 1;
  position: relative;
  width: 100%;
  height: 100%;
}

.left-chart {
  display: block;
}

.right-chart {
  display: none;
}
</style>
