<template>
    <div id="chat_message">
        <div class="photo_friend_chat" :style="{background:'url('+chats.chat_users[1].photo+')', marginTop: '20px'}" style="background-size: cover">

        </div>
        <div class="photo_friend_chat" style="height: auto;width: 90px">
            {{chats.chat_users[1].firstname}}  {{chats.chat_users[1].lastname}}
        </div>
        <hr style="background: #0f8bd9; height: 1px; margin-top: 20px; width: 100%; ">
        <div>

        </div>
    </div>
</template>
<script>
    import axios from 'axios'
    import Vue from 'vue'
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
    export default{
        data(){
          return {
              chats: [],
          }
        },
        created:function() {
            let id = this.$route.params.id != undefined? this.$route.params.id: 0;
            if (validToken()) {
                const instance = axios.create({
                    baseURL: 'http://restapi.fintegro.com',
                    headers: {
                        bearer: validToken()
                    }
                });
                instance.get('chats/'+ this.$route.params.id, {})
                    .then(response => {
                        console.log('chat_id')
                        console.log(response)
                        this.chats =response.data.chat


                    })
                    .catch(response => {
                        debugger
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
        },
        watch: {
            '$route' (to, from) {
                if (validToken()) {
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
                        })
                        .catch(response => {
                            debugger
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
    .photo_friend_chat{
      margin-left: auto;
        margin-right: auto;
        width: 100px;
        height: 100px;
        border-radius: 50%;
    }
</style>