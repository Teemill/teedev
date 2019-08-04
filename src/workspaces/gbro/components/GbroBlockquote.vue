<template>
  <div class="blockquote">
    <div class="quote">
      <p>"{{ quote }}"</p>
    </div>
    <div class="cite">
      <p>- {{ cite }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'gbro-blockquote',

  props: {
    quote: {
      type: String,
      required: true,
    },

    cite: {
      type: String,
    },
  },
};
</script>

<style lang="scss" scoped>
.blockquote {
  .quote {
    border-left: 0.25em solid #c9c9c9;
    padding-left: 0.75em;
    font-style: italic;
    font-size: 1.2em;
    margin-bottom: 0.5em;
  }

  .cite {
    * {
      text-align: right !important;
    }
  }
}
</style>
