<template>
    <div id="friends" @wheel="scrol" @resize="handleFriendsResize($event)">
        <navbar v-on:id="user_id = $event"></navbar><br>
        <div style="width: 100%; margin-bottom:20px">
            <div style="background: url('https://cdn.icon-icons.com/icons2/934/PNG/512/cross-black-circular-button_icon-icons.com_73054.png') no-repeat ;width: 140px; height: 140px;margin-top:80px; margin-left: auto; margin-right: auto; background-size: 100px;"></div>
            <div style="margin-left: auto; margin-right: auto; width: 100px;">Black list</div>
            <div class="contentList" >
                <div style="float: left; margin-top: 10px;margin-left: 20px;width: 230px;">
                    <div><sitebar :style="{position:op , top: '70px'}"></sitebar></div>
                </div>
                <div class="setcontent information" style="float: left;  width: 590px;margin-top:10px; margin-left:20px; ">
                    <div class="profil_my_data box_shadow" >
                        <form action="" class="searchFriend">
                            <input type="search" v-model="searche" placeholder="Search your friends" class="input" />
                            <input type="submit"  value="" class="submit" />
                        </form>
                        <a id="s7" @click="global">Global search</a>
                        <a id="s7" @click="friendto">Friends</a>
                    </div>

                    <div class="profil_my_data box_shadow"  style="margin-top: 20px;">
                        <span v-if="enemysmy.length > 0? false: true" style="font-style: italic">You haven't enemy</span>
                        <div class="blok"  v-for="enemy in filterBy(enemysmy,searche)" :id="enemy.id">
                            <div  :style="{background: 'url(' + functions(enemy) +')'}" @click="toFriends(enemy.id)" class="cover pointer photoListFriends" ></div>
                            <div class="contentListFriends">
                                <span style="color: black;font-style: italic; font-size:15px; margin-top: 7px">{{enemy.firstname}} {{enemy.lastname}}</span>
                                <div style="color: gray;font-style: italic; font-size:12px;">{{!enemy.lived ? '' : 'Lived ' + enemy.lived}}</div>
                                <div style="color: gray;font-style: italic; font-size:12px;">{{!enemy.from ? '' : 'from ' + enemy.from}}</div>
                            </div>
                            <div class="listButton">
                                <!--<a href="#" class="ndelta" @click="removeenemy(enemy.id)">remove</a>-->
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
    import VueFilters from 'vue2-filters'
    import VueRouter from 'vue-router'
    import NProgress from 'nprogress'

    Vue.use(VueRouter)
    Vue.use(VueFilters)

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

        data () {
            return {
                token: validToken(),
                enemysmy:[],
                searche: '',
                animus: 'http://img0.liveinternet.ru/images/attach/c/3/76/560/76560786_Clothing086_copy.png',
                op: 'static',
                elem: null,
            }
        },
        methods: {
            global:function(){
                if(validToken()) {
                    event.preventDefault()
                    this.$router.push({name: 'friends_globall'})
                }
                else{
                    event.preventDefault()
                    this.$router.push({name: 'login'})
                }
            },
            functions:function(friend){
                return !friend.photo ? this.animus :friend.photo
            },
            scrol:function(){
                if (window.pageYOffset < this.elem) {
                    this.op = 'static'
                } else if (window.pageYOffset > this.elem) {
                    this.op = 'fixed'
                    console.log(document.getElementById('category-wrap'))
                }
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
            toFriends:function(user){
                console.log(user)
                if(validToken()) {
                    event.preventDefault()
                    this.$router.push({ name: 'profil_friend',params:{id: user}})
                }
                else{
                    event.preventDefault()
                    this.$router.push({name: 'login'})
                }
            },

            removeenemy:function(user){
                const instance = axios.create({
                    baseURL: 'http://restapi.fintegro.com',
                    headers: {
                        bearer: validToken()
                    }
                });
                instance.delete('social-activities/' + user, {
                })
                .then(response => {
                    console.log('this enemy removed')
                })
                .catch(response => {
                    console.log("this enemy did't remove")
                    console.log(response)
                    this.errored = true;
                    event.preventDefault()
                })
                document.getElementById(user).style.display = 'none'
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
                instance.get('social-activities', {})
                    .then(response => {
                        this.enemysmy = response.data.enemies
                        window.scrollTo(0,0)
                        NProgress.done()
                    })
                    .catch(response => {
                        debugger
                        console.log("your friends error")
                        console.log(response)
                        this.errored = true;
                        event.preventDefault()
                    })
            } else{
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
