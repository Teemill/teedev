<template>
  <div class="docs-component">
    <h2>{{documentation.name}}</h2>
    <p>{{documentation.description}}</p>

    <teedev-tab-container>
      <teedev-tab name="Example">
        <teedev-component-previewer :documentation="documentation" />
      </teedev-tab>

      <teedev-tab name="Props">
        <teedev-card
          v-for="(prop, index) in documentation.props"
          :key="index"
        >
          <teedev-column-container>
            <teedev-column>
              <p><b>:{{prop.name}}</b></p>
              <!-- <p><small>({{prop.required ? 'Required' : 'Optional'}})</small></p> -->
            </teedev-column>
            <teedev-column min-width="150px">
              <p
                v-for="(type, index) in prop.types"
                :key="index"
              >
                Type: {{type}}
              </p>
              <!-- <p>Default: {{prop.default}}</p> -->
            </teedev-column>
            <teedev-column expand>
              <p>{{prop.description}}</p>
            </teedev-column>
          </teedev-column-container>
          <teedev-form :name="`${documentation.name}-component-props`">
            <teedev-toggle :name="prop.name" placeholder="Show in example" />
          </teedev-form>
        </teedev-card>
      </teedev-tab>

      <teedev-tab name="Events">
        <teedev-card
          v-for="(event, index) in documentation.events"
          :key="index"
          class="event"
        >
          <teedev-column-container>
            <teedev-column>
              <p><b>@{{event.name}}</b></p>
            </teedev-column>
            <teedev-column>
              <p>Trigger: {{event.trigger}}</p>
            </teedev-column>
            <teedev-column expand>
              <p>{{event.description}}</p>
            </teedev-column>
          </teedev-column-container>
          <teedev-form :name="`${documentation.name}-component-events`">
            <teedev-toggle :name="event.name" placeholder="Show in example" />
          </teedev-form>
        </teedev-card>
      </teedev-tab>

      <teedev-tab name="Other">
        <p>Other Tab</p>
      </teedev-tab>
    </teedev-tab-container>
  </div>
</template>

<script>
export default {
  name: 'docs-component',
  props: {
    documentation: Object,
  },
};
</script>

<style lang="scss" scoped>
.docs-component {
  margin: 0 auto;
  max-width: 800px;

  .prop,
  .event {
    margin-bottom: 2em;
  }
}
</style>
