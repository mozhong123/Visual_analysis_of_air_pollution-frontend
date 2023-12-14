<template>
  <div class="background-container1">
    <iframe
        class="background-iframe1"
        src="/src/assets/html/index.html"
        ref="iframeDom"
    ></iframe>
    <!-- Your main content goes here -->
  </div>
  <div>
  </div>
</template>
<script>
export default {
  components: {
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
</style>