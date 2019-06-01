import VueRouter from 'vue-router'

let routes = [
  {
    path: '/snippets',
    component: require('./components/SnippetNav').default,
    children: [
      {
        path: "customs",
        props: true,
        component: require('./components/CustomSnippetList').default,
      },

      {
        path: ":group",
        component: require('./components/SnippetList').default
      }
    ]
  },

  {
    path: '/about',
    component: require('./components/About').default
  },

  {
    path: '/',
    redirect:'/snippets/Greetings'
  }
]

export default new VueRouter({
  mode: 'history',
  routes
})
