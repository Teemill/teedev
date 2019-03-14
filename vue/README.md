# Layout / Structure

```html
<App>
  <Shell>
    <Layout>
      <Page />
    </Layout>
  </Shell>
</App>
```

```html
Imported from @/your-app/App.vue
<App>
  <!-- App.vue (The entry point for the app) -->
</App>
```

```html
Imported from @/core/components/Shell.vue
<Shell>
  <!-- Any stuff that is required for ALL pages -->
  <router-view />
  <page-transition />
</Shell>
```

```html
Imported from @/global/layouts/Standard.vue
<Layout>
  <!-- Any common layout specific stuff -->
  <header />
  <mobile-nav />
  <footer />
</Layout>
```

```html
Imported from @/your-app/pages/your-page/YourPage.vue
<Page>
  <!-- Anything specific to a page -->
  <page-content />
</Page>
```




# MultiAppTemplate

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Run your end-to-end tests
```
npm run test:e2e
```

### Run your unit tests
```
npm run test:unit
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
