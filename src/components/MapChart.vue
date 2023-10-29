<template>
  <div id = "mapChart">
    <div id ="continer">
        <div id="basis">
          <div id="citydetail">
            <img src="/static/local.png" id="pic1">
            <div id="city">{{city}}</div>
          </div>
        </div>
        <div id="AQI">
            <div id="typevalue">{{AQI}}</div>
            <div id="typeState">{{AQIState}}</div>
            <div id="type">AQI</div>
          </div>
        <div id="detail">
          <div id="PM25">
            <div id="PM25Name">PM2.5</div>
            <div id="value">{{PM25}}</div>
          </div>
          <div id="PM10">
            <div id="PM10Name">PM10</div>
            <div id="value">{{PM10}}</div>
          </div>
          <div id="SO2">
            <div id="SO2Name">SO2</div>
            <div id="value">{{SO2}}</div>
          </div>
          <div id="NO2">
            <div id="NO2Name">NO2</div>
            <div id="value">{{NO2}}</div>
          </div>
          <div id="CO">
            <div id="COName">CO</div>
            <div id="value">{{CO}}</div>
          </div>
          <div id="O3">
            <div id="O3Name">O3</div>
            <div id="value">{{O3}}</div>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'mapChart',
  data () {
    return {
      city:"北京市",
      loading: true,
      type: 'AQI',
      AQIState: '良好',
      time: 2013,
      level:1,
      PM25: 74.27,
      PM10: 92.39,
      SO2: 33.9,
      NO2: 58.38,
      CO: 2.37,
      O3: 26.97,
      AQI: 94.72
    }
  },
  created () {
  },
  mounted () {
  },
  computed:{
  },
  watch:{
  },
  methods: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#continer{
  position: absolute;
  display: flex;
  width: 230px;
  height: 239px;
  left: 0.5%;
  bottom: 1%;
  background-color: rgba(16, 42, 82, 0.5);
  border-radius: 10px;
  margin-top:10px;
}
#pic1{
  position: absolute;
  top: 10%;
  height: 40px;
  width: 45px;
}
#basis{
  display: flex;
  position: absolute;
  width: 100%;
  height: 37px;
}
#city{
  position: absolute;
  font-family: "Microsoft YaHei";
  left: 18%;
  top: 20%;
  font-size: 25px;
  font-weight:500;
  color: white;
}
#AQI{
  position: absolute;
  display: flex;
  width: 100%;
  height: 25%;
  top: 10%;
}
#typevalue{
  font-family: "Microsoft YaHei";
  font-size: 34px;
  font-weight:800;
  color: white;
  position: absolute;
  left: 49%;
  top: 57%;
}
#typeState{
  position: absolute;
  color: rgb(58, 60, 179);
  font-weight: 800;
  width: 25%;
  height: 40%;
  left: 3%;
  top: 80%;
  font-size: 18px;
  border-radius:5px;
  text-align: center;
  line-height: 150%;
  background-color: rgb(255,255,0);
}
#type{
  font-size: 20px;
  font-weight:500;
  color: white;
  position: absolute;
  top: 80%;
  left: 30%;
}
#detail{
  display: flex;
  position: absolute;
  top: 45%;
  width: 100%;
  height: 50%;
}
#PM25,#PM10,#SO2{
  position: absolute;
  top: 5%;
  width: 25%;
  height: 45%;
  background-color: rgba(	128,128,128,0.3);
  border-radius: 10px;
}
#NO2,#CO,#O3{
  position: absolute;
  top: 58%;
  width: 25%;
  height: 45%;
  background-color: rgba(	128,128,128,0.3);
  border-radius: 10px;
}
#PM25{
  left: 3%;
}
#PM10{
  left: 34%;
}
#SO2{
  left: 65%;
}
#NO2{
  left: 3%;
}
#CO{
  left: 34%;
}
#O3{
  left: 65%;
}
#PM25Name,#PM10Name,#SO2Name,#NO2Name,#COName,#O3Name{
  height: 30%;
  width: 100%;
  text-align: center;
  color:rgb(58, 60, 179);
  font-weight: 700;
  border-radius: 10px 10px 0 0;
}
#PM25Name,#PM10Name{
  background-color: rgb(255,255,0);
}
#SO2Name,#NO2Name,#COName,#O3Name{
  background-color: rgb(0,228,0);
}
#value{
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
