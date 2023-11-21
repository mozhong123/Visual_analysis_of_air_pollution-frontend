<template>
    <div class = "con" style="display: flex;">
    <div class="con left" style="width:250px;position:relative;top:80px;background-color: rgba(0,0,0,0);flex: 1;">
        <!--统计分析�?-->
        <div class="div_any">
            <div class="left div_any01" style="width:250px;">
                <div class="div_any_child" style="width:248px;position:relative;height: 1150px;background-color: rgba(0,0,0,0);">
                    <div class="div_any_title">日历图对比</div>
                    <div id="calander" style="width:248px;position:relative;left:2px;height: 1050px;top:50px;background-color: rgba(0,0,0,0);"></div>
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
  import $ from "jquery";
  import {data2013,data2014,data2015,data2016,data2017,data2018} from "@/../data/2013.js"; // 根据你的项目结构修改路径
  import {pcp_whole} from "@/./assets/js/SankeyMap.js"; // 根据你的项目结构修改路径
  import HeaderMenu from "@/components/HeaderMenu.vue"; // 此路径应根据你的项目结构来修改
  import BackGround from "@/components/BackGround.vue"; // 此路径应根据你的项目结构来修改
  
  export default {
    components:{
      BackGround,
      HeaderMenu
    },
    mounted() {
        var mCharts = echarts.init(document.getElementById('line'), );
    var mCharts2 = echarts.init(document.getElementById('calander'), 'dark')
    var option;
    var option2;
    var url = '../data/predict/2018predict.json';
    function dataChange(url) {
        var data1 = [];
        var data2 = [];
        $.get(url, function (ret) {
            var day = 1;
            var hour = 0;
            for (var i = 0; i < 742; i++) {
                // 
                hour++;
                if (hour > 24) {
                    hour = 1;
                    day++;
                }
                var time = '1月' + day + '日' + hour + '时';
                var temp1 = [time, ret["predict"][i]];
                var temp2 = [time, ret["reality"][i]];
                data1.push(temp1)
                data2.push(temp2)
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
                        // name: city + pollution,
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
        });

        option && mCharts.setOption(option);
        setTimeout(function () {
                window.onresize = function () {
                    mCharts.resize();
                    mCharts2.resize();
                }
            }, 200)
    }
    dataChange(url);
    function dataChange2() {

        var url2 = '../data/predict/' + 2013 + 'predict.json';
        // var date = +echarts.number.parseDate(year + '-01-01');
        // var end = +echarts.number.parseDate((+year) + '-01-31');
        // var dayTime = 3600 * 24 * 1000;
        // var time = date;
        // time += dayTime
        // var data=Object.create(Array.prototype)
        $.get(url2, function (ret) {
            console.log(ret)
            function getVirtulData(year, flag) {
                year = year || '2017';
                var date = +echarts.number.parseDate(year + '-01-01');
                var end = +echarts.number.parseDate((+year) + '-02-01');
                var dayTime = 3600 * 24 * 1000;
                var data = [];
                var i = 0;
                if (year == 2013) {
                    for (var time = date; time < end; time += dayTime) {
                        var sum = 0;
                        for (var j = 0; j < 24; j++) {
                            sum += ret["reality"][i];
                            i++;
                        }
                        sum /= 24;
                        console.log(sum)
                        data.push([
                            echarts.format.formatTime('yyyy-MM-dd', time),
                            Math.floor(sum)
                        ]);
                    }
                    return data;
                }
                if (year == 2014) {
                    for (var time = date; time < end; time += dayTime) {
                        var sum = 0;
                        for (var j = 0; j < 24; j++) {
                            sum += ret["reality2"][i];
                            i++;
                        }
                        sum /= 24;
                        console.log(sum)
                        data.push([
                            echarts.format.formatTime('yyyy-MM-dd', time),
                            Math.floor(sum)
                        ]);
                    }
                    return data;
                }
                if (year == 2015) {
                    for (var time = date; time < end; time += dayTime) {
                        var sum = 0;
                        for (var j = 0; j < 24; j++) {
                            sum += ret["reality3"][i];
                            i++;
                        }
                        sum /= 24;
                        console.log(sum)
                        data.push([
                            echarts.format.formatTime('yyyy-MM-dd', time),
                            Math.floor(sum)
                        ]);
                    }
                    return data;
                }
                if (year == 2016) {
                    for (var time = date; time < end; time += dayTime) {
                        var sum = 0;
                        for (var j = 0; j < 24; j++) {
                            sum += ret["reality4"][i];
                            i++;
                        }
                        sum /= 24;
                        console.log(sum)
                        data.push([
                            echarts.format.formatTime('yyyy-MM-dd', time),
                            Math.floor(sum)
                        ]);
                    }
                    return data;
                }
                if (year == 2017) {
                    for (var time = date; time < end; time += dayTime) {
                        var sum = 0;
                        for (var j = 0; j < 24; j++) {
                            sum += ret["reality5"][i];
                            i++;
                        }
                        sum /= 24;
                        console.log(sum)
                        data.push([
                            echarts.format.formatTime('yyyy-MM-dd', time),
                            Math.floor(sum)
                        ]);
                    }
                    return data;
                }
                if (year == 2018 && flag == 0) {
                    for (var time = date; time < end; time += dayTime) {
                        var sum = 0;
                        for (var j = 0; j < 24; j++) {
                            sum += ret["reality6"][i];
                            i++;
                        }
                        sum /= 24;
                        console.log(sum)
                        data.push([
                            echarts.format.formatTime('yyyy-MM-dd', time),
                            Math.floor(sum)
                        ]);
                    }
                    return data;
                }
                if (year == 2018 && flag == 1) {
                    for (var time = date; time < end; time += dayTime) {
                        var sum = 0;
                        for (var j = 0; j < 24; j++) {
                            sum += ret["predict"][i];
                            i++;
                        }
                        sum /= 24;
                        console.log(sum)
                        data.push([
                            echarts.format.formatTime('yyyy-MM-dd', time),
                            Math.floor(sum)
                        ]);
                    }
                    return data;
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
                            console.log(param)
                            return param.end;
                        }
                    },
                    top: 920,
                    orient: 'vertical',
                    range: ['2018-01-01', '2018-01-31']
                },
                // {
                //     yearLabel: {
                //         formatter: function (param) {
                //             console.log(param)
                //             return param.end+' Predict';
                //         }
                //     },
                //     top: 920,
                //     left: 300,
                //     orient: 'vertical',
                //     range: ['2018-01-01', '2018-01-31']
                // },
                ],

                series: [{
                    type: 'heatmap',
                    coordinateSystem: 'calendar',
                    calendarIndex: 0,
                    data: getVirtulData(2013, 0)
                }, {
                    type: 'heatmap',
                    coordinateSystem: 'calendar',
                    calendarIndex: 1,
                    data: getVirtulData(2014, 0)
                }, {
                    type: 'heatmap',
                    coordinateSystem: 'calendar',
                    calendarIndex: 2,
                    data: getVirtulData(2015, 0)
                }, {
                    type: 'heatmap',
                    coordinateSystem: 'calendar',
                    calendarIndex: 3,
                    data: getVirtulData(2016, 0)
                }, {
                    type: 'heatmap',
                    coordinateSystem: 'calendar',
                    calendarIndex: 4,
                    data: getVirtulData(2017, 0)
                }, {
                    type: 'heatmap',
                    coordinateSystem: 'calendar',
                    calendarIndex: 5,
                    data: getVirtulData(2018, 0)
                },
                // {
                //     type: 'heatmap',
                //     coordinateSystem: 'calendar',
                //     calendarIndex: 6,
                //     data: getVirtulData(2018, 1)
                // },
                ]
            };

            option2 && mCharts2.setOption(option2);

        })

    }
    dataChange2()
    }
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
  </style>