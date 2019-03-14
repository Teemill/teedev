import moment from 'moment';

export default {
  article: state => state.article,
  metaCategories: state => state.metaCategories,
  metaStatuses: state => state.metaStatuses,

  querying: state => state.querying,
  uploadingFeatureImage: state => state.uploadingFeatureImage,
  saveInProgress: state => state.saveInProgress,
  creationError: state => state.creationError,

  articleLastUpdated: (state) => {
    if (state.article) {
      return moment.unix(state.article.updatedAt, 'YYYYMMDD').fromNow();
    }
    return null;
  },

  articles: state => (user) => {
    /**
     * If no logged in user, return no articles (should not happen, just in case)
     */
    if (!user) {
      return [];
    }

    const filteredArticles = state.articles.filter((article) => {
      /**
       * Define a variable that we will use to determine whether or not article
       * should be included
       */
      let filtered = true;

      const personalCategory = article.categories.find(category => category.slug === 'personal');

      /**
       * If the article contains the personal category and the logged in user
       * did not create the article, exclude the article
       */
      if (personalCategory && article.author.id !== user.id) {
        filtered = false;
      }

      const publishedStatus = article.statuses.find(status => status.code === 'published');

      /**
       * Exclude all statuses except for published
       */
      if (!publishedStatus) {
        filtered = false;
      }

      return filtered ? article : false;
    });

    return filteredArticles;
  },

  articleCategories: (state) => {
    if (state.articles) {
      const articleList = {};

      state.articles.forEach((article) => {
        article.categories.forEach((category) => {
          if (articleList[category.slug] instanceof Array) {
            articleList[category.slug].push(article);
          } else {
            articleList[category.slug] = [];
          }
        });
      });

      return articleList;
    }

    return null;
  },

  articleCategory: state => (categoryParam) => {
    if (state.articles) {
      const articleList = [];

      state.articles.forEach((article) => {
        article.categories.forEach((category) => {
          if (category.slug === categoryParam) {
            articleList.push(article);
          }
        });
      });

      return articleList;
    }

    return null;
  },

  articleAuthor: state => (authorParam) => {
    if (state.articles) {
      const articleList = [];

      state.articles.forEach((article) => {
        if (article.author.nameSlug === authorParam) {
          articleList.push(article);
        }
      });

      return articleList;
    }

    return null;
  },
};
