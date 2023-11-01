<template>
  <div>
    <HeaderMenu></HeaderMenu>
    <BackGround></BackGround>
    <!-- 其他页面内容 -->
  </div>
</template>

<script>
import HeaderMenu from "@/components/HeaderMenu.vue"; // 此路径应根据你的项目结构来修改
import BackGround from "@/components/BackGround.vue"; // 此路径应根据你的项目结构来修改
export default {
  components: {
    HeaderMenu,BackGround
  }
};
</script>

<style>
</style>
