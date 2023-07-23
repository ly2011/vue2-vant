<template>
  <div>
    <h3>首页</h3>
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

<style></style>
