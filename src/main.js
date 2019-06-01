import Vue from 'vue'
import 'firebase'
import App from './App.vue'
import router from './routes.js'
import VueRouter from 'vue-router'
import "./firebaseInit.js"
import 'vuex'
import { store } from './store/index.js'
import clipboard from 'v-clipboard'

Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(clipboard)

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
