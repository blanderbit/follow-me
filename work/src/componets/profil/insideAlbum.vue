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
                <input type="button" class="create_album" id="albcreate" value="Add photo" @click="Add" z-index="1000">
                <input type="button" class="create_album" id="albcreate" value="Back" @click="back" z-index="1000">
        </div>


            <div class="blok">
              <div class="image-decor">
                <img src="https://html5book.ru/wp-content/uploads/2015/10/flower-example-9.jpg" width="180px" height="180px">
              </div>

              <div class="image-decor">
                <img src="https://html5book.ru/wp-content/uploads/2015/10/flower-example-9.jpg" width="180px" height="180px">
              </div>

              <div class="image-decor">
                <img src="https://html5book.ru/wp-content/uploads/2015/10/flower-example-9.jpg" width="180px" height="180px">
              </div>

              <div class="image-decor">
                <img src="https://html5book.ru/wp-content/uploads/2015/10/flower-example-9.jpg" width="180px" height="180px">
              </div>
            </div>
                   

    <div class="pustoi"></div>

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
                user_id:''
                
            }

        },

        components:{
            GlobFooter:GFooter,
            navbar:navBar,
        }
        ,

        methods:{
        //      modals:function(){
                
        //        this.disp = 'block'
               
        //      },

        //      cancel:function(){
        //          console.log(this.disp )
        //          this.disp = 'none'
        //          console.log(this.disp )
        //      },

        //      create:function(){
        //          console.log(this.name)
        //         axios({
        //         url: 'http://restapi.fintegro.com/albums', 
        //         method: 'POST',                
        //         dataType: 'json',  
        //         headers: {
        //             bearer: this.token
        //             },            

                    
        //         data: {
        //             name: this.name                     
        //         },
        //         })
        //         .then(response =>{
        //             debugger
        //             console.log(response)
                 
        //         })
        //         .catch(response => {
        //             console.log(textStatus);
        //         })
        

        //      },



        // },
        // created:function(){

        //      console.log('zal')
        //         axios({
        //         url: 'http://restapi.fintegro.com/albums', 
        //         method: 'GET',                
        //         dataType: 'json',  
        //         headers: {
        //             bearer: this.token
        //             },            
        //         data: {
        //             user_id: localStorage.getItem('id')
                     
        //         },
        //         })
        //         .then(response =>{
        //             debugger
        //             console.log(response)
        //             this.albums = response.data.albums
                 
        //         })
        //         .catch(response => {
        //             debugger
        //             console.log(textStatus);
        //         })
        

        // }
    }}
    

     
            
     



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
	left:280px;
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

/*INSIDEALBUM*/
* {box-sizing: border-box;}
.image-decor {
  position: relative;
  display: inline-block;
  margin: 50px ;
  border: 5px solid #fff;
  box-shadow: 1px 1px 20px 0 rgba(0, 0, 0, .1);
}
.image-decor:before,
.image-decor:after {
  content: "";
  position: absolute;
  z-index: 2;
  width: 100px;
  height: 33px;
  background: #fff;
  box-shadow: 0 -10px 10px -5px rgba(0, 0, 0, .1);
}
.image-decor:before {
  left: -50px;
  bottom: -30px;
  transform: rotate(30deg);
}
.image-decor:after {
  right: -50px;
  bottom: -30px;
  transform: rotate(-30deg);
}
.image-decor img {display: block;}

.blok{
  background-color: #777;
  opacity: 0,5;
  position: absolute;
  top:120px;
  left:300px;
  width: 800px;
  hei

</style>


