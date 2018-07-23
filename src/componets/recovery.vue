<template>
    <div id="recovery">
        <div class="haed" style="background-image: url('src/assets/foto-fon-2-5.jpg')">
            <img src="src/assets/logo.png" id="logo" width="100px" height="100px">
            <div class="demo" >FOLLOW ME</div>
        </div>
        <form name="login-form" class="recovery-form"  style="margin-top: 20px; margin-bottom: 110px" method="post">
            <div class="header">
                <h1>Recovery email</h1>
                <span>Enter your emeil</span>
            </div>
            <span :style="{color:red,fontSize: '11px', marginLeft:'30px'}">{{  error1 }}</span>
            <div class="content">
                <input name="email" type="email" id='mail' class="input email" v-model='mail' placeholder="Email"/><br>
            </div>
            <div class="footer">
                <input type="submit" v-on:click.prevent="submitForm" name="submit" value="Sent" id="sign" class="button" />
                <input type="button" v-on:click="to" name="start_ragistration_button" value="back" id="back_login" style="margin-top: 0px;margin-left: -40px" class="button" />
            </div>
        </form>
        <globFooter></globFooter>
    </div>
</template>

<script>
    import axios from 'axios'
    import GFooter from './GloballFooter.vue'
    export default  {
        name:'recovery',
        data:function(){
            return{
                mail: '',
                error1:'',
                red:'red'
            }
        },
        render:h=>h('#app'),
        methods: {
            submitForm:function() {
                axios
                    .post("http://restapi.fintegro.com/recovery", {
                        email: this.mail,
                    })
                    .then(response => {
                        this.$router.push({ path: 'login' })
                    })
                    .catch(error => {
                        this.error1 = 'No mail in database '
                        this.errored = true;
                    })
            },
            to:function(){
                this.$router.push({ path: 'login' })
            }
        },
        components:{
            globFooter:GFooter
        }
    }
</script>

<style>
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