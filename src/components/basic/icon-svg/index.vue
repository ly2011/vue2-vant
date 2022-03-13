<template>
  <svg class="svg-icon" aria-hidden="true">
    <use :xlink:href="iconName"></use>
  </svg>
</template>

<script>
const COMPONENT_NAME = 'i-icon-svg';
export default {
  name: COMPONENT_NAME,
  props: {
    iconClass: {
      type: String,
      required: true,
    },
  },
  computed: {
    iconName() {
      return `#icon-${this.iconClass}`;
    },
  },
};
</script>

<style>
.svg-icon {
  width: 80px;
  height: 80px;
  vertical-align: middle;
  fill: currentColor;
  overflow: hidden;
}
</style>
