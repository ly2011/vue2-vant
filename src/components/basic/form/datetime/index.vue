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
    <van-popup v-model="show" round position="bottom" get-container="#app">
      <van-datetime-picker
        :title="pickerTitle"
        show-toolbar
        v-bind="fieldProps"
        v-on="events"
        @cancel="show = false"
        @confirm="onConfirm"
      />
    </van-popup>
  </div>
</template>

<script>
import { formatDate, parseDate } from 'utils/time';

const COMPONENT_NAME = 'i-datetime';

export default {
  name: COMPONENT_NAME,
  inject: ['form'],
  props: {
    value: [String, Number, Object],
    props: {
      type: Object,
      default: () => ({}),
    },
    events: {
      type: Object,
      default: () => ({}),
    },
    // 日期数据类型，默认时间戳
    dateType: {
      type: String,
      default: 'timestamp',
    },
    beforeConfirm: Function,
    // 打开弹窗前
    beforeOpen: Function,
  },
  data() {
    return {
      show: false,
    };
  },
  computed: {
    currentValue: {
      get() {
        return formatDate(this.value, 'YYYY-MM');
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
    clearable() {
      return this.fieldProps.clearable ?? true;
    },
    pickerTitle() {
      return this.fieldProps.title || this.formFieldProps.placeholder || this.fieldProps.label;
    },
  },
  methods: {
    showSelector() {
      if (this.beforeOpen && !this.beforeOpen()) return false;
      if (this.isDisabled) return false;
      this.show = true;
    },
    async onConfirm(date) {
      let confirm = true;
      if (this.beforeConfirm) confirm = await this.beforeConfirm(date);
      if (!confirm) return;
      const nextData = this.dateType === 'timestamp' ? parseDate(date) : date;
      this.$emit('input', nextData);
      this.$emit('confirm', nextData);
      this.show = false;
    },
    onClear() {
      this.$emit('input', '');
      this.$emit('clear');
    },
  },
};
</script>
