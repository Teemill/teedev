<template>
  <div class="article-container" v-if="authorArticles">
    <div
      class="author-profile"
      @click="$router.push(
        {
          name: 'TeeDev User Profile',
          params: { slug: authorArticles[0].author.nameSlug }
        }
      )"
    >
      <div class="details">
        <h3 class="author-title">{{ $route.params.author.replace('-', ' ') }}</h3>
        <p>Articles Written: {{ authorArticles.length }}</p>
      </div>
      <div class="photo">
        <img
          :src="$teedevHelpers.getUserImage(authorArticles[0].author)"
          :alt="`Profile photo of ${authorArticles[0].author.name}`"
        >
      </div>
    </div>

    <div class="divider"></div>

    <teedev-grid
      class="grid"
      elative
      :min-item-width="325"
      :max-item-width="650"
      spacing="1em"
    >
      <teedev-tile
        v-for="article in authorArticles"
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
  name: 'teedev-articles-author',

  mixins: [helpers],

  components: {
    ArticleTile: ArticleComponents.ArticleTile,
  },

  computed: {
    authorArticles() {
      if (this.$route.params) {
        return this.$store.getters['articles/articleAuthor'](this.$route.params.author);
      }

      return null;
    },
  },
};

</script>

<style lang="scss" scoped>

.article-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 1rem;
}

.author-profile {
  display: flex;
  margin: 3rem 0;
  cursor: pointer;

  .details {
    margin-right: 2rem;
    .author-title {
      text-transform: uppercase;
      margin: 1rem 0;
      font-weight: bold;
    }

    p {
      margin: 0;
      font-size: 0.8rem;
    }
  }

  .photo img {
    height: 100px;
    border-radius: 50%;
    margin: 0 1rem 0 0;
  }
}

.grid {
  margin-top: 3rem;
}

</style>
