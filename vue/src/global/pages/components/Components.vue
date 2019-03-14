<template>
  <div class="components">
    <h1>Welcome to Fluid Design</h1>
    <h3>Where things flow</h3>
    <br>
    <teedev-button primary text="Primary Button" @click.native="isOpen = true" /><br><br>
    <teedev-button text="Secondary Button" /><br><br>
    <teedev-form name="test-form">
      <teedev-select
        name="a-select"
        placeholder="Select Input"
        nonSelected="Please select an item"
      />
      <teedev-input name="firstname" placeholder="First Name" left />
      <teedev-input name="lastname" placeholder="Last Name" right />

      <teedev-input name="a-input" placeholder="Username" />
      <teedev-input name="b-input" password placeholder="Password Input" suffix=".teemill.com" />
      <teedev-input name="c-input" placeholder="Input with suffix" suffix=".teemill.com" />

      <teedev-toggle name="toggle-input" placeholder="Toggle Me" />

      <teedev-input v-model="testValue" name="g-input" placeholder="vModel Bound" />

      <teedev-popup v-model="isOpen">
        <h2>This is a popup</h2>
        <p>Amazing!</p>
        <teedev-button primary text="Submit" @click.prevent />
      </teedev-popup>

      <!-- <teedev-popup :open="isOpen">
        <h2>This is a popup 2.0</h2>
        <p>Double Amazing!</p>
        <teedev-button primary text="Submit" @click.native="isOpen = !isOpen" />
      </teedev-popup> -->

      <teedev-button text="Cancel" style="margin-right: 2em;" />
      <teedev-button primary text="Submit" />
    </teedev-form>
  </div>
</template>

<script>
/**
@name Components
@category Frontend
@section Pages
 */

export default {
  data() {
    return {
      testValue: 'testValue',
      isOpen: false,
    };
  },
};
</script>

<style lang="scss" scoped>
  .components {
    margin: 0 auto;
    max-width: 800px;
  }
</style>
