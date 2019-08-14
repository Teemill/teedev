<template>
  <div class="home">
    <img class="center" alt="Vue logo" src="@/assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque laoreet, felis in suscipit varius, ligula diam posuere sapien, ac commodo ex purus ac purus. Aliquam ut scelerisque urna. Etiam id turpis sapien. Curabitur laoreet consectetur quam quis lacinia. Phasellus aliquam fermentum sem posuere vestibulum. In dapibus elit ut tortor blandit aliquam. Fusce vitae faucibus sapien. Vivamus ut mi neque. Donec ex eros, vulputate sed suscipit vel, cursus nec tortor. Nam non lectus nec nulla aliquet faucibus quis in felis. Ut vel sodales eros. Nulla facilisi. Ut est quam, gravida sit amet orci ac, rutrum imperdiet ante. Sed id felis pharetra, semper purus vel, tincidunt nulla.

      Duis lacus nulla, elementum et efficitur nec, consequat quis neque. Integer tempus rutrum justo, nec mollis eros maximus at. Nulla suscipit enim mi, ut vestibulum nisl tempus quis. Pellentesque viverra, felis et congue venenatis, est ipsum molestie nibh, a vulputate sapien elit eu lectus. Praesent egestas sem ut semper facilisis. Sed lobortis facilisis vulputate. Vivamus consequat nunc ac mauris hendrerit, non tristique quam lobortis. Curabitur vitae erat non mi auctor condimentum. Ut auctor nisl nunc, tempor volutpat tortor mollis sit amet. Sed porta pellentesque ante, et porta leo luctus quis. Curabitur scelerisque eu nunc eu suscipit. Suspendisse egestas placerat velit, et lobortis nisi sodales at. Morbi dictum vel mi nec aliquet.

      Pellentesque volutpat, nibh at ullamcorper maximus, ipsum ligula efficitur ligula, ac lacinia nunc tellus feugiat justo. Vestibulum tempus odio et quam elementum, vel dictum est suscipit. Curabitur ullamcorper rhoncus odio. Vivamus mollis auctor magna at commodo. Nunc porta, urna vel bibendum dignissim, lacus neque convallis odio, a bibendum ante enim ut eros. Nulla blandit dolor mi, eget semper diam auctor nec. Nam vel orci lacus. Duis nec commodo nulla. In sit amet dapibus libero. Nullam eget maximus nisl, a sodales mauris. Duis in rhoncus nisi. Sed iaculis nibh at elit elementum consequat.

      Suspendisse commodo enim a sagittis posuere. Praesent facilisis, lorem dignissim eleifend sodales, quam augue lobortis leo, viverra aliquet ante nibh a mi. Aliquam id eleifend erat, vitae vulputate nisl. Donec faucibus dignissim mauris eu sagittis. Cras in sapien eu est accumsan molestie sed euismod nisl. Morbi et imperdiet libero. Morbi scelerisque ex ut tempus tristique. Proin neque ligula, cursus id nulla et, porta dignissim sapien. Etiam porttitor, nulla et convallis pretium, urna nibh vehicula ante, et auctor purus arcu vitae tortor. Nullam semper purus sed convallis dignissim. Mauris condimentum elit a eleifend accumsan. Aenean interdum commodo felis sed placerat.

      Pellentesque orci mauris, egestas ac magna id, luctus consequat magna. Morbi lobortis orci at leo mollis, non iaculis dui accumsan. Fusce in massa vitae diam condimentum ullamcorper in in leo. Pellentesque eget risus consectetur, malesuada augue vel, fermentum augue. Ut non ex non elit vulputate blandit nec eu turpis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam sed tempor nisl, a consequat ligula. Vivamus nisi nunc, pretium id tellus non, posuere tempor enim. Vestibulum sit amet urna ultricies eros dapibus sodales. Curabitur lobortis vehicula nibh, ac convallis est suscipit porta. Phasellus sit amet metus nunc. Sed dapibus, odio at scelerisque tristique, lectus eros ornare erat, vel posuere orci turpis eget massa.
    </p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src

import Meme from '@/meme.ts';

export default Vue.extend({
  name: 'home',
  components: {
    HelloWorld,
  },

  mounted() {
    Meme(this.$el);
  },
});
</script>
