<template>
  <div>
    <!-- 定制组件 -->
    <component
      v-if="field.type === 'custom'"
      :is="componentName"
      v-model="modelValue"
      :placeholder="getPlaceholder(field)"
      :componentName="field.component"
      v-bind="field"
    />
    <!-- 非定制化组件 -->
    <component v-else :is="componentName" v-model="modelValue" :placeholder="getPlaceholder(field)" v-bind="field" />
  </div>
</template>

<script>
import components from './components';

const COMPONENT_NAME = 'i-form-item';
export default {
  name: COMPONENT_NAME,
  provide() {
    return {
      formItem: this,
    };
  },
  inject: ['form'],
  props: {
    field: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    const key = this.field.key;
    const modelValue = key ? this.form?.model[key] : null;
    return {
      modelValue,
      customFieldType: 'custom',
      simpleFieldTypes: ['input', 'password', 'textarea', 'tel', 'digit', 'number'],
    };
  },
  computed: {
    modelVal() {
      const key = this.field.key;
      return key ? this.form.model[key] : null;
    },
    componentName() {
      const { customFieldType, simpleFieldTypes, field } = this;
      // const component = field.component
      // if (component) {
      //   return component
      // }
      const type = field.type;
      const compType = `i-${type}`;
      if (type === customFieldType) {
        return 'i-form-component-custom';
      }
      if (simpleFieldTypes.includes(type)) {
        return 'i-input';
      }
      if (components[compType]) {
        return compType;
      }
      return type;
    },
    isDisabled() {
      return this.field?.props?.disabled || (this.form || {}).disabled;
    },
  },
  watch: {
    modelVal(newModel) {
      if (this.modelValue !== newModel) {
        this.modelValue = newModel;
      }
    },
    modelValue: {
      handler(newModel) {
        const key = this.field.key;
        // update form model
        // if (key) this.form?.model[key] = newModel
        if (key) this.$set(this.form?.model, key, newModel);
        this.resetValidation(key);
      },
      sync: true,
      deep: true,
    },
  },
  methods: {
    getPlaceholder(row) {
      if (this.isDisabled) return '';
      if (row?.placeholder) return row?.placeholder;
      if (row?.props?.placeholder) return row?.props?.placeholder;
      const simpleFieldTypes = this.simpleFieldTypes;
      const selectTypes = ['dropdown', 'datetime', 'calendar', 'picker'];
      let placeholder;
      if (simpleFieldTypes.includes(row.type)) {
        placeholder = `请输入${row.label}`;
      } else if (selectTypes.includes(row.type)) {
        placeholder = `点击选择${row.label}`;
      } else {
        placeholder = row.label;
      }
      return placeholder;
    },
    resetValidation(key) {
      const formRef = this.form?.$refs?.form;
      if (formRef) formRef.resetValidation(key);
    },
  },
};
</script>
