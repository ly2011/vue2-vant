# 表格组件

## API

|方法名 | 说明 | 类型 | 默认值 | 必输 |
|--- | --- | --- | --- | ---
|title  |  表格标题  |  string  |  -  |  是
|dataIndex  |  列表中的name  |  string  |  -  |  是
|key  |  列表中的key  |  string  |  -  |  否
|width  |  列宽度  |  string | number  |  是
|formatter | 用来格式化内容 | function | - | 否

## 案例

```vue
<template>
  <i-table :columns="columns" :data="data" />
</template>

<script>
export const columns = [
  {
    title: '标题', dataIndex: 'title', key: 'title', width: 120
  },
  {
    title: '作者', dataIndex: 'author.loginname', key: 'author.loginname', width: 120
  },
  {
    title: '精华', dataIndex: 'good', key: 'good', width: 120
  },
  {
    title: '置顶', dataIndex: 'top', key: 'top', width: 120
  },
  {
    title: '阅读数', dataIndex: 'visit_count', key: 'visit_count', width: 120
  },
  {
    title: '回复数', dataIndex: 'reply_count', key: 'reply_count', width: 120
  },
  {
    title: '创建日期', dataIndex: 'create_at', key: 'create_at', width: 120
  },
]
export default {
  name: 'topic-list',
  props: {
    data: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      columns
    }
  }
}
</script>
```
