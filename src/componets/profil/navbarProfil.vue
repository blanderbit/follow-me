<template>
    <div id="navbar">
        <div class="globalMyNavBar">
            <div class="globalMyNavBar_head">
                <div class="logoAndName" >
                    <img src="src/assets/logo.png" id="logo" width="50px" height="50px">
                    <span class="logoAndName_name">Follow ME</span>
                </div>

                <nav class="globalMyNavBar_head_nav">
                    <a href="#" @click="toFriends">Friends</a>
                    <a href="#" @click="toAlbums">Albums</a>
                    <a href="#"  @click="toNews">News</a>
                    <a href="#" @click="settings">Settings</a>
                </nav>
                <div class="globalMyNavBar_head_searchAndOut">
                    <form>
                    <input type="search" style="margin-right: 20px;" class="search">
                    <input type="submit" value="Search">
                    <a href="#" @click="LogOut">Logout</a></form>
                </div>
                <div class="clear"></div>
            </div>
        </div>
    </div>
</template>


<style>
#navbar {
  margin-left: auto;
  margin-right: auto;
  width: 100%;
}
.globalMyNavBar {
  background: #a5bd97;
  /* background: url("https://i.pinimg.com/736x/2c/ed/e5/2cede5989974e6ec49aafdd927dca41d--pastel-tumblr-backgrounds-backgrounds-phone.jpg"); */
}
.globalMyNavBar_head {
  margin-top: 0px;
  width: 1340px;
  margin-left: auto;
  margin-right: auto;
  padding: 10px;
  height: 43px;
}
#logo {
  position: relative;
  left: -10px;
  top: -10px;
  margin-left: 0px;
}
.logoAndName {
  font-family: "Galada", cursive;
  float: left;
  margin-top: 0px;
  margin-left: 0px;
}
.logoAndName_name {
  position: relative;
  left: 35px;
  top: -13px;
  margin-left: 0px;
  margin-top: 40px;
  font-size: 40px;
  font-weight: bold;
  margin-right: 70px;
}
.globalMyNavBar_head_nav {
  float: left;
  width: 500px;
  margin-top: 3px;
  font-family: "Nunito", sans-serif;
  color: #17313b;
}

.globalMyNavBar_head_nav a {
  padding: 12px;
  text-decoration: none;

  color: black;
  border-top: 3px solid rgba(0, 153, 255);
  border-bottom: 3px solid snow;
  margin-left: -4px;
}
.globalMyNavBar_head_searchAndOut a {
  padding: 15px;
  text-decoration: none;
  color: black;
}
.globalMyNavBar_head_nav a:hover,
.globalMyNavBar_head_searchAndOut a:hover {
  background: #406c35;
  border-bottom: 3px solid #76ae0a;
}
.globalMyNavBar_head_searchAndOut {
  float: right;
  margin-left: 0px;
  padding: 15px;
  margin-top: -10px;
}
.clear {
  clear: both;
}
.search {
  width: 195px;
  height: 10px;
}
input[type="search"] {
  background-image: url(https://icons8.com/iconizer/files/Token/orig/Search.png);
  background-repeat: no-repeat; /*Убираем повтор изображения*/
  background-position: 4px; /*Позиционируем*/
  background-size: 15px;
  padding: 10px;
  outline: none; /*убираем стандартную обводку браузера*/
  -moz-border-radius: 5px; /*закругляем углы для Mozilla*/
  -webkit-border-radius: 5px; /*закругляем углы для Chrome, Safari*/
  border-radius: 5px; /*закругляем углы для остальных браузеров*/
  padding-left: 20px; /*отступ слева от ввода, чтобы текст не был на картинке(выбирать по размеру картинки)*/
  height: 20px; /*высота строки ввода*/
  font-size: 13px; /*размер шрифта*/
}
input[type="submit"] {
  padding: 5px;
  margin-top: -5px;
  font-family: "HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue",
    Helvetica, Arial, "Lucida Grande", sans-serif;
  font-weight: 400;
  font-size: 14px;
  color: #9d9e9e;
  text-shadow: 1px 1px 0 rgba(256, 256, 256, 1);
  background: #fff;
  border: 1px solid #fff;
  border-radius: 5px;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.5);
  -moz-box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.5);
  -webkit-box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.5);
}
input[type="submit"]:hover {
  background: #d0d7a6;
  color: #414848;
}
input[type="submit"]:focus {
  background: #dfe9ec;
  color: #414848;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.25);
  -moz-box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.25);
  -webkit-box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.25);
}
</style>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    LogOut: function() {
      let logOut = confirm("Are you sure you want to leave the site?");
      if (logOut == true) {
        document.cookie = "token=";
        localStorage.removeItem("id");
        this.$router.push({ name: "login" });
      }
    },
    settings: function() {
      this.$router.push({
        name: "settings",
        params: { id: localStorage.getItem("id") }
      });
    },

    toAlbums: function() {
      this.$router.push({
        name: "albums",
        params: { id: localStorage.getItem("id") }
      });
    },
    toFriends: function() {
      this.$router.push({
        name: "friends",
        params: { id: localStorage.getItem("id") }
      });
    },
    toNews: function() {
      this.$router.push({
        name: "news",
        params: { id: localStorage.getItem("id") }
      });
    }
  }
};
</script>