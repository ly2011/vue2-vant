<template>
  <van-popup v-model="show" round position="bottom" :style="{ height: '30%' }" />
</template>
<script>
import { defineComponent, computed } from '@vue/composition-api';

export default defineComponent({
  props: {
    value: [String, Number, Boolean],
  },
  setup(props, { emit }) {
    const show = computed({
      get() {
        return props.value;
      },
      set(val) {
        emit('input', val);
      },
    });

    return {
      show,
    };
  },
});
</script>
