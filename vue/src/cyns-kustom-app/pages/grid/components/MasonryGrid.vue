<script>
import GridMatrix from '../js/gridMatrix';
import { Vector } from '@/global/plugins/physics';

export default {
  name: 'masonry-grid',

  render(h) {
    return h(
      'div',
      {
        class: ['masonry-grid'],
        style: {
          'grid-template-columns': `repeat(${this.matrix.columns}, 1fr)`,
          'grid-template-rows': `repeat(${this.matrix.rows}, 30px)`,
        },
      },
      this.items.map((item, index) => {
        return h(
          'div',
          {
            style: {
              'grid-column-start': item.position.x + 1,
              'grid-column-end': item.position.x + item.size.x + 1,
              'grid-row-start': item.position.y + 1,
              'grid-row-end': item.position.y + item.size.y + 1,
            },
          },
          [this.$slots.default[item.data.slotIndex]],
        );
      }),
    );
  },

  data: () => ({
    items: [],
  }),

  methods: {
    updateItems() {
      console.log('Update Items');

      if (this.$slots.default) {
        this.matrix._clearMatrix();

        this.$slots.default
          .map((item, slotIndex) => { item.slotIndex = slotIndex; return item; })
          .filter(item => item.componentOptions && item.componentOptions.tag === 'masonry-grid-item')
          .map((item, index) => {
            return {
              index,
              slotIndex: item.slotIndex,
              size: item.componentOptions.propsData.size.copy(),
            };
          })
          .forEach(item => {
            this.matrix.setArea(
              this.matrix._findEmptyArea(item.size), item.size,
              item
            );
          });

        this.items = this.matrix.areas;
      }
    },
  },

  created() {
    this.matrix = new GridMatrix({ columns: 12 });
  },

  mounted() {
    this.updateItems();
  },

  beforeUpdate() {
    this.updateItems();
  },
}
</script>

<style lang="scss" scoped>
.masonry-grid {
  display: grid;
  grid-gap: 0.5em 0.5em;

  .masonry-grid-item {
    padding: 1em 0.5em;
    box-shadow: 0px 1px 4px rgba(0,0,0,0.2);
    border-radius: 10px;
  }
}
</style>
