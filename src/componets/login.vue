<template>
    <div id="login">
    <!--            <div class="user-icon"></div>
        <div class="pass-icon"></div>-->
        <div class="haed" style="background-image: url('src/assets/foto-fon-2-5.jpg')">
        <img src="src/assets/logo.png" id="logo" width="200px" height="200px">
        <div class="demo" >FOLLOW ME</div>
    </div>

    <form name="login-form" class="login-form"  style="margin-top: 0px;" method="post">

        <div class="header">
            <h1>Autorization</h1>
            <span>Enter login information</span>
        </div>

        <div class="content">
            <input name="username" type="text" id='login_form' class="input username" v-model='user' placeholder="User name"/>
            <input name="password" type="password" id='password_form' class="input password" v-model='passw' placeholder="Password"/><br>
        </div>
        <div class="footer">
            <input type="submit" v-on:click.prevent="submitForm" name="submit" value="Check in" id="sign" class="button" />
            <input type="button" v-on:click="to" name="start_ragistration_button" value="Registration" id="start_ragistration" class="register" />
        </div>

    </form>

</div>
</template>

<script>
    import axios from 'axios'
    export default  {
        name:'login',
        data:function(){
            return{
                user: '',
                passw: '',
            }
        },
        render:h=>h('#app'),
        methods: {
            submitForm:function() {
                console.log(this.user)
                console.log(this.passw)
                axios
                    .post("http://restapi.fintegro.com/login", {
                        username: this.user,
                        password: this.passw
                    })
                    .then(response => {
                        console.log(response.data.token)
                        document.cookie = 'token=' + response.data.token;
                    })
                    .catch(error => {
                        console.log(error);
                        console.log(user)

                        this.errored = true;
                    })
            },
            to:function(){
                this.$router.push({ path: 'registration' })
            }
        }
    }
</script>

<style>
    .demo {
        margin: 1em 0 0.5em 0;
        color: #343434;
        font-weight: bold;
        font-family: 'Ultra', sans-serif;
        font-size: 86px;
        line-height: 92px;
        text-transform: uppercase;
        text-shadow: 0 2px white, 0 3px #777;
        position:absolute;
        left: 350px;
        top:10px;

    }

    #logo{
        position: relative;
        left:15px;
        top:15px;

    }

</style>