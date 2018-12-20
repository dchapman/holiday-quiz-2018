<template>
  <div class="question">
    <h2 class="question__text" v-text="details.question.surveyQuestion"></h2>
  </div>
</template>

<script>
  import { eventBus } from "../main";

  export default {
    name: 'question',
    props: ['details']
  }
</script>
