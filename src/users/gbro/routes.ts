export default [
  {
    path: 'formula-e',
    name: 'Formula E',
    component: () => import(/* webpackChunkName: "FormulaE" */ './views/FormulaE/FormulaE.vue'),
  },
  {
    path: '/',
    name: 'G Bro',
    component: () => import (/* webpackChunkName: "GBro" */ './views/Home/Home.vue'),
  },
];
