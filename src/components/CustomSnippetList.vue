<template>
    <div class="my-3 border border-dark">
        <div class="mb-3" style="background-color: #c9c9c9">
            <h3 class="d-inline m-0">{{collection.name}}</h3>
            <button class="btn btn-success py-0" data-toggle="modal" data-target="#mod">New snippet</button>
            <div class="modal fade" id="mod" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                                        <input type="text" class="form-control" id="topic" v-model="newSnippetTopic">
                                    </div>
                                    <div class="form-group">
                                        <label for="body" class="col-form-label">Body:</label>
                                        <textarea class="form-control" id="body" rows="7" v-model="newSnippetBody"></textarea>
                                    </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" @click="addNewSnippet" class="btn btn-primary" data-dismiss="modal" >Send message</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

        <div class="card mb-3" v-for="(snippet, index) in snippets" :key="index">
            <SnippetItem :currentSnippet="snippet"></SnippetItem>
        </div>
    </div>
</template>

<script>
import SnippetItem from "./SnippetItem.vue";
import { mapGetters } from 'vuex'
export default {
    data() {
        return {
            collection: null,
            newSnippetTopic: '',
            newSnippetBody: '',
            snippets: []
        }
    },

    components: {
        SnippetItem
    },

    watch: {
        '$route.query': {
            immediate: true,
            handler() {
                this.collection = this.$route.query.collection
                this.fetchSnippetsFromCollection()
            }
        }
    },

    computed: {
        ...mapGetters(['getRefToUserCustoms'])
    },

    created() {
    },

    methods: {
        addNewSnippet() {
            // console.log(this.getRefToUserCustoms)//.collection('this.collection.name'))
            this.getRefToUserCustoms.collection(this.collection.name).doc().set({
                topic: this.newSnippetTopic,
                body: this.newSnippetBody
            }).then(this.fetchSnippetsFromCollection()).catch((err) => {
                alert(err.message)
            })
        },

        fetchSnippetsFromCollection() {
            this.getRefToUserCustoms.collection(this.collection.name).get().then((querySnapshot) => {
                this.snippets = querySnapshot.docs
            })
        }
    }
}
</script>
