<template>
  <div class="page-blog">
    <p><font-awesome-icon :icon="faMugHot" /> Cbow... Blog plz :l</p>
  </div>
</template>

<script>
import {
  faMugHot,
} from '@fortawesome/pro-light-svg-icons';

export default {
  name: 'page-blog',

  data: () => ({
    faMugHot,
  }),
};
</script>

<style lang="scss" scoped>
.page-blog {
  padding: 4em;
}
</style>

