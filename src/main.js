import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import naive from "naive-ui";
import Vue from "@vue/cli-plugin-eslint/eslintOptions";

createApp(App).use(naive).use(router).mount('#app')
Vue.config.productionTip = false;
