import objectFitImages from 'object-fit-images';

import Vue from 'vue';

import Intro from './components/intro.vue';
import Quiz from './components/quiz.vue';
import Results from './components/results.vue';

import Imageloaded from './directives/imageloaded';

Vue.config.productionTip = false;

export const eventBus = new Vue();

export default new Vue({
  el: '#app',
  data() {
    return {
      stage: 'intro',
      score: 0
    }
  },
  mounted() {
    objectFitImages();

    console.log('app mounted');

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
  components: {
    Intro,
    Quiz,
    Results
  },
  directives: {
    Imageloaded
  }
});
