import {createRouter, createWebHistory} from 'vue-router';

// importo i componenti
import AppMain from './pages/AppMain.vue';

const router = createRouter({

  history: createWebHistory(),

  routes: [
    {
      path: '/',
      name: 'main',
      component: AppMain,
    }
  ],

});

export {router};

