<script>
import { GoodsActionButton } from 'vant'

const COMPONENT_NAME = 'i-action-bar-button'
export default {
  name: COMPONENT_NAME,
  components: {
    GoodsActionButton
  },
  render () {
    return <van-goods-action-button {...{ props: { ...this.$attrs } }} {...{ on: this.$listeners }} />
  }
}
</script>
<style lang="less">
@import '~vant/lib/style/var.less';

.van-goods-action-button {
  &--warning {
    background: @button-warning-background-color;
  }

  &--danger {
    background: @button-danger-background-color;
  }
}
</style>
