import Vue from 'vue'
import VueRouter from 'vue-router'

import App from './componets/App.vue'
import registration from './componets/registration.vue'
import firstpage from './componets/firstpage.vue'
import login from './componets/login.vue'
import recovery from './componets/recovery.vue'
import profil from './componets/profil/profil.vue'
Vue.use(VueRouter)

const router = new VueRouter({
    base: "/follow_me",
    routes:[
         {path: '/follow_me', component: firstpage},
        {path: '/login', component: login},
        {path: '/registration', component: registration},
        {path: '/recovery', component: recovery},
        {path: '/profil', component: profil}
    ],
})

new Vue({
    el:"#app",
    render: h => h(App),
    router
})