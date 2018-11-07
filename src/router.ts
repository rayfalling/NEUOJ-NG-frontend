import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('./views/Home.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/Login.vue'),
    },
    {
      path: '/join',
      name: 'join',
      component: () => import('./views/Join.vue'),
    },
    {
      path: '/auth/ssologin', // for backward compatibility
      name: 'sso',
      component: () => import('./views/SSO.vue'),
    },
  ],
});
