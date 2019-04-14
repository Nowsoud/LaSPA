import VueRouter from 'vue-router'

let routes = [
  {
    path: '/snippets',
    component: require('./components/SnippetNav').default,
    children: [
      {
        path: ":group",
        component: require('./components/SnippetList').default
      }
    ]
  },

  {
    path: '/about',
    component: require('./components/About').default
  }
]

export default new VueRouter({
  mode: 'history',
  routes
})
