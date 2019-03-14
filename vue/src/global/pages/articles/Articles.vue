<template>
  <div class="article-container">
    <h1>Teedev Articles</h1>
    <div class="divider"></div>
    <teedev-grid
      elative
      :min-item-width="325"
      :max-item-width="650"
      spacing="1em"
    >
      <teedev-tile
        v-for="article in articles"
        :key="article.index"
        :title="article.title"
        :sub-title="article.title"
        :link="article.slug"
        :background-image="`${$ENV('TEEDEV_API')}${article.featureImage}`"
      >
        <template>
          <article-tile
            :title="article.title"
            :updated="article.updatedAt"
            :author="article.author"
            :categories="article.categories"
          />
        </template>
      </teedev-tile>
    </teedev-grid>
  </div>
</template>

<script>
import ArticleComponents from './components/_components';

import helpers from './mixins/_helpers';

export default {
  name: 'teedev-articles',

  mixins: [helpers],

  components: {
    ArticleTile: ArticleComponents.ArticleTile,
  },
};

</script>

<style lang="scss" scoped>

.article-container {
  max-width: 800px;
  margin: 3rem auto;
  padding: 1rem;
}

</style>
