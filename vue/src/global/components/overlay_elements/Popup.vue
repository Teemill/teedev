<template>
  <teedev-virtual-slot slot-group="popup">
    <transition name="popupshadow">
      <div v-if="isOpen" class="shadow">
        <div class="inner"></div>
      </div>
    </transition>
    <transition name="popup">
      <div v-if="isOpen" class="teedev-popup">
        <div class="popup">
          <teedev-close @click.native="$store.commit('overlay_elements/close', {group, name});" />
          <slot />
        </div>
      </div>
    </transition>
  </teedev-virtual-slot>
</template>

<script>
import mixin from './_mixins.js';

export default {
  name: 'teedev-popup',
  mixins: [mixin],
  props: {
    value: Boolean,
  },
  data() {
    return {
      name: this._uid,
      group: 'popup',
    };
  },
  created() {
    this.$store.commit('overlay_elements/add', {
      group: this.group,
      name: this.name,
    });
  },
  destroyed() {
    this.$store.commit('overlay_elements/remove', {
      group: this.group,
      name: this.name,
    });
  },
  watch: {
    value(value) {
      this.$store.commit('overlay_elements/setState', {
        group: this.group,
        name: this.name,
        open: value,
      });
    },
  },
};
</script>

<style lang="scss" scoped>


.teedev-popup {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2001;

  .popup {
    position: relative;
    padding: 2em;
    margin: 4em;
    background-color: $color-background;
    border-radius: $border-radius;
    box-shadow: 0 2px 8px 0 #000;

    min-width: 600px;
    min-height: 400px;

    overflow: hidden;
  }

  &.popup-enter-active {
    animation-duration: $anim-time-l;
    .popup {
      animation: popup-enter $anim-time-l;
    }
  }
  &.popup-leave-active {
    animation-duration: 0.5s;
    .popup {
      animation: popup-leave $anim-time-l;
    }
  }
}

.shadow {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.2);
  z-index: 2000;

  .inner {
    position: absolute;
    top: calc(50% - 40em);
    left: calc(50% - 40em);
    width: 80em;
    height: 80em;
    border-radius: 50%;
    opacity: 0;

    background-color: rgba(0,0,0,0.1);
  }

  &.popupshadow-enter-active {
    animation: popup-shadow-enter $anim-time-l;
    .inner {
      animation: popup-shadow-inner-enter $anim-time-l ease-in;
    }
  }
  &.popupshadow-leave-active {
    animation: popup-shadow-leave $anim-time-l;
    .inner {
      animation: popup-shadow-inner-leave $anim-time-l;
    }
  }
}

@keyframes popup-enter {
  0% { transform: scale(0.90) translateY(1em); opacity: 0}
  50% { transform: scale(0.90) translateY(1em); opacity: 0 }
  100% { transform: scale(1) translateY(0em); opacity: 1 }
}
@keyframes popup-leave {
  0% { transform: scale(1) translateY(0em); opacity: 1 }
  50% { transform: scale(0.90) translateY(1em); opacity: 0 }
  100% { transform: scale(0.90) translateY(1em); opacity: 0 }
}

@keyframes popup-shadow-enter {
  0% { background-color: rgba(0,0,0,0) }
  50% { background-color: rgba(0,0,0,0) }
  100% { background-color: rgba(0,0,0,0.2) }
}
@keyframes popup-shadow-leave {
  0% { background-color: rgba(0,0,0,0.2) }
  50% { background-color: rgba(0,0,0,0) }
  100% { background-color: rgba(0,0,0,0) }
}
@keyframes popup-shadow-inner-enter {
  0% {
    transform: scale(0);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 0;
  }
}
// @keyframes popup-shadow-inner-leave {
//   0% {
//     transform: scale(1);
//     opacity: 0;
//   }
//   100% {
//     transform: scale(0);
//     opacity: 1;
//   }
// }
</style>
