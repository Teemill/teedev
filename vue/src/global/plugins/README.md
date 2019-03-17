
# Vue Plugins
Include Vue plugins here
https://vuejs.org/v2/guide/plugins.html

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
