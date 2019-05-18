<template>
  <div class="page-home">
    <div class="banner">
      <div class="content">
        <h1 class="title">{{welcomeMessage.title}}</h1>
        <p class="sub-text">{{welcomeMessage.message}}</p>
        <div class="actions">
          <div class="action">
            <font-awesome-icon :icon="faMugHot" />
            <p>Blog</p>
          </div>
          <div class="action">
            <font-awesome-icon :icon="faTerminal" />
            <p>Eval</p>
          </div>
          <div class="action">
            <font-awesome-icon :icon="faLightbulb" />
            <p>Space</p>
          </div>
          <div
            class="action"
            @mouseenter="onMouseEnterMeme"
            @mouseleave="onMouseLeaveMeme"
          >
            <font-awesome-icon :icon="faGhost" />
            <p>Memes</p>
          </div>
          <div class="action">
            <font-awesome-icon :icon="faSlidersH" />
            <p>Settings</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  faMugHot,
  faGhost,
  faSlidersH,
  faLightbulb,
  faTerminal,
} from '@fortawesome/pro-light-svg-icons';

export default {
  name: 'page-home',

  data: () => ({
    faMugHot,
    faGhost,
    faSlidersH,
    faLightbulb,
    faTerminal,

    name: '',

    randomMessageIndex: null,
    welcomeMessages: [
      {
        title: 'Hello!',
        message: 'Good to see you {{name}}',
      },
      {
        title: 'Welcome',
        message: '{{name}} you\'ve returned...',
      },
      {
        title: 'Oh..',
        message: 'it\'s you...',
      },
      {
        title: ':l', // Everyone thinks this is an angry face... I disagree.. It more a slightly disappointed face. Bit like how I feel at the moment, with how long this comment has gotten.
        message: 'it\'s you...',
      },
      {
        title: ':)',
        message: 'Hello there {{name}}',
      },
      {
        title: 'Teedev',
        message: 'Come for the code. Stay for the memes.',
      },
    ],
  }),

  computed: {
    welcomeMessage() {
      const welcomeMessage = this.welcomeMessages[this.randomMessageIndex];

      welcomeMessage.message = welcomeMessage.message
        .replace(/{{name}}/g, this.name);

      return welcomeMessage;
    },
  },

  methods: {
    onMouseEnterMeme() {
      this.welcomeMessages.forEach((message) => {
        if (message.title === ':)') {
          message.title = '>:('
        }
      });
    },

    onMouseLeaveMeme() {
      this.welcomeMessages.forEach((message) => {
        if (message.title === '>:(') {
          message.title = ';)'
        }
      });
    },
  },

  created() {
    this.randomMessageIndex = ~~(Math.random() * this.welcomeMessages.length);
  },
};
</script>

<style lang="scss" scoped>
.page-home {
  height: 100%;
}

/*
  Q: Should this be a banner component?
  A: Yes

  Q: Is it 1:44am?
  A: Yes

  Q: Do I care anymore?
  A: Nope
*/
.banner {
  display: flex;
  align-items: center;
  justify-content: center;

  height: calc(100vh - 3rem);
  background-image: linear-gradient(to bottom left, #22D48C, #0D4858);

  .content {
    text-align: center;
    color: #E4E4E4;
    padding: 0 1em;
    max-width: 100vw;

    .title {
      margin-bottom: 2rem;
      font-weight: 600;
      font-size: 6rem;
      text-shadow: 4px 8px 32px rgba(0,0,0,0.4);

      @media (max-width: $size-sm) {
        font-size: 4rem;
      }

      @media (max-width: $size-xs) {
        font-size: 3rem;
      }
    }

    .sub-text {
      text-shadow: 4px 8px 16px rgba(0,0,0,0.4);
    }

    .actions {
      display: flex;
      justify-content: center;
      margin-top: 6rem;
      flex-wrap: wrap;
      
      .action {
        padding: 2em;
        margin: 0 1em;
        filter: drop-shadow(2px 6px 4px rgba(0,0,0,0.2));
        cursor: pointer;
        transition: filter 0.1s;

        svg {
          font-size: 2em;
          margin-bottom: 0.5em;

          transition: transform 0.1s;
        }

        p { margin-bottom: 0; }

        &:hover {
          filter: drop-shadow(6px 8px 8px rgba(0,0,0,0.4));

          svg {
            transform: scale(1.1) translateY(-6px);
          }
        }

        @media (max-width: $size-sm) {
          padding: 1em 2em;
        }

        @media (max-width: $size-xs) {
          padding: 1em 0.5em;

          svg {
            font-size: 1.5em;
          }
        }
      }

      @media (max-width: $size-xs) {
        margin-top: 4rem;
      }
    }
  }
}
</style>

