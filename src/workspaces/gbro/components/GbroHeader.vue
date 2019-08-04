<template>
  <div class="header shadow">
    <div class="home-link p-4">
      <router-link
        to="/gbro/"
      >
        <img
          class="h-8"
          :src="require('./../assets/gbro_logo.svg')"
        />
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'gbro-header',
};
</script>

<style lang="scss" scoped>
</style>

