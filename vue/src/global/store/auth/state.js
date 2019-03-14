import Cookies from 'js-cookie';

export default {
  token: Cookies.get('token') || null,
  user: null,
  detailedUser: null,
  loginError: null,
  registerError: null,
};
