<template>
  <div>
    <h3>首页</h3>
    <hello-world />
  </div>
</template>

<script>
import helloWorld from './components/hello-world.vue';
export default {
  components: { helloWorld },
  name: 'home',
};
</script>

<style></style>
