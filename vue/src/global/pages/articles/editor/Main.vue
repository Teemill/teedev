<template>
  <div class="page-container">

    <div class="container-fluid">
      <div class="editor-container">
        <div class="editor-section">
        <h1 class="page-title">Article Editor</h1>
          <teedev-form name="edit-article" class="edit-article-form">
            <teedev-input
              name="article-title"
              placeholder="Title"
              :value="articleTitle"
              v-model="articleTitle"
            />
          </teedev-form>

          <div class="article-editor">
            <vue-editor
              class="vue-editor"
              v-model="articleContent"
              useCustomImageHandler
              @imageAdded="handleImageUpload"
            ></vue-editor>
          </div>

          <p class="error" v-if="creationError">
            {{ creationError }}
          </p>

          <div class="save-button-wrapper">
            <teedev-button
              :text="article ? 'Update' : 'Save'"
              href="#"
              @click="save"
              :loading="saveInProgress"
              primary
            />
            <span v-if="articleLastUpdated">{{ `Updated: ${articleLastUpdated}` }}</span>
          </div>
        </div>
      </div>

      <div class="sidebar">
        <div class="sidebar-section" v-if="article">
          <div class="control-buttons">
            <teedev-button
              v-if="article"
              text="Go To Article"
              href="#"
              @click="$router.push({ name: 'TeeDev Article', params: { slug: article.slug } })"
              primary
              fill
            />
            <teedev-button
              v-if="article"
              text="New Article"
              href="#"
              @click="createNewArticle"
              primary
              fill
            />
          </div>
        </div>
        <div class="sidebar-section" v-if="article">
          <h4>Feature Image</h4>
          <teedev-form name="feature-image" class="feature-image-form">
            <img
              v-if="article.featureImage && !uploadingFeatureImage"
              class="feature-image-preview"
              :src="`${$ENV('TEEDEV_API')}${article.featureImage}`"
              alt="Article featured image"
            >
            <teedev-spinner
              height="100px"
              style="margin-bottom: 1rem;"
              v-if="uploadingFeatureImage"
            />
            <teedev-image-uploader
              class="image-uploader"
              :callback="uploadFeatureImage"
              :text="article.featureImage ? 'Upload a new image' : null"
            ></teedev-image-uploader>
          </teedev-form>
        </div>

        <div class="sidebar-section">
          <h4>Article Status</h4>
          <teedev-form name="article-status" class="article-status-form">
            <teedev-toggle
              v-for="status in metaStatuses"
              :key="status.id"
              :name="status.code"
              :value="articleHasStatus(status)"
              :placeholder="status.name"
            />
          </teedev-form>
        </div>

        <div class="sidebar-section">
          <h4>Article Categories</h4>
          <teedev-form name="article-category" class="article-category-form">
            <teedev-checkbox
              v-for="category in metaCategories"
              :key="category.id"
              :name="category.slug"
              :value="articleHasCategory(category)"
              :label="category.name"
            />
          </teedev-form>

          <h4>Create New Category</h4>
          <teedev-form name="create-category" class="create-category-form">
            <teedev-input
              name="category-name"
              placeholder="Category Name"
              @submit="createCategory"
              no-margin
            />
          </teedev-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { VueEditor } from 'vue2-editor';
import http from '@/global/plugins/http';

import Article from '../classes/Article';
import helpers from '../mixins/_helpers';

export default {
  name: 'article-editor',

  mixins: [helpers],

  components: {
    VueEditor,
  },

  data() {
    return {
      articleContent: null,
      articleTitle: null,
    };
  },

  methods: {
    createNewArticle() {
      this.resetEditor();
      this.$router.push({ name: 'TeeDev Article Create' });
    },

    resetEditor() {
      this.$store.commit('articles/SET_ACTIVE_ARTICLE', null);
      this.articleContent = null;
      this.articleTitle = null;
    },

    save() {
      this.$store.commit('articles/CHANGE_LOADING_STATE', {
        type: 'saveInProgress',
        value: true,
      });

      const formCategories = this.$store.getters['forms/getValues']('article-category');
      const formStatus = this.$store.getters['forms/getValues']('article-status');

      const appliedCategories = [];

      Object.keys(formCategories).forEach((categorySlug) => {
        if (formCategories[categorySlug] === true) {
          appliedCategories.push(categorySlug);
        }
      });

      const appliedStatus = Object.keys(formStatus).find((statusCode) => {
        if (formStatus[statusCode] === true) {
          return true;
        }

        return false;
      });

      const articleObject = new Article(
        this.articleTitle,
        this.articleContent,
        appliedCategories,
        appliedStatus,
      );

      articleObject.checkValid()
        .then((isValid) => {
          if (!isValid) {
            this.$store.commit('articles/SET_CREATION_ERROR', articleObject.error);
          } else {
            if (!this.article) {
              this.$store.dispatch('articles/saveNewArticle', articleObject)
                .then(article => this.$router.push({
                  name: 'TeeDev Article Editor',
                  params: {
                    slug: article.slug,
                  },
                }));
            } else {
              http.get(`${$ENV('TEEDEV_API')}/api/article/find-by-title/${this.title}`)
                .then(({ data }) => {
                  if (data.title) {
                    this.$store.commit('articles/SET_CREATION_ERROR', articleObject.error);
                  } else {
                    this.$store.dispatch('articles/updateArticle', {
                      existingArticle: this.article,
                      updatedArticle: articleObject,
                    });
                  }
                });
            }

            this.$store.commit('articles/SET_CREATION_ERROR', null);
          }
        })
        .then(() => {
          this.$store.commit('articles/CHANGE_LOADING_STATE', {
            type: 'saveInProgress',
            value: false,
          });
        });
    },

    createCategory() {
      const categoryName = this.$store.getters['forms/getValue']('create-category', 'category-name');

      const exists = this.metaCategories.find(category => category.name === categoryName);

      if (exists) {
        return;
      }

      this.$store.commit('articles/CREATE_NEW_CATEGORY', categoryName);
    },

    uploadFeatureImage(img, base64) {
      this.$store.commit('articles/CHANGE_LOADING_STATE', {
        type: 'uploadingFeatureImage',
        value: true,
      });

      this.$store.dispatch('articles/uploadFeatureImage', base64)
        .then(() => this.save())
        .then(() => {
          this.$store.commit('articles/CHANGE_LOADING_STATE', {
            type: 'uploadingFeatureImage',
            value: false,
          });
        });
    },

    async fileToBase64(file) {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = function read() {
          resolve(reader.result);
        };
      });
    },

    handleImageUpload(file, Editor, cursorLocation) {
      const uploadedImage = new Promise((resolve) => {
        this.fileToBase64(file)
          .then((result) => {
            this.$store.dispatch('auth/uploadUserImage', result)
              .then((res) => {
                resolve(res);
              });
          });
      });

      uploadedImage.then((image) => {
        Editor.insertEmbed(cursorLocation, 'image', `${$ENV('TEEDEV_API')}${image}`);
      });
    },

    initArticleEditor() {
      const articleToFind = this.$route.params.slug;

      if (this.articles && articleToFind !== 'create') {
        const retrievedArticle = this.articles.find(article => article.slug === articleToFind);

        if (retrievedArticle) {
          this.$store.commit('articles/SET_ACTIVE_ARTICLE', retrievedArticle);

          this.articleContent = retrievedArticle.content;
          this.articleTitle = retrievedArticle.title;
        }
      }

      if (!this.article && articleToFind !== 'create') {
        const getArticleFromServer = new Promise((resolve) => {
          this.$store.dispatch('articles/findArticleBySlug', this.$route.params)
            .then((data) => {
              resolve(data);
            });
        });

        getArticleFromServer.then((article) => {
          if (article === 404) {
            this.$router.push({ name: 'TeeDev Article Create' });
          } else {
            this.articleContent = article.content;
            this.articleTitle = article.title;
          }
        });
      }

      if (!this.categories) {
        this.$store.dispatch('articles/getEditorMetaData');
      }
    },
  },

  created() {
    this.initArticleEditor();
  },

  watch: {
    $route() {
      this.resetEditor();
      this.initArticleEditor();
    },
  },
};
</script>

<style lang="scss"> @import '../assets/scss/article.scss'; </style>

<style lang="scss" scoped>
.page-container {
  margin: 2rem;
  .page-title {
    margin-bottom: 3rem;
  }
}

.container-fluid {
  display: flex;
  margin: 0 -0.5rem;
}

@media screen and (max-width: 768px) {
  .page-container {
    margin: 1rem;

    .page-title {
      margin-bottom: 2rem;
    }
  }

  .container-fluid {
    flex-direction: column;
  }

  .editor-container {
    margin-bottom: 2rem !important;
  }

  .sidebar {
    min-width: unset !important;
  }
}

.quillWrapper {
  background-color: #fff;
}

.editor-container {
  flex: 3;
  margin: 0.5rem;

  .editor-section {
    margin: 0 auto;
    max-width: 1000px;
    border-radius: $border-radius;

    .vue-editor {
      margin: 0 0 0.8rem 0;
    }

    .save-button-wrapper {
      display: flex;
      align-items: center;

      span {
        font-size: 0.8rem;
        padding: 0 1rem;
      }
    }
  }

  .error {
    color: $color-error;
  }
}

.sidebar {
  flex: 1;
  margin: 0.5rem;
  min-width: 400px;

  .sidebar-section {
    margin-bottom: 0.8rem;
    padding: 1rem;
    background-color: #f3f3f3;
    border-radius: $border-radius;

    .feature-image-preview {
      margin-bottom: 1rem;
      border-radius: $border-radius;
    }

    .article-category-form {
      margin-bottom: 1.5rem;
    }

    .control-buttons {
      display: flex;
      justify-content: center;
      margin: 0 -0.5rem;

      .teedev-button {
        margin: 0 0.5rem;
      }
    }
  }
}
</style>
