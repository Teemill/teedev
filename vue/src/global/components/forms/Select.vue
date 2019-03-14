<template>
  <div
    class="teedev-select"
    :class="{ 'focused': focused, 'selected': selectedItem !== null }"
    @click="onSelectClick"
  >
    <div class="select">{{items[selectedItem] || (focused ? nonSelected : '&nbsp;')}}</div>
    <div class="placeholder">{{placeholder}}</div>
    <div class="underline"></div>
    <div v-if="focused" class="drop-down">
      <teedev-selection-highlighter vertical>
        <div
          v-for="(item, index) in items"
          :key="index"
          class="select-item"
          :class="{ 'selected': selectedItem === index }"
          @click.stop="onItemClick(index)"
        >{{item}}</div>
      </teedev-selection-highlighter>
    </div>
  </div>
</template>

<script>
import mixin from './_mixins';

export default {
  name: 'teedev-select',
  mixins: [mixin],
  props: {
    name: {
      required: true,
      type: String,
    },
    placeholder: String,
    nonSelected: String,
    items: {
      type: Array,
      default() {
        return [
          'Item A',
          'Item B',
          'Item C',
          'Item D',
          'Item E',
        ];
      },
    },
  },
  data() {
    return {
      focused: false,
      selectedItem: null,
      hoveringItem: null,
    };
  },
  methods: {
    onSelectClick() {
      this.focused = !this.focused;
    },
    onItemClick(index) {
      this.focused = false;
      this.selectedItem = index;
      this.$emit('input', index);
    },
  },
};
</script>

<style lang="scss" scoped>


.teedev-select {
  display: block;
  position: relative;
  border-radius: 0px;
  margin: 1em 0;

  text-align: left;
  cursor: pointer;
  clear: both;

  .select {
    width: 100%;
    padding: 0.75em 0.75em;
    color: $color-text;
    border: none;
    border-bottom: 1px solid $color-secondary;
    border-top-left-radius: $border-radius;
    border-top-right-radius: $border-radius;
    font-size: 1em;
    transition: background-color $anim-time-m;
  }

  .placeholder {
    position: absolute;
    top: 0.75em;
    left: 0.75em;
    pointer-events: none;
    color: $color-secondary;
    transition: font-size $anim-time-m, top $anim-time-m, left $anim-time-m, color $anim-time-m;
  }

  .underline {
    position: absolute;
    left: 50%;
    bottom: 0;
    height: 2px;
    width: 0%;
    margin: 0 auto;
    background-color: $color-primary;
    transition: width $anim-time-m, left $anim-time-m;
  }

  &.focused {
    .select {
      background-color: $color-highlight;
      outline: none;
    }
    .underline {
      width: 100%;
      left: 0%;
    }
  }

  &.selected,
  &.focused {
    .placeholder {
      top: -1.5em;
      left: 0em;
      font-size: 0.75em;
    }
  }

  .drop-down {
    position: absolute;
    width: 100%;
    margin-bottom: 20px;
    background-color: $color-background;
    box-shadow: 0px 1px 8px -2px rgba(0,0,0,0.2);
    z-index: 1000;
    max-height: calc(7.5em + 6px);
    overflow-y: auto;

    .select-item {
      position: relative;
      padding: 0.75em;

      &.selected {
        background-color: rgba(0,0,0,0.05);
      }
    }
  }
}
</style>
