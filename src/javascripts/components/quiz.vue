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
    data() {
		return {
			question: 0
		}
    },
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
