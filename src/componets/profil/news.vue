<template>
    <div id="news" >
        <navbar style="position: fixed;margin-left: 0px; z-index: 1000; " v-on:id="user_id = $event"></navbar><br>
        <div style="width: 100%; margin-bottom:20px">
            <div style="width: 900px;margin-left: auto;margin-right: auto;margin-top:40px; " >
                <div style="float: left; margin-top: 10px;margin-left: 20px;width: 230px">
                    <div style="background: url('https://image.flaticon.com/icons/png/512/21/21601.png') no-repeat ;width: 140px;margin-bottom: 20px; height: 140px; margin-left: auto; margin-right: auto; background-size:cover;"></div>
                    <sitebar></sitebar>
                </div>
                <div class="setcontent" style="float: left;  width: 590px;margin-top:10px; margin-left:20px; ">
                    <postnews></postnews>
                </div>
            </div>
            <div class="clear"></div>
        </div>
        <globFooter></globFooter>
    </div>
</template>
<script> //    import VueResource from 'vue-resource'
import GFooter from '../GloballFooter.vue'
import sitebar from './sitebar.vue'
import navBar from './navBarAll.vue'
import postnews from './newsPost.vue'
import axios from 'axios'
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
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import VueFilters from 'vue2-filters'
Vue.use(VueFilters)


export default {

    data () {
        return {
            token: validToken(),
            animus: 'http://img0.liveinternet.ru/images/attach/c/3/76/560/76560786_Clothing086_copy.png',

        }
    },
    components: {
        globFooter: GFooter,
        navbar: navBar,
        sitebar:sitebar,
        postnews:postnews
    },
    created:function(){
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
    #friends{
        background: #f5f5f5;
    }.cover{
         background-size:cover!important
     }
    .cover:hover{
        cursor: pointer;
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

    .ndelta {
        padding-top: -5px;
        text-decoration: none;
        outline: none;
        display: inline-block;
        width: 100px;
        height: 25px;
        line-height: 25px;
        border-radius: 45px;
        margin: 5px 20px;
        font-family: 'Montserrat', sans-serif;
        font-size: 11px;
        text-transform: uppercase;
        text-align: center;
        letter-spacing: 1px;
        font-weight: 300;
        color: white;
        background: crimson;
        box-shadow: 0 8px 15px rgba(0,0,0,.1);
        transition: .3s;
    }

    .ndelta:hover {background: #2EE59D;
        box-shadow: 0 15px 20px rgba(46,229,157,.4);
        color: black;
        transform: translateY(-7px);
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
</style>