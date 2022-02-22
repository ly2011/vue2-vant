<template>
  <div class="area">
    <van-field
      readonly
      :clickable="isDisabled"
      v-model="formValueModel"
      v-bind="formFieldProps"
      v-on="$listeners"
      :right-icon="!isDisabled && currentValue ? 'cross' : ''"
      @click-input="showSelector()"
      @click-right-icon="onClear"
    />
    <van-popup
      v-model="show"
      position="bottom"
      :safe-area-inset-bottom="true"
    >
      <van-area
        ref="area"
        :area-list="areaList"
        :columns-num="columnsNum"
        :value="currentValue"
        :columns-placeholder="columnsPlaceholder"
        v-bind="fieldProps"
        v-on="events"
        @confirm="onConfirm"
        @cancel="show = false"
      />
    </van-popup>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { isObject } from 'lodash'

const COMPONENT_NAME = 'i-area'
export default {
  name: COMPONENT_NAME,
  inject: ['form'],
  props: {
    value: [String, Number, Object],
    props: {
      type: Object,
      default: () => ({})
    },
    events: {
      type: Object,
      default: () => ({})
    },
    // 打开弹窗前
    beforeOpen: Function,
    // 确认前回调
    beforeConfirm: Function
  },
  data () {
    return {
      show: false
    }
  },
  computed: {
    ...mapGetters({
      areaList: 'normalizeallArea'
    }),
    placeholder () {
      const placeholderSuffix = {
        1: '省',
        2: '省市',
        3: '省市县'
      }
      const placeholder = `请选择${placeholderSuffix[this.columnsNum] || ''}`
      return placeholder
    },
    columnsPlaceholder () {
      return this.showPlaceholder ? Array.from(new Array(this.columnsNum), () => '请选择') : []
    },
    formValueModel: {
      get () {
        return isObject(this.value) ? this.value?.name : this.formFieldProps?.value
      }
    },
    currentValue: {
      get () {
        return isObject(this.value) ? this.value?.code : this.value
      },
      set (val) {
        this.$emit('input', val)
      }
    },
    formFieldProps () {
      return this.$attrs
    },
    fieldProps () {
      return this.props
    },
    isDisabled () {
      return this.fieldProps.disabled || (this.form || {}).disabled
    },
    columnsNum () {
      return this.props?.columnsNum || 3
    }
  },
  watch: {
    value: {
      handler (val) {
        console.log(val)
      },
      immediate: true
    }
  },
  methods: {
    showSelector () {
      if (this.beforeOpen && !this.beforeOpen()) return false
      if (this.isDisabled) return false
      this.show = true
    },
    onConfirm (values, index) {
      if (this.beforeConfirm && !this.beforeConfirm(values, index)) return false
      const lastValue = values[values.length - 1]
      this.$emit('input', lastValue, values, index)
      this.$emit('confirm', values, index)
      this.show = false
    },
    // confirm (values) {
    //   if (this.beforeConfirm && !this.beforeConfirm()) return false
    //   const lastValue = values[values.length - 1]
    //   if (!lastValue) {
    //     this.$toast(this.placeholder)
    //   } else {
    //     this.$emit('confirm', values)
    //     this.showArea = false
    //   }
    // },
    onClear () {
      this.$emit('input', '')
      this.$emit('clear')
    }
  }
}
</script>

<style lang="less" scoped>
</style>
