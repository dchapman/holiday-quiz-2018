import objectFitImages from 'object-fit-images';

import Vue from 'vue';

import Question from './components/question.vue';
import Imageloaded from './directives/imageloaded';

Vue.config.productionTip = false;

export const eventBus = new Vue();

export default new Vue({
  el: '#app',
  mounted() {
    objectFitImages();

    console.log('app mounted');
  },
  components: {
    Question
  },
  directives: {
    Imageloaded
  }
});
