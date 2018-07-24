<template >
     <div class="transform-border">
           <img :src="msg!=null ? msg: photo"><br>
         <a href=""  class="pdelta" style="display: none" v-show="!retys(useres)" @click="addtofriends">add friend</a>
         <a href="" class="podelta" v-show="retys(useres)"  @click="addtofriends" >remove</a>
     </div>
</template>

<style>

/*фото профиля*/

.transform-border {
  position: relative;
  max-width: 200px;
    margin: 50px auto;
    transform: perspective(3000px) ;
}
.transform-border img {
  display: block;
  width: 100%;
  box-shadow: -12px 11px 1px #f2f2f2;
}
.transform-border:after {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  left: -22px;
  top: 22px;
  background: #cccccc;
  z-index: -1;

}

/*кнопка редактирования фотографии профиля*/
.edit_foto {
  text-decoration: none;
  outline: none;
  display: inline-block;
  padding: 15px 20px;
  margin: 10px 20px;
    border: 1px solid white;
  border-radius: 10px;
  box-shadow: 0 0 40px 40px #20B2AA inset, 0 0 0 0 #20B2AA;
  font-family: 'Montserrat', sans-serif;
  font-weight: bold;
  letter-spacing: 2px;
  color: white;
  transition: .15s ease-in-out;
}

.pdelta {
    text-decoration: none;
    outline: none;
    display: inline-block;
    width: 100px;
    height: 45px;
    line-height: 45px;
    border-radius: 45px;
    margin: 10px 20px;
    font-family: 'Montserrat', sans-serif;
    font-size: 11px;
    text-transform: uppercase;
    text-align: center;
    letter-spacing: 1px;
    font-weight: 600;
    color: white;
    background: dodgerblue;
    box-shadow: 0 8px 15px rgba(0,0,0,.1);
    transition: .3s;
}

.pdelta:hover {background: #2EE59D;
    box-shadow: 0 15px 20px rgba(46,229,157,.4);
    color: black;
    transform: translateY(-7px);
}
.podelta {
    text-decoration: none;
    outline: none;
    display: inline-block;
    width: 100px;
    height: 45px;
    line-height: 45px;
    border-radius: 45px;
    margin: 10px 20px;
    font-family: 'Montserrat', sans-serif;
    font-size: 11px;
    text-transform: uppercase;
    text-align: center;
    letter-spacing: 1px;
    font-weight: 600;
    color: white;
    background: crimson;
    box-shadow: 0 8px 15px rgba(0,0,0,.1);
    transition: .3s;
}

.podelta:hover {background: #2EE59D;
    box-shadow: 0 15px 20px rgba(46,229,157,.4);
    color: black;
    transform: translateY(-7px);
}
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
                console.log("yas photo")
                this.useres = response.data.friends

            })
            .catch(error => {
                console.log("no photo")

            })
        }

    }
</script>