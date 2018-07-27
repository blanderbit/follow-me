<template>
    <div id="friends" @wheel="scrol">
        <navbar style="position: fixed;margin-left: 0px; z-index: 1000; " v-on:id="user_id = $event"></navbar><br>
        <div style="width: 100%; margin-bottom:20px">
            <div style="background: url('https://png.icons8.com/metro/1600/globe.png') no-repeat ;width: 140px; height: 140px;margin-top:80px; margin-left: auto; margin-right: auto; background-size: 140px;"></div>
            <div style="margin-left: auto; margin-right: auto; width: 100px;">World friends</div>
            <div style="width: 900px;margin-left: auto;margin-right: auto;margin-top:40px; " >
                <div style="float: left; margin-top: 10px;margin-left: 20px;width: 230px;">
                    <div><sitebar :style="{position:op , top: '70px'}"></sitebar></div>
                </div>
                <div class="setcontent" style="float: left;  width: 590px;margin-top:10px; margin-left:20px; ">
                    <div class="profil_my_data" style="box-shadow: 0 3px 3px rgba(0,0,0,0.2);
	-moz-box-shadow: 0 3px 3px rgba(0,0,0,0.2);
	-webkit-box-shadow: 0 3px 3px rgba(0,0,0,0.2);">
                        <form action="" @input="search" class="searchFriend">
                            <input type="search" placeholder="Search your friends" v-model="searchtext" class="input" />
                            <input type="submit"  value="" class="submit" />
                        </form>
                        <a id="s7" @click="friendto">friends</a>
                        <a id="s7" @click="blacklists">Black list</a>
                    </div>
                    <div class="profil_my_data" style="margin-top: 20px;box-shadow: 0 3px 3px rgba(0,0,0,0.2);
	-moz-box-shadow: 0 3px 3px rgba(0,0,0,0.2);
	-webkit-box-shadow: 0 3px 3px rgba(0,0,0,0.2);">
                        <div class="blok" v-for="friend in friends">
                            <div  :style="{background: 'url(' + functions(friend) +')'}" @click="toFriends(friend.id)" class="cover" style="float:left ;border: 1px solid white; width: 70px;height: 70px;border-radius: 10px"></div>
                            <div style="float:left;border-left: 1px solid white; width: 300px;height: 50px; padding: 10px; line-height: 1.4">
                                <span style="color: black;font-style: italic; font-size:15px; margin-top: 7px">{{friend.firstname}} {{friend.lastname}}</span>
                                <div style="color: gray;font-style: italic; font-size:12px;">{{!friend.lived ? '' : 'Lived ' + friend.lived}}</div>
                                <div style="color: gray;font-style: italic; font-size:12px;">{{!friend.from ? '' : 'from ' + friend.from}}</div>
                            </div>
                            <div style="float:left;border-left: 1px solid dodgerblue; width: 120px;height: 70px">
                                <a href=""  class="adelta" style="display: none" v-show="rety(!friend.friend)" @click="addtofriends(friend.id)">add friend</a>
                                <a href="" class="bdelta" v-show="rety(friend.friend)"  @click="addtofriends(friend.id)" >remove</a>
                            </div>
                            <div class="clear"></div>
                        </div>
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
    import sitebar from './sitebar.vue'
    import navBar from './navBarAll.vue'
    import axios from 'axios'
    import Vue from 'vue'
    import NProgress from 'nprogress'
    //    import VueResource from 'vue-resource'
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
        props:['ids','msg'],
        data () {
            return {
                token: validToken(),
                friends: [],
                searchtext:'',
                animus: 'http://img0.liveinternet.ru/images/attach/c/3/76/560/76560786_Clothing086_copy.png',
                op:'static',
                elem: null
            }

        },
        methods: {
            search: function(){
                const instance = axios.create({
                    baseURL: 'http://restapi.fintegro.com',
                    headers: {
                        bearer: validToken()
                    }
                });
                instance.get('search', {
                   params:{search: this.searchtext,
                       limit: '*',
                   }
                })
                .then(response => {
                    console.log('search complate')
                    console.log(response)
                    this.friends = response.data.profiles

                })
                .catch(response => {
                    debugger
                    console.log("search error")
                    console.log(response)
                    this.errored = true;
                    event.preventDefault()
                })
            },
            functions:function(friend){
                return !friend.photo ? this.animus :friend.photo
            },
            friendto:function(){
                if(validToken()) {
                    event.preventDefault()
                    this.$router.push({ name: 'friends',})
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
            addtofriends:function(user){
                event.preventDefault()
                const instance = axios.create({
                    baseURL: 'http://restapi.fintegro.com',
                    headers: {
                        bearer: validToken()
                    },
                    data :{
                        user_id: user,
                        type: '1'

                    }
                });
                instance.post('social-activities', {
                })
                .then(response => {
                    console.log('add friend')
                })
                .catch(response => {
                    console.log("don't add friend")
                    console.log(response)
                    this.errored = true;
                    event.preventDefault()
                })
                let style = getComputedStyle(event.srcElement.nextElementSibling)
                if(style.display == 'none'){
                    event.srcElement.nextElementSibling.style.display = 'block'
                    event.srcElement.style.display = 'none'
                }else{
                    event.srcElement.nextElementSibling.style.display = 'none'
                    event.srcElement.style.display = 'block'
                }
            },
            removefriend:function(user){
                console.log(user)
                const instance = axios.create({
                    baseURL: 'http://restapi.fintegro.com',
                    headers: {
                        bearer: validToken()
                    }
                });
                instance.delete('social-activities/' + user, {
                })
                    .then(response => {
                        console.log('this friend removed')
                        console.log(response)

                        console.log(this.friendsmy)

                    })
                    .catch(response => {
                        debugger
                        console.log("this friend did't remove")
                        console.log(response)
                        this.errored = true;
                        event.preventDefault()
                    })
                document.getElementById(user).style.display = 'none'
            },
            rety:function(a){
                if(a === true){
                    return true
                }
                return false
            },
            scrol:function(){
                if (window.pageYOffset < this.elem) {
                    this.op = 'static'
                } else if (window.pageYOffset > this.elem) {
                    this.op = 'fixed'
                }
            },
            toFriends:function(user){
                if(validToken()) {
                    event.preventDefault()
                    localStorage.setItem('id_friend',user)
                    this.$router.push({ name: 'profil_friend',params:{id: localStorage.getItem('id_friend')}})
                }
                else{
                    event.preventDefault()
                    this.$router.push({name: 'login'})
                }
            }

        },
        updated:function(){
            if(this.elem == null)this.elem = document.getElementById('category-wrap').getBoundingClientRect().bottom + window.pageYOffset

        },
        components: {
            globFooter: GFooter,
            navbar: navBar,
            sitebar:sitebar
        },
        created:function(){
            if(validToken()) {
                NProgress.start()
                const instance = axios.create({
                    baseURL: 'http://restapi.fintegro.com',
                    headers: {
                        bearer: validToken()
                    }
                });
                instance.get('search', {
                    params: {
                        limit: '*',
                    }
                })
                .then(response => {
                    console.log('search complate')
                    console.log(response.data)
                    this.friends = response.data.profiles
                    NProgress.done()

                })
                .catch(response => {
                    debugger
                    console.log("search error")
                    console.log(response)
                    this.errored = true;
                    event.preventDefault()
                })
            }else{
                event.preventDefault()
                this.$router.push({name: 'login'})
            }

            let routs = this.$router
            setInterval(function() {
                if(validToken()) {

                }else{
                    routs.push({name: 'login'})
                }
            },6000)
        }
    }

</script>
<style>
    .cover{
        background-size:cover!important
    }
    #friends{
        background: #f5f5f5;
    }
    .searchFriend {
        width: 100%;
        position: relative;
    }

    .searchFriend input {
        border: none;
    }

    /* стили для поля ввода */
    .searchFriend .input {
        width: 100%;
        height: 20%;
        padding: 8px 37px 9px 15px;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        box-shadow: inset 0 0 5px rgba(0,0,0,0.1), inset 0 1px 2px rgba(0,0,0,0.3);
        border-radius: 20px;
        background: #EEE;
        font: 13px Tahoma, Arial, sans-serif;
        color: #555;
        outline: none;
    }


    .searchFriend .input:focus {
        box-shadow: inset 0 0 5px rgba(0,0,0,0.2), inset 0 1px 2px rgba(0,0,0,0.4);
        background: #E8E8E8;
        color: #333;
    }


    .searchFriend .submit {
        position: absolute;
        top: 5px;
        border-top-right-radius: 15px;
        border-bottom-right-radius: 15px;
        right: 0;
        width: 37px;
        height: 100%;
        cursor: pointer;
        background: url(https://lh4.googleusercontent.com/-b-5aBxcxarY/UAfFW9lVyjI/AAAAAAAABUg/gQtEXuPuIds/s13/go.png) 50% no-repeat;
        opacity: 0.5;
    }
    .searchFriend .submit:hover {
        /*opacity: 0.8;*/
    }
    input[type="search"] {
        -webkit-appearance: none;
    }
    .profil_my_data{
        padding: 20px;
        background: white;
    }
    .profil_my_data .span span{
        background: rgba(0, 153, 255, 0.3);
        padding: 20px;
    }

    .blok {
        position:relative;
        width:94%;
        padding:1em;

        background:#fff;
        -webkit-box-shadow:0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1) inset;
        -moz-box-shadow:0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1) inset;
        box-shadow:0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1) inset;
        /*-webkit-box-shadow: 0 15px 10px -10px rgba(0, 0, 0, 0.5), 0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1) inset;*/
        /*-moz-box-shadow: 0 15px 10px -10px rgba(0, 0, 0, 0.5), 0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1) inset;*/
        /*box-shadow: 0 15px 10px -10px rgba(0, 0, 0, 0.5), 0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1) inset;*/
    }

    .blok:before,
    .blok:after {
        content:"";
        position:absolute;
        z-index:-2;
    }

    .blok p {
        font-size:16px;
        font-weight:bold;
    }
    .adelta {
        text-decoration: none;
        outline: none;
        display: inline-block;
        width: 100px;
        height: 45px;
        line-height: 45px;
        border-radius: 45px;
        margin: 10px 20px;
        font-family: 'Montserrat', sans-serif;
        font-size: 11px;
        text-transform: uppercase;
        text-align: center;
        letter-spacing: 1px;
        font-weight: 600;
        color: white;
        background: dodgerblue;
        box-shadow: 0 8px 15px rgba(0,0,0,.1);
        transition: .3s;
    }

    .adelta:hover {background: #2EE59D;
        box-shadow: 0 15px 20px rgba(46,229,157,.4);
        color: black;
        transform: translateY(-7px);
    }
    .bdelta {
        text-decoration: none;
        outline: none;
        display: inline-block;
        width: 100px;
        height: 45px;
        line-height: 45px;
        border-radius: 45px;
        margin: 10px 20px;
        font-family: 'Montserrat', sans-serif;
        font-size: 11px;
        text-transform: uppercase;
        text-align: center;
        letter-spacing: 1px;
        font-weight: 600;
        color: white;
        background: crimson;
        box-shadow: 0 8px 15px rgba(0,0,0,.1);
        transition: .3s;
    }

    .bdelta:hover {background: #2EE59D;
        box-shadow: 0 15px 20px rgba(46,229,157,.4);
        color: black;
        transform: translateY(-7px);
    }
</style>