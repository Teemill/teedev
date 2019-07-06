// import userPlaceholder from '@/pages/articles/assets/images/placeholder-user.jpeg';
import { Device } from '@/global/classes'; 

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
  Vue.prototype.$device = new Device();

  Vue.observable(Vue.prototype.$device);
};
