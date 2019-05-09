<template>
  <div class="card-body">
    <h5 class="card-title multiline-text">{{ currentSnippet.get('topic') }}</h5>
    <p class="card-text multiline-text">{{ currentSnippet.get('body').split("\\n").join("\n") }}</p>
    <a href="#" v-if="!isGeneral" class="card-link">Edit</a>
    <a href="#" v-if="!isGeneral" class="card-link text-danger">Remove</a>
  </div>
</template>

<script>
  export default {
    props: {
      currentSnippet: Object,
      isGeneral: Boolean
    }
  }
</script>

<style scoped>
  .multiline-text {
    white-space: pre-wrap;
    word-wrap: break-word;
    font-family: inherit;
  }
</style>
