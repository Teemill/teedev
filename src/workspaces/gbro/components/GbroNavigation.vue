<template>
  <div class="gbro-navigation flex-shrink w-64 shadow">
    <gbro-nav-item to="/gbro/">
      About
    </gbro-nav-item>
    <gbro-nav-item to="/gbro/formula-e/">
      Formula E
    </gbro-nav-item>
  </div>
</template>

<script>
import GbroNavItem from './GbroNavItem.vue';

export default {
  name: 'gbro-navigation',

  components: {
    GbroNavItem,
  },
};
</script>
