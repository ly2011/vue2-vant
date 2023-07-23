import { getDictLabel } from 'utils/dict.js';
import { mapGetters } from 'vuex';
import * as echarts from 'echarts';
import _ from 'lodash';

export const dictMixin = {
  computed: {
    ...mapGetters({
      btnAuthList: 'getBtnAuths',
    }),
  },
  filters: {
    dictFilter: (value, field) => getDictLabel(field, value),
  },
  methods: {
    // 权限按钮
    getBtnAuth(btnCode) {
      if (!btnCode) return false;
      const actionCodes = this.btnAuthList;
      return actionCodes.some(x => x.menuCode === btnCode);
    },
  },
};

export const echartsMixin = {
  data() {
    return {
      showFlag: true,
    };
  },
  computed: {
    /*  图表DOM  */
    $_chartMixin_chartWrapperDom() {
      const dom = document.getElementById(this.echartsId);
      return dom && echarts.init(dom);
    },
    // 图表resize节流，这里使用了lodash，也可以自己使用setTimout实现节流
    $_chartMixin_chartResize() {
      return _.throttle(() => this.$_chartMixin_chartWrapperDom.resize(), 400);
    },
  },
  methods: {
    $_chartMixin_init(options) {
      if (this.$_chartMixin_chartWrapperDom) {
        const that = this;
        this.$_chartMixin_chartWrapperDom.clear(); // 清空表格
        this.$_chartMixin_chartWrapperDom.showLoading(); // 显示加载动画
        this.$_chartMixin_chartWrapperDom.setOption(options);
        window.addEventListener('resize', this.$_chartMixin_chartResize);
        this.$on('hook:destroyed', () => {
          window.removeEventListener('resize', this.$_chartMixin_chartResize);
        });
        this.$_chartMixin_chartWrapperDom.on('rendered', () => {
          that.$_chartMixin_chartWrapperDom.hideLoading();
        });
      }
    },
  },
};
