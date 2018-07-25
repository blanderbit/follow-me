import Vue from "vue";
import VueRouter from "vue-router";

import App from "./componets/App.vue";
import registration from "./componets/registration.vue";
import firstpage from "./componets/firstpage.vue";
import login from "./componets/login.vue";
import recovery from "./componets/recovery.vue";
import profil from "./componets/profil/profil.vue";
import settings from "./componets/profil/settings.vue";
import albums from "./componets/profil/albums.vue";
import insideAlbum from "./componets/profil/insideAlbum.vue";
import friends from "./componets/profil/friends.vue";
import friendsGlobal from "./componets/profil/friendsgloball.vue";
import blacklist from "./componets/profil/blackList.vue";
import profil_friend from "./componets/profil/profilFriends.vue";
import friends_friend from "./componets/profil/friendsFriend.vue";
import news from "./componets/profil/news.vue";
import chat from "./componets/profil/chat.vue";

Vue.use(VueRouter);

const router = new VueRouter({
  base: "/follow_me",
  routes: [
    { path: "/follow_me", component: firstpage },
    { path: "/login", name: "login", component: login },
    { path: "/registration", name: "registration", component: registration },
    { path: "/recovery", name: "recovery", component: recovery },
    { path: "/profil/:id", name: "profil", component: profil, props: true },
    {
      path: "/settings/:id",
      name: "settings",
      component: settings,
      props: true
    },
    { path: "/albums/:id", name: "albums", component: albums, props: true },
    {
      path: "/insideAlbum/:album_id",
      name: "insideAlbum",
      component: insideAlbum,
      props: true
    },
    { path: "/friends", name: "friends", component: friends },
    {
      path: "/world_friends",
      name: "friends_globall",
      component: friendsGlobal
    },
    { path: "/blacklist", name: "blacklist", component: blacklist },
    {
      path: "/profil_friend/:id",
      name: "profil_friend",
      component: profil_friend,
      props: true
    },
    {
      path: "/profil_friend/friends/:id",
      name: "profil_friend_friends",
      component: friends_friend,
      props: true
    },
    { path: "/news", name: "news", component: news },
    { path: "/message/:id", name: "message", component: chat, props: true }
  ]
});

new Vue({
  el: "#app",
  render: h => h(App),
  router
});
