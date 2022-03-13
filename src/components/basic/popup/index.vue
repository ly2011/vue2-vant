<template>
  <van-popup
    v-model="currentValue"
    :round="round"
    :position="position"
    :safe-area-inset-bottom="safeAreaInsetBottom"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <div class="van-picker">
      <div v-if="showToolbar" class="van-picker__toolbar">
        <button type="button" class="van-picker__cancel" @click="cancel">{{ cancelButtonText }}</button>
        <div class="van-ellipsis van-picker__title">{{ title }}</div>
        <button type="button" class="van-picker__confirm" @click="confirm">{{ confirmButtonText }}</button>
      </div>
      <div class="picker-content">
        <slot />
      </div>
    </div>
  </van-popup>
</template>

<script>
const COMPONENT_NAME = 'i-popup';
export default {
  name: COMPONENT_NAME,
  props: {
    value: { type: Boolean, default: false },
    title: String,
    loading: Boolean,
    showToolbar: { type: Boolean, default: true },
    round: { type: Boolean, default: true },
    position: { type: String, default: 'bottom' },
    cancelButtonText: { type: String, default: '取消' },
    confirmButtonText: { type: String, default: '确认' },
    safeAreaInsetBottom: { type: Boolean, default: true },
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
  },
  methods: {
    confirm() {
      this.$emit('confirm');
    },

    cancel() {
      this.$emit('cancel');
    },
  },
};
</script>
