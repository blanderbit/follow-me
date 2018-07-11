<template >
     <div class="transform-border">
         <img :src="msg!=null ? msg: photo"><br>
         <input type="button" v-on:click="to" name="edit" value="edit" class="edit_fo"  />
         <input type="button" v-on:click="to" name="edit" value="add" class="edit_fo"  />
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
.edit_foto:hover {
    color:black;
    border:1px solid black;
}
</style>

<script>
    export default{
        props:['msg'],
        data(){
            return{
                photo:'https://c8.alamy.com/comp/EME6A1/silhouette-of-a-question-mark-with-male-and-female-face-EME6A1.jpg',

            }

        },
        methods:{
            to:function(){

            }
      },

    }
</script>