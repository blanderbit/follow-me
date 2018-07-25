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
                      <input type="file" name="UploadForm[imageFile]" id="file" @change="uploadPhotos" accept=".txt,image/*">
                <!-- </lable> -->
              </form>


                <input type="button" class="cnopka" id="back" value="Back" @click="back" z-index="1000">
            


            <div class="blok">
                  <div class="prozrach"></div>
                  <div class="image-decor" v-for="(photo, index) in photos">
                    <div class="deleted" @click="removephoto(photo.id)"><ion-icon name="close-circle-outline"></ion-icon></div>
                    <img :src="photo.url" class="js-image-target" width="230px" height="200px">
                  </div>
            </div>
                   

    <div class="pustoi"></div>

        </div>
      
</div>


</template>

<script>
import GFooter from "../GloballFooter.vue";
import navBar from "./navBarAll.vue";
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
      photos: [],
      // photo_id: "",
      url: ""
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
          bearer: this.token
        },
        data: data,
        crossDomain: true,
        cache: false,
        contentType: false,
        processData: false
      })
        .then(response => {
          console.log("Response:", response);

          console.log(this);
          this.photos.push({ url: response.data.link });
          axios({
            url: "http://restapi.fintegro.com/photos",
            method: "POST",
            dataType: "json",
            headers: {
              bearer: this.token
            },
            data: {
              album_id: localStorage.getItem("album_id"),
              url: response.data.link
            }
          });
        })
        .catch(error => {
          console.log(error);
        });
    },
    removephoto: function(photos) {
      const deletete = axios.create({
        baseURL: "http://restapi.fintegro.com",
        headers: {
          bearer: validToken()
        }
      });
      deletete
        .delete("photos/" + photos, {})
        .then(response => {
          console.log("this photo been remove");
          console.log(response);
          this.success = true;
        })
        .catch(response => {
          debugger;
          console.log("this photo dont was remove");
          console.log(response);
          this.errored = true;
          event.preventDefault();
        });
    }
  },

  // allphotos
  created: function() {
    var id = localStorage.getItem("album_id");
    console.log("Album id:", localStorage.getItem("album_id"));
    axios({
      url: "http://restapi.fintegro.com/albums/" + id,
      method: "GET",
      dataType: "json",
      headers: {
        bearer: this.token
      }
    })
      .then(response => {
        console.log(response);
        this.photos = response.data.album[0].photos;
      })
      .catch(error => {
        console.log(error);
      });
  }
};
</script>

<style>
body {
  /* background: url("https://html5book.ru/wp-content/uploads/2015/10/background54.png"); */
  background: #fff3e3;
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
/*увеличение фото при наведении*/
.js-image-target {
  -moz-transition: all 1s ease-out;
  -o-transition: all 1s ease-out;
  -webkit-transition: all 1s ease-out;
}

.js-image-target:hover {
  -webkit-transform: scale(1.1);
  -moz-transform: scale(1.1);
  -o-transform: scale(1.1);
}
</style>


