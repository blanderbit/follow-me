<template>

  <div id="app">
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
      return {}

  },
    created:function(){
        if(validToken()) {
            this.$router.push({ path: 'follow_me' })
        }
        else{
            this.$router.push({ path: 'login' })
        }
    },
}
</script>

