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
      choomers: [],
      isLoaded: false
    };
  },
  computed: {
    user() {
      return this.choomers.filter(choomer => choomer.name === this.userName);
    }
  },
  created() {
    this.fetchChoomers();
    s.setAccessToken('BQA9MTytmpH3ScAYiwijqu_NIA1T6yqEgAMKmMaKGv7juhOcBfy5CWeDpx9RuzDCz0S2OIi_zWQN6gvxhRjGkTQlgtfJcsckWLytVa8dYfJ97hhXVnVyn74COvvxZblp8oX7FSPDH-fqZ0ctEwJpCoZc5oNtnLGMobfDbm1xmL0NEkLjCXT8CgZjT06Dh5EbO7T-msUcG8h0');
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
          this.choomers = res.data.getChoomerList.items;
          this.userName = this.choomers[0].name;
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
