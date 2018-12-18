import Vue from 'vue';
import {Howl, Howler} from 'howler';

import 'whatwg-fetch';
import {apiEndpoint, bearerToken} from './utils/config';

import Intro from './components/intro.vue';
import Quiz from './components/quiz.vue';
import Results from './components/results.vue';

import Imageloaded from './directives/imageloaded';

Vue.config.productionTip = false;

export const eventBus = new Vue();

const Spotify = require('spotify-web-api-js');
const s = new Spotify();

export default new Vue({
  el: '#app',
  data() {
    return {
      stage: 'intro',
      score: 0,
      user: 'Jane'
    };
  },
  created() {
    this.fetchChoomers();
  },
  mounted() {
    // track info test
    /*s.getTrack('46wDtZkcoQdSelJ12emUIp').then((track) => {
      console.log('Track information', track);

      // setup the new Howl.
      const sound = new Howl({
        src: track.preview_url
      });

    }, function(err) {
      console.error(err);
    });*/

    eventBus.$on('quizBegin', () => {
        this.stage = 'quiz';
    });

    eventBus.$on('quizComplete', () => {
        this.stage = 'results';
    });

    eventBus.$on('quizReset', () => {
        this.stage = 'intro';
    });
  },
  methods: {
    fetchChoomers() {
      const query = `
        query {
          getChoomerList {
            total
            items {
              name
            }
          }
        }
      `;

      fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${bearerToken}`
        },
        body: JSON.stringify(query)
      })
        .then(res => res.json())
        .then(res => {
          console.log(res);
        })
        .catch(function (error) {
          console.log('error: ',error);

          this.error = error;
        });
    }
  },
  components: {
    Intro,
    Quiz,
    Results
  },
  directives: {
    Imageloaded
  }
});
