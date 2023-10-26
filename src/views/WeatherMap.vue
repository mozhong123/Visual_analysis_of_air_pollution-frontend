<template>
  <div class="background-container1">
    <iframe
        class="background-iframe1"
        src="/src/assets/html/WeatherMap.html"
        ref="iframeDom"
    ></iframe>
    <iframe
        class="background-iframe2"
        src="/src/assets/html/CountryWind.html"
        ref="iframeDom"
    ></iframe>
    <!-- Your main content goes here -->
  </div>
  <div>
    <HeaderMenu></HeaderMenu>
    <Starry></Starry>
    <!-- 其他页面内容 -->
  </div>
</template>

<script>
import HeaderMenu from "@/components/HeaderMenu.vue"; // 此路径应根据你的项目结构来修改
import Starry from "@/components/Starry.vue"; // 此路径应根据你的项目结构来修改
export default {
  components: {
    HeaderMenu,
    Starry
  }
};
</script>

<style>
.background-container1 {
  position: fixed;
  top: 50px;
  left: -10px;
  width: 100%;
  height: 100%;
  z-index: 2;
}

.background-iframe1 {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
}


.background-iframe2 {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;

}
</style>
