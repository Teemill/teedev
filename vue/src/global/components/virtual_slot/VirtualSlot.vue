<script type="documentation">
/**
 * @name VirtualSlot
 * @description A component used to render it's contents at a different location. This component
 * must be used in conjunction with the VirtualSlotContainer as this is where the content will be
 * rendered.
 *
 * @prop { String } slotGroup The unique name of the VirtualSlot that links it to the
 * VirtualSlotContainer. And VirtualSlotContainer with the same name will render the contents of
 * then VirtualSlot.
 *
 * @example <div>
 *    <hr>
 *    <p>Button is here in template</p>
 *    <teedev-virtual-slot slot-group="magic-v-slot">
 *      <teedev-button {{ props }} {{ events }} />
 *    </teedev-virtual-slot>
 *    <hr>
 *    <p>Button was rendered here with virtual slots</p>
 *    <teedev-virtual-slot-container slot-group="magic-v-slot" />
 *    <hr>
 * <div>
 */
</script>

<script>
export default {
  name: 'teedev-virtual-slot',
  props: {
    slotGroup: {
      required: true,
      type: String,
    },
  },
  data() {
    return {
      slotData: Array,
    };
  },
  render(h, ctx) {
    this.slotData = this.$slots.default;
  },
  created() {
    this.$store.commit('virtual_slot/addSlot', {
      slotId: this._uid, // eslint-disable-line
      slotGroup: this.slotGroup,
      slotContents: this.$slots.default,
      slotRef: this,
    });
  },
  destroyed() {
    this.$store.commit('virtual_slot/removeSlot', {
      slotId: this._uid, // eslint-disable-line
      slotGroup: this.slotGroup,
    });
  },
};
</script>
