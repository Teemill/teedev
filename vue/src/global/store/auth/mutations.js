import Cookies from 'js-cookie';
import types from './types';

export default {
  [types.FETCH_USER_SUCCESS](state, data) {
    Cookies.set('token', data.token);
    state.user = data.user;
    state.token = data.token;
  },

  [types.FETCH_DETAILED_USER](state, data) {
    state.detailedUser = data;
  },

  [types.GET_LOGGED_IN_USER](state, data) {
    state.user = data;
  },

  [types.FETCH_USER_FAILURE](state, data) {
    state.user = null;
    state.detailedUser = null;
    state.loginError = data.error;
    Cookies.remove('token');
  },

  [types.REGISTER_USER_SUCCESS](state, data) {
    Cookies.set('token', data.token);
    state.user = data.user;
    state.token = data.token;
  },

  [types.REGISTER_USER_FAILURE](state, data) {
    state.user = null;
    state.registerError = data.error;
    Cookies.remove('token');
  },

  [types.NULL_LOGIN_ERROR_MESSAGE](state) {
    state.loginError = '';
  },

  [types.NULL_REGISTER_ERROR_MESSAGE](state) {
    state.registerError = '';
  },

  [types.USER_LOGOUT](state) {
    Cookies.remove('token');
    state.user = null;
    state.detailedUser = null;
    state.token = null;
  },
};
