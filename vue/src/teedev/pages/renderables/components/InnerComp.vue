<template>
  <div class="test-inner-thing">
    <p>[Inner] [{{_uid}}]</p>
    <slot />
  </div>
</template>

<script>
export default {
  name: 'test-inner-thing',
}
</script>
