// import userPlaceholder from '@/pages/articles/assets/images/placeholder-user.jpeg';

const helpers = {
  getUserImage(user) {
    if (user.profileThumbnail) {
      return `${$ENV('TEEDEV_API')}${user.profileThumbnail}`;
    }

    return ''; // userPlaceholder;
  },
};

export default helpers;

export const installer = (Vue) => {
  Vue.prototype.$teedevHelpers = helpers;
};

export const uid = () => (
  [1e7] + -1e3 + -4e3 + -8e3 + -1e11
).replace(
  /[018]/g,
  c => (
    // eslint-disable-next-line
    c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4
  ).toString(16),
);
