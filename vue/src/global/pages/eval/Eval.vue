<template>
  <div class="page-eval">
    <!-- {{sessions.length}}
    <div v-for="(session, index) in sessions" :key="index">{{index}} - {{session}}</div>
    <teedev-tab-container>
      <teedev-tab
        v-for="(session, index) in sessions"
        :key="index"
        :name="index"
      >
        <teedev-code-editor
          @input="(code) => { onUpdateSessionCode(index, code) }"
        />
      </teedev-tab>
    </teedev-tab-container> -->

    <teedev-code-editor
      v-model="evalCode"
      @focus="editorFocused = true"
      @blur="editorFocused = false"
    />

    <div class="controls">
      <teedev-button primary :loading="evaling" text="Eval" @click="onEval" />
      <transition name="fade-left">
        <div v-if="evalTime > 1" class="timer">{{evalTime}}s</div>
      </transition>
    </div>

    <!-- [{{sessionKey}}] -->

    <div v-if="evalStats" style="font-size: 1.2em; margin-top: 1rem;">
      <div style="margin-bottom: 0.5rem;">
        <font-awesome-icon :icon="faClock" style="width: 1.5rem; margin-right: 1rem;" />
        {{evalStats.time}}
      </div>
      <div style="margin-bottom: 0.5rem;">
        <font-awesome-icon :icon="faMemory" style="width: 1.5rem; margin-right: 1rem;" />
        {{evalStats.scriptMemory}} / {{evalStats.peakMemory}} / {{evalStats.memoryLimit}}
      </div>
    </div>

    <iframe
      ref="testIframe"
      class="eval-result-preview"
      src="about:blank"
      width="100%"
      frameborder="0"
      scrolling="no"
      @load="onResizePreview"
    ></iframe>
  </div>
</template>

<script>
import { faMemory } from '@fortawesome/pro-light-svg-icons/faMemory';
import { faClock } from '@fortawesome/pro-light-svg-icons/faClock';

// import Vue from 'vue';
import Cookie from 'js-cookie';

export default {
  name: 'page-eval',

  data: () => ({
    faMemory,
    faClock,

    editorFocused: false,

    evaling: false,
    evalCode: Cookie.get('developer-eval-code'),
    evalResult: '',
    evalStats: null,

    evalTimeInterval: null,
    evalTime: null,

    // sessionKey: Math.random().toString(36).substring(2, 15),
    // sessions: {},
  }),

  methods: {
    onUpdateSessionCode(session, code) {
      Cookie.set(`developer-eval-code-${session}`, code);

      // if (this.editorFocused) {
      // this.sessions[session] = code;
      // Vue.set(this.sessions, session, code);

      // this.$mqtt.publish('eval-code-update', {
      //   session,
      //   code,
      // });
      // }
    },

    onEval() {
      this.evaling = true;
      // this.$mqtt.publish('evaling-it');

      const evalStartTime = new Date();
      clearInterval(this.evalTimeInterval);
      this.evalTimeInterval = setInterval(() => {
        this.evalTime = ((new Date() - evalStartTime) * 0.001).toFixed(1);
      }, 100);

      this.$http.post(
        `${$ENV('TEEDEV_API')}/api/developer/eval`,
        { evalCode: this.evalCode },
      ).then((response) => {
        // this.$mqtt.publish('evaled-it', response.data);
        this.onEvaled(response.data);
      }).catch((response) => {
        // this.$mqtt.publish('evaled-it');
        console.log(response);
        this.onEvaled();
      });
    },

    onEvaled(data) {
      console.log(data);
      if (data) {
        this.evalResult = data.result;
        this.evalStats = data.stats;
      } else {
        this.evalResult = 'Looks like something is broken... Guess you\'d better fix it.';
        this.evalStats = {};
      }

      this.evaling = false;

      clearInterval(this.evalTimeInterval);
      this.evalTime = null;

      this.displayEvalPreview(this.evalResult);
    },

    onResizePreview() {
      if (this.$refs.testIframe) {
        this.$refs.testIframe.style.height = `
          ${this.$refs.testIframe.contentWindow.document.body.scrollHeight}px
        `;
      }
    },

    displayEvalPreview(content) {
      const doc = this.$refs.testIframe.contentWindow.document;
      doc.open();
      doc.write(content);
      doc.close();
    },
  },

  created() {
    // this.$mqtt.subscribe('eval-code-update', (message) => {
    //   if (!this.editorFocused) {
    //     this.evalCode = message.code;

    //     // this.sessions[message.session] = message.code;
    //     Vue.set(this.sessions, message.session, message.code);
    //   }
    //   console.log(this.sessions);
    // });

    // this.$mqtt.subscribe('evaled-it', (message) => {
    //   this.onEvaled(message);
    // });

    // this.$mqtt.subscribe('evaling-it', () => {
    //   this.evaling = true;
    // });

    // console.log('Before Request');
    // this.$lock.request('the-magic-lock').then((lockStatus) => {
    //   console.log('Lock resolved', lockStatus);
    // });

    // this.sessions[this.sessionKey] = this.evalCode;
  },

  watch: {
    evalCode(value) {
      Cookie.set('developer-eval-code', value);

      // if (this.editorFocused) {
      //   this.sessions[this.sessionKey] = value;

      //   this.$mqtt.publish('eval-code-update', {
      //     session: this.sessionKey,
      //     code: value,
      //   });
      // }
    },
  },
};
</script>

<style lang="scss" scoped>
.page-eval {
  padding: 1em;
  height: 100%;

  max-width: 1200px;
  margin: 0 auto;

  .eval-result-preview {
    border-radius: $border-radius;
  }

  .controls {
    display: table;
    clear: both;

    .timer {
      float: left;
      padding: 0.8rem 1rem 0.7rem;
      font-size: 1.2em;
      opacity: 0.8;
    }
  }
}

.fade-left-enter-active {
  animation: fade-left $anim-time-m;
}

.fade-left-leave-active {
  animation: fade-left $anim-time-m reverse;
}

@keyframes fade-left {
  0% {
    transform: translateX(-0.5rem);
    opacity: 0;
  }

  100% {
    transform: translateX(0);
    opacity: 1;
  }
}
</style>
