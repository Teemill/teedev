<script>
import Animation from '@/global/plugins/animation';

export default {
  name: 'teedev-animation',

  props: {
    value: {
      type: Number,
      required: true,
    },

    time: {
      type: Number,
      required: true,
    },
  },

  render() {
    return this.$scopedSlots.default({
      value: this.animatedValue,
    });
  },

  data: () => ({
    animatedValue: new Animation(),
  }),

  watch: {
    value(newValue, oldValue) {
      this.animatedValue.start(oldValue, newValue, this.time);
    },
  },

  mounted() {
    this.animatedValue.start(this.value, this.value, 0);
  },
}
</script>
