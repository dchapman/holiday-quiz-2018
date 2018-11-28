<template>
	<div class="quiz">
		THIS IS THE QUIZ

		<button @click="completeQuiz">Complete Quiz</button>
	</div>
</template>

<script>
	import Question from './question.vue';
	import { eventBus } from "../main";

  export default {
    name: 'quiz',
    methods: {
    	completeQuiz() {
    		eventBus.$emit('quizComplete');
    	}
    },
    components: {
		Question
    }
  }
</script>
