<template>
  <div class="article-tile">
    <div class="copy">
      <p class="title">{{ title }}</p>
      <div class="author">
        <img
          v-if="author"
          :src="$teedevHelpers.getUserImage(author)"
          :alt="`Profile photo of ${author.name}`"
          @click.stop="$router.push({ name: 'TeeDev Author', params: { author: author.nameSlug } })"
        >

        <div class="meta-details">
          <p>{{ author.name }}</p>
          <p>{{ new Date(updated * 1000).toDateString() }}</p>
        </div>
      </div>
    </div>

    <div class="categories">
      <span
        class="category"
        v-for="category in categories"
        :key="category.index"
        @click.stop="$router.push({ name: 'TeeDev Category', params: { category: category.slug } })"
      >
        {{ category.name }}
      </span>
    </div>
  </div>
</template>

<script>
import helpers from '../mixins/_helpers';

export default {
  name: 'article-tile',

  mixins: [helpers],

  props: {
    title: String,
    author: Object,
    updated: [String, Number],
    categories: Array,
  },
};

</script>

<style lang="scss" scoped>

.article-tile {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;

  .author {
    display: flex;
    align-items: center;
    margin-bottom: 1.5rem;

    img {
      height: 60px;
      border-radius: 50%;
      margin: 0 1rem 0 0;
    }

    .meta-details {
      p {
        margin: 0.25rem;
        font-size: 0.8rem;
        font-family: 'Comfortaa', sans-serif;
        color: #fff;
      }
    }
  }

  .title,
  .blurb {
    color: #fff;
    line-height: 150%;
  }

  .title {
    font-size: 1.25rem;
    font-weight: bold;
  }

  .blurb {
    font-size: 1rem;
  }

  .categories {
    display: flex;
    margin: 0 -0.25rem;

    .category {
      margin: 0.25rem;
      font-size: 0.65rem;
      text-transform: uppercase;
      padding: 0.5rem 1rem;
      color: #fff;
      background-color: #474747;
      border-radius: $border-radius;
    }
  }
}

</style>
