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
