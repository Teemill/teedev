import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters({
      article: 'articles/article',
      articleLastUpdated: 'articles/articleLastUpdated',
      metaCategories: 'articles/metaCategories',
      metaStatuses: 'articles/metaStatuses',

      querying: 'articles/querying',
      saveInProgress: 'articles/saveInProgress',
      uploadingFeatureImage: 'articles/uploadingFeatureImage',
      creationError: 'articles/creationError',
    }),

    articles() {
      return this.$store.getters['articles/articles'](this.$loggedInUser);
    },
  },

  methods: {
    articleHasStatus(status) {
      if (this.article && this.article.statuses) {
        if (this.article.statuses.find(s => s.code === status.code)) {
          return true;
        }
      }

      return false;
    },

    articleHasCategory(category) {
      if (this.article && this.article.categories) {
        if (this.article.categories.find(c => c.slug === category.slug)) {
          return true;
        }
      }

      return false;
    },
  },

  created() {
    if (!this.articles.length && !this.querying) {
      this.$store.dispatch('articles/fetchAll');
    }
  },
};
