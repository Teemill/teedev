export default {
  computed: {
    isOpen() {
      const isOpen = this.$store.state.overlay_elements[this.group][this.name];
      this.$emit('input', isOpen);
      return isOpen;
    },
  },
};
