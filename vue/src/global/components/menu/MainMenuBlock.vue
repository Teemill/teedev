<template>
  <div class="teedev-main-menu-block" :class="{ 'double': double }">
    <div
      v-if="type === 'media'"
      class="media"
      :style="{ 'background-image': `url(${img})` }"
    >
      <div class="content">
        <h4 class="title">{{title}}</h4>
        <div class="underline"></div>
      </div>
    </div>
    <div
      v-else
      class="list"
    >
      <h4 class="title">{{title}}</h4>
      <ul>
        <teedev-selection-highlighter vertical>
          <li>List</li>
          <li>List</li>
          <li>List</li>
          <li>List</li>
        </teedev-selection-highlighter>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'teedev-main-menu-block',
  props: {
    type: String,
    title: String,
    img: String,
    double: Boolean,
  },
};
</script>

<style lang="scss" scoped>


.teedev-main-menu-block {
  flex-basis: 25%;
  overflow: hidden;

  &.double {
    flex-basis: 50%;
  }

  .media {
    position: relative;
    height: 100%;
    background-size: cover;
    background-position: center;
    cursor: pointer;

    .content {
      position: absolute;
      left: 1em;
      bottom: 1em;
      right: 1em;
      padding: 1em;
      background-color: rgba(255,255,255,0.9);
      border-radius: $border-radius;
      box-shadow: 0 1px 4px 0 rgba(0,0,0,0.4);
      text-align: center;

      .title {
        margin: 0;
      }
    }
  }

  .list {
    padding: 1em;

    .title {
      padding-bottom: 0.5em;
      margin-bottom: 0.5em;
      border-bottom: 1px solid $color-secondary;
    }

    ul {
      list-style: none;
      padding: 0;
      margin: 0;

      li {
        padding: 0.5em;
        cursor: pointer;
      }
    }
  }
}
</style>
