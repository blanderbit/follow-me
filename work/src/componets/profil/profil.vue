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
        background: url('http://s1.iconbird.com/ico/0912/LipseIcons/w128h1281346946785gallery.png');
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