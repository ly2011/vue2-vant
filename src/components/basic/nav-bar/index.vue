<template>
  <div>
    <van-nav-bar
      :class="navBarClass"
      :title="title"
      :z-index="2"
      :left-text="leftText || '返回'"
      :right-text="rightText"
      :fixed="false"
      :border="border"
      v-bind="$attrs"
      @click-left="handleClickLeft"
      @click-right="handleClickRight"
    >
      <template slot="left">
        <slot name="left"></slot>
      </template>
      <template slot="title">
        <slot name="title"></slot>
      </template>
      <template slot="right">
        <slot name="right"></slot>
      </template>
    </van-nav-bar>
  </div>
</template>

<script>
const COMPONENT_NAME = 'i-nav-bar';
export default {
  name: COMPONENT_NAME,
  props: {
    title: String,
    leftText: {
      type: String,
      default: '',
    },
    rightText: {
      type: String,
      default: '',
    },
    preventGoBack: {
      type: Boolean,
      default: false,
    },
    hasTabsCard: {
      type: Boolean,
      default: false,
    },
    border: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    navBarClass() {
      return {
        header: true,
        'has-tabs-card': !!this.hasTabsCard,
      };
    },
  },
  methods: {
    handleClickLeft() {
      if (this.preventGoBack) {
        this.$emit('click-left');
      } else {
        this.$root.goBack();
      }
    },
    handleClickRight() {
      this.$emit('click-right');
    },
  },
};
</script>

<style lang="less" scoped>
@import '~@/styles/common/var.less';
.header {
  display: flex;
  align-items: center;
  ::v-deep {
    .van-nav-bar__left {
      display: flex;
      align-items: center;
    }
  }
  &.has-tabs-card {
    ::v-deep {
      .van-nav-bar__text {
        line-height: @tabs-card-height;
      }
    }
  }

  ::v-deep.van-nav-bar__title {
    flex-basis: 60%;
    .van-tabs__nav--card {
      .van-tab {
        &.van-tab--active {
          color: #7d7e80;
        }
      }
    }
  }
  ::v-deep.van-dropdown-menu {
    max-width: 200px;
    &__bar {
      height: calc(@nav-bar-height * 2);
    }
  }
  // ::v-deep.van-dropdown-menu__title {
  //   color: #fff;
  // }
  ::v-deep.van-hairline--top-bottom::after,
  ::v-deep.van-hairline-unset--top-bottom::after {
    border-width: 0;
  }
}
</style>
