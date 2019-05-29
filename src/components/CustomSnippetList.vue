<template>
    <div class="container-fluid scrollable">
        <div class="mb-3 p-3">
            <h3 class="d-inline">{{collection.name}}</h3>
            <button class="btn btn-success float-right ml-3" data-toggle="modal" data-target="#mod">
                New snippet
            </button>
            <button class="btn btn-danger float-right" @click="removeCollection">
                Remove Collection
            </button>
            
            <div class="modal fade" id="mod" tabindex="-1" role="dialog" aria-hidden="true">
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
                                        <input type="text" class="form-control" id="topic" v-model="newSnippet.topic">
                                    </div>
                                    <div class="form-group">
                                        <label for="body" class="col-form-label">Body:</label>
                                        <textarea class="form-control" id="body" rows="7" v-model="newSnippet.body"/>
                                    </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" @click="addNewSnippet" class="btn btn-primary" data-dismiss="modal" >
                                    Add new snippet
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

        <SnippetItem v-for="(snippet, index) in snippets" :currentSnippet="snippet" @rerenderSnippet="fetchSnippetsFromCollection"
            :key="index" :number="index" @snippetRemoved="removeSnippet"></SnippetItem>
    </div>
</template>

<script>
import SnippetItem from "./SnippetItem.vue";
import { mapGetters } from 'vuex'
export default {
    data() {
        return {
            collection: null,
            newSnippet: {
                topic: '',
                body: ''
            },
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
        removeSnippet(number) {
            this.snippets = this.snippets.filter((value, index) => index != number)
        },
        addNewSnippet() {
            this.getRefToUserCustoms
                .collection(this.collection.name)
                .doc()
                .set(this.newSnippet)
                .then(this.fetchSnippetsFromCollection())
                .catch((err)=>console.error(err.message))
            this.newSnippet = {
                topic: '',
                body: ''
            }
        },

        fetchSnippetsFromCollection() {
            this.getRefToUserCustoms
                .collection(this.collection.name)
                .get()
                .then((querySnapshot) => this.snippets = querySnapshot.docs)
        },

        removeCollection() {
            this.$store.dispatch('removeCustomCollectionByName', this.collection.name)
            .then(() => {
                this.$store.dispatch('updateUsersCustoms')
                this.getRefToUserCustoms.collection(this.collection.name)
                    .get()
                    .then((querySnapshot) => 
                        querySnapshot.forEach(
                            (qds) => qds.ref.delete()
                        )
                    )
                this.$router.replace({ path: '/snippets'})
            })
        }
    }
}
</script>
