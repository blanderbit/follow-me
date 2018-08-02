<template>
    <div id="showPostFriends">
        <div class="profil_my_data box_shadow" style="margin-top: 20px;">
            <div style="float: left">
                <textarea class="texterea" width="400px" rows="2" placeholder="What new?" v-model="postText"></textarea>
                <span class="bar"></span>
            </div>
            <form id="uploadForm" class="uploadPhotoProfil" style="float: right; margin-top: 20px;">
                <label>
                    <input type="file" name="UploadForm[imageFile]"  id="file" @change="uploadPhoto">
                    <span><ion-icon name="camera" class="icon" ></ion-icon></span>
                </label>
            </form>
            <span style="color:red">{{error}}</span>
            <div class="clear"></div>
            <img v-for="photo in postPhoto" :src="photo.url" style="width: 50%">
            <button type="text" class="submit-btn pointer" style="background: rgb(0, 78, 150); margin-left: 0px; height: 35px;
        min-width: 100px;
        font-size: 10px;" @click="post">Post</button>
        </div>

        <div v-for="(post, index) in posts"style="margin-top: 20px; list-style: none;" @click :id="post.id" class="profil_my_data box_shadow" tag="div">
            <div :style="{background:'url('+post.user.photo+')',marginRight: '20px'}" class="cover" style="float:left;width: 50px; height: 50px; background-position: center; border-radius: 10px">
            </div>
            <div style="float:right;font-size: 15px; color: blue;margin-left: 10px "><ion-icon style="color:gray; font-size: 20px" class="pointer icon" name="close" @click="removepost(post.id)"></ion-icon></div>
            <div style="float:right;font-size: 10px; color: lightgray; ">{{post.date}}<span style="margin-left:10px;color: black">{{post.id}}</span></div>
            <div style="float:left;font-size: 15px; color: blue;margin-left: 10px ">{{post.user.firstname}} {{post.user.lastname}}</div>

            <div class="clear"></div>
            <hr  style="width: 108%; background: white; height: 1px; margin-left: -20px; margin-top:10px">
            <div style="font-size: 15px; margin-bottom: 20px; margin-top: 10px; ">{{post.text}} </div>
            <img v-for="media in post.mediaList" width="40%" style="margin-top: 2px; margin-right: 5px; border: 1px solid white;" :src="media.url"/>
            <hr :style="{marginLeft: '-20px', marginTop:'10px'}" >

            <ion-icon name="chatboxes" class="icon pointer" style="margin-top: 20px;margin-left:20px" v-on:click="open"></ion-icon>
            <span style="margin-top: 25px;float:left">{{post.comments.length}}</span>
            <div style="display: none;float: left" class="contentComment">
                <textarea class="comments"  style="margin-top: 20px;float: left;margin-left:10px" v-model="textcomment" placeholder="Leave a comment"></textarea>
                <ion-icon name="archive" class="icon pointer"  style="margin-top: 20px;float:right;font-size: 30px" @click="addcomment(post.id)"></ion-icon>
                <div class="clear"></div>
                <div style="margin-top: 20px;">
                    <div v-for="comments in post.comments" :id="comments.id" >
                        <div class="before pointer" @click="toFriends(comments.user_id)" :style="{background: 'url(' + functions(comments) +')', backgroundSize:'cover'}"> </div>
                        <div class="onecomments" :class="{my_user: ids == comments.user_id? true:false}">
                            <div class="onecomment dialog">
                                <div style="margin-top: -10px;margin-left: -20px; padding-left: -10px"> <h5 style="display: inline-block">
                                    {{!comments.user.firstname ||comments.user.firstname== null ? 'NoName' : comments.user.firstname }} {{!comments.user.lastname ||comments.user.lastname== null ? '' :comments.user.lastname}}</h5><ion-icon style="float:right;color:gray; font-size: 20px;margin-top: -5px; margin-right: -15px" class="icon pointer"  name="close" @click="removecomment(comments.id)"></ion-icon>
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
    import Vue from 'vue'
    import VueRouter from 'vue-router'
    Vue.use(VueRouter)
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
                ids: localStorage.getItem('id'),
                animus: 'http://img0.liveinternet.ru/images/attach/c/3/76/560/76560786_Clothing086_copy.png'
            }
        },
        created: function () {
            const instance = axios.create({
                baseURL: 'http://restapi.fintegro.com',
                headers: {
                    bearer: validToken()
                }
            });

            instance.get('posts', {
                params :{
                    limit: '*',
                }
            })
                .then(response => {
                    this.$emit('postesmy',response.data.posts.length)
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
            functions:function(friend){
                return !friend.user.photo? this.animus :friend.user.photo
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
                        console.log(response)
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
            removepost:function(post){

                const instance = axios.create({
                    baseURL: 'http://restapi.fintegro.com',
                    headers: {
                        bearer: validToken()
                    }
                });
                instance.delete('posts/'+ post, {
                })
                    .then(response => {
                        console.log('this post been remove')
                        console.log(response)
                        this.success = true
                    })
                    .catch(response => {
                        debugger
                        console.log("this post don't was remove")
                        console.log(response)
                        this.errored = true;
                        event.preventDefault()
                    })

                document.getElementById(post).style.display = 'none'

            },
            post:function(){

                const instance = axios.create({
                    baseURL: 'http://restapi.fintegro.com',
                    headers: {
                        bearer: validToken()
                    }
                });

                instance.post('posts', {
                    text:this.postText,
                    media: this.postPhoto
                })
                    .then(response => {
                        console.log('create posts!!')
                        this.posts = response.data.posts
                        const instance = axios.create({
                            baseURL: 'http://restapi.fintegro.com',
                            headers: {
                                bearer: validToken()
                            }
                        });
                        instance.get('posts', {
                            params :{
                                limit: '*',
                            }
                        })
                            .then(response => {
                                console.log('respanse posts!!')
                                this.posts = response.data.posts

                                this.postText = ''
                                this.postPhoto = ''

                            })
                            .catch(response => {

                                console.log("no respanse posts")
                                console.log(response)
                                this.errored = true;
                                event.preventDefault()

                            })
                    })
                    .catch(response => {
                        this.error = response.response
                        console.log("no")
                        this.errored = true;
                        event.preventDefault()
                        window.location.reload()
                    })

                //footer
                let app = document.getElementById('app')
                let information = document.querySelector('.information')
                let  my_footer= document.getElementById('my_footer')
                if(app.scrollHeight  >  window.innerHeight){
                    my_footer.style.position = 'static'
                }
                else if(information.scrollHeight == undefined){
                    my_footer.style.position = 'static'

                }
                else if(window.innerHeight > 500 && window.innerHeight < 600){
                    my_footer.style.position = 'static'
                }
                else{
                    my_footer.style.position = 'absolute'
                }
            },
            uploadPhoto:function(e){
                console.log(validToken())
                this.image = e.target.files[0];
                let data = new FormData()
                data.append('UploadForm[imageFile]', this.image)
                axios({
                    url: 'http://restapi.fintegro.com/upload',
                    method: 'POST',
                    headers: {
                        bearer: validToken()
                    },
                    data:data,
                    crossDomain: true,
                    cache: false,
                    contentType: false,
                    processData: false,
                })
                    .then(response => {
                        this.postPhoto.push({url:response.data.link})
                        console.log(this.postPhoto)

                    })
                    .catch(error => {
                        console.log('error')
                        console.log(error.response)
                    })
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

                        instance.get('posts', {
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
                if(validToken()) {
                    if(localStorage.getItem('id_friend') != localStorage.getItem('id')){
                        event.preventDefault()
                        localStorage.setItem('id_friend',user)
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
        }

    }
</script>
