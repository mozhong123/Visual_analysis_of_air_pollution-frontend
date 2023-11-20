<template>
  <div class="background-container1">
    <iframe
        class="background-iframe1"
        src="/src/assets/html/PollutionMap.html"
        ref="iframeDom"
    ></iframe>
    <!-- Your main content goes here -->
  </div>
  <div>
    <HeaderMenu></HeaderMenu>
    <BackGround></BackGround>
    <MapChart></MapChart>
    <!-- 其他页面内容 -->
  </div>
</template>

<script>
import HeaderMenu from "@/components/HeaderMenu.vue"; // 此路径应根据你的项目结构来修改
import MapChart from "@/components/MapChart.vue";
import BackGround from "@/components/BackGround.vue";
export default {
  components: {
    BackGround,
    HeaderMenu,MapChart
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
