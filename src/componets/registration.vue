<template >
    <div id="registration">
        <div class="haed" style="background-image: url('src/assets/foto-fon-2-5.jpg')">
        <img src="src/assets/logo.png" id="logo" width="200px" height="200px">
        <div class="demo" >FOLLOW ME</div>
    </div>
        <form name="registration-form" class="registration-form" method="post">

            <div class="header">
                <h1>Registration</h1>
                <span>Your registration</span>
            </div>

            <div class="content">
                <label>Enter your nickname</label>
                <input name="login" type="text" id='user' class="input login" v-model='user' placeholder="Login"/>
                <label>Enter your email</label>
                <input name="email" type="email" id='mail' class="input email" v-model='mail' placeholder="Email"/>
                <label>Password</label>
                <input name="password" type="password" id='pass' class="input password" v-model='passw' placeholder="Password"/>
                <!--<label>Confirm password</label>-->
                <!--<input name="password" type="password" id='pass' class="input password" v-model='passw' placeholder="password"/>-->
                <label>Enter your name</label>
                <input name="firstname" type="text" id='first' class="input firstname" placeholder="Name"/>
                <label>Enter your lastname</label>
                <input name="lastname" type="text" id='last' class="input lastname" placeholder="Lastname"/>

            </div>

            <div class="footer">
                <input type="button" name="submit" @click="submitForm" value="Registration" id="registration_ok" class="button" />
            </div>

        </form>
    </div>
</template>

<script>
    import axios from 'axios'
//    import footer_render from './componets/footer.vue'
    export default {
        name: 'registration',

        data:function(){
              return{
                  user:'',
                  passw:'',
                  mail: ''
              }
        },
        methods: {
            submitForm:function() {
                console.log(this.user)
                console.log(this.passw)
                console.log(this.mail)
                axios
                    .post("http://restapi.fintegro.com/registration", {
                        login: this.user,
                        email:this.mail,
                        password: this.passw

                    })
                    .then(response => {
                        console.log(response.data)
                        this.$router.push({ path: 'login' })
                    })
                    .catch(error => {
                        console.log(error);
                        console.log(user)
                        this.errored = true;
                    })
            }
        },
//        components:{
//            footer:footer_render
//        }

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