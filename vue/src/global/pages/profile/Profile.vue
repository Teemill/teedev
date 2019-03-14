<template>
  <div class="user-profile columns" v-if="$loggedInUser">
    <div class="basic-section section col-12">
      <div class="columns">
        <div class="profile-details column col-xs-12 col-7">
          <h1>{{ $loggedInUser.name }}</h1>
          <p>{{ $loggedInUser.email }}</p>
        </div>

        <div class="column col-xs-12 col-5">
          <img
            class="profile-photo"
            :src="$teedevHelpers.getUserImage($loggedInUser)"
            :alt="`Profile photo of ${$loggedInUser.name}`"
          />
          <teedev-image-uploader
            :callback="uploadProfilePhoto"
            :text="$loggedInUser.profileThumbnail ? 'Upload a new image' : null"
          ></teedev-image-uploader>
        </div>
      </div>

    </div>

    <div class="divider"></div>

    <div class="columns" v-if="detailedUser">
      <div class="column section stats-section col-12" >
        <h1>Uploaded Images</h1>

        <teedev-grid
          v-if="detailedUser.photos.length > 0"
          elative
          :min-item-width="125"
          spacing="1em"
        >
          <img
            class="uploaded-stream-image"
            v-for="(photo, index) in detailedUser.photos"
            :key="index"
            :src="`${$ENV('TEEDEV_API')}${photo.thumbnail}`"
          >
        </teedev-grid>
      </div>

      <div class="divider"></div>

      <div class="column section stats-section col-12" v-if="detailedUser">
        <h1 class="column col-12">Stats</h1>
        <div class="stats-wrapper column col-12">
          <div class="columns">
            <div class="profile-stat column col-xs-12 col-6">
              <h4>Articles Written</h4>
              <span class="stat-value">{{ detailedUser.articles.length }}</span>
            </div>

            <div class="profile-stat column col-xs-12 col-6">
              <h4>Image Disk Space Used</h4>
              <span class="stat-value">
                {{ `${(detailedUser.totalDiskSpace / 1000000).toFixed(2)}mb` }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div class="divider"></div>

      <div class="column section articles-section col-12" v-if="detailedUser">
        <h1>Articles</h1>

        <teedev-grid
          class="grid"
          elative
          :min-item-width="325"
          :max-item-width="650"
          spacing="1em"
        >
          <teedev-tile
            v-for="article in detailedUser.articles"
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
    </div>

    <teedev-spinner v-if="!detailedUser" height="200px" width="100%"></teedev-spinner>
  </div>
</template>

<script>

import ArticleTile from '../articles/components/ArticleTile.vue';

export default {
  name: 'teedev-user-profile',

  components: {
    ArticleTile,
  },

  computed: {
    detailedUser() {
      return this.$store.state.auth.detailedUser;
    },
  },

  methods: {
    uploadProfilePhoto(img, base64) {
      this.$store.dispatch('auth/uploadProfilePhoto', base64)
        .then(() => this.$store.dispatch('auth/getUserFromToken'));
    },
  },

  created() {
    if (!this.$store.state.auth.detailedUser) {
      this.$store.dispatch('auth/getDetailedUser');
    }
  },
};

</script>

<style lang="scss" scoped>

.user-profile {
  max-width: 800px;
  margin: 1rem auto;
  padding: 1rem;

  .divider {
    width: 100%;
    height: 0.1rem;
  }

  .section {
    margin: 4rem 0;
  }

  .stats-section {
    .stats-wrapper {
      // display: flex;
      // justify-content: space-around;

      .profile-stat {
        display: flex;
        flex-direction: column;
        align-items: center;

        .stat-value {
          display: flex;
          flex-direction: column;
          justify-content: center;

          font-size: bold;
          font-size: 1.5rem;
        }
      }
    }

    .uploaded-stream-image {
      border-radius: $border-radius;
    }
  }

  .profile-photo {
    display: flex;
    justify-content: center;
    flex-direction: column;
    border-radius: $border-radius;

    img {
      margin-bottom: 1rem;
    }
  }

  .profile-details {
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: left;
  }
}

@media screen and (max-width: 480px) {
  .basic-section {
    .profile-photo {
      margin-bottom: 1rem;
    }
  }

  .profile-details {
    text-align: center !important;
  }

  .profile-stat {
    margin-bottom: 2rem;
  }

  .profile-stat:last-of-type {
    margin: 0;
  }
}

</style>
