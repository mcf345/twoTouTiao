<template>
  <div>
    <h2>app组件</h2>
    <ToutiaoIcon icon="wode" />
    <ToutiaoIcon icon="dianzan" />
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "app",
};
</script>

<style scoped lang="less"></style>
