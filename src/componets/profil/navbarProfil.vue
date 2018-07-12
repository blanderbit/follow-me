<template>
    <div id="navbar">
        <div class="globalMyNavBar">
            <div class="globalMyNavBar_head">
                <div class="logoAndName" >
                    <img src="src/assets/logo.png" id="logo" width="50px" height="50px">
                    <span class="logoAndName_name">Follow ME</span>
                </div>

                <nav class="globalMyNavBar_head_nav">
                    <a href="#" @click="home">Home</a>
                    <a href="#" @click="friends">friends</a>
                    <a href="#">My albums</a>
                    <a href="#">News</a>
                    <a href="#" @click="settings">Settings</a>
                </nav>
                <div class="globalMyNavBar_head_searchAndOut">
                    <form>
                    <input type="search" style="margin-right: 20px;" class="search">
                    <input type="submit" value="Search">
                    <a href="#" @click="LogOut">Logout</a></form>
                </div>
                <div class="clear"></div>
            </div>
        </div>
    </div>
</template>


<style>
    #navbar{
        margin-left: auto;margin-right: auto;
        width: 100%;
    }
    .globalMyNavBar{
        background: rgba(0, 153, 255);


    }
    .globalMyNavBar_head{
        margin-top: 0px;
        width: 1340px;
        margin-left: auto;
        margin-right: auto;
        padding: 10px;
        height: 30px;
    }
    #logo{
        position: relative;
        left:-10px;
        top:-10px;
        margin-left: 0px;

    }
    .logoAndName{
        font-family: 'Galada', cursive;
        float: left;
        margin-top: 0px;
        margin-left: 0px;

    }
    .logoAndName_name{
        position: relative;
        left:40px;
        top:-30px;
        margin-left: 0px;
        margin-top: 40px;
        font-size: 20px;
        font-weight: bold;
        margin-right: 70px
    }
    .globalMyNavBar_head_nav{
        float:left;
        width: 500px;
        margin-top: 3px;
        font-family: 'Nunito', sans-serif;
    }

   .globalMyNavBar_head_nav a
   {        padding: 12px;
       text-decoration: none;

       color: white;
       border-top: 3px solid rgba(0, 153, 255);
       border-bottom: 3px solid snow;
       margin-left: -4px;
   }
    .globalMyNavBar_head_searchAndOut a{
        padding: 15px;
    text-decoration: none;
        color: black
    }
    .globalMyNavBar_head_nav a:hover,
    .globalMyNavBar_head_searchAndOut a:hover{
        background:rgba(20, 136, 245);
        border-bottom: 3px solid blue;

    }
    .globalMyNavBar_head_searchAndOut{
        float: right;
        margin-left: 0px;
        padding: 15px;
        margin-top: -10px;
    }
    .clear{
        clear: both;
    }
    .search {

    }
    .globalMyNavBar_head_searchAndOut input[type="search"] {
        background-image: url(https://icons8.com/iconizer/files/Token/orig/Search.png);
        background-repeat: no-repeat; /*Убираем повтор изображения*/
        background-position: 4px; /*Позиционируем*/
        background-size: 15px;
        padding: 10px;
        outline: none; /*убираем стандартную обводку браузера*/
        -moz-border-radius: 5px; /*закругляем углы для Mozilla*/
        -webkit-border-radius: 5px; /*закругляем углы для Chrome, Safari*/
        border-radius: 5px; /*закругляем углы для остальных браузеров*/
        padding-left: 20px; /*отступ слева от ввода, чтобы текст не был на картинке(выбирать по размеру картинки)*/
        height: 20px; /*высота строки ввода*/
        font-size: 13px; /*размер шрифта*/
    }
   .globalMyNavBar_head_searchAndOut input[type="submit"]{
        padding: 5px;
        margin-top: -5px;
        font-family: "HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif;
        font-weight: 400;
        font-size: 14px;
        color: #9d9e9e;
        text-shadow: 1px 1px 0 rgba(256,256,256,1.0);
        background: #fff;
        border: 1px solid #fff;
        border-radius: 5px;
        box-shadow: inset 0 1px 3px rgba(0,0,0,0.50);
        -moz-box-shadow: inset 0 1px 3px rgba(0,0,0,0.50);
        -webkit-box-shadow: inset 0 1px 3px rgba(0,0,0,0.50);
    }
  .globalMyNavBar_head_searchAndOut  input[type="submit"]:hover{
        background: #dfe9ec;
        color: #414848;
    }
    input[type="submit"]:focus{
        background: #dfe9ec;
        color: #414848;
        box-shadow: inset 0 1px 2px rgba(0,0,0,0.25);
        -moz-box-shadow: inset 0 1px 2px rgba(0,0,0,0.25);
        -webkit-box-shadow: inset 0 1px 2px rgba(0,0,0,0.25);
    }
</style>
<script>
    export default {

        data () {
            return {}

        },
        methods:{
            LogOut:function(){
                let logOut = confirm('Confirm the action');
                if(logOut == true){
                    document.cookie = 'token=';
                    localStorage.removeItem('id')
                    this.$router.push({ name: 'login' })
                }
            },
            settings:function(){
                this.$router.push({ name: 'settings',params: {id:localStorage.getItem('id')}})
            },
            friends:function(){
                this.$router.push({ name: 'friends'})
            },
            home:function(){
                this.$router.push({ name: 'profil',params: {id:localStorage.getItem('id')} })
            },
        }
    }
</script>