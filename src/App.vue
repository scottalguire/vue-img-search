<template>
  <div id="app">
    <ImageGrid/>
  </div>
</template>
<script>
import ImageGrid from "./components/ImageGrid.vue";

export default {
  name: "app",
  components: {
    ImageGrid
  }
};
</script>

<style>
:root {
  --bg-color: #222;
  --input-bg-color: #111;
  --transition-main: 0.2s all;
}
* {
  box-sizing: border-box;
}
body,
html {
  margin: 0;
  padding: 0;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #fff;
  margin: 0;
  padding: 40px 10px;
  background: var(--bg-color);
}
</style>
