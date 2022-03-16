<template>
  <div class="box">
    <h3>msg: {{ msg }}</h3>
    <p>count: {{ count }}</p>
    <p>double: {{ double }}</p>
    <p>
      <van-button type="primary" size="small" @click="increment">+1</van-button>
      <van-button type="danger" size="small" @click="decrease">-1</van-button>
    </p>
  </div>
</template>
<script setup>
import { ref, computed, watch } from '@vue/composition-api';

/* eslint-disable no-undef */
defineProps({ msg: { type: String, default: 'hello' } });
/* eslint-enable no-undef */
// eslint-disable-next-line no-undef
const emit = defineEmits(['update']);
const count = ref(0);
const double = computed(() => count.value * 2);
const increment = () => count.value++;
const decrease = () => count.value--;
watch(count, value => emit('update', value));
</script>
