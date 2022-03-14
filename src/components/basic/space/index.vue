<script>
import { omit } from 'lodash';

const spaceSize = {
  small: 8,
  middle: 16,
  large: 24,
};

const COMPONENT_NAME = 'i-space';
const prefixCls = COMPONENT_NAME;
export default {
  name: COMPONENT_NAME,
  props: {
    // 间距大小
    size: {
      type: String,
      default: 'small',
    },
    // 对齐方式
    align: String,
    // 间距方向
    direction: {
      type: String,
      default: 'horizontal',
    },
    className: String,
  },
  computed: {
    mergedAlign() {
      const { align, direction } = this;
      return align === undefined && direction === 'horizontal' ? 'center' : align;
    },
    spaceClassName() {
      const { direction, className, mergedAlign } = this;
      return {
        [prefixCls]: true,
        [`${prefixCls}-${direction}`]: true,
        [`${prefixCls}-rtl`]: direction === 'rtl',
        [`${prefixCls}-align-${mergedAlign}`]: mergedAlign,
        [className]: !!className,
      };
    },
    itemClassName() {
      return `${prefixCls}-item`;
    },
    marginDirection() {
      const { direction } = this;
      return direction === 'rtl' ? 'marginLeft' : 'marginRight';
    },
    otherProps() {
      return omit(this.$props, ['size', 'align', 'className', 'direction']);
    },
    items() {
      if (!this.$slots.default) return null;
      const items = this.$slots.default.filter(Boolean);
      const len = items.length;

      if (len === 0) {
        return null;
      }
      return items;
    },
    len() {
      const { items } = this;
      if (!Array.isArray(items)) return 0;
      return items.length;
    },
  },
  render() {
    const { spaceClassName, items, len, itemClassName, direction, size, marginDirection, otherProps } = this;

    return (
      <div class={spaceClassName} {...otherProps}>
        {items?.map((child, i) => (
          <div
            className={itemClassName}
            key={`${itemClassName}-${i}`}
            style={
              i === len - 1
                ? {}
                : {
                    [direction === 'vertical' ? 'marginBottom' : marginDirection]:
                      typeof size === 'string' ? `${spaceSize[size]}px` : `${size}px`,
                  }
            }
          >
            {child}
          </div>
        ))}
      </div>
    );
  },
};
</script>
<style lang="less" scoped>
.i-space {
  display: inline-flex;
  &-vertical {
    flex-direction: column;
  }

  &-align {
    &-center {
      align-items: center;
    }
    &-start {
      align-items: flex-start;
    }
    &-end {
      align-items: flex-end;
    }
    &-baseline {
      align-items: baseline;
    }
  }

  &-rtl {
    direction: rtl;
  }
}
</style>
