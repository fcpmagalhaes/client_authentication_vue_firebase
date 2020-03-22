
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
        path: '/list-cards',
        name: 'list-cards',
        component: () => import('pages/cards/Index.vue')
      },
      {
        path: '/create-card',
        name: 'create-card',
        component: () => import('pages/cards/Create.vue')
      },
      {
        path: '/edit-card/:id',
        name: 'edit-card',
        component: () => import('pages/cards/Edit.vue')
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
