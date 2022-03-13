<template>
  <!-- 公共分支的测试专用页面！ -->
  <div></div>
</template>
<script>
export default {
  components: {},
  name: 'Test',
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    goHome() {
      this.$router.push({
        name: 'home',
      });
    },
  },
  beforeRouteLeave(to, from, next) {
    next();
  },
};
</script>
<style lang="less" scoped></style>
