import {createRouter, createWebHistory} from 'vue-router';

// importo i componenti
import AppMain from './pages/AppMain.vue';
import AppSearch from './pages/AppSearch.vue';


const router = createRouter({

  history: createWebHistory(),

  routes: [
    {
      path: '/',
      name: 'main',
      component: AppMain,
    },
    {
      path: '/search',
      name: 'search',
      component: AppSearch ,
    }
  ],

});

export {router};

