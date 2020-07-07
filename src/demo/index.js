import '@babel/polyfill'
// import "@/libs/rem"

// 这里是调试入口
import Vue from 'vue'
import 'element-ui/lib/theme-chalk/index.css'
import 'element-ui/lib/index.js'
import main from './index.vue';

new Vue({
    el: "#app",
    render: h => h(main)
});