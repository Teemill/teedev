<script>
export default {
  name: 'test-container',

  render(h) {
    this.getItems();
    const items = this.newItems;
    // const items = this.$slots.default;

    items.forEach((item) => {
      console.log('Render Elm', item.elm);
      // item.componentInstance.$forceUpdate();
    });

    return h(
      'div',
      { class: ['test-container'] },
      [
        h('p', `[Container | Start] [${this._uid}]`),
        ...items,
        h('p', '[Container | End]'),
      ],
    );
  },

  data: () => ({
    newItems: [],
  }),

  methods: {
    getItems() {
      this.newItems = this.$slots.default;
    },
  },

  created() {
    this.$slots.default.forEach((item) => {
      console.log('Created Elm', item.elm);
      // item.componentInstance.$forceUpdate();
    });

    this.newItems = this.$slots.default;

    console.dir(this.$slots.default.__ob__.dep.subs.length);
    console.dir(this.newItems.__ob__.dep.subs.length);
  },
}
</script>
