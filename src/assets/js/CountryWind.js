
    var wind_echart_01 = echarts.init(document.getElementById("wind_echart_01"), theme_name);
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
                            color:'black'
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
                            borderColor: '#111'
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