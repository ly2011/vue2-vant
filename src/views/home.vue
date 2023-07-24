<template>
  <div>
    <h3 class="title">首页</h3>
    <hello-world v-model="msg" />
    <!-- <counter @update="updateCounter" :msg="msg" /> -->
  </div>
</template>

<script>
import HelloWorld from './components/hello-world.vue';
export default {
  name: 'home',
  components: { HelloWorld },
  data() {
    return {
      msg: 'hello world',
    };
  },
  methods: {
    updateCounter(value) {
      // this.$emit('update', value);
      console.log(value, 'updateCounter');
    },
  },
};
</script>

<style lang="less" scoped>
// @import '@/styles/common/var.less';
.title {
  color: @red;
  font-size: @font-size-normal;
}
</style>
