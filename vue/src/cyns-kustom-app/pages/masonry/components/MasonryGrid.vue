<script>
import Grid from '../js/grid';
import GridItem from '../js/gridItem';

const vNode = {
  functional: true,
  render(h, ctx) {
    return ctx.props.node;
  },
};

export default {
  name: 'masonry-grid',

  render(h) {
    const rows = [];

    return h(
      'table',
      { class: ['masonry-grid'] },
      [
        ...this.items.map((item, index) => {
          return h(
            'tr',
            { class: ['grid-row'] },
            [
              h(
                'td',
                { class: ['grid-item'], key: item.uid },
                [
                  `Index: ${index} Order: ${item.order} SlotIndex: ${item.data.vNode.slotIndex}`,
                  h(
                    'teedev-button',
                    {
                      props: { text: 'Up' },
                      on: {
                        click: () => {
                          this.onMoveUp(item);
                        },
                      },
                    }
                  ),
                  h(
                    'teedev-button',
                    {
                      props: { text: 'Down' },
                      on: {
                        click: () => {
                          this.onMoveDown(item);
                        },
                      },
                    }
                  ),
                  this.$slots.default[item.data.vNode.slotIndex],
                ],
              ),
            ],
          );
        }),
      ],
    );
  },

  components: {
    vNode,
  },

  data: () => ({
    grid: null,
  }),

  computed: {
    items() {
      if (!this.grid) {
        return [];
      }

      return this.grid.items.sort((a, b) => a.order - b.order);
    },
  },

  methods: {
    onMoveUp(item) {
      item.order += 1;
    },
    onMoveDown(item) {
      item.order -= 1;
    },
  },

  mounted() {
    const items = this.$slots
      .default
      .map((item, index) => {
        item.slotIndex = index;
        console.log(item);
        return item;
      })
      .filter(slotItem => {
        if (!slotItem.componentOptions) {
          return false;
        }

        return slotItem.componentOptions.tag === 'masonry-grid-item'
      })
      .map(item => ({
        name: item.componentOptions.propsData.name,
        vNode: item,
      }));

    this.grid = new Grid({
      items,
    });

    console.log(this.grid);
  },
}
</script>

<style lang="scss" scoped>
.masonry-grid {
  border: 1px solid #f00;
  width: 100%;
  border-collapse: collapse;

  .grid-row {
    border: 1px solid #000;
  }
}
</style>
