<template>
  <van-field readonly v-bind="formFieldProps" v-on="$listeners">
    <template #input>
      <van-radio-group v-model="currentValue" v-bind="fieldProps" :disabled="isDisabled" v-on="events">
        <van-radio v-for="(item, index) in props.options" :key="index" v-bind="item" v-on="item.events">{{
          item.label
        }}</van-radio>
      </van-radio-group>
    </template>
  </van-field>
</template>

<script>
const COMPONENT_NAME = 'i-radio-group';
export default {
  name: COMPONENT_NAME,
  inject: ['form'],
  props: {
    value: [String, Number, Boolean],
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
