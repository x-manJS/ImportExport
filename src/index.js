import '@babel/polyfill'
import "@/libs/rem"

// 这里是发布入口

import ImportExcel from './components/ImportExcel.vue';

ImportExcel.install = function(Vue, options) {
    Vue.component(component.name, ImportExcel);
}

export const ImportExcel = ImportExcel;