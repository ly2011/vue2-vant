# Space 间距
> 设置组件之间的间距

## Example

```js
<i-space>
  <van-button
    icon="plus"
    type="primary"
    onClick={() => handleModalVisible(true)}
  >
    新建
  </van-button>
  <van-button icon="search" onClick={handleTriggerSearch}>
    触发查询
  </van-button>
</i-space>
```

## Props

| 参数      | 说明     | 类型                                    | 默认值
| :-------- | :------- | :-------------------------------------- | :----------- |
| align     | 对齐方式 | `start` | `end` |`center` |`baseline`   | -            |
| direction | 间距方向 | `vertical` | `horizontal`               | `horizontal` |
| size      | 间距大小 | `small` | `middle` | `large` | `number` | `small`      |
