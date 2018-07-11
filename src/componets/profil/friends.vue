<template>
    <div id="friends">
        <navbar style="position: fixed;margin-left: 0px; z-index: 1000; " v-on:id="user_id = $event"></navbar><br>
        <div style="width: 100%; margin-bottom:20px">
            <div style="background: url('src/assets/settings-1615049_960_720.png') no-repeat ;width: 100px; height: 100px;margin-top:80px; margin-left: auto; margin-right: auto; background-size: 100px;"></div>
            <div style="margin-left: auto; margin-right: auto; width: 60px;">Settings</div>
            <div style="width: 900px;margin-left: auto;margin-right: auto;margin-top:40px; " >
                <div style="float: left; margin-top: 10px;margin-left: 20px;">
                    <sitebar></sitebar>
                </div>
                <div class="setcontent" style="float: left;  width: 590px;margin-top:10px; margin-left:20px; ">

                </div>
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
    #friends{
        background: #f5f5f5;
    }

</style>