<template>
  <div>
    <van-field
      v-show="isReadonly || isDisabled"
      v-model="currentValue"
      v-bind="formFieldProps"
      :disabled="isDisabled"
      v-on="$listeners"
    >
      <template #input>
        <div v-html="currentValue" class="static-text" />
      </template>
    </van-field>
    <van-field v-show="!isReadonly && !isDisabled" v-model="currentValue" v-bind="formFieldProps" v-on="events" />
  </div>
</template>

<script>
const COMPONENT_NAME = 'i-input';
export default {
  name: COMPONENT_NAME,
  inject: ['form'],
  props: {
    value: [String, Number],
    props: {
      type: Object,
      default: () => ({}),
    },
    events: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    currentValue: {
      get() {
        return this.value;
      },

      set(val) {
        this.$emit('input', val);
      },
    },
    formFieldProps() {
      const defaultProps = {
        autosize: true,
        rows: 1,
      };
      return { ...defaultProps, ...this.$attrs, ...this.fieldProps };
    },
    fieldProps() {
      return this.props;
    },
    isDisabled() {
      return this.fieldProps.disabled || (this.form || {}).disabled;
    },
    isReadonly() {
      return this.fieldProps.readonly || (this.form || {}).readonly;
    },
  },
};
</script>
<style lang="less" scoped>
.static-text {
  white-space: pre-wrap;
  word-break: break-all;
}
</style>
