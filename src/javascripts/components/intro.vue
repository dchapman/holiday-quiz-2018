<template>
	<div class="intro">
		THIS IS THE INTRO
		<select :value="userName" @input="$emit('update:userName', $event.target.value)">

			<option v-for="member in members" v-text="member.name"></option>
		</select>

		<button @click="beginQuiz">Start Quiz</button>
	</div>
</template>

<script>
  import { eventBus } from "../main";

  export default {
    name: 'intro',
    props: ['user','userName','members'],
    methods: {
    	beginQuiz() {
    		eventBus.$emit('quizBegin');
    	}
    }
  }
</script>
