<template>
  <van-field readonly v-bind="formFieldProps" :disabled="isDisabled" v-on="$listeners">
    <template #input>
      <van-checkbox-group v-model="currentValue" v-bind="fieldProps" :disabled="isDisabled" v-on="events">
        <van-checkbox v-for="(item, index) in props.options" :key="index" v-bind="item" v-on="item.events">{{
          item.label
        }}</van-checkbox>
      </van-checkbox-group>
    </template>
  </van-field>
</template>

<script>
const COMPONENT_NAME = 'i-checkbox-group';
export default {
  name: COMPONENT_NAME,
  inject: ['form'],
  props: {
    value: Array,
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
      return this.$attrs;
    },
    fieldProps() {
      return this.props;
    },
    isDisabled() {
      return this.fieldProps.disabled || (this.form || {}).disabled;
    },
  },
};
</script>
