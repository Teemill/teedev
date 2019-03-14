import http from '@/global/plugins/http';
import types from './types';

export default {
  async fetchAll({ commit, state }) {
    state.querying = true;

    const { data } = await http.get(`${$ENV('TEEDEV_API')}/api/article/list`);

    commit(types.FETCH_ARTICLES, data);

    state.querying = false;
  },

  async findArticle({ commit }, route) {
    const { data } = await http.get(`${$ENV('TEEDEV_API')}/api/article/find/${route.id}`);

    commit(types.SET_ACTIVE_ARTICLE, data);
  },

  async findArticleBySlug({ commit }, route) {
    return new Promise((resolve) => {
      http.get(`${$ENV('TEEDEV_API')}/api/article/find-by-slug/${route.slug}`)
        .then(({ data }) => {
          if (data.error) {
            resolve(404);
          } else {
            commit(types.SET_ACTIVE_ARTICLE, data);
            resolve(data);
          }
        });
    });
  },

  async saveNewArticle({ commit, dispatch }, newArticle) {
    return new Promise((resolve) => {
      http.post(`${$ENV('TEEDEV_API')}/api/article/save-new-article`, {
        title: newArticle.title,
        content: newArticle.content,
        categories: JSON.stringify(newArticle.categories),
        status: newArticle.status,
      })
        .then(({ data }) => {
          dispatch('fetchAll')
            .then(() => commit(types.SET_ACTIVE_ARTICLE, data));
          resolve(data);
        });
    });
  },

  async updateArticle({ commit, dispatch }, payload) {
    return new Promise((resolve) => {
      http.post(`${$ENV('TEEDEV_API')}/api/article/update-article`, {
        articleId: payload.existingArticle.id,
        title: payload.updatedArticle.title,
        content: payload.updatedArticle.content,
        categories: JSON.stringify(payload.updatedArticle.categories),
        status: payload.updatedArticle.status,
      })
        .then(({ data }) => {
          dispatch('fetchAll')
            .then(() => commit(types.SET_ACTIVE_ARTICLE, data));
          resolve(data);
        });
    });
  },

  async getEditorMetaData({ commit }) {
    return new Promise((resolve) => {
      http.get(`${$ENV('TEEDEV_API')}/api/article/get-editor-meta-data`)
        .then(({ data }) => {
          commit(types.FETCH_META, data);
          resolve(data);
        });
    });
  },

  async uploadFeatureImage({ state, commit }, base64) {
    return new Promise((resolve) => {
      http.post(`${$ENV('TEEDEV_API')}/api/article/upload-feature-image`, {
        base64,
        articleId: state.article.id,
      })
        .then(({ data }) => {
          commit(types.SET_FEATURED_IMAGE, data);
          resolve(data);
        });
    });
  },

};
