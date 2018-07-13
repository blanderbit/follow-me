<template>
  
    <div id="app">
        
        <navbar></navbar>
        <div class="verh">
            <div class="demo" id="zagolovokA">Albums</div>
        </div> 

        <div class="category-wrap">
                <h3>Menu</h3>
                <ul>
                  <li><a href="">Home</a></li>
                  <li><a href="">Settings</a></li>
                  <li><a href="">Album</a></li>
                  <li><a href="">Friends</a></li>
                  <li><a href="">News</a></li>
                  <li><a href="">Log out</a></li>

                </ul>
              </div>

         <div class="albums">
            <div class="add-album">
                <input type="button" required placeholder="Ваше имя" class="create_album" id="albcreate" value="Create an album" @click="modals" z-index="1000">

            </div>


            <div class="back"></div>
			 <div class="modals" :style="{display:disp}" title="Создать альбом" hidden>
				<div class="head_moduls">Создать Альбом</div>
				<div class="content_moduls">									
                    <label for="text_modal">Название</label><br>
					<input type="text" id='text_modal' v-model="name" style="border: 1px solid lightgray;" autofocus><br>
				</div>
				<div class='footer_modal'>
					<input type="reset" name="reset_modal" @click="cancel" class="reset_modal button_add" value="Отмена">
					<input type="button" name="button_modal_submit" @click="create" class="button_modal_submit button_add" style="background: #3870b0; color: white; margin-left: 10px" value="Создать альбом">
				</div>
			</div> 


    <div class="table">
     <div class="prozrach"></div>        
            <div v-for="(album, index) in albums" tag="div" class="new_albums">
                <div class="verx_album">
                    <div class="deleted" @click="removealbum(album.id)"><ion-icon name="close-circle-outline"></ion-icon></div>
                </div>
                <div class="niz_album">
                <div class="name"><a href="#" id="s7" @click="toInside (album.id)">{{album.name}}</a></div>

            </div>

            </div>
    </div>



        </div>
      
</div>


</template>

<script>

   import GFooter from '../GloballFooter.vue'
   import navBar from './navbarProfil.vue'
    // import albums from './albums.vue'
   import axios from 'axios'
    // import newsVue from '../news.vue';

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
        name: 'albums',

        data () {
            return {
                token: validToken(),
                photo:'',
                albums:[],
                disp:'none',
                name:'',
                user_id:'',
            }

        },

        components:{
            GlobFooter:GFooter,
            navbar:navBar,
        }
        ,

        methods:{
             modals:function(){
                
               this.disp = 'block'
               
             },

             cancel:function(){
                 console.log(this.disp )
                 this.disp = 'none'
                 console.log(this.disp )
             },

             create:function(){
                 console.log(this.name)
                axios({
                url: 'http://restapi.fintegro.com/albums', 
                method: 'POST',                
                dataType: 'json',  
                headers: {
                    bearer: this.token
                    },            

                    
                data: {
                    name: this.name                     
                }
                })
                .then(response =>{
                    console.log(response)
                 
                })
                .catch(response => {
                    console.log(textStatus);
                })
        

             },
             removealbum: function (albums){
                console.log(albums)
                const instance = axios.create({
                baseURL: 'http://restapi.fintegro.com',
                headers: {
                    bearer: validToken()
                }
            });
            instance.delete('albums/'+albums, {
            })
            .then(response => {
                console.log('this album been remove')
                console.log(response)
                this.success = true
            })
            .catch(response =>{
                debugger
                console.log('this post dont was remove')
                console.log(response)
                this.errored = true;
                event.preventDefault()
            })
            },

            toInside:function(idi){
                this.$router.push({ name: 'insideAlbum',params: {album_id: idi}})
            }

        },


    //     created:function(){

    //       console.log('zal')
    //             axios({
    //             url: 'http://restapi.fintegro.com/albums', 
    //             method: 'GET',                
    //             dataType: 'json',  
    //             headers: {
    //                 bearer: this.token
    //                 },            
    //             data: {
    //               data:data,
    //               crossDomain:true,
    //               cache:false,
    //               processData:false,
                        
    //             },
    //             })
    //             .then(response =>{
    //                 console.log(response)
    //                 this.albums = response.data.albums
                 
    //             })
    //             .catch(response => {
    //                 console.log(textStatus);
    //             })

    // },

     created:function(){

             console.log('zal')
                axios({
                url: 'http://restapi.fintegro.com/albums', 
                method: 'GET',                
                dataType: 'json',  
                headers: {
                    bearer: this.token
                    },            
                data: {
                    user_id: localStorage.getItem('id')
                     
                },
                })
                .then(response =>{
                    console.log(response)
                    this.albums = response.data.albums
                 
                })
                .catch(response => {
                    console.log(textStatus);
                })
        

        }
    

}

    

     
            
     



</script>

<style>
body{
      background:  url('https://html5book.ru/wp-content/uploads/2015/10/background54.png')
}

 /*заголовок*/
#zagolovokA{
	margin:0px auto;
	padding:0px;
	position:relative;
	left:180px;
	top:3px;
}
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

/*Сайт бар*/
.category-wrap {
  padding: 15px;
  background: white;
  width: 200px;
  box-shadow: 2px 2px 8px rgba(0,0,0,.1);
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
}
.category-wrap h3 {
  font-size: 16px;
  color: rgba(0,0,0,.6);
  margin: 0 0 10px;
  padding: 0 5px;
  position: relative;
}
.category-wrap h3:after {
  content: "";
  width: 6px;
  height: 6px;
  background: #80C8A0;
  position: absolute;
  right: 5px;
  bottom: 2px;
  box-shadow: -8px -8px #80C8A0, 0 -8px #80C8A0, -8px 0 #80C8A0;
}
.category-wrap ul {
  list-style: none;
  margin: 0;
  padding: 0; 
  border-top: 1px solid rgba(0,0,0,.3);
}
.category-wrap li {margin: 12px 0 0 0px;}
.category-wrap a {
  text-decoration: none;
  display: block;  
  font-size: 13px;
  color: rgba(0,0,0,.6);
  padding: 5px;
  position: relative;
  transition: .3s linear;
}
.category-wrap a:after {
  content:"\f18e";
  font-family: FontAwesome;
  position: absolute;
  right: 5px;
  color: white;
  transition: .2s linear;
}
.category-wrap a:hover {
  background: #80C8A0;
  color: white;
}


/*форма*/
.test{
	border:dotted;
	border-radius: 50px;
	color:#AFEEEE;
	background:#E0FFFF;
	
}
#t1{
	margin: 1px; 
	padding:1px;
	position: absolute;
	top: 170px;
	left:240px;
	width:300px;
	height:200px;
}

#t2{
	margin: 1px ;
	padding:1px;
	position: absolute;
	top: 170px;
	left:780px;
	width:300px;
	height:200px;
} 

#t3{
	margin: 0px ;
	padding:0px;
	position: absolute;
	top: 390px;
	left:460px;
	width:400px;
	height:300px;
} 

#t4{
	margin: 1px ;
	padding:1px;
	position: absolute;
	top:710px;
	left:240px;
	width:300px;
	height:200px;
}


#t5{
	margin: 1px ;
	padding:1px;
	position: absolute;
	top: 710px;
	left:780px;
	width:300px;
	height:200px;
}

/*ALBUMS*/
.create_album {
  position :relative;
  top: -260px;
  left:280px;
  background: #80C8A0;
  width: 140px;
  height: 70px;
  border-radius: 50px;
  text-align: center;
  z-index:1005;
}
.create_album:hover {
  background: rgb(95, 149, 119);
  color: white;
}
.head_moduls{
	width: 100%;
	padding: 20px;
	background: #80C8A0;
	box-sizing: border-box;
	border-top-left-radius: 10px;
	border-top-right-radius: 10px;
	color: white;
}
.modals,
.modals_photo{
	top: 20%;
	left: 37%;
	right: 30%;
	width: 500px;
	background: white;
	box-shadow: 1px 1px 4px black;
	position: absolute;
	z-index: 1005;
	border-radius: 10px
}
.content_moduls{
	width: 98.9%;
	padding: 20px;
}
.content_moduls input{
	width: 93%
}
#text_modal:focus{
	outline: none;
}
.footer_modal{
	border-top: 1px solid #80C8A0;
	padding: 20px;	
}
.footer_modal .reset_modal{
	margin-left:  51%;	
}
.footer_modal input{
	padding: 10px 15px;	
}
.back{
    width: 100%;
    height: 100%;
    background-color: #343434;
    opacity: 0.3px;
}

.new_albums{
  background-color: #80C8A0;
  position: relative; 
  display: inline-block;
  margin: 60px;
  padding:0px;
  top:140px;
  left:130px;
  width: 170px;
  height: 200px;
  border: solid;
  border-radius: 20px;
  z-index: 1005;
}
.verx_album{
background: url('https://st2.depositphotos.com/5520090/10124/v/950/depositphotos_101247018-stock-illustration-retro-photo-film-sketch-black.jpg');
background-size: cover;
  height: 150px;
  background-color: rgb(159, 228, 190);
  border-radius: 20px;
  /* z-index: 1004; */
  
}
.niz_album{
  margin: 15px;
  text-align: center;
  font-weight: bold;
  font-family: 'Ultra', sans-serif; 
  /* z-index: 1005; */

}

.table {
    /* background-color: #777;
    opacity: 0.6; */
    position: absolute;
    top:100px;
    left:205px;
    width: 800px;
    height: 900px;
}
.prozrach{
  background-color: #eae3e6; 
  opacity: 0.6;
  position: absolute;
  top:70px;
  left:65px;
  width: 800px;
  height: 900px;
}

/* оформление ссылки на альбом */
  #s7 {
        text-decoration: none;
        display: inline-block;
        padding: 5px 10px;
        letter-spacing: 1px;
        margin: 0 20px;
        font-size: 14px;
        font-family: 'Fredoka One', cursive;
        transition: .3s ease-in-out;
     
    }
    #s7 {color: darkslategrey;}
    #s7:hover {transform: scale(2.2);}


</style>


