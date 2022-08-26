import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import App from './App.vue'
import router from './router'
import store from './store'
import {createI18n} from 'vue-i18n'
import messages from './language/index.js'

// 设置i18n国际化
const i18n = createI18n({
    fallbackLocale: 'CN',
    // globalInjection:true,
    // legacy: false, // you must specify 'legacy: false' option
    locale: 'CN',
    messages,
})

import './assets/styles/custom-element-var.scss'
import './assets/styles/custom-element.scss'
import "./assets/styles/common.scss"
import './assets/styles/layout.scss'


createApp(App).use(store).use(router).use(ElementPlus, {locale: zhCn}).use(i18n).mount('#app')
