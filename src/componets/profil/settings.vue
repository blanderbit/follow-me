<template>
    <div id="settings">
        <navbar style="position: fixed;margin-left: 0px; z-index: 1000; " v-on:id="user_id = $event"></navbar><br>
        <div style="width: 100%; margin-bottom:20px">
            <div style="background: url('src/assets/settings-1615049_960_720.png') no-repeat ;width: 100px; height: 100px;margin-top:80px; margin-left: auto; margin-right: auto; background-size: 100px;"></div>
            <div style="margin-left: auto; margin-right: auto; width: 60px;">Settings</div>
            <div style="width: 900px;margin-left: auto;margin-right: auto;margin-top:40px; " >
                <div style="float: left; margin-top: 10px;margin-left: 20px;">
                    <sitebar></sitebar>
                </div>
                <div class="setcontent" style="float: left;  width: 590px;margin-top:10px; margin-left:20px; ">
                    <div style="float: left;  width: 280px; margin-right: 10px; ">
                        <div class="group">
                            <input type="text" v-model="firstName"  placeholder="Firstname">
                            <span class="bar"></span>
                        </div>

                        <div class="group">
                            <input type="text" v-model="lastName" placeholder="Lastname">
                            <span class="bar"></span>
                        </div>
                        <div>
                            <textarea cols="11"  v-model="quotes" rows="4" placeholder="Quotes"></textarea>
                            <span class="bar"></span>
                        </div>
                    </div>
                    <div style="float: right;  width: 280px;">

                        <div class="group">
                            <input type="text" v-model="lived" placeholder="Lived">
                            <span class="bar"></span>
                        </div>

                        <div class="group">
                            <input type="text" v-model="from" placeholder="From">
                            <span class="bar"></span>
                        </div>

                        <div class="group">
                            <input type="text" v-model="went" placeholder="Went">
                            <span class="bar"></span>
                        </div>

                    </div>
                    <div class="clear"></div>
                    <div>
                        {{ids}}
                    </div>
                </div>
                <form id="uploadForm" class="uploadPhoto" >
                    <label>
                        <input type="file" name="UploadForm[imageFile]"  id="file" @change="uploadPhoto">
                        <span>Upload photo by profil</span>
                    </label>
                </form>

                <div style="position: relative; margin-left: 200px; color: black; left: 370px; top:10px">{{fileShow}}</div>
                <button type="text" class="submit-btn" style="background: rgb(0, 78, 150)" @click="send">Save</button>

                <button type="submit" class="submit-btn" style="margin-left: 450px; background: crimson" >Remove profil</button>
            </div>
            <div class="clear"></div>
        </div>
        <globFooter></globFooter>
    </div>
</template>
<script>
    import GFooter from '../GloballFooter.vue'
    import sitebar from './sitebar.vue'
    import navBar from './navBarAll.vue'
    import axios from 'axios'
    import Vue from 'vue'
//    import VueResource from 'vue-resource'
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

    export default {
        props:['ids','msg'],
        data () {
            return {
                token: validToken(),
                firstName: '',
                lastName: '',
                from: '',
                quotes: '',
                lived: '',
                went: '',
                photo: '',
                firstNameLocal: localStorage.getItem('firstName'),
                lastNameLocal: localStorage.getItem('lastName'),
                fromLocal: localStorage.getItem('from'),
                quotesLocal: localStorage.getItem('quotes'),
                livedLocal: localStorage.getItem('lived'),
                wentLocal: localStorage.getItem('went'),
                photoLocal: localStorage.getItem('photo'),
                fileShow:'',
                image:'',

            }

        },
        methods: {
            send: function () {
                if(!this.firstName){
                    this.firstName = this.firstNameLocal
                }
                if(!this.lastName){
                    this.lastName = this.lastNameLocal
                }
                if(!this.from){
                    this.from = this.fromLocal
                }
                if(!this.quotes ){
                    this.quotes = this.quotesLocal
                }
                if(!this.lived ){
                    this.lived = this.livedLocal
                }
                if(!this.went ){
                    this.went = this.wentLocal
                }
                if(!this.photo ){
                    this.photo = this.photoLocal
                }
                axios({
                    method:'put',
                    url:'http://restapi.fintegro.com/profiles/'+ localStorage.getItem('id'),
                    dataType: 'json',
                    headers: {
                        bearer: validToken()
                    },
                    data:{
                        firstname:this.firstName,
                        lastname:this.lastName,
                        quote:this.quotes,
                        lived:this.lived,
                        from:this.from,
                        went:this.went,
                        photo:this.photo
                    }
                })
                .then(response => {
                    console.log("yes")
                    console.log(response)
                    this.firstName= '',
                    this.lastName= '',
                    this.from= '',
                    this.quotes= '',
                    this.lived= '',
                    this.went= '',
                    this.photo= '',
                    event.preventDefault()
                })
                .catch(error => {
                    console.log("no")
                    console.log(error)
                    this.errored = true;
                    event.preventDefault()
                })
            },
            uploadPhoto:function(e){
                let token = validToken();
                this.image = e.target.files[0];
                let data = new FormData()
                data.append('UploadForm[imageFile]', this.image)
                debugger
                axios({
                    url: 'http://restapi.fintegro.com/upload',
                    method: 'POST',
                    headers: {
                        bearer: token
                    },
                    data:data,
                    crossDomain: true,
                    cache: false,
                    contentType: false,
                    processData: false,
                })
                   .then(response => {
                        console.log(response)
                        console.log(response.data.link)
                        this.photo = response.data.link
                        debugger
                 })
                        .catch(error => {
                        console.log(error)

                })
            }
        },
        components: {
            globFooter: GFooter,
            navbar: navBar,
            sitebar:sitebar
        }
    }

</script>
<style>
    #settings{
        background: #f5f5f5;
    }
    .setcontent label {
        color: #999;
        font-size: 18px;
        position: absolute;
        pointer-events: none;
        left: 10px;
        top: 15px;
        transition: 0.2s ease all;
        -moz-transition: 0.2s ease all;
        -webkit-transition: 0.2s ease all;
    }

    /* active state */
    .setcontent .group input:focus ~ label, {
        top: -15px;
        font-size: 14px;
        color: #5264AE;
    }



    .setcontent .bar {
        position: relative;
        display: block;
        width: 280px;
    }
    .setcontent  .bar:before,.setcontent .bar:after {
        content: "";
        height: 2px;
        width: 0;
        bottom: 0;
        position: absolute;
        background: #5264AE;
        transition: 0.2s ease all;
        -moz-transition: 0.2s ease all;
        -webkit-transition: 0.2s ease all;
    }
    .setcontent .bar:before {
        left: 50%;
    }
    .setcontent .bar:after {
        right: 50%;
    }

    /* active state */
    .setcontent .group input:focus ~ .bar:before,
    .setcontent .group input:focus ~ .bar:after,
        textarea:focus ~ .bar:before,
    textarea:focus ~ .bar:after
    {
        width: 50%;
    }
    .setcontent  .group {
        position: relative;
        margin-bottom: 30px;
    }

    .setcontent .group input
   {
        font-size: 16px;
        padding: 10px;
        display: block;
        width: 260px;

        border: none;
        border-bottom: 1px solid #ccc;

    }
    textarea{
        font-size: 16px;
        padding: 11px;
        display: block;
        width: 262px;
        border: none;
        border-bottom: 1px solid #ccc;

    }
    .setcontent input:focus,
    textarea:focus{
        outline: none;
    }
    .uploadPhoto {
        position: relative; /* Даем возможность делать позиционирование, внутри данного элемента */
        overflow: hidden; /* Все что выходит за пределы - скрываем */
        width: 260px; /* Задаем ширину кнопки выбора файла */
        height: 20px; /* Задаем высоту кнопки выбора файла */
        background: #6da047;
        border-radius: 3px;
        padding: 10px;
        color: #fff;
        text-align: center;
        float: right;
        margin-top: -41px;
        margin-right: 40px;
    }
    .uploadPhoto:hover {
        background: #7aad55;
    }
    .uploadPhoto input[type="file"]{
        display: none; /* Обязательно скрываем настоящий Input File */
    }
    .uploadPhoto label {
        /* Растягиваем label на всю возможную площадь блока .file-upload */
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        cursor: pointer;
    }
    .uploadPhoto span {
        line-height: 36px; /* Делаем вертикальное выравнивание текста, который написан на кнопке */
    }


    .submit-btn {
        display: inline-block;
        position: relative;
        overflow: hidden;
        height: 45px;
        min-width: 200px;

        border: none;
        border-radius: 35px;
        padding-right: 30px;
        background: #ff5c5a;
        color: white;
        font-size: 20px;
        margin-top: 20px;
        margin-left: 200px;
        margin-right: auto;
    }
    .submit-btn:focus{
        outline: none;
    }
    .submit-btn:last-of-type {margin-right: 0;}
    .submit-btn:after {
        position: absolute;
        right: 10px;
        top: 0;
        width: 45px;
        height: 45px;
        line-height: 45px;
        content: "\f1d8";
        font-family: FontAwesome;
        background: crimson;
        border-radius: 50%;
        color: white;
        font-size: 22px;
    }
    @keyframes float {
        0%, 100% {transform: translateY(0);}
        50% {transform: translateY(-8px);}
    }
    .submit-btn:hover:after {animation: float 2s linear infinite;}
</style>