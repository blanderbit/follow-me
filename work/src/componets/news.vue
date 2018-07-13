<template>
     

    <div id="app">
        <div class="verh">
            <div class="demo" id="zagolovok">news of the day</div>
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

        
        <div class="test" id="t1">
            <p></p>
            <a href="">read here</a>
        </div>
        
        <div class="test" id="t2">
            <p></p>
            <a href="">read here</a>
        </div>

        <div class="test" id="t3">
            <p></p>
            <a href="">read here</a>
        </div>

        <div class="test" id="t4">
            <p></p>
            <a href="">read here</a>
        </div>

        <div class="test" id="t5">
            <p></p>
            <a href="">read here</a>
        </div>
    
</div>


</template>

<style>
 /*заголовок*/
#zagolovok{
	margin:0px auto;
	padding:0px;
	position:relative;
	left:450px;
	top:3px;
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

</style>

<script>

   import GFooter from './GloballFooter.vue'
   import navBar from './navbarProfil.vue'
   import profPhoto from './prof-photo.vue'
//    import AboutMe from './AboutMe.vue'
   import axios from 'axios'

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
                LastName: 'Your Surname',
                friends:'0',
                enemies:'0',
                quotes: '',
                from: '',
                lived:'',
                went:'',
                photo:'',
            }

        },

        components:{
            GlobFooter:GFooter,
            navbar:navBar,
            mainPhoto: profPhoto,
            // aboutMe:aboutMe
        },
        created:function(){

                axios({
                    method:'get',
                    url:'http://restapi.fintegro.com/profiles',
                    dataType: 'json',
                    headers: {
                        bearer: validToken()
                    },
                })
            .then(response => {
                console.log("yes")
                this.firstName =response.data.profile.firstname
                this.LastName =response.data.profile.lastname
                this.friends = response.data.friends_count
                this.enemies = response.data.enemies_count
                this.quotes =response.data.profile.quote
                this.from =response.data.profile.from
                this.lived =response.data.profile.lived
                this.went =response.data.profile.went
                this.photo =response.data.profile.photo
                console.log(photo)
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
