<template>
  <van-empty :description="description" :image="image" :class="['empty-box', size ? 'empty-box-' + size : '']" v-bind="$attrs">
    <template slot="default">
      <slot></slot>
    </template>
  </van-empty>
</template>

<script>
import DefaultEmptyImage from '@/assets/img/empty-image-default.png'

const COMPONENT_NAME = 'i-empty'
export default {
  name: COMPONENT_NAME,
  props: {
    description: {
      type: String,
      default: '暂无数据'
    },
    image: {
      type: String,
      default: DefaultEmptyImage
    },
    size: {
      type: String,
      default: 'medium'
    }
  }
}
</script>

<style lang="less" scoped>
.empty-box {
  &-medium {
    ::v-deep {
      .van-empty__image {
        width: 320px;
        height: 320px;
      }
    }
  }
  &-small {
    ::v-deep {
      .van-empty__image {
        width: 160px;
        height: 160px;
      }
    }
  }
  &-mini {
    ::v-deep {
      .van-empty__image {
        width: 80px;
        height: 80px;
      }
    }
  }
}
</style>
