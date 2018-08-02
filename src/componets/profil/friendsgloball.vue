<template>
    <div id="friends" @wheel="scrol" @resize="handleFriendsResize($event)">
        <navbar v-on:id="user_id = $event"></navbar><br>
        <div style="width: 100%; margin-bottom:20px">
            <div style="background: url('https://png.icons8.com/metro/1600/globe.png') no-repeat ;width: 140px; height: 140px;margin-top:80px; margin-left: auto; margin-right: auto; background-size: 140px;"></div>
            <div style="margin-left: auto; margin-right: auto; width: 100px;">World friends</div>
            <div class="contentList" >
                <div style="float: left; margin-top: 10px;margin-left: 20px;width: 230px;">
                    <div><sitebar :style="{position:op , top: '70px'}"></sitebar></div>
                </div>
                <div class="setcontent information" style="float: left;  width: 590px;margin-top:10px; margin-left:20px; ">
                    <div class="profil_my_data box_shadow" >
                        <form action="" @input="search" class="searchFriend">
                            <input type="search" placeholder="Search your friends" v-model="searchtext" class="input" />
                            <input type="submit"  value="" class="submit" />
                        </form>
                        <a id="s7" @click="friendto">friends</a>
                        <a id="s7" @click="blacklists">Black list</a>
                    </div>
                    <div class="profil_my_data box_shadow" style="margin-top: 20px;">
                        <div class="blok"  v-for="friend in friends">
                            <div  :style="{background: 'url(' + functions(friend) +')'}" @click="toFriends(friend.id)" class="cover pointer photoListFriends" ></div>
                            <div class="contentListFriends">
                                <span style="color: black;font-style: italic; font-size:15px; margin-top: 7px">{{friend.firstname}} {{friend.lastname}}</span>
                                <div style="color: gray;font-style: italic; font-size:12px;">{{!friend.lived ? '' : 'Lived ' + friend.lived}}</div>
                                <div style="color: gray;font-style: italic; font-size:12px;">{{!friend.from ? '' : 'from ' + friend.from}}</div>
                            </div>
                            <div class="listButton">
                                <!--<a href=""  class="adelta" style="display: none" v-show="rety(!friend.friend)" @click="addtofriends(friend.id)">add friend</a>-->
                                <!--<a href="" class="bdelta" v-show="rety(friend.friend)"  @click="addtofriends(friend.id)" >remove</a>-->
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
            },handleResize:function(e){
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

                let category = document.getElementById('category-wrap')
                if(window.innerWidth > 700 ){
                    category.style.display = 'block'
                }else{
                    category.style.display = 'none'
                    category.style.position = 'static'

                }
            }
        },
        updated:function(){
            window.addEventListener('resize', this.handleResize)
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
            if(document.getElementById('category-wrap') == null)return
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
                    window.scrollTo(0,0)
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
