
const routes = [
  // {
  //   path: '/',
  //   component: () => import('layouts/MyLayout.vue'),
  //   children: [
  //     { path: '', component: () => import('pages/Index.vue') },
  //   ],
  // },
  {
    path: '/',
    name: 'base-layout',
    component: () => import('layouts/BaseLayout.vue'),
    children: [
      {
        path: '',
        name: 'login',
        component: () => import('pages/Login.vue')
      },
      {
        path: '/sign-up',
        name: 'sign-up',
        component: () => import('pages/Register.vue')
      },
      {
        path: '/list-cards',
        name: 'list-cards',
        component: () => import('pages/cards/Index.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: '/create-card',
        name: 'create-card',
        component: () => import('pages/cards/Create.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: '/edit-card/:id',
        name: 'edit-card',
        component: () => import('pages/cards/Edit.vue'),
        meta: { requiresAuth: true }
      }
    ]
  }
];


// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  });
}

export default routes;
