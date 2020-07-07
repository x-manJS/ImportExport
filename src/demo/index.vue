<template lang="pug">
  div 
    ImportExcel(:map="[{label: '楼盘', field: 'floorName', required: true}, {label: '公司地址', field: 'Address'}]")
      template(slot="floorName" slot-scope="{row, field}")
        el-select( v-model="row[field]")
          el-option(label="厦门" value="厦门")
          el-option(label="厦门" value="深圳")
</template>

<script>
import ImportExcel from '../components/ImportExcel.vue';

export default {
  name: "main",

  components: { ImportExcel },

  methods: {
    submit(){},

    outputInfo(obj){
      console.log(obj)
    }
  }
};
</script>

<style lang="less" scoped>
*,
*::before,
*::after {
  box-sizing: border-box;
}
</style>
