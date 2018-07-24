import Vue from 'vue'
import VueRouter from 'vue-router'
import NProgress from 'nprogress'

import App from './componets/App.vue'
import registration from './componets/registration.vue'
import login from './componets/login.vue'
import recovery from './componets/recovery.vue'
import profil from './componets/profil/profil.vue'
import settings from './componets/profil/settings.vue'
import friends from './componets/profil/friends.vue'
import friendsGlobal from './componets/profil/friendsgloball.vue'
import blacklist from './componets/profil/blackList.vue'
import profil_friend from './componets/profil/profilFriends.vue'
import friends_friend from './componets/profil/friendsFriend.vue'
import news from './componets/profil/news.vue'
import chat from './componets/profil/chat.vue'
Vue.use(VueRouter)

const router = new VueRouter({
    base: "/login",
    routes:[
        {path: '/login',name:'login', component: login},
        {path: '/registration',name:'registration', component: registration},
        {path: '/recovery',name:'recovery', component: recovery},
        {path: '/profil/:id',name:'profil', component: profil, props: true},
        {path: '/settings/:id',name:'settings', component: settings, props: true},
        {path: '/friends',name:'friends', component: friends},
        {path: '/world_friends',name:'friends_globall', component: friendsGlobal},
        {path: '/blacklist',name:'blacklist', component: blacklist},
        {path: '/profil_friend/:id',name:'profil_friend', component: profil_friend, props: true},
        {path: '/profil_friend/friends/:id',name:'profil_friend_friends', component: friends_friend, props: true},
        {path: '/news',name:'news', component: news},
        {path: '/message/:id',name:'message', component: chat,props:true}
    ],
})

router.beforeResolve((to, from, next) => {
    if (to.name) {
        NProgress.start()
    }
    next()
})
router.afterEach((to, from) => {
    NProgress.done()
})

export default router
new Vue({
    el:"#app",
    render: h => h(App),
    router
})