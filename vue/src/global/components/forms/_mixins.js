export default {
  inject: [
    'register',
    'setValue',
    'getValue',
  ],
  props: {
    value: '',
  },
  computed: {
    internalValue: {
      get() {
        return this.getValue(this.name);
      },
      set(value) {
        this.$emit('input', value);
        this.setValue(this.name, value);
      },
    },
  },
  methods: {
    onInput(e) {
      this.$emit('input', e.target.value);
    },
  },
  created() {
    this.register(this.name, { value: this.value });
  },
  watch: {
    value: {
      immediate: true,
      handler(value) {
        this.internalValue = value;
      },
    },
  },
};
