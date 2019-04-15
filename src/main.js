import Vue from 'vue'
import 'firebase'
import App from './App.vue'
import router from './routes.js'
import VueRouter from 'vue-router'
import "./firebaseInit.js"

Vue.config.productionTip = false
Vue.use(VueRouter)

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
