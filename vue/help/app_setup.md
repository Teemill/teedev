# Setting up a new app
If you're looking to create a new app seperate from Teedev then look no further. I will attempt to explain the process.



## File structure
1. Create a new folder in the /src/ directory and name it something like `my-special-app`.

2. Create two files in the folder you just created `main.js` and `App.vue`



## Importing dependancies
1. Open up `main.js` in the root of your fancy new app.

2. Add dependancy imports:
    ```js
    import { Boot } from '@/core';
    import '@/global';
    import App from './App.vue';
    ```

    This give you access to the Boot function which will be used to initialise some of the core components of your app (e.g. Vuex, Axios, and the Router).

    In most cases you're also gonna want to import global as this will import Teedevs library of things. Such as Components, Helpers etc. (Useful shit you know)

3. Now we want to "turn on the lights" and bootstrap the app.
    ```js
    Boot({
      App,
    });
    ```

4. You've got your self a fancy new Vue app with Vuex and all the other good stuff. It's just empty.



## Setting up npm commands
1. Add the following to package.json:
    ```json
    "serve-my-app": "vue-cli-service serve src/my-special-app/main.js",
    "build-my-app": "vue-cli-service build src/my-special-app/main.js",
    ```
2. Simply run `npm run serve-my-app` in command line.
3. Das app be running.



## Have I missed something?
Yeah proberbly, it's 2 in the morning.. What do you want from me?

```js
let fucksGiven = 1;

if (this.tired === true) {
  fucksGiven -= 1;
}

if (fucksGiven > 0) {
  this.brain.think();
} else {
  console.log(this.gibberish);
}
```