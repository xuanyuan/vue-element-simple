<template>
  <div>
    <div id="container"></div>
  </div>
</template>
<script>
  import AMap from 'AMap';
  var map
  export default {
    mounted: function () {
      this.init()
    },
    methods: {
      init: function () {
        map = new AMap.Map('container', {
          center: [116.397428, 39.90923],
          resizeEnable: true,
          zoom: 10
        })
        AMap.plugin(['AMap.ToolBar', 'AMap.Scale'], function () {
          map.addControl(new AMap.ToolBar())
          map.addControl(new AMap.Scale())
        })
      }
    }
  }

</script>
<style lang="scss" scoped>
$height: 800px;
#container {
  height: $height;
}
</style>