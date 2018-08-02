<template>
    <div id="profilFriends" @resize="handleResize($event)" v-on:scroll.passive="onScroll" class="profil profilFriends">
        <navbar ></navbar><br>
        <div class="contentProfil">
            <!--style="width: 100%; margin-bottom:20px" -->
            <div style="width: 900px;margin-left: auto;margin-right: auto;margin-top:40px; ">
                <div style=" margin-top: 10px;margin-left: 30px; " class="regFloatLeft">
                    <!--float: left;-->
                    <div class="profFixed">
                        <!--style="position: fixed" -->
                        <mainPhoto class="box_shadow" style="margin-left: 30px; margin-top: 0px;" :msg="photo" @writeMes="displays"></mainPhoto>
                        <div class="albumsProfil box_shadow" >
                            <span>Your albums</span> <a href="#">Show more</a>
                            <div class="cover pointer"></div>
                            <div class="cover pointer"></div>
                        </div>
                        <div class="clear"></div>
                    </div>
                </div>
                <div  class="information profInfa">
                    <!--style="float: left;  width: 543px;margin-top:10px;margin-left:250px;"-->
                    <div class="profil_my_data box_shadow" >
                        <div style=" ">{{firstName}} {{lastName}}</div>
                        <div style=" margin-top: 20px;">{{quotes}}</div>
                        <hr v-if="(!went||went == '' || went == ' ') &&(!lived||lived == ''||lived == ' ')&&(!from||from == ''||from == ' ')?false:true " style="background: lightblue;margin-top: 20px; "><br>
                        <div>{{went == '' || went == ' '? '':'Went:'+ went}}</div>
                        <div style=" margin-top: 20px;">{{lived == ''||lived == ' '? '':'Lived:'+lived}}</div>
                        <div style=" margin-top: 20px;">{{from == ''||from == ' '? '':'From:'+from}}</div>
                        <hr style="background: blue;margin-top: 20px; margin-left: -20px"><br>
                        <div class="span">
                            <span @click="friendes" class="pointer spanActive">Friends : {{friends}}</span>
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
                <textarea id="texterea_modal" class="texterea_modal text_modal" v-model="textereas" style="border: 1px solid lightgray;width: 435px; height: 50px" ></textarea><br>
            </div>
            <div class='footer_modal'>
                <input type="reset" @click="back" name="reset_modal" class="reset_modal button_add pointer" value="Back">
                <input type="button" @click="sandMassege" name="button_modal_submit" class="button_modal_submit button_add pointer" style="background: #3870b0; color: white; margin-left: 10px" value="Send your message">
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
    import VueRouter from 'vue-router'
    Vue.use(VueRouter)

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
                disp:'none',
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
                this.wall = value
            },
            back: function(){
                this.disp = 'none'
            },
            displays:function(value){
                this.disp = value
            },
            sandMassege:function(){
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
                    this.disp = 'none'
                    this.$router.push({ name: 'message'})
                })
                .catch(response => {
                    console.log("Friends friends error")
                    console.log(response)
                    this.errored = true;
                })
            },
            handleResize:function(e){
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
//profil

                    let target = document.querySelector('.albumsProfil');
                    if (window.innerHeight < 520) {
                        document.querySelector('.albumsProfil').style.opacity = "0";
                    } else {
                        document.querySelector('.albumsProfil').style.opacity = "1";
                    }
//navbar

                    let navbarMenu = document.getElementById('navMenu')
                    if (window.innerWidth > 700) {
                        navbarMenu.style.display = 'block'
                    } else {
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
            window.addEventListener('resize', this.handleResize)
            window.addEventListener('scroll', this.onScroll)

            //footer

            let app = document.getElementById('app')

            let  my_footer= document.getElementById('my_footer')
            if(app.scrollHeight  >  window.innerHeight){
                my_footer.style.position = 'static'
            }
            else if(document.querySelector('.information').scrollHeight == undefined){
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
            if(validToken()) {
                NProgress.start()
                axios({
                    method:'get',
                    url:'http://restapi.fintegro.com/profiles/' + this.$router.history.current.params.id,
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
                this.handleResize()
            }

        }
    }
</script>
<style>

</style>
