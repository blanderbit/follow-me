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
            <button type="text" class="submit-btn" style="background: rgb(0, 78, 150); margin-left: 0px; height: 35px;
        min-width: 100px;
        font-size: 10px;" @click="post">Post</button>
        </div>

         <div v-for="(post, index) in posts"style="margin-top: 20px; list-style: none;box-shadow: 0 3px 3px rgba(0,0,0,0.2);
        -moz-box-shadow: 0 3px 3px rgba(0,0,0,0.2);
        -webkit-box-shadow: 0 3px 3px rgba(0,0,0,0.2);" @click :id="post.id" class="profil_my_data" tag="div">
            <div :style="{background:'url('+post.user.photo+')',backgroundSize:'cover',marginRight: '20px'}" style="float:left;width: 50px; height: 50px; background-size: cover; background-position: center; border-radius: 10px">
            </div>
            <div style="float:right;font-size: 15px; color: blue;margin-left: 10px "><ion-icon style="color:gray; font-size: 20px" name="close" @click="removepost(post.id)"></ion-icon></div>
            <div style="float:right;font-size: 10px; color: lightgray; ">{{post.date}}<span style="margin-left:10px;color: black">{{post.id}}</span></div>
            <div style="float:left;font-size: 15px; color: blue;margin-left: 10px ">{{post.user.firstname}} {{post.user.lastname}}</div>

            <div class="clear"></div>
            <hr :style="{marginLeft: '-20px', marginTop:'10px'}" style="width: 108%; background: white; height: 1px">
            <div style="font-size: 15px; margin-bottom: 10px;">{{post.text}} </div>
            <img v-for="media in post.mediaList" width="40%" style="margin-top: 2px; margin-right: 5px; border: 1px solid white;" :src="media.url"/>
            <hr :style="{marginLeft: '-20px', marginTop:'10px'}" style="width: 108%; background: blue; height: 1px">

             <ion-icon name="chatboxes" class="ion" style="margin-top: 20px;margin-left:20px" v-on:click="open"></ion-icon>
             <span style="margin-top: 25px;float:left">{{post.comments.length}}</span>
             <div style="display: none;float: left">
                 <textarea class="comments"  style="margin-top: 20px;float: left;margin-left:10px" v-model="textcomment" placeholder="Leave a comment"></textarea>
                 <ion-icon name="archive"  style="margin-top: 20px;float:right;font-size: 30px" @click="addcomment(post.id)"></ion-icon>
                 <div class="clear"></div>
                 <div>
                     <div v-for="comments in post.comments" :id="comments.id" :class="{my_user: post.user_id = comments.user_id? true:false}">
                         <blockquote>
                             <div class="before" :style="{background: 'url('+comments.user.photo+')', backgroundSize:'cover'}"> </div>

                             <div>— <cite>{{comments.user.firstname}} {{comments.user.lastname}}</cite></div>
                             <ion-icon style="float:right;color:gray; font-size: 20px;margin-top: -20px" name="close" @click="removecomment(comments.id)"></ion-icon>
                             <p>{{comments.text}}</p>
                             <div class="clear"></div>
                         </blockquote>
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

    function render(){
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
            })
            .catch(response => {

                console.log("no respanse posts")
                console.log(response)
                this.errored = true;
                event.preventDefault()

            })
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
                textcomment:''
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
                console.log('respanse posts!!')
                console.log(response.data)
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
                console.log(post)
                console.log(this.textcomment)
                debugger
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
            })
            .catch(response => {

                console.log("you don't add commnets by posts")
                console.log(response)
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
    blockquote {
        margin-top:20px;
        margin-left: -40px;
        background: snow;
        border-top: 2px solid lightgray;
        border-bottom: 2px solid lightgray;
        color: #3A3C55;
        width: 200px;
        padding: 20px 10px 30px 60px;
        position: relative;
        font-family: 'Lato', sans-serif;
        font-weight: 300;
        border-bottom-right-radius: 40px;
        border-top-left-radius: 40px;
    }
    blockquote .before {

        font-family: serif;
        position: absolute;
        left: 10px;
        top: 10px;
        color: white;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        line-height: 1;
        text-align: center;
    }
    blockquote p {
        border: none;
        margin: 0 0 16px;

        font-size: 16px;
        letter-spacing: .05em;
        line-height: 1.4;
    }
    blockquote cite {
        margin-top: -10px;
        font-style: normal;
    }
    .my_user blockquote{
        border-top: 2px solid blue;
        border-bottom: 2px solid blue;
        margin-top: 20px;
        margin-left: 140px;
        margin-right: 0px;
    }
</style>