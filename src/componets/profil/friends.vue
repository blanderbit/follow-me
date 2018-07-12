<template>
    <div id="friends">
        <navbar style="position: fixed;margin-left: 0px; z-index: 1000; " v-on:id="user_id = $event"></navbar><br>
        <div style="width: 100%; margin-bottom:20px">
            <div style="background: url('https://images.clipartlogo.com/files/images/28/289483/male-profile-silhouette_p') no-repeat ;width: 140px; height: 140px;margin-top:80px; margin-left: auto; margin-right: auto; background-size: 100px;"></div>
            <div style="margin-left: auto; margin-right: auto; width: 90px;">Friends</div>
            <div style="width: 900px;margin-left: auto;margin-right: auto;margin-top:40px; " >
                <div style="float: left; margin-top: 10px;margin-left: 20px;">
                    <sitebar></sitebar>
                </div>
                <div class="setcontent" style="float: left;  width: 590px;margin-top:10px; margin-left:20px; ">
                    <div class="profil_my_data" style="box-shadow: 0 3px 3px rgba(0,0,0,0.2);
	-moz-box-shadow: 0 3px 3px rgba(0,0,0,0.2);
	-webkit-box-shadow: 0 3px 3px rgba(0,0,0,0.2);">
                        <form action="" class="searchFriend">
                            <input type="search" placeholder="Search your friends" class="input" />
                            <input type="submit"  value="" class="submit" />
                        </form>
                        <a id="s7" @click="global">Global search</a>
                    </div>

                    <div class="profil_my_data" style="margin-top: 20px;box-shadow: 0 3px 3px rgba(0,0,0,0.2);
	-moz-box-shadow: 0 3px 3px rgba(0,0,0,0.2);
	-webkit-box-shadow: 0 3px 3px rgba(0,0,0,0.2);">
                        <div class="blok" v-for="friend in friendsmy" :id="friend.id">
                            <div  :style="{background: 'url(' + functions(friend) +')'}"  class="cover" style="float:left ;border: 1px solid white; width: 70px;height: 70px;border-radius: 10px"></div>
                            <div style="float:left;border-left: 1px solid white; width: 300px;height: 50px; padding: 10px; line-height: 1.4">
                                <span style="color: black;font-style: italic; font-size:15px; margin-top: 7x">{{friend.firstname}} {{friend.lastname}}</span>
                                <div style="color: gray;font-style: italic; font-size:12px;">{{!friend.lived ? '' : 'Lived ' + friend.lived}}</div>
                                <div style="color: gray;font-style: italic; font-size:12px;">{{!friend.from ? '' : 'from ' + friend.from}}</div>
                            </div>
                            <div style="float:left;border-left: 1px solid dodgerblue; width: 120px;height: 70px">
                                <a href="#" class="bdelta" @click="removefriend(friend.id)">remove</a>
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

        data () {
            return {
                token: validToken(),
                friendsmy:[],
                animus: 'http://img0.liveinternet.ru/images/attach/c/3/76/560/76560786_Clothing086_copy.png'
            }

        },
        methods: {
            global:function(){
                this.$router.push({ name: 'friends_globall' })
            },
            functions:function(friend){
                return !friend.photo ? this.animus :friend.photo
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
            }
        },
        components: {
            globFooter: GFooter,
            navbar: navBar,
            sitebar:sitebar
        },
        created:function(){
            const instance = axios.create({
                baseURL: 'http://restapi.fintegro.com',
                headers: {
                    bearer: validToken()
                }
            });
            instance.get('social-activities', {
            })
            .then(response => {
                console.log('your friends')
                console.log(response)
                this.friendsmy = response.data.friends
                console.log(this.friendsmy)

            })
            .catch(response => {
                debugger
                console.log("your friends error")
                console.log(response)
                this.errored = true;
                event.preventDefault()
            })

        }
    }

</script>
<style>
    #friends{
        background: #f5f5f5;
    }.cover{
         background-size:cover!important
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
    #s7 {
        text-decoration: none;
        display: inline-block;
        padding: 5px 10px;
        letter-spacing: 1px;
        /*margin: 0 20px;*/
        margin-top: 20px;
        font-size: 14px;
        font-family: 'Fredoka One', cursive;
        transition: .3s ease-in-out;
    }
    #s7 {color: darkslategrey;}
    #s7:hover {transform: scaleX(1.1);}

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