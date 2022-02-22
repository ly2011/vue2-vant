<template>
  <div class="picker">
    <van-field
      readonly
      :clickable="isDisabled"
      v-model="currentValue"
      v-bind="formFieldProps"
      v-on="$listeners"
      :right-icon="!isDisabled && currentValue && clearable ? 'cross' : ''"
      @click-input="showSelector()"
      @click-right-icon="onClear"
    />
    <van-popup
      v-model="show"
      round
      position="bottom"
      get-container="#app"
    >
      <van-picker
        :title="pickerTitle"
        show-toolbar
        v-bind="fieldProps"
        :columns="columns"
        v-on="events"
        @cancel="show = false"
        @confirm="onConfirm"
      />
    </van-popup>
  </div>
</template>

<script>
const COMPONENT_NAME = 'i-picker'
export default {
  name: COMPONENT_NAME,
  inject: ['form'],
  props: {
    value: [String, Number, Object],
    props: {
      type: Object,
      default: () => ({})
    },
    events: {
      type: Object,
      default: () => ({})
    },
    // 打开弹窗前
    beforeOpen: Function
  },
  data () {
    return {
      show: false
    }
  },
  computed: {
    initShow () {
      return this.props.initShow || false
    },
    currentValue: {
      get () {
        if (!this.value) return ''
        if (!this.columns.length) return ''
        const column = this.columns.find(item => item.value === this.value)
        return column ? column.text : ''
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
    clearable () {
      return this.fieldProps.clearable ?? true
    },
    columns () {
      // 若配置了 columns 属性，则直接返回
      if (this.fieldProps.columns) return this.fieldProps.columns
      const options = this.fieldProps.options || []
      const columns = options.map(item => ({
        text: item.label,
        value: item.name,
        ...item,
        disabled: item.disabled
      }))
      return columns
    },
    pickerTitle () {
      return this.fieldProps.title || this.formFieldProps.placeholder || this.fieldProps.label
    }
  },
  watch: {
    initShow (val) {
      console.log(val)
      this.show = val
    }
  },
  methods: {
    showSelector () {
      if (this.beforeOpen && !this.beforeOpen()) return false
      if (this.isDisabled) return false
      this.show = true
    },
    onConfirm (value) {
      this.$emit('input', value.value)
      this.$emit('confirm', value.value, value)
      this.show = false
    },
    onClear () {
      this.$emit('input', '')
      this.$emit('clear')
    }
  }
}
</script>
