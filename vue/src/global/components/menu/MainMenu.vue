<template>
  <div class="teedev-main-menu">
    <div class="inner">
      <teedev-main-menu-block
        type="list"
        title="Mens"
      />
      <teedev-main-menu-block
        type="list"
        title="Womens"
      />
      <teedev-main-menu-block
        type="media"
        title="Mens"
        img="https://teemill.com/uploaded/thumbnails/366/5b893ce13b8571.39641230_366_960xauto.jpg"
      />
      <teedev-main-menu-block
        type="media"
        title="Womens"
        img="https://teemill.com/uploaded/thumbnails/365/5b893cf2021251.69548348_365_960xauto.jpg"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'teedev-main-menu',
};
</script>

<style lang="scss" scoped>
.teedev-main-menu {
  position: absolute;
  top: 6em;
  left: 0;
  right: 0;
  height: 22em;
  background-color: #fff;
  box-shadow: 0 2px 4px -2px rgba(0,0,0,0.2), inset 0 2px 4px -2px rgba(0,0,0,0.2);

  .inner {
    display: flex;
    margin: 0 auto;
    height: 100%;
    max-width: 1200px;
  }
}
</style>
