<template>
	<div class="intro">
		THIS IS THE INTRO

		<button @click="beginQuiz">Start Quiz</button>
	</div>
</template>

<script>
  import { eventBus } from "../main";

  export default {
    name: 'intro',
    methods: {
    	beginQuiz() {
    		eventBus.$emit('quizBegin');
    	}
    }
  }
</script>
