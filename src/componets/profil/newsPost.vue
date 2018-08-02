<template>
    <div id="news" >
        <div class="profil_my_data" v-for="" style="margin-top: 20px;box-shadow: 0 3px 3px rgba(0,0,0,0.2);
-moz-box-shadow: 0 3px 3px rgba(0,0,0,0.2);
-webkit-box-shadow: 0 3px 3px rgba(0,0,0,0.2);">
        </div>
    </div>
</template>
<script> //    import VueResource from 'vue-resource'
import GFooter from '../GloballFooter.vue'
import sitebar from './sitebar.vue'
import navBar from './navBarAll.vue'
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
    created:function(){
        if(validToken()) {
            const instance = axios.create({
                baseURL: 'http://restapi.fintegro.com',
                headers: {
                    bearer: validToken()
                }
            });

            instance.get('news', {
                params :{
                    limit: '*',
                }
            })
            .then(response => {
                console.log(response)
            })
            .catch(response => {
                console.log("no respanse posts")
                this.errored = true;
                event.preventDefault()
            })
        } else{

            this.$router.push({name: 'login'})
        }

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