<template>
  <div class="area">
    <van-field
      readonly
      :clickable="isDisabled && !readonly"
      v-model="formValueModel"
      v-bind="formFieldProps"
      v-on="$listeners"
      :right-icon="!isDisabled && !readonly && currentValue ? 'cross' : ''"
      @click-input="showSelector()"
      @click-right-icon="onClear"
    />
    <van-popup v-model="show" position="bottom" :safe-area-inset-bottom="true">
      <van-cascader
        ref="area"
        v-model="currentValue"
        title="请选择所在地区"
        :options="options"
        v-bind="fieldProps"
        v-on="events"
        :field-names="fieldNames"
        @close="onConfirm"
        @change="onChange"
      />
    </van-popup>
  </div>
</template>

<script>
import { isObject } from 'lodash';
import { normalizeData } from './treeAreaData';

const COMPONENT_NAME = 'i-area';

export default {
  name: COMPONENT_NAME,
  inject: ['form'],
  props: {
    value: [String, Number, Object],
    readonly: Boolean,
    props: {
      type: Object,
      default: () => ({}),
    },
    events: {
      type: Object,
      default: () => ({}),
    },
    // 打开弹窗前
    beforeOpen: Function,
    // 确认前回调
    beforeConfirm: Function,
  },
  computed: {
    formValueModel: {
      get() {
        return isObject(this.value) ? this.value?.name : this.formFieldProps?.value || this.value;
      },
    },
    currentValue: {
      get() {
        return isObject(this.value) ? this.value?.areaCode : this.value;
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
    propsLevel() {
      return this.columnsNum || this.props?.columnsNum || 3;
    },
    placeholder() {
      const placeholderSuffix = {
        1: '省',
        2: '省市',
        3: '省市县',
      };
      return `请选择${placeholderSuffix[this.propsLevel] || ''}`;
    },
  },
  data() {
    return {
      show: false,
      options: [],
      fieldNames: {
        text: 'areaName',
        value: 'areaCode',
        children: 'children',
      },
      selectedOptions: [],
      tabIndex: 0,
    };
  },
  created() {
    this.getOptions();
  },
  methods: {
    getOptions() {
      const newOptions = normalizeData(undefined, this.fieldNames);
      this.options = newOptions;
    },
    // eslint-disable-next-line no-unused-vars
    onChange({ value, selectedOptions, tabIndex }) {
      // console.log(value, selectedOptions, tabIndex)
      if (selectedOptions && selectedOptions.length) {
        // eslint-disable-next-line no-unused-vars
        const { level, id } = selectedOptions[selectedOptions.length - 1];
        this.selectedOptions = selectedOptions;
        this.tabIndex = tabIndex;
        // this.currentValue = areaCode
        if (level < this.propsLevel) {
          // this.getOptions(id, level + 1, selectedOptions)
        } else {
          this.onConfirm();
        }
      }
    },
    showSelector() {
      if (this.beforeOpen && !this.beforeOpen()) return false;
      if (this.isDisabled || this.readonly) return false;
      this.show = true;
    },
    onConfirm() {
      const { selectedOptions: values, tabIndex: index, propsLevel, placeholder } = this;
      if (this.beforeConfirm && !this.beforeConfirm(values, index)) return false;
      if (values.length === propsLevel) {
        const lastValue = {
          ...values[values.length - 1],
          name: values.map(x => x[this.fieldNames.text]).join('/'),
        };
        this.$emit('input', lastValue, values, index);
        this.$emit('confirm', values, index);
        if (this.events?.confirm) this.events.confirm(values, index);
        this.show = false;
      } else {
        this.$toast(`请选择${placeholder}`);
      }
    },
    onClear() {
      this.$emit('input', '');
      this.$emit('clear');
    },
  },
};
</script>

<style lang="less" scoped></style>
