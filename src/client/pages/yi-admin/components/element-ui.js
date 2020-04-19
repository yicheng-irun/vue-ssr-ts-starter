/**
 * 为什么单独引用
 * 是未了避免非yi-admin的页面部分也引入这么大的css,和这么多的js组件
 */
import Vue from 'vue';
import ElementUI from 'element-ui';

import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);
