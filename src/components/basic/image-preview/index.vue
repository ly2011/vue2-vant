<template>
  <ul class="image-preview" v-if="images && images.length > 0">
    <li class="image-preview-item" v-for="(item, index) in images" :key="index">
      <van-image width="40" height="40" fit="cover" :src="item.path" :alt="item.name" @click="handlePreview(index)" />
    </li>
  </ul>
</template>

<script>
import { ImagePreview } from 'vant';

const COMPONENT_NAME = 'i-image-preview';
export default {
  name: COMPONENT_NAME,
  props: {
    images: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    imageList() {
      if (!this.images) return [];
      return this.images?.map(item => item.path);
    },
  },
  methods: {
    handlePreview(index) {
      ImagePreview({
        images: this.imageList,
        startPosition: index,
        onClose() {},
      });
    },
  },
};
</script>

<style lang="less" scoped>
.image-preview {
  display: flex;
  flex-wrap: wrap;
  &-item {
    flex: 0 0 25%;
  }
}
</style>
