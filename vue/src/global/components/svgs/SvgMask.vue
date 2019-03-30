<template>
  <g>
    <defs>
      <mask :id="uuid">
        <slot name="mask" />
      </mask>
    </defs>
    <g :mask="`url(#${uuid})`">
      <slot />
    </g>
  </g>
</template>

<script>
import uuid from 'uuid/v1';

export default {
  name: 'teedev-svg-mask',

  data: () => ({
    uuid: uuid(),
  }),
};
</script>
