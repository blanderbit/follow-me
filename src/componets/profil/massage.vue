<template>
    <div id="chat_message">
        <br>
        <div class="photo_friend_chat cover" :style="{background:'url('+ photosMain() +')'}" >

        </div>
        <div class="photo_friend_chat" style="height: auto;width: 90px">
            {{FilterNameChat()}}  {{FilterLastNameChat()}}
        </div>
        <hr style="background: #0f8bd9; height: 1px; margin-top: 20px; width: 100%; ">
        <div @click="scroll" class="scrollChat">
            <div v-for="message in chats.messages"  style="margin-top: 20px;">
                <div class="befores pointer cover" @click="" :style="{background: 'url(' + photos(message.sender_id) +')'}"> </div>
                <div class="onecommentsChat" :class="{my_user: ids == message.sender_id? true:false}">
                    <div class="onecommentChat dialogChat">
                        <div style="margin-top: -10px;margin-left: -20px; padding-left: -10px"> <h5 style="display: inline-block; margin-left: 20px">
                            {{ FilterNameChatMessage(message.sender_id)}}</h5> <span style="font-size: 12px;color:black;margin-left: 240px">{{ dataNumber(message.date) }}</span>
                            <p style="position:relative;">{{message.message}}</p>
                        </div>
                        <div class="clear"></div>
                    </div>
                </div>
                <div class="clear"></div>
            </div>
        </div>
        <div class="sendMassege">
            <textarea class="texterea send" v-model="quotes" :style="{height: textereaHeight}" @keyup="change" style="float: left" placeholder="Write text"></textarea><ion-icon name="arrow-forward"  style="float: right; font-size: 40px" class="pointer" @click="sendToChat"></ion-icon>
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
              ids: localStorage.getItem('id')
          }
        },
        methods:{
            photosMain:function(photos) {
                for(let i =0; i<this.chats.chat_users.length;i++){
                    if(this.chats.chat_users[i].id != localStorage.getItem('id')){
                        if(this.chats.chat_users[i].photo == 'null'){
                            return this.animus
                        }
                        return !this.chats.chat_users[i].photo ? this.animus :this.chats.chat_users[i].photo
                    }
                }
            },
            photos:function(name){
                for(let i =0; i < 2;i++){
                    if(this.chats.chat_users[i].id == name) {
                        if(this.chats.chat_users[i].photo == 'null'){
                            return this.animus
                        }
                        return !this.chats.chat_users[i].photo ? this.animus :this.chats.chat_users[i].photo
                    }
                }
            },
            dataNumber:function(value){
                let datas = value.split(':')
                let datas1 = datas[0].split(' ')
                let newdata = +datas1[1] + 3
                let  array = [];array.push(datas1[0]);array.push(newdata);
                let array1 = [];array1.push(array.join(' '));array1.push(datas[1]);array1.push(datas[2]);
                let time = array1.join(':')
                return time
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
                    this.quotes = '';
                    this.textereaHeight = '18px'
                    const instance = axios.create({
                        baseURL: 'http://restapi.fintegro.com',
                        headers: {
                            bearer: validToken()
                        }
                    });
                    instance.get('chats/'+ this.$route.params.id, {})
                    .then(response => {
                        console.log('chat_id')
                        this.quotes = '';
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
            var scrol =this.$el.children[4].scrollHeight
            this.$el.children[4].scrollTo(0,scrol)
        },
        created:function() {
            if(this.$route.params.id != undefined){
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
                        routs.push({name: 'login'})
                    }
                }, 6000)
            }
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

