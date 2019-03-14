export default {
  user: state => state.user,
  token: state => state.token,
  check: state => state.token !== null,
  loginError: state => state.loginError,
  registerError: state => state.registerError,
};
