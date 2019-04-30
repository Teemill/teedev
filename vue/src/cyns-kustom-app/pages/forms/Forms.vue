<template>
  <div class="page-forms">
    <p>A: {{testValueA}}</p>
    <p>B: {{testValueB}}</p>
    <teedev-input v-model="testValueA" />
    <teedev-form>
      <teedev-input
        name="test123"
        :left-icon="faSheep"
        label="I am input"
        v-model="testValueA"
      />
      <teedev-input
        name="test124"
        :left-icon="faSheep"
        prefix="[prefix]"
        suffix="[suffix]"
        label="I am input"
        v-model="testValueA"
      />
      <teedev-input
        v-model="testValueB"
      />
      <teedev-input
        :left-icon="faSheep"
        :right-icon="faSheep"
        prefix="[Prefix]_"
        suffix="_[Suffix]"
        value="_[Value]_"
      />
      <teedev-input
        prefix="[Prefix]_"
        value="_[Value]"
      />
      <teedev-input
        suffix="_[Suffix]"
        value="[Value]_"
      />
      <teedev-input
        prefix="[Prefix]_"
        suffix="_[Suffix]"
      />
    </teedev-form>
  </div>
</template>

<script>
import { faSheep } from '@fortawesome/pro-light-svg-icons/faSheep';

export default {
  name: 'page-forms',

  data: () => ({
    faSheep,

    testValueA: 'testValueA',
    testValueB: 'testValueB',
  }),
}
</script>

<style lang="scss" scoped>
.page-forms {
  padding: 4em;
}
</style>

