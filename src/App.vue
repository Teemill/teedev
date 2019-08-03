<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/devan">Devan Home</router-link> |
      <router-link to="/devan/about">Devan About</router-link> |
      <router-link to="/gbro">Gbro Home</router-link> |
      <router-link to="/gbro/about">Gbro About</router-link>
    </div>
    <transition name="page" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>

<style lang="scss" scoped>
@include page-transition;

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

  overflow-x: hidden;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
