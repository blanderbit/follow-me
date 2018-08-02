<template >
     <div class="transform-border">
           <img :src="msg!=null ? msg: photo"><br>
           <input type="button" v-on:click="to" name="edit" value="edit" class="edit_foto pointer"  />
     </div>
</template>

<style>

/*фото профиля*/



/*кнопка редактирования фотографии профиля*/
.edit_foto {
  text-decoration: none;
  outline: none;
  display: inline-block;
  padding: 15px 20px;
  margin: 10px 10px;
    border: 1px solid white;
  border-radius: 10px;
  box-shadow: 0 0 40px 40px #20B2AA inset, 0 0 0 0 #20B2AA;
  font-family: 'Montserrat', sans-serif;
  font-weight: bold;
  letter-spacing: 2px;
  color: white;
  transition: .15s ease-in-out;
}
.edit_foto:hover {
    color:black;
    border:1px solid black;
}
</style>

<script>
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

            }

        },
        methods:{
            to:function(){
                if(validToken()) {
                    event.preventDefault()
                    this.$router.push({ name: 'settings',params: {id:localStorage.getItem('id')}})
                }
                else{
                    event.preventDefault()
                    this.$router.push({name: 'login'})
                }
            }
      },

    }
</script>