import Cookies from 'js-cookie';
import axios from 'axios';

const http = {
  post(url, data = {}) {
    const params = new URLSearchParams();
    const dataKeys = Object.keys(data);
    const token = this.getAuthToken();
    const headers = {
      Accept: 'application/json',
    };

    dataKeys.forEach(key => params.append(key, data[key]));

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    return axios({
      method: 'post',
      url,
      data: params,
      headers,
      withCredentials: true,
    });
  },

  get(url, params = {}) {
    const token = this.getAuthToken();

    const headers = {
      Accept: 'application/json',
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    return axios({
      method: 'get',
      url,
      params,
      headers,
      withCredentials: true,
    });
  },

  getAuthToken() {
    return Cookies.get('token') || '';
  },
};

export default http;

export const installer = (Vue) => {
  Vue.prototype.$http = http;
};
