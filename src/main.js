import { createApp } from 'vue'
import './style.scss'
import App from './App.vue'

// Importo il router
import {router} from './router';

createApp(App).use(router).mount('#app')
