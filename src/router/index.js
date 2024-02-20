import Vue from 'vue';
import VueRouter from 'vue-router';
import HomeView from '../views/HomeView.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/violin-clef',
    name: 'violin-clef',
    component: () => import('../views/ViolinClef.vue'),
  },
  {
    path: '/bass-clef',
    name: 'bass-clef',
    component: () => import('../views/BassClef.vue'),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
