<template>
  <div class="page-home">
    <!-- <teedev-fixed-sidebar>
      <h1>Heading 1</h1>
      <h2>Heading 2</h2>
      <h3>Heading 3</h3>
      <h4>Heading 4</h4>
      <h5>Heading 5</h5>
      <h6>Heading 6</h6>
      <p>Paragraph</p>
      <p>
        Regular
        <small>Small </small>
        <b>Bold </b>
        <i>Itallic</i>
      </p>
      <a href="/">Anchor</a>
      <hr>
      <teedev-button class="m-1" primary text="Primary" />
      <teedev-button class="m-1" text="Standard" />
      <teedev-button class="m-1" primary :icon="faMugHot" text="Primary Icon" />
      <teedev-button class="m-1" :icon="faMugHot" text="Standard Icon" />
      <teedev-button class="m-1" primary :icon="faCheck" />
      <teedev-button class="m-1" :icon="faCheck" />
      <teedev-button class="m-1" primary loading text="Primary Loading" />
      <teedev-button class="m-1" loading text="Standard Loading" />
      <teedev-button class="m-1" primary fill text="Primary Fill" />
      <teedev-button class="m-1" fill text="Standard Fill" />
      <teedev-input class="m-1" label="Standard Input" v-model="test" />
      <teedev-input class="m-1" label="Standard Input" v-model="test" />
      {{test}}
      <teedev-ping />
    
      <template slot="sidebar">
        <p>Sidebar Slot</p>
      </template>
    </teedev-fixed-sidebar> -->
  </div>
</template>

<script>
import { faMugHot } from '@fortawesome/pro-light-svg-icons/faMugHot';
import { faCheck } from '@fortawesome/pro-light-svg-icons/faCheck';

import '@/global/plugins/helpers/test';

export default {
  name: 'page-home',

  data: () => ({
    faMugHot,
    faCheck,
  }),

  mounted() {
    // const frameQueue = new FrameQueue();

    // frameQueue.add(() => {
    //   console.log('Ran Queue Item');
    // });

    // console.log(frameQueue);
  },
};
</script>

<style lang="scss" scoped>
.page-home {
  // padding: 1em;
}
</style>
