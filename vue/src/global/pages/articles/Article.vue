<template>
  <div>
    <div class="article page" v-if="article">

      <!-- Article Title -->
      <h1 class="article-title">{{ article.title }}</h1>

      <!-- Article Author and Categories -->
      <div class="meta columns">
        <div class="author column col-xs-12 col-sm-6">
          <img
            class="author-image"
            :src="`${$ENV('TEEDEV_API')}${article.author.profileThumbnail}`"
            :alt="`Profile photo of ${article.author.name}`"
            @click.stop="$router.push(
              {
                name: 'TeeDev Author',
                params: { author: article.author.nameSlug }
              }
            )"
          >

          <div class="meta-details">
            <p>Written By: {{ article.author.name }}</p>
            <p>Updated: {{ articleLastUpdated }}</p>
          </div>

        </div>

        <div
          v-if="article.categories"
          class="categories column col-xs-12 col-sm-6"
        >
          <span
            v-for="category in article.categories"
            :key="category.index"
            @click.stop="$router.push(
              {
                name: 'TeeDev Category',
                params: { category: category.slug }
              }
            )"
          >
            {{ category.name }}
          </span>
        </div>
      </div>

      <!-- Article Featured Image -->
      <img
        class="feature-image"
        v-if="article.featureImage"
        :src="`${$ENV('TEEDEV_API')}${article.featureImage}`"
      >

      <!-- Article Body -->
      <div
        class="article-content"
        v-html="article.content"
      ></div>

      <teedev-button
        text="Edit this post"
        href="#"
        @click="$router.push({ name: 'TeeDev Article Editor', params: { slug: article.slug } })"
      />
    </div>
  </div>
</template>

<script>
import helpers from './mixins/_helpers';

export default {
  name: 'teedev-article',

  mixins: [helpers],

  created() {
    // eslint-disable-next-line
    console.log($ENV('TEEDEV_API'));
    const articleToFind = this.$route.params.slug;

    if (this.articles) {
      const routeArticle = this.articles.find(article => article.slug === articleToFind);

      if (routeArticle) {
        this.$store.commit('articles/SET_ACTIVE_ARTICLE', routeArticle);
      }
    }

    if (!this.article) {
      this.$store.dispatch('articles/findArticleBySlug', this.$route.params);
    }
  },
};
</script>

<style lang="scss"> @import './assets/scss/article.scss'; </style>

<style lang="scss" scoped>
.article-container {
  max-width: 800px;
  margin: 0 auto;
}

.article {

  &.page {
    max-width: calc(600px + 2rem);
    padding: 1rem;
    margin: 3rem auto;
  }

  .article-title {
    line-height: 125%;
    margin-bottom: 2rem;
  }

  .feature-image {
    margin-bottom: 2rem;
    border-radius: $border-radius;
  }

  .article-content {
    margin-bottom: 4rem;
  }

  .meta {
    display: flex;
    justify-content:  space-between;
    padding: 0 0 2rem 0;

    .author-image {
      cursor: pointer;
    }

    .categories {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: flex-end;
      margin: -0.25rem;

      span {
        margin: 0.25rem;
        font-size: 0.65rem;
        text-transform: uppercase;
        padding: 0.5rem 1rem;
        border-radius: $border-radius;
        background-color: #474747;
        color: #fff;
        cursor: pointer;
      }

      @media screen and (max-width: 480px) {
        justify-content: flex-start;
      }
    }

    .author {
      display: flex;
      align-items: center;

      img {
        height: 75px;
        border-radius: 50%;
        margin: 0 2rem 0 0;
      }

      .meta-details {
        display: flex;
        flex-direction: column;
        justify-content: center;

        p {
          margin-bottom: 0.25rem;
          line-height: 125%;
          font-size: 0.8rem;
          font-family: 'Comfortaa', sans-serif;
        }
      }

      @media screen and (max-width: 480px) {
        margin-bottom: 2rem;
      }
    }
  }
}
</style>
