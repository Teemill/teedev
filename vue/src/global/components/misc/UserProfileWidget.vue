<template>
  <div
    class="teedev-profile-widget"
    v-if="$loggedInUser"
    @click="$emit('click')"
  >
    <div class="thumbnail">
      <img
        :style="{ 'height': imageHeight }"
        :src="$teedevHelpers.getUserImage($loggedInUser)"
        :alt="`Profile photo of ${$loggedInUser.name}`"
      />
    </div>
    <div class="name" v-if="!noName">
      <span>{{ $loggedInUser.name }}</span>
    </div>
  </div>
</template>

<script>

export default {
  name: 'teedev-profile-widget',

  props: {
    /**
     * Height of the image to display
     */
    imageHeight: {
      type: String,
      default: 'auto',
    },

    /**
     * Choose not to show the user name
     */
    noName: Boolean,
  },
};

</script>

<style lang="scss" scoped>

.teedev-profile-widget {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  .thumbnail {
    img {
      border-radius: 50%;
    }
  }

  .name {
    span {
      font-size: 0.8rem;
    }
  }
}

</style>
