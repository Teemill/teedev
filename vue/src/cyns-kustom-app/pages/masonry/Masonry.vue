<template>
  <div class="page-masonry">
    <teedev-form name="I am form">
      <teedev-input placeholder="Item 1" name="text-input-1" />
      <teedev-input placeholder="Item 2" name="text-input-2" />
      <teedev-input placeholder="Item 3" name="text-input-3" />
      <teedev-input placeholder="Item 4" name="text-input-4" />
    </teedev-form>
    <masonry-grid> 
      <masonry-grid-item
        name="first-item"
      >
        <!-- <img :src="Img" height="100px" /> -->
        <teedev-form name="I am form">
          <teedev-input placeholder="Item 1" name="text-input-1" />
        </teedev-form>
      </masonry-grid-item>
      <masonry-grid-item
        name="second-item"
      >
        <!-- <img :src="Img" height="100px" /> -->
        <teedev-form name="I am form">
          <teedev-input placeholder="Item 2" name="text-input-2" />
        </teedev-form>
      </masonry-grid-item>
      <masonry-grid-item
        name="third-item"
      >
        <!-- <img :src="Img" height="100px" /> -->
        <teedev-form name="I am form">
          <teedev-input placeholder="Item 3" name="text-input-3" />
        </teedev-form>
      </masonry-grid-item>
      <masonry-grid-item
        name="fourth-item" 
      >
        <!-- <img :src="Img" height="100px" /> -->
        <teedev-form name="I am form">
          <teedev-input placeholder="Item 4" name="text-input-4" />
        </teedev-form>
      </masonry-grid-item>
    </masonry-grid>
  </div>
</template>

<script>
import Img from 'C:/Users/Dan/Pictures/Coruscant-EotE.jpg';

import MasonryGrid from './components/MasonryGrid';
import MasonryGridItem from './components/MasonryGridItem';

export default {
  name: 'page-masonry',

  components: {
    MasonryGrid,
    MasonryGridItem,
  },

  data: () => ({
    Img,
    codeTest: 'const test = \'123\'',
  }),
}
</script>
