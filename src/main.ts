import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

import './services/firebaseInit';

import './assets/scss/app.scss'

createApp(App).use(createPinia()).use(router).mount('#app')
