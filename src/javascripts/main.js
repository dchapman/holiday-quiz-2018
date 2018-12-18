import Vue from 'vue';

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
      userName: '',
      members: [],
      isLoaded: false
    };
  },
  computed: {
    user() {
      return this.members.filter(member => member.name === this.userName);
    }
  },
  created() {
    this.fetchChoomers();
  },
  mounted() {
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
              _id
              name
              image {
                path
              }
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
        body: JSON.stringify({query})
      })
        .then(res => res.json())
        .then(res => {
          this.members = res.data.getChoomerList.items;
          this.userName = this.members[0].name;
          this.isLoaded = true;
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
