<template >
     <div class="transform-border">
           <img :src="msg!=null ? msg: photo"><br>
         <div style="float: left">
             <a style="display: none" href=""  class="pdelta"  v-show="!retys(useres)" @click="addtofriends">add friend</a>
             <a href="" class="podelta" v-show="retys(useres)"  @click="addtofriends" >remove</a>
         </div>
         <a href="" style="float: right;" class="podelta white"  @click="writeMessage()" >Write</a>

         <div class="clear"></div>
     </div>
</template>

<style>

/*фото профиля*/
/*.transform-border {*/
    /*position: relative;*/
    /*max-width: 200px;*/
    /*margin: 50px auto;*/
    /*transform: perspective(3000px) ;*/

    /*background: white;*/
    /*box-shadow: 0 3px 3px lightseagreen;*/
    /*-moz-box-shadow: 0 3px 3px lightseagreen;*/
    /*-webkit-box-shadow: 0 3px 3px lightseagreen;*/
    /*border-radius: 10px;*/
/*}*/
/*.transform-border img {*/
    /*background: white;*/
    /*display: block;*/
    /*width: 100%;*/
    /*!*box-shadow: -12px 11px 1px #f2f2f2;*!*/
/*}*/
/*.transform-border:after {*/
    /*content: "";*/
    /*position: absolute;*/
    /*width: 100%;*/
    /*height: 100%;*/
    /*left: -22px;*/
    /*top: 22px;*/
    /*background: white;*/
    /*opacity: 0.5;*/
    /*!*#cccccc*!*/
    /*border-radius: 10px;*/
    /*z-index: -1;*/
    /*box-shadow: 0 3px 3px lightseagreen;*/
    /*-moz-box-shadow: 0 3px 3px lightseagreen;*/
    /*-webkit-box-shadow: 0 3px 3px lightseagreen;*/

/*}*/

/*.transform-border {*/
  /*position: relative;*/
  /*max-width: 200px;*/
    /*margin: 50px auto;*/
    /*transform: perspective(3000px) ;*/
/*}*/
/*.transform-border img {*/
  /*display: block;*/
  /*width: 100%;*/
  /*box-shadow: -12px 11px 1px #f2f2f2;*/
/*}*/
/*.transform-border:after {*/
  /*content: "";*/
  /*position: absolute;*/
  /*width: 100%;*/
  /*height: 100%;*/
  /*left: -22px;*/
  /*top: 22px;*/
  /*background: #cccccc;*/
  /*z-index: -1;*/

/*}*/

/*кнопка редактирования фотографии профиля*/



</style>

<script>

    import Vue from 'vue'
    import axios from 'axios'
    import VueRouter from 'vue-router'
    Vue.use(VueRouter)
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

    export default{
        props:['msg'],
        data(){
            return{
                photo:'https://c8.alamy.com/comp/EME6A1/silhouette-of-a-question-mark-with-male-and-female-face-EME6A1.jpg',
                useres:[]
            }

        },
        methods:{
            addtofriends:function(){
                event.preventDefault()
                const instance = axios.create({
                    baseURL: 'http://restapi.fintegro.com',
                    headers: {
                        bearer: validToken()
                    },
                    data :{
                        user_id: this.$route.params.id,
                        type: '1'

                    }
                });
                instance.post('social-activities', {
                })
                    .then(response => {
                        console.log('add friend')
                    })
                    .catch(response => {
                        console.log("don't add friend")
                        console.log(response)
                        this.errored = true;
                        event.preventDefault()
                    })
                let style = getComputedStyle(event.srcElement.nextElementSibling)
                if(style.display == 'none'){
                    event.srcElement.nextElementSibling.style.display = 'block'
                    event.srcElement.style.display = 'none'
                }else{
                    event.srcElement.nextElementSibling.style.display = 'none'
                    event.srcElement.style.display = 'block'
                }
            },
            writeMessage:function(){
                event.preventDefault()
                this.$emit('writeMes','block')
            },
            retys:function(a){
                for(let i = 0; i<a.length;i++) {
                    if(a[i].user_id === localStorage.getItem('id')){
                        return false
                    }
                    return true
                }
            },
            removefriend:function(){
                const instance = axios.create({
                    baseURL: 'http://restapi.fintegro.com',
                    headers: {
                        bearer: validToken()
                    }
                });
                instance.delete('social-activities/' + this.$route.params.id, {
                })
                    .then(response => {
                        console.log('this friend removed')
                    })
                    .catch(response => {
                        console.log("this friend did't remove")
                        console.log(response)
                        this.errored = true;
                        event.preventDefault()
                    })
                document.getElementById(user).style.display = 'none'
            },
      },
        created: function(){
            axios({
                method:'get',
                url:'http://restapi.fintegro.com/profiles/' + this.$route.params.id,
                dataType: 'json',
                headers: {
                    bearer: validToken()
                },
            })
            .then(response => {
                this.useres = response.data.friends

            })
            .catch(error => {
                console.log("no photo")
            })
        }

    }
</script>