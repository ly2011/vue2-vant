<template>
  <div class="container">
    <h3 class="title">个人中心</h3>
    <van-button type="primary" @click="goHome">回到首页</van-button>
  </div>
</template>
<script>
export default {
  name: 'me',
  data() {
    return {};
  },
  methods: {
    goHome() {
      this.$router.replace('/');
    },
  },
};
</script>
<style lang="less" scoped>
@import '@/styles/common/var.less';
.title {
  color: @red;
  font-size: @font-size-normal;
  text-align: center;
  padding: @padding-5;
}
</style>
