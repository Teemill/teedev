<template>
  <div class="teedev-component-previewer">
    <div class="viewport">
      <div class="title">
        Preview
      </div>
      <div class="inner">
        <v-runtime-template :template="`<div>${processedExampleString}</div>`" />
      </div>
    </div>
    <teedev-tab-container>
      <teedev-tab name="Prop Editor">
        <teedev-column-container>
          <teedev-column>
            <p>Props</p>
            <teedev-form :name="`${documentation.name}-preview-props`">
              <!-- <div
                v-if="$store.getters['forms/getValue'](
                  `${documentation.name}-component-props`, prop.name)"
                v-for="(prop, index) in documentation.props"
                :key="index"
              >
                <teedev-toggle
                  v-if="prop.types[0] === 'Boolean'"
                  :name="prop.name"
                  :placeholder="prop.name"
                  v-model="componentProps[prop.name]"
                />
                <teedev-input
                  v-else
                  :name="prop.name"
                  :placeholder="prop.name"
                  v-model="componentProps[prop.name]"
                />
              </div> -->
            </teedev-form>
          </teedev-column>
          <teedev-column>
            <p>Events</p>
            <div class="event-list">
              <!-- <transition-group name="event-list" tag="div">
                <p
                  v-for="(event, index) in componentEvents"
                  :key="index"
                  class="event"
                >
                  Event
                  <span class="event-name">@{{event}}</span>
                  happened.
                </p>
              </transition-group> -->
            </div>
          </teedev-column>
        </teedev-column-container>
      </teedev-tab>
      <teedev-tab name="Component Code">
        <teedev-code lang="html" :code="processedExampleString"/>
        <!-- <textarea v-model="documentation.example" @blur="onFinishedEditing"></textarea> -->
      </teedev-tab>
    </teedev-tab-container>
  </div>
</template>

<script>
import VRuntimeTemplate from 'v-runtime-template';

export default {
  name: 'teedev-component-previewer',
  components: {
    VRuntimeTemplate,
  },
  props: {
    documentation: Object,
  },
  computed: {
    processedExampleString() {
      let exampleString = this.documentation.example;

      let props = {};
      const formProps = this.$store.getters['forms/getValues'](
        `${this.documentation.name}-preview-props`,
      );
      if (formProps) {
        props = formProps;
      }

      let events = [];
      const formEvents = this.$store.getters['forms/getValues'](
        `${this.documentation.name}-component-events`,
      );
      if (formEvents) {
        events = formEvents;
      }

      const propsString = this.compilePropsToString(props);
      exampleString = exampleString.replace(
        /{{ props }}/,
        propsString,
      );

      const eventsString = this.compileEventsToString(events);
      exampleString = exampleString.replace(
        /{{ events }}/,
        eventsString,
      );

      return exampleString;
    },
  },
  data() {
    return {
      componentProps: {},
      componentEvents: [],
    };
  },
  methods: {
    onFinishedEditing(e) {
      this.documentation.example = e.target.value;
    },
    onEvent(eventName) {
      this.componentEvents.push(eventName);

      setTimeout(() => {
        this.componentEvents.shift();
      }, 2000);
    },

    compilePropsToString(props) {
      let string = '';
      const propNames = Object.keys(props);
      for (let i = 0; i < propNames.length; i += 1) {
        const propName = propNames[i];
        const propValue = props[propName];
        if (propValue) {
          if (typeof propValue === 'string') {
            string += `${propName}="${propValue}" `;
          } else if (typeof propValue === 'boolean') {
            string += `${propName} `;
          } else {
            string += `:${propName}="${propValue}" `;
          }
        }
      }
      return string;
    },

    compileEventsToString(events) {
      let string = '';
      const eventNames = Object.keys(events);
      for (let i = 0; i < eventNames.length; i += 1) {
        const eventName = eventNames[i];
        const eventValue = events[eventName];
        if (eventValue) {
          string += `@${eventName}="onEvent('${eventName}')" `;
        }
      }
      return string;
    },
  },
};
</script>

<style lang="scss" scoped>


.teedev-component-previewer {
  .viewport {
    position: relative;
    display: flex;
    justify-content: center;
    width: 100%;
    padding: 2em;
    margin-bottom: 1em;
    background-color: rgba(0, 0, 0, 0.05);
    border-radius: $border-radius;

    .title {
      position: absolute;
      top: 1em;
      left: 1em;
      padding: 0.5em 0.75em;
      background-color: rgba(0,0,0,0.05);
      color: rgba(0,0,0,0.5);
      border-radius: $border-radius;
      font-size: $font-size-s;
      pointer-events: none;
    }

    .inner {
      padding: 2em;
      background-color: $color-background;
      border-radius: $border-radius;
      box-shadow: 0 2px 16px -2px rgba(0, 0, 0, 0.4);
    }
  }

  .event-list {
    .event {
      // border: 1px solid #f00;
      .event-name {
        color: $color-primary;
      }
    }
    .event-list-enter-active, .event-list-leave-active {
      transition: all 1s;
    }
    .event-list-enter,
    .event-list-leave-to {
      opacity: 0;
      transform: translateX(20px);
    }
  }
}
</style>
