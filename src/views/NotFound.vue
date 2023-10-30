<script>
import HeaderMenu from "@/components/HeaderMenu.vue";

export default {
  components: {
    HeaderMenu
  }
}
</script>

<template>
  <header-menu></header-menu>
  <p>click
    <router-link :to="'/index'">here</router-link>
    to redirect to the home page
  </p>
</template>

<style scoped>

</style>