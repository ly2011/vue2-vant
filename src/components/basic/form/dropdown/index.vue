<template>
  <div class="dropdown">
    <van-field
      v-bind="formFieldProps"
      :clickable="isDisabled"
      v-on="$listeners"
      class="align-items-center"
    >
      <template #input>
        <van-dropdown-menu>
          <van-dropdown-item
            get-container="#app"
            v-model="currentValue"
            v-bind="fieldProps"
            :disabled="isDisabled"
            :options="options"
            v-on="events"
          />
        </van-dropdown-menu>
      </template>
    </van-field>
  </div>
</template>

<script>
const COMPONENT_NAME = 'i-dropdown'
export default {
  name: COMPONENT_NAME,
  inject: ['form'],
  props: {
    value: [String, Number, Boolean],
    props: {
      type: Object,
      default: () => ({})
    },
    events: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    currentValue: {
      get () {
        if (!this.value) return ''
        if (!this.options.length) return ''
        const option = this.options.find(item => item.value === this.value)
        return option ? option.value : ''
      },

      set (val) {
        this.$emit('input', val)
      }
    },
    formFieldProps () {
      return this.$attrs
    },
    fieldProps () {
      return this.props
    },
    isDisabled () {
      return this.fieldProps.disabled || (this.form || {}).disabled
    },
    options () {
      const options = this.fieldProps.options || []
      const nextOptions = options.map(item => ({
        text: item.label,
        value: item.name,
        ...item
      }))
      return nextOptions
    }
  }
}
</script>
<style lang="less" scoped>
.dropdown {
  /deep/.van-dropdown-menu {
    .van-dropdown-menu__title {
      padding-left: 0;
    }
    &__bar {
      height: 48px;
    }
  }
  // /deep/.van-hairline--top-bottom::after {
  //   border: none;
  //   background-color: transparent;
  // }
}
</style>
