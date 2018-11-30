<template>
	<div class="results">
		<h1>THESE ARE THE RESULTS</h1>

		<p><span v-text="user"></span>, YOUR FINAL SCORE WAS: <span v-text="score"></span></p>

		<button @click="resetQuiz">Reset Quiz</button>
	</div>
</template>

<script>
  import { eventBus } from "../main";

  export default {
    name: 'results',
    props: ['score', 'user'],
    methods: {
    	resetQuiz() {
    		eventBus.$emit('quizReset');
    	}
    }
  }
</script>
