export default {
  computed: {
    isOpen() {
      return this.$store.state.overlay_elements[this.group][this.name];
    },
  },
};
