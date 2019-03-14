<template>
  <div class="teedev-fixed-sidebar">
    <div class="content">
      <slot/>
    </div>
    <div class="sidebar">
      <div class="inner">
        <slot name="sidebar" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'teedev-fixed-sidebar',
};
</script>

<style lang="scss" scoped>
.teedev-fixed-sidebar {
  display: flex;
  
  .content {
    flex-grow: 1;
  }
  
  .sidebar {
    position: relative;
    flex-shrink: 0;
    box-shadow: 0 0 4px rgba(0,0,0,0.1);

    width: 20em;

    .inner {
      position: fixed;
    }
  }
}
</style>
