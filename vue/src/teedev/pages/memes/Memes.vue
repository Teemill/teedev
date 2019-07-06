<template>
  <div class="page-memes">
    <p><font-awesome-icon :icon="faGhost" /> Memes Page</p>
  </div>
</template>

<script>
import {
  faGhost,
} from '@fortawesome/pro-light-svg-icons';

export default {
  name: 'page-memes',

  data: () => ({
    faGhost,
  }),
};
</script>

<style lang="scss" scoped>
.page-memes {
  padding: 4em;
}
</style>

