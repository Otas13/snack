# snack
Simple lightweight react based notifications with animation

```javascript
import Container from './item';
let myToasts = [
    {close: "auto", closeButton: true, type: "warning", content: "abc", time: 3000}
]

<Container theme="light"  items={myToasts} />

...another element
    import Snack from './test';
    Snack({close: "auto", time: 3000, type: "info", content: "hello from testElem"});
```

##### container props
```
    optional theme dark | light
```

##### snack settings

| Name          | Values                    |
| ------------- | ------------------------  |
| close         | auto | require            |
| closeButton   | true | false              |
| type          | info | warning | error    |
| content       | string                    |
| time          | milliseconds              |

