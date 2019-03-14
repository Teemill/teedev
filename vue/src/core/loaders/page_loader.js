import { BaseLoader } from '.';
import { Router } from '@/core';

const load = (item) => {
  Router.addRoutes([item.module]);
};

// const unload = (item) => {
//   // console.log(item);
// };

const get = (item) => {
  const itemPages = item.module.default;

  if (!itemPages) {
    return false;
  }

  if (Array.isArray(itemPages)) {
    const pages = [];

    itemPages.forEach((itemPage) => {
      const page = item.copy();
      const pageName = itemPage.path
        .replace(/\/:[^/]+|^\/|\/$/g, '')
        .replace(/\//g, '-');

      page.module = itemPage;
      page.name = pageName;

      pages.push(page);
    });

    return pages;
  }

  item.module = item.module.default;
  return item;
};

export default new BaseLoader(
  'page',
  load,
  null,
  get,
);
