<template>

  <div id="app" >
    <router-view></router-view>
  </div>
</template>

<script>
    import login from './login.vue'
    import registration from './registration.vue'


    function validToken(){
        var cookies = document.cookie.split(',');
        var token;
        for(var i = 0; i<cookies.length; i++){
            if(cookies[i].indexOf('token') !== -1){
                token = cookies[i].split('=')[1];
                break;
            }
        }
        return token;
    }

export default {
  name: 'app',
  data () {
      return {
      }
  },
    created: function() {
        if (!validToken()) {
            return this.$router.push({ name: "login" });
        }
        switch (location.hash
            .split("/")
            .slice(1, 2)
            .toString()) {
            case "profil":
                this.$router.push({
                    name: "profil",
                    params: {
                        id: localStorage.getItem("id")
                    }
                });
                break;
            case "albums":
                this.$router.push({
                    name: "albums",
                    params: {
                        id: localStorage.getItem("id")
                    }
                });
                break;
            case "insideAlbum":
                this.$router.push({
                    name: "insideAlbum",
                    params: {
                        id: localStorage.getItem("id")
                    }
                });
                break;
            case "friends":
                this.$router.push({
                    name: "friends",
                    params: {
                        id: localStorage.getItem("id")
                    }
                });
                break;
            case "settings":
                this.$router.push({
                    name: "settings",
                    params: {
                        id: localStorage.getItem("id")
                    }
                });
                break;
            case "news":
                this.$router.push({
                    name: "news",
                    params: {
                        id: localStorage.getItem("id")
                    }
                });
                break;
            case "login":
                this.$router.push({
                    name: "login",
                    params: {
                        id: localStorage.getItem("id")
                    }
                });
                break;
            case "registration":
                this.$router.push({
                    name: "registration",
                    params: {
                        id: localStorage.getItem("id")
                    }
                });
                break;
        }
    }
//    created:function(){
//
//        if(!validToken() && !localStorage.getItem('id')) {
//            this.$router.push({ name: 'login' })
//        }
//        else{
//            console.log(location.hash.split('/').slice(1))
//            if(location.hash.split('/').slice(1).length == 1) {
//                var reloads = location.hash.split('/').slice(1)
//                this.$router.push({name: reloads})
//            }
////            if(location.hash.split('/').slice(1).length == 2){
////                var reloads = location.hash.split('/').slice(1)
////                this.$router.push({name: 'profil', params: {id: localStorage.getItem('id')}})
////            }
//        }
//    },
}
</script>
<style>
  body::-webkit-scrollbar{
    width: 10px;
    background: white;
  }

  body::-webkit-scrollbar-thumb{
    width: 0px;
    background: lightblue;border-radius: 10px;height: 1px;
  }
</style>

