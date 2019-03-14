<template>
  <div class="about">
    <h1>This is an about page</h1>

    <teedev-button text="test" @click="onTestClick" />
    <teedev-button primary text="test" />

    <div style="width: 80%; margin: 0 auto;">
      <teedev-grid
        relative
        :min-item-width="200"
        :max-item-width="300"
        spacing="0.5em"
      >
        <div class="card">Item1</div>
        <div class="card">Item2</div>
        <div class="card">Item3</div>
        <div class="card">Item4</div>
        <div class="card">Item5</div>
        <div class="card">Item5</div>
        <div class="card">Item5</div>
        <div class="card">Item5</div>
        <div class="card">Item5</div>
        <div class="card">Item5</div>
      </teedev-grid>
    </div>
    <div style="width: 80%; margin: 0 auto;">
      <teedev-grid
        relative
        spacing="2em"
        :breakpoints="{
          xl: 6,
          lg: 5,
          md: 4,
          sm: 3,
          xs: 2,
        }"
      >
        <div class="card">Item1</div>
        <div class="card">Item2</div>
        <div class="card">Item3</div>
        <div class="card">Item4</div>
        <div class="card">Item5</div>
        <div class="card">Item5</div>
        <div class="card">Item5</div>
        <div class="card">Item5</div>
        <div class="card">Item5</div>
        <div class="card">Item5</div>
      </teedev-grid>
    </div>

    <div class="fixed-sidebar">
      <div class="sidebar">
        <teedev-accordion />
        <teedev-drop-down />
        <teedev-drop-down>
          <teedev-drop-down>
            <p>Test</p>
            <p>Test</p>
            <p>Test</p>
          </teedev-drop-down>
        </teedev-drop-down>
        <teedev-drop-down />
      </div>
      <div class="content">
        Content
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'page-about',
  methods: {
    onTestClick(e) {
      console.log('Clicked');
      console.log(e);
    },
  },
};
</script>

<style lang="scss" scoped>
.card {
  padding: 5em 1em;
  border: 1px solid $color-secondary;
  border-radius: $border-radius;
  box-shadow: 0 2px 4px -1px rgba(0,0,0,0.2);
}

.fixed-sidebar {
  width: 100%;
  display: flex;

  .sidebar {
    width: 16em;
    // max-height: 400px;
    // padding: 1em 1em 1em 0;
    box-shadow: -2px 0 4px 0 #000;
    overflow-y: auto;
  }
  .content {
    height: 100%;
    flex-grow: 1;
  }
}
</style>
