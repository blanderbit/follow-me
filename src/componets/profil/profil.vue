<template>
    <div id="profil" @resize="handleResize($event)" v-on:scroll.passive="onScroll" class="profil">

        <navbar></navbar><br>
        <div class="contentProfil">
            <div style="width: 1000px;margin-left: auto;margin-right: auto;margin-top:-20px; ">
                <div style=" margin-top: 10px; margin-left: 30px;" class="regFloatLeft">
                    <div class="profFixed" >
                        <mainPhoto  style="margin-left: 30px; margin-top: 0px;" :msg="photo" ></mainPhoto>
                        <div class="albumsProfil box_shadow">
                            <span >Your albums</span> <a href="#" >Show more</a>
                            <div class="cover pointer"></div>
                            <div class="cover pointer"></div>
                        </div>
                        <div class="clear"></div>
                    </div>
                </div>
                <div class="information profInfa">
                    <div class="profil_my_data box_shadow" >
                        <div style=" ">{{firstName}} {{lastName}}</div>
                        <div style=" margin-top: 20px;">{{quotes}}</div>
                        <hr v-if="(!went||went == '' || went == ' ') &&(!lived||lived == ''||lived == ' ')&&(!from||from == ''||from == ' ')?false:true " style="background: lightblue;margin-top: 20px;margin-left: -20px "><br>
                        <input type="button"  value="Редактировать" class="set_button" @click="settings">
                        <div>{{went == '' || went == ' '? '':'Went:'+ went}}</div>
                        <div style=" margin-top: 20px;">{{lived == ''||lived == ' '? '':'Lived:'+lived}}</div>
                        <div style=" margin-top: 20px;">{{from == ''||from == ' '? '':'From:'+from}}</div>
                        <hr style="background: blue;margin-top: 20px;margin-left: -20px "><br>
                        <div class="span">
                            <span class="pointer spanActive" @click="friend">Friends : {{friends}}</span>
                            <span class="pointer spanActive" @click="blacklists">Black lists : {{enemies}}</span>
                            <span>Albums:</span>
                            <span>Wall:{{ wall }}</span>
                        </div>
                    </div>
                    <showpost @onepostesmy="changes" @postesmy="changes"></showpost>
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
    import showPost from './showPost.vue'
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
window.onscroll = function(){


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
                plus : null,
                elem: null
            }
        },
        components:{
            globFooter:GFooter,
            navbar:navBar,
            mainPhoto: profPhoto,
            settings:settings,
            showpost:showPost
        },
        methods:{
            settings:function(){
                console.log(this.$route.params.id)
                this.$router.push({ name: 'settings',params:{id: localStorage.getItem('id')}})
            },
            changes:function(value){
                this.wall = value
            },
            friend:function(){
                if(validToken()) {
                    event.preventDefault()
                    this.$router.push({ name: 'friends'})
                }
                else{
                    event.preventDefault()
                    this.$router.push({name: 'login'})
                }
            },
            blacklists:function(){
                if(validToken()) {
                    event.preventDefault()
                    this.$router.push({ name: 'blacklist',})
                }
                else{
                    event.preventDefault()
                    this.$router.push({name: 'login'})
                }
            },
            handleResize:function(e){
//footer
                console.log('AD')
                let app = document.getElementById('app')
                let  my_footer= document.getElementById('my_footer')
                let  information = document.querySelector('.information').scrollHeight
                if(app.scrollHeight  >  window.innerHeight){
                    my_footer.style.position = 'static'
                }
                else if(information == undefined){
                    my_footer.style.position = 'static'

                }
                else if(window.innerHeight > 500 && window.innerHeight < 600){
                    my_footer.style.position = 'static'
                }
                else{
                    my_footer.style.position = 'absolute'
                }
//profil

                let target = document.querySelector('.albumsProfil');
                if(target == 'null'){

                }else{

                    if(window.innerHeight < 520 ){
                        target.style.opacity =  "0";
                    }else{
                        target.style.opacity =  "1";
                    }
                }

//navbar
                let navbarMenu = document.getElementById('navMenu')
                if(window.innerWidth > 700 ){
                    navbarMenu.style.display = 'block'
                }else{
                    navbarMenu.style.display = 'none'

                }
            },
            onScroll:function(){
                var profFixed = document.querySelector('.profFixed');
                var profFixedCoords = profFixed? profFixed.getBoundingClientRect().bottom: false;
                var information = document.querySelector('.information');
                var informationCoords = information? information.getBoundingClientRect().bottom: false;
                var target = document.querySelector('.albumsProfil');
                if (profFixedCoords && informationCoords) {
                    if(profFixedCoords > informationCoords){
                        target.style.opacity =  "0";
                    }else{
                        target.style.opacity =  "1";
                    }
                }
            }
        },

        updated: function(){
            document.querySelector('.profil').addEventListener('resize', this.handleResize)
            document.querySelector('.profil').addEventListener('scroll', this.onScroll)

            //footer

            let app = document.getElementById('app')
            let information = document.querySelector('.information').scrollHeight
            let  my_footer= document.getElementById('my_footer')
            if(app.scrollHeight  >  window.innerHeight){
                my_footer.style.position = 'static'
            }
            else if(information == undefined){
                my_footer.style.position = 'static'

            }
            else if(window.innerHeight > 500 && window.innerHeight < 600){
                my_footer.style.position = 'static'
            }
            else{
                my_footer.style.position = 'absolute'
            }
//            navbar
            let navbarMenu = document.getElementById('navMenu')
            if(window.innerWidth > 700 ){
                navbarMenu.style.display = 'block'
            }else{
                navbarMenu.style.display = 'none'

            }
            let target = document.querySelector('.albumsProfil');


        },
        mounted (){
            window.addEventListener('resize', this.handleResize)
        },
        created:function(){
            NProgress.start()
                if(validToken()) {
                    axios({
                        method: 'get',
                        url: 'http://restapi.fintegro.com/profiles',
                        dataType: 'json',
                        headers: {
                            bearer: validToken()
                        },
                    })
                    .then(response => {
                        this.ids = response.data.profile.user_id;
                        this.firstName = response.data.profile.firstname;
                        localStorage.setItem('firstName', response.data.profile.firstname)
                        this.lastName = response.data.profile.lastname;
                        localStorage.setItem('lastName', response.data.profile.lastname)
                        this.friends = response.data.friends_count;
                        this.enemies = response.data.enemies_count;
                        this.quotes = response.data.profile.quote;
                        localStorage.setItem('quotes', response.data.profile.quote)
                        this.from = response.data.profile.from;
                        localStorage.setItem('from', response.data.profile.from)
                        this.lived = response.data.profile.lived;
                        localStorage.setItem('lived', response.data.profile.lived)
                        this.went = response.data.profile.went;
                        localStorage.setItem('went', response.data.profile.went)
                        this.photo = response.data.profile.photo;
                        localStorage.setItem('photo', response.data.profile.photo)
                        event.preventDefault()
                        window.scrollTo(0,0)
                        NProgress.done()
                    })
                    .catch(error => {
                        console.log("no")
                        console.log(error)
                        this.errored = true;
                        event.preventDefault()
                        document.cookie = 'token=';
                        localStorage.removeItem('id')
                        this.$router.push({name: 'login'})

                    })
                }else{
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
        beforeDestroy:function(){
            console.log('asda')
            window.removeEventListener('resize', this.handleResize)
            window.removeEventListener('scroll', this.onScroll)
        }
    }
</script>
<style>
   #profil{
       height: 100%;
   }
</style>
