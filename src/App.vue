<template>
  <div id="app">
    <transition name="page" mode="out-in">
      <router-view/>
    </transition>
  </div>
</template>

<style lang="scss" scoped>
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

.page-enter-active,
.page-leave-active {
  transition: opacity 0.1s, transform 0.1s;

  &.page-enter,
  &.page-leave-to {
    opacity: 0;
    transform: translate(1rem);
  }
}
</style>
