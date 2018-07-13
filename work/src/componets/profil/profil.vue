<template>
    <div id="profil">
        <navbar style="position: fixed; z-index: 1000; " ></navbar><br>
        <div style="width: 100%; margin-bottom:20px">
            <div style="width: 900px;margin-left: auto;margin-right: auto;margin-top:40px; ">
                <div style="float: left; margin-top: 10px;margin-left: 30px; ">
                    <mainPhoto style="margin-left: 30px; margin-top: 0px;box-shadow: 0 3px 3px rgba(0,0,0,0.2);
	-moz-box-shadow: 0 3px 3px rgba(0,0,0,0.2);
	-webkit-box-shadow: 0 3px 3px rgba(0,0,0,0.2);" :msg="photo" ></mainPhoto>
                    <div class="albumsbar" style="box-shadow: 0 3px 3px rgba(0,0,0,0.2);
	-moz-box-shadow: 0 3px 3px rgba(0,0,0,0.2);
	-webkit-box-shadow: 0 3px 3px rgba(0,0,0,0.2);">
                        <span>Your albums</span> <a href="#" @click="toAlbums">Show more</a>
                        <div></div>
                        <div></div>

                    </div>
                </div>
                <div style="float: left;  width: 543px;margin-top:10px; margin-left:20px;">
                    <div class="profil_my_data" style="box-shadow: 0 3px 3px rgba(0,0,0,0.2);
	-moz-box-shadow: 0 3px 3px rgba(0,0,0,0.2);
	-webkit-box-shadow: 0 3px 3px rgba(0,0,0,0.2);">
                        <div style=" ">{{firstName}} {{lastName}}</div>
                        <div style=" margin-top: 20px;">{{quotes}}</div>
                        <hr style="background: lightblue;margin-top: 20px; "><br>
                        <input type="button"  value="Редактировать" class="set_button" @click="settings">
                        <div>{{'Went:'+ went}}</div>
                        <div style=" margin-top: 20px;">{{'Lived:'+lived}}</div>
                        <div style=" margin-top: 20px;">{{'From:'+from}}</div>
                        <hr style="background: blue;margin-top: 20px; "><br>
                        <div class="span">
                            <span>Friends : {{friends}}</span>
                            <span>Enemies : {{enemies}}</span>
                            <span>Albums:</span>
                            <span>Posts:{{posts.length}}</span>
                        </div>
                    </div>
                    <div class="profil_my_data" style="margin-top: 20px;box-shadow: 0 3px 3px rgba(0,0,0,0.2);
	-moz-box-shadow: 0 3px 3px rgba(0,0,0,0.2);
	-webkit-box-shadow: 0 3px 3px rgba(0,0,0,0.2);">
                        <div style="float: left">
                            <textarea cols="41" rows="2" placeholder="What new?" v-model="postText"></textarea>
                            <span class="bar"></span>
                        </div>
                        <form id="uploadForm" class="uploadPhoto" style="float: right; margin-top: 20px;width: 15px; height: 15px; background: dodgerblue;">
                            <label>
                                <input type="file" name="UploadForm[imageFile]"  id="file" @change="uploadPhoto">
                                <span><ion-icon name="photos"></ion-icon></span>
                            </label>
                        </form>
                        <div class="clear"></div>
                        <img v-for="photo in postPhoto" :src="photo" style="width: 50%">
                        <button type="text" class="submit-btn" style="background: rgb(0, 78, 150); margin-left: 0px; height: 35px;
        min-width: 100px;
        font-size: 10px;" @click="post">Post</button>
                    </div>

                    <div v-for="post in posts"style="margin-top: 20px; list-style: none;box-shadow: 0 3px 3px rgba(0,0,0,0.2);
	-moz-box-shadow: 0 3px 3px rgba(0,0,0,0.2);
	-webkit-box-shadow: 0 3px 3px rgba(0,0,0,0.2);" class="profil_my_data" tag="div">
                        <div :style="{background:'url('+post.user.photo+')',backgroundSize:'cover',marginRight: '20px'}" style="float:left;width: 50px; height: 50px; background-size: cover; background-position: center; border-radius: 10px">
                        </div>
                        <div style="float:right;font-size: 15px; color: blue;margin-left: 10px "><ion-icon style="color:gray; font-size: 20px" name="close"></ion-icon></div>
                        <div style="float:right;font-size: 10px; color: lightgray; ">{{post.date}}</div>
                        <div style="float:left;font-size: 15px; color: blue;margin-left: 10px ">{{post.user.firstname}} {{post.user.lastname}}</div>

                        <div class="clear"></div>
                        <hr :style="{marginLeft: '-20px', marginTop:'10px'}" style="width: 108%; background: white; height: 1px">
                        <div style="font-size: 15px; margin-bottom: 10px;">{{post.text}}</div>
                        <img v-for="media in post.mediaList" :src="media"/>
                        <hr :style="{marginLeft: '-20px', marginTop:'10px'}" style="width: 108%; background: blue; height: 1px">
                    </div>

                </div>
            </div>
            <div class="clear"></div>
        </div>
        <globFooter></globFooter>

    </div>
</template>

<script>

   import GFooter from '../GloballFooter.vue'
   import navBar from './navbarProfil.vue'
   import profPhoto from './prof-photo.vue'
   import axios from 'axios'
   import settings from './settings.vue'
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


    export default {
        name: 'profil',

        data () {
            return {
                token: validToken(),
                firstName: 'Your name',
                lastName: 'Your Surname',
                friends:'0',
                enemies:'0',
                quotes: '',
                from: '',
                lived:'',
                went:'',
                photo:'',
                ids:'',
                postPhoto:[],
                postText:null,
                posts:[],
            }

        },

        components:{
            globFooter:GFooter,
            navbar:navBar,
            mainPhoto: profPhoto,
            settings:settings

        },
        methods:{
            settings:function(){                
                console.log(this.$route.params.id)
                this.$router.push({ name: 'settings',params:{id: localStorage.getItem('id')}})                
            },
            toAlbums:function(){
                this.$router.push({ name: 'albums',params: {id:localStorage.getItem('id')}})
            },
            post:function(){                
                console.log(this.postText)
                console.log(this.postPhoto)
                
                axios({
                    url: 'http://restapi.fintegro.com/posts',
                    method: 'POST',
                    headers: {
                        bearer: validToken()
                    },
                    data:{

                        text: this.postText
                    },
                })
                    .then(response => {                        
                        console.log(response)                        
                        window.location.reload()
                    })
                    .catch(error => {                        
                        console.log(error)
                        console.log(error.response)                        

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
                        
                        console.log(response)
                        console.log(response.data.link)
                        this.postPhoto.push(response.data.link)
                        console.log(this.postPhoto)
                        

                    })
                    .catch(error => {
                        
                        console.log('error')
                        console.log(error.response)
                        

                    })
            }
        },
        created:function(){
            console.log(validToken())
            
                axios({
                    method:'get',
                    url:'http://restapi.fintegro.com/profiles',
                    dataType: 'json',
                    headers: {
                        bearer: validToken()
                    },
                })
            .then(response => {
                
                this.ids = response.data.profile.user_id
                this.firstName =response.data.profile.firstname
                localStorage.setItem('firstName',response.data.profile.firstname)
                this.lastName =response.data.profile.lastname
                localStorage.setItem('lastName',response.data.profile.lastname)
                this.friends = response.data.friends_count
                this.enemies = response.data.enemies_count
                this.quotes =response.data.profile.quote
                localStorage.setItem('quotes',response.data.profile.quote)
                this.from =response.data.profile.from
                localStorage.setItem('from',response.data.profile.from)
                this.lived =response.data.profile.lived
                localStorage.setItem('lived',response.data.profile.lived)
                this.went =response.data.profile.went
                localStorage.setItem('went',response.data.profile.went)
                this.photo =response.data.profile.photo
                localStorage.setItem('photo',response.data.profile.photo)
                
                console.log(validToken())
                axios({
                    method:'get',
                    url:'http://restapi.fintegro.com/posts',
                    dataType: 'json',
                    headers: {
                        bearer: validToken()
                    },
                    data:{

                    }
                })
                    .then(response => {
                        
                        console.log(response.data.posts)
                        this.posts = response.data.posts
                        
                    })
                    .catch(error => {
                        
                        console.log("no")
                        console.log(error)
                        this.errored = true;
                        event.preventDefault()
                        
                    })
                event.preventDefault()
            })
            .catch(error => {
                
                console.log(validToken())
                console.log("no")
                console.log(error)
                this.errored = true;
                event.preventDefault()
                
            })


        }
    }
</script>
<style>
    body{
        background:  url('https://html5book.ru/wp-content/uploads/2015/10/background54.png')

    }
    #profil{
        background: #f5f5f5;
    }
    .clear{
        clear: both;
    }
    .profil_my_data{
        padding: 20px;
        background: white;
    }
    .profil_my_data .span span{
        background: rgba(0, 153, 255, 0.3);
        padding: 20px;
    }
    .span{
        margin-top: 20px;
        margin-bottom: 20px;
    }
.set_button{
    display: block;

    padding: 10px 5px 10px 0;


    background: none;
    border: none;
    cursor: pointer;

    font-family: 'Bree Serif', serif;
    font-weight: 300;
    font-size: 14px;
    color: #414848;
    text-shadow: 0px 1px 0 rgba(256,256,256,0.5);
    margin-left: auto;
    margin-right: auto;
}
    .set_button:hover{
        color: black;
    }
    .albumsbar{
        width: 190px;
        background: white;
        height: 120px;
        padding: 20px;
        font-size: 12px;
    }
    .albumsbar a{
        text-decoration: none;
        color: blue;
    }
    .albumsbar a:hover{
        color: lightblue;
    }
    .albumsbar  div{
        background: url('data:image/jpeg;base64,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');
        margin-top: 10px;
        width: 90px;
        height: 90px;

        display: inline-block;
        background-position: center;
        background-size: cover;

        filter: grayscale(.75)
    }
    .albumsbar  div:hover{
        filter:none ;
    }
    .setcontent label {
        color: #999;
        font-size: 18px;
        position: absolute;
        pointer-events: none;
        left: 10px;
        top: 15px;
        transition: 0.2s ease all;
        -moz-transition: 0.2s ease all;
        -webkit-transition: 0.2s ease all;
    }

    /* active state */
    .setcontent .group input:focus ~ label{
        top: -15px;
        font-size: 14px;
        color: #5264AE;
    }



    .setcontent .bar {
        position: relative;
        display: block;
        width: 280px;
    }
    .setcontent  .bar:before,.setcontent .bar:after {
        content: "";
        height: 2px;
        width: 0;
        bottom: 0;
        position: absolute;
        background: #5264AE;
        transition: 0.2s ease all;
        -moz-transition: 0.2s ease all;
        -webkit-transition: 0.2s ease all;
    }
    .setcontent .bar:before {
        left: 50%;
    }
    .setcontent .bar:after {
        right: 50%;
    }

    /* active state */
    .setcontent .group input:focus ~ .bar:before,
    .setcontent .group input:focus ~ .bar:after,
    textarea:focus ~ .bar:before,
    textarea:focus ~ .bar:after
    {
        width: 50%;
    }
    .setcontent  .group {
        position: relative;
        margin-bottom: 30px;
    }

    .setcontent .group input
    {
        font-size: 16px;
        padding: 10px;
        display: block;
        width: 260px;

        border: none;
        border-bottom: 1px solid #ccc;

    }
    textarea{
        font-size: 16px;
        padding: 11px;
        display: block;
        width: 262px;
        border: none;
        border-bottom: 1px solid #ccc;

    }
    .setcontent input:focus,
    textarea:focus{
        outline: none;
    }


    .uploadPhoto {
        position: relative; /* Даем возможность делать позиционирование, внутри данного элемента */
        overflow: hidden; /* Все что выходит за пределы - скрываем */
        border-radius: 3px;
        padding: 10px;
        color: #fff;
        text-align: center;
        float: right;
        margin-top: -41px;
        margin-right: 40px;
    }
    .uploadPhoto:hover {
        background: #137dbf;
    }
    .uploadPhoto ion-icon:hover{
        color: white;

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
    .submit-btn {
        display: inline-block;
        position: relative;
        overflow: hidden;

        border: none;
        border-radius: 35px;
        padding-right: 30px;
        background: #ff5c5a;
        color: white;

        margin-top: 20px;
        margin-left: -100px;
        margin-right: auto;
    }
    .submit-btn:focus{
        outline: none;
    }
    .submit-btn:last-of-type {margin-right: 0;}
    .submit-btn:after {
        position: absolute;
        right: 10px;
        top: 0;
        width: 45px;
        height: 45px;
        line-height: 45px;
        content: "\f1d8";
        font-family: FontAwesome;
        background: crimson;
        border-radius: 50%;
        color: white;
        font-size: 22px;
    }
    @keyframes float {
        0%, 100% {transform: translateY(0);}
        50% {transform: translateY(-8px);}
    }
    .submit-btn:hover:after {animation: float 2s linear infinite;}
</style>