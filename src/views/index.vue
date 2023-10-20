<template>
  <div class="background-container">
    <iframe
        class="background-iframe"
        src="../../static/html/starry.html"
        ref="iframeDom"
    ></iframe>
    <!-- Your main content goes here -->
  </div>
  <div>
    <HeaderMenu></HeaderMenu>
    <!-- 其他页面内容 -->
  </div>
</template>

<script>
import HeaderMenu from "@/components/HeaderMenu.vue"; // 此路径应根据你的项目结构来修改

export default {
  components: {
    HeaderMenu
  }
};
</script>

<style>
.background-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 0;
}

.background-iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
}
</style>
