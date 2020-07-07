# ImpoerExport

基于vue 和element ui，是一个导入excel里的数据到页面进行编辑的组件。适用于后台管理系统使用。



## 使用



```vue
<template>
	<ImportExcel :map="[{label: '楼盘', field: 'floorName', required: true}]"></ImportExcel>
<template>
<script>
    import { ImportExcel } from 'ImportExport'

    export default {
        name: 'your page name',

        components: {ImportExcel}
    }
</script>
```



 

## props

* accept 字符串，点击`导入表格`按钮可选择的文件类型，默认值`.csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel`

* map 数组，映射管理，例如:

  ```js
  [{label: '楼盘', field: 'floorName', required: true}, {label: '公司地址', field: 'Address'}]
  ```

  * label Excel中对应列的名字
  * field 映射成业务数据的字段

* submiting 布尔值，控制是否提交数据中

  

## events

* submit

参数是数据

考虑到很多框架使用了不同的请求和返回方式，保存到后端由使用者自行实现。