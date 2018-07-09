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
            <input name="password" type="password" id='password_form' class="input password" v-model='passw' placeholder="Password"/><br><br>
            <span :style="{color:red,fontSize: '11px'}">{{ error2 }}</span>
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
                responseError: ''
            }
        },
        render:h=>h('#app'),
        methods: {
            submitForm:function() {
                if (this.user && this.passw){
                    axios
                    .post("http://restapi.fintegro.com/login", {
                        username: this.user,
                        password: this.passw
                    })
                    .then(response => {
                        this.responseError = ''
                        document.cookie = 'token=' + response.data.token;
                        localStorage.setItem('id',response.data.profile.user_id)
                        this.$router.push({ name: 'profil',params: { id:  localStorage.getItem('id')} })
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
                this.$router.push({ path: 'registration' })
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

</style>