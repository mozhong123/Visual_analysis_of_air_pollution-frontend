function pcp_whole(wholelist, match_list, wholename_list, prov) {
    const yearlist = ['2013', '2014', '2015', '2016', '2017', '2018'];
    var data_list = [];
    for (var i = 0; i < wholelist.length; i++) {
        var yeardata = wholelist[i];

        for (var k = 0; k < wholename_list.length; k++) {

            var cityvalue = yeardata.filter(function (event) {
                return event.province === wholename_list[k]
            });

            var small_list = [];
            const province = match_list[k];
            const year = yearlist[i];

            var count_aqi = 0;
            var count_pm10 = 0;
            var count_pm25 = 0;
            var count_so2 = 0;
            var count_no2 = 0;
            var count_co = 0;
            var count_o3 = 0;
            var count_temp = 0;
            var count_velo = 0;

            for (var j = 0; j < cityvalue.length; j++) {
                count_aqi = count_aqi + cityvalue[j]['AQI'];
                count_pm10 = count_pm10 + cityvalue[j]['PM10(微克每立方米)'];
                count_pm25 = count_pm25 + cityvalue[j]['PM2.5(微克每立方米)'];
                count_so2 = count_so2 + cityvalue[j]['SO2(微克每立方米)'];
                count_no2 = count_no2 + cityvalue[j]['NO2(微克每立方米)'];
                count_co = count_co + cityvalue[j]['CO(毫克每立方米)'];
                count_o3 = count_o3 + cityvalue[j]['O3(微克每立方米)'];
                count_temp = count_temp + (cityvalue[j]['TEMP(K)'] - 273.15);
                var velo = Math.sqrt(Math.pow(cityvalue[j]['U(m/s)'], 2) + Math.pow(cityvalue[j]['V(m/s)'], 2))
                count_velo = count_velo + velo;
            }

            if (count_aqi / 12 <= 50) {
                var level = '优秀';
            } else if (count_aqi / 12 <= 100) {
                var level = '良好';
            } else if (count_aqi / 12 <= 150) {
                var level = '轻度污染';
            } else if (count_aqi / 12 <= 200) {
                var level = '中度污染';
            } else if (count_aqi / 12 <= 300) {
                var level = '重度污染';
            } else {
                var level = '严重污染';
            }

            small_list.push(province);
            small_list.push(year);
            small_list.push(count_aqi / 12);
            small_list.push(count_pm10 / 12);
            small_list.push(count_pm25 / 12);
            small_list.push(count_so2 / 12);
            small_list.push(count_no2 / 12);
            small_list.push(count_co / 12);
            small_list.push(count_o3 / 12);
            small_list.push(count_temp / 12);
            small_list.push(count_velo / 12);
            small_list.push(level);
            data_list.push(small_list);
        }

    }

    const axislab = {
        show: true,
        interval: "auto",
        inside: true,
        color: 'rgba(0,0,0,1)',
        rotate: 0,
        fontWeight: 'normal'
    }

    var mytextStyle = {
        color: 'rgba(0,0,0,1)',
        fontStyle: "normal",
        fontWeight: 'normal',
        fontFamily: "Times New Roman",
        fontSize: 12,
    };

    if (prov === 'whole') {
        var provlist = match_list;
    } else {
        var provlist = [];
        for (var i = 0; i < match_list.length; i++) {
            if (match_list[i] == prov) {
                var change = {value: prov, textStyle: {color: 'white'}};
                provlist.push(change);
            } else {
                provlist.push(match_list[i]);
            }
        }
    }


    var pcp_gene = {
        parallel: [{width: 500, layout: "vertical"}],

        parallelAxis: [
            {
                dim: 0,
                areaSelectStyle: {
                    borderWidth: 1,
                    borderColor: 'rgba(160,197,232)',
                    color: 'rgba(160,197,232)',
                    opacity: 0.4,
                },

                name: '省份',
                type: 'category',
                nameLocation: "start",
                nameRotate: 0,

                //inverse:true,
                nameTextStyle: mytextStyle,
                axisLabel: {
                    show: true,
                    interval: "auto",
                    inside: true,
                    color: 'rgba(0,0,0,1)',
                    fontWeight: 'normal',
                    fontSize: 10,
                    rotate: 90,
                },

                axisTick: {
                    show: true,
                    alignWithLabel: false,
                    inside: true
                },
                data: provlist
            },
            {
                dim: 1,
                name: '年份',
                type: 'category',
                nameRotate: 0,
                nameLocation: "start",
                nameTextStyle: mytextStyle,
                axisLabel: axislab,
                data: yearlist
            },
            {dim: 2, name: 'AQI', nameRotate: 0, nameLocation: "start", nameTextStyle: mytextStyle, axisLabel: axislab},
            {
                dim: 3,
                name: 'PM10\n(μg/m³)',
                nameRotate: 0,
                nameLocation: "start",
                nameTextStyle: mytextStyle,
                axisLabel: axislab
            },
            {
                dim: 4,
                name: 'PM2.5\n(μg/m³)',
                nameRotate: 0,
                nameLocation: "start",
                nameTextStyle: mytextStyle,
                axisLabel: axislab
            },
            {
                dim: 5,
                name: 'SO2\n(μg/m³)',
                nameRotate: 0,
                nameLocation: "start",
                nameTextStyle: mytextStyle,
                axisLabel: axislab
            },
            {
                dim: 6,
                name: 'NO2\n(μg/m³)',
                nameRotate: 0,
                nameLocation: "start",
                nameTextStyle: mytextStyle,
                axisLabel: axislab
            },
            {
                dim: 7,
                name: 'CO\n(μg/m³)',
                nameRotate: 0,
                nameLocation: "start",
                nameTextStyle: mytextStyle,
                axisLabel: axislab
            },
            {
                dim: 8,
                name: 'O3\n(mg/m³)',
                nameRotate: 0,
                nameLocation: "start",
                nameTextStyle: mytextStyle,
                axisLabel: axislab
            },
            {
                dim: 9,
                name: 'Temp\n(°C)',
                nameRotate: 0,
                nameLocation: "start",
                nameTextStyle: mytextStyle,
                axisLabel: axislab
            },
            {
                dim: 10,
                name: '风力强度',
                nameRotate: 0,
                nameLocation: "start",
                nameTextStyle: mytextStyle,
                axisLabel: axislab
            },
            {
                dim: 11,
                name: '质量等级',
                type: 'category',
                nameRotate: 0,
                nameLocation: "start",
                nameTextStyle: mytextStyle,
                axisLabel: {
                    show: true,
                    interval: 0,
                    inside: true,
                    color: 'rgba(0,0,0,1)',
                    fontWeight: 'normal',
                    fontSize: 12,
                    rotate: 0,
                },
                data: ['优秀', '良好', '轻度污染', '中度污染', '重度污染', '严重污染']
            }
        ],
        visualMap: {
            show: true,
            left: '0%',
            min: 0,
            max: 300,
            dimension: 2,
            inRange: {
                color:  ['#f53535', '#ffd403', '#009810'].reverse()

                // colorAlpha: [0, 1]
            }
        },
        series: {
            type: 'parallel',
            lineStyle: {
                width: 2
            },
            data: data_list,

        }
    };
    return pcp_gene;
}


export {pcp_whole};