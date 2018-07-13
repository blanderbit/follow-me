<template>
  
    <div id="app">
        
        <navbar></navbar>
        <div class="verh">
            <div class="demo" id="zagolovokA">Your photos</div>
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

              <form id="uploadForm" class="uploadPhotos">
                <!-- <lable> -->
                      <input type="file" name="UploadForm[imageFile]" id="file" @change="uploadPhotos">
                <!-- </lable> -->
              </form>


                <input type="button" class="cnopka" id="back" value="Back" @click="back" z-index="1000">
            


            <div class="blok">
                  <div class="prozrach"></div>
                  <div class="image-decor" v-for="(photo, index) in photos">
                    <img :src="photos" class="js-image-target" width="180px" height="180px">
                  </div>
            </div>
                   

    <div class="pustoi"></div>

        </div>
      
</div>


</template>

<script>
import GFooter from "../GloballFooter.vue";
import navBar from "./navbarProfil.vue";
import axios from "axios";

function validToken() {
  let cookies = document.cookie.split(",");
  let token;
  for (let i = 0; i < cookies.length; i++) {
    if (cookies[i].indexOf("token") !== -1) {
      token = cookies[i].split("=")[1];
      break;
    }
  }
  return token;
}

export default {
  data() {
    return {
      token: validToken(),
      disp: "none",
      name: "",
      user_id: "",
      allphoto: [],
      album_id: "",
      photos: []
    };
  },

  components: {
    GlobFooter: GFooter,
    navbar: navBar
  },
  methods: {
    back: function() {
      this.$router.push({
        name: "albums",
        params: { id: localStorage.getItem("id") }
      });
    },

    uploadPhotos: function(e) {
      let token = validToken();
      this.image = e.target.files[0];
      let data = new FormData();
      const _this = this;

      data.append("UploadForm[imageFile]", this.image);
      axios({
        url: "http://restapi.fintegro.com/upload",
        method: "POST",
        headers: {
          bearer: token
        },
        data: data,
        crossDomain: true,
        cache: false,
        processData: false
      })
        .then(response => {
          console.log("Response:", response);

          console.log(this);
          this.photos.push(response.data.link);
        })
        .catch(error => {
          console.log(error);
        });
    }
  },


  // allphotos
  created: function() {
    console.log("allo");
    axios({
      url: "http://restapi.fintegro.com",
      method: "GET",
      dataType: "json",
      headers: {
        bearer: this.token
      },
      data: {
        photos: album.id
      }
    })
      .then(response => {
        console.log(response.data.link);
        this.photos.push(response.data.link);
      })
      .catch(response => {
        console.log(textStatus);
        debugger;
      });
  },

  // photo
  created: function() {
    console.log("onephoto");
    axios({
      url: "http://restapi.fintegro.com",
      method: "GET",
      dataType: "json",
      headers: {
        bearer: this.token
      },
      data: {
        photo: image.png
      }
    })
      .then(response => {
        console.log(photo);
        this.photo = response.data.link;
      })
      .catch(response => {
        console.log(textStatus);
      });
  }
};
</script>

<style>
body {
  background: url("https://html5book.ru/wp-content/uploads/2015/10/background54.png");
}

.demo {
  margin: 1em 0 0.5em 0;
  color: #343434;
  font-weight: bold;
  font-family: "Ultra", sans-serif;
  font-size: 86px;
  line-height: 92px;
  text-transform: uppercase;
  text-shadow: 0 2px white, 0 3px #777;
  position: absolute;
  left: 350px;
  top: 10px;
}

/*INSIDEALBUM*/
* {
  box-sizing: border-box;
}
.image-decor {
  position: relative;
  display: inline-block;
  margin: 90px;
  padding: 0px;
  border: 5px solid #fff;
  box-shadow: 1px 1px 20px 0 rgba(0, 0, 0, 0.1);
  top: 120px;
}
.image-decor:before,
.image-decor:after {
  content: "";
  position: absolute;
  z-index: 2;
  width: 100px;
  height: 33px;
  background: #fff;
  opacity: 1;
  box-shadow: 0 -10px 10px -5px rgba(0, 0, 0, 0.1);
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
.image-decor img {
  display: block;
}

.blok {
  /* background-color: #eab9d0; 
  opacity: 0.6;  */
  padding: 15px;
  position: absolute;
  top: 110px;
  left: 205px;
  width: 900px;
  height: 800px;
}

.prozrach {
  background-color: #eab9d0;
  opacity: 0.6;
  position: absolute;
  top: 30px;
  left: 25px;
  width: 900px;
  height: 800px;
}

/* Стилизация input=file */
.cnopka {
  height: 70px;
  position: relative;
  width: 160px;
  top: -300px;
  left: 300px;
  background: #80c8a0;
  border-radius: 50px;
  text-align: center;
  z-index: 1005;
  margin: 2px;
  padding: 25px;
}
.cnopka:hover {
  background: rgb(95, 149, 119);
  color: white;
}

.uploadPhotos {
  height: 80px;
  position: relative;
  width: 280px;
  top: -230px;
  left: 720px;
  background: #80c8a0;
  border-radius: 50px;
  text-align: center;
  z-index: 1005;
  margin: 2px;
  padding: 25px;
  display: block;
}
.uploadPhotos:hover {
  background: rgb(95, 149, 119);
  color: white;
}
</style>


