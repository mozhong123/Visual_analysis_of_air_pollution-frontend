<template>
  <div class="background-container">
    <iframe
        class="background-iframe"
        src="/src/assets/html/Starry.html"
        ref="iframeDom"
    ></iframe>
  </div>
</template>

<script>
export default {
  data() {
    return {
      Starry: [
      ]
    };
  },
}
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
