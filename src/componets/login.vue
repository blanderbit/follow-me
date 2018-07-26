<template>
    <div id="login">
    <!--            <div class="user-icon"></div>
        <div class="pass-icon"></div>-->
        <div class="haed" style="background-image: url('src/assets/foto-fon-2-5.jpg')">
        <img src="src/assets/logo.png" id="logo" width="100px" height="100px">
            <div class="demo" >FOLLOW ME</div>
    </div>

    <form name="login-form" class="login-form" style="margin-top: 30px;margin-bottom: 30px;"  method="post">

        <div class="header">
            <h1>Autorization</h1>
            <span>Enter login information</span><br>

        </div>
        <span :style="{color:red,fontSize: '11px', marginLeft:'30px'}">{{  responseError }}</span>
        <div class="content" style="margin-top:10px;">

            <input name="username" type="text" id='login_form' class="input username" v-model='user' placeholder="User name"/><br><br>
            <span :style="{color:red,fontSize: '11px'}">{{  error1 }}</span>
            <input name="password" type="password" @keyup="checks" @focus="checks()" @blur="removec()" id='password_form' class="input password" v-model='passw' placeholder="Password"/><br><br>
            <div style="background:red;color:white;padding: 10px; Font-size:15px;border-radius: 10px" :style="{display: style}" id="caps"><ion-icon name="warning" style="font-size: 20px;position: absolute;"></ion-icon><span style="margin-left: 25px">pressed a CapsLock</span></div>
            <span :style="{color:red,fontSize: '11px'}">{{ error2 }}</span>
            <a id="s7" @click="recovery">Forgot your password ?</a>
        </div>
        <div class="footer">
            <input type="submit" v-on:click.prevent="submitForm" name="submit" value="Check in" id="sign" class="button" />
            <input type="button" v-on:click="to" name="start_ragistration_button" value="Registration" id="start_ragistration" class="register" />
        </div>

    </form>
        <components is="globFooter"></components>
</div>
</template>

<script>
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
                        console.log(response.data.token)
                        this.$router.push({ name: 'profil',params: { id:  localStorage.getItem('id')} });

                    })
                    .catch(errors => {
                        console.log(errors.response);
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

<style>
    #login{
  background:  url('https://html5book.ru/wp-content/uploads/2015/10/background54.png')
    }
    .demo {
        margin: 1em 0 0.5em 0;
        color: #343434;
        font-weight: bold;
        font-family: 'Ultra', sans-serif;
        font-size: 66px;
        line-height: 92px;
        text-transform: uppercase;
        text-shadow: 0 2px white, 0 3px #777;
        position:absolute;
        left: 475px;
        top:-60px;
    }
    #logo{
        position: relative;
        left:15px;
        top:15px;

    }

    #s7 {
        text-decoration: none;
        display: inline-block;
        padding: 5px 10px;
        letter-spacing: 1px;
        margin: 0 20px;
        font-size: 14px;
        font-family: 'Fredoka One', cursive;
        transition: .3s ease-in-out;
    }
    #s7 {color: darkslategrey;}
    #s7:hover {transform: scaleX(1.1);}

</style>