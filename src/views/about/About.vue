<template>
  <div class="about">
    <h1>This is an about page</h1>
    <button @click="onClick(1)">1 Iteration</button>
    <button @click="onClick(100)">100 Iterations</button>
    <button @click="onClick(10000)">10000 Iterations</button>
    <button @click="onClick(1000000)">1000000 Iterations</button>
    <button @click="onClick(10000000)">10000000 Iterations</button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import faker from 'faker';

// import { Dot } from '@teedev/core';
// import '@/search.ts';

export default Vue.extend({
  name: 'page-about',

  data: () => ({
    data: [] as any[],
  }),

  methods: {
    createData(amount: number) {
      for (let i = 0; i < amount; i++) {
        this.data.push({
          id: i,
          name: faker.name.findName(),
          email: faker.internet.email(),
          job: faker.name.jobTitle(),
          description: faker.random.words(10),
          test: {
            first: 'test123',
          },
          options: [
            {
              name: faker.finance.accountName(),
            },
            {
              name: faker.finance.accountName(),
            },
            {
              name: faker.finance.accountName(),
            },
          ],
        });
      }
    },

    onClick(count: number) {
    //   this.createData(10);

    //   let t = performance.now();
    //   console.log(Dot.getMany(
    //     [
    //       'name',
    //       'description',
    //       'test.first',
    //     ],
    //     this.data,
    //   ).flat());
    //   console.log('Time', `${(performance.now() - t).toFixed(2)}ms`);

    //   let value = 0;
    //   t = performance.now();

    //   for (let i = 0; i < count; ++i) {
    //     value = window.test('save our seas', 'save');
    //   }

    //   console.log('Time', `${(performance.now() - t).toFixed(2)}ms`);
    //   console.log('Value', value);
    },
  },
});
</script>

<style lang="scss" scoped>
button {
  padding: 1em;
  margin: 0.5em;
  border: 1px solid;
}
</style>
