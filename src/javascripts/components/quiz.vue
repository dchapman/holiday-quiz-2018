<template>
	<div class="quiz">
		<h1>THIS IS THE QUIZ</h1>

    <question v-for="(question, index) in questions"
              v-if="index === current"
              :details="question"></question>

		<button @click="advance">Advance</button>
	</div>
</template>

<script>
	import Question from './question.vue';
	import { eventBus } from "../main";

  import 'whatwg-fetch';
  import {apiEndpoint, bearerToken} from '../utils/config';

  import {sampleSize} from 'lodash';

  var Spotify = require('spotify-web-api-js');
  var s = new Spotify();

  export default {
    name: 'quiz',
		props: ['user'],
    data() {
			return {
			  questions: [],
				current: 0,
        limit: 8,
        isLoaded: false
			}
    },
		mounted() {
      this.createQuestions();

      s.getArtistAlbums('43ZHCT0cAZBISjO8DG9PnE', function(err, data) {
        if (err) console.error(err);
        else console.log('Artist albums', data);
      });
    },
    methods: {
    	completeQuiz() {
    		eventBus.$emit('quizComplete');
    	},
    	createQuestions() {
        this.isLoaded = false;

        console.log('creating');

        const query = `
          query {
            getQuizList {
              total
              items {
                title
                question {
                  title
                  surveyQuestion
                }
                respondent {
                  name
                }
                subject {
                  name
                }
                spotifyId
                hint
              }
            }
          }
        `;

        const variables = {
          id: this.user._id
        };

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
            const allQuestions = res.data.getQuizList.items;

            this.questions = sampleSize(allQuestions, 9);

            this.isLoaded = true;
          });
			},
      advance() {
    	  if(this.current < this.limit) {
    	    this.current++;

    	    console.log(this.questions[this.current]);
        } else {
          eventBus.$emit('quizComplete');
        }
      }
    },
    components: {
			Question
    }
  }
</script>
