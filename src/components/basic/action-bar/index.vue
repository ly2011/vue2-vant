<script>
import { GoodsAction } from 'vant';
import IActionBarButton from './action-bar-button';

const COMPONENT_NAME = 'i-action-bar';
export default {
  name: COMPONENT_NAME,
  components: {
    GoodsAction,
    IActionBarButton,
  },
  props: {
    safeAreaInsetBottom: Boolean,
    options: Array,
  },
  methods: {
    renderChild() {
      const { options } = this;
      if (!options && !this.$slots.default) return null;
      if (Array.isArray(options)) {
        return options?.map((item, index) => {
          const { events, ...restProps } = item;
          return (
            <i-action-bar-button key={index} {...{ props: restProps }} {...{ attrs: restProps }} {...{ on: events }} />
          );
        });
      }
      return this.$slots.default;
    },
  },
  render() {
    const { safeAreaInsetBottom } = this;
    return <van-goods-action safeAreaInsetBottom={safeAreaInsetBottom}>{this.renderChild()}</van-goods-action>;
  },
};
</script>
