<template>
  <div class="area">
    <van-field
      readonly
      :clickable="isDisabled && !readonly"
      v-model="formValueModel"
      v-bind="formFieldProps"
      v-on="$listeners"
      :right-icon="!isDisabled && !readonly && currentValue ? 'cross' : ''"
      @click-input="showSelector()"
      @click-right-icon="onClear"
    />
    <van-popup
      v-model="show"
      position="bottom"
      :safe-area-inset-bottom="true"
    >
      <van-cascader
        ref="area"
        v-model="currentValue"
        title="请选择所在地区"
        :options="options"
        v-bind="fieldProps"
        v-on="events"
        :field-names="fieldNames"
        @close="onConfirm"
        @change="onChange"
      />
    </van-popup>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { isObject } from 'lodash'
import request from '@/utils/request'

const getAreaByParentId = () => Promise.resolve()

const COMPONENT_NAME = 'i-area'

function getAreaData (options, selectedOptions) {
  for (let i = 0; i < selectedOptions.length; i++) {
    const selectItem = selectedOptions[i]
    for (let j = 0; j < options.length; j++) {
      const area = options[j]
      if (selectItem.areaCode === area.areaCode) {
        area.children = selectItem.children
      }
    }
  }
  return options
}

export default {
  name: COMPONENT_NAME,
  inject: ['form'],
  props: {
    value: [String, Number, Object],
    readonly: Boolean,
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
  computed: {
    ...mapGetters({
      selectedUserAuthRole: 'selectedUserAuthRole'
    }),
    appMark () {
      return this.selectedUserAuthRole?.appMark || null
    },
    formValueModel: {
      get () {
        return isObject(this.value) ? this.value?.name : (this.formFieldProps?.value || this.value)
      }
    },
    currentValue: {
      get () {
        return isObject(this.value) ? this.value?.areaCode : this.value
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
    propsLevel () {
      return this.columnsNum || this.props?.columnsNum || 3
    },
    placeholder () {
      const placeholderSuffix = {
        1: '省',
        2: '省市',
        3: '省市县'
      }
      const placeholder = `请选择${placeholderSuffix[this.propsLevel] || ''}`
      return placeholder
    }
  },
  data () {
    return {
      show: false,
      options: [],
      fieldNames: {
        text: 'areaName',
        value: 'areaCode'
      },
      selectedOptions: [],
      tabIndex: 0
    }
  },
  created () {
    this.getOptions()
  },
  methods: {
    getOptions (parentId = 10001, level = 1, selectedOptions) {
      const that = this
      const { options, propsLevel } = this
      const params = {
        parentId, // 父区域ID  -1为根节点ID
        level // 地区级别（0:国家，1:省份province,2:市city,3:区县district,4:街道street）
      }
      this.$toast.loading('加载中')
      request.get(getAreaByParentId, { params }).then(res => {
        const { data: { data: list, code } } = res
        const data = list.filter(x => (!['其他', '其它'].includes(x.areaName)))
        if (code === 0) {
          data.map(x => {
            x.children = params.level < propsLevel ? [] : null
            x.name = x.areaName
            x.code = x.areaCode
            return x
          })
          if (params.level === 1) {
            this.options = data
          } else {
            selectedOptions[selectedOptions.length - 1].children = data
            that.options = getAreaData(options, selectedOptions)
          }
        }
      }).finally(() => {
        this.$toast.clear()
      })
    },
    onChange ({ value, selectedOptions, tabIndex }) {
      console.log(value, selectedOptions, tabIndex)
      if (selectedOptions && selectedOptions.length) {
        const { level, id } = selectedOptions[selectedOptions.length - 1]
        this.selectedOptions = selectedOptions
        this.tabIndex = tabIndex
        // this.currentValue = areaCode
        if (level < this.propsLevel) {
          this.getOptions(id, level + 1, selectedOptions)
        } else {
          this.onConfirm()
        }
      }
    },
    showSelector () {
      if (this.beforeOpen && !this.beforeOpen()) return false
      if (this.isDisabled || this.readonly) return false
      this.show = true
    },
    onConfirm () {
      const {
        selectedOptions: values,
        tabIndex: index,
        propsLevel,
        placeholder
      } = this
      if (this.beforeConfirm && !this.beforeConfirm(values, index)) return false
      if (values.length === propsLevel) {
        const lastValue = {
          ...values[values.length - 1],
          name: values.map(x => x.areaName).join('/')
        }
        this.$emit('input', lastValue, values, index)
        console.log(this.events)
        this.$emit('confirm', values, index)
        if (this.events?.confirm) this.events.confirm(values)
        this.show = false
      } else {
        this.$toast(`请选择${placeholder}`)
      }
    },
    onClear () {
      this.$emit('input', '')
      this.$emit('clear')
    }
  }
}
</script>

<style lang="less" scoped>
</style>
