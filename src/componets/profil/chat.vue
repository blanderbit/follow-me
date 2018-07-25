<template>
    <div id="chat" >
        <!--<navbar style="position: fixed;margin-left: 0px; z-index: 1000; "></navbar><br>-->
        <div style="width: 100%; margin-bottom:20px">
            <div class="profil_my_data" style="padding:0;width: 900px;margin-left: auto;margin-right: auto;margin-top:50px;box-shadow: 0 3px 3px rgba(0,0,0,0.2);
-moz-box-shadow: 0 3px 3px rgba(0,0,0,0.2);
-webkit-box-shadow: 0 3px 3px rgba(0,0,0,0.2); height: 540px" >
                <div class="profil_my_data" style="width: 300px;float: left; border-right: 1px solid blue;">
                    <form action="" class="searchChat">
                        <input type="search" placeholder="Search chats" v-model="text1" class="input" />
                        <input type="submit"  value="" class="submit" />
                    </form>
                    <hr style="background: #0f8bd9; height: 1px; margin-top: 20px; width: 114%; margin-left: -20px">
                    <div class="listChats">
                        <div class="blokChat" v-for="chat in chats" @click="toChat(chat.chat_id)">
                            <div  :style="{background: 'url(' + functions(chat.chat_users[1]) +')'}" @click="toFriends(chat.chat_users[1].id)" class="cover" style="float:left ; width: 50px;height: 50px;border-radius: 10px"></div>
                            <div style="float:left; width: 240px;height: 50px; margin-left: 10px; line-height: 1.4">
                                <span style="color: black;font-style: italic; font-size:15px; margin-top: 7px">{{chat.chat_users[1].firstname}} {{chat.chat_users[1].lastname}}</span>
                            </div>
                            <div class="clear"></div>
                        </div>
                    </div>
                </div>
                <div style="float: right;width: 559px;  ">
                    <massage></massage>
                </div>
            </div>
            <div class="clear"></div>
        </div>
        <globFooter></globFooter>
    </div>
</template>
<script>
    import GFooter from '../GloballFooter.vue'
    import sitebar from './sitebar.vue'
//    import navBar from './navBarProfil.vue'
    import massage from './massage.vue'
    import axios from 'axios'
    import Vue from 'vue'
    //    import VueResource from 'vue-resource'
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

    import VueRouter from 'vue-router'
    Vue.use(VueRouter)
    import VueFilters from 'vue2-filters'
    Vue.use(VueFilters)
    export default {
        data () {
            return {
                token: validToken(),
               chats: [],
                text1:'',
                animus: 'http://img0.liveinternet.ru/images/attach/c/3/76/560/76560786_Clothing086_copy.png',
                posit:'static',
//                elem: document.getElementById('category-wrap').getBoundingClientRect().bottom + window.pageYOffset
            }

        },
        methods: {
            functions:function(friend){
                return !friend.photo ? this.animus :friend.photo
            },
            rety:function(a){
                if(a === true){
                    return true
                }
                return false
            },
//            scrol:function(){
//                if (window.pageYOffset < this.elem) {
//                    this.posit = 'static'
//                } else if (window.pageYOffset > this.elem) {
//                    this.posit = 'fixed'
//                }
//            },
            toFriends:function(user){
                if(validToken()) {
                    event.preventDefault()
                    localStorage.setItem('id_friend',user)
                    this.$router.push({ name: 'profil_friend',params:{id: localStorage.getItem('id_friend')}})
                }
                else{
                    event.preventDefault()
                    this.$router.push({name: 'login'})
                }
            },
            toChat:function(chat){

                if(validToken()) {
                    console.log(chat)
                    event.preventDefault()
                    this.$router.push({ name: 'message',params:{id: chat}})
                }
                else{
                    event.preventDefault()
                    this.$router.push({name: 'login'})
                }
            }

        },
        components: {
            globFooter: GFooter,
//            navbar: navBar,
            sitebar:sitebar,
            massage:massage
        },
        created:function(){
            if(validToken()) {
                const instance = axios.create({
                    baseURL: 'http://restapi.fintegro.com',
                    headers: {
                        bearer: validToken()
                    }
                });
                instance.get('chats', {})
                    .then(response => {
                        console.log('chat')
                        console.log(response.data.chats)
                        this.chats = response.data.chats
                    })
                    .catch(response => {
                        debugger
                        console.log("Friends friends error")
                        console.log(response)
                        this.errored = true;
                    })
            } else{

                this.$router.push({name: 'login'})
            }

            let routs = this.$router
            setInterval(function() {
                if(validToken()) {

                }else{
                    routs.push({name: 'login'})
                }
            },6000)
        }
    }

</script>
<style>
    .cover{
        background-size:cover!important
    }
    .cover:hover{
        cursor: pointer;
    }

    .searchChat {
        width: 100%;
        position: relative;
    }

    .searchChat input {
        border: none;
    }

    /* стили для поля ввода */
    .searchChat .input {
        width: 100%;
        height: 20%;
        padding: 8px 37px 9px 15px;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        box-shadow: inset 0 0 5px rgba(0,0,0,0.1), inset 0 1px 2px rgba(0,0,0,0.3);
        border-radius: 20px;
        background: #EEE;
        font: 13px Tahoma, Arial, sans-serif;
        color: #555;
        outline: none;
    }


    .searchChat .input:focus {
        box-shadow: inset 0 0 5px rgba(0,0,0,0.2), inset 0 1px 2px rgba(0,0,0,0.4);
        background: #E8E8E8;
        color: #333;
    }


    .searchChat .submit {
        position: absolute;
        top: 5px;
        border-top-right-radius: 15px;
        border-bottom-right-radius: 15px;
        right: 0;
        width: 37px;
        height: 100%;
        cursor: pointer;
        background: url(https://lh4.googleusercontent.com/-b-5aBxcxarY/UAfFW9lVyjI/AAAAAAAABUg/gQtEXuPuIds/s13/go.png) 50% no-repeat;
        opacity: 0.5;
    }
    .searchFriend .submit:hover {
        /*opacity: 0.8;*/
    }
    input[type="search"] {
        -webkit-appearance: none;
    }
    .profil_my_data{
        padding: 20px;
        background: white;
    }
    .profil_my_data .span span{
        background: rgba(0, 153, 255, 0.3);
        padding: 20px;
    }
    .listChats{
        height: 445px;
        width: 30px;

    }
    .listChats > div{
        height: 55px;
        margin-left: -20px;
        border-bottom:1px solid #0f8bd9;
    }
    .listChats > div:hover{
        background: #cad8e0;
    }
    .blokChat {
        position:relative;
        width:307px;
        padding:1em;

        background:#fff;
        -webkit-box-shadow:0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1) inset;
        -moz-box-shadow:0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1) inset;
        box-shadow:0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1) inset;
        /*-webkit-box-shadow: 0 15px 10px -10px rgba(0, 0, 0, 0.5), 0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1) inset;*/
        /*-moz-box-shadow: 0 15px 10px -10px rgba(0, 0, 0, 0.5), 0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1) inset;*/
        /*box-shadow: 0 15px 10px -10px rgba(0, 0, 0, 0.5), 0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1) inset;*/
    }

    .blokChat:before,
    .blokChat:after {
        content:"";
        position:absolute;
        z-index:-2;
    }

    .blokChat p {
        font-size:16px;
        font-weight:bold;
    }

</style>