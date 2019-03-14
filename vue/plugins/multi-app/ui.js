const views = {
  views: [
    {
      id: 'org.vue.webpack.views.dashboard',
      label: 'org.vue.vue-webpack.dashboard.title',
      icon: 'dashboard',
      component: 'org.vue.webpack.components.dashboard',
    },
    {
      id: 'org.vue.webpack.views.analyzer',
      label: 'org.vue.vue-webpack.analyzer.title',
      icon: 'donut_large',
      component: 'org.vue.webpack.components.analyzer',
    },
  ],
  defaultView: 'org.vue.webpack.views.dashboard',
};

const serveTask = {
  link: 'https://cli.vuejs.org/guide/cli-service.html#vue-cli-service-serve',
  prompts: [
    {
      name: 'open',
      type: 'confirm',
      default: false,
      description: 'org.vue.vue-webpack.tasks.serve.open',
    },
    {
      name: 'mode',
      type: 'list',
      default: 'development',
      choices: [
        {
          name: 'development',
          value: 'development',
        },
        {
          name: 'production',
          value: 'production',
        },
        {
          name: 'test',
          value: 'test',
        },
        {
          name: '(unset)',
          value: '',
        },
      ],
      description: 'org.vue.vue-webpack.tasks.serve.mode',
    },
    {
      name: 'host',
      type: 'input',
      default: '',
      description: 'org.vue.vue-webpack.tasks.serve.host',
    },
    {
      name: 'port',
      type: 'input',
      default: undefined,
      description: 'org.vue.vue-webpack.tasks.serve.port',
    },
    {
      name: 'https',
      type: 'confirm',
      default: false,
      description: 'org.vue.vue-webpack.tasks.serve.https',
    },
  ],
  // onBeforeRun: ({ answers, args }) => {
  //   // Args
  //   if (answers.open) args.push('--open')
  //   if (answers.mode) args.push('--mode', answers.mode)
  //   if (answers.host) args.push('--host', answers.host)
  //   if (answers.port) args.push('--port', answers.port)
  //   if (answers.https) args.push('--https')

  //   args.push('--dashboard')

  //   // Data
  //   // resetSharedData('serve', true)
  //   // firstRun = true
  //   // hadFailed = false
  // },
  // // onRun: () => {
  // //   api.ipcOn(onWebpackMessage)
  // // },
  // // onExit: () => {
  // //   api.ipcOff(onWebpackMessage)
  // //   // removeSharedData('serve-url')
  // // },
  ...views,
};

module.exports = (api) => {
  api.addTask({
    name: 'Serve Teemill Dashboard',
    command: 'vue-cli-service serve src/teemill/main.js',
    icon: '/_plugin/cli-plugin-multi-app/teedev.png',
    description: 'Start the teemill app in a dev server.',
    priority: -2,
    ...serveTask,
  });
  api.addTask({
    name: 'Serve Teemill Frontend',
    command: 'vue-cli-service serve src/subdomains/main.js',
    icon: '/_plugin/cli-plugin-multi-app/teedev.png',
    description: 'Start the teemill app in a dev server.',
    priority: -3,
    ...serveTask,
  });

  api.addTask({
    name: 'Build Teemill Dashboard',
    command: 'vue-cli-service build src/teemill/main.js',
    icon: '/_plugin/cli-plugin-multi-app/teedev.png',
    description: 'Build the teemill dashboard app for production.',
    priority: -2,
    ...serveTask,
  });
  api.addTask({
    name: 'Build Teemill Frontend',
    command: 'vue-cli-service build src/subdomains/main.js',
    icon: '/_plugin/cli-plugin-multi-app/teedev.png',
    description: 'Build the teemill frontend app for production.',
    priority: -3,
    ...serveTask,
  });

  // console.log(api);
};
