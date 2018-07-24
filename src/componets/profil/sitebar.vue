<template>
   <div id="category-wrap" >
                <h3>Menu</h3>
                <ul>
                  <li><a  @click="home">Home</a></li>
                  <li><a @click="settings">Settings</a></li>
                  <li><a >Album</a></li>
                  <li @click="tofriend"><a >Friends</a></li>
                  <li><a @click="news">News</a></li>
                  <li><a  @click="LogOut">Log out</a></li>
                </ul>
              </div>
</template>


<style>
/*Сайт бар*/
#category-wrap {

  padding: 15px;
  background: white;
  width: 200px;
  box-shadow: 2px 2px 8px rgba(0,0,0,.1);
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
}
#category-wrap h3 {
  font-size: 16px;
  color: rgba(0,0,0,.6);
  margin: 0 0 10px;
  padding: 0 5px;
  position: relative;
}
#category-wrap h3:after {
  content: "";
  width: 6px;
  height: 6px;
  background: #80C8A0;
  position: absolute;
  right: 5px;
  bottom: 2px;
  box-shadow: -8px -8px #80C8A0, 0 -8px #80C8A0, -8px 0 #80C8A0;
}
#category-wrap ul {
  list-style: none;
  margin: 0;
  padding: 0; 
  border-top: 1px solid rgba(0,0,0,.3);
}
#category-wrap li {margin: 12px 0 0 0px;}
#category-wrap a {
  text-decoration: none;
  display: block;  
  font-size: 13px;
  color: rgba(0,0,0,.6);
  padding: 5px;
  position: relative;
  transition: .3s linear;
}
#category-wrap a:after {
  content:"\f18e";
  font-family: FontAwesome;
  position: absolute;
  right: 5px;
  color: white;
  transition: .2s linear;
}
#category-wrap a:hover {
  background: #80C8A0;
  color: white;
}
a:hover{
    cursor: pointer;
}
.fixed {
    position: fixed;
    top: 0;
    left: 0;
}
</style>
<script>
    function validToken(){
        let cookies = document.cookie.split(',');
        let token;
        for(let i = 0; i<cookies.length; i++){
            if(cookies[i].indexOf('token') !== -1){
                token = cookies[i].split('=')[1];
                break;
            }
        }
        return token;
    }


    function delete_cookie ( cookie_name )
    {
        var cookie_date = new Date ( );  // Текущая дата и время
        cookie_date.setTime ( cookie_date.getTime() - 100 );
        document.cookie = cookie_name += "=; expires=" + cookie_date.toGMTString();
    }
    export default {

        data () {
            return {

            }

        },
        methods:{
            LogOut:function(){
                let logOut = confirm('Confirm the action');
                if(logOut == true){
//                    document.cookie = 'token=';
                    delete_cookie('token')
                    localStorage.removeItem('id')
                    this.$router.push({name: 'login'})
                }
            },
            home:function(){
                if(validToken()) {
                    event.preventDefault()
                    this.$router.push({name: 'profil', params: {id: localStorage.getItem('id')}})
                }
                else{
                    event.preventDefault()
                    this.$router.push({name: 'login'})
                }
            },
            news:function(){
                if(validToken()) {
                    event.preventDefault()
                    this.$router.push({name: 'news'})
                }
                else{
                    event.preventDefault()
                    this.$router.push({name: 'login'})
                }

            },
            settings:function(){
                if(validToken()) {
                    event.preventDefault()
                     this.$router.push({ name: 'settings',params: {id:localStorage.getItem('id')}})
                }
                else{
                    event.preventDefault()
                    this.$router.push({name: 'login'})
                 }
            },
            tofriend:function(){
                if(validToken()) {
                    event.preventDefault()
                    this.$router.push({ name: 'friends'})
                }
                else{
                    event.preventDefault()
                    this.$router.push({name: 'login'})
                }
            },
        }
    }
</script>