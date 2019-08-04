<template>
  <div>
    <formula-e-header />
    <g-one-page-banner
      :src="require('./assets/action_club_stylised.png')"
      color="#fff"
      align="right"
    >
      <div>
        <h1>Teemill Racing FE</h1>
        <h3>A new era of motorsport</h3>
        <fe-swish-line />
        <p>
          I know this page is pretty ugly right now. I just want to get
          something working then iterate on that :). Gallia est omnis divisa in
          partes tres. Donde esta la bibliotequa.
        </p>
        <p>Lorem ipsum dolor sit amet.</p>
        <p>
          We racing now boys. The cars go whee like an electric motor because
          that is exactly what they are powered by and that is what they use
          instead of an engine to do the powering and the dusting and the what
          not tomfoolery.
        </p>
      </div>
    </g-one-page-banner>

    <g-one-page-banner>
      <h2>Timeline of stuff goes here with the bang and the whodat</h2>
    </g-one-page-banner>

    <g-one-page-banner
      background="#232323"
      color="#fff"
      :src="require('./assets/datass.png')"
      parallax
      parallax-align="right"
    >
      <h1>Back again</h1>
    </g-one-page-banner>

    <g-one-page-banner>
      <h2>Description of what Teemill brings to Formula E</h2>
      <g-blockquote
        cite="George Broadhurst, Chief Strategist"
        quote="We're not in Formula E just to fill the roster. Our aim is to win both the driver's and constructor's championships within 3 years"
      />
    </g-one-page-banner>
  </div>
</template>

<script>
import FormulaEHeader from './components/FormulaEHeader.vue';
import FeSwishLine from './components/FeSwishLine.vue';
import GOnePageBanner from './components/GOnePageBanner.vue';
import GBlockquote from './components/GBlockquote.vue';

export default {
  name: 'formula-e-page',

  components: {
    FormulaEHeader,
    FeSwishLine,
    GOnePageBanner,
    GBlockquote,
  },
};
</script>

<style lang="scss">

</style>
