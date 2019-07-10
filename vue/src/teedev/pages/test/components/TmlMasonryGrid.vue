<script>
/**
 *
 * !!
 * ! This component is still work in progress.
 * ! Expect Bugs, issues and unfinished code.
 * !!
 *
 */

import { getBreakpoint } from '../classes/global';

import {
  Vector,
  FrameQueue,
} from '@/global/classes';

import Animation from '../classes/animation';
import Relativity from '../classes/relativity';
import GridMatrix from '../classes/grid-matrix';
import MasonryGridItem from '../classes/grid-matrix-item';

const frameQueue = new FrameQueue();

export default {
  name: 'tml-masonry-grid',

  props: {
    rowHeight: {
      type: Number,
      default: 30,
    },

    spacing: {
      type: Number,
      default: 8,
    },

    columns: {
      type: [Number, Object],
      default: () => ({
        xs: 6,
        lg: 12,
      }),
    },

    draggable: {
      type: Boolean,
    },
  },

  render(h) {
    if (this.$slots.default.length !== this.areaItems.length) {
      this.updateItems(true);
    }

    return h(
      'div',
      {
        class: {
          'tml-masonry-grid': true,
          dragging: !!this.selectedItem && this.relativity.isHolding,
          draggable: this.draggable,
        },
        style: {
          gridTemplateColumns : `repeat(${this.matrix.columns}, 1fr)`,
          gridTemplateRows    : this.matrix.getRowHeightCSS(this.rowHeight),
        },
        ref: 'grid',
      },
      [
        ...this.areaItems.map(item => h(
          'div',
          {
            key: item.data.uid,
            class: {
              item: true,
              holding: this.relativity.isHolding &&
                this.selectedItem &&
                this.selectedItem.data.uid === item.data.uid,
            },
            style: {
              gridColumnStart : item.position.x + 1,
              gridColumnEnd   : item.position.x + item.size.x + 1,
              gridRowStart    : item.position.y + 1,
              gridRowEnd      : item.position.y + item.size.y + 1,
              transform       : `translate(${item.offset.berp.x}px, ${item.offset.berp.y}px)`,
              width           : '100%',
              zIndex          : item.data.uid === this.lastMovedUid ? 2 : null,
            },
            on: {
              mousedown:  $event => this.onMouseDown($event, item),
              touchstart: $event => this.onMouseDown($event, item),
            },
          },
          [this.$slots.default[item.data.slotIndex]],
        )),

        this.showDebugger ? h(
          'masonry-grid-debugger',
          {
            ref: 'debugger',
            props: {
              masonryGrid: this,
            },
          },
          [],
        ) : null,
      ],
    );
  },

  data() {
    return {
      items        : [],
      areaItems    : [],
      relativity   : null,
      selectedItem : null,
      lastMovedUid : null,

      updatingItems: false,

      showDebugger: false,
    };
  },

  provide() {
    return {
      rowHeight     : this.rowHeight + this.spacing,
      requestUpdate : this.requestUpdate,
      draggable     : this.draggable,
      matrix        : () => this.matrix,
    };
  },

  methods: {
    requestUpdate(shouldMap = false) {
      if (!this.updatingItems) {
        this.updatingItems = true;
        frameQueue.add(() => {
          this.updateItems(shouldMap);

          this.updatingItems = false;
        });
      }
    },

    getVNodeFromItem(item) {
      return this.$slots.default[item.data.slotIndex];
    },

    mapSlot() {
      this.items = this.$slots.default
        .map((item, slotIndex) => {
          item.slotIndex = slotIndex;

          return item;
        })
        .filter(item => item.componentOptions && item.componentOptions.tag === 'tml-masonry-grid-item')
        .map((vNode, index) => new MasonryGridItem(index, vNode))
        .sort((a, b) => a.order - b.order);
    },

    reloadMatrix() {
      this.matrix.clearMatrix();

      this.items.forEach((item) => {
        let startPosition = new Vector(0, 0);

        if (this.matrix.lastArea) {
          startPosition = this.matrix.lastArea.position.copy();
        }

        if (!item.component) {
          this.$nextTick(() => {
            this.requestUpdate(true);
          });
        }

        this.matrix.setArea(
          this.matrix.findEmptyArea(
            item.size,
            startPosition,
          ),
          item.size,
          item,
        );
      });
    },

    updateItems(shouldMap = false) {
      if (this.$slots.default) {
        if (shouldMap) {
          this.mapSlot();
        }

        this.reloadMatrix();

        this.areaItems = this.matrix.areas.map((item) => {
          const oldItem = this.areaItems.find((previousItem) => {
            if (previousItem && item) {
              return previousItem.data.uid === item.data.uid;
            }

            return false;
          });

          if (oldItem) {
            item.offset = oldItem.offset;
          } else {
            item.offset = new Animation('vector');
          }

          return item;
        });
      }
    },

    onMouseDown(event, item) {
      this.selectedItem = item;
      this.lastMovedUid = item.data.uid;

      if (this.draggable) {
        this.relativity.setElement(
          this.$slots.default[this.selectedItem.data.slotIndex].elm,
          event,
        );
      }
    },

    onResize() {
      const columns = getBreakpoint(this.columns);

      if (columns !== this.matrix.columns) {
        this.matrix.columns = columns;

        this.requestUpdate();
      }
    },

    onReorder() {
      this.$emit(
        'reorder',
        this.areaItems.filter(item => !!item).map(item => item.data),
      );
    },
  },

  created() {
    this.matrix = new GridMatrix({ columns: getBreakpoint(this.columns) });
    this.relativity = new Relativity(
      {},
      {
        onClick: () => {
          this.$emit('clickedBlock', this.selectedItem.data);
        },

        onDrag: (relativity) => {
          this.selectedItem.offset.startValue.add(relativity.mouseMovement);

          if (this.$refs.debugger) {
            this.$refs.debugger.onDrag(relativity);
          }
        },

        onDrop: (relativity) => {
          const cellPosition = this.matrix.positionToCell(
            relativity.mousePosition,
            this.$refs.grid,
            this.spacing,
          );

          const previousItem = this.matrix.findNearestItem(cellPosition);
          let reordered = false;

          if (previousItem) {
            if (previousItem.data.uid !== this.selectedItem.data.uid) {
              this.areaItems.splice(
                previousItem.data.order,
                0,
                this.areaItems.splice(this.selectedItem.data.order, 1)[0],
              );

              reordered = true;

              this.onReorder();
            }
          }

          // TODO - Bit of a hack to have at least some animation.
          // TODO - Animations in general need to be fixed.
          if (!reordered) {
            this.selectedItem.offset
              .start(null, new Vector(0, 0), 100)
              .then((animation) => {
                animation.startValue = new Vector(0, 0);
                animation.currentTime = 0;
              });
          } else {
            this.selectedItem.offset.startValue = new Vector(0, 0);
          }

          this.selectedItem = null;
        },
      },
    );

    window.addEventListener('resize', this.onResize);
  },

  mounted() {
    this.relativity.setContainer(this.$refs.grid);
  },

  destroyed() {
    window.removeEventListener('resize', this.onResize);
  },
};
</script>

<style lang="scss" scoped>
.tml-masonry-grid {
  position: relative;
  display: grid;
  grid-gap: 8px;

  .item {
    will-change: transform;
  }

  .tml-masonry-grid-item {
    box-shadow: 0px 1px 0px rgba(0,0,0,0);
    outline: 1px solid rgba(0,0,0,0);
    transition: box-shadow 0.2s, opacity 0.2s, outline-color 0.4s, transform 0.2s;
    will-change: transform;
  }

  &.draggable {
    user-select: none;

    .holding {
      z-index: 1;

      .tml-masonry-grid-item {
        transform: scale(0.9);
        box-shadow: 2px 3px 8px rgba(0,0,0,0.2);
        opacity: 0.8;
      }
    }
  }
}
</style>
