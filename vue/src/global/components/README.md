
# Pages
Pages... duhhh...
 

## File Structure
```
components
│
├─ componentGroupName
│	│
│	├ _components.js
│	├ YourComponentName.vue
│ └ AnotherComponent.vue
│
└─ AnotherComponentGroup
```
---

### _components.js
``` js
export default {
  YourComponentName: () => import(/* webpackChunkName: "TeeDevYourComponentName" */ './YourComponentName'),
  AnotherComponent: () => import(/* webpackChunkName: "TeeDevAnotherComponent" */ './AnotherComponent'),
};
```
---
