
<template>
  <div class="teedev-virtual-slot-container">
    <virtual-slot
      v-for="(slot, index) in $store.state.virtual_slot.slotGroups[slotGroup]"
      :key="index"
      :slot="slot"
    />
  </div>
</template>

<script>
const VirtualSlot = {
  functional: true,
  render(h, ctx) {
    return h(
      'div',
      ctx.props.slot.slotData,
    );
  },
};

export default {
  name: 'teedev-virtual-slot-container',
  props: {
    slotGroup: {
      required: true,
      type: String,
    },
  },
  components: {
    VirtualSlot,
  },
};
</script>
