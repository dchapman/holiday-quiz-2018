<template>
  <div class="question" v-text="details.title"></div>
</template>

<script>
  import { eventBus } from "../main";

  export default {
    name: 'question',
    props: ['details']
  }
</script>
