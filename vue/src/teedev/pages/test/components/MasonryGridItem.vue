<script>
export default {
  name: 'masonry-grid-item',

  props: {
    columns: {
      required: true,
      type: Number,
    },
  },

  render(h) {
    return h(
      'div',
      {
        class: ['tml-masonry-grid-item'],
        style: {
          height: `${this.height}px`,
        },
      },
      [
        ...this.$slots.default,
      ],
    );
  },

  data: () => ({
    height: 0,
  }),
};
</script>

<style lang="scss" scoped>
.tml-masonry-grid-item {
  border: 1px solid #000;
}
</style>
