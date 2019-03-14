import http from '@/global/plugins/http';
import types from './types';

export default {
  async login({ commit }, credentials) {
    return new Promise((resolve) => {
      http.post(`${$ENV('TEEDEV_API')}/api/user/login`, credentials)
        .then(({ data }) => {
          if (data.user && data.token) {
            commit(types.FETCH_USER_SUCCESS, data);
            resolve(data);
          } else {
            commit(types.FETCH_USER_FAILURE, data);
            resolve(false);
          }
        });
    });
  },

  async register({ commit }, credentials) {
    const { data } = await http.post(`${$ENV('TEEDEV_API')}/api/user/register`, credentials);

    if (data.user && data.token) {
      commit(types.REGISTER_USER_SUCCESS, data);
    } else {
      commit(types.REGISTER_USER_FAILURE, data);
    }
  },

  async logout({ commit }) {
    return new Promise((resolve) => {
      http.get(`${$ENV('TEEDEV_API')}/api/user/logout`)
        .then(() => commit(types.USER_LOGOUT))
        .then(() => resolve(true));
    });
  },

  async getUserFromToken({ commit }) {
    const { data } = await http.get(`${$ENV('TEEDEV_API')}/api/user/get`);

    if (data) {
      commit(types.GET_LOGGED_IN_USER, data);
    }
  },

  async getDetailedUser({ commit }) {
    http.get(`${$ENV('TEEDEV_API')}/api/user/get-detailed`)
      .then(({ data }) => {
        commit(types.FETCH_DETAILED_USER, data);
      });
  },

  async uploadUserImage({ state }, image) {
    return new Promise((resolve) => {
      http.post(`${$ENV('TEEDEV_API')}/api/user/upload-image`, {
        user: state.user.id,
        image,
        field: 'uploaded',
      })
        .then(({ data }) => {
          resolve(data);
        });
    });
  },

  async uploadProfilePhoto({ state }, image) {
    return new Promise((resolve) => {
      http.post(`${$ENV('TEEDEV_API')}/api/user/upload-image`, {
        user: state.user.id,
        image,
        field: 'profile_photo',
      })
        .then(({ data }) => {
          resolve(data);
        });
    });
  },
};
