import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// import * as Vue from 'vue' // in Vue 3
// import axios from 'axios'
// import VueAxios from 'vue-axios'
const app = createApp(App)

// Vue.use(VueAxios, axios)
app.use(router)
app.mount('#app')
