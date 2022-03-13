<template>
  <div>
    <div class="lds-ball">
      <div></div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
@keyframes lds-ball {
  0%,
  100% {
    animation-timing-function: cubic-bezier(0.45, 0, 0.9, 0.55);
  }
  0% {
    transform: translate(0, 0);
  }
  50% {
    transform: translate(0, 108px);
    animation-timing-function: cubic-bezier(0, 0.45, 0.55, 0.9);
  }
  100% {
    transform: translate(0, 0);
  }
}

.lds-ball {
  position: fixed;
  left: 50%;
  top: 30%;
  transform: translateX(-50%);
  div {
    width: 52px;
    height: 52px;
    border-radius: 50%;
    background: #e15b64;
    animation: lds-ball 1s linear infinite;
  }
}
</style>
