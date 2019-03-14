<template>
  <div class="article-container">
    <h1>Categories</h1>
    <div class="divider"></div>
    <div class="article-categories"
      v-for="(category, key) in articleCategories"
      :key="category.index"
    >
      <h3
        class="category-title"
        v-if="category.length > 0"
      >
        {{ key }}
      </h3>
      <teedev-grid
        v-if="category.length > 0"
        class="grid"
        elative
        :min-item-width="325"
        :max-item-width="650"
        spacing="1em"
      >
        <teedev-tile
          v-for="article in category"
          :key="article.index"
          :title="article.title"
          :sub-title="article.title"
          :link="article.slug"
          :background-image="`${$ENV('TEEDEV_API')}${article.featureImage}`"
        >
          <template>
            <article-tile
              :title="article.title"
              :author="article.author"
              :updated="article.updatedAt"
              :categories="article.categories"
            />
          </template>
        </teedev-tile>
      </teedev-grid>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import ArticleComponents from './components/_components';
import helpers from './mixins/_helpers';

export default {
  name: 'teedev-articles-categories',

  mixins: [helpers],

  components: {
    ArticleTile: ArticleComponents.ArticleTile,
  },

  computed: {
    ...mapGetters({
      articleCategories: 'articles/articleCategories',
    }),

    categories() {
      return Object.keys(this.articleCategories);
    },
  },
};
</script>

<style lang="scss" scoped>
.article-container {
  max-width: 800px;
  margin: 3rem auto;
  padding: 1rem;
}

.grid {
  margin-bottom: 5rem;
}

.category-title {
  text-transform: uppercase;
  margin: 1rem 0;
  font-weight: bold;
}
</style>
