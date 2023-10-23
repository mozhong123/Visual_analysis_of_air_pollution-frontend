<template>
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
    HeaderMenu,Starry
  }
};
</script>

<style>
</style>
