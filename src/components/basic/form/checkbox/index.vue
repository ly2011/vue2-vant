<template>
  <van-field
    readonly
    v-bind="formFieldProps"
    v-on="$listeners"
  >
    <template #input>
      <van-checkbox
        v-model="currentValue"
        v-bind="fieldProps"
        :disabled="isDisabled"
        v-on="events"
      />
    </template>
  </van-field>
</template>

<script>
const COMPONENT_NAME = 'i-checkbox'
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
        return this.value
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
    }
  }
}
</script>
