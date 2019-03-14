
# Vue Plugins
Vue plugins... Look in the docs.. I'm not explaining it...
 

## File Structure
```
plugins
│
├─ yourPluginName
│	│
│	└ _plugin.js
│
└─ AnotherPlugin
```
---
### _plugin.js
``` js
export  default {
	install(Vue) {
		Vue.prototype.$yourPluginName = this.pluginData; // Expose the plugin to all components.
		// E.g. console.log(this.$yourPluginName.iLovePlugins);
	},
	pluginData: {
		iLovePlugins: 'They\'re great',
	},
};
```
---
