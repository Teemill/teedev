<template>
  <gbro-layout-standard>
    <div class="container mx-auto flex  pt-6">
      <div class="flex-1">
        <h1>Welcome to GBro's workspace</h1>
        <p class="mb-3">But who is GBro?</p>
      </div>
      <div class="flex-shrink w-1/4">
        <img :src="require('@gbro/assets/michaelcera.jpg')" />
      </div>
    </div>

    <div class="pt-6">
      <gbro-box
        style="height: 40vw"
        :background-image="require('@gbro/assets/tortoise_sky.png')"
        background="#BBDEFB"
      >
        <div class="container mx-auto">
          <div class="float-left text-white w-2/6">
            <h3>Blender Artistè</h3>
            <p>Look at this tortoise that I made</p>
          </div>
        </div>
      </gbro-box>

      <gbro-box
        style="height: 40vw"
        :background-image="require('@gbro/assets/banners/moon.jpg')"
        background="#BBDEFB"
      >
        <div class="container mx-auto">
          <div class="float-right text-white w-2/6">
            <h3>Inventor of the moon</h3>
            <gbro-blockquote
              cite="George Broadhurst"
              quote="It just seemed like a good idea"
            />
          </div>
        </div>
      </gbro-box>

      <gbro-box>
        <div class="container mx-auto flex">
          <div class="flex-shrink w-1/4">
            <img :src="require('@gbro/assets/archery.jpg')" />
          </div>
          <div class="flex-1 pl-6">
            <h2>Archery boy</h2>
            <p class="mb-3">Legolas ain't got shit on me</p>
          </div>
        </div>
      </gbro-box>

      <gbro-box
        style="height: 40vw"
        :background-image="require('@gbro/assets/banners/action_club_stylised.png')"
        background="#BBDEFB"
      >
        <div class="container mx-auto">
          <div class="float-right text-white w-2/6">
            <h3>2010-2019 F1 world champion</h3>
            <p>In the games</p>
          </div>
        </div>
      </gbro-box>
    </div>
  </gbro-layout-standard>
</template>

<script>
import GbroLayoutStandard from '@gbro/components/GbroLayoutStandard.vue';
import GbroBox from '@gbro/components/GbroBox.vue';
import GbroBlockquote from '@gbro/components/GbroBlockquote.vue';

export default {
  name: 'gbro-home',

  components: {
    GbroLayoutStandard,
    GbroBox,
    GbroBlockquote,
  },
};
</script>

<style>

</style>
