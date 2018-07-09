<template>
    <div id="profil">
        <navbar style="position: fixed; z-index: 1000; " ></navbar><br>
        <div style="width: 100%; margin-bottom:20px">
            <div style="width: 900px;margin-left: auto;margin-right: auto;margin-top:40px; ">
                <div style="float: left; margin-top: 10px;margin-left: 30px; ">
                    <mainPhoto style="margin-left: 30px; margin-top: 0px" :msg="photo" ></mainPhoto>
                    <div class="albums">
                        <span>Your albums</span> <a href="#">Show more</a>
                        <div></div>
                        <div></div>

                    </div>
                </div>
                <div style="float: left;  width: 543px;margin-top:10px; margin-left:20px;">
                    <div class="profil_my_data">
                        <div style=" ">{{firstName}} {{lastName}}</div>
                        <div style=" margin-top: 20px;">{{quotes}}</div>
                        <hr style="background: lightblue;margin-top: 20px; "><br>
                        <input type="button"  value="Редактировать" class="set_button" @click="settings">
                        <div>{{ went}}</div>
                        <div style=" margin-top: 20px;">{{lived}}</div>
                        <div style=" margin-top: 20px;">{{from}}</div>
                        <hr style="background: blue;margin-top: 20px; "><br>
                        <div class="span">
                            <span>Friends : {{friends}}</span>
                            <span>Enemies : {{enemies}}</span>
                            <span>Albums:</span>
                        </div>

                    </div>
                </div>
            </div>
            <div class="clear"></div>
        </div>
        <globFooter :ids="ids"></globFooter>

    </div>
</template>

<script>

   import GFooter from '../GloballFooter.vue'
   import navBar from './navbarProfil.vue'
   import profPhoto from './prof-photo.vue'
   import axios from 'axios'
   import settings from './settings.vue'
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


    export default {
        name: 'profil',

        data () {
            return {
                token: validToken(),
                firstName: 'Your name',
                lastName: 'Your Surname',
                friends:'0',
                enemies:'0',
                quotes: '',
                from: '',
                lived:'',
                went:'',
                photo:'',
                ids:'',
            }

        },

        components:{
            globFooter:GFooter,
            navbar:navBar,
            mainPhoto: profPhoto,
            settings:settings

        },
        methods:{
            settings:function(){
                console.log(this.$route.params.id)
                debugger
                this.$router.push({ name: 'settings',params:{id: localStorage.getItem('id')}})
            }
        },
        created:function(){
        console.log(localStorage.getItem('lastName'))
                axios({
                    method:'get',
                    url:'http://restapi.fintegro.com/profiles',
                    dataType: 'json',
                    headers: {
                        bearer: validToken()
                    },
                })
            .then(response => {
                console.log(response.data.profile.lastname)
                this.ids = response.data.profile.user_id
                this.firstName =response.data.profile.firstname
                localStorage.setItem('firstName',response.data.profile.firstname)
                this.lastName =response.data.profile.lastname
                localStorage.setItem('lastName',response.data.profile.lastname)
                this.friends = response.data.friends_count
                this.enemies = response.data.enemies_count
                this.quotes =response.data.profile.quote
                localStorage.setItem('quotes',response.data.profile.quote)
                this.from =response.data.profile.from
                localStorage.setItem('from',response.data.profile.from)
                this.lived =response.data.profile.lived
                localStorage.setItem('lived',response.data.profile.lived)
                this.went =response.data.profile.went
                localStorage.setItem('went',response.data.profile.went)
                this.photo =response.data.profile.photo

                event.preventDefault()
            })
            .catch(error => {
                console.log("no")
                console.log(error)
                this.errored = true;
                event.preventDefault()
            })
        }
    }
</script>
<style>
    #profil{
        background: #f5f5f5;
    }
    .clear{
        clear: both;
    }
    .profil_my_data{
        padding: 20px;
        background: white;
    }
    .profil_my_data span{
        background: rgba(0, 153, 255, 0.3);
        padding: 20px;
    }
    .span{
        margin-top: 20px;
        margin-bottom: 20px;
    }
.set_button{
    display: block;

    padding: 10px 5px 10px 0;


    background: none;
    border: none;
    cursor: pointer;

    font-family: 'Bree Serif', serif;
    font-weight: 300;
    font-size: 14px;
    color: #414848;
    text-shadow: 0px 1px 0 rgba(256,256,256,0.5);
    margin-left: auto;
    margin-right: auto;
}
    .set_button:hover{
        color: black;
    }
    .albums{
        width: 190px;
        background: white;
        height: 120px;
        padding: 20px;
        font-size: 12px;
    }
    .albums a{
        text-decoration: none;
        color: blue;
    }
    .albums a:hover{
        color: lightblue;
    }
    .albums  div{
        background: url('http://s1.iconbird.com/ico/0912/LipseIcons/w128h1281346946785gallery.png');
        margin-top: 10px;
        width: 90px;
        height: 90px;

        display: inline-block;
        background-position: center;
        background-size: cover;

        filter: grayscale(.75)
    }
    .albums  div:hover{
        filter:none ;
    }
</style>