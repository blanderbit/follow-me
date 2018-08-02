<template>
    <div id="login">
    <div class="haed" style="background-image: url('src/assets/foto-fon-2-5.jpg');">
        <div style="margin-left: auto;
        margin-right: auto;width: 370px">
            <img src="src/assets/logo.png" id="logo" width="100px" height="100px">
            <div class="demo" >FOLLOW ME</div>
        </div>
    </div>
    <div class="contentLogin">
        <form name="login-form" class="login-form"  method="post">
            <div class="header">
                <h1>Autorization</h1>
                <span>Enter login information</span><br>
            </div>
            <span class="logSpan" :style="{color:red,fontSize: '11px', marginLeft:'30px'}">{{  responseError }}</span>
            <div class="content" style="margin-top:10px;">

                <input name="username" type="text" id='login_form' class="input username" style="margin-bottom: 20px" v-model='user' placeholder="User name"/>
                <span :style="{color:red,fontSize: '11px'}">{{  error1 }}</span>
                <input name="password" type="password" @keyup="checks" @focus="checks()" @blur="removec()" id='password_form' class="input password" v-model='passw' placeholder="Password"/><br>
                <div style="background:red;color:white;padding: 10px; Font-size:15px;border-radius: 10px" :style="{display: style}" id="caps"><ion-icon name="warning" style="font-size: 20px;position: absolute;"></ion-icon><span style="margin-left: 25px">pressed a CapsLock</span></div>
                <span :style="{color:red,fontSize: '11px'}">{{ error2 }}</span>
                <a id="s7" @click="recovery">Forgot your password ?</a>
            </div>
            <div class="footer">
                <input type="submit" v-on:click.prevent="submitForm" name="submit" value="Check in" id="sign" class="button" />
                <input type="button" v-on:click="to" name="start_ragistration_button" value="Registration" id="start_ragistration" class="register" />
            </div>
        </form>
    </div>
    <components is="globFooter"></components>
    </div>
</template>

<style>






    /*@media screen and (max-width: 736px){*/
        /*.haed{*/
            /*height: 40px!important;*/
        /*}*/
        /*#logo{*/
            /*height: 40px;*/
            /*width: 40px;*/
        /*}*/
        /*.demo{*/
            /*font-size: 26px;*/
            /*line-height: 52px;*/

            /*margin-top: -5px;*/
        /*}*/
        /*.contentLogin{*/
            /*width: 675px;*/
        /*}*/
    /*}*/
    /*@media screen and (max-width: 640px){*/
        /*.haed{*/
            /*height: 40px!important;*/
        /*}*/
        /*#logo{*/
            /*height: 40px;*/
            /*width: 40px;*/
        /*}*/
        /*.demo{*/
            /*font-size: 26px;*/
            /*line-height: 52px;*/

            /*margin-top: -5px;*/
        /*}*/
        /*.contentLogin{*/
            /*width: 535px;*/
        /*}*/
    /*}*/
    /*@media screen and (max-width: 414px){*/
        /*.haed{*/
            /*height: 40px!important;*/
        /*}*/
        /*#logo{*/
            /*height: 40px;*/
            /*width: 40px;*/
        /*}*/
        /*.demo{*/
            /*font-size: 26px;*/
            /*line-height: 52px;*/

            /*margin-top: -5px;*/
        /*}*/
        /*.contentLogin{*/
            /*width: 435px;*/
        /*}*/
    /*}*/
    /*@media screen and (max-width: 400px){*/
        /*.haed{*/
            /*height: 40px!important;*/
        /*}*/
        /*#logo{*/
            /*height: 40px;*/
            /*width: 40px;*/
        /*}*/
        /*.demo{*/
            /*font-size: 26px;*/
            /*line-height: 52px;*/

            /*margin-top: -5px;*/
        /*}*/
        /*.contentLogin{*/
            /*width: 335px;*/
        /*}*/
    /*}@media screen and (max-width: 360px){*/
        /*.haed{*/
            /*height: 30px!important;*/
        /*}*/
        /*#logo{*/
            /*height: 30px;*/
            /*width: 30px;*/
        /*}*/
        /*.demo{*/
            /*font-size: 20px;*/
            /*line-height: 52px;*/

            /*margin-top:-10px;*/
        /*}*/
        /*.contentLogin{*/
            /*width: 335px;*/
        /*}*/
    /*}*/
</style>
<script>
    import NProgress from 'nprogress'
    var capsLockEnabled = null;
    function getChar(event) {
        if (event.which == null) {
            if (event.keyCode < 32) return null;
            return String.fromCharCode(event.keyCode) // IE
        }

        if (event.which != 0 && event.charCode != 0) {
            if (event.which < 32) return null;
            return String.fromCharCode(event.which) // остальные
        }

        return null; // специальная клавиша
    }

    if (navigator.platform.substr(0, 3) != 'Mac') { // событие для CapsLock глючит под Mac
        document.onkeydown = function(e) {
            if (e.keyCode == 20 && capsLockEnabled !== null) {
                capsLockEnabled = !capsLockEnabled;
            }
        }
    }

    document.onkeypress = function(e) {
        e = e || event;
        var chr = getChar(e);
        if (!chr) return // special key
        if (chr.toLowerCase() == chr.toUpperCase()) {
            return;
        }
        capsLockEnabled = (chr.toLowerCase() == chr && e.shiftKey) || (chr.toUpperCase() == chr && !e.shiftKey);
    }
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

    import axios from 'axios'
    import GFooter from './GloballFooter.vue'
    import VueRouter from 'vue-router'
    export default  {
        name:'login',
        data:function(){
            return{
                user: '',
                passw: '',
                error1:'',
                error2:'',
                red: 'red',
                responseError: '',
                capsLockEnabled: null,
                style: 'none',
                loading:''
            }
        },
        created:function(){
            NProgress.done()

        },
        methods: {
            submitForm:function() {
                if (this.user && this.passw){

                    axios({
                        method: 'post',
                        url: 'http://restapi.fintegro.com/login',
                        data: {
                            username: this.user,
                            password: this.passw
                        },
                        onDownloadProgress: function(progressEvent) {
                            this.loading = progressEvent
                        },
                    })
                    .then(response => {
                        this.responseError = ''
                        let date =new Date(new Date().getTime() + 1200 * 1000)
                        document.cookie = 'token=' + response.data.token+'; expires=' + date.toUTCString();
                        localStorage.setItem('id',response.data.profile.user_id)
                        this.$router.push({ name: 'profil',params: { id:  localStorage.getItem('id')} });

                    })
                    .catch(errors => {
                        console.log(errors);
                        this.responseError = "You enter incorrect login or password"
                        this.errored = true;
                    },)
                }
                if(!this.user){ this.error1 ="Login form can not be empty"}else{this.error1 =""}
                if(!this.passw) {this.error2 ="Password form can not be empty"}else{this.error2 =""}
            },
            to:function(){
                event.preventDefault()
                this.$router.push({ name: 'registration' })
            },
            recovery:function(){
                event.preventDefault()
                this.$router.push({ name: 'recovery' })
            },
            checks:function () {
                this.style = capsLockEnabled ? 'block' : 'none';
            },
            removec:function () {
                this.style = 'none';
            }
        },
        components:{
            globFooter:GFooter
        }
    }
</script>
