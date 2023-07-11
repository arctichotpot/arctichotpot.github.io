

# 来写一个基于 Vue3 的全屏拖拽上传组件

文件源码在文章最后

## 知识点

- 浏览器拖拽 api
- fetch 请求
- vue3

说来话长,长话短说,关于 html5 的拖拽 api 也只是做过一些拖拽排序的例子.其实思路上与其他拖拽上传组件基本一样,都是指定一个区域可拖拽,然后读取文件在上传

先说说拖拽 api,这个是 html5 新增的一个 api,给一个元素设置 draggable = true 属性时,该元素就会支持拖拽
拖拽元素事件如下

```sh
1. ondrag 当拖动元素的时候运行脚本
2. ondragstart 当拖动操作开始时候运行脚本
3. ondragend 当拖动操作结束的时候运行脚本
```

目标元素的事件如下：

```sh
1. ondragover 当元素被拖动至有效拖放目标上方时执行脚本
2. ondragenter 当元素被拖动至有效拖动目标时执行脚本
3. ondragleave 当元素离开至有效拖放目标是运行脚本
4. ondrop 当被拖动元素正在被放下的时候运行脚本
```

比如我们想监听 body 的拖拽:

```javascript
const ele = document.querySelector('body')
ele.addEventListener('dragenter', (e) => {
  // do something
})
```

而当我们想要阻止默认事件的时候我们可以用 `e.preventDefault() `

## 组件

先看一下效果,此时我这里是设置的仅能上传 png 与 jpg

![upload.gif](/js/vue3-upload.gif)
使用:

```javascript
    <upload
      accept=".jpg,.png,.ico" // 设置文件类型
      @onChange="change" // 文件上传事件
      action="http://localhost:3001/upload" // 上传地址
      :header="header" // 上传的header
      autoUpload // 是否自动上传
      name="file"// 上传的字段名
      @onSuccess="onSuccess"  // 上传成功回调
    ></upload>
```

最开始的时候我想获取拖拽元素的时候莫名发现尽管加了监听事件,可还是会打开新的窗口去预览文件,所以我们第一步就是先把默认事件都给禁用掉

```javascript
// 禁用默认拖拽事件
function disableDefaultEvents() {
  const doc = document.documentElement
  doc.addEventListener('dragleave', (e) => e.preventDefault()) //拖离
  doc.addEventListener('drop', (e) => e.preventDefault()) //拖后放
  doc.addEventListener('dragenter', (e) => e.preventDefault()) //拖进
  doc.addEventListener('dragover', (e) => e.preventDefault()) //拖来拖去
}
```

直接获取根元素,阻止拖拽的默认事件

第二步就是我们给 body 或是其他元素加上我们想要监听的事件,这里有一个注意的是 body 的高度一定是窗口的高度,这样才会全屏拖拽,在拖离的时候我们还要判断一下文件是否被拖出区域

这里一共有这么判断,
`e.target.nodeName === 'HTML'`,这个用来判断根元素是不是 html
`e.target === e.explicitOriginalTarget` 这个是火狐特有的一个 api,判断这两个触发事件的目标是否一致

```javascript
(!e.fromElement &&
        (e.clientX <= 0 ||
          e.clientY <= 0 ||
          e.clientX >= window.innerWidth ||
e.clientY >= window.innerHeight))
```

这个是用来判断鼠标当前的位置的,是否还在区域内

```javascript
// 初始化拖入事件
function init() {
    // 获取body元素
  const ele = document.querySelector('body')
  // 添加事件
  //拖后放
  ele.addEventListener('dragenter', () => {
    show.value = true
  })
  // 这里判断鼠标拖离
  ele.addEventListener('dragleave', (e) => {
    if (
      e.target.nodeName === 'HTML' ||
      e.target === e.explicitOriginalTarget ||
      (!e.fromElement &&
        (e.clientX <= 0 ||
          e.clientY <= 0 ||
          e.clientX >= window.innerWidth ||
          e.clientY >= window.innerHeight))
    ) {
      show.value = false
    }
  })
  //拖进
  ele.addEventListener('drop', (e) => {
    show.value = false
    e.preventDefault()
    onDrop(e) // 拖入处理文件的方法
  })
}
```

第三步是处理拖入的文件,此时 accept 是我们定义的文件类型,此时我们用`e.dataTransfer.files`这个属性可以获得拖入的文件,
然后我们把拖入的文件用 filter 做一个过滤,只保留我们需要的文件类型

`checkType(file,accept)`就是用来判断文件类型的,这一个函数是借鉴了 element ui 里面的上传组件的筛选,当时我也是写蒙了我 😂

```javascript
// 检查文件类型
function checkType(file, accept = '') {
  const { type, name } = file
  if (accept.length === 0) return true
  const extension = name.indexOf('.') > -1 ? `.${name.split('.').pop()}` : ''
  const baseType = type.replace(/\/.*$/, '')
  return accept
    .split(',')
    .map((type) => type.trim())
    .filter((type) => type)
    .some((acceptedType) => {
      if (/\..+$/.test(acceptedType)) {
        return extension === acceptedType
      }
      if (/\/\*$/.test(acceptedType)) {
        return baseType === acceptedType.replace(/\/\*$/, '')
      }
      if (/^[^/]+\/[^/]+$/.test(acceptedType)) {
        return type === acceptedType
      }
    })
}
```

这个方法是文件拖入之后的处理,当我们获得需要的文件之后就是根据`autoUpload`来判断一下是否上传

```javascript
function onDrop(e) {
  const accept = props.accept
  const list = [].slice.call(e.dataTransfer.files).filter((file) => {
    if (accept) {
      return checkType(file, accept)
    }
    return true
  })
  fileList = list.map((p) => {
    return handleStart(p)
  })
  // 触发事件
  onChange()
  if (props.autoUpload) {
    if (props.action === '') {
      onError()
      throw 'need action'
      return
    }
    list.forEach((file) => {
      post(file) // 上传文件
    })
  }
}
```

源码如下:

```javascript

<template>
  <div class="mask" v-show="show" id="mask">
    <h3>拖拽到这里上传</h3>
  </div>
</template>
<script setup>
import { ref, reactive, onMounted } from 'vue'
// import ajax from './ajax'
const props = defineProps({
  name: String, // 上传的字段名
  header: { Object, Number, String }, // 上传的文件头
  // 验证的文件类型,有值的时候只会拖入所有的文件只会保留设置过滤后的文件
  accept: {
    type: String,
    default: '',
  },
  // 是否开启自动上传
  autoUpload: {
    type: Boolean,
    default: false,
  },
  // 上传地址
  action: {
    type: String,
    default: '#',
  },
})

const emit = defineEmits(['onError', 'onProgress', 'onSuccess', 'onChange']) // 默认emit事件
let show = ref(false) // 是否展示遮罩
let fileList = reactive([]) // 文件列表
let tempIndex = 0 // 做一个标记
onMounted(() => {
  disableDefaultEvents()
  init()
})
// 初始化拖入事件
function init() {
  const ele = document.querySelector('body')
  ele.addEventListener('dragenter', () => {
    show.value = true
  }) //拖后放
  ele.addEventListener('dragleave', (e) => {
    if (
      e.target.nodeName === 'HTML' ||
      e.target === e.explicitOriginalTarget ||
      (!e.fromElement &&
        (e.clientX <= 0 ||
          e.clientY <= 0 ||
          e.clientX >= window.innerWidth ||
          e.clientY >= window.innerHeight))
    ) {
      show.value = false
    }
  }) //拖离
  ele.addEventListener('drop', (e) => {
    show.value = false
    e.preventDefault()
    onDrop(e)
  }) //拖进
}
// 禁用默认拖拽事件
function disableDefaultEvents() {
  const doc = document.documentElement
  doc.addEventListener('dragleave', (e) => e.preventDefault()) //拖离
  doc.addEventListener('drop', (e) => e.preventDefault()) //拖后放
  doc.addEventListener('dragenter', (e) => e.preventDefault()) //拖进
  doc.addEventListener('dragover', (e) => e.preventDefault()) //拖来拖去
}
// 拖入时的事件
function onDrop(e) {
  const accept = props.accept
  const list = [].slice.call(e.dataTransfer.files).filter((file) => {
    if (accept) {
      return checkType(file, accept)
    }
    return true
  })
  fileList = list.map((p) => {
    return handleStart(p)
  })
  onChange()
  if (props.autoUpload) {
    if (props.action === '') {
      onError()
      throw 'need action'
      return
    }
    list.forEach((file) => {
      post(file)
    })
  }
}
// 检查文件类型
function checkType(file, accept = '') {
  const { type, name } = file
  if (accept.length === 0) return true
  const extension = name.indexOf('.') > -1 ? `.${name.split('.').pop()}` : ''
  const baseType = type.replace(/\/.*$/, '')
  return accept
    .split(',')
    .map((type) => type.trim())
    .filter((type) => type)
    .some((acceptedType) => {
      if (/\..+$/.test(acceptedType)) {
        return extension === acceptedType
      }
      if (/\/\*$/.test(acceptedType)) {
        return baseType === acceptedType.replace(/\/\*$/, '')
      }
      if (/^[^/]+\/[^/]+$/.test(acceptedType)) {
        return type === acceptedType
      }
    })
}
// 处理文件列表返回值
function handleStart(rawFile) {
  rawFile.uid = Date.now() + tempIndex++
  return {
    status: 'ready',
    name: rawFile.name,
    size: rawFile.size,
    percentage: 0,
    uid: rawFile.uid,
    raw: rawFile,
  }
}
// 上传的事件
function post(rawFile) {
  const options = {
    headers: props.header,
    file: rawFile,
    data: props.data || '',
    filename: props.name || 'file',
    action: props.action,
  }
  upload(options)
    .then((res) => {
      res.json()
    })
    .then((json) => {
      onSuccess(json, rawFile)
    })
    .catch((err) => {
      onError(err, rawFile)
    })
}
// 文件上传方法
function upload(option) {
  const action = option.action

  const formData = new FormData()

  if (option.data) {
    Object.keys(option.data).forEach((key) => {
      formData.append(key, option.data[key])
    })
  }
  formData.append(option.filename, option.file, option.file.name)

  const headers = new Headers()
  for (let item in headers) {
    if (headers.hasOwnProperty(item) && headers[item] !== null) {
      headers.append(i, option.headers[i])
    }
  }
  return fetch(action, {
    mode: 'no-cors',
    body: formData,
    headers: headers,
    method: 'post',
  })
}

// 拖拽进去获取文件列表的事件
function onChange() {
  emit('onChange', fileList)
}
// 上传中的事件
function onProgress(e, file) {
  emit('onProgress', e, file, fileList)
}
// 上传成功事件
function onSuccess(res, file) {
  emit('onProgress', res, file, fileList)
}
// 上传失败事件
function onError() {
  emit('onError')
}
</script>
<style scoped>
.mask {
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  position: fixed;
  z-index: 9999;
  opacity: 0.6;
  text-align: center;
  background: #000;
}
h3 {
  margin: -0.5em 0 0;
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  -webkit-transform: translateY(-50%);
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
  font-size: 40px;
  color: #fff;
  padding: 0;
}
</style>



```
