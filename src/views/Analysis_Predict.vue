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

  </div>
</template>

<script>
import * as echarts from "echarts";
import $ from "jquery";
import {data2013, data2014, data2015, data2016, data2017, data2018} from "@/../data/2013.js"; // 根据你的项目结构修改路径
import {pcp_whole} from "@/./assets/js/SankeyMap.js"; // 根据你的项目结构修改路径

export default {
  components: {
  },
  data() {
    return {
      containerStyle: {
        backgroundColor: "rgba(0,0,0,0)",
        position: "absolute",
        top:"0%",
        left: "0%", // 调整 left 属性
        width:"95%",
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
  top:10%;
  width: 45%;
  height: 86.5%;
  left:3%
}

.tith2{
  display: inline-block;
  position: relative;
  width: 100%;
  top:2%;
  left:40%;
}
.pbox {
  position: relative;
  width: 10%;
  height: 0;
}

.lefttoday_bar ul {
  position: relative;
  width: 100%;
  height: 100%;
}
.box {
  overflow: hidden;
}
</style>