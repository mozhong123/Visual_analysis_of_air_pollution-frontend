<template>
  <h1 class="title">SankeyMap</h1>
  <div class="container-fluid" :style="containerStyle">
    <div class="row" :style="rowStyle">
      <div id="pcpaddr" class="col-4">
        <div id="pcp_graph" class="row" :style="graphStyle"></div>
      </div>
    </div>
  </div>
  <div class="pollution-container">
    <div class="pollution-content" id="prov">Prov:</div>
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
  <div>
    <HeaderMenu></HeaderMenu>
    <BackGround></BackGround>
    <!-- 其他页面内容 -->
  </div>
</template>

<script>
import * as echarts from "echarts";
import $ from "jquery";
import {data2013, data2014, data2015, data2016, data2017, data2018} from "@/../data/2013.js"; // 根据你的项目结构修改路径
import {pcp_whole} from "@/./assets/js/SankeyMap.js"; // 根据你的项目结构修改路径
import HeaderMenu from "@/components/HeaderMenu.vue"; // 此路径应根据你的项目结构来修改
import BackGround from "@/components/BackGround.vue"; // 此路径应根据你的项目结构来修改

export default {
  components: {
    BackGround,
    HeaderMenu
  },
  data() {
    return {
      containerStyle: {
        backgroundColor: "rgba(0,0,0,0)",
        height: "calc(50vh)", // 根据需要调整额外的边距
        width: "800px",
      },
      rowStyle: {
        height: "200px",
      },
      graphStyle: {
        backgroundColor: "rgba(0,0,0,0)",
        border: "solid",
        borderColor: "rgba(0,0,0,0)",
        transform: "rotate(0deg)",
        height: "720px",
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
    const line_list = ["Prov", "Year", "AQI", "PM10", "PM2.5", "SO2", "NO2", "CO", "O3", "Temp", "Wind Speed", "Level"];
    $(document).ready(function () {
      var wholedata = [data2013, data2014, data2015, data2016, data2017, data2018];
      var yeartext = ["2013", "2014", "2015", "2016", "2017", "2018"];
      let pcpchart = echarts.init(document.getElementById("pcp_graph"));
      pcpchart.setOption(pcp_whole(wholedata, match_list, wholename_list, 'whole'), true);
      pcpchart.on('mouseover', function (params) {
        if (params.componentType === 'series' && params.seriesType === 'parallel') {
          console.log('点击的线的数据:', params.data);
          const contents = document.querySelectorAll('.pollution-content');
          let i = 0;
          contents.forEach(content => {
            content.innerText = (' ' + line_list[i] + ': ' + params.data[i++]);
          })
        }
      });
    });
  }
};
</script>

<style>
.pollution-content {
  position: fixed;
  width: 25%;
  border: 2px solid #c4c7ce; /* 分隔线 */
  padding-left: 5px;
  top: 19%;
  left: 60%;
  height: 5%;
  border-radius: 10px 10px 10px 10px; /* 10px 圆角，底部为直角 */
}

#prov {
  top: 19%;
}

#year {
  top: 24%;
}

#AQI {
  top: 29%;
}

#PM10 {
  top: 34%;
}

#PM25 {
  top: 39%;
}

#SO2 {
  top: 44%;
}

#NO2 {
  top: 49%;
}

#CO {
  top: 54%;
}

#O3 {
  top: 59%;
}

#Temp {
  top: 64%;
}

#Wind {
  top: 69%;
}

#Level {
  top: 74%;
  height: 10%;
}

</style>