<template>
  <div class="calendar">
    <van-field
      readonly
      v-model="currentValue"
      :placeholder="isDisabled ? '' : '点击选择日期'"
      v-bind="formFieldProps"
      :clickable="isDisabled"
      v-on="$listeners"
      @click="showCalendar = !isDisabled"
    />
    <van-calendar
      v-model="showCalendar"
      :min-date="minDateValue"
      :default-date="defaultDate"
      color="#1989fa"
      v-bind="fieldProps"
      v-on="events"
      @confirm="confirm"
    />
  </div>
</template>

<script>
import { formatDate, parseDate } from 'utils/time';

const COMPONENT_NAME = 'i-calendar';
export default {
  name: COMPONENT_NAME,
  inject: ['form'],
  props: {
    value: [String, Number, Date],
    props: {
      type: Object,
      default: () => ({}),
    },
    events: {
      type: Object,
      default: () => ({}),
    },
    beforeConfirm: Function,
    minDate: {
      type: [Number, String, Date],
    },
    defaultDate: {
      type: Date,
      default: () => new Date(),
    },
    // 日期数据类型，默认时间戳
    dateType: {
      type: String,
      default: 'timestamp',
    },
  },
  data() {
    return {
      showCalendar: false,
    };
  },
  computed: {
    currentValue: {
      get() {
        return formatDate(this.value);
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
    minDateValue() {
      let tempDate = this.minDate;
      if (this.minDate && typeof this.minDate === 'string') {
        tempDate = this.minDate.replace(/-/g, '/');
      }
      return tempDate ? new Date(tempDate) : new Date(this.getCurrentYear(), 0, 1);
    },
  },
  methods: {
    // 2021-06-17 zhouyao 修改为获取上一年
    getCurrentYear() {
      return Number(new Date().getFullYear()) - 1;
    },
    async confirm(date) {
      let confirm = true;
      if (this.beforeConfirm) confirm = await this.beforeConfirm(date);
      if (!confirm) return;
      const nextData = this.dateType === 'timestamp' ? parseDate(date) : date;
      this.$emit('input', nextData);
      this.$emit('confirm', nextData);
      this.showCalendar = false;
    },
  },
};
</script>
<style lang="less" scoped></style>
