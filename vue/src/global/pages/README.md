
# Pages
Pages... duhhh...
 

## File Structure
```
pages
│
├─ yourPageName
│	│
│	├ _page.js
│	├ YourPageName.vue
│	└ components
│		│
│		└ YourPageComponent.vue
│
└─ AnotherPage
```
---
### _page.js
``` js
export  default {
	path:  '/your-page-name/',
	name:  'TeeDev YourPageName',
	component: () =>  import(/* webpackChunkName: "PageYourPageName" */  './YourPageName'),
	meta: {
		layout:  'standard',
	},
};
```
---

### YourPageName.vue
The root component for the page.
