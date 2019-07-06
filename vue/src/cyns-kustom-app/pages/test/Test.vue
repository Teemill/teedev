<template>
  <div class="page-test">
    <flexy-container>
      <div
        class="content"
        :style="{
          height: `${height}px`,
        }"
      >
        <teedev-button
          text="Click Me"
          @click="onClick"
        />

        <p>Content</p>
        <p>Content</p>
        <p>Content</p>
        <p>Content</p>
        <p>Content</p>
        <p>Content</p>
        <p>Content</p>
        <p>Content</p>
        <p>Content</p>
        <p>Content</p>
        <p>Content</p>
        <p>Content</p>
        <p>Content</p>
      </div>
    </flexy-container>
    <teedev-button
      text="Click Me"
      @click="onClick"
    />
  </div>
</template>

<script>
import FlexyContainer from './components/FlexyContainer';

export default {
  name: 'page-test',

  components: {
    FlexyContainer,
  },

  data: () => ({
    height: 300,
  }),

  methods: {
    onClick() {
      if (this.height === 300) {
        this.height = 100;
      } else {
        this.height = 300;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.page-test {
  padding: 4em;
}
</style>
