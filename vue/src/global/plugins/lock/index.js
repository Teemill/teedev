import http from '../http';

const lock = {
  locks: {},

  request(name) {
    return new Promise((resolve) => {
      http.post(
        `${$ENV('TEEDEV_API')}/api/lock/request`,
        { name },
      ).then((response) => {
        if (response.data === 'no') {
          resolve(false);
        } else {
          this.locks[name] = response.data;
          resolve(true);
        }
      });
    });
  },

  release(name) {
    return new Promise((resolve) => {
      http.post(
        `${$ENV('TEEDEV_API')}/api/lock/release`,
        { name },
      ).then((response) => {
        if (response.data === 'no') {
          resolve(false);
        } else {
          delete this.locks[name];
          resolve(true);
        }
      });
    });
  },

  has(name) {
    if (this.locks[name]) {
      return true;
    }

    return false;
  },
};

export default lock;

export const installer = (Vue) => {
  Vue.prototype.$lock = lock;
};
