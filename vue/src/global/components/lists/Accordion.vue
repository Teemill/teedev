<template>
  <div class="teedev-accordion">

    <teedev-selection-highlighter vertical>
      <template
        v-for="(item, index) in items"
      >
        <div
          :key="`item-${index}`"
          class="item"
          :class="{ 'open': item.open }"
          @click="toggleOpen(item)"
        >
          <h5><b>{{item.text}}</b></h5>
          <font-awesome-icon v-if="item.items" :icon="faChevronDown" />
        </div>

        <template
          v-if="item.open"
          v-for="(subItem, subIndex) in item.items"
        >
          <div
            :key="`item-${index}-${subIndex}`"
            class="sub-item"
            :class="{ 'open': subItem.open }"
            @click="toggleOpen(subItem)"
          >
            <h5><b>{{subItem.text}}</b></h5>
            <font-awesome-icon v-if="subItem.items" :icon="faChevronDown" />
          </div>

          <template
            v-if="subItem.open"
            v-for="(subSubItem, subSubIndex) in subItem.items"
          >
            <div
              :key="`item-${index}-${subIndex}-${subSubIndex}`"
              class="sub-sub-item"
            >
              <span>{{subSubItem.text}}</span>
            </div>
          </template>
        </template>
      </template>
    </teedev-selection-highlighter>

    <!-- <div
      v-for="(item, index) in items"
      :key="index"
      class="item"
    >
      <h4>{{item.text}}</h4>
      <div
        v-for="(subItem, subIndex) in item.items"
        :key="`${index}-${subIndex}`"
        class="sub-item"
      >
        <h4>{{subItem.text}}</h4>
        <div
          v-for="(subSubItem, subSubIndex) in subItem.items"
          :key="`${index}-${subIndex}-${subSubIndex}`"
          class="sub-sub-item"
        >
          <p>{{subSubItem.text}}</p>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script>
import Vue from 'vue';

import { faChevronDown } from '@fortawesome/pro-light-svg-icons/faChevronDown';

export default {
  name: 'teedev-accordion',
  data() {
    return {
      faChevronDown,
      items: [
        {
          text: 'Components',
          open: false,
          items: [
            {
              text: 'Buttons',
              items: [
                {
                  text: 'Button',
                  href: 'www.iduno.com',
                },
                {
                  text: 'Close Button',
                  href: 'www.iduno.com',
                },
              ],
            },
            {
              text: 'Forms',
              items: [
                {
                  text: 'Form',
                  href: 'www.iduno.com',
                },
                {
                  text: 'Input',
                  href: 'www.iduno.com',
                },
                {
                  text: 'Select',
                  href: 'www.iduno.com',
                },
                {
                  text: 'Toggle',
                  href: 'www.iduno.com',
                },
              ],
            },
          ],
        },
        {
          text: 'Sass Variables',
          items: [
            {
              text: 'Colours',
              items: [
                {
                  text: 'Primary',
                  href: 'www.iduno.com',
                },
                {
                  text: 'Secondary',
                  href: 'www.iduno.com',
                },
                {
                  text: 'Background',
                  href: 'www.iduno.com',
                },
              ],
            },
            {
              text: 'Misc',
              items: [
                {
                  text: 'Border Radius',
                  href: 'www.iduno.com',
                },
                {
                  text: 'Animation',
                  href: 'www.iduno.com',
                },
              ],
            },
          ],
        },
      ],
    };
  },
  methods: {
    toggleOpen(item) {
      if (typeof item.open === 'undefined') {
        Vue.set(item, 'open', false);
      }

      item.open = !item.open;
    },
  },
};
</script>

<style lang="scss" scoped>


.teedev-accordion {
  .item {
    position: relative;
    padding: 1em 0;
    padding-left: 1em;
    cursor: pointer;
    user-select: none;

    h5 { margin: 0 }

    svg {
      position: absolute;
      top: 1.5em;
      right: 1.5em;
      font-size: 0.5em;
      transition: transform $anim-time-m;
    }

    &.open {
      svg {
        transform: rotate(180deg);
      }
    }
  }

  .sub-item {
    position: relative;
    padding: 0.75em 0;
    padding-left: 2em;
    cursor: pointer;
    user-select: none;

    h5 { margin: 0 }

    svg {
      position: absolute;
      top: 1.25em;
      right: 1.5em;
      font-size: 0.5em;
      transition: transform $anim-time-m;
    }

    &.open {
      svg {
        transform: rotate(180deg);
      }
    }
  }

  .sub-sub-item {
    padding: 0.5em 0;
    padding-left: 3em;
    cursor: pointer;
    user-select: none;
  }
}
</style>
