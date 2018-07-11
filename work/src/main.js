import Vue from 'vue'
import VueRouter from 'vue-router'

import App from './componets/App.vue'
import registration from './componets/registration.vue'
import firstpage from './componets/firstpage.vue'
import login from './componets/login.vue'
import recovery from './componets/recovery.vue'
import profil from './componets/profil/profil.vue'
import settings from './componets/profil/settings.vue'
import albums from './componets/profil/albums.vue'
// import insideAlbum from '../componets/profil/insideAlbum.vue'



Vue.use(VueRouter)

const router = new VueRouter({
    base: "/follow_me",
    routes:[
         {path: '/follow_me', component: firstpage},
        {path: '/login',name:'login', component: login},
        {path: '/registration',name:'registration', component: registration},
        {path: '/recovery',name:'recovery', component: recovery},
        {path: '/profil/:id',name:'profil', component: profil, props: true},
        {path: '/settings/:id',name:'settings', component: settings, props: true},
        {path: '/albums/:id',name:'albums', component: albums, props: true},
        // {path: '/insideAlbum/:id',name:'insideAlbum', component: insideAlbum, props: true},

    ],
})

new Vue({
    el:"#app",
    render: h => h(App),
    router
})