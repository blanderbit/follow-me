<template>
    <div id="chat_message">
        <br>
        <div class="photo_friend_chat" :style="{background:'url('+ photosMain() +')'}" >

        </div>
        <div class="photo_friend_chat" style="height: auto;width: 90px">
            {{FilterNameChat()}}  {{FilterLastNameChat()}}
        </div>
        <hr style="background: #0f8bd9; height: 1px; margin-top: 20px; width: 100%; ">
        <div style="overflow-y: scroll; height: 390px;" @click="scroll" class="scroll">
            <div v-for="message in chats.messages"  :id="message.id" style="margin-top: 20px;">
                <div class="befores cover" @click="" :style="{background: 'url(' + photos(message.sender_id) +')'}"> </div>
                <div class="onecomments" >
                    <!--:class="{my_user: ids == comments.user_id? true:false}"-->
                    <div class="onecomment dialog">
                        <div style="margin-top: -10px;margin-left: -20px; padding-left: -10px"> <h5 style="display: inline-block; margin-left: 20px">
                            {{ FilterNameChatMessage(message.sender_id)}}</h5><span>{{ message.date}}</span><ion-icon style="float:right;color:gray; font-size: 20px;margin-top: -5px; margin-right: -15px" class="cover"  name="close" @click=""></ion-icon>
                            <p style="position:relative;">{{message.message}}</p>
                        </div>
                    </div>
                </div>
                <div class="clear"></div>
            </div>
        </div>
        <div class="sendMassege">
            <textarea class="send" v-model="quotes" :style="{height: textereaHeight}" @keyup="change" style="float: left" placeholder="Write text"></textarea><ion-icon name="arrow-forward" style="float: right; font-size: 40px" @click="sendToChat"></ion-icon>
            <div class="clear"></div>
        </div>
    </div>
</template>
<script>
    import axios from 'axios'
    import Vue from 'vue'
    import VueRouter from 'vue-router'
    import NProgress from 'nprogress'
    Vue.use(VueRouter)

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

    export default{
        data(){
          return {
              chats: [],
              quotes:'',
              textereaHeight: '18px',
              animus: 'http://img0.liveinternet.ru/images/attach/c/3/76/560/76560786_Clothing086_copy.png',
          }
        },
        methods:{
            photosMain:function(photos) {
                for(let i =0; i<this.chats.chat_users.length;i++){
                    if(this.chats.chat_users[i].id != localStorage.getItem('id')){
                        return !this.chats.chat_users[i].photo ? this.animus :this.chats.chat_users[i].photo
                    }
                }
            },
            photos:function(name){
                for(let i =0; i < 2;i++){
                    if(this.chats.chat_users[i].id == name) {
                        return !this.chats.chat_users[i].photo ? this.animus :this.chats.chat_users[i].photo
                    }
                }
            },
            reversej:function(array){
                return reverse(array)
            },
            FilterNameChatMessage:function(name){
                for(var i =0; i<this.chats.chat_users.length;i++) {
                    if(this.chats.chat_users[i].id == name) {
                        return !this.chats.chat_users[i].firstname? 'No name' : this.chats.chat_users[i].firstname
                    }
                }
            },
            FilterNameChat:function(){
                for(let i =0; i<this.chats.chat_users.length;i++){
                    if(this.chats.chat_users[i].id != localStorage.getItem('id')){
                        return !this.chats.chat_users[i].firstname? 'No name':this.chats.chat_users[i].firstname
                    }
                }
            },
            FilterLastNameChat:function(){
                for(let i =0; i<this.chats.chat_users.length;i++){
                    if(this.chats.chat_users[i].id != localStorage.getItem('id')){
                        return this.chats.chat_users[i].lastname
                    }
                }
            },
            scroll:function(){
                var scrol =this.$el.children[4].scrollHeight
                this.$el.children[4].scrollTo(0,scrol)
            },
            change:function(){
                if(this.quotes.length < 52) {
                    this.textereaHeight = '18px'
                }
                if(this.quotes.length > 52 && this.quotes.length < 104){
                    this.textereaHeight = '28px'
                }
                if(this.quotes.length > 104 && this.quotes.length < 156){
                    this.textereaHeight = '38px'
                }
            },
            sendToChat:function(){
                const instance = axios.create({
                    baseURL: 'http://restapi.fintegro.com',
                    headers: {
                        bearer: validToken()
                    }
                });
                instance.put('chats/'+ this.$route.params.id, {
                    message: this.quotes
                })
                    .then(response => {
                        console.log('send message')
                        const instance = axios.create({
                            baseURL: 'http://restapi.fintegro.com',
                            headers: {
                                bearer: validToken()
                            }
                        });
                        instance.get('chats/'+ this.$route.params.id, {})
                            .then(response => {
                                console.log('chat_id')
                                console.log(response.data.chat)
                                this.chats =response.data.chat
                                this.chats.messages.reverse()
                            })
                            .catch(response => {

                                console.log("chat_id no")
                                console.log(response)
                                this.errored = true;
                            })
                    })
                    .catch(response => {

                        console.log("chat_id no")
                        console.log(response)
                        this.errored = true;
                    })
            }
        },
        updated:function(){
            console.log(this.$el.children[4].scrollHeight)
            var scrol =this.$el.children[4].scrollHeight
            this.$el.children[4].scrollTo(0,scrol)
        },
        created:function() {
            let id = this.$route.params.id != undefined? this.$route.params.id: 0;
            if (validToken()) {
                NProgress.start()
                const instance = axios.create({
                    baseURL: 'http://restapi.fintegro.com',
                    headers: {
                        bearer: validToken()
                    }
                });
                instance.get('chats/'+ this.$route.params.id, {})
                    .then(response => {
                        console.log('chat_id')
                        this.chats =response.data.chat
                        this.chats.messages.reverse()
                        NProgress.done()

                    })
                    .catch(response => {
                        console.log("chat_id no")
                        console.log(response)
                        this.errored = true;
                    })
            } else {

                this.$router.push({name: 'login'})
            }

            let routs = this.$router
            setInterval(function () {
                if (validToken()) {
                } else {
                    console.log('log')
                    routs.push({name: 'login'})
                }
            }, 6000)
        },
        watch: {
            '$route' (to, from) {
                if (validToken()) {
                    NProgress.start()
                    const instance = axios.create({
                        baseURL: 'http://restapi.fintegro.com',
                        headers: {
                            bearer: validToken()
                        }
                    });
                    instance.get('chats/'+ this.$route.params.id, {})
                        .then(response => {
                            console.log('chat_id')
                            this.chats =response.data.chat
                            this.chats.messages.reverse()
                            NProgress.done()
                        })
                        .catch(response => {
                            console.log("chat_id no")
                            console.log(response)
                            this.errored = true;
                        })
                } else {
                    this.$router.push({name: 'login'})
                }
            }
        }
    }


</script>
<style>
    .scroll::-webkit-scrollbar{
         width: 0px;
         background: white;
    }
    .scroll:hover::-webkit-scrollbar{
        width: 10px;
        background: white;
    }
    .scroll::-webkit-scrollbar-thumb{
         width: 0px;
         background: lightblue;border-radius: 10px;height: 1px;
    }
.noneMessege{
    font-size: 50px;
    margin-left:auto;
    margin-right: auto;
}
    .photo_friend_chat{
      margin-left: auto;
        margin-right: auto;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background-size: cover!important;
    }
    .befores {
        font-family: serif;
        position: relative;
        float: left;
        left: 20px;
        top: 5px;
        color: white;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        line-height: 1;
        text-align: center;

    }
    .onecomments {
        width: 410px;
margin-left: 70px;
    }

    .onecomment {
        margin-bottom: 20px;
        margin-left: 40px;
    }

    .onecomment p {
        height: auto;
        margin-top: 10px ;
        margin-left: 20px ;
        font-size: 15px;
    }

    .dialog {
        position: relative;
        background: #dfe9ec;
        padding: 20px;
        color: #222;
        border-radius: 3px;
        margin-left: 20px;
    }

    .dialog::after {
        content: '';
        color: lightgray;
        display: block;
        position: absolute;
        width: 0;
        height: 0;
        border-top: 8px solid transparent;
        border-bottom: 8px solid transparent;
        border-right: 15px solid #dfe9ec;
        left: -15px;
        top: 15px;
    }
    #chat_message{

        height: 540px;

    }
    .sendMassege{
        position: absolute;
        bottom: 27px;
width: 560px;
        height: 40px;

        border-top: 1px solid #0f8bd9;
    }
    .send{
        width: 480px;
        overflow-x: hidden;
    }
</style>
