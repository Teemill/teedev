<template>
  <shell>
    <router-view />
  </shell>
</template>

<script>
import '@/global/assets/scss/core.scss';

import Shell from '@/core/components/Shell';

export default {
  name: 'app',

  components: {
    Shell,
  },
};
</script>
