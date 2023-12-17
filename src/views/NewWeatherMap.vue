<template>
  <div class="app">
  <div class="total_chose_box" style="position: fixed;top:8%;left:10%;z-index: 99;">
    <span class="chose_tltle">请输入年份：</span>
    <input class="chose_text_in" id="hope_year" type="number" value=2013>
    <span class="chose_tltle">请输入月份：</span>
    <input class="chose_text_in" id="hope_month" type="number" value=1>
    <span class="chose_tltle">请输入日期：</span>
    <input class="chose_text_in" id="hope_day" type="number" value=1>
    <button class="chose_enter" id="selectDate">确定</button>
    <button class="chose_enter" id="btn1">前一天</button>
    <button class="chose_enter" id="btn2">后一天</button>
    <button class="chose_enter" id="btn6">WIND</button>
    <button class="chose_enter" id="btn3">TEMP</button>
    <button class="chose_enter" id="btn4">RH</button>
    <button class="chose_enter" id="btn5">PSFC</button>
  </div>
  <div class ="puleftboxtmidd1">
    <div class ="con left" style=" position:fixed ;top:5%;right: -1%; width: 800px; height:600px;">
      <div id="title1" class="title" style="position: absolute; top: 16%; left: 30%;  text-align: center; color: #fff;font-size: 24px;">
      </div>
      <div class="div_any_child" style="float: left; width: 96%; height: 140px;">
        <div id="map_chart01" style="width: 96%; height: 90%; "></div>
      </div>
      <div class="div_any_child" style="float: left; width: 96%; height: 1100px;">
        <div id="wind_echart_01" style="width: 94%; height: 65%"></div>
      </div>
    </div>
  </div>

  <div class="con left" style="width:800px;height:850px;position:fixed;top:13%;left:1%;background:url(/src/assets/image/aleftboxtbott.png);background-size: 100% 100%;background-position: center center">
    <div id="title2" class="title" style="position: absolute; top: 3%; left: 50%; transform: translateX(-50%); text-align: center; color: #fff;font-size: 24px;">
    </div>
    <div class="div_any">
      <div class="left div_any01" style="width: 95%;">
        <div class="div_any_child" style="top:87px;width: 100%;position:relative;height: 715px;">
          <div class="div_any_title"></div>
          <div id="wind" style="width: 97.5%;height: 750px;position: relative; left: 53%;top: 50%; transform: translate(-50%, -50%);"></div>
        </div>
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
import HeaderMenu from "@/components/NewHeaderMenu.vue"; // 此路径应根据你的项目结构来修改
import * as echarts from "echarts";
import $ from "jquery";
import 'echarts/extension/bmap/bmap';
import 'echarts-gl';
import {backendURL, headers, method, queryRoute} from "@/config/const.ts";

export default {
  components: {
    HeaderMenu
  },

  mounted() {
    function loadData(type) {
      let queryURL;
      if (type === 0) {
        queryURL = 'http://' + backendURL + queryRoute + "weather_map?"
            + 'year=' + year + '&month=' + month + '&day=' + day

      } else {
        queryURL = 'http://' + backendURL + queryRoute + "predict_AQI?"
            + 'month=' + '1'
      }
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
            localStorage.setItem("Information", JSON.stringify(data.data));

          })
          .catch(error => console.error('Error:', error));
    }
    function updateTitle() {
      document.getElementById('title1').textContent = '全国'+year + '年' + month + '月' + day + '日' + '静态风向图';
      document.getElementById('title2').textContent = '全国'+year + '年' + month + '月' + day + '日' + '其他因素图';
    }

    var code = 100000;
    var colors = ['#20bf6b', '#0fb9b1', '#f7b731', '#fa8231', '#eb3b5a', '#6F1E51', '#1e90ff', '#5352ed', '#3742fa', '#3c40c6'];
    var arr = ['PM2.5', 'PM10', 'SO2', 'NO2', 'CO', 'O3', 'U', 'V', 'TEMP', 'RH', 'PSFC'];
    var mCharts4 = echarts.init(document.getElementById('wind'), 'light');
    var city = '北京'
    var year = 2013;
    var sum = 0;
    var month = 1;
    var day = 1;
    var curtain = 0;
    var yearInput = $("#hope_year");
    var monthInput = $("#hope_month");
    var dayInput = $("#hope_day");

    function dataChange4() {
      loadData(0);
      var Datas = JSON.parse(localStorage.getItem("Information"));
      var data = [];
      var maxMag = 0;
      var minMag = Infinity;
      for (var i = 0; i < Datas.length; i++) {
        var u = Datas[i]['U'];//纬向风速
        var v = Datas[i]['V'];//经向风速
        var mag = Math.sqrt(u * u + v * v);
        var lat = Datas[i]['lat'];//纬度
        var lon = Datas[i]['lon'];//经度
        var itemArr = [lon, lat, v, u, mag]
        data.push(itemArr)
        maxMag = Math.max(mag, maxMag);
        minMag = Math.min(mag, minMag);
      }
      var trajectory = [];
      let series2 = [{
        type: 'flowGL',
        coordinateSystem: 'bmap',
        data: data,
        supersampling: 4,
        particleType: 'line',
        particleDensity: 90,
        particleSpeed: 5,
        itemStyle: {
          opacity: 0.9
        }
      },
      ];

      trajectory.forEach(function (element, index) {
        if (index < trajectory.length - 1) {
          let endNum = index + 1;
          series2.push({
            type: 'lines',
            coordinateSystem: 'bmap',  // 线连接，  只需要起点和终点坐标
            zlevel: 2,
            effect: {
              show: true,
              period: 6,
              trailLength: 0,
              symbol: 'image://./feiting.svg',
              symbolSize: 20
            },
            lineStyle: {
              normal: {
                color: 'red',
                width: 3,
                opacity: 0.99,
                curveness: 0
              }
            },
            data: [{
              coords: [[trajectory[index][0], trajectory[index][1]], [trajectory[endNum][0], trajectory[endNum][1]]]
            }],
          })
        }
      });
      mCharts4.setOption({

        visualMap: {
          left: 'right',
          min: minMag,
          max: maxMag,
          dimension: 4,
          inRange: {
            // color: ['green', 'yellow', 'red']
            color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026']
          },
          realtime: false,
          calculable: true,
          textStyle: {
            color: '#fff'
          }
        },
        bmap: {
          center: [105, 38],
          zoom: 5,
          roam: true,
          mapStyle: {
            styleJson: [
              {
                featureType: "water",
                elementType: "all",
                stylers: {
                  color: "#273c75"
                }
              },
              {
                featureType: "land",
                elementType: "all",
                stylers: {
                  color: "#353b48"
                }
              },
              {
                featureType: "railway",
                elementType: "all",
                stylers: {
                  visibility: "off"
                }
              },
              {
                featureType: "highway",
                elementType: "all",
                stylers: {
                  color: "#353b48"
                }
              },
              {
                featureType: "highway",
                elementType: "labels",
                stylers: {
                  visibility: "off"
                }
              },
              {
                featureType: "arterial",
                elementType: "geometry",
                stylers: {
                  color: "off"
                }
              },
              {
                featureType: "arterial",
                elementType: "geometry.fill",
                stylers: {
                  color: "off"
                }
              },
              {
                featureType: "poi",
                elementType: "all",
                stylers: {
                  visibility: "off"
                }
              },
              {
                featureType: "green",
                elementType: "all",
                stylers: {
                  visibility: "off"
                }
              },
              {
                featureType: "subway",
                elementType: "all",
                stylers: {
                  visibility: "off"
                }
              },
              {
                featureType: "manmade",
                elementType: "all",
                stylers: {
                  color: "#d1d1d1"
                }
              },
              {
                featureType: "local",
                elementType: "all",
                stylers: {
                  color: "#d1d1d1"
                }
              },
              {
                featureType: "arterial",
                elementType: "labels",
                stylers: {
                  visibility: "off"
                }
              },
              {
                featureType: "boundary",
                elementType: "all",
                stylers: {
                  color: "#fefefe"
                }
              },
              {
                featureType: "building",
                elementType: "all",
                stylers: {
                  color: "#d1d1d1"
                }
              },
              {
                featureType: "label",
                elementType: "labels.text.fill",
                stylers: {
                  color: "#999999"
                }
              }
            ]


          }
        },
        series: series2,
      });
      curtain = 4;
      updateTitle();
    }

    dataChange4()
    var item = 'WIND';

    function dataChange5() {
      var Datas = JSON.parse(localStorage.getItem("Information"));
      var minData = 100000;
      var maxData = -100000;
      var data = [];
      for (var i = 0; i < Datas.length; i++) {
        var lat = Datas[i]['lat'];//纬度
        var lon = Datas[i]['lon'];//经度
        if (item === 'TEMP') {
          var value = Datas[i]['TEMP'];
        }
        if (item === 'RH') {
          var value = Datas[i]['RH'];
        }
        if (item === 'PSFC') {
          var value = Datas[i]['PSFC'];
        }
        if (value > maxData) maxData = value;
        if (value < minData) minData = value;
        var itemArr = [lon, lat, value]
        data.push(itemArr)
      }
      mCharts4.setOption({

        animation: false,
        bmap: {
          center: [105, 38],
          zoom: 5,
          roam: true
        },
        visualMap: {
          show: false,
          top: 'top',
          min: minData,
          max: maxData,
          seriesIndex: 0,
          calculable: true,
          inRange: {
            color: ['blue', 'blue', 'green', 'yellow', 'red']
          }
        },
        series: [{
          type: 'heatmap',
          coordinateSystem: 'bmap',
          data: data,
          pointSize: 11,
          blurSize: 11
        }]
      });
      // 添加百度地图插件
      var bmap = mCharts4.getModel().getComponent('bmap').getBMap();
      bmap.addControl(new BMap.MapTypeControl());
      curtain = 5;
    }

    var MyMapCharts = echarts.init(document.querySelector('#map_chart01'), 'vintage')
    refresh_by_adcode_and_date_and_item('AQI')
    function wind_map() {
      setTimeout(get_wind_echart_show, 50)
    }
    wind_map()

    function refresh_by_adcode_and_date_and_item(air_item_name) {
      let geo_json_path = "/data/100000_full.json"
      let data_json_path = "/data/wind/wind_20130101.json"
      $.when($.getJSON(geo_json_path), $.getJSON(data_json_path)).then(function (ret, pmvalue) {
        let map_adcode = geo_json_path.slice(6, 12)
        let max_should_be = 300
        ret = ret[0]
        pmvalue = pmvalue[0]
        let maxmax = 0
        echarts.registerMap(map_adcode, ret)
        var airData = ret.features.map((k) => {
          if (k.properties.name === "")
            return {name: k.properties.name, value: 0}
          let v = pmvalue[k.properties.adcode][air_item_name] ? pmvalue[k.properties.adcode][air_item_name] : 0
          if (maxmax < v) {
            maxmax = v
          }
          return {name: k.properties.name, value: v, adcode: k.properties.adcode}
        })
      })
    }

    var wind_echart_01 = echarts.init(document.getElementById("wind_echart_01"), 'vintage');
    function get_wind_echart_show() {
      let wind_json_path;
      if (sum >= 0 && sum <= 8)
      {
        wind_json_path = "/data/wind/wind_2013010"+(sum+1).toString()+".json"
      }
      else
      {
        wind_json_path = "/data/wind/wind_20130110.json"
      }
      $.getJSON(wind_json_path, function (data) {
        var shuffle = function (array) {
          var currentIndex = array.length;
          var temporaryValue;
          var randomIndex;
          while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
          }
          return array;
        }
        var p = 0;
        var maxMag = 0;
        var minMag = Infinity;
        data.forEach((val, index) => {
          if (minMag > val[4]) {
            minMag = val[4]
          }
          if (maxMag < val[4]) {
            maxMag = val[4]
          }
        })
        shuffle(data)
        wind_echart_01.setOption(
            {

              visualMap: {
                left: 'center',
                min: minMag,
                max: maxMag,
                dimension: 4,
                inRange: {
                  // prettier-ignore
                  color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026']
                },
                calculable: true,
                textStyle: {
                  color: 'rgba(0,0,0,1)'
                },
                orient: 'horizontal'
              },
              geo: {
                map: '100000',
                left: 0,
                right: 0,
                top: 0,
                silent: true,
                roam: true,
                itemStyle: {
                  areaColor: '#323c48',
                  borderColor: 'rgba(0,0,0,1)'
                  //borderColor: '#111'
                }
              },
              series: {
                type: 'custom',
                coordinateSystem: 'geo',
                data: data,
                encode: {
                  x: 0,
                  y: 0
                },
                renderItem: function (params, api) {
                  const x = api.value(0);
                  const y = api.value(1);
                  const dx = api.value(2);
                  const dy = api.value(3);
                  const dxdy_number = 15.0
                  const start = api.coord([
                    Math.max(x - dx / dxdy_number, -180),
                    Math.max(y - dy / dxdy_number, -90)
                  ]);
                  const end = api.coord([
                    Math.min(x + dx / dxdy_number, 180),
                    Math.min(y + dy / dxdy_number, 90)
                  ]);
                  return {
                    type: 'line',
                    shape: {
                      x1: start[0],
                      y1: start[1],
                      x2: end[0],
                      y2: end[1]
                    },
                    style: {
                      lineWidth: 1,
                      stroke: api.visual('color')
                    }
                  };
                },
                progressive: 2000
              }
            }
        );
      });
      sum = (++sum) % 10;
    }

    $('#btn3').click(function () {//jqury对元素进行获取
      item = 'TEMP';
      dataChange5();
    })
    $('#btn4').click(function () {//jqury对元素进行获取
      item = 'RH';
      dataChange5();
    })
    $('#btn5').click(function () {//jqury对元素进行获取
      item = 'PSFC';
      dataChange5();
    })
    $('#btn6').click(function () {//jqury对元素进行获取
      item = 'WIND';
      dataChange4();
    })
    $('#btn2').click(function () {//jqury对元素进行获�?
      year = parseInt(year);
      month = parseInt(month);
      day = parseInt(day);
      var maxDays = new Date(year, month, 0).getDate();
      if (day < maxDays)
      {
        day++;
      }
      else
      {
        if (month !== 12)
        {
          month++;
        }
        else
        {
          year = (year !== 2018) ? (year + 1) : 2013;
          month = 1;
        }
        day = 1;
      }
      yearInput.val(year);
      monthInput.val(month);
      dayInput.val(day);
      if (item !== 'WIND') {
        dataChange5();
      } else {
        dataChange4();
      }
      wind_map()

    })
    $('#btn1').click(function () {//jqury对元素进行获�?
      year = parseInt(year);
      month = parseInt(month);
      day = parseInt(day);
      if (day !== 1)
      {
        day--;
      }
      else
      {
        if (month !== 1)
        {
          month--;
        }
        else
        {
          year = (year !== 2013) ? (year - 1) : 2018;
          month = 12;
        }
        day = new Date(year, month, 0).getDate();
      }
      yearInput.val(year);
      monthInput.val(month);
      dayInput.val(day);
      if (item !== 'WIND') {
        dataChange5();
      } else {
        dataChange4();
      }
      wind_map()
    })
    $('#selectDate').click(function () {//jqury对元素进行获�?
      var flag = 0;
      var y = yearInput.val();
      var m = monthInput.val();
      var d = dayInput.val();
      if (year !== y || month !== m || day !== d) {
        year = y;
        month = m;
        day = d;
        if (item !== 'WIND') {
          dataChange5();
        } else {
          dataChange4();
        }

      }
      yearInput.val(y);
      monthInput.val(m);
      dayInput.val(d);
      wind_map()
    })

  }
};

</script>

<style>
.chose_enter {background-color: #1795bb;
  border-radius: 12px;
  border: none;color: white;
  padding: 16px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 13px;
  margin: 4px 2px;
  -webkit-transition-duration: 0.4s;
  transition-duration: 0.4s;
  cursor: pointer;}
.chose_enter:hover {background-color: #fff;
  color: #1795bb;
  border: 1px solid #ccc;}
.chose_text_in {
  width: 100px;
  height: 40px;
  padding: 5px;
  border: 1px solid rgb(147, 160, 231);
  border-radius: 4px;
  font-size: 16px;
}
.chose_tltle{
  font-size:large;
  color: #fff;
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
.puleftboxtmidd1 {
  background: url(/src/assets/image/aleftboxtbott.png);
  position: fixed;
  background-size: 100% 100%;
  background-position: center center;
  top: 13%;
  width: 48%;
  height: 86%;
  right:2%
}

</style>
