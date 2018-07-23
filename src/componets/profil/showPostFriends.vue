<template>
    <div>
        <div class="profil_my_data" style="margin-top: 20px;box-shadow: 0 3px 3px rgba(0,0,0,0.2);
	-moz-box-shadow: 0 3px 3px rgba(0,0,0,0.2);
	-webkit-box-shadow: 0 3px 3px rgba(0,0,0,0.2);">
            <div style="float: left">
                <textarea width="400px" rows="2" placeholder="What new?" v-model="postText"></textarea>
                <span class="bar"></span>
            </div>
            <form id="uploadForm" class="uploadPhoto" style="float: right; margin-top: 20px;">
                <label>
                    <input type="file" name="UploadForm[imageFile]"  id="file" @change="uploadPhoto">
                    <span><ion-icon name="camera" style="color:dodgerblue"></ion-icon></span>
                </label>
            </form>
            <span style="color:red">{{error}}</span>
            <div class="clear"></div>
            <img v-for="photo in postPhoto" :src="photo.url" style="width: 50%">
            <button type="text" class="submit-btn cover" style="background: rgb(0, 78, 150); margin-left: 0px; height: 35px;
        min-width: 100px;
        font-size: 10px;" @click="post">Post</button>
        </div>

         <div v-for="(post, index) in posts" style="margin-top: 20px; list-style: none;box-shadow: 0 3px 3px rgba(0,0,0,0.2);
        -moz-box-shadow: 0 3px 3px rgba(0,0,0,0.2);
        -webkit-box-shadow: 0 3px 3px rgba(0,0,0,0.2);" :id="post.id" class="profil_my_data" tag="div">
            <div :style="{background:'url('+post.user.photo+')',backgroundSize:'cover',marginRight: '20px'}" style="float:left;width: 50px; height: 50px; background-size: cover; background-position: center; border-radius: 10px">
            </div>
            <div style="float:right;font-size: 15px; color: blue;margin-left: 10px "></div>
            <div style="float:right;font-size: 10px; color: lightgray; ">{{post.date}}<span style="margin-left:10px;color: black">{{post.id}}</span></div>
            <div style="float:left;font-size: 15px; color: blue;margin-left: 10px ">{{post.user.firstname}} {{post.user.lastname}}</div>

            <div class="clear"></div>
            <hr :style="{marginLeft: '-20px', marginTop:'10px'}" style="width: 108%; background: white; height: 1px">
            <div style="font-size: 15px; margin-bottom: 10px;">{{post.text}} </div>
            <img v-for="media in post.mediaList" width="40%" style="margin-top: 2px; margin-right: 5px; border: 1px solid white;" :src="media.url"/>
            <hr :style="{marginLeft: '-20px', marginTop:'10px'}" style="width: 108%; background: blue; height: 1px">

             <ion-icon name="chatboxes" class="ion cover" style="margin-top: 20px;margin-left:20px" v-on:click="open"></ion-icon>
             <span style="margin-top: 25px;float:left">{{post.comments.length}}</span>
             <div style="display: none;float: left">
                 <textarea class="comments"  style="margin-top: 20px;float: left;margin-left:10px" v-model="textcomment" placeholder="Leave a comment"></textarea>
                 <ion-icon name="archive" class="cover"  style="margin-top: 20px;float:right;font-size: 30px" @click="addcomment(post.id)"></ion-icon>
                 <div class="clear"></div>
                 <div style="margin-top: 20px;">
                     <div v-for="comments in post.comments" :id="comments.id">
                         <div class="before cover" @click="toFriends(comments.user_id)" :style="{background: 'url(' + functions(comments) +')', backgroundSize:'cover'}"> </div>
                         <div class="onecomments" :class="{my_user: ids == comments.user_id? true:false}">
                             <div class="onecomment dialog">
                                 <div style="margin-top: -10px;margin-left: -20px; padding-left: -10px"> <h5 style="display: inline-block">
                                     {{!comments.user.firstname ||comments.user.firstname== null ? 'NoName' : comments.user.firstname }} {{!comments.user.lastname ||comments.user.lastname== null ? '' :comments.user.lastname}}</h5><ion-icon style="float:right;color:gray; font-size: 20px;margin-top: -5px; margin-right: -15px" name="close" @click="removecomment(comments.id)"></ion-icon>
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

            instance.get('posts/'+ localStorage.getItem('id_friend'), {
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
            },functions:function(friend){
                return !friend.user.photo? this.animus :friend.user.photo
            },
            post:function(){
                const instance = axios.create({
                    baseURL: 'http://restapi.fintegro.com',
                    headers: {
                        bearer: validToken()
                    }
                });

                instance.post('posts/' + localStorage.getItem('id_friend'), {
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
                console.log(response)
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
                        console.log(response.data)
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
//                    localStorage.setItem('posts', response.data.posts.length)
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
<style>
    .profil_my_data ion-icon{
    float:left; color: gray;
        font-size: 30px;
        margin-left: 0px;
}
    .profil_my_data ion-icon:hover{
    color: blue

}
    .comments{
        overflow: auto;

        /* = Убираем увеличение */
        resize: none;
        width: 350px;
        height:20px;

        /* = Добавим фон, рамку, отступ*/
        background: #f6f6f6;
        border: 1px solid #cecece;
        border-radius: 8px 0 0 0;
        padding: 8px 0 8px 10px;
    }
    .uploadPhoto {
        position: relative; /* Даем возможность делать позиционирование, внутри данного элемента */
        /* Все что выходит за пределы - скрываем */
        border-radius: 3px;
        padding: 10px;
        color: #fff;
        text-align: center;
        float: right;
        margin-top: -61px;
        margin-right: 80px;
    }

    .uploadPhoto input[type="file"]{
        display: none; /* Обязательно скрываем настоящий Input File */
    }
    .uploadPhoto label {
        /* Растягиваем label на всю возможную площадь блока .file-upload */
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        cursor: pointer;
    }
    .uploadPhoto span {
        line-height: 36px; /* Делаем вертикальное выравнивание текста, который написан на кнопке */
    }
    .before {
        font-family: serif;
        position: relative;
        float: left;
        left: -60px;
        top: 5px;
        color: white;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        line-height: 1;
        text-align: center;
    }
    .onecomments {
        width: 365px;
    }

    .onecomment {
        width: 100%;
        margin-bottom: 20px;
    }

    .onecomment p {
        width: 340px;
        height: auto;
        margin-top: 10px ;
        border: none;
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
    }.my_user .dialog {
         background: lightblue;
     }
    .my_user .dialog::after {
        content: '';
        color: lightgray;
        display: block;
        position: absolute;
        width: 0;
        height: 0;
        border-top: 8px solid transparent;
        border-bottom: 8px solid transparent;
        border-right: 15px solid lightblue;
        left: -15px;
        top: 15px;
    }
    .cover:hover{
        cursor: pointer;
    }
</style>