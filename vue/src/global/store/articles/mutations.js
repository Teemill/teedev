import types from './types';

export default {
  [types.FETCH_ARTICLES](state, data) {
    state.articles = data;
  },

  [types.SET_ACTIVE_ARTICLE](state, data) {
    state.article = data;
  },

  [types.CHANGE_LOADING_STATE](state, data) {
    state[data.type] = data.value;
  },

  [types.FETCH_META](state, data) {
    state.metaCategories = data.categories;
    state.metaStatuses = data.statuses;
  },

  [types.SET_CREATION_ERROR](state, data) {
    state.creationError = data;
  },

  [types.SET_FEATURED_IMAGE](state, data) {
    state.article.featureImage = data;
  },

  [types.CREATE_NEW_CATEGORY](state, data) {
    const newCategory = {
      name: data,
      slug: data.toLowerCase(),
    };

    state.metaCategories.push(newCategory);
  },
};
