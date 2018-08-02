<template>
    <div id="chat" >
        <navbar style="position: fixed;margin-left: 0px; z-index: 1000; "></navbar><br>
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
                        <div class="blokChat" style="width: 306px" v-for="chat in filterBy(chats,text1)" :id="chat.chat_id">
                            <div  :style="{background: 'url(' + FilterPhotoChat(chat.chat_users) +')'}" @click="toFriends(chat.chat_users)" class="pointer cover" style="float:left ; width: 50px;height: 50px;border-radius: 10px"></div>
                            <ion-icon style="float:right;color:gray; font-size: 20px;margin-top: -5px; margin-right: -15px;z-index: 1000" class="pointer"  name="close" @click="removeChat(chat.chat_id)"></ion-icon>
                            <div style="cursor: grab;cursor: -webkit-grab;float:left; width: 240px;height: 50px; margin-left: 10px; line-height: 1.4" @click="toChat(chat.chat_id)">
                                <span style="color: black;font-style: italic; font-size:15px;display: block;">{{ FilterNameChat(chat.chat_users) }} {{ FilterLastNameChat(chat.chat_users) }}</span>
                                <div :style="{background: 'url('+FilterPhotoChatTwo(chat.chat_users,chat.last_mes)+')'}" style="float:left;width: 30px;height: 30px;border-radius: 10px;display: inline-block" class="pointer cover"></div><div style="display:inline-block;float:left;margin-left:10px;display: inline-block;margin-top: 5px;width: 160px;text-overflow:ellipsis;white-space: nowrap;overflow: hidden;font-size: 14px">{{chat.last_mes.message}}</div>
                                <ion-icon name="checkmark-circle-outline" style="float:right;color:lightseagreen; font-size: 30px" v-if="chat.last_mes.status == 1?true:false"></ion-icon>
                                <ion-icon name="checkmark-circle" style="float:right;color:red; font-size: 30px"  v-if="chat.last_mes.status == 0?true:false"></ion-icon>
                                <div class="clear"></div>
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
    import navBar from './navBarProfil.vue'
    import massage from './massage.vue'
    import axios from 'axios'
    import Vue from 'vue'
    import NProgress from 'nprogress'
    import VueRouter from 'vue-router'
    import VueFilters from 'vue2-filters'


    Vue.use(VueRouter)
    Vue.use(VueFilters)


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
            return {
                token: validToken(),
               chats: [],
                text1:'',
                animus: 'http://img0.liveinternet.ru/images/attach/c/3/76/560/76560786_Clothing086_copy.png',
                posit:'static',
            }

        },
        methods: {
            FilterPhotoChatTwo:function(friend,id){
                for(let i =0; i<friend.length;i++){
                    if(friend[i].id == id.sender_id){
                        if(friend[i].photo == 'null'){
                            return this.animus
                        }
                        return !friend[i].photo || friend[i].photo == null? this.animus :friend[i].photo
                    }
                }
            },
            FilterPhotoChat:function(friend){
                for(let i =0; i<friend.length;i++){
                    console.log()
                    if(friend[i].id != localStorage.getItem('id')){
                        if(friend[i].photo == 'null'){
                            return this.animus
                        }

                        return !friend[i].photo ? this.animus :friend[i].photo
                    }
                }
            },
            removeChat:function(value){
                event.preventDefault()
                console.log(value)
                if(validToken()) {
                    NProgress.start()
                    const instance = axios.create({
                        baseURL: 'http://restapi.fintegro.com',
                        headers: {
                            bearer: validToken()
                        }
                    });
                    instance.delete('chats/'+ value, {})
                        .then(response => {
                            console.log(response)
                            NProgress.done()
                        })
                        .catch(response => {
                            console.log("no chat")
                            console.log(response.textStatus)
                            this.errored = true;
                            this.$router.push({name: 'login'})
                        })
                } else{
                    this.$router.push({name: 'login'})
                }
                document.getElementById(value).style.display = 'none'

            },
            FilterNameChat:function(friend,name){
                for(let i =0; i<friend.length;i++){
                    if(friend[i].id != localStorage.getItem('id')){
                        return !friend[i].firstname? 'No name':friend[i].firstname
                    }
                }
            },
            FilterLastNameChat:function(friend){
                for(let i =0; i<friend.length;i++){
                    if(friend[i].id != localStorage.getItem('id')){
                        return friend[i].lastname
                    }
                }
            },
            rety:function(a){
                if(a === true){
                    return true
                }
                return false
            },
            toFriends:function(user){
                for(var i = 0;i < user.length;i++){
                   if(user[i].id != localStorage.getItem('id')){
                       if(validToken()) {
                           event.preventDefault()
                           localStorage.setItem('id_friend',user[i].id)
                           this.$router.push({ name: 'profil_friend',params:{id: localStorage.getItem('id_friend')}})
                       }
                       else{
                           event.preventDefault()
                           this.$router.push({name: 'login'})
                       }
                   }
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
            navbar: navBar,
            sitebar:sitebar,
            massage:massage
        },
        created:function(){
            if(validToken()) {
                NProgress.start()
                const instance = axios.create({
                    baseURL: 'http://restapi.fintegro.com',
                    headers: {
                        bearer: validToken()
                    }
                });
                instance.get('chats', {})
                    .then(response => {
                        this.chats = response.data.chats
                        NProgress.done()
                    })
                    .catch(response => {
                        console.log("no chat")
                        console.log(response.textStatus)
                        this.errored = true;
                        this.$router.push({name: 'login'})
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
        },
        watch: {
            '$route' (to, from) {
                if(validToken()) {
                    NProgress.start()
                    const instance = axios.create({
                        baseURL: 'http://restapi.fintegro.com',
                        headers: {
                            bearer: validToken()
                        }
                    });
                    instance.get('chats', {})
                        .then(response => {
                            console.log(response.data.chats)
                            this.chats = response.data.chats
                            NProgress.done()
                        })
                        .catch(response => {
                            console.log("no chat")
                            console.log(response)
                            this.errored = true;
                        })
                } else{
                    this.$router.push({name: 'login'})
                }
            }
        }
    }

</script>
