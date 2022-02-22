## Example

```vue
<i-action-bar :options="options">

import IActionBar from '@/components/basic/action-bar'
data () {
  return {
    options: [
      {
        // color: '#be99ff',
        type: 'warning',
        text: '加入购物车',
        events: {
          click: () => console.log(111)
        }
      },
      {
        // color: '#7232dd',
        type: 'danger',
        text: '立即购买',
        events: {
          click: () => console.log(222)
        }
      },
      {
        color: '#be99ff',
        type: 'warning',
        text: '加入购物车',
        events: {
          click: () => console.log(333)
        }
      }
    ]
  }
}
```

```vue
import IActionBar from '@/components/basic/action-bar'
import IActionBarButton from '@/components/basic/action-bar/action-bar-button'

<i-action-bar>
  <i-action-bar-button color="#be99ff" type="warning" text="加入购物车" />
  <i-action-bar-button color="#7232dd" type="danger" text="立即购买" />
  <i-action-bar-button type="warning" text="加入购物车" />
  <i-action-bar-button type="danger" text="立即购买" />
</i-action-bar>
```

## API