<template>
  <div class="card-body">
    <h5 class="card-title multiline-text">{{ title }}</h5>
    <p class="card-text multiline-text">{{ body }}</p>
    <a href="#" v-if="!isGeneral" class="card-link">Edit</a>
    <a href="#" v-if="!isGeneral" class="card-link text-danger">Remove</a>
    <a href="#" @click="Translate" class="card-link text-danger">Translate</a>
  </div>
</template>

<script>
export default {
  props: {
    currentSnippet: Object,
    isGeneral: Boolean
  },
  data() {
    return {
      language: "en"
    };
  },

  computed: {
    title() {
      return this.currentSnippet.get('topic')
    },
    body() {
      var body = this.currentSnippet.get('body')
      if(this.isGeneral) return body.split("\\n").join("\n")
      else return body 
    }
  },
  
  methods: {
    Translate: function(){
      var key ="trnsl.1.1.20130922T110455Z.4a9208e68c61a760.f819c1db302ba637c2bea1befa4db9f784e9fbb8";
      var translate = require('yandex-translate')(key)

      translate.translate(this.title, { to: 'ru' },
        (err, res) =>{
          this.title = res.text[0];
        });
      translate.translate(this.body, { to: 'ru' }, 
        (err, res) => {
          this.body = res.text[0];
        });
    }
  }
};
</script>

<style scoped>
.multiline-text {
  white-space: pre-wrap;
  word-wrap: break-word;
  font-family: inherit;
}
</style>
