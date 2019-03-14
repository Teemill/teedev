/**
 * @param {object} route The route that is being accessed
 * @param {object} store VueX store object (Use store.state to get data from the store)
 */

export default {
  loggedIn: (route, store) => (
    !store.getters['auth/check'] ? { path: '/login', query: { redirect: route.fullPath } } : true
  ),

  loggedOut: (route, store) => (
    store.getters['auth/check'] ? { path: '/' } : true
  ),
};
