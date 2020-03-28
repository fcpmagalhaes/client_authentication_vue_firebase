import Vue from 'vue';
import VueRouter from 'vue-router';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import routes from './routes';

Vue.use(VueRouter);

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation
 */

export default function () {
  const Router = new VueRouter({
    scrollBehavior: () => ({ y: 0 }),
    routes,

    // Leave these as is and change from quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  });

  Router.beforeEach(async (to, from, next) => {
    const user = await new Promise((resolve) => {
      firebase.auth().onAuthStateChanged((a) => {
        resolve(a);
      });
    });
    console.log('user', user);

    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

    const isAuthenticated = firebase.auth().currentUser;
    if (requiresAuth && !isAuthenticated && !user) {
    // if (requiresAuth && !user) {
      next({ path: '', query: { from: to.path } });
    } else {
      next();
    }
  });

  return Router;
}


// Router.beforeEach(async (to, from, next) => {
//   const user = await new Promise((resolve) => {
//     firebase.auth().onAuthStateChanged((a) => {
//       resolve(a);
//     });
//   });

//   const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

//   // const isAuthenticated = firebase.auth().currentUser;
//   // if (requiresAuth && !isAuthenticated) {
//   if (requiresAuth && !user) {
//     next({ path: '', query: { from: to.path } });
//   } else {
//     next();
//   }
// });
