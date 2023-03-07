import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import naive from "naive-ui";
import Vue from "@vue/cli-plugin-eslint/eslintOptions";
import VueMeetingSelector from "vue-meeting-selector";
import globalComponents from'./components/global'

createApp(App)
    .use(naive)
    .use(router)
    .use(VueMeetingSelector)
    .use(globalComponents)
    .mount('#app')
Vue.config.productionTip = false;