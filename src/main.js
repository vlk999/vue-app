import { createApp } from 'vue';
import { createPinia } from 'pinia'

import App from './App.vue';

import './assets/styles.css';   // <- здесь

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.mount('#app')