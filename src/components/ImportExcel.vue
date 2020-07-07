<template lang="pug">
  div 
    el-form(:inline="true")
      el-form-item()
        el-button(@click="addRow") 添加一行
      el-form-item()
        el-button() 下载模板
      el-form-item()
        el-button(@click="$refs.upload.click()") 导入表格
        input(ref="upload" style="display:none" type="file" @change="importfxx(this)"                
                                                            :accept="accept")
      el-form-item()
        el-button(type="primary" @click="submit" :disabled="submiting") 
            i(:class="submiting ? 'el-icon-loading' : 'el-icon-receiving'")
            span 提交保存

    el-form(:model="model" ref="form")
        el-table(border :data="model.data")
            slot(name="prepend")
            el-table-column(v-for="item in map" :label="item.label" :key="item.field" )
                template(slot-scope="{$index, row}")
                    el-form-item(:prop="`data.${$index}.${item.field}`" 
                                 :rules="[{required: item.required, message:`请填${item.label}`}]")
                        slot(:name="item.field" :row="row" :field="item.field")
                            el-input(v-model="row[item.field]")
            el-table-column(width="150px" align="center")
                template(slot-scope="{$index, row}")
                    el-form-item
                        el-button(type="danger" @click="model.data.splice($index,1)")
                            i(class="el-icon-delete") 
                            span 移除
            slot(name="append")

            
</template>

<script>
// import "element-ui";
require("script-loader!xlsx/dist/xlsx.core.min"); //xlsx核心

export default {
  name: "import-excel",

  props: {
    accept: {
      type: String,
      default:
        ".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
    },

    map: { type: Array, required: true },

    submiting: { type: Boolean, default: false }
  },

  data() {
    return {
      model: { data: [] }
    };
  },

  methods: {
    importfxx() {
      let _this = this;
      // 通过DOM取文件数据
      this.file = event.currentTarget.files[0];

      var rABS = false; //是否将文件读取为二进制字符串
      var f = this.file;
      var reader = new FileReader();

      const vm = this;

      FileReader.prototype.readAsBinaryString = function(f) {
        var binary = "";
        var rABS = false; //是否将文件读取为二进制字符串
        var pt = this;
        var wb; //读取完成的数据
        var outdata;
        var reader = new FileReader();

        reader.onload = function(e) {
          var bytes = new Uint8Array(reader.result);
          var length = bytes.byteLength;
          for (var i = 0; i < length; i++) {
            binary += String.fromCharCode(bytes[i]);
          }
          var XLSX = require("xlsx");
          if (rABS) {
            wb = XLSX.read(btoa(fixdata(binary)), {
              //手动转化
              type: "base64"
            });
          } else {
            wb = XLSX.read(binary, {
              type: "binary"
            });
          }
          outdata = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]); //outdata就是你想要的东西
          console.log(outdata);
          const models = vm.excelJson2Models(outdata);
          vm.model.data = models;
          console.log(models);
          vm.$refs.upload.innerHTML = "";
        };
        reader.readAsArrayBuffer(f);
      };
      if (rABS) {
        reader.readAsArrayBuffer(f);
      } else {
        reader.readAsBinaryString(f);
      }
    },

    excelJson2Models(json) {
      const vm = this;
      return json.map(j => {
        const item = {};
        Object.keys(j).forEach(k => {
          const foundMap = vm.map.find(m => m.label === k);
          if (!foundMap) return;
          item[foundMap.field] = j[k];
        });
        return item;
      });
    },

    addRow() {
      this.model.data.push({});
    },

    submit() {
      const vm = this;
      this.$refs.form.validate(isvalid => {
        if (!isvalid) return;
        vm.$emit("submit", vm.model.data);
      });
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
