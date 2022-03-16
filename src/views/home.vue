<template>
  <div>
    <h3>首页</h3>
    <hello-world v-model="msg" />
    <counter @update="updateCounter" :msg="msg" />
  </div>
</template>

<script>
export default {
  name: 'home',
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

<style></style>
