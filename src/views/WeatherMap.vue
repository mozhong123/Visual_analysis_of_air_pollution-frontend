<template>
  <div style="position: fixed;z-index:99; border: 1px solid rgba(0,0,0,0);width: 1500px;height: 25px;padding: 25px;margin-top: 5px;background-color: rgba(0,0,0,0)">
    <input id="input_adcode" type="number" value="100000">
    <input id="hope_year" type="number" value="2013">
    <button onclick="javascript:day_control(-1,0,0)">上一年</button>
    <button onclick="javascript:day_control(1,0,0)">下一年</button>
    <input id="hope_month" type="number" value="1">
    <button onclick="javascript:day_control(0,-1,0)">上一月</button>
    <button onclick="javascript:day_control(0,1,0)">下一月</button>
    <input id="hope_day" type="number" value="1">
    <button onclick="javascript:day_control(0,0,-1)">上一天</button>
    <button onclick="javascript:day_control(0,0,1)">下一天</button>
    <button onclick="javascript:input_refresh()">按照输入的数据刷新地图</button>
</div>
<div style="float: right;position: relative; width: 750px; height: 845px;margin-top: 55px;background-color: rgba(0,0,0,0)">
    <div style="float: left; width: 750px; height: 100px;">
        <h2 class="hidden-h2"><span id="current_project_name"></span><span
                id="current_day"></span></h2>
        <div id="map_chart01" style="width: 750px; height: 100%"></div>
    </div>
    <div style="float: left; width: 750px; height: 1200px;">
        <div id="wind_echart_01" style="width: 750px; height: 100%"></div>
    </div>
</div>
<div class="total_chose_box" style="width:1500px;margin-top: 60px;position: relative;background-color: rgba(0,0,0,0)">
    <button class="chose_enter" id="btn8">TEMP</button>
</div>
<div class="con left" style="width:750px;position:relative;background-color: rgba(0,0,0,0)">
    <div class="div_any">
        <div class="left div_any01" style="width:750px;">
            <div class="div_any_child" style="width:748px;position:relative;height: 1000px;">
                <div class="div_any_title"></div>
                <div id="wind" style="width:748px;position:relative;left:2px;height: 950px;top:50px"></div>
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
    var colors = ['#20bf6b', '#0fb9b1', '#f7b731', '#fa8231', '#eb3b5a', '#6F1E51', '#1e90ff', '#5352ed', '#3742fa', '#3c40c6'];
    var arr = ['PM2.5', 'PM10', 'SO2', 'NO2', 'CO', 'O3', 'U', 'V', 'TEMP', 'RH', 'PSFC'];
    var mCharts4 = echarts.init(document.getElementById('wind'), 'light');
    console.log(mCharts4)
    var city = '北京'
    var year = 2013;
    var month = 1;
    var day = 1;
    var curtain = 0;
    var url4 = '/data/1.json';

    function dataChange4(url) {
        var data = [];
        var maxMag = 0;
        var minMag = Infinity;
        $.get(url, function (ret) {
            //    console.log(ret.data)
            var obj = ret.data;
            // var count = 0;
            for (var i = 0; i < obj.length; i++) {
                var u = obj[i][0];//纬向风速
                var v = obj[i][1];//经向风速
                var mag = Math.sqrt(u * u + v * v);
                //     //   console.log(mag);
                var lat = obj[i][2];//纬度
                var lon = obj[i][3];//经度
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
                // {
                //     type: 'scatter',
                //     coordinateSystem: 'bmap',
                //     symbol: 'image://./feiting.svg',
                //     symbolOffset: [0, 0],
                //     symbolSize: 20,
                //     symbolRotate: 45,
                //     hoverAnimation: true,
                //     data: trajectory,
                // }
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
                    });
                    //console.log([ [trajectory[index][0], trajectory[index][1]],[trajectory[endNum][0],trajectory[endNum][1]]])
                }
            });
            mCharts4.setOption({
                title: {
                    show: true,
                    text: '全国' + year + '年' + month + '月' + day + '日风向图',
                    left: 'center',
                    textStyle: {
                        color: '#fff'
                    }
                },
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
        });
        curtain = 4;
    }

    dataChange4(url4)

    var item = '';

    function dataChange5(url) {
        var points = [];
        var minData = 100000;
        var maxData = -100000;
        $.get(url, function (data) {
            //  console.log(data)
            var obj = data.data;
            for (var i = 0; i < obj.length; i++) {
                // console.log(i)
                var lat = obj[i][2];//纬度
                var lon = obj[i][3];//经度
                //   var value = parseFloat(data[i]["TEMP(K)"]);
                if (item == 'TEMP') {
                    var value = obj[i][4];
                }
                if (item == 'RH') {
                    var value = obj[i][5];
                }
                if (item == 'PSFC') {
                    var value = obj[i][6];
                }
                if (value > maxData) maxData = value;
                if (value < minData) minData = value;
                var itemArr = [lon, lat, value]
                points.push(itemArr)
            }
            mCharts4.setOption(option = {
                title: {
                    show: true,
                    text: '全国' + year + '年' + month + '月' + day + '日' + item,
                    left: 'center',
                    textStyle: {
                        color: '#fff'
                    }
                },
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
                    data: points,
                    pointSize: 11,
                    blurSize: 11
                }]
            });
            // 添加百度地图插件
            var bmap = mCharts4.getModel().getComponent('bmap').getBMap();
            bmap.addControl(new BMap.MapTypeControl());
        });
        curtain = 5;
    }

    $('#btn8').click(function () {//jqury对元素进行获取
        item = 'TEMP';
        dataChange5(url4);
    })


    let theme_name = 'vintage'

    var MyMapCharts = echarts.init(document.querySelector('#map_chart01'), theme_name)

    window.onload = function () {
        document.getElementById("current_project_name").innerText = current_project_name
        refresh_by_adcode_and_date_and_item(100000, 2013, 1, 1, current_project_name)
        setTimeout(input_refresh, 3000)
        MyMapCharts.on("click", async (args) => {
            const adcode = args.data.adcode
            document.querySelector("#input_adcode").value = adcode
            input_refresh()
        })

        MyMapCharts.getZr().on("dblclick", async (args) => {
            if (args.target == undefined) {
                const adcode = document.querySelector("#input_adcode").value
                if (adcode_info[adcode].parent !== null) {
                    document.querySelector("#input_adcode").value = adcode_info[adcode].parent
                    input_refresh()
                }
            }
        })
    }

    function day_control(y, m, d) {
        let year = parseInt(document.querySelector("#hope_year").value) + y
        let month = parseInt(document.querySelector("#hope_month").value) + m
        let day = parseInt(document.querySelector("#hope_day").value) + d
        if (([1, 3, 5, 7, 8, 10, 12].indexOf(month) != -1 && day >= 32)
            || ([4, 6, 9, 11].indexOf(month) != -1 && day >= 31)
            || ([2].indexOf(month) != -1 && year % 4 != 0 && day >= 29)
            || ([2].indexOf(month) != -1 && year % 4 == 0 && day >= 30)) {
            month++
            day = 1
        }
        if (month == 13) {
            month = 1
            year++
        }
        if (month == 0) {
            month = 12
            year--
        }
        document.querySelector("#hope_year").value = year
        document.querySelector("#hope_month").value = month
        document.querySelector("#hope_day").value = day

        input_refresh()
    }


    function input_refresh() {
        const input_adcode = document.querySelector("#input_adcode").value
        let year = document.querySelector("#hope_year").value
        let month = document.querySelector("#hope_month").value
        let day = document.querySelector("#hope_day").value
        document.querySelector("#current_day").innerText = ' ' + year + '-' + ('0' + month).slice(-2) + '-' + ('0' + day).slice(-2)
        refresh_by_adcode_and_date_and_item(input_adcode, year, month, day, current_project_name)
        get_wind_echart_show(year, month, day)

    }


    function refresh_by_adcode_and_date_and_item(adcode, year, month, day, air_item_name) {
        let geo_json_path
        if (adcode_info[adcode].childrenNum > 0) {
            geo_json_path = "/data/100000_full.json"
        } else {
            geo_json_path = "/data/100000.json"
        }
        month = ("0" + month).slice(-2)
        day = ("0" + day).slice(-2)
        const data_json_path = "/data/wind_20130101.json"
        refresh(geo_json_path, data_json_path, air_item_name)
    }


    function refresh(geo_json_path, data_json_path, air_item_name) {
        $.when($.getJSON(geo_json_path), $.getJSON(data_json_path)).then(function (ret, pmvalue) {
            let map_adcode = geo_json_path.slice(6, 12)
            let max_should_be = 300
            if (air_item_name == 'PM10') {
                max_should_be = 350
            } else if (air_item_name == 'PM2.5') {
                max_should_be = 150
            } else if (air_item_name == 'SO2') {
                max_should_be = 800
            } else if (air_item_name == 'NO2') {
                max_should_be = 280
            } else if (air_item_name == 'O3') {
                max_should_be = 400
            } else if (air_item_name == 'CO') {
                max_should_be = 24
            } else if (air_item_name == 'AQI') {
                max_should_be = 200
            }
            ret = ret[0]
            pmvalue = pmvalue[0]
            let maxmax = 0
            echarts.registerMap(map_adcode, ret)
            var airData = ret.features.map((k) => {
                if (k.properties.name == "")
                    return {name: k.properties.name, value: 0}
                let v = pmvalue[k.properties.adcode][air_item_name] ? pmvalue[k.properties.adcode][air_item_name] : 0
                if (maxmax < v) {
                    maxmax = v
                }
                return {name: k.properties.name, value: v, adcode: k.properties.adcode}
            })

            geo_center = adcode_info[parseInt(geo_json_path.slice(6, 12))].centroid


        })
    }
    var wind_echart_01 = echarts.init(document.getElementById("wind_echart_01"), 'vintage');
    function get_wind_echart_show(year, month, day) {
        let year_month_day = year + ('0' + month).slice(-2) + ('0' + day).slice(-2)
        let wind_json_path = '/data/wind_20130101.json'
        $.getJSON(wind_json_path, function (data) {
            var shuffle = function (array) {
                var currentIndex = array.length;
                var temporaryValue;
                var randomIndex;
                // While there remain elements to shuffle...
                while (0 !== currentIndex) {
                    // Pick a remaining element...
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
                    title: {
                        text: "全国风向图 " + year + '-' + ('0' + month).slice(-2) + '-' + ('0' + day).slice(-2),
                        left: 'center',
                        top: 0,
                        textStyle: {
                            color: 'black'
                        }
                    },
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
                            color:'rgba(0,0,0,1)'
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
    }
  }
};
</script>

<style>
</style>
