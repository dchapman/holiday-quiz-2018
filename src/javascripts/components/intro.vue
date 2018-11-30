<template>
	<div class="intro">
		THIS IS THE INTRO
		<select :value="user" @input="$emit('update:user', $event.target.value)">
			<option value="" disabled selected hidden>Who are you?</option>
			<option value="Fred">Fred</option>
			<option value="Jane">Jane</option>
		</select>

		<button @click="beginQuiz">Start Quiz</button>
	</div>
</template>

<script>
  import { eventBus } from "../main";

  export default {
    name: 'intro',
    props: ['user'],
    methods: {
    	beginQuiz() {
    		eventBus.$emit('quizBegin');
    	}
    }
  }
</script>
