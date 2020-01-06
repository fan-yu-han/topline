<template>
  <div id="app">
    <!-- 根路由出口 -->
    <router-view />
    <van-button type="default">默认按钮</van-button>
    <van-button type="primary">主要按钮</van-button>
    <van-button type="info">信息按钮</van-button>
    <van-button type="warning">警告按钮</van-button>
    <van-button type="danger">危险按钮</van-button>

    <div class='nice'>你好</div>
  </div>

</template>

<script>
export default {
  name: 'App'
}
</script>

<style scoped lang='less'>
@import url(./styles/variables.less);
.nice {
  color:@color-primary;
  width: 375px;
  height: 100px;
  background-color: pink;
}
</style>
