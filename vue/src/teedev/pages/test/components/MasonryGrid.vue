<script>
import { Vector } from '@/global/classes';
import Grid from '../newClasses/grid';

export default {
  name: 'masonry-grid',

  render(h) {
    if (this.grid) {
      return h(
        'div',
        {
          class: ['tml-masonry-grid'],
        },
        [
          h(
            'div',
            { style: { display: 'flex' } },
            [
              h(
                'button',
                { on: { click: () => this.grid._addMatrixRows(1) } },
                ['Add Row'],
              ),
              h(
                'button',
                { on: { click: () => this.grid._addMatrixColumns(1) } },
                ['Add Column'],
              ),
              h(
                'button',
                { on: { click: () => this.grid._generateMatrix() } },
                ['Generate'],
              ),
            ],
          ),
          ...this.grid.matrix.map((row) => {
            return h(
              'div',
              {
                style: {
                  display: 'flex',
                  width: '100%',
                  fontSize: '12px',
                },
              },
              row.map((cell) => {
                return h(
                  'div',
                  {
                    style: {
                      border: `1px solid ${cell.content ? '#f00' : '#000'}`,
                      padding: '0.5em',
                      flex: 1,
                    },
                  },
                  [
                    `[${cell.position.x}, ${cell.position.y}]`,
                    '\n',
                    cell.content,
                  ],
                );
              }),
            );
          }),
        ],
      );
    }
  },

  data: () => ({
    grid: null,
  }),

  methods: {
    initialise() {
      this.grid = new Grid({
        columns: 6,
      });

      console.log(this.grid);

      this.grid.setArea(
        new Vector(0, 0),
        new Vector(1, 1),
        'A',
      );

      this.grid.setArea(
        new Vector(0, 0),
        new Vector(1, 1),
        'B',
      );

      // this.grid._insertRows(1, 1);

      window.GRID = this.grid;
    },
  },

  mounted() {
    this.initialise();
  },
};
</script>

<style lang="scss" scoped>
.tml-masonry-grid {
  display: grid;
  border: 1px solid #000;

  font-family: Consolas;
}
</style>
