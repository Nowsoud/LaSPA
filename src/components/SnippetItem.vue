<template>
  <div>
    <div class="card mb-3">
      <div class="card-body">
        <h5 class="card-title multiline-text">{{ title }}</h5>
        <p class="card-text multiline-text">{{ body }}</p>
        <a href="#" v-if="!isGeneral" class="card-link" data-toggle="modal" :data-target="'#snip' + number">Edit</a>
        <a href="#" v-if="!isGeneral" @click="removeCustomSnippet" class="card-link text-danger">Remove</a>
        <a href="#" v-clipboard="body" class="card-link text-primary">Copy</a>
        
        <select class="btn btn-light ml-3 float-right"   v-model="language">
          <option v-for="lang in languages" :key="lang">{{lang}}</option>
        </select>
        <a href="#" @click="Translate" class="card-link float-right">Translate</a>
      </div>
    </div>
    <div class="modal fade" :id="'snip' + number" tabindex="-1" role="dialog" aria-hidden="true">
      <div class="modal-dialog" role="document">
          <div class="modal-content">
              <div class="modal-header">
                  <h5 class="modal-title">New snippet</h5>
                  <button type="button" class="close" data-dismiss="modal">
                      <span aria-hidden="true">&times;</span>
                  </button>
              </div>
              <form>
                  <div class="modal-body">
                          <div class="form-group">
                              <label for="topic" class="col-form-label">Topic:</label>
                              <input type="text" class="form-control" id="topic" v-model="editTitle">
                          </div>
                          <div class="form-group">
                              <label for="body" class="col-form-label">Body:</label>
                              <textarea class="form-control" id="body" rows="7" v-model="editBody"/>
                          </div>
                  </div>
                  <div class="modal-footer">
                      <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                      <button type="button" @click="editSnippet" class="btn btn-primary" data-dismiss="modal" >
                          Save changes
                      </button>
                  </div>
              </form>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    number: Number,
    currentSnippet: Object,
    isGeneral: Boolean
  },
  data() {
    return {
      languages:["en","ru","pl"],
      language: "en",
      title: "",
      body: "",
      editTitle: "",
      editBody: ""
    };
  },

  watch: {
    currentSnippet: {
      immediate: true,
      handler: function (newSnippet) {
        this.editTitle = this.title = newSnippet.get('topic')
        var body = newSnippet.get('body')
        if(this.isGeneral) this.editBody = this.body = body.split("\\n").join("\n")
        else this.editBody = this.body = body
      }
    }
  },
  
  methods: {
    editSnippet() {
      this.currentSnippet.ref.update({
        topic: this.editTitle,
        body: this.editBody
      }).then(() =>
        this.$emit('rerenderSnippet'),
      err => console.log(err.message))
    },
    
    Translate: function(){
      var key ="trnsl.1.1.20130922T110455Z.4a9208e68c61a760.f819c1db302ba637c2bea1befa4db9f784e9fbb8";
      var translate = require('yandex-translate')(key)

      translate.translate(this.title, { to: this.language },
        (err, res) =>{
          this.title = res.text[0];
        });
      translate.translate(this.body, { to: this.language }, 
        (err, res) => {
          this.body = res.text[0];
        });
    },
  
    removeCustomSnippet() {
      this.currentSnippet.ref.delete().then(() => this.$emit('snippetRemoved', this.number))
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
