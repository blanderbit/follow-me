<template >
    <div id="first">
        <div class="haed" style="background-image: url('src/assets/foto-fon-2-5.jpg')">
            <img src="src/assets/logo.png" id="logo" width="200px" height="200px">
            <div class="demo" >FOLLOW ME</div>
        </div>

        <div class="middle">
            <a href="" v-on:click="regs">Registration</a>
            <a href="" v-on:click="log">Login</a>
        </div>
        <globFooter></globFooter>
    </div>
</template>
<script>
    import GFooter from './GloballFooter.vue'
    export default {
        name: 'first',
        data:function(){
            return{

            }
        },
        methods:{
            log:function(event){
                this.$router.push({ path: 'login' })
                event.preventDefault()
            },
            regs:function(event){
                this.$router.push({ path: 'registration' })
                event.preventDefault()
            }
        },
        components:{
            globFooter:GFooter,

        }
    }
</script>
<style>
    /*название сайта*/
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


    /* кнопки */
    .middle  a {
        text-decoration: none;
        outline: none;
        display: inline-block;
        padding: 12px 40px;
        margin: 10px 20px;
        margin-bottom: 235px;
        border-radius: 80px;
        background-image: linear-gradient(45deg, #6ab1d7 0%, #33d9de 50%, #002878 100%);
        background-position: 100% 0;
        background-size: 200% 200%;
        font-family: 'Montserrat', sans-serif;
        font-size: 64px;
        font-weight: 600;
        color: white;
        box-shadow: 0 16px 32px 0 rgba(0,40,120,.35);
        transition: .5s;
        position:relative;
        left:230px;
        top:90px;

    }
    .middle a:hover {
        box-shadow: 0 0 0 0 rgba(0,40,120,0);
        background-position: 0 0;
    }
</style>

