<template>
  <div class="box">
    <p>text: {{ text }}</p>
    <van-button size="small" @click="updateText">updateText</van-button>
  </div>
</template>
<script>
import { defineComponent, toRefs } from '@vue/composition-api';
import { uniqueId } from 'lodash';

export default defineComponent({
  name: 'hello-world',
  props: {
    value: {
      type: String,
      default: 'Hello World',
    },
  },
  setup(props, { emit }) {
    const { value: text } = toRefs(props);
    const updateText = () => {
      emit('input', 'Hello ' + uniqueId());
    };
    return {
      text,
      updateText,
    };
  },
});
</script>
