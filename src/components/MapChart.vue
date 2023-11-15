<template>
  <div id="mapChart">
    <div id="container">
      <div class="map-chart-button">
        <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round"
             stroke-linejoin="round" class="icon-sm" height="1em" width="1em">
          <line x1="3" y1="6" x2="24" y2="6"></line>
          <line x1="3" y1="12" x2="24" y2="12"></line>
          <line x1="3" y1="18" x2="24" y2="18"></line>
        </svg>
      </div>
      <div id="basis">
        <div id="citydetail">
          <img src="/static/local.png" id="pic1">
          <div id="city">{{ city }}</div>
        </div>
      </div>
      <div id="AQI">
        <div id="typevalue">{{ AQI }}</div>
        <div id="typeState">{{ AQIState }}</div>
        <div id="type">AQI</div>
      </div>
      <div id="detail">
        <div id="PM25">
          <div id="PM25Name">PM2.5</div>
          <div id="value">{{ PM25 }}</div>
        </div>
        <div id="PM10">
          <div id="PM10Name">PM10</div>
          <div id="value">{{ PM10 }}</div>
        </div>
        <div id="SO2">
          <div id="SO2Name">SO2</div>
          <div id="value">{{ SO2 }}</div>
        </div>
        <div id="NO2">
          <div id="NO2Name">NO2</div>
          <div id="value">{{ NO2 }}</div>
        </div>
        <div id="CO">
          <div id="COName">CO</div>
          <div id="value">{{ CO }}</div>
        </div>
        <div id="O3">
          <div id="O3Name">O3</div>
          <div id="value">{{ O3 }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'mapChart',
  data() {
    return {
      city: "北京市",
      loading: true,
      type: 'AQI',
      AQIState: '良好',
      year: 2013,
      month: 1,
      day: 1,
      level: 1,
      PM25: 74.27,
      PM10: 92.39,
      SO2: 33.9,
      NO2: 58.38,
      CO: 2.37,
      O3: 26.97,
      AQI: 94.72
    }
  },
  created() {
  },
  mounted() {
    const mapChartContainer = document.getElementById("container");
    const containerButton = document.querySelector(".map-chart-button");
    let intervalId = 0;

    //如果想要点击展开的话就用这一段
    containerButton.addEventListener('click', () => {
      if (mapChartContainer.style.left === '86%') {
        this.hideSideMenu();
      } else {
        this.expandSideMenu();
      }
    })

    /*
    containerButton.addEventListener('mouseover', this.expandSideMenu);
    mapChartContainer.addEventListener('mouseover', this.expandSideMenu);
    containerButton.addEventListener('mouseout', this.hideSideMenu);
    mapChartContainer.addEventListener('mouseout', this.hideSideMenu);
     */
  },
  computed: {},
  watch: {},
  methods: {
    expandSideMenu() {
      const mapChartContainer = document.getElementById("container");
      mapChartContainer.style.left = '86%';
      this.intervalId = setInterval(this.dataReset, 100);
    },
    hideSideMenu() {
      const mapChartContainer = document.getElementById("container");
      mapChartContainer.style.left = '100%';
      clearInterval(this.intervalId);
    },
    dataReset() {
      // 前端代码
      // 使用fetch或其他HTTP请求库获取数据
      // 2. 获取特定日期、城市的污染数据
      const cityCur = localStorage.getItem('selectCity');
      const DateCur = JSON.parse(localStorage.getItem("selectDate"));
      if ((cityCur+'市' === this.city) && (DateCur[0] === this.year)
          && (DateCur[1] === this.month) && (DateCur[2] === this.day)) {
        return;
      }
      //需要更改
      const backendURL = "127.0.0.1:8000/";
      const queryRoute = "datas/";
      const queryMethod = "pollution?"
      const queryURL = 'http://' + backendURL + queryRoute + queryMethod
          + 'year=' + DateCur[0]
          + '&month=' + DateCur[1]
          + '&day=' + DateCur[2]
          + '&city=' + cityCur+'市';
      fetch(queryURL, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
        }
      })
          .then(response => response.json())
          .then(data => {
            console.log(data.data); // 在控制台查看获取的污染数据
            // 在这里处理你的数据，更新前端界面
            this.AQIState = data.data.AQIState;
            this.AQI = data.data.AQI.toFixed(2);
            this.PM25 = data.data.PM2_5.toFixed(2);
            this.PM10 = data.data.PM10.toFixed(2);
            this.SO2 = data.data.SO2.toFixed(2);
            this.NO2 = data.data.NO2.toFixed(2);
            this.CO = data.data.CO.toFixed(2);
            this.O3 = data.data.O3.toFixed(2);

          })
          .catch(error => console.error('Error:', error));
      this.year = DateCur[0];
      this.month = DateCur[1];
      this.day = DateCur[2];
      this.city = cityCur+'市';
    },
  }
}


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


#container {
  position: fixed;
  display: flex;
  width: 14%;
  height: 30%;
  bottom: 1%;
  background-color: rgba(16, 42, 82, 0.5);
  border-radius: 0 0 0 10px;
  margin-top: 10px;
  top: 100px;
  left: 100%;
  z-index: 100;
  transition: left 0.5s; /* 添加过渡效果 */
}

.map-chart-button {
  position: relative;
  display: flex;
  left: -15%;
  background-color: rgba(16, 42, 82, 0.5);
  height: 20%;
  width: 15%;
  justify-content: center;
  align-items: center;
  border-right: none; /* 分隔线 */;
  border-radius: 2px 0 0 2px; /* 10px 圆角，底部为直角 */
  transition: background-color 0.5s; /* 添加过渡效果 */
}

.map-chart-button:hover {
  background-color: rgba(26, 70, 138, 0.5);;
}

#pic1 {
  position: absolute;
  top: 10%;
  height: 40px;
  width: 45px;
}

#basis {
  display: flex;
  position: absolute;
  width: 100%;
  height: 37px;
}

#city {
  position: absolute;
  font-family: "Microsoft YaHei";
  left: 18%;
  top: 20%;
  font-size: 25px;
  font-weight: 500;
  color: white;
}

#AQI {
  position: absolute;
  display: flex;
  width: 100%;
  height: 25%;
  top: 10%;
}

#typevalue {
  font-family: "Microsoft YaHei";
  font-size: 34px;
  font-weight: 800;
  color: white;
  position: absolute;
  left: 49%;
  top: 57%;
}

#typeState {
  position: absolute;
  color: rgb(58, 60, 179);
  font-weight: 800;
  width: 25%;
  height: 40%;
  left: 3%;
  top: 80%;
  font-size: 18px;
  border-radius: 5px;
  text-align: center;
  line-height: 150%;
  background-color: rgb(255, 255, 0);
}

#type {
  font-size: 20px;
  font-weight: 500;
  color: white;
  position: absolute;
  top: 80%;
  left: 30%;
}

#detail {
  display: flex;
  position: absolute;
  top: 45%;
  width: 100%;
  height: 50%;
}

#PM25, #PM10, #SO2 {
  position: absolute;
  top: 5%;
  width: 25%;
  height: 45%;
  background-color: rgba(128, 128, 128, 0.3);
  border-radius: 10px;
  overflow: hidden;
}

#NO2, #CO, #O3 {
  position: absolute;
  top: 58%;
  width: 25%;
  height: 45%;
  background-color: rgba(128, 128, 128, 0.3);
  border-radius: 10px;
  overflow: hidden;
}

#PM25 {
  left: 3%;
}

#PM10 {
  left: 34%;
}

#SO2 {
  left: 65%;
}

#NO2 {
  left: 3%;
}

#CO {
  left: 34%;
}

#O3 {
  left: 65%;
}

#PM25Name, #PM10Name, #SO2Name, #NO2Name, #COName, #O3Name {
  height: 30%;
  width: 100%;
  text-align: center;
  color: rgb(58, 60, 179);
  font-weight: 700;
  font-size: 90%;
}

#PM25Name, #PM10Name {
  background-color: rgb(255, 255, 0);
}

#SO2Name, #NO2Name, #COName, #O3Name {
  background-color: rgb(0, 228, 0);
}

#value {
  position: absolute;
  width: 100%;
  height: 70%;
  color: white;
  text-align: center;
  font-weight: 800;
  border-radius: 10px;
  line-height: 300%;
}
</style>
