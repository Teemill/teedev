
# Vuex Modules
Vuex modules are used to create and store cross component data.
 

## File Structure
```
vuex
│
├─ yourModuleName
│	│
│	├ _module.js
│	├ state.js
│	├ getters.js
│	├ mutations.js
│	└ actions.js
│
└─ AnotherModule
```
---

### _module.js
``` js
import state from './state';
import getters from './getters';
import mutations from './mutations';
import actions from './actions';

// Export the modules store.
export default {
	namespaced:  true,
	state,
	getters,
	mutations,
	actions,
};

// Used to export the types for getters, mutations and actions.
export const types = {
	GET_TEST: 'yourModuleName/getTest',
	SET_TEST: 'yourModuleName/setTest',
};
```
Using types and interacting with Vuex. [Vuex Docs](https://vuex.vuejs.org/guide/)
```js
import types from '@/vuex';

this.$store.commit(types.yourModuleName.SET_TEST, 123);
this.$store.dispatch(types.yourModuleName.SET_TEST, 321);
this.$store.getters[types.yourModuleName.SET_TEST];
```
---

### state.js
Should export an object containing the modules initial state.
```js
export default {
	testState: 'this is example state',
};
```
---

### getters.js
Should export an object containing the modules getters.
```js
export default {
	getTest(state) {
		console.log('Getting the state');
		return state.testState;
	},
};
```
---

### mutations.js
Should export an object containing the modules mutations.
```js
export default {
	setTest(state, value) {
		console.log('Mutating the state');
		state.testState = value;
	},
};
```
---

### actions.js
Should export an object containing the modules actions.
```js
export default {
	async setTest({ commit }, value) {
		console.log('Mutating the state asynchronously');
		commit('setTest', value);
	},
};
```
---