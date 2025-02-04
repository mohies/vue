import './assets/main.css'
import 'font-awesome/css/font-awesome.min.css';
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './assets/my_bootstrap.scss';

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
