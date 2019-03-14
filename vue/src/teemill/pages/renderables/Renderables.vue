<template>
  <div class="page-renderables">
    <p>[Page]</p>

    <input type="text" v-model="testVar" />

    <container>
      <inner-comp>
        <input type="text" v-model="testVar" />
      </inner-comp>
      <inner-comp>
        <input type="text" v-model="testVar" />
      </inner-comp>
      <inner-comp>
        <input type="text" v-model="testVar" />
      </inner-comp>
    </container>
  </div>
</template>

<script>
import Container from './components/Container';
import InnerComp from './components/InnerComp';

export default {
  name: 'page-renderables',

  components: {
    Container,
    InnerComp,
  },

  data: () => ({
    testVar: '123',
  }),
}
</script>
