import guards from '@/global/router/guards';

export default [
  {
    path: '/articles/',
    name: 'TeeDev Articles',
    component: () => import(/* webpackChunkName: "PageArticles" */ './Articles'),
    meta: {
      layout: 'standard',
      guards: [
        guards.loggedIn,
      ],
    },
  },
  {
    path: '/articles/categories/',
    name: 'TeeDev Categories',
    component: () => import(/* webpackChunkName: "PageArticles" */ './ArticlesCategories'),
    meta: {
      layout: 'standard',
      guards: [
        guards.loggedIn,
      ],
    },
  },
  {
    path: '/articles/category/:category',
    name: 'TeeDev Category',
    component: () => import(/* webpackChunkName: "PageArticles" */ './ArticleCategory'),
    meta: {
      layout: 'standard',
      guards: [
        guards.loggedIn,
      ],
    },
  },
  {
    path: '/articles/author/:author',
    name: 'TeeDev Author',
    component: () => import(/* webpackChunkName: "PageArticles" */ './ArticleAuthor'),
    meta: {
      layout: 'standard',
      guards: [
        guards.loggedIn,
      ],
    },
  },
  {
    path: '/article/:slug',
    name: 'TeeDev Article',
    component: () => import(/* webpackChunkName: "PageArticle" */ './Article'),
    meta: {
      layout: 'standard',
      guards: [
        guards.loggedIn,
      ],
    },
  },
  {
    path: '/article/editor/:slug',
    name: 'TeeDev Article Editor',
    component: () => import(/* webpackChunkName: "ArticleEditor" */ './editor/Main'),
    meta: {
      layout: 'standard',
      guards: [
        guards.loggedIn,
      ],
    },
  },
  {
    path: '/article/editor/create',
    name: 'TeeDev Article Create',
    component: () => import(/* webpackChunkName: "ArticleEditor" */ './editor/Main'),
    meta: {
      layout: 'standard',
      guards: [
        guards.loggedIn,
      ],
    },
  },
];
