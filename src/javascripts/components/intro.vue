<template>
	<div class="intro">
		THIS IS THE INTRO
		<select :value="userName" @input="$emit('update:userName', $event.target.value)">

			<option v-for="choomer in choomers" v-text="choomer.name"></option>
		</select>

		<button @click="beginQuiz">Start Quiz</button>
	</div>
</template>

<script>
  import { eventBus } from "../main";

  export default {
    name: 'intro',
    props: ['user','userName','choomers'],
    methods: {
    	beginQuiz() {
    		eventBus.$emit('quizBegin');
    	}
    }
  }
</script>
