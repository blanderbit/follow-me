<template>
    <div id="recovery">
        <div class="haed" style="background-image: url('src/assets/foto-fon-2-5.jpg')">
            <img src="src/assets/logo.png" id="logo" width="200px" height="200px">
            <div class="demo" >FOLLOW ME</div>
        </div>
        <form name="login-form" class="recovery-form"  style="margin-top: 0px;" method="post">
            <div class="header">
                <h1>Recovery email</h1>
                <span>Enter your emeil</span>
            </div>

            <div class="content">
                <input name="email" type="email" id='mail' class="input email" v-model='mail' placeholder="Email"/><br>
            </div>
            <div class="footer">
                <input type="submit" v-on:click.prevent="submitForm" name="submit" value="Sent" id="sign" class="button" />
                <input type="button" v-on:click="to" name="start_ragistration_button" value="back to login" id="back_login" class="register" />
            </div>
        </form>
    </div>
</template>

<script>
    import axios from 'axios'
    export default  {
        name:'recovery',
        data:function(){
            return{
                mail: '',
            }
        },
        render:h=>h('#app'),
        methods: {
            submitForm:function() {
                console.log(this.user)
                console.log(this.passw)
                axios
                    .post("http://restapi.fintegro.com/recovery", {
                        email: this.mail,
                    })
                    .then(response => {
                        console.log(response)
                    })
                    .catch(error => {
                        console.log(error);
                        this.errored = true;
                    })
            },
            to:function(){
                this.$router.push({ path: 'login' })
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