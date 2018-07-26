<template>
    <div id="profil">
        <navbar style="position: fixed; z-index: 1000; " ></navbar><br>
        <div style="width: 100%; margin-bottom:20px">
            <div style="width: 900px;margin-left: auto;margin-right: auto;margin-top:40px; ">
                <div style="float: left; margin-top: 10px;margin-left: 30px; ">
                    <mainPhoto style="margin-left: 30px; margin-top: 0px;box-shadow: 0 3px 3px rgba(0,0,0,0.2);
	-moz-box-shadow: 0 3px 3px rgba(0,0,0,0.2);
	-webkit-box-shadow: 0 3px 3px rgba(0,0,0,0.2);" :msg="photo" ></mainPhoto>
                    <div class="albums" style="box-shadow: 0 3px 3px rgba(0,0,0,0.2);
	-moz-box-shadow: 0 3px 3px rgba(0,0,0,0.2);
	-webkit-box-shadow: 0 3px 3px rgba(0,0,0,0.2);">
                        <span>Your albums</span> <a href="#">Show more</a>
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
                        <div>{{'Went:'+ went}}</div>
                        <div style=" margin-top: 20px;">{{'Lived:'+lived}}</div>
                        <div style=" margin-top: 20px;">{{'From:'+from}}</div>
                        <hr style="background: blue;margin-top: 20px; "><br>
                        <div class="span">
                            <span @click="friendes" class="cover">Friends : {{friends}}</span>
                            <span>Albums:</span>
                            <span>Wall:{{ wall }}</span>
                        </div>
                    </div>
                    <showpost @postes="changes" @postesonce="changes"></showpost>
                </div>
            </div>
            <div class="clear"></div>
        </div>
        <div class="modals" :style="{display: disp}" title="Message" hidden>
            <div class="head_moduls">Write message</div>
            <div class="content_moduls">
                <label for="texterea_modal">Your text</label><br>
                <textarea id="texterea_modal" v-model="textereas" style="border: 1px solid lightgray;width: 435px; height: 50px" ></textarea><br>
            </div>
            <div class='footer_modal'>
                <input type="reset" @click="back" name="reset_modal" class="reset_modal button_add" value="Back">
                <input type="button" @click="sandMassege" name="button_modal_submit" class="button_modal_submit button_add" style="background: #3870b0; color: white; margin-left: 10px" value="Send your message">
            </div>
        </div>
        <globFooter></globFooter>

    </div>
</template>

<script>

    import GFooter from '../GloballFooter.vue'
    import navBar from './navbarProfil.vue'
    import profPhoto from './prof-photo1.vue'
    import axios from 'axios'
    import settings from './settings.vue'
    import showPost from './showPostFriends.vue'
    import Vue from 'vue'
    import NProgress from 'nprogress'
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
                wall:'',
                disp:'block',
                textereas: ''
            }

        },

        components:{
            globFooter:GFooter,
            navbar:navBar,
            mainPhoto: profPhoto,
            settings:settings,
            showpost:showPost,

        },
        methods:{
            friendes:function(){
                this.$router.push({ name: 'profil_friend_friends',params:{id: localStorage.getItem('id_friend')}})
            },
            changes:function(value){
                console.log(value)
                this.wall = value
            },
            back: function(){
                this.disp = 'none'
            },
            sandMassege:function(){console.log(this.textereas),
                console.log(this.$route.params.id)
                const instance = axios.create({
                    baseURL: 'http://restapi.fintegro.com',
                    headers: {
                        bearer: validToken()
                    }
                });
                instance.post('chats', {
                    user_id: this.$route.params.id,
                    message: this.textereas
                })
                    .then(response => {
                        console.log('create Chat')
                        console.log(response)
                        debugger
                        this.disp = 'none'
                        this.$router.push({ name: 'message'})
                    })
                    .catch(response => {
                        debugger
                        console.log("Friends friends error")
                        console.log(response)
                        this.errored = true;
                    })
            }
        },
        created:function(){
            if(validToken()) {
                NProgress.start()
            axios({
                method:'get',
                url:'http://restapi.fintegro.com/profiles/' + localStorage.getItem('id_friend'),
                dataType: 'json',
                headers: {
                    bearer: validToken()
                },
            })
                .then(response => {
                    this.ids = response.data.profile.user_id;
                    this.firstName =response.data.profile.firstname;
                    this.lastName =response.data.profile.lastname;
                    this.friends = response.data.friends_count;
                    this.enemies = response.data.enemies_count;
                    this.quotes =response.data.profile.quote;
                    this.from =response.data.profile.from;
                    this.lived =response.data.profile.lived;
                    this.went =response.data.profile.went;
                    this.photo =response.data.profile.photo;
                    event.preventDefault()
                    NProgress.done()
                })
                .catch(error => {
                    console.log("no")
                    console.log(error)
                    this.errored = true;
                    event.preventDefault()
                    document.cookie = 'token=';
                    localStorage.removeItem('id')
                    this.$router.push({ name: 'login' })
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
                localStorage.setItem('id_friend',this.$route.params.id)
                axios({
                    method:'get',
                    url:'http://restapi.fintegro.com/profiles/' + localStorage.getItem('id_friend'),
                    dataType: 'json',
                    headers: {
                        bearer: validToken()
                    },
                })
                .then(response => {
                    this.ids = response.data.profile.user_id;
                    this.firstName =response.data.profile.firstname;
                    this.lastName =response.data.profile.lastname;
                    this.friends = response.data.friends_count;
                    this.enemies = response.data.enemies_count;
                    this.quotes =response.data.profile.quote;
                    this.from =response.data.profile.from;
                    this.lived =response.data.profile.lived;
                    this.went =response.data.profile.went;
                    this.photo =response.data.profile.photo;
                    window.scrollTo(0,0)
                    event.preventDefault()
                })
                .catch(error => {
                    console.log("no")
                    console.log(error)
                    this.errored = true;
                    event.preventDefault()
                    document.cookie = 'token=';
                    localStorage.removeItem('id')
                    this.$router.push({ name: 'login' })
                })
            }
        }
    }
</script>
<style>
    #profil{
        background: #f5f5f5;
    }
    .cover:hover{
        cursor: pointer;
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
    .albums{
        width: 190px;
        background: white;
        height: 120px;
        padding: 20px;
        font-size: 12px;
    }
    .albums a{
        text-decoration: none;
        color: blue;
    }
    .albums a:hover{
        color: lightblue;
    }
    .albums  div{
        background: url('http://s1.iconbird.com/ico/0912/LipseIcons/w128h1281346946785gallery.png');
        margin-top: 10px;
        width: 90px;
        height: 90px;

        display: inline-block;
        background-position: center;
        background-size: cover;

        filter: grayscale(.75)
    }
    .albums  div:hover{
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

    .head_moduls{
        width: 100%;
        padding: 20px;
        background: #3674ba;
        box-sizing: border-box;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        color: white;
    }
    .modals,
    .modals_photo{
        top: 20%;
        left: 37%;
        right: 30%;
        width: 500px;
        background: white;
        box-shadow: 1px 1px 4px black;
        position: absolute;
        z-index: 1005;
        border-radius: 10px
    }
    .content_moduls{
        width: 98.9%;
        padding: 20px;
    }
    .content_moduls input{
        width: 93%
    }
    #text_modal:focus{
        outline: none;
    }
    .footer_modal{
        border-top: 1px solid #092a4f;
        padding: 20px;
    }
    .footer_modal .reset_modal{
        margin-left:  51%;
    }
    .footer_modal input{
        padding: 10px 15px;
    }
    .plus_photo{
        width: 200px;
        height: 220px;
        border: 1px solid red;
        border-radius: 20px;
        display: inline-block;
        margin-right: 20px;
        position: relative;
        margin-top: 20px;
    }
</style>