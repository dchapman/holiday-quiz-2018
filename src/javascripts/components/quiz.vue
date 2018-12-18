<template>
	<div class="quiz">
		<h1>THIS IS THE QUIZ</h1>

		<button @click="completeQuiz">Complete Quiz</button>
	</div>
</template>

<script>
	import Question from './question.vue';
	import { eventBus } from "../main";

  export default {
    name: 'quiz',
		props: ['choomer'],
    data() {
			return {
			  questions: [],
				current: 0,
        isLoaded: false
			}
    },
		created() {
			this.createQuestions();
		},
    methods: {
    	completeQuiz() {
    		eventBus.$emit('quizComplete');
    	},
    	createQuestions() {
        this.isLoaded = false;

        const query = `
          query($id: ID!) {
            getChoomer(_id: $id) {
              quickFacts {
                text
              }
            }
          }
        `;

        const variables = {
          id: this.id
        };

        fetch(apiEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${bearerToken}`
          },
          body: JSON.stringify({query, variables})
        })
          .then(res => res.json())
          .then(res => {
            const facts = res.data.getCategory.quickFacts;

            console.log(facts);

            this.slides.push(...facts);
            this.isLoaded = true;
          });
			}
    },
    components: {
			Question
    }
  }
</script>
