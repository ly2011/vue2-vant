<template>
  <div>
    <i-form
      ref="form"
      :model="ruleForm"
      :fields="fields"
      :disabled="false"
    >
      <template v-slot:form-bidMembers="{props, events, ...fieldProps}">
        <van-field v-bind="fieldProps">
          <template #input>
            <van-button
              plain
              type="primary"
              size="mini"
              v-bind="props"
              v-on="events"
              @click="openBidMembers"
            >默认按钮</van-button>
          </template>
        </van-field>
      </template>
    </i-form>
    <div style="margin: 16px;">
      <van-button
        round
        block
        type="info"
        @click="submit"
      >
        提交
      </van-button>
    </div>
  </div>
</template>

<script>

export default {
  components: {
  },
  data () {
    return {
      ruleForm: {
        name: '饿了么',
        checkbox: '',
        delivery: false,
        model: '',
        type: [],
        birthday: '',
        hobby: 'sleep',
        stepper: '',
        fileList: [
          { url: 'https://img.yzcdn.cn/vant/leaf.jpg' },
          // Uploader 根据文件后缀来判断是否为图片文件
          // 如果图片 URL 中不包含类型信息，可以添加 isImage 标记来声明
          { url: 'https://cloud-image', isImage: true }
        ]
      }

    }
  },
  computed: {
    fields () {
      const fields = [
        {
          type: 'textarea',
          key: 'name',
          label: '活动名称',
          props: {
            rules: [{ required: true, message: '请填写活动名称' }]
          }
        },
        {
          type: 'checkbox', key: 'checkbox', label: '复选框', props: { shape: 'square' }
        },
        { type: 'switch', key: 'delivery', label: '即时配送' },
        {
          type: 'radio-group',
          key: 'model',
          label: '手机型号',
          // 这里data实际上就是model的值
          hidden: data => data.delivery === true,
          props: {
            direction: 'horizontal',
            options: [{ name: '1', label: 'Iphone', shape: 'square' }, { name: '2', label: '华为 ', shape: 'square' }, { name: '3', label: '小米', shape: 'square' }]
          }
        },
        {
          type: 'checkbox-group',
          key: 'type',
          label: '楼层',
          props: {
            direction: 'horizontal',
            options: [{ name: '1', label: '1楼', shape: 'square' }, { name: '2', label: '2楼 ', shape: 'square' }, { name: '3', label: '3楼', shape: 'square' }]
          }
        },
        {
          type: 'calendar',
          key: 'birthday',
          label: '生日',
          beforeConfirm: () => Promise.resolve(true),
          events: {
            confirm: (date) => { console.log('date: ', date) }
          }
        },
        {
          type: 'area',
          key: 'area',
          label: '城市',
          props: {
            columnsNum: 3
          },
          events: {
            confirm: (val, index) => {
              console.log('城市: ', val, index)
            }
          }
        },
        {
          type: 'picker',
          key: 'dict',
          label: '性别',
          props: {
            options: [{ name: 'male', label: '男' }, { name: 'female', label: '女' }]
          },
          events: {
            confirm: (val, index) => {
              console.log('性别: ', val, index)
            }
          }
        },
        {
          type: 'dropdown',
          key: 'hobby',
          label: '兴趣爱好',
          props: {
            options: [{ name: 'eat', label: '吃饭' }, { name: 'sleep', label: '睡觉' }]
          }
        },
        {
          type: 'stepper',
          key: 'stepper',
          label: '步进器',
          props: { integer: true, max: 99 }
        },
        {
          type: 'uploader',
          key: 'fileList',
          label: '文件预览'
        },
        // slot 方式
        { type: 'slot', key: 'bidMembers', label: '招标小组' },
        // custom 方式
        {
          type: 'custom',
          key: 'supplierList',
          label: '供应商列表',
          component: 'van-button',
          props: {
            plain: true,
            type: 'primary',
            size: 'small',
            text: '查看'
          },
          events: {
            click: () => {
              console.log('我已查看')
            }
          }
        }
      ]
      return fields
    }
  },
  methods: {
    async submit () {
      const formRef = this.$refs.form
      if (formRef) {
        formRef.validate().then(() => {
          this.$toast('提交成功: ')
          console.log(this.ruleForm)
        }).catch((err) => {
          console.error('提交失败: ', err)
        })
      }
    },
    openBidMembers () {}
  }
}
</script>
