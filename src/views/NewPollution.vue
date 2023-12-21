<template>
  <!--顶部-->
  <!--注意！背景依赖src/assets/html/newPollutionHtml.html-->
  <div class="app">
    <div class="background-container1">
      <iframe
          class="background-iframe1"
          src="/src/assets/html/newPollutionHtml.html"
          ref="iframeDom"
      ></iframe>
      <!-- Your main content goes here -->
    </div>
    <div class="message-block">
      <div class="message-background"></div>
      <div class="message-content">tmp-message</div>
    </div>
    <div class='left-chart'>
      <div class="left-top">
        <div class="city-rank">
          <ol class="rank-list">
            <li class="rank-record-typeA" id="rank-record-1"></li>
            <li class="rank-record-typeB" id="rank-record-2"></li>
            <li class="rank-record-typeA" id="rank-record-3"></li>
            <li class="rank-record-typeB" id="rank-record-4"></li>
            <li class="rank-record-typeA" id="rank-record-5"></li>
            <li class="rank-record-typeB" id="rank-record-6"></li>
            <li class="rank-record-typeA" id="rank-record-7"></li>
            <li class="rank-record-typeB" id="rank-record-8"></li>
            <li class="rank-record-typeA" id="rank-record-9"></li>
            <li class="rank-record-typeB" id="rank-record-10"></li>
          </ol>
        </div>
      </div>
      <div class="leftBottom">
        <div class="chart-child-03" id="radar"
             style="width: 100%;position: absolute;left: 0;height: 100%;top: 0; ">
        </div>
      </div>
    </div>
    <div class="main-chart-title">污染物城市定位图</div>
    <div class="pollution-chart-container">
      <div class="chart-options">
        <div class="total_chose_box">
          <div class="box-left">
            <span class="chose_tltle">请输入年份：</span>
            <input class="chose_text_in" id="selectDate1" value=2013>
            <span class="chose_tltle">请输入月份：</span>
            <input class="chose_text_in" id="selectDate2" value=1>
            <span class="chose_tltle">请输入日期：</span>
            <input class="chose_text_in" id="selectDate3" value=1>
            <button class="chose_enter_left" id="selectDate">确定</button>
            <button class="chose_enter_left" id="dayPrev">前一天</button>
            <button class="chose_enter_left" id="dayNext">后一天</button>
            <button class="chose_enter_left" id="addEvent">添加事件</button>
            <button class="chose_enter_left" id="addEventViaFile">从文件中添加事件</button>
          </div>
          <div class="box-right">
            <button class="chose_enter_right" id="btnAQI">AQI</button>
            <button class="chose_enter_right" id="btn1">PM2.5</button>
            <button class="chose_enter_right" id="btn2">PM10</button>
            <button class="chose_enter_right" id="btn3">SO2</button>
            <button class="chose_enter_right" id="btn4">NO2</button>
            <button class="chose_enter_right" id="btn5">CO</button>
            <button class="chose_enter_right" id="btn6">O3</button>
          </div>
        </div>
      </div>

      <!--内容部分-->
      <!-- Content Part -->
      <div class="con">
        <!-- Chart 1 -->
        <div class="main-chart">
          <div class="chart-child-01" id="main"
               style="width: 100%;position: absolute;left: 0;height: 100%;top: 0; ">
          </div>
          <div class="dayChoseMode">MODE: NORMAL</div>
          <div class="playBar">
            <button class="play" id="playMain">play</button>
            <button class="stop" id="stopMain">stop</button>
            <div class="progress-bar">
              <div class="progress-bar-content"></div>
            </div>
          </div>
        </div>

        <!-- Chart 2 -->
      </div>
    </div>
    <div class="right-container">
      <div class="pollution-city-details">
        <div class="pollution-details" id="p-city">
          <div id="value">北京市</div>
        </div>
        <div class="pollution-details" id="p-date">
          <div id="value">日期: 2013-01-01</div>
        </div>
        <div class="pollution-details" id="p-AQI">
          <div id="value">AQI: 29.70</div>
        </div>
        <div class="pollution-details" id="p-AQIS">
          <div id="value">AQI State: 优秀</div>
        </div>
        <div class="pollution-details" id="p-PM25">
          <div id="value">PM2.5: 17.53</div>
        </div>
        <div class="pollution-details" id="p-PM10">
          <div id="value">PM10: 19.38</div>
        </div>
        <div class="pollution-details" id="p-SO2">
          <div id="value">SO2: 6.62</div>
        </div>
        <div class="pollution-ditails" id="p-NO2">
          <div id="value">NO2: 2.77</div>
        </div>
        <div class="pollution-ditails" id="p-CO">
          <div id="value">CO: 0.28</div>
        </div>
        <div class="pollution-ditails" id="p-O3">
          <div id="value">O3: 59.40</div>
        </div>
      </div>
      <div class="cityEvent">
        <input type="file" id="eventInput">
        <div class="event-details" id="e-city">
          <!--<div id="value">Kivotos</div>-->
          <div id="value">---</div>
        </div>
        <div class="event-details" id="e-date">
          <div id="value">****-**-**</div>
        </div>
        <div class="cityEventTitle">S.C.H.A.L.E Event</div>
        <div class="cityEventContent" id="eventContent1">Kivotos is peaceful now</div>
        <div class="cityEventContent" id="eventContent2">Independent Federal Investigation Club</div>
        <div class="cityEventContent" id="eventContent3">FROM: S.C.H.A.L.E</div>
        <div class="cityEventContent" id="eventContent4">Independent Federal Investigation Club</div>
        <textarea class="addEventContent" id="inputEvent"></textarea>
        <div class="eventDateRange">
          <span class="chose_title_event_from">from:</span>
          <input class="chose_text_in_event_from" id="eventYearFrom" value=2013>
          <input class="chose_text_in_event_from" id="eventMonthFrom" value=1>
          <input class="chose_text_in_event_from" id="eventDayFrom" value=1>
          <span class="chose_title_event_to">to:</span>
          <input class="chose_text_in_event_to" id="eventYearTo" value=2013>
          <input class="chose_text_in_event_to" id="eventMonthTo" value=1>
          <input class="chose_text_in_event_to" id="eventDayTo" value=1>
        </div>

        <button class="submitEventButton">提交</button>
        <button class="cancelEventButton">取消</button>
      </div>
      <div class="lineChart">
        <div class="chart-child-02" id="line"
             style="width: 100%;position: relative;left: 0;height: 100%;top: 0;">
        </div>
      </div>
    </div>
    <div>
      <HeaderMenu></HeaderMenu>
      <NaiveButton></NaiveButton>
    </div>
  </div>
</template>

<script>
import HeaderMenu from "@/components/NewHeaderMenu.vue"; // 此路径应根据你的项目结构来修改
import NaiveButton from "@/components/NaiveIcon.vue";
import * as echarts from "echarts";
import $ from "jquery";
import 'echarts/extension/bmap/bmap';
import 'echarts-gl';
import {backendURL, queryRoute, method, headers} from "@/config/const.ts";


export default {
  components: {
    HeaderMenu,
    NaiveButton,
  },
  created() {
  },
  mounted() {
    const colors = ['#20bf6b', '#0fb9b1', '#f7b731', '#fa8231', '#eb3b5a', '#6F1E51', '#1e90ff', '#5352ed', '#3742fa', '#3c40c6'];
    const arr = ['AQI', 'PM2.5', 'PM10', 'SO2', 'NO2', 'CO', 'O3', 'U', 'V', 'TEMP', 'RH', 'PSFC'];
    const arrFiltered = ['AQI', 'PM2_5', 'PM10', 'SO2', 'NO2', 'CO', 'O3', 'U', 'V', 'TEMP', 'RH', 'PSFC'];
    var updateDataCur = ['北京市', 2013, 1, 1];
    var mCharts1 = echarts.init(document.getElementById('main'), 'dark');
    var mCharts2 = echarts.init(document.getElementById('line'),);
    var mCharts3 = echarts.init(document.getElementById('radar'),);
    var city = '北京市'
    var year = 2013;
    var month = 1;
    var day = 1;
    var pollution = 'AQI';
    var url = '';
    var url3 = '';
    var playInterval = -1;
    const totalDays = 2100;
    var DayCur = 0;
    var playBarLen = 0;
    var eventWidth = window.innerWidth * 0.21;
    var isspider = false;
    localStorage.setItem("selectCity", '北京市');
    localStorage.setItem('selectDate', JSON.stringify([2013, 1, 1]))


    async function fetchDataGet(url) {
      let result;
      try {
        const response = await fetch(url, {
          method: method,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
          }
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        result = data.data;
        // 在这里处理你的数据，更新前端界面
      } catch (error) {
        console.error('Error:', error);
      }
      return result;
    }

    function expandMessage(leftPercent) {
      const messageBox = document.querySelector('.message-block');
      const messageBackGround = document.querySelector('.message-background');
      const messageContent = document.querySelector('.message-content');
      messageBox.style.left = (leftPercent - 100) + '%';
      messageBackGround.style.left = (leftPercent - 100) + '%';
      messageContent.style.right = (102 - leftPercent) + '%';
    }

    function hideMessage() {
      const messageBox = document.querySelector('.message-block');
      const messageBackGround = document.querySelector('.message-background');
      const messageContent = document.querySelector('.message-content');
      messageBox.style.left = '-100%';
      messageBackGround.style.left = '-100%';
      messageContent.style.right = '100%';
    }

    function sendMessage(messageContent) {
      hideMessage();
      const messageContentContainer = document.querySelector('.message-content');
      messageContentContainer.innerText = messageContent;
      // 创建一个临时元素，用于测量字符串的宽度
      const tempElement = document.createElement('div');
      tempElement.style.position = 'fixed';
      tempElement.style.top = '30%';
      tempElement.style.left = '30%';
      tempElement.style.height = '4%';
      tempElement.style.fontSize = '100%';
      console.log(messageContent);
      tempElement.textContent = messageContent;
      tempElement.style.whiteSpace = 'nowrap';
      tempElement.style.display = 'inline'; // Make it an inline element to measure the width accurately
      // 将临时元素添加到文档中
      document.body.appendChild(tempElement);
      // 获取字符串的宽度
      const textWidth = tempElement.offsetWidth;
      console.log(textWidth);

      // 计算字符串宽度在元素宽度中所占的百分比
      const widthPercentage = (textWidth / window.innerWidth) * 100;
      document.body.removeChild(tempElement);
      expandMessage(widthPercentage+3);
      setTimeout(hideMessage, 3000);
    }

    // sendMessage('敵が来ます！準備してください');

    function clickWait(component) {
      return new Promise((resolve) => {
        const button = document.getElementById(component);
        button.addEventListener('change', () => {
          resolve();
        });
        button.click();
      });
    }

    async function fetchDataPost(url, postData) {
      fetch(url, {
        method: 'POST',
        body: JSON.stringify(postData),
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
        }
      })
          .then(response => response.json())
          .then(data => {
            // 处理后端返回的数据
            sendMessage(data.data);
          })
          .catch(error => {
            sendMessage('Error:' + error);
          });
    }

    async function fetchDataPostFile(url, fileInputComponent) {
      const fileInput = document.getElementById(fileInputComponent);
      // 检查是否选择了文件
      if (fileInput.files.length === 0) {
        console.log("failed");
        return;
      }
      // 创建一个 FormData 对象，用于传递文件
      const formData = new FormData();
      console.log(fileInput.files[0]);
      formData.append('file', fileInput.files[0]);

      // 发起 fetch 请求
      fetch(url, {
        method: 'POST',
        body: formData,
      })
          .then(response => response.json())
          .then(data => {
            // 处理后端返回的数据
            console.log(data);
          })
          .catch(error => {
            console.error('Error:', error);
          });
    }


    function isDateOutOfRange(date) {
      if (date[1] > 12) {
        return true;
      }
      if (date[2] > new Date(date[0], date[1], 0).getDate()) {
        return true;
      }
      return false;
    }

    function isDateOutOfDataRange(date) {
      if (date[0] < 2013) {
        return true;
      }
      if (data[0] > 2018) {
        return true;
      }
      return false;
    }


    async function setMap() {
      // 前端代码
      // 使用fetch或其他HTTP请求库获取数据
      // 2. 获取特定日期、城市的污染数据
      const DateCur = JSON.parse(localStorage.getItem("selectDate"));
      //需要更改
      const queryMethod = "pollution_map?"
      const queryURL = 'http://' + backendURL + queryRoute + queryMethod
          + 'year=' + DateCur[0]
          + '&month=' + DateCur[1]
          + '&day=' + DateCur[2];

      await fetchDataGet(queryURL).then(data => {
        localStorage.setItem("MapCur", JSON.stringify(data));
      })
    }

    function setMapSpider(DateCur) {
      //需要更改
      const queryMethod_get = "pollution_map?"
      const queryURL_get = 'http://' + backendURL + queryRoute + queryMethod_get
          + 'year=' + DateCur[0]
          + '&month=' + DateCur[1]
          + '&day=' + DateCur[2];
      const queryMethod_post = "spider_day_data"
      const queryURL_post = 'http://' + backendURL + queryRoute + queryMethod_post
      fetchDataPost(queryURL_post, {year: DateCur[0], month: DateCur[1], day: DateCur[2]});
      fetchDataGet(queryURL_get).then(data => {
        localStorage.setItem("MapCur", JSON.stringify(data));
      })
    }

    async function addEventViaInput() {
      const fromYear = document.getElementById('eventYearFrom');
      const fromMonth = document.getElementById('eventMonthFrom');
      const fromDay = document.getElementById('eventDayFrom');
      const toYear = document.getElementById('eventYearTo');
      const toMonth = document.getElementById('eventMonthTo');
      const toDay = document.getElementById('eventDayTo');
      const city = localStorage.getItem("selectCity");
      const eventContent = document.getElementById("inputEvent");
      const queryMethod_post = "add_events"
      const queryURL_post = 'http://' + backendURL + queryRoute + queryMethod_post
      const beginTime = fromYear.value + '-' + fromMonth.value.padStart(2, '0') + '-' + fromDay.value.padStart(2, '0');
      const endTime = toYear.value + '-' + toMonth.value.padStart(2, '0') + '-' + toDay.value.padStart(2, '0');
      const content = eventContent.value;
      fromYear.value = 2013;
      fromMonth.value = 1;
      fromDay.value = 1;
      toYear.value = 2013;
      toMonth.value = 1;
      toDay.value = 1;
      eventContent.value = '';
      fetchDataPost(queryURL_post, {"city": city, "begin_time": beginTime, "end_time": endTime, "events": content});
    }


    async function setCityRank() {
      if (isspider) {
        return;
      }
      const DateCur = JSON.parse(localStorage.getItem("selectDate"));
      const queryMethod = "province_rank?"
      const queryURL = 'http://' + backendURL + queryRoute + queryMethod
          + 'year=' + DateCur[0]
          + '&month=' + DateCur[1]
          + '&day=' + DateCur[2];
      await fetchDataGet(queryURL).then(datas => {
        let i = 1;
        datas.forEach(data_single => {
          const rankRecord = document.getElementById("rank-record-" + i);
          rankRecord.innerText = '城市: ' + data_single['name'] + ' AQI: ' + data_single['AQI'];
          i += 1;
        })
      })
    }

    async function setMapLineChart() {
      if (isspider) {
        return;
      }
      const cityCur = localStorage.getItem("selectCity");
      const queryMethod = "all_AQI?"
      const queryURL = 'http://' + backendURL + queryRoute + queryMethod
          + 'city=' + cityCur;
      await fetchDataGet(queryURL).then(data => {
        localStorage.setItem("lineChartCur", JSON.stringify(data));
      })
    }

    function showDate() {
      const yearD = document.getElementById("selectDate1");
      const monthD = document.getElementById("selectDate2");
      const dayD = document.getElementById("selectDate3");
      const DateCur = JSON.parse(localStorage.getItem("selectDate"));
      yearD.value = DateCur[0];
      monthD.value = DateCur[1];
      dayD.value = DateCur[2];
      year = yearD.value;
      month = monthD.value;
      day = dayD.value;
    }

    function progressBarUpdate() {
      const playBar = document.querySelector(".progress-bar-content");
      playBar.style.width = playBarLen * (DayCur / totalDays) + 'px';
    }

    async function nextDay() {
      // 前端代码
      // 使用fetch或其他HTTP请求库获取数据
      // 2. 获取特定日期、城市的污染数据
      if (isspider) {
        return;
      }
      let DateCur = JSON.parse(localStorage.getItem("selectDate"));
      if ((DateCur[0] === 2018) && (DateCur[1] === 12) && (DateCur[2] === 31)) {
        return;
      }

      DateCur[2] += 1;
      DayCur = DayCur + 1;
      if (isDateOutOfRange(DateCur)) {
        if (DateCur[1] === 12) {
          DateCur[1] = 1;
          DateCur[2] = 1;
          DateCur[0] = DateCur[0] + 1;
        } else {
          DateCur[1] = DateCur[1] + 1;
          DateCur[2] = 1;
        }
      }
      localStorage.setItem('selectDate', JSON.stringify(DateCur));
      progressBarUpdate();
      await setMap();
      showDate();
    }

    async function prevDay() {
      // 前端代码
      // 使用fetch或其他HTTP请求库获取数据
      // 2. 获取特定日期、城市的污染数据
      if (isspider) {
        return;
      }
      let DateCur = JSON.parse(localStorage.getItem("selectDate"));
      let result = '';
      //需要更改
      const queryMethod = "pollution_map?"
      let queryURL;
      console.log(DateCur);
      if ((DateCur[0] === 2013) && (DateCur[1] === 1) && (DateCur[2] === 1)) {
        return;
      }
      DayCur = DayCur - 1;
      DateCur[2] = DateCur[2] - 1;
      while (true) {
        if (DateCur[2] === 0) {
          DateCur[1] = DateCur[1] - 1;
          DateCur[2] = 31;
        }
        if (DateCur[1] === 0) {
          DateCur[0] = DateCur[0] - 1;
          DateCur[1] = 12;
        }
        if (isDateOutOfRange(DateCur) === false) {
          break;
        }
        DateCur[2] = DateCur[2] - 1;
      }
      queryURL = 'http://' + backendURL + queryRoute + queryMethod
          + 'year=' + DateCur[0]
          + '&month=' + DateCur[1]
          + '&day=' + DateCur[2];
      await fetchDataGet(queryURL).then(data => {
        result = data;
      });
      localStorage.setItem("MapCur", JSON.stringify(result));
      localStorage.setItem('selectDate', JSON.stringify(DateCur));
      showDate();
      progressBarUpdate();
    }

    function colorChange(pollution) {
      const choseEnterAll = document.querySelectorAll(".chose_enter_right");
      choseEnterAll.forEach(choseEnter => {
        if (choseEnter.textContent === pollution) {
          choseEnter.style.backgroundColor = '#53B6B2';
        } else {
          choseEnter.style.backgroundColor = 'rgba(1, 202, 217, .2)';
        }
      })
    }

    async function play() {
      await nextDay();
      dataChange(url);
    }

    async function dataReset() {
      // 前端代码
      // 使用fetch或其他HTTP请求库获取数据
      // 2. 获取特定日期、城市的污染数据
      if (isspider) {
        return;
      }
      const cityCur = localStorage.getItem('selectCity');
      const DateCur = JSON.parse(localStorage.getItem("selectDate"));
      if ((cityCur === updateDataCur[0]) && (DateCur[0] === updateDataCur[1])
          && (DateCur[1] === updateDataCur[2]) && (DateCur[2] === updateDataCur[3])) {
        return;
      }

      const Data = JSON.parse(localStorage.getItem("MapCur"));
      const cityData = Data.find(record => record.name === cityCur);

      const AQI = document.getElementById('p-AQI');
      const AQIState = document.getElementById('p-AQIS');
      const PM25 = document.getElementById('p-PM25');
      const PM10 = document.getElementById('p-PM10');
      const SO2 = document.getElementById('p-SO2');
      const NO2 = document.getElementById('p-NO2');
      const CO = document.getElementById('p-CO');
      const O3 = document.getElementById('p-O3');
      const Pcity = document.getElementById("p-city");
      const Pdate = document.getElementById("p-date");
      const Ecity = document.getElementById("e-city");
      const Edate = document.getElementById("e-date");

      const queryMethod = "events?"
      const queryURL = 'http://' + backendURL + queryRoute + queryMethod
          + 'city=' + cityCur
          + '&year=' + DateCur[0]
          + '&month=' + DateCur[1]
          + '&day=' + DateCur[2];

      AQIState.innerText = 'AQI State: ' + cityData.AQIState;
      AQI.innerText = 'AQI: ' + cityData.AQI.toFixed(2);
      PM25.innerText = 'PM2.5: ' + cityData.PM2_5.toFixed(2);
      PM10.innerText = 'PM10: ' + cityData.PM10.toFixed(2);
      SO2.innerText = 'SO2: ' + cityData.SO2.toFixed(2);
      NO2.innerText = 'NO2: ' + cityData.NO2.toFixed(2);
      CO.innerText = 'CO: ' + cityData.CO.toFixed(2);
      O3.innerText = 'O3: ' + cityData.O3.toFixed(2);
      Pcity.innerText = cityCur;
      Pdate.innerText = '日期: ' + DateCur[0] + '-' + DateCur[1] + '-' + DateCur[2];
      Ecity.innerText = cityCur;
      Edate.innerText = DateCur[0] + '-' + DateCur[1] + '-' + DateCur[2];
      updateDataCur[0] = cityCur;
      updateDataCur[1] = DateCur[0];
      updateDataCur[2] = DateCur[1];
      updateDataCur[3] = DateCur[2];
      await fetchDataGet(queryURL).then(data => {
        const eventTitle = document.querySelector(".cityEventTitle");
        if (data === null) {

          if (eventTitle.innerText === 'S.C.H.A.L.E Event') {
            return;
          }
          i = 1;
          for (; i !== 5; i += 1) {
            const eventContent = document.getElementById('eventContent' + i);
            eventContent.style.display = 'none';
          }
          return;
        }
        eventTitle.innerText = '污染事件';
        eventTitle.style.display = 'block';
        var i = 1;
        var eventTop = 45;
        data.forEach(record => {
          const eventContent = document.getElementById('eventContent' + i);
          eventContent.innerText = i + '.' + record;
          const lineCost = Math.ceil(((eventContent.innerText.length) * 18) / eventWidth) * 3.7;
          eventContent.style.height = lineCost + '%';
          eventContent.style.top = eventTop;
          eventTop = eventTop + lineCost + '%';
          eventContent.style.display = 'block';
          i += 1;
        })
        for (; i !== 5; i += 1) {
          const eventContent = document.getElementById('eventContent' + i);
          eventContent.style.display = 'none';
        }
      })
      await setMapLineChart().then(() => {
        dataChange2(url3);
      })
      dataChange3([[cityData.AQI, cityData.PM25,
        cityData.PM10, cityData.CO, cityData.NO2,
        cityData.SO2, cityData.O3]]);
    }

    setInterval(dataReset, 100);

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
      setCityRank();

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
              color: '#FFFFFF'// 设置文本颜色为黑色
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
              city = params.data.name;
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
                color: '#367197'//字体颜色
              },
              emphasis: { //动态展示的样式
                fontSize: '10',//字体大小
                color: '#FFFFFF'
                //color: '#485460f'//字体颜色
              },
            },
            itemStyle: {
              normal: {
                borderColor: 'rgba(0, 0, 0, 0.5)',
                areaColor: '#1c2f9a',//静态时各省份区域颜色
              },
              emphasis: {
                areaColor: '#367197',//鼠标选择区域颜色
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

    setMap().then(() => {
      dataChange(url);
    });

    $('#selectDate').click(async function () {//jqury对元素进行获取
      var flag = 0;
      var y = jQuery("#selectDate1").val();
      var m = jQuery("#selectDate2").val();
      var d = jQuery("#selectDate3").val();
      const mapMode = document.querySelector(".dayChoseMode");
      if ((parseInt(y) < 2013) || (parseInt(m) < 1) || (parseInt(d) < 1) ||
          (parseInt(y) > 2018) || (parseInt(m) > 12) || (parseInt(d) > 31)) {
        if (isDateOutOfRange([y, m, d])) {
          sendMessage("invalid date!");
        }
        isspider = true;
        mapMode.innerText = "MODE: SPIDER";
        setMapSpider([y, m, d]);
        return;
      }
      isspider = false;
      mapMode.innerText = "MODE: NORMAL";
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
        localStorage.setItem('selectDate', JSON.stringify([parseInt(y), parseInt(m), parseInt(d)]))
        console.log(JSON.parse(localStorage.getItem('selectDate')));
        //        console.log(url);
        //console.log([y,m,d]);
        // 给定的日期
        const givenDate = new Date('2013-01-01'); // 这里的日期是示例，你需要替换为实际的日期
        const targetDate = new Date(y, m, d); // 这里的日期是示例，你需要替换为实际的日期
        const givenTime = givenDate.getTime();
        const targetTime = targetDate.getTime();
        const timeDifference = targetTime - givenTime;
        DayCur = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        await setMap();
        progressBarUpdate();
        dataChange(url);
      }
    })
    $('#dayPrev').click(async function () {//jqury对元素进行获取
      await prevDay();
      dataChange(url);
    })
    $('#dayNext').click(async function () {//jqury对元素进行获取
      await nextDay();
      dataChange(url);
    })
    $('#addEvent').click(function () {
      for (let i = 1; i <= 4; i++) {
        const eventContent = document.getElementById('eventContent' + i);
        eventContent.style.display = 'none';
      }
      const inputEvent = document.getElementById('inputEvent');
      const eventTitle = document.querySelector('.cityEventTitle');
      const submitButton = document.querySelector('.submitEventButton');
      const cancelButton = document.querySelector('.cancelEventButton');
      const eventDateRange = document.querySelector(".eventDateRange");
      inputEvent.style.display = 'block';
      eventTitle.innerText = '事件添加';
      submitButton.style.display = 'block';
      cancelButton.style.display = 'block';
      eventDateRange.style.display = 'block';
    })
    $('#addEventViaFile').click(async function () {
      await clickWait('eventInput');
      const queryMethod = "add_events_file?"
      const queryURL = 'http://' + backendURL + queryRoute + queryMethod;
      console.log('bbb');
      fetchDataPostFile(queryURL, 'eventInput');
    })
    $('#btnAQI').click(function () {
      pollution = 'AQI';
      dataChange(url);
      colorChange(pollution);
    })
    $('#btn1').click(function () {//jqury对元素进行获取
      pollution = 'PM2.5';
      dataChange(url);
      url3 = 'line/' + city + '/' + pollution + '.json'
      colorChange(pollution);
    })
    $('#btn2').click(function () {//jqury对元素进行获取
      pollution = 'PM10';
      dataChange(url);
      url3 = 'line/' + city + '/' + pollution + '.json'
      colorChange(pollution);
    })
    $('#btn3').click(function () {//jqury对元素进行获取
      pollution = 'SO2';
      dataChange(url);
      url3 = 'line/' + city + '/' + pollution + '.json'
      colorChange(pollution);
    })
    $('#btn4').click(function () {//jqury对元素进行获取
      pollution = 'NO2';
      dataChange(url);
      url3 = 'line/' + city + '/' + pollution + '.json'
      colorChange(pollution);
    })
    $('#btn5').click(function () {//jqury对元素进行获取
      pollution = 'CO';
      dataChange(url);
      url3 = 'line/' + city + '/' + pollution + '.json'
      colorChange(pollution);
    })
    $('#btn6').click(function () {//jqury对元素进行获取
      pollution = 'O3';
      dataChange(url);
      url3 = 'line/' + city + '/' + pollution + '.json'
      colorChange(pollution);
    })
    $('#playMain').click(function () {
      if (isspider) {
        return;
      }
      if ($(this).text() === 'play') {
        playInterval = setInterval(play, 200);
        $(this).text('pause');
      } else if ($(this).text() === 'pause') {
        clearInterval(playInterval);
        playInterval = -1;
        $(this).text('play');
      }
    })
    $('#stopMain').click(async function () {
      isspider = false;
      const mapMode = document.querySelector(".dayChoseMode");
      mapMode.innerText = "MODE: NORMAL";
      clearInterval(playInterval);
      playInterval = -1;
      localStorage.setItem('selectDate', JSON.stringify([2013, 1, 1]));
      await setMap();
      showDate();
      DayCur = 0;
      progressBarUpdate();
      dataChange(url);
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
        const lineData = JSON.parse(localStorage.getItem('lineChartCur'));
        for (var i = 2013; i <= 2018; i++) {
          var temp = [];
          for (var j = 0; j < 365; j++) {
            var cur = parseInt(i % 2013);
            temp = [date_all[cur * 365 + j], lineData[i][j]]
            data.push(temp)
          }
        }
        mCharts2.setOption(option2 = {
          title: {
            text: localStorage.getItem('selectCity') + 'AQI',
            left: '1%',
            textStyle: {
              color: '#FFFFFF' // 将标题颜色设置为白色
            },
          },
          tooltip: {
            trigger: 'axis',
            formatter: function (params) {
              return params[0].axisValue + '  ' + pollution + ': ' + parseInt(params[0].data)
            }
          },
          grid: {
            left: '10%',
            right: '15%',
            bottom: '30%',
            width: '60%',
          },
          xAxis: {
            data: data.map(function (item) {
              return item[0];
            }),
            axisLabel: {
              color: '#FFFFFF' // 将 Y 轴刻度文字颜色设置为白色
            },
          },
          yAxis: {
            axisLabel: {
              color: '#FFFFFF' // 将 Y 轴刻度文字颜色设置为白色
            }
          },
          toolbox: {
            right: 10,
            iconStyle: {
              borderColor: '#FFFFFF', // 设置按钮图标边框颜色为白色
            },
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
            textStyle: {
              color: '#FFFFFF', // 将图例文字颜色设置为白色
            },
            top: 50,
            right: 2,
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
          }
        });
      })

      option2 && mCharts2.setOption(option2);
    }

    function dataChange3(dataBJ) {
      var option;

      // Schema:
      // AQI,PM2.5,PM10,CO,NO2,SO2,O3
      const lineStyle = {
        width: 1,
        opacity: 0.5
      };
      option = {
        backgroundColor: 'rgba(1, 202, 217, .2)',
        radar: {
          indicator: [
            {name: 'AQI', max: 300},
            {name: 'PM2.5', max: 250},
            {name: 'PM10', max: 300},
            {name: 'CO', max: 5},
            {name: 'NO2', max: 200},
            {name: 'SO2', max: 100},
            {name: 'O3', max: 300}
          ],
          shape: 'circle',
          splitNumber: 5,
          axisName: {
            color: '#FFFFFF'
          },
          splitLine: {
            lineStyle: {
              color: [
                'rgba(0, 255, 255, 0.1)',
                'rgba(0, 255, 255, 0.2)',
                'rgba(0, 255, 255, 0.4)',
                'rgba(0, 255, 255, 0.6)',
                'rgba(0, 255, 255, 0.8)',
                'rgba(0, 255, 255, 1)'
              ].reverse()
            }
          },
          splitArea: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: 'rgba(0, 255, 255, .4)'
            }
          }
        },
        series: [
          {
            name: 'city_name',
            type: 'radar',
            lineStyle: lineStyle,
            data: dataBJ,
            symbol: 'none',
            itemStyle: {
              color: '#FFFFFF'
            },
            areaStyle: {
              opacity: 0.1
            }
          },
        ]
      };

      option && mCharts3.setOption(option);
    }

    dataChange3([[0, 0, 0, 0, 0, 0, 0]]);

    const playBar = document.querySelector(".progress-bar-content");
    const cityEventContainer = document.querySelector(".cityEvent");
    const eventCancelButton = document.querySelector('.cancelEventButton');
    const submitEventButton = document.querySelector(".submitEventButton");
    const addeventContent = document.querySelector(".addEventContent");

    playBarLen = window.innerHeight * 0.15;
    playBar.style.width = '0px';
    cityEventContainer.style.left = ((window.innerWidth * 0.85) - 300) + 'px';
    cityEventContainer.style.top = ((window.innerHeight * 0.85) - (window.innerHeight * 0.85 * 0.08) - 300) + 'px';
    mCharts1.resize();
    mCharts2.resize();

    window.addEventListener('resize', () => {
      eventWidth = window.innerWidth * 0.21;
      playBarLen = window.innerHeight * 0.15;
      cityEventContainer.style.left = ((window.innerWidth * 0.85) - 300) + 'px';
      cityEventContainer.style.top = ((window.innerHeight * 0.85) - (window.innerHeight * 0.85 * 0.08) - 300) + 'px';
      mCharts3.resize();
    })

    eventCancelButton.addEventListener('click', () => {
      const cityEventTitle = document.querySelector(".cityEventTitle");
      const inputEvent = document.getElementById('inputEvent');
      const eventDateRange = document.querySelector(".eventDateRange");
      cityEventTitle.innerText = "污染事件";
      inputEvent.style.display = 'none';
      submitEventButton.style.display = 'none';
      eventCancelButton.style.display = 'none';
      eventDateRange.style.display = 'none';
      updateDataCur[3] = updateDataCur[3] + 1;
    })

    submitEventButton.addEventListener('click', () => {
      addEventViaInput();
      const cityEventTitle = document.querySelector(".cityEventTitle");
      const inputEvent = document.getElementById('inputEvent');
      const eventDateRange = document.querySelector(".eventDateRange");
      cityEventTitle.innerText = "污染事件";
      inputEvent.style.display = 'none';
      submitEventButton.style.display = 'none';
      eventCancelButton.style.display = 'none';
      eventDateRange.style.display = 'none';
      updateDataCur[3] = updateDataCur[3] + 1;
    })

  }

  ,
  methods: {}
  ,
}
;
</script>

<style>
.background-container1 {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 0;
}

.background-iframe1 {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
}

.message-block,
.message-content,
.message-background {
  position: fixed;
  top: 5%;
  width: 100%;
  height: 4%;
  z-index: 3;
}

.message-block {
  transition: left 0.7s ease; /* 添加过渡效果，使显示和隐藏平滑 */
  overflow: hidden;
  left: -100%;
}

.message-background {
  transition: left 0.7s ease; /* 添加过渡效果，使显示和隐藏平滑 */
  left: -100%;
  transform: skewX(-20deg);
  border-radius: 3%; /* 添加圆角 */
  transform-origin: 0 0;
  background-color: #0C2F4F;
}

.message-content {
  color: #F2F9FF;
  font-size: 100%;
  transition: right 0.7s ease; /* 添加过渡效果，使显示和隐藏平滑 */
  right: 100%;
  text-align: right;
}


.rank-list {
  position: fixed;
  left: 3.2%;
  top: 15%;
  width: 15.9%;
  height: 44%;
  margin: 0; /* 移除外边距 */
  padding: 0; /* 移除内边距 */
  list-style: none;
}

.leftBottom {
  position: fixed;
  left: 3.2%;
  top: 67.3%;
  width: 15.9%;
  height: 27%;
  background-color: rgba(1, 202, 217, .2);
}

.rank-record-typeA,
.rank-record-typeB {
  position: relative;
  height: 10%;
  width: 100%;
  color: #FFFFFF;
  font-size: 15px;
}

.rank-record-typeA {
  background-color: rgba(1, 202, 217, .2);
}

.rank-record-typeB {
  background-color: rgba(0, 255, 255, .4);
}

.main-chart-title {
  margin: 0;
  font-weight: normal;
  padding: 0;
  list-style: none;
  font-style: normal;
  z-index: 2;
  position: fixed;
  top: 11%;
  left: 42%;
  color: #FFFFFF;
}

.pollution-chart-container {
  position: fixed;
  display: flex;
  flex-direction: column;
  top: 16%;
  left: 20.5%;
  height: 80%;
  width: 53.5%;
}


.total_chose_box {
  color: #FFFFFF;
  display: block;
  position: relative;
  margin-left: 1%;
  height: 100%;
  width: 100%;
}

.chart-options {
  border-radius: 20px;
  position: relative;
  top: 0;
  width: 100%;
  height: 5%;
  font-size: 17px;
}

.box-left {
  position: relative;
  text-align: left;
  width: 100%;
  height: 100%;
  display: inline-block;
}

.box-right {
  position: relative;
  display: inline-block;
  float: right;
  width: 25%;
  height: 100%;
  top: 1650%;
  left: -3%;
  z-index: 2;
}

.chose_tltle,
.chose_text_in {
  float: left;
}

.chose_text_in {
  position: relative;
  width: 6%;
  height: 100%;
  border: 1px solid #53B6B2;
  background-color: rgba(1, 202, 217, .2);
  color: #FFFFFF;
  border-radius: 4px;
  font-size: 16px;
}

.chose_enter_left,
.chose_enter_right {
  background-color: rgba(1, 202, 217, .2);
  color: #FFFFFF;
  border: none;
  padding: 0;
  cursor: pointer;
  height: 100%;
  border-radius: 4px;
}


.chose_enter_left {
  width: 7%;
}

#addEventViaFile {
  width: 14%;
}

.chose_enter_right {
  float: left;
  justify-content: center;
  align-items: center;
  width: 25%;
}

.chose_enter_left:hover,
.chose_enter_right:hover {
  background-color: #53B6B2;
}

#btnAQI {
  background-color: #53B6B2;
  width: 50%;
}


.con {
  position: relative;
  background-color: transparent;
  font-size: 70%;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.dayChoseMode {
  position: fixed;
  top: 19.3%;
  right: 27%;
  color: #FFFFFF;
  font-size: 20px;
  font-weight: 650;
}

.playBar {
  position: fixed;
  width: 7%;
  border: 2px solid #53A5CB; /* 分隔线 */
  top: 87%;
  left: 23%;
  height: 5%;
  border-radius: 5px 0 0 5px;
  background-color: #1795bb;
}

.play,
.stop {
  height: 100%;
  width: 50%;
  display: flex;
  float: left;
  justify-content: center;
  align-items: center;
  position: relative;
  border: none;
  border-radius: 12px;
  background-color: #1795bb;
  text-decoration-color: #ffffff;
  margin: 0;
  cursor: pointer;
}

.play:hover,
.stop:hover {
  background-color: rgb(174, 193, 244);
  color: #1795bb;
  border: 1px solid #ccc;
}

.play {
  border-right: 2px solid #c4c7ce; /* 分隔线 */
}

.progress-bar {
  left: 30%;
  width: 15%;
  height: 5%;
  top: 87%;
  position: fixed;
  border: 2px solid #53A5CB; /* 分隔线 */
  border-radius: 0 5px 5px 0; /* 10px 圆角，底部为直角 */
  border-left: none;
  overflow: hidden;
  display: none;
}

.progress-bar-content {
  position: relative;
  background-color: #FFC90E;
  width: 0;
  height: 100%;
}

#eventInput {
  display: none;
}

.cityEventTitle,
.cityEventContent {
  position: fixed;
  left: 76%;
  width: 21%;
  color: #FFFFFF;
}


.cityEventTitle {
  top: 40%;
  font-size: 25px;
  font-weight: 500;
}

.cityEventContent {
  font-size: 18px;
  font-weight: 300;
  color: #FFFFFF;
  height: 4.75%;
  display: none;
}

#eventContent1, #eventContent3 {
  background-color: rgba(1, 202, 217, .2);
}

#eventContent2, #eventContent4 {
  background-color: rgba(0, 255, 255, .4);
}


#eventContent1 {
  top: 45%;
}

#eventContent2 {
  top: 49.75%;
}

#eventContent3 {
  top: 54.5%;
}

#eventContent4 {
  top: 59.25%;
}

.main-chart,
.right-chart {
  flex: 1;
  position: relative;
  width: 100%;
  height: 100%;
}

.main-chart {
  display: block;
}

.lineChart {
  position: fixed;
  display: block;
  background-color: rgba(1, 202, 217, .2);
  top: 70%;
  left: 76.1%;
  width: 20.9%;
  height: 25%;
}

#p-city, #p-date {
  position: fixed;
  font-size: 13px;
  top: 12%;
}

#p-city {
  left: 76%;
  color: #FFFFFF;
}

#p-date {
  right: 3%;
  color: #9EA1BA;
}


#p-AQI, #p-AQIS, #p-PM25, #p-PM10, #p-SO2, #p-NO2, #p-CO, #p-O3 {
  position: fixed;
  color: #FFFFFF;
  font-size: 15px;
  width: 6%;
  height: 5%;
  background-color: rgba(1, 202, 217, .2);
  align-items: center;
}

#p-AQI, #p-AQIS {
  top: 16%;
}

#p-PM25, #p-PM10, #p-SO2 {
  top: 23%;
}

#p-NO2, #p-CO, #p-O3 {
  top: 30%;
}

#p-AQI {
  left: 77%;
}

#p-AQIS {
  left: 84%;
  width: 13%;
}

#p-PM25 {
  left: 77%;
}

#p-PM10 {
  left: 84%;
}

#p-SO2 {
  left: 91%;
}

#p-NO2 {
  left: 77%;
}

#p-CO {
  left: 84%;
}

#p-O3 {
  left: 91%;
}

#e-city, #e-date {
  position: fixed;
  font-size: 13px;

  right: 3%;
}

#e-city {
  top: 40%;
  color: #FFFFFF;
}

#e-date {
  top: 42%;
  color: #9EA1BA;
}

.eventDateRange {
  display: none;
}

.chose_text_in_event_from,
.chose_text_in_event_to {
  position: fixed;
  left: 90%;
  width: 2%;
  height: 2%;
  border: 1px solid #53B6B2;
  background-color: rgba(1, 202, 217, .2);
  color: #FFFFFF;
  border-radius: 4px;
  font-size: 8px;
}

.cityEventTitle {
  display: none;
}

.chose_title_event_from,
.chose_title_event_to {
  position: fixed;
  color: #FFFFFF;
  font-size: 10px;
  left: 84%;
}

.chose_title_event_from {
  top: 40%;
}

.chose_title_event_to {
  top: 42.5%;
}

.chose_text_in_event_from {
  top: 40%;
}

.chose_text_in_event_to {
  top: 42.5%;
}

#eventYearFrom,
#eventYearTo {
  left: 86%;
}

#eventMonthFrom,
#eventMonthTo {
  left: 88%;
}

#eventDayFrom,
#eventDayTo {
  left: 90%;
}


.addEventContent {
  position: fixed;
  left: 76%;
  width: 21%;
  color: #FFFFFF;
  top: 45%;
  height: 19%;
  border: 1px solid #53B6B2;
  background-color: rgba(1, 202, 217, .2);
  border-radius: 4px;
  font-size: 18px;
  display: none;
}

.cancelEventButton,
.submitEventButton {
  display: none;
  background-color: rgba(1, 202, 217, .2);
  position: fixed;
  top: 59.5%;
  width: 3%;
  height: 3%;
  color: #FFFFFF;
  border: none;
  padding: 0;
  cursor: pointer;
  border-radius: 4px;
}

.cancelEventButton {
  left: 93%;
}

.submitEventButton {
  left: 89.5%;
}

.Header-Menu {
  color: #fff;
  background-size: 100% 100%;
  background-position: 0 0;
  position: fixed;
  top: 1.8%;
  left: 0;
  width: 100%;
  height: 40%;
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
</style>