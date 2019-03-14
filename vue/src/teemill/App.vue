<template>
  <shell>
    <component :is="layout">
      <router-view />
    </component>
  </shell>
</template>

<script>
import Shell from '@/core/components/Shell';

import NoneLayout from '@/global/layouts/None';
import StandardLayout from '@/global/layouts/Standard';
import { setTimeout } from 'timers';
// import domCollector from '@/core/dom-collector';

export default {
  name: 'app',

  components: {
    Shell,
    NoneLayout,
    StandardLayout,
  },

  computed: {
    layout() {
      const pageLayout = this.$store.state.route.meta.layout;

      if (pageLayout) {
        return `${pageLayout}-layout`;
      }

      return 'none-layout';
    },
  },

  // mounted() {
  //   setTimeout(() => {
  //     console.log(domCollector.capture());
  //   }, 1000);
  // },
};
</script>
