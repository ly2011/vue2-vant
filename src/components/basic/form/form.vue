<template>
  <div class="form">
    <van-form
      :label-width="labelWidth"
      :scroll-to-error="scrollToError"
      :show-error="showError"
      @failed="onFailed"
      @submit="onSubmit"
      :colon="colon"
      :input-align="inputAlign"
      ref="form"
    >
      <van-cell-group
        :key="item.key || index"
        v-for="(item, index) in fieldList"
        :border="false"
        class="van-hairline--bottom"
      >
        <!--slot-->
        <template v-if="item.type === 'slot'">
          <slot :name="'form-' + item.key" v-bind="item" />
        </template>
        <!-- 其他组件 -->
        <i-form-item v-else :field="item" />
      </van-cell-group>
    </van-form>
  </div>
</template>

<script>
import { isFunction } from 'lodash';
import IFormItem from './form-item.vue';

const COMPONENT_NAME = 'i-form';
export default {
  name: COMPONENT_NAME,
  components: {
    IFormItem,
  },
  provide() {
    return {
      form: this,
    };
  },
  props: {
    model: {
      type: Object,
      default: () => ({}),
    },
    fields: {
      type: Array,
      default: () => [],
    },
    labelWidth: {
      type: [String, Number],
      default: '6.2em',
    },
    showError: {
      type: Boolean,
      default: false,
    },
    scrollToError: {
      type: Boolean,
      default: true,
    },
    colon: {
      type: Boolean,
      default: true,
    },
    inputAlign: {
      type: String,
      default: 'left',
    },
    disabled: Boolean,
  },
  computed: {
    fieldList() {
      return this.fields.filter(item => {
        return isFunction(item.hidden) ? !item.hidden(this.model) : !item.hidden;
      });
    },
  },
  methods: {
    validate() {
      const formRef = this.$refs.form;
      if (formRef && formRef.validate) {
        return formRef.validate();
      }
    },
    resetValidation() {
      const formRef = this.$refs.form;
      if (formRef && formRef.validate) {
        return formRef.resetValidation();
      }
    },
    onSubmit() {
      this.$emit('submit');
    },
    onFailed() {
      this.$emit('failed');
    },
  },
};
</script>
