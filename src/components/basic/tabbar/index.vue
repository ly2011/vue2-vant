<template>
  <van-tabbar v-model="active" style="z-index: 1999">
    <van-tabbar-item
      v-for="(tab, index) in tabbar"
      :icon="tab.icon"
      :to="tab.path"
      :dot="tab.dot"
      :info="tab.info"
      :key="index"
      >{{ tab.name }}</van-tabbar-item
    >
  </van-tabbar>
</template>

<script>
const COMPONENT_NAME = 'i-tabbar';
export default {
  name: COMPONENT_NAME,
  data() {
    return {
      active: 0,
      tabbar: [
        {
          name: '首页',
          path: '/',
          pathName: 'home',
          icon: 'home-o',
          dot: false,
          info: '',
        },
        {
          name: '选项式',
          path: '/options-api/basic-form',
          pathName: 'options-api-basic-form',
          icon: 'search',
          dot: false,
          info: '',
        },
        {
          name: '组合式',
          path: '/composition-api/basic-form',
          pathName: 'composition-api-basic-form',
          icon: 'vip-card-o',
          dot: false,
          info: '',
        },
        {
          name: '我的',
          path: '/mine',
          pathName: 'mine',
          icon: 'setting-o',
          dot: false,
          info: '',
        },
      ],
    };
  },

  watch: {
    $route: 'changeActive',
  },

  created() {
    const toName = this.$route.name;
    console.log(toName, 'toName');
    this.setActive(toName);
  },

  methods: {
    changeActive({ name }) {
      this.setActive(name);
    },
    setActive(name) {
      this.tabbar.forEach((tab, i) => {
        if (tab.pathName === name) {
          this.active = i;
          return false;
        }
      });
    },
  },
};
</script>
