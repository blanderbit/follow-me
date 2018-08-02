<template>
    <div id="navbar">
        <div class="globalMyNavBar">
            <div class="globalMyNavBar_head">
                <div class="logoAndName">
                    <img src="src/assets/logo.png" id="logoNavbar" width="50px" height="50px">
                    <ion-icon name="menu" class="menu pointer" style="font-size: 30px;" @click="menu" id="menu"></ion-icon>
                </div>
                <nav class="globalMyNavBar_head_nav" id="navMenu" style="display: none">
                    <a href="#" @click="home">Home</a>
                    <a href="#" @click="friends">friends</a>
                    <a href="#">My albums</a>
                    <a href="#" @click="news">News</a>
                    <a href="#" @click="settings">Settings</a>
                    <a href="#" @click="chat">chat <span style="display: inline-block;color:red;font-weight: bold;background:yellow;border-radius: 10px;padding-left: 5px;padding-right: 5px" v-if="count > 0?true:false">{{count}}</span></a>
                </nav>
                <div class="globalMyNavBar_head_searchAndOut">
                    <ion-icon name="power" class="menu pointer" style="font-size: 30px;" @click="LogOut" id="back"></ion-icon>
                    <form>
                        <input type="search" @focus="globalall" style="margin-right: 20px;" class="search">
                        <input type="submit" value="Search">
                        <a href="#" @click="LogOut">Logout</a>
                    </form>
                </div>
                <div class="clear"></div>
            </div>
        </div>
    </div>
</template>

<script>
    function delete_cookie ( cookie_name )
    {
        var cookie_date = new Date ( );  // Текущая дата и время
        cookie_date.setTime ( cookie_date.getTime() - 1 );
        document.cookie = cookie_name += "=; expires=" + cookie_date.toGMTString();
    }
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
    export default {

        data () {
            return {}

        },
        methods:{
            LogOut:function(){
                let logOut = confirm('Confirm the action');
                if(logOut == true){
//                    document.cookie = 'token=';
                    delete_cookie('token')
                    localStorage.removeItem('id')
                    this.$router.push({ name: 'login' })
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
            menu:function(){
                var block = getComputedStyle(document.getElementById('navMenu')).display
                if(block == 'none'){
                    document.getElementById('navMenu').style.display = 'block'
                    document.getElementById('menu').style.color = 'white'
                }else{
                    document.getElementById('navMenu').style.display = 'none'
                    document.getElementById('menu').style.color = 'black'

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
            friends:function(){
                if(validToken()) {
                    event.preventDefault()
                    this.$router.push({ name: 'friends'})
                }
                else{
                    event.preventDefault()
                    this.$router.push({name: 'login'})
                }
            },
            chat:function(){
                if(validToken()) {
                    event.preventDefault()
                    this.$router.push({ name: 'chat'})
                }
                else{
                    event.preventDefault()
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
            global:function(){
                if(validToken()) {
                    event.preventDefault()
                    this.$router.push({name: 'friends_globall'})
                }
                else{
                    event.preventDefault()
                    this.$router.push({name: 'login'})
                }

//                var block = getComputedStyle(document.getElementById('category-wrap')).display
//                if(getComputedStyle(document.getElementById('category-wrap')).position == 'fixed'){
//                    if(block == 'none'){
//                        document.getElementById('category-wrap').style.display = 'block'
//                        document.getElementById('menu').style.color = 'white'
//                    }else{
//                        document.getElementById('category-wrap').style.display = 'none'
//                        document.getElementById('menu').style.color = 'black'
//
//                    }
//                }else{
//                    if(block == 'none'){
//                    document.getElementById('category-wrap').style.display = 'block'
//                    document.getElementById('menu').style.color = 'white'
//                }else{
//                    document.getElementById('category-wrap').style.display = 'none'
//                    document.getElementById('menu').style.color = 'black'
//
//                }}

            }
        }
    }
</script>