<template>
    <div>
        <div v-for="(post, index) in posts" style="margin-top: 20px; " :id="post.id" class="profil_my_data box_shadow" tag="div">
            <div :style="{background:'url('+post.user.photo+')',marginRight: '20px'}" class="cover" style="float:left;width: 50px; height: 50px; background-position: center; border-radius: 10px">
            </div>
            <div style="float:right;font-size: 15px; color: blue;margin-left: 10px "></div>
            <div style="float:right;font-size: 10px; color: lightgray; ">{{post.date}}<span style="margin-left:10px;color: black">{{post.id}}</span></div>
            <div style="float:left;font-size: 15px; color: blue;margin-left: 10px ">{{post.user.firstname}} {{post.user.lastname}}</div>

            <div class="clear"></div>
            <hr :style="{ marginTop:'10px'}" style="width: 100%; background: white; height: 1px;margin-left: -20px">
            <div style="font-size: 15px; margin-bottom: 10px;">{{post.text}} </div>
            <img v-for="media in post.mediaList" width="40%" style="margin-top: 2px; margin-right: 5px; border: 1px solid white;" :src="media.url"/>
            <hr  style="width: 108%; background: blue; height: 1px;margin-left: -20px; margin-top:10px">

            <ion-icon name="chatboxes" class="icon pointer" style="margin-top: 20px;margin-left:20px" v-on:click="open"></ion-icon>
            <span style="margin-top: 25px;float:left">{{post.comments.length}}</span>
            <div style="display: none;float: left">
                <textarea class="comments"  style="margin-top: 20px;float: left;margin-left:10px" v-model="textcomment" placeholder="Leave a comment"></textarea>
                <ion-icon name="archive" class="pointer icon"  style="margin-top: 20px;float:right;font-size: 30px" @click="addcomment(post.id)"></ion-icon>
                <div class="clear"></div>
                <div style="margin-top: 20px;">
                    <div v-for="comments in post.comments" :id="comments.id">
                        <div class="before pointer cover" @click="toFriends(comments.user_id)" :style="{background: 'url(' + functions(comments) +')'}"> </div>
                        <div class="onecomments" :class="{my_user: ids == comments.user_id? true:false}">
                            <div class="onecomment dialog">
                                <div style="margin-top: -10px;margin-left: -20px; padding-left: -10px"> <h5 style="display: inline-block">
                                    {{!comments.user.firstname ||comments.user.firstname== null ? 'NoName' : comments.user.firstname }} {{!comments.user.lastname ||comments.user.lastname== null ? '' :comments.user.lastname}}</h5><ion-icon style="float:right;color:gray; font-size: 20px;margin-top: -5px; margin-right: -15px" name="close" class="pointer"  @click="removecomment(comments.id)"></ion-icon>
                                    <p style="position:relative;">{{comments.text}}</p>
                                </div>
                            </div>
                        </div>
                        <div class="clear"></div>
                    </div>
                </div>
            </div>
            <div class="clear"></div>
        </div>
    </div>
</template>
<script>
    import axios from 'axios'
    import Vue from 'vue'
    import VueRouter from 'vue-router'

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
                posts: [],
                disp: 'none',
                success: null,
                postPhoto:[],
                postText:null,
                error:'',
                textcomment:'',
                ids:localStorage.getItem('id')
            }
        },
        created: function () {
            const instance = axios.create({
                baseURL: 'http://restapi.fintegro.com',
                headers: {
                    bearer: validToken()
                }
            });

            instance.get('posts/'+ this.$router.history.current.params.id, {
                params :{
                    limit: '*',

                }
            })
                .then(response => {
//                localStorage.setItem('postse',response.data.posts.length)
                    this.$emit('postesonce',response.data.posts.length)
                    this.posts = response.data.posts
                })
                .catch(response => {
                    console.log("no respanse posts")
                    this.errored = true;
                    event.preventDefault()
                })
        },
        methods:{
            open:function(){
                let style = getComputedStyle(event.srcElement.nextElementSibling.nextElementSibling)
                if(style.display == 'none'){
                    event.srcElement.nextElementSibling.nextElementSibling.style.display = 'block'
                }else{
                    event.srcElement.nextElementSibling.nextElementSibling.style.display = 'none'
                }
            },
            removecomment:function(comment){
                const instance = axios.create({
                    baseURL: 'http://restapi.fintegro.com',
                    headers: {
                        bearer: validToken()
                    }
                });
                instance.delete('comments/'+ comment, {
                })
                    .then(response => {
                        console.log('this comment been remove')
                        this.success = true
                    })
                    .catch(response => {
                        debugger
                        console.log("this comment don't was remove")
                        console.log(response)
                        this.errored = true;
                        event.preventDefault()
                    })

                document.getElementById(comment).style.display = 'none'
            },
            functions:function(friend){
                return !friend.user.photo? this.animus :friend.user.photo
            },
            addcomment:function(post){
                const instance = axios.create({
                    baseURL: 'http://restapi.fintegro.com',
                    headers: {
                        bearer: validToken()
                    },
                    data :{
                        text: this.textcomment,
                        post_id: post

                    }
                });
                instance.post('comments ', {
                })
                    .then(response => {
                        console.log('add comments by posts!!')
                        this.textcomment = ''
                        const instance = axios.create({
                            baseURL: 'http://restapi.fintegro.com',
                            headers: {
                                bearer: validToken()
                            }
                        });

                        instance.get('posts/'+ localStorage.getItem('id_friend'), {
                            params :{
                                limit: '*',

                            }
                        })
                            .then(response => {
                                localStorage.setItem('posts',response.data.posts.length)
                                this.posts = response.data.posts
                            })
                            .catch(response => {
                                console.log("no respanse posts")
                                this.errored = true;
                                event.preventDefault()
                            })
                    })
                    .catch(response => {
                        console.log("you don't add commnets by posts")
                        console.log(response)
                        this.errored = true;
                        event.preventDefault()

                    })

            },
            toFriends:function(user){
                localStorage.setItem('id_friend',user)
                if(validToken()) {
                    if(localStorage.getItem('id_friend') != localStorage.getItem('id')){
                        this.$router.push({ name: 'profil_friend',params:{id: localStorage.getItem('id_friend')}})
                    }
                    else{
                        this.$router.push({ name: 'profil',params:{id: localStorage.getItem('id')}})
                    }
                }
                else{
                    event.preventDefault()
                    this.$router.push({name: 'login'})
                }
            }
        },
        watch: {
            '$route' (to, from) {
                localStorage.setItem('id_friend', this.$route.params.id)
                const instance = axios.create({
                    baseURL: 'http://restapi.fintegro.com',
                    headers: {
                        bearer: validToken()
                    }
                });

                instance.get('posts/' + localStorage.getItem('id_friend'), {
                    params: {
                        limit: '*',

                    }
                })
                    .then(response => {
                        this.$emit('postes',response.data.posts.length)
                        this.posts = response.data.posts
                    })
                    .catch(response => {
                        console.log("no respanse posts")
                        this.errored = true;
                        event.preventDefault()
                    })
            }
        }
    }
</script>
